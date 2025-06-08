/**
 * Single channel outlet
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
        {
            "name": "AddOnceTimer",
            "describe": "schedule a single-execution timer",
            "command": {
                "timers": [
                    {
                        "enabled": "{{enabled}}",
                        "coolkit_timer_type": "once",
                        "type": "once",
                        "at": "{{time}}",
                        "do": {
                            "switch": "{{action}}"
                        },
                        "mId": "{{timerId}}"
                    }
                ]
            },
            "args": {
                "enabled": {
                    "type": "number",
                    "describe": "0=disabled, 1=enabled"
                },
                "time": {
                    "type": "string",
                    "describe": "execution time in GMT format"
                },
                "action": {
                    "type": "string",
                    "describe": "on or off"
                },
                "timerId": {
                    "type": "string",
                    "describe": "unique timer ID (UUID)"
                }
            }
        },
        {
            "name": "AddDelayTimer",
            "describe": "schedule a delayed action timer",
            "command": {
                "timers": [
                    {
                        "enabled": "{{enabled}}",
                        "coolkit_timer_type": "delay",
                        "period": "{{delayMinutes}}",
                        "type": "once",
                        "at": "{{startTime}}",
                        "do": {
                            "switch": "{{action}}"
                        },
                        "mId": "{{timerId}}"
                    }
                ]
            },
            "args": {
                "enabled": {
                    "type": "number",
                    "describe": "0=disabled, 1=enabled"
                },
                "startTime": {
                    "type": "string",
                    "describe": "base time in GMT format"
                },
                "delayMinutes": {
                    "type": "string",
                    "describe": "delay duration in minutes"
                },
                "action": {
                    "type": "string",
                    "describe": "on or off"
                },
                "timerId": {
                    "type": "string",
                    "describe": "unique timer ID (UUID)"
                }
            }
        },
        {
            "name": "AddRecurringTimer",
            "describe": "schedule a recurring cycle timer",
            "command": {
                "timers": [
                    {
                        "enabled": "{{enabled}}",
                        "coolkit_timer_type": "duration",
                        "type": "duration",
                        "mId": "{{timerId}}",
                        "at": "{{baseTime}} {{startDuration}} {{endDuration}}",
                        "startDo": {
                            "switch": "{{startAction}}"
                        },
                        "endDo": {
                            "switch": "{{endAction}}"
                        }
                    }
                ]
            },
            "args": {
                "enabled": {
                    "type": "number",
                    "describe": "0=disabled, 1=enabled"
                },
                "baseTime": {
                    "type": "string",
                    "describe": "base time in GMT format"
                },
                "startDuration": {
                    "type": "number",
                    "describe": "start phase duration in minutes"
                },
                "endDuration": {
                    "type": "number",
                    "describe": "end phase duration in minutes"
                },
                "startAction": {
                    "type": "string",
                    "describe": "on or off"
                },
                "endAction": {
                    "type": "string",
                    "describe": "on or off"
                },
                "timerId": {
                    "type": "string",
                    "describe": "unique timer ID (UUID)"
                }
            }
        }
    ]
}
