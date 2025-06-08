import crypto from 'crypto';
import got from 'got';
export async function doGetRequest(url, headers) {
    return await got.get(url, {
        headers
    });
}

export async function doPostRequest(url, headers, body) {
    return await got.post(url, {
        headers,
        json: body
    });
}

export async function doPostRequestWithRawBody(url, headers, rawBody) {
    return await got.post(url, {
        headers,
        body: rawBody
    });
}

export function getRequestHeaders({ accessToken, appId } = {}) {
    const headers = {};
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    if (appId) {
        headers['X-CK-Appid'] = appId;
    }
    return headers;
}

export function postRequestHeaders({ accessToken, sign, appId } = {}) {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    } else if (sign) {
        headers['Authorization'] = `Sign ${sign}`;
    }
    if (appId) {
        headers['X-CK-Appid'] = appId;
    }
    return headers;
}

export function getRequestSign(appSecret, query) {
    const list = [];
    for (const key in query) {
        list.push({ key, value: query[key] });
    }
    list.sort(function (a, b) {
        return a.key < b.key ? -1 : 1;
    });
    const queryStrs = [];
    for (const item of query) {
        queryStrs.push(`${item.key}=${item.value}`);
    }
    const paramsStr = queryStrs.join('&');
    const buffer = Buffer.from(paramsStr, 'utf-8');
    const sign = crypto.createHmac('sha256', appSecret).update(buffer).digest('base64');
    return sign;
}
export function postRequestSign(appSecret, rawBody) {
    const buffer = Buffer.from(rawBody, "utf-8");
    return crypto.createHmac('sha256', appSecret).update(buffer).digest('base64');
}