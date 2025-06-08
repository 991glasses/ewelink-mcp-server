/**
 * POWR3
 */

export const commands = {
    "commands": [
        {
            "name": "SwitchControl",
            "describe": "turn the switch on/off for a specific outlet",
            "command": {
                "switches": [
                    {
                        "switch": "{{state}}",
                        "outlet": "{{outlet}}"
                    }
                ],
                "operSide": 1
            },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on or off"
                },
                "outlet": {
                    "type": "number",
                    "describe": "outlet number (e.g., 0)"
                }
            }
        },
        {
            "name": "SledOnlineControl",
            "describe": "control the network status LED",
            "command": {
                "sledOnline": "{{state}}"
            },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on or off"
                }
            }
        },
        {
            "name": "ConfigureStartup",
            "describe": "set the startup behavior after power on",
            "command": {
                "configure": [
                    {
                        "outlet": "{{outlet}}",
                        "startup": "{{startup}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "outlet number"
                },
                "startup": {
                    "type": "string",
                    "describe": "startup state: on, stay, off"
                }
            }
        },
        {
            "name": "SetTimeZone",
            "describe": "set the device's time zone",
            "command": {
                "timeZone": "{{timeZone}}"
            },
            "args": {
                "timeZone": {
                    "type": "number",
                    "describe": "time zone offset from UTC, e.g., 8 for UTC+8"
                }
            }
        },
        {
            "name": "SetUIActiveTime",
            "describe": "set the real-time monitoring duration",
            "command": {
                "uiActive": "{{duration}}"
            },
            "args": {
                "duration": {
                    "type": "number",
                    "describe": "time in seconds (1-3600)"
                }
            }
        },
        {
            "name": "ResetTotalKwh",
            "describe": "reset total power consumption data",
            "command": {
                "totalKwh": "reset"
            }
        },
        {
            "name": "ResetTotalSupplyKwh",
            "describe": "reset total supplied power consumption data",
            "command": {
                "totalSupplyKwh": "reset"
            }
        }
    ]
}