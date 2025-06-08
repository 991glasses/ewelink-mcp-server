/**
 * Energy monitoring outlet
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
            "name": "DisableIndicator",
            "describe": "disable the indicator light",
            "command": {
                "sledOnline": "on"
            }
        },
        {
            "name": "EnableIndicator",
            "describe": "enable the indicator light",
            "command": {
                "sledOnline": "off"
            }
        },
        {
            "name": "SetStartup",
            "describe": "set startup reaction on power restoration",
            "command": {
                "startup": "{{state}}"
            },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on=power on, stay=keep state, off=power off"
                }
            }
        },
        {
            "name": "SetPulse",
            "describe": "configure pulse mode and duration",
            "command": {
                "pulse": "{{enable}}",
                "pulseWidth": "{{width}}"
            },
            "args": {
                "enable": {
                    "type": "string",
                    "describe": "on=enable pulse, off=disable pulse"
                },
                "width": {
                    "type": "number",
                    "describe": "duration in milliseconds (multiple of 500)"
                }
            }
        },
    ]
}
