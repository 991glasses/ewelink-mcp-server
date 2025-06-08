/**
 * Dual R3
 */

export const commands = {
    "commands": [
        {
            "name": "SwitchControl",
            "describe": "Set the switch state for an outlet",
            "command": {
                "switches": [
                    {
                        "outlet": "{{outlet}}",
                        "switch": "{{state}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "Outlet number (0 or 1)"
                },
                "state": {
                    "type": "string",
                    "describe": "Switch state: 'on' or 'off'"
                }
            }
        },
        {
            "name": "SetWorkMode",
            "describe": "Set the work mode of the device",
            "command": {
                "workMode": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "Work mode: 1 (switch), 2 (motor), 3 (meter)"
                }
            }
        },
        {
            "name": "MotorControl",
            "describe": "Control motor action",
            "command": {
                "motorTurn": "{{action}}"
            },
            "args": {
                "action": {
                    "type": "number",
                    "describe": "Action: 0 (stop), 1 (forward), 2 (reverse)"
                }
            }
        },
        {
            "name": "SetLocation",
            "describe": "Set motor target location",
            "command": {
                "location": "{{percentage}}"
            },
            "args": {
                "percentage": {
                    "type": "number",
                    "describe": "Target location percentage (0-100)"
                }
            }
        },
        {
            "name": "SetMotorSwitchMode",
            "describe": "Set motor external switch mode",
            "command": {
                "motorSwMode": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "Switch mode: 0 (none), 1 (single momentary), 2 (double momentary), 3 (triple)"
                }
            }
        },
        {
            "name": "SetOutputReverse",
            "describe": "Set relay output reverse",
            "command": {
                "outputReverse": "{{reverse}}"
            },
            "args": {
                "reverse": {
                    "type": "number",
                    "describe": "Reverse state: 0 (off), 1 (on)"
                }
            }
        },
        {
            "name": "SetMotorSwitchReverse",
            "describe": "Set motor switch reverse",
            "command": {
                "motorSwReverse": "{{reverse}}"
            },
            "args": {
                "reverse": {
                    "type": "number",
                    "describe": "Reverse state: 0 (off), 1 (on)"
                }
            }
        },
        {
            "name": "SetStopMode",
            "describe": "Set motor stop mode on obstruction",
            "command": {
                "stopMode": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "Stop mode: 1 (stop), 2 (rebound), 3 (rebound to upper limit)"
                }
            }
        },
        {
            "name": "SetSledBrightness",
            "describe": "Set the LED brightness",
            "command": {
                "sledBright": "{{brightness}}"
            },
            "args": {
                "brightness": {
                    "type": "number",
                    "describe": "Brightness level (0-100)"
                }
            }
        },
        {
            "name": "ActivateUIAutoAll",
            "describe": "Activate UI reporting for all outlets",
            "command": {
                "uiActive": {
                    "all": 1,
                    "time": "{{time}}"
                }
            },
            "args": {
                "time": {
                    "type": "number",
                    "describe": "Activation duration in seconds (1-3600)"
                }
            }
        },
        {
            "name": "CalibrateMotor",
            "describe": "Start motor calibration",
            "command": {
                "calibration": "{{type}}"
            },
            "args": {
                "type": {
                    "type": "number",
                    "describe": "Calibration type: 1 (auto), 2 (manual)"
                }
            }
        }
    ]
}