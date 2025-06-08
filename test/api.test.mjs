import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';

beforeEach(async () => {
    const config = await import('../src/config.mjs');
    vi.spyOn(config, 'getRegion').mockImplementation(() => {
        return 'eu';
    });
    vi.spyOn(config, 'saveRegion').mockImplementation(() => { });

    vi.spyOn(config, 'getAppConfig').mockImplementation(() => {
        return {
            appId: '1234567890abcdef'
        };
    });
    vi.spyOn(config, 'saveAppConfig').mockImplementation(() => { });

    vi.spyOn(config, 'getAccessToken').mockImplementation(() => {
        return {
            accessToken: 'abcdef1234567890',
            expiredTime: 9990000000000
        };
    });
    vi.spyOn(config, 'saveAccessToken').mockImplementation(() => { });

    vi.spyOn(config, 'getRefreshToken').mockImplementation(() => {
        return {
            refreshToken: 'abcdef1234567890',
            expiredTime: 9990000000000
        };
    });
    vi.spyOn(config, 'saveRefreshToken').mockImplementation(() => { });

    const { init } = await import('../src/api.mjs');
    await init();
})

afterEach(async () => {
    vi.restoreAllMocks()
})

describe('getFamilyList tests', () => {

    test('base test', async () => {
        const familyListResponse = {
            "error": 0,
            "msg": "",
            "data": {
                "familyList": [
                    {
                        "id": "famylyid",
                        "apikey": "dymmy apikey",
                        "name": "My Home",
                        "index": 0,
                        "roomList": [
                            {
                                "id": "roomid",
                                "name": "My living room",
                                "index": 0
                            },
                        ],
                        "familyType": 1,
                        "members": []
                    }
                ],
                "currentFamilyId": "famylyid",
                "hasChangedCurrentFamily": false
            }
        };
        async function doGetRequestStub() {
            return { body: JSON.stringify(familyListResponse) };
        }

        const request = await import('../src/request.mjs');
        vi.spyOn(request, 'doGetRequest').mockImplementation(doGetRequestStub);

        const { getFamilyList } = await import('../src/api.mjs');
        const result = await getFamilyList();
        expect(result).toEqual(familyListResponse.data);
    })
})

describe('getFamilyAllThings tests', () => {
    test('base test', async () => {
        const familyAllThingsResponse = {
            "error": 0,
            "msg": "",
            "data": {
                "thingList": [
                    {
                        "itemType": 1,
                        "itemData": {
                            "name": "My Camera",
                            "deviceid": "10000abcde",
                            "apikey": "dymmy apikey",
                            "extra": {
                                "model": "SN-T23N-CAMS2-01",
                                "mac": "dummy mac",
                                "apmac": "dummy apmac",
                                "uiid": 256,
                                "ui": "金鼎卡片机摄像头",
                                "modelInfo": "xxxxx",
                                "brandId": "yyyyy",
                                "itCredential": "zzzzz",
                                "description": "卡片机（金鼎S8）",
                                "manufacturer": "深圳松诺技术有限公司"
                            },
                            "brandName": "SONOFF",
                            "brandLogo": "https://cn-ota.coolkit.cc/logo/q62PevoglDNmwUJ9oPE7kRrpt1nL1CoA.png",
                            "showBrand": true,
                            "productModel": "CAM-S2",
                            "tags": {},
                            "devConfig": {},
                            "settings": {
                                "opsNotify": 0,
                                "opsHistory": 1,
                                "alarmNotify": 1,
                                "wxAlarmNotify": 0,
                                "wxOpsNotify": 0,
                                "wxDoorbellNotify": 0,
                                "appDoorbellNotify": 1,
                                "cameraMotionDetectionNotify": 0,
                                "cameraHumanoidDetectionNotify": 0
                            },
                            "devGroups": [],
                            "family": {
                                "familyid": "dymmy familyid",
                                "index": -5,
                                "members": [],
                                "guests": []
                            },
                            "shareTo": [
                                {
                                    "apikey": "dymmy share apikey",
                                    "phoneNumber": "+8610000000000",
                                    "comment": "",
                                    "permit": 15,
                                    "shareTime": 1725281998530,
                                    "platform": "app",
                                    "authority": {
                                        "updateTimers": true
                                    }
                                }
                            ],
                            "devicekey": "dymmy devicekey",
                            "online": true,
                            "params": {
                                "version": 8,
                                "fwVersion": "1.1.1",
                            },
                            "isSupportGroup": false,
                            "isSupportedOnMP": false,
                            "isSupportChannelSplit": false,
                            "deviceFeature": {
                                "scenes": []
                            }
                        },
                        "index": -5
                    },
                ],
                "total": 1
            }
        };

        async function doGetRequestStub() {
            return { body: JSON.stringify(familyAllThingsResponse) };
        }

        const request = await import('../src/request.mjs');
        vi.spyOn(request, 'doGetRequest').mockImplementation(doGetRequestStub);

        const { getFamilyAllThings } = await import('../src/api.mjs');
        const result = await getFamilyAllThings('dummy familyid');
        expect(result).toEqual(familyAllThingsResponse.data.thingList);
    })
})

describe('getDevice tests', () => {
    test('base test', async () => {
        const getDeviceResponse = {
            "error": 0,
            "msg": "",
            "data": {
                "thingList": [
                    {
                        "itemType": 1,
                        "itemData": {
                            "name": "My Camera",
                            "deviceid": "10000abcde",
                            "apikey": "dymmy apikey",
                            "extra": {
                                "model": "SN-T23N-CAMS2-01",
                                "mac": "dummy mac",
                                "apmac": "dummy apmac",
                                "uiid": 256,
                                "ui": "金鼎卡片机摄像头",
                                "modelInfo": "xxxxx",
                                "brandId": "yyyyy",
                                "itCredential": "zzzzz",
                                "description": "卡片机（金鼎S8）",
                                "manufacturer": "深圳松诺技术有限公司"
                            },
                            "brandName": "SONOFF",
                            "brandLogo": "https://cn-ota.coolkit.cc/logo/q62PevoglDNmwUJ9oPE7kRrpt1nL1CoA.png",
                            "showBrand": true,
                            "productModel": "CAM-S2",
                            "tags": {},
                            "devConfig": {},
                            "settings": {
                                "opsNotify": 0,
                                "opsHistory": 1,
                                "alarmNotify": 1,
                                "wxAlarmNotify": 0,
                                "wxOpsNotify": 0,
                                "wxDoorbellNotify": 0,
                                "appDoorbellNotify": 1,
                                "cameraMotionDetectionNotify": 0,
                                "cameraHumanoidDetectionNotify": 0
                            },
                            "devGroups": [],
                            "family": {
                                "familyid": "dymmy familyid",
                                "index": -5,
                                "members": [],
                                "guests": []
                            },
                            "shareTo": [
                                {
                                    "apikey": "dymmy share apikey",
                                    "phoneNumber": "+8610000000000",
                                    "comment": "",
                                    "permit": 15,
                                    "shareTime": 1725281998530,
                                    "platform": "app",
                                    "authority": {
                                        "updateTimers": true
                                    }
                                }
                            ],
                            "devicekey": "dymmy devicekey",
                            "online": true,
                            "params": {
                                "version": 8,
                                "fwVersion": "1.1.1",
                            },
                            "isSupportGroup": false,
                            "isSupportedOnMP": false,
                            "isSupportChannelSplit": false,
                            "deviceFeature": {
                                "scenes": []
                            }
                        },
                        "index": -5
                    },
                ]
            }

        };

        async function doPostRequestStub() {
            return { body: JSON.stringify(getDeviceResponse) };
        }

        const request = await import('../src/request.mjs');
        vi.spyOn(request, 'doPostRequest').mockImplementation(doPostRequestStub);

        const { getDevice } = await import('../src/api.mjs');
        const result = await getDevice('10000abcde');
        expect(result).toEqual(getDeviceResponse.data.thingList[0]);
    });
});

describe('setDeviceStatus tests', () => {
    test('base test', async () => {
        const setDeviceStatusResponse = {
            "error": 0,
            "msg": "",
            "data": {}
        };

        async function doPostRequestStub() {
            return { body: JSON.stringify(setDeviceStatusResponse) };
        }

        const request = await import('../src/request.mjs');
        const spy = vi.spyOn(request, 'doPostRequest').mockImplementation(doPostRequestStub);

        const { updateDeviceStatus } = await import('../src/api.mjs');
        await updateDeviceStatus('10000abcde', { switch: 'off', brightness: 50 });
        expect(spy.mock.calls.length).toEqual(1);
    });
});
