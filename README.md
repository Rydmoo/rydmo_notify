# Simple Notification
This is free a notification that i did for fun its a extremely simple notifications.

# install QB-Core
Find this in qb-core/client/functions.lua
```lua
function QBCore.Functions.Notify(text, texttype, length, icon)
    local message = {
        action = 'notify',
        type = texttype or 'primary',
        length = length or 5000,
    }

    if type(text) == 'table' then
        message.text = text.text or 'Placeholder'
        message.caption = text.caption or 'Placeholder'
    else
        message.text = text
    end

    if icon then
        message.icon = icon
    end

    SendNUIMessage(message)
end
```

Replace it to this
```lua
---@param msg string
---@param nType string
---@param sound string
function QBCore.Functions.Notify(msg, nType, sound)
    if type(msg) == 'table' then
        local ttext = msg.text or 'Notification'
        local ttype = msg.type or 'information'
        local tsound = msg.sound or 'defaultaudio.wav'
        
        exports.rydmo_notify:LoadNotification(ttext, ttype, tsound)
    else
        exports.rydmo_notify:LoadNotification(msg, nType, sound)
    end
end
```
