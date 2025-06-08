/**
 * Four-channel outlet 
 */

export const commands = {
    "commands": [
        {
            "name": "TurnOnSled",
            "describe": "Turn on the network indicator light",
            "command": { "sledOnline": "on" }
        },
        {
            "name": "TurnOffSled",
            "describe": "Turn off the network indicator light",
            "command": { "sledOnline": "off" }
        },
        {
            "name": "TurnOnBacklight",
            "describe": "Turn on the backlight",
            "command": { "backlight": "on" }
        },
        {
            "name": "TurnOffBacklight",
            "describe": "Turn off the backlight",
            "command": { "backlight": "off" }
        },
        {
            "name": "SetSwitch",
            "describe": "Set the switch state for a specific outlet",
            "command": {
                "switches": [
                    {
                        "switch": "{{state}}",
                        "outlet": "{{outlet}}"
                    }
                ]
            },
            "args": {
                "state": { "type": "string", "describe": "Switch state (on/off)" },
                "outlet": { "type": "number", "describe": "Outlet number (0-3)" }
            }
        }
    ]
}