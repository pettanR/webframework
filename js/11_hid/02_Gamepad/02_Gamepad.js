if( X_USE_GAMEPAD && X_HID_CANUSE_GAMEPAD ){
    X_TEMP.onSystemReady.push( function(){
        X_HID_Gamepad = X_EventDispatcher[ 'inherits' ]( X_HID_GamepadImplementation );
    } );
};

if( X_USE_GAMEPAD && ( X_HID_CANUSE_GAMEPAD === 1 || X_HID_CANUSE_GAMEPAD === 2 ) ){
    if( X_HID_GAMEPAD_hasEvent ){
        X_HID_GamepadImplementation = {
            _connected   : false,
            _index       : 0,
            _pad         : null,
    
            isConnected : function(){
                return this._connected;
            },
            getTotalButtons : function(){
                return this._pad ? this._pad.buttons.length : 0;
            },
            getButtonAt : function( index ){
                var btn = this._pad ? this._pad.buttons[ index ] : 0;

                return X_Type_isNumber( btn ) ? btn : btn.value;
            },
            getTotalAxis : function(){
                return this._pad ? this._pad.axes.length : 0;
            },
            getAxisAt : function( index ){
                return this._pad ? this._pad.axes[ index ] : 0;
            }
        };
    } else {
        if( X_HID_CANUSE_GAMEPAD === 2 ){
            navigator.getGamepads = navigator.webkitGetGamepads;
        };

        X_HID_GamepadImplementation = {
            _connected   : false,
            _index       : 0,

            isConnected : function(){
                return this._connected;
            },
            getTotalButtons : function(){
                var pad = X_HID_GAMEPAD_chromiumUpdateGamepad()[ this._index ];
                return pad ? pad.buttons.length : 0;
            },
            getButtonAt : function( index ){
                var pad = X_HID_GAMEPAD_chromiumUpdateGamepad()[ this._index ],
                    btn = pad ? pad.buttons[ index ] : 0;

                return X_Type_isNumber( btn ) ? btn : btn.value;
            },
            getTotalAxis : function(){
                var pad = X_HID_GAMEPAD_chromiumUpdateGamepad()[ this._index ];
                return pad ? pad.axes.length : 0;
            },
            getAxisAt : function( index ){
                var pad = X_HID_GAMEPAD_chromiumUpdateGamepad()[ this._index ];
                return pad ? pad.axes[ index ] : 0;
            }
        };
    };
};