Notify = {};

Notify.Load = function(message, type, sound)
    if sound and type == 'error' then
        PlaySoundFrontend(-1, 'Highlight_Error', 'DLC_HEIST_PLANNING_BOARD_SOUNDS', false)
    end

    if sound and type == 'success' then
        PlaySoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", false)
    end

    SendNUIMessage({
        type = type,
        message = message,
        timeout = timeout
    })
end


exports('LoadNotification', Notify.Load)