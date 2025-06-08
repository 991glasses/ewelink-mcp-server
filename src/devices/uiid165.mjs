/**
 * Dual R3 lite
 */

export const commands = {
    "commands": [
        {
            "name": "SetSwitch",
            "describe": "Set the switch state for a specific outlet",
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
            "name": "SetStartupState",
            "describe": "Set the startup state for a specific outlet",
            "command": {
                "configure": [
                    {
                        "outlet": "{{outlet}}",
                        "startup": "{{startup}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "Outlet number (0 or 1)"
                },
                "startup": {
                    "type": "string",
                    "describe": "Startup state: 'on', 'stay', 'off'"
                }
            }
        },
        {
            "name": "SetPulse",
            "describe": "Set pulse settings for an outlet",
            "command": {
                "pulses": [
                    {
                        "pulse": "{{pulseState}}",
                        "width": "{{width}}",
                        "outlet": "{{outlet}}"
                    }
                ]
            },
            "args": {
                "outlet": {
                    "type": "number",
                    "describe": "Outlet number (0 or 1)"
                },
                "pulseState": {
                    "type": "string",
                    "describe": "Pulse state: 'on' or 'off'"
                },
                "width": {
                    "type": "number",
                    "describe": "Pulse width in milliseconds (multiple of 500)"
                }
            }
        },
        {
            "name": "SetWorkMode",
            "describe": "Set the device work mode",
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
            "name": "SetSwitchMode0",
            "describe": "Set switch mode for outlet 0",
            "command": {
                "swMode_00": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "Mode: 1 (pulse), 2 (edge), 3 (follow)"
                }
            }
        },
        {
            "name": "SetSwitchMode1",
            "describe": "Set switch mode for outlet 1",
            "command": {
                "swMode_01": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "Mode: 1 (pulse), 2 (edge), 3 (follow)"
                }
            }
        },
        {
            "name": "SetSwitchReverse0",
            "describe": "Set switch reverse for outlet 0",
            "command": {
                "swReverse_00": "{{reverse}}"
            },
            "args": {
                "reverse": {
                    "type": "number",
                    "describe": "Reverse: 1 (on) or 0 (off)"
                }
            }
        },
        {
            "name": "SetSwitchReverse1",
            "describe": "Set switch reverse for outlet 1",
            "command": {
                "swReverse_01": "{{reverse}}"
            },
            "args": {
                "reverse": {
                    "type": "number",
                    "describe": "Reverse: 1 (on) or 0 (off)"
                }
            }
        },
        {
            "name": "SetMotorAction",
            "describe": "Control motor action",
            "command": {
                "motorTurn": "{{action}}"
            },
            "args": {
                "action": {
                    "type": "number",
                    "describe": "0 (stop), 1 (forward), 2 (reverse)"
                }
            }
        },
        {
            "name": "SetLocation",
            "describe": "Set target location for motor",
            "command": {
                "location": "{{percentage}}"
            },
            "args": {
                "percentage": {
                    "type": "number",
                    "describe": "Percentage (0-100)"
                }
            }
        },
        {
            "name": "SetLEDBrightness",
            "describe": "Set LED brightness",
            "command": {
                "sledBright": "{{brightness}}"
            },
            "args": {
                "brightness": {
                    "type": "number",
                    "describe": "Brightness (0-100)"
                }
            }
        },
        {
            "name": "StartCalibration",
            "describe": "Start motor calibration",
            "command": {
                "calibration": "{{type}}"
            },
            "args": {
                "type": {
                    "type": "number",
                    "describe": "1 (auto), 2 (manual)"
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
                    "describe": "1 (on) or 0 (off)"
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
                    "describe": "1 (on) or 0 (off)"
                }
            }
        },
        {
            "name": "SetStopMode",
            "describe": "Set motor stop mode",
            "command": {
                "stopMode": "{{mode}}"
            },
            "args": {
                "mode": {
                    "type": "number",
                    "describe": "1 (stop), 2 (reverse), 3 (reverse to limit)"
                }
            }
        },
        {
            "name": "SetImpedeCurrent",
            "describe": "Set impede current threshold",
            "command": {
                "impedeCurrent": "{{current}}"
            },
            "args": {
                "current": {
                    "type": "number",
                    "describe": "Current in 0.01A units"
                }
            }
        }
    ]
}