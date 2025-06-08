#!/usr/bin/env node

import http from 'http';
import readline from 'readline';
import { exec } from 'child_process';
import crypto from 'crypto';
import inquirer from 'inquirer';
import { getApiDomain } from './config.mjs';
import * as config from './config.mjs';
import * as api from './api.mjs';
import * as tokenHolder from './token_holder.mjs';

const HTTP_PORT = 13000;

let appId, appSecret;

export async function login() {
    try {
        await config.init();
        await inquiryAppInfo();
        httpServer();
        await openBrowser();
    } catch (err) {
        console.error(err);
    }
}

async function inquiryAppInfo() {
    const questions = [
        {
            type: 'input',
            name: 'appId',
            message: 'input APPID:',
        },
        {
            type: 'input',
            name: 'appSecret',
            message: 'input APP SECRET',
        },
    ];
    const answers = await inquirer.prompt(questions);
    appId = answers.appId;
    appSecret = answers.appSecret;
    config.saveAppConfig(appId);
    tokenHolder.setAppId(appId, appSecret);
}

function openBrowser() {
    const seq = Date.now();
    const buffer = Buffer.from(`${appId}_${seq}`, "utf-8");
    const sign = crypto.createHmac("sha256", appSecret).update(buffer).digest("base64");
    const redirectUrl = `http://localhost:${HTTP_PORT}/redirect`;
    const grantType = 'authorization_code';
    const state = 'ewelink-mcp-server';
    const nonce = 'mcpserve';

    let loginUrl = `https://c2ccdn.coolkit.cc/oauth/index.html`
        + `?clientId=${appId}`
        + `&seq=${seq}`
        + `&authorization=${encodeURIComponent(sign)}`
        + `&redirectUrl=${encodeURIComponent(redirectUrl)}`
        + `&grantType=${grantType}`
        + `&state=${state}`
        + `&nonce=${nonce}`;

    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Press Enter to open browser to login...', () => {
            let command;
            switch (process.platform) {
                case 'darwin': // macOS
                    command = `open "${loginUrl}"`;
                    break;
                case 'win32': // Windows
                    command = `start "" "${loginUrl}"`;
                    break;
                case 'linux': // Linux
                    command = `xdg-open "${loginUrl}"`;
                    break;
                default:
                    rl.close();
                    reject('Unsupported operating system');
                    return;
            }

            exec(command, (error) => {
                if (error) {
                    console.log('\nFailed to open the browser. Please manually copy the link below and open it in your browser:');
                    console.log(loginUrl);
                }
                console.log('\n\nWaiting for redirection...\n');
                rl.close();
                resolve();
            });
        });
    });
}

function httpServer() {
    const server = http.createServer(async (req, res) => {
        if (req.url.indexOf('/redirect') < 0) {
            res.statusCode = 404;
            res.end();
            return;
        }

        try {
            const queryIndex = req.url.indexOf('?');
            const argsList = req.url.substring(queryIndex + 1).split('&');
            const args = argsList.reduce((acc, arg) => {
                const [key, value] = arg.split('=');
                acc[key] = value;
                return acc;
            }, {});

            const { code, region } = args;
            config.saveRegion(region);

            const redirectUrl = `http://localhost:${HTTP_PORT}/redirect`;
            const domain = getApiDomain(region);
            tokenHolder.setDomain(domain);
            api.setDomain(domain);

            const getTokenRes = await tokenHolder.getOauthToken(code, redirectUrl, 'authorization_code');
            const { accessToken, atExpiredTime, refreshToken, rtExpiredTime } = getTokenRes;

            console.log('Get account token, save to config file')
            config.saveAccessToken(accessToken, atExpiredTime);
            config.saveRefreshToken(refreshToken, rtExpiredTime);
            tokenHolder.setAccessToken(accessToken, atExpiredTime);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Login success!');

            console.log('Login success!');
            await new Promise((resolve) => setTimeout(resolve, 500));
            process.exit(0);

        } catch (err) {
            console.error(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('redirect error');
        }
    });

    server.listen(HTTP_PORT, () => { });
}