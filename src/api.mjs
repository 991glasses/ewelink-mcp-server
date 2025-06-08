import {
    getRequestHeaders,
    postRequestHeaders,
    doGetRequest,
    doPostRequest,
} from './request.mjs';
import * as tokenHolder from './token_holder.mjs';
import * as config from './config.mjs';

let domain;

export async function init() {
    await tokenHolder.init();
    const region = config.getRegion();
    if (!region) {
        throw new Error('region is not set');
    }
    domain = config.getApiDomain(region);
}

export function setDomain(_domain) {
    domain = _domain;
}
export async function getFamilyList() {
    const accessToken = await tokenHolder.getAccessToken();
    const res = await doGetRequest(
        `https://${domain}/v2/family`,
        getRequestHeaders({ accessToken })
    );
    const resBody = JSON.parse(res.body);
    if (resBody.error) {
        throw new Error(`getFamilyList failed, error code=${resBody.error}, error msg=${resBody.msg}`);
    }
    return resBody.data;
}

export async function getFamilyAllThings(familyId) {
    let beginIndex = -9999999;
    const num = 30;
    const allThings = [];
    while (true) {
        const accessToken = await tokenHolder.getAccessToken();
        const res = await doGetRequest(
            `https://${domain}/v2/device/thing?familyid=${familyId}&num=${num}&beginIndex=${beginIndex}`,
            getRequestHeaders({ accessToken }));
        const resBody = JSON.parse(res.body);
        if (resBody.error) {
            throw new Error(`get family things failed, error code=${resBody.error}, error msg=${resBody.msg}`);
        }

        const { thingList, total } = resBody.data;
        allThings.push(...thingList);
        if (allThings.length >= total || thingList.length === 0) {
            break;
        } else {
            beginIndex = thingList[thingList.length - 1].index;
        }
    }
    return allThings;
}

export async function getDevice(deviceId) {
    const accessToken = await tokenHolder.getAccessToken();
    const res = await doPostRequest(
        `https://${domain}/v2/device/thing`,
        postRequestHeaders({ accessToken }),
        { thingList: [{ itemType: 1, id: deviceId }] }
    );
    const resBody = JSON.parse(res.body);
    if (resBody.error) {
        throw new Error(`get device failed, error code=${resBody.error}, error msg=${resBody.msg}`);
    }
    return resBody.data.thingList[0];
}

export async function updateDeviceStatus(deviceId, params) {
    const accessToken = await tokenHolder.getAccessToken();
    const res = await doPostRequest(
        `https://${domain}/v2/device/thing/status`,
        postRequestHeaders({ accessToken }),
        { type: 1, id: deviceId, params }
    );
    const resBody = JSON.parse(res.body);
    if (resBody.error) {
        throw new Error(`update device failed, error code=${resBody.error}, error msg=${resBody.msg}`);
    }
}
