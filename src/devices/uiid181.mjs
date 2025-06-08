/**
 * TH R3
 */

export const commands = {
    "commands": [
        {
            "name": "Switch",
            "describe": "turn on or off the switch",
            "command": { "switch": "{{state}}" },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on=open switch, off=close switch"
                }
            }
        },
        {
            "name": "SledOnline",
            "describe": "enable or disable the network status LED",
            "command": { "sledOnline": "{{state}}" },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on=enable, off=disable"
                }
            }
        },
        {
            "name": "Startup",
            "describe": "set the startup state after power-on",
            "command": { "startup": "{{state}}" },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on=open switch, off=close switch, stay=keep previous state"
                }
            }
        },
        {
            "name": "PulseConfig",
            "describe": "configure pulse settings",
            "command": {
                "pulseConfig": {
                    "pulse": "{{pulseState}}",
                    "switch": "{{switchState}}",
                    "pulseWidth": "{{width}}"
                }
            },
            "args": {
                "pulseState": {
                    "type": "string",
                    "describe": "on=enable pulse, off=disable"
                },
                "switchState": {
                    "type": "string",
                    "describe": "on=pulse open, off=pulse close"
                },
                "width": {
                    "type": "number",
                    "describe": "duration in milliseconds, multiples of 500"
                }
            }
        },
        {
            "name": "TempHumidityCalibration",
            "describe": "set temperature and humidity correction values",
            "command": {
                "tempCorrection": "{{temp}}",
                "humCorrection": "{{hum}}"
            },
            "args": {
                "temp": {
                    "type": "number",
                    "describe": "temperature correction value multiplied by 10 (range: -100 to 100)"
                },
                "hum": {
                    "type": "number",
                    "describe": "humidity correction value multiplied by 10 (range: -100 to 100)"
                }
            }
        }
    ]
}