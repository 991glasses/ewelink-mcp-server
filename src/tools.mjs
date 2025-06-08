import * as api from "./api.mjs";
import { isSupportDevice, getSupportDeviceCommands } from './devices/index.mjs'

export async function getDevices() {
    const allDevices = [];
    const getFamilyListResp = await api.getFamilyList();
    for (const family of getFamilyListResp.familyList) {
        const familyAllThings = await api.getFamilyAllThings(family.id);
        for (const thing of familyAllThings) {
            if (thing.itemType !== 1 && thing.itemType !== 2) {
                continue;
            }

            const { name, deviceid, extra, online } = thing.itemData
            allDevices.push({
                name,
                deviceId: deviceid,
                deviceType: extra.ui,
                uiid: extra.uiid,
                online,
            });
        }
    }

    return {
        content: [{
            type: "text",
            text: JSON.stringify({
                "devices": allDevices
            })
        }]
    }
}

export async function getDeviceInfo({ deviceId }) {
    const deviceInfo = await api.getDevice(deviceId)
    const { extra, online, params } = deviceInfo.itemData
    const isSupport = await isSupportDevice(extra?.uiid)
    if (!isSupport) {
        return {
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "error",
                    message: "device not support"
                })
            }]
        }
    }

    const commands = await getSupportDeviceCommands(extra.uiid)
    return {
        content: [{
            type: "text",
            text: JSON.stringify({
                status: "ok",
                devcieInfo: {
                    online,
                    status: params,
                    commands,
                }
            })
        }]
    }
}

export async function controlDevice({ deviceId, command }) {
    try {
        await api.updateDeviceStatus(deviceId, JSON.parse(command))
        return {
            content: [{
                type: "text",
                text: JSON.stringify({ status: "ok" })
            }]
        }
    } catch (error) {
        return {
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "error",
                    message: error.message,
                })
            }]
        }
    }
}