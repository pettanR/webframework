/**
 * インターネットチャンネルの拡張機能を使ったサンプルページ
 * http://web.archive.org/web/20140817062050/http://www.nintendo.co.jp/wii/q_and_a/093_sample.html
 */
var X_HID_GAMEPAD_wiiremote;

if( X_USE_GAMEPAD && X_UA.Wii ){
    X_HID_GAMEPAD_wiiremote = opera.wiiremote;

    X_HID_GamepadImplementation = {
        id           : 'wii',
        _connected   : false,
        _lastUpdated : 0,
        _index       : 0,
        _hold        : 0,
        _pad         : null,

        _update : function(){
            var pad;

            if( this._lastUpdated !== g_X_uniqueStamp ){
                pad = X_HID_GAMEPAD_wiiremote.update( this._index );
                this._lastUpdated = g_X_uniqueStamp;;
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
            return 10;
        },
        getButtonAt : function( index ){
            this._update();
            return this._hold & [ 2048, 1024, 512, 256, 16, 4096, 8, 4, 2, 1 ][ index ];
        },
        getTotalAxis : function(){
            return 2;
        },
        getAxisAt : function( index ){
            this._update();
            if( this._pad ){
                switch( index ){
                    case 0 :
                        return this._pad.dpdRollX;
                    case 1 :
                        return this._pad.dpdRollY;
                };
            };
            return 0;
        }
    };
};
