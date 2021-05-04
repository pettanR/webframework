var X_HID_Gamepads,
    X_HID_Gamepad,
    X_HID_GamepadImplementation,
    X_HID_GAMEPAD_LIST = [],
// navigator.getGamepads;
// https://developer.mozilla.org/ja/docs/Web/API/Gamepad/axes
// 1 : navigator.getGamepads
// 2 : navigator.webkitGetGamepad
// 3 : Gecko 24~28, this feature is behind the dom.gamepad.enabled preference
// 4 : Wii or WiiU
// 5 : DS, DSi, 3DS, PSP, PSVita, PSPGo, Mylo ...
    X_HID_CANUSE_GAMEPAD =
        (
            X_UA.EdgeHTML || X_UA.EdgeMobile /* ?? */ || 29 <= X_UA.Gecko || 35 <= X_UA.Chromium || 603.1 <= X_UA.Webkit ||
            35 <= X_UA.ChromiumMobile || 32 <= X_UA.Fennec || 10.3 <= ( X_UA.SafariMobile || X_UA.iOSWebView ) || 4 <= X_UA.Samsung
        ) ? 1 :
        (
            21 <= X_UA.Chromium || 25 <= X_UA.ChromiumMobile || 2 <= X_UA.Samsung || X_UA.N3DS // ChromeWebView は非対応
        ) ? 2 :
        (
            24 <= X_UA.Gecko
        ) ? 3 :
        (
            X_UA.Wii || X_UA.WiiU
        ) ? 4 :
        (
            X_UA.NDS || X_UA.NDSi || X_UA.PSP || X_UA.PSPGo || X_UA.PSVita || X_UA.Mylo
        ) ? 5 : 0,

    X_HID_GAMEPAD_MAX = X_UA.Wii  ? 4 :
                        X_UA.WiiU ? 1 : 16,
    X_HID_GAMEPAD_getGamepads,
    X_HID_GAMEPAD_webKitGetGamepads,
    X_HID_GAMEPAD_hasEvent = ( X_HID_CANUSE_GAMEPAD === 1 || X_HID_CANUSE_GAMEPAD === 2 ) && !X_UA.Chromium && !X_UA.ChromiumMobile,
    X_HID_GAMEPAD_chromiumPads,
    X_HID_GAMEPAD_chromiumLastUpdated;

function X_HID_Gamepad_connect( index, opt_gamepad, opt_gamepadID ){
    var gamepad = X_HID_GAMEPAD_LIST[ index ];

    if( !gamepad ){
        gamepad = X_HID_GAMEPAD_LIST[ index ] = X_HID_Gamepad();
        gamepad._index = index;
    };

    if( opt_gamepad   ) gamepad._pad = opt_gamepad;
    if( opt_gamepadID ) gamepad.id   = opt_gamepadID;

    if( !gamepad._connected ){
        gamepad._connected = true;
        X_HID_Gamepads.asyncDispatch( { type : X_EVENT_READY, gamepad : gamepad, index : index } );
        gamepad.asyncDispatch( X_EVENT_READY );
    };
    return gamepad;
};

function X_HID_Gamepad_disconnect( index ){
    var gamepad = X_HID_GAMEPAD_LIST[ index ];

    if( gamepad && gamepad._connected ){
        gamepad._connected = false;
        if( X_HID_GAMEPAD_hasEvent ){
            gamepad._pad = null;
        };
        X_HID_Gamepads.asyncDispatch( { type : X_EVENT_LOST, gamepad : gamepad, index : index } );
        gamepad.asyncDispatch( X_EVENT_LOST );
    };
    return gamepad;
};

function X_HID_GAMEPAD_chromiumUpdateGamepad(){
    if( X_HID_GAMEPAD_chromiumLastUpdated !== g_X_uniqueStamp ){
        X_HID_GAMEPAD_chromiumPads        = navigator.getGamepads();//X_HID_GAMEPAD_getGamepads();
        X_HID_GAMEPAD_chromiumLastUpdated = g_X_uniqueStamp;
    };
    return X_HID_GAMEPAD_chromiumPads;
};