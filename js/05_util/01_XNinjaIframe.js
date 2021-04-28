/**
 * http://msdn.microsoft.com/ja-jp/library/ie/hh180174%28v=vs.85%29.aspx
 * 孤立するとウィンドウ オブジェクトのプロパティが消去される
 * 
 * http://qiita.com/sou/items/3380d4fa9b08b27bb387
 * モバイルブラウザでの iframe の挙動（Mobile Safari, Chrome for Android)
 * 
 * @alias X.Util.NinjaIframe
 * @class NinjaIframe 隠し iframe 機能を提供します。
 * @extends {Node}
 */
var X_NinjaIframe = X[ 'Util' ][ 'NinjaIframe' ] = X_Node[ 'inherits' ](
    'NinjaIframe',

    /** @lends NinjaIframe.prototype */
    {
        /* autoRefresh  : 0, */

        /**
         * iframe の contentWindow
         * @private
         * @type {window} */
        _iwin        : null,

        /**
         * iframe に write する html 文字時列
         * @type {string} */
        _contentHTML : '',

        /**
         * iframe の name
         * @private
         * @type {string} */
        _name        : '',

        /**
         * iframe への html 文字列の write が完了した
         * @private
         * @type {string} */
        _ready       : false,

        'Constructor' : function( html ){
            // TODO src も設定可能に

            this._name = 'hidden-iframe-' + X_Timer_now();
            // https://github.com/polygonplanet/Pot.js/blob/master/src/Worker.js

            this[ 'Super' ](
                'IFRAME',
                {
                    className         : 'hidden-iframe',
                    scrolling         : 'no',
                    allowtransparency : 'no',
                    frameborder       : 0,
                    tabindex          : -1,
                    name              : this._name,
                    id                : this._name
                }
            );

            // http://nanto.asablo.jp/blog/2011/12/08/6237308
            // IE 6/7 で文書間通信を実現するための一案
            if( ( X_UA.Trident || X_UA.TridentMobile ) < 9 ){
                this[ 'attr' ]( 'src', 'about:blank' );
            };
            // Safari 2.0.* bug: iframe's absolute position and src set.
            if( !X_UA.WebKit ){
                this[ 'css' ]( { position : 'absolute' } );
            };
            
            if( html ) this._contentHTML = html;
            
            this[ 'appendTo' ]( X_Node_systemNode )
                [ 'listenOnce' ]( X_EVENT_KILL_INSTANCE, X_Util_NinjaIframe_handleEvent );
            
            X_ViewPort[ 'listenOnce' ]( X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent );
        },

        /**
         * iframe 内をリフレッシュ、または内容を上書きする
         * @param {string=} opt_contentHTML html文字列
         * @return {NinjaIframe} チェーンメソッド
         */
        'refresh' : function( opt_contentHTML ){
            this._ready = false;

            if( !this._iwin ){
                this._contentHTML = opt_contentHTML;
                return this;
            };

            if( 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 6 ){
                this._iwin.location.href = 'about:blank'; // reload() では、IE5.5(IETester)で2回目以降の操作でerrorが出る(doc取得やopen,writeで)
            } else {
                this._iwin.location.reload();
            };

            if( !X_Type_isString( opt_contentHTML ) ) return this;

            this._contentHTML = opt_contentHTML;

            if( !( ( X_UA.Trident || X_UA.TridentMobile ) < 9 ) ){
                X_Util_NinjaIframe_writeToIframe( this );
            };

            return this;
        }

    }
);


function X_Util_NinjaIframe_handleEvent( e ){
    var raw = this[ '_rawObject' ];

    switch( e.type ){
        case X_EVENT_AFTER_UPDATE :
            this._iwin = raw.contentWindow || ( raw.contentDocument && raw.contentDocument.parentWindow ) || window.frames[ this._name ];
            // http://d.hatena.ne.jp/NeoCat/20080921/1221940658
            // こちらに名前をsetしないとtargetが動作しない
            if( ( X_UA.Trident || X_UA.TridentMobile ) ) this._iwin.name = this._name;

            this[ 'listen' ]( ( X_UA.Trident || X_UA.TridentMobile ) < 9 ? 'readystatechange' : [ 'load', 'error' ], X_Util_NinjaIframe_handleEvent );

            if( !( ( X_UA.Trident || X_UA.TridentMobile ) < 9 ) ){
                X_Util_NinjaIframe_writeToIframe( this );
                return;
            };
            //break; これあると IE8 で駄目！

        case 'readystatechange' :
            if( ( raw.readyState !== 'complete' && raw.readyState !== 'loaded' ) ) break;
            // ie9-
            if( !this._ready ){
                X_Util_NinjaIframe_writeToIframe( this );
                break;
            };
            // onload
        case 'load' :
            this[ 'asyncDispatch' ]( 'ninjaload' );
            break;

        case 'error' :
            this[ 'asyncDispatch' ]( 'ninjaerror' );
            break;
        
        case X_EVENT_KILL_INSTANCE :
            X_ViewPort[ 'unlisten' ]( X_EVENT_AFTER_UPDATE, this, X_Util_NinjaIframe_handleEvent );
            this._iwin && this._iwin.close();
            break;
    };
    
    return X_CALLBACK_STOP_PROPAGATION;
};

function X_Util_NinjaIframe_writeToIframe( that ){
    var raw  = that[ '_rawObject' ],
        idoc = raw.contentDocument || that._iwin.document,
        html = that._contentHTML;
    
    that._ready = true; // これを削除すると ie6,7,8 で Stack overflow at line : 0 意味不明 'readystatechange' が繰り返し起こりループする??
    delete that._contentHTML;

    idoc.open();
    idoc.writeln( html );
    idoc.close();
};

