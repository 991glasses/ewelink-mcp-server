/**
 * Constant temperature & humidity retrofit kit
 */

export const commands = {
    "commands": [
        {
            "name": "TurnOn",
            "describe": "turn on the device and set to normal mode",
            "command": {
                "switch": "on",
                "mainSwitch": "on",
                "deviceType": "normal"
            }
        },
        {
            "name": "TurnOff",
            "describe": "turn off the device and set to normal mode",
            "command": {
                "switch": "off",
                "mainSwitch": "off",
                "deviceType": "normal"
            }
        },
        {
            "name": "ExitAutoMode",
            "describe": "exit auto control mode",
            "command": {
                "mainSwitch": "off",
                "deviceType": "normal"
            }
        },
        {
            "name": "NetworkIndicatorOn",
            "describe": "turn on network indicator",
            "command": {
                "sledOnline": "on"
            }
        },
        {
            "name": "NetworkIndicatorOff",
            "describe": "turn off network indicator",
            "command": {
                "sledOnline": "off"
            }
        },
        {
            "name": "StartupSetting",
            "describe": "set power-on behavior",
            "command": {
                "startup": "{{arg1}}"
            },
            "args": {
                "arg1": {
                    "type": "string",
                    "describe": "on=power on, stay=keep last state, off=power off"
                }
            }
        },
        {
            "name": "PulseSetting",
            "describe": "configure pulse parameters",
            "command": {
                "pulse": "{{arg1}}",
                "pulseWidth": "{{arg2}}"
            },
            "args": {
                "arg1": {
                    "type": "string",
                    "describe": "on=enable pulse, off=disable pulse"
                },
                "arg2": {
                    "type": "number",
                    "describe": "pulse duration in milliseconds (500-3600000, multiples of 500)"
                }
            }
        }
    ]
}