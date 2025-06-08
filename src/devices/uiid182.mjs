/**
 * Power Monitoring outlet
 */

export const commands = {
    "commands": [
        {
            "name": "SetOutletSwitch",
            "describe": "Set the switch state of the outlet",
            "command": {
                "switches": [
                    {
                        "switch": "{{state}}",
                        "outlet": 0
                    }
                ]
            },
            "args": {
                "state": {
                    "type": "string",
                    "describe": "on=open, off=close"
                }
            }
        },
        {
            "name": "SetStartup",
            "describe": "Set the startup state after power-on",
            "command": {
                "configure": [
                    {
                        "outlet": 0,
                        "startup": "{{mode}}"
                    }
                ]
            },
            "args": {
                "mode": {
                    "type": "string",
                    "describe": "on=power on, off=power off, stay=keep previous state"
                }
            }
        },
        {
            "name": "SetNetworkLED",
            "describe": "Control network status LED",
            "command": {
                "sledOnline": "{{status}}"
            },
            "args": {
                "status": {
                    "type": "string",
                    "describe": "on=enable LED, off=disable LED"
                }
            }
        }
    ]
}