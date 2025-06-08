import { describe, expect, test, vi } from 'vitest';
import * as api from '../src/api.mjs';
import * as devices from '../src/devices/index.mjs';
import * as tools from '../src/tools.mjs';

vi.mock('../src/api.mjs');
vi.mock('../src/devices/index.mjs');

describe('getDevices tests', () => {
    test('base test', async () => {
        const mockFamilyList = {
            familyList: [
                {
                    id: 'family1',
                    name: 'Home',
                    index: 0,
                    roomList: [],
                    familyType: 1,
                    members: []
                }
            ],
            currentFamilyId: 'family1',
            hasChangedCurrentFamily: false
        };

        const mockThings = [
            {
                itemType: 1,
                itemData: {
                    name: 'Test Device',
                    deviceid: 'device1',
                    extra: {
                        uiid: 123,
                        model: 'model1',
                        mac: 'mac1',
                        apmac: 'apmac1',
                        ui: 'Test UI',
                        description: 'Test device',
                        manufacturer: 'Test Manufacturer'
                    },
                    online: true,
                    params: {
                        version: 1,
                        fwVersion: '1.0.0'
                    }
                },
                index: 0
            }
        ];

        api.getFamilyList.mockResolvedValue(mockFamilyList);
        api.getFamilyAllThings.mockResolvedValue(mockThings);

        const result = await tools.getDevices();

        expect(result).toEqual({
            content: [{
                type: "text",
                text: JSON.stringify({
                    devices: [{
                        name: 'Test Device',
                        deviceId: 'device1',
                        deviceType: 'Test UI',
                        uiid: 123,
                        online: true
                    }]
                })
            }]
        });
    });
});

describe('getDeviceInfo tests', () => {
    test('supported device test', async () => {
        const mockDeviceInfo = {
            itemData: {
                extra: {
                    uiid: 123,
                    model: 'model1',
                    mac: 'mac1',
                    apmac: 'apmac1',
                    ui: 'Test UI',
                    description: 'Test device',
                    manufacturer: 'Test Manufacturer'
                },
                online: true,
                params: {
                    version: 1,
                    fwVersion: '1.0.0'
                }
            }
        };

        const mockCommands = ['command1', 'command2'];

        api.getDevice.mockResolvedValue(mockDeviceInfo);
        devices.isSupportDevice.mockResolvedValue(true);
        devices.getSupportDeviceCommands.mockResolvedValue(mockCommands);

        const result = await tools.getDeviceInfo({ deviceId: 'device1' });

        expect(result).toEqual({
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "ok",
                    devcieInfo: {
                        online: true,
                        status: {
                            version: 1,
                            fwVersion: '1.0.0'
                        },
                        commands: mockCommands
                    }
                })
            }]
        });
    });

    test('unsupported device test', async () => {
        api.getDevice.mockResolvedValue({
            itemData: {
                extra: {
                    uiid: 999,
                    model: 'model1',
                    mac: 'mac1',
                    apmac: 'apmac1',
                    ui: 'Unsupported UI',
                    description: 'Test device',
                    manufacturer: 'Test Manufacturer'
                },
                online: true,
                params: {
                    version: 1,
                    fwVersion: '1.0.0'
                }
            }
        });
        devices.isSupportDevice.mockResolvedValue(false);

        const result = await tools.getDeviceInfo({ deviceId: 'device1' });

        expect(result).toEqual({
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "error",
                    message: "device not support"
                })
            }]
        });
    });
});

describe('controlDevice tests', () => {
    test('successful control test', async () => {
        api.updateDeviceStatus.mockResolvedValue();

        const result = await tools.controlDevice({
            deviceId: 'device1',
            command: '{"switch":"on"}'
        });

        expect(result).toEqual({
            content: [{
                type: "text",
                text: JSON.stringify({ status: "ok" })
            }]
        });

        // Verify that updateDeviceStatus was called with correct parameters
        expect(api.updateDeviceStatus).toHaveBeenCalledWith('device1', { switch: 'on' });
    });

    test('failed control test', async () => {
        const errorMessage = 'Failed to control device';
        api.updateDeviceStatus.mockRejectedValue(new Error(errorMessage));

        const result = await tools.controlDevice({
            deviceId: 'device1',
            command: '{"switch":"on"}'
        });

        expect(result).toEqual({
            content: [{
                type: "text",
                text: JSON.stringify({
                    status: "error",
                    message: errorMessage
                })
            }]
        });
    });
});