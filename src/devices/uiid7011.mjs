/**
 * Zigbee3.0 Dual channel outlet
 */

export const commands = {
    "commands": [
        {
            "name": "SetSwitch",
            "describe": "set the switch state for a specific outlet",
            "command": {
                "switches": [
                    {
                        "switch": "{{state}}",
                        "outlet": "{{outlet}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "outlet number (0-3)"
                },
                "state": {
                    "type": "string",
                    "describe": "on or off"
                }
            }
        },
        {
            "name": "SetPowerOnState",
            "describe": "configure the startup behavior for an outlet",
            "command": {
                "configure": [
                    {
                        "outlet": "{{outlet}}",
                        "startup": "{{mode}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "outlet number (0-3)"
                },
                "mode": {
                    "type": "string",
                    "describe": "startup behavior: on, stay, off"
                }
            }
        },
        {
            "name": "TurnOnBacklight",
            "describe": "turn on the backlight",
            "command": {
                "backlight": "on"
            }
        },
        {
            "name": "TurnOffBacklight",
            "describe": "turn off the backlight",
            "command": {
                "backlight": "off"
            }
        }
    ]
}