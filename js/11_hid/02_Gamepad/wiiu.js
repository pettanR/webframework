/**
 * ウェブサイト制作者向け インターネットブラウザーの拡張機能について
 * https://www.nintendo.co.jp/hardware/wiiu/internetbrowser/extended_functionality.html
 */
var X_HID_GAMEPAD_wiiugamepad;

if( X_USE_GAMEPAD && X_UA.WiiU ){
    X_HID_GAMEPAD_wiiugamepad = wiiu.gamepad;

    X_HID_GamepadImplementation = {
        id           : 'wiiu',

        _connected   : false,
        _lastUpdated : 0,
        _index       : 0,
        _hold        : 0,
        _pad         : null,

        _update : function(){
            var pad;

            if( this._lastUpdated !== g_X_uniqueStamp ){
                pad = X_HID_GAMEPAD_wiiugamepad.update( this._index );
                this._lastUpdated = g_X_uniqueStamp;
                if( pad.isEnabled && pad.isDataValid ){
                    this._hold = pad.hold;
                    this._pad  = pad;
                } else {
                    this._hold = 0;
                    this._pad  = null;
                };
            };
        },

        isConnected : function(){
            return this._connected;
        },
        getTotalButtons : function(){
            return 16;
        },
        getButtonAt : function( index ){
            this._update();
            return this._hold & [
                0x00008000, 0x00004000, 0x00002000, 0x00001000,
                0x00000020, 0x00000010, 0x00000080, 0x00000040,
                0x00000004, 0x00000008, 0x00040000, 0x00020000,
                0x00000200, 0x00000100, 0x00000800, 0x00000400 ][ index ];
        },
        getTotalAxis : function(){
            return 7;
        },
        getAxisAt : function( index ){
            this._update();
            if( this._pad ){
                switch( index ){
                    case 0 :
                        return this._pad.lStickX;
                    case 1 :
                        return this._pad.lStickY;
                    case 2 :
                        return this._pad.rStickX;
                    case 3 :
                        return this._pad.rStickY;
                    case 4 :
                        return this._pad.gyroX;
                    case 5 :
                        return this._pad.gyroY;
                    case 6 :
                        return this._pad.gyroZ;
                };
            };
            return 0;
        }
    };
};