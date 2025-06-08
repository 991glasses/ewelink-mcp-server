#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { newServer } from './mcp.mjs';
import { init } from './api.mjs'

const args = process.argv.slice(2);
async function main() {
    if (args.length > 0 && args[0] === 'login') {
        const { login } = await import('./login.mjs');
        await login();
    } else {
        await init();
        const server = newServer();
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.info("eWelink MCP Server running on stdio");
    }

}

main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});