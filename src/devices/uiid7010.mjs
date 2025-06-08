/**
 * Zigbee3.0 Single channel outlet
 */

export const commands = {
    "commands": [
        {
            "name": "TurnOn",
            "describe": "turn on the switch",
            "command": {
                "switch": "on"
            }
        },
        {
            "name": "TurnOff",
            "describe": "turn off the switch",
            "command": {
                "switch": "off"
            }
        },
        {
            "name": "BacklightOn",
            "describe": "turn on the backlight indicator",
            "command": {
                "backlight": "on"
            }
        },
        {
            "name": "BacklightOff",
            "describe": "turn off the backlight indicator",
            "command": {
                "backlight": "off"
            }
        },
        {
            "name": "TurboModeEnable",
            "describe": "enable turbo mode",
            "command": {
                "wallPenetration": true
            }
        },
        {
            "name": "TurboModeDisable",
            "describe": "disable turbo mode",
            "command": {
                "wallPenetration": false
            }
        },
        {
            "name": "StartupSetting",
            "describe": "set the startup state when powered",
            "command": {
                "startup": "{{arg1}}"
            },
            "args": {
                "arg1": {
                    "type": "string",
                    "describe": "on, stay, off"
                }
            }
        },
        {
            "name": "StartupDelay",
            "describe": "set startup delay parameters",
            "command": {
                "enableDelay": "{{arg1}}",
                "width": "{{arg2}}"
            },
            "args": {
                "arg1": {
                    "type": "number",
                    "describe": "enable delay (0 or 1)"
                },
                "arg2": {
                    "type": "number",
                    "describe": "delay time in milliseconds (multiple of 500)"
                }
            }
        },
        {
            "name": "ExternalSwitchMode",
            "describe": "set external switch mode and reverse control",
            "command": {
                "swMode": "{{arg1}}",
                "swCtrlReverse": "{{arg2}}"
            },
            "args": {
                "arg1": {
                    "type": "number",
                    "describe": "switch mode: 1 (follow), 2 (edge), 3 (pulse)"
                },
                "arg2": {
                    "type": "string",
                    "describe": "reverse control: on or off"
                }
            }
        },
        {
            "name": "RelaySeparation",
            "describe": "set relay separation",
            "command": {
                "relaySeparation": "{{arg1}}"
            },
            "args": {
                "arg1": {
                    "type": "number",
                    "describe": "0 (disable) or 1 (enable)"
                }
            }
        }
    ]
}