import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import * as tools from "./tools.mjs";
export function newServer() {
    const server = new McpServer({
        name: 'ewelink-server',
        version: '0.0.1'
    });

    server.tool(
        "get_devices",
        "get all devices on ewelink",
        {},
        tools.getDevices
    );

    server.tool(
        "get_device_info",
        "get device status and control commands",
        { deviceId: z.string().describe("The id of the device") },
        tools.getDeviceInfo
    )

    server.tool(
        "control_device",
        "send command to a device to control it",
        {
            deviceId: z.string().describe("The id of the device you want to operate"),
            command: z.string().describe("string, JSON formatted command")
        },
        tools.controlDevice
    )

    return server;
}