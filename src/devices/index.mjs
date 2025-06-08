import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const devicesDir = fileURLToPath(new URL('.', import.meta.url));
const uiidCommands = new Map();

const files = await readdir(devicesDir);
for (const file of files) {
    if (file.startsWith('uiid') && file.endsWith('.mjs')) {
        const { commands } = await import(join(devicesDir, file));
        const uiid = parseInt(file.match(/uiid(\d+)/)?.[1] || '0');
        if (uiid > 0) {
            uiidCommands.set(uiid, commands);
        }
    }
}

export async function isSupportDevice(uiid) {
    return uiidCommands.has(uiid)
}

export async function getSupportDeviceCommands(uiid) {
    return uiidCommands.get(uiid)
}