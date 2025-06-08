/**
 * RGB 5-Color LED Light
 */

export const commands = {
    "commands": [
        {
            "name": "SwitchOn",
            "describe": "turn on the switch",
            "command": {
                "switch": "on"
            }
        },
        {
            "name": "SwitchOff",
            "describe": "turn off the switch",
            "command": {
                "switch": "off"
            }
        },
        {
            "name": "SetWhiteMode",
            "describe": "set white light mode with brightness and color temperature",
            "command": {
                "ltype": "white",
                "white": {
                    "br": "{{br}}",
                    "ct": "{{ct}}"
                }
            },
            "args": {
                "br": {
                    "type": "number",
                    "describe": "brightness level, range 1-100"
                },
                "ct": {
                    "type": "number",
                    "describe": "color temperature, range 0-100"
                }
            }
        },
        {
            "name": "AdjustBrightness",
            "describe": "increase or decrease brightness",
            "command": {
                "brightAdjust": "{{adjustment}}"
            },
            "args": {
                "adjustment": {
                    "type": "string",
                    "describe": "adjustment direction, '+' or '-'"
                }
            }
        },
        {
            "name": "AdjustColourTemperature",
            "describe": "increase or decrease color temperature",
            "command": {
                "ColourTempAdjust": "{{adjustment}}"
            },
            "args": {
                "adjustment": {
                    "type": "string",
                    "describe": "adjustment direction, '+' or '-'"
                }
            }
        },
        {
            "name": "SetStartupBehavior",
            "describe": "set power-on behavior",
            "command": {
                "startup": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "string",
                    "describe": "power-on mode: on/stay/off/toggle"
                }
            }
        },
        {
            "name": "SetSlowlyLitTime",
            "describe": "set the slowly lit time in milliseconds",
            "command": {
                "slowlyLit": "{{time}}"
            },
            "args": {
                "time": {
                    "type": "number",
                    "describe": "time in milliseconds (0-10000)"
                }
            }
        },
        {
            "name": "SetSlowlyDimmedTime",
            "describe": "set the slowly dimmed time in milliseconds",
            "command": {
                "slowlyDimmed": "{{time}}"
            },
            "args": {
                "time": {
                    "type": "number",
                    "describe": "time in milliseconds (0-10000)"
                }
            }
        },
        {
            "name": "SetSmartControlMode",
            "describe": "enable or disable smart control mode",
            "command": {
                "smartControlMode": "{{enabled}}"
            },
            "args": {
                "enabled": {
                    "type": "boolean",
                    "describe": "true to enable, false to disable"
                }
            }
        }
    ]
}