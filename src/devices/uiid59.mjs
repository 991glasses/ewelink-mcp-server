/**
 * RGB music-sync light strip
 */

export const commands = {
    "commands": [
        {
            "name": "TurnOn",
            "describe": "turn on the light strip",
            "command": { "switch": "on" }
        },
        {
            "name": "TurnOff",
            "describe": "turn off the light strip",
            "command": { "switch": "off" }
        },
        {
            "name": "SetColor",
            "describe": "set RGB color in color mode",
            "command": {
                "mode": 1,
                "colorR": "{{arg1}}",
                "colorG": "{{arg2}}",
                "colorB": "{{arg3}}",
                "light_type": 1
            },
            "args": {
                "arg1": { "type": "number", "describe": "red component, 0-255" },
                "arg2": { "type": "number", "describe": "green component, 0-255" },
                "arg3": { "type": "number", "describe": "blue component, 0-255" }
            }
        },
        {
            "name": "SetBrightness",
            "describe": "adjust brightness level",
            "command": { "mode": 1, "bright": "{{arg1}}" },
            "args": {
                "arg1": { "type": "number", "describe": "brightness value 1-100" }
            }
        },
        {
            "name": "SetColorTemperature",
            "describe": "set color temperature with RGB values in white mode",
            "command": {
                "mode": 1,
                "colorR": "{{arg1}}",
                "colorG": "{{arg2}}",
                "colorB": "{{arg3}}",
                "light_type": 2
            },
            "args": {
                "arg1": { "type": "number", "describe": "temperature red component, 0-255" },
                "arg2": { "type": "number", "describe": "temperature green component, 0-255" },
                "arg3": { "type": "number", "describe": "temperature blue component, 0-255" }
            }
        },
        {
            "name": "SwitchMode",
            "describe": "switch operation mode and activate device",
            "command": { "mode": "{{arg1}}", "switch": "on" },
            "args": {
                "arg1": { "type": "number", "describe": "mode number 1-12" }
            }
        },
        {
            "name": "SetTimeZone",
            "describe": "configure time zone offset",
            "command": { "timeZone": "{{arg1}}" },
            "args": {
                "arg1": { "type": "number", "describe": "UTC offset from -12 to 12" }
            }
        }
    ]
}