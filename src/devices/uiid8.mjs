/**
 * Three-channel outlet
 */

export const commands = {
    "commands": [
        {
            "name": "TurnAllChannelsOn",
            "describe": "turn on all channels",
            "command": {
                "switches": [
                    { "outlet": 0, "switch": "on" },
                    { "outlet": 1, "switch": "on" },
                    { "outlet": 2, "switch": "on" },
                    { "outlet": 3, "switch": "on" }
                ]
            }
        },
        {
            "name": "TurnAllChannelsOff",
            "describe": "turn off all channels",
            "command": {
                "switches": [
                    { "outlet": 0, "switch": "off" },
                    { "outlet": 1, "switch": "off" },
                    { "outlet": 2, "switch": "off" },
                    { "outlet": 3, "switch": "off" }
                ]
            }
        },
        {
            "name": "EnableInterlock",
            "describe": "enable interlock and clear timers",
            "command": {
                "lock": 1,
                "zyx_clear_timers": true
            }
        },
        {
            "name": "DisableInterlock",
            "describe": "disable interlock",
            "command": {
                "lock": 0
            }
        },
        {
            "name": "SetSingleChannelSwitch",
            "describe": "set switch state for a single channel",
            "command": {
                "switches": [
                    { "outlet": "{{outlet}}", "switch": "{{state}}" }
                ]
            },
            "args": {
                "outlet": { "type": "number", "describe": "0-3 representing channel 1-4" },
                "state": { "type": "string", "describe": "on or off" }
            }
        },
        {
            "name": "SetNetworkIndicator",
            "describe": "set network indicator state",
            "command": {
                "sledOnline": "{{state}}"
            },
            "args": {
                "state": { "type": "string", "describe": "on or off" }
            }
        },
        {
            "name": "SetPulseSettings",
            "describe": "set pulse settings for a channel",
            "command": {
                "pulses": [
                    { "pulse": "{{pulse}}", "width": "{{width}}", "outlet": "{{outlet}}" }
                ]
            },
            "args": {
                "outlet": { "type": "number", "describe": "0-3 representing channel 1-4" },
                "pulse": { "type": "string", "describe": "on or off" },
                "width": { "type": "number", "describe": "duration in milliseconds (500-3600000, multiples of 500)" }
            }
        },
        {
            "name": "SetDelayTimer",
            "describe": "set delay timer for a channel",
            "command": {
                "timers": [
                    {
                        "coolkit_timer_type": "delay",
                        "do": { "switch": "{{switch}}", "outlet": "{{outlet}}" },
                        "period": "{{period}}"
                    }
                ]
            },
            "args": {
                "outlet": { "type": "number", "describe": "0-3 representing channel 1-4" },
                "switch": { "type": "string", "describe": "on or off" },
                "period": { "type": "number", "describe": "delay time in minutes" }
            }
        }
    ]
}