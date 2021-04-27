// TEST
if( X_DEFINE_IS_TEST ){
    X_HID_GAMEPAD_getGamepads       = navigator.getGamepads;
    X_HID_GAMEPAD_webKitGetGamepads = navigator.webkitGetGamepads;
    if( X_HID_GAMEPAD_getGamepads && X_HID_CANUSE_GAMEPAD === 1 ){
        // OK!
    } else if( X_HID_GAMEPAD_webKitGetGamepads && X_HID_CANUSE_GAMEPAD === 2 ){
        // OK!
    } else if( X_HID_GAMEPAD_getGamepads && X_HID_CANUSE_GAMEPAD === 3 ){
        X_HID_CANUSE_GAMEPAD = 1;
    } else if( X_HID_GAMEPAD_getGamepads || X_HID_GAMEPAD_webKitGetGamepads ){
        // 想定外のデータ
        X_HID_CANUSE_GAMEPAD = X_HID_GAMEPAD_getGamepads ? 1 : 2;
    };

    if( X_HID_CANUSE_GAMEPAD === 1 || X_HID_CANUSE_GAMEPAD === 2 ){
        if( X_Object_inObject( 'ongamepadconnected', window ) ){
            if( X_HID_GAMEPAD_hasEvent ){
                // OK!
            } else {
                // 想定外のデータ
                X_HID_GAMEPAD_hasEvent = true;
            };
        } else if( X_HID_GAMEPAD_hasEvent ){
            // 想定外のデータ
            X_HID_GAMEPAD_hasEvent = false;
        };
    };
};

if( X_USE_GAMEPAD && X_HID_CANUSE_GAMEPAD ){
    X_HID_Gamepads = X[ 'Gamepads' ] = X_EventDispatcher();

    X_HID_Gamepads[ 'startCapture' ] = function(){
        if( X_UA.WiiU ){
            X_Timer_add( 1000, 0, function(){
                var pad = X_HID_GAMEPAD_wiiugamepad.update();
        
                if( pad.isEnabled && pad.isDataValid ){
                    X_HID_Gamepad_connect( 0 );
                } else {
                    X_HID_Gamepad_disconnect( 0 );
                };
            } );
        } else if( X_UA.Wii ){
            X_Timer_add( 1000, 0, function(){
                var i = 0, pad;
        
                for(; i < X_HID_GAMEPAD_MAX; ++i ){
                    pad = X_HID_GAMEPAD_wiiremote.update( i );
        
                    if( pad.isEnabled ){
                        X_HID_Gamepad_connect( i );
                    } else {
                        X_HID_Gamepad_disconnect( i );
                    };
                };
            } );
        } else if( X_HID_GAMEPAD_hasEvent ){
            window.addEventListener( 'gamepadconnected', function( e ){
                X_HID_Gamepad_connect( e.gamepad.index, e.gamepad, e.gamepad.id );
            } );
            window.addEventListener( 'gamepaddisconnected', function( e ){
                X_HID_Gamepad_disconnect( e.gamepad.index );
            } );
        } else {
            X_Timer_add( 1000, 0, function(){
                var i = 0, pads = X_HID_GAMEPAD_chromiumUpdateGamepad(), pad;

                for(; i < X_HID_GAMEPAD_MAX; ++i ){
                    pad = pads && pads[ i ];
        
                    if( pad ){
                        X_HID_Gamepad_connect( i, 0, pads[ i ].id );
                    } else {
                        X_HID_Gamepad_disconnect( i );
                    };
                };
            } );
        };
    };

    X_HID_Gamepads[ 'getNumGamepads' ] = function(){ return X_HID_GAMEPAD_LIST.length };

    X_HID_Gamepads[ 'getGamepadAt' ] = function( index, opt_virtualPad ){
        var gamepad = X_HID_GAMEPAD_LIST[ index ];

        if( !gamepad ){
            gamepad = X_HID_GAMEPAD_LIST[ index ] = X_HID_Gamepad();
            gamepad._index = index;
        };
        return gamepad;
    };
};
