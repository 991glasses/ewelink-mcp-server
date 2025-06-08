import {
    postRequestHeaders,
    doPostRequestWithRawBody,
    doPostRequest,
    postRequestSign
} from './request.mjs';
import * as config from './config.mjs';

let domain;
let appId, appSecret;
let accessToken, atExpiredTime;

export async function init() {
    const region = config.getRegion();
    if (!region) {
        throw new Error('region is not set');
    }
    domain = config.getApiDomain(region);

    const accessTokenInfo = config.getAccessToken();
    if (!accessTokenInfo) {
        throw new Error('access token is not set or invalid');
    }
    accessToken = accessTokenInfo.accessToken
    atExpiredTime = accessTokenInfo.expiredTime;
}

export function setDomain(_domain) {
    domain = _domain;
}

export function setAppId(_appId, _appSecret) {
    appId = _appId;
    appSecret = _appSecret;
}

export function setAccessToken(_accessToken, _atExpiredTime) {
    accessToken = _accessToken;
    atExpiredTime = _atExpiredTime;
}

export async function getAccessToken() {
    if (atExpiredTime && atExpiredTime > Date.now()) {
        return accessToken;
    }
    const { at, rt } = await refreshOauthToken();
    console.log(`Refresh access token at=${at} rt=${rt}`);
    accessToken = at;
    atExpiredTime = Date.now() + 1000 * 3600 * 24 * 27;
    config.saveAccessToken(at, atExpiredTime);
    config.saveRefreshToken(rt, Date.now() + 1000 * 3600 * 24 * 60);
    return at;
}

export async function getOauthToken(code, redirectUrl, grantType) {
    const rawBody = JSON.stringify({ code, redirectUrl, grantType });
    const sign = postRequestSign(appSecret, rawBody);

    const res = await doPostRequestWithRawBody(
        `https://${domain}/v2/user/oauth/token`,
        postRequestHeaders({ sign, appId }),
        rawBody
    );
    const resBody = JSON.parse(res.body);
    if (resBody.error) {
        throw new Error(`getOauthToken failed, error code=${resBody.error}, error msg=${resBody.msg}`);
    }
    return resBody.data;
}

export async function refreshOauthToken() {
    const appConfig = await config.getAppConfig();
    if (!appConfig) {
        throw new Error('app config is not set or invalid');
    }
    const { appId } = appConfig;

    const refreshToken = config.getRefreshToken();
    if (!refreshToken) {
        throw new Error('refresh token is not set or invalid');
    }

    const res = await doPostRequest(
        `https://${domain}/v2/user/oauth/token`,
        postRequestHeaders({ accessToken, appId }),
        { rt: refreshToken }
    )
    const resBody = JSON.parse(res.body);
    if (resBody.error) {
        throw new Error(`refreshOauthToken failed, error code=${resBody.error}, error msg=${resBody.msg}`);
    }
    return resBody.data;
}