import fs from 'fs';
import os from 'os';

const savePath = os.homedir() + '/.ewelink-mcp-server';
const regionFile = savePath + '/region.json';
const appConfigFile = savePath + '/appConfig.json';
const accessTokenFile = savePath + '/accessToken.json';
const refreshTokenFile = savePath + '/refreshToken.json';

export async function init() {
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
}

export function getApiDomain(region) {
    switch (region.toLowerCase().trim()) {
        case 'cn':
            return 'cn-apia.coolkit.cn';
        case 'as':
            return 'as-apia.coolkit.cc';
        case 'us':
            return 'us-apia.coolkit.cc';
        case 'eu':
            return 'eu-apia.coolkit.cc';
        default:
            throw new Error('Invalid region');
    }
}

export function getRegion() {
    if (!fs.existsSync(regionFile)) {
        return null;
    }
    const regionInfo = JSON.parse(fs.readFileSync(regionFile, 'utf-8'));
    return regionInfo.region;
}

export function saveRegion(region) {
    const regionInfo = {
        region,
    };
    fs.writeFileSync(regionFile, JSON.stringify(regionInfo, null, 2), 'utf-8');
}

export function getAppConfig() {
    if (!fs.existsSync(appConfigFile)) {
        return null;
    }
    const appConfig = JSON.parse(fs.readFileSync(appConfigFile, 'utf-8'));
    return appConfig;
}

export function saveAppConfig(appId) {
    const appConfig = { appId };
    fs.writeFileSync(appConfigFile, JSON.stringify(appConfig, null, 2), 'utf-8');
}

export function getAccessToken() {
    if (!fs.existsSync(accessTokenFile)) {
        return null;
    }
    const accessTokenInfo = JSON.parse(fs.readFileSync(accessTokenFile, 'utf-8'));
    if (accessTokenInfo.expiredTime > Date.now()) {
        return accessTokenInfo;
    }
    return null;
}

export function saveAccessToken(accessToken, expiredTime) {
    const accessTokenInfo = {
        accessToken,
        expiredTime: expiredTime - 1000 * 3600 * 24 * 3,
    };
    fs.writeFileSync(accessTokenFile, JSON.stringify(accessTokenInfo, null, 2), 'utf-8');
}

export function getRefreshToken() {
    if (!fs.existsSync(refreshTokenFile)) {
        return null;
    }
    const refreshTokenInfo = JSON.parse(fs.readFileSync(refreshTokenFile, 'utf-8'));
    if (refreshTokenInfo.expiredTime > Date.now()) {
        return refreshTokenInfo.refreshToken;
    }
    return null;
}

export function saveRefreshToken(refreshToken, expiredTime) {
    const refreshTokenInfo = {
        refreshToken,
        expiredTime: expiredTime - 1000 * 3600,
    };
    fs.writeFileSync(refreshTokenFile, JSON.stringify(refreshTokenInfo, null, 2), 'utf-8');
}