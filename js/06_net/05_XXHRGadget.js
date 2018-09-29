//{+xhrgadget"OpenSocialガジェット通信プロキシ"(クロスドメインは元よりクロスプロトコルな擬似xhr通信を可能にする)[+xhr]

/*
 * gadgets.io.makeRequest
 * 
 * 1. gadget-iframe を作る。指示を # で渡す。 元文書は frame 内の images の監視を開始する。
 *  1. 通信用 img の src
 *
 * 2. gadget-iframe が 通信用 img を作る。#ready
 * 
 * 3. 元文書が #ready を受け取ったら、iframe の # を書き換えて指示を送る。指示が長い場合、分割して送る。
 * 
 * 4. gadget-iframe は 通信用 img の # に結果を書く。コンテンツが長い場合、分割する。
 * 
 * 5. 元文書は結果を受け取ったことを gadget-iframe の # に書いて伝える。
 * 
 * 
 */

var X_GadgetXHR_canUse         = 5.5 <= X_UA[ 'IE' ] || !X_UA[ 'IE' ],
    
    X_GadgetXHR_iframeName     = 'gadgetProxy_' + ( Math.random() * 100000 | 0 ),
    
    X_GadgetXHR_GADGET_XML_URL = 'http://pettanr.github.io/webframework/gadget/X.Net.XHRGadget.xml',
    
    // https://kldleov8fp2dl82hphfmor8riij82tof-a-sites-opensocial.googleusercontent.com/gadgets/ifr
    X_GadgetXHR_GADGET_URL     = 'http://www.ig.gmodules.com/gadgets/ifr?url=' + encodeURIComponent( X_GadgetXHR_GADGET_XML_URL ) + '&nocache=1',
    
    X_GadgetXHR_IMAGE_URL      = 'img/opacity0.gif',
    
    // https://code.google.com/p/xssinterface/source/browse/trunk/js/xssinterface.js
    X_GadgetXHR_maxQueryLength = X_UA[ 'IE' ] || X_UA[ 'Edge' ] ? 2000 : 6000,
    
    X_GadgetXHR_useMessage     = window.onmessage !== undefined, // Edge で iframe+img を使った xdomain 通信ができない...

    X_GadgetXHR_requestBatches,
    
    X_GadgetXHR_requestOriginal,
    
    X_GadgetXHR_timerID,
    
    X_GadgetXHR_phase = -1,
    
    X_GadgetXHR_lastHashString,
    
    X_GadgetXHR_isReceiveBatches, X_GadgetXHR_receivedString = '';


function X_GadgetXHR_detectImageOverIframe(){
    var raw = X_GadgetXHR[ '_rawObject' ],
        iwin, frames, i, ret;
    
    if( raw ){
        iwin = raw.contentWindow || ( raw.contentDocument && raw.contentDocument.parentWindow ) || window.frames[ X_GadgetXHR_iframeName ];
        
        if( iwin && ( frames = iwin.frames ) && ( i = frames.length ) ){
            for( ; i; ){
                if( ret = X_Script_try( X_Object_find, [ frames[ --i ], 'location>hash' ] ) ) break;
            };
            if( ret && ret !== X_GadgetXHR_lastHashString ){
                X_GadgetXHR_lastHashString = ret;
                return X_GadgetXHR_workForReceivedMessage( ret.substr( 1 ), X_UA[ 'Gecko' ] ? unescape : decodeURIComponent ); // http://outcloud.blogspot.jp/2015/06/gecko-location-hash.html
            };
        };
    };
};

function X_GadgetXHR_onMessageFromGadget( e ){
    if( e.source === window.frames[ X_GadgetXHR_iframeName ] ){
        X_GadgetXHR_workForReceivedMessage( e.data, String ); // no decode
    };
};

function X_GadgetXHR_workForReceivedMessage( msg, decodeHashString ){
    var raw  = X_GadgetXHR[ '_rawObject' ],
        iwin = raw.contentWindow || ( raw.contentDocument && raw.contentDocument.parentWindow ) || window.frames[ X_GadgetXHR_iframeName ],
        iloc = iwin.location,
        n;

    switch( X_GadgetXHR_phase ){
        case -1 :
        case 0 : // makeRequest
            iloc.href = X_GadgetXHR_GADGET_URL + '#' + X_GadgetXHR_requestBatches.shift();
            if( X_GadgetXHR_requestBatches.length ){
                // speedup
                if( !X_GadgetXHR_useMessage ){
                    X_GadgetXHR_timerID = X_Timer_add( 16, 0, X_GadgetXHR_detectImageOverIframe );
                };
                return X_CALLBACK_UN_LISTEN;
            };
            X_GadgetXHR_phase = 1;
            break;
            
        case 1 : // after makeRequest > :ok 待ち
            iloc.href = X_GadgetXHR_GADGET_URL + '#_waiting_';
            X_GadgetXHR_phase = 2;
            // speeddown
            if( !X_GadgetXHR_useMessage ){
                X_GadgetXHR_timerID = X_Timer_add( 333, 0, X_GadgetXHR_detectImageOverIframe );
            };
            return X_CALLBACK_UN_LISTEN;

        case 2 : // _waiting_ 通信結果待ち
            if( X_GadgetXHR_isReceiveBatches ){
                X_GadgetXHR_receivedString += decodeHashString( msg );                        
                if( --X_GadgetXHR_isReceiveBatches ){
                    iloc.href = X_GadgetXHR_GADGET_URL + '#_recived_' + X_GadgetXHR_isReceiveBatches;
                    return;
                };
            } else {
                // 分割受信モードか?
                n = parseFloat( msg );
                if( 1 < n ){
                    msg = msg.substr( ( n + ':' ).length );
                    X_GadgetXHR_receivedString   = decodeHashString( msg );
                    X_GadgetXHR_isReceiveBatches = --n;
                    iloc.href = X_GadgetXHR_GADGET_URL + '#_recived_' + X_GadgetXHR_isReceiveBatches;
                    // speedup
                    if( !X_GadgetXHR_useMessage ){
                        X_GadgetXHR_timerID = X_Timer_add( 16, 0, X_GadgetXHR_detectImageOverIframe );
                    };
                    return X_CALLBACK_UN_LISTEN;
                } else {
                    X_GadgetXHR_receivedString = decodeHashString( msg );
                };
            };

            X_GadgetXHR_lastHashString = '';
            iloc.href = X_GadgetXHR_GADGET_URL + '#_recived_';
            
            X_GadgetXHR_phase = 3;
            break;
        case 3 :
            if( msg === 'ready' ){
                X_GadgetXHR[ 'asyncDispatch' ]( X_JSON_parseTrustableString( X_GadgetXHR_receivedString ) );
                X_GadgetXHR_receivedString = '';
                X_GadgetXHR._busy = false;

                X_GadgetXHR_timerID = X_GadgetXHR_phase = 0;
                return X_CALLBACK_UN_LISTEN;
            };
    };
};

X_TEMP.X_GadgetXHR_init = function(){
    var params = {
        'len'  : X_GadgetXHR_maxQueryLength,
        'itv'  : 333,
        'gck'  : X_UA[ 'Gecko' ] ? 1 : 0,
        'err'  : X_EVENT_ERROR,
        'suc'  : X_EVENT_SUCCESS
    };

    if( X_GadgetXHR_useMessage ){
        params[ 'tfo' ] = location.protocol + '//' + location.host;//location.origin;
        if( X_UA[ 'IE' ] < 9 ){
            window.attachEvent( 'onmessage', X_GadgetXHR_onMessageFromGadget );
        } else {
            window.addEventListener( 'message', X_GadgetXHR_onMessageFromGadget );
        };
    } else {
        params[ 'img' ] = X_URL_toAbsolutePath( X_GadgetXHR_IMAGE_URL );
    };

    X_GadgetXHR = X_Class_override(
            X_Node_systemNode
                .create( 'iframe', {
                    className         : 'hidden-iframe',
                    name              : X_GadgetXHR_iframeName,
                    id                : X_GadgetXHR_iframeName,
                    src               : X_GadgetXHR_GADGET_URL + '#' + encodeURIComponent( X_JSON_stringify( params ) ),
                    scrolling         : 'no',
                    allowtransparency : 'no',                    
                    frameborder       : 0,
                    tabindex          : -1
                    } ),
            X_TEMP.X_GadgetXHR_props );
    
    delete X_TEMP.X_GadgetXHR_init;
    delete X_TEMP.X_GadgetXHR_props;    
    
    X_GadgetXHR_requestBatches = [];
    
    return X_GadgetXHR;
};

X_TEMP.X_GadgetXHR_props = {

        _busy         : false,
        _canceled     : false,
        _onloadCount  : 0,
        
        load : function( obj ){
            var req = {},
                k, max, sendStr, l, str;
            //createURL

            X_GadgetXHR_requestOriginal = obj;
            
            for( k in obj ){
                switch( k ){
                    case 'url' :
                    case 'postdata' :
                    case 'method' :
                    case 'dataType' :
                    case 'headers' :
                    case 'cashe' :
                        req[ k ] = obj[ k ];
                        break;
                };
            };
            
            max = X_GadgetXHR_maxQueryLength - X_GadgetXHR_GADGET_URL.length - 5;
            
            sendStr = /* X_JSON_stringify */X[ 'JSON' ].stringify( req );
            
            while( sendStr.length ){
                l   = max;
                str = encodeURIComponent( sendStr.substr( 0, l ) );
                while( max < str.length ){
                    l   = l * ( 2 + l / str.length ) / 3 | 0;
                    str = encodeURIComponent( sendStr.substr( 0, l ) );
                    //console.log( l );
                };
                X_GadgetXHR_requestBatches.push( str );
                sendStr = sendStr.substr( l );
                str = '';
            };
            
            sendStr = '';
            
            if( 1 < X_GadgetXHR_requestBatches.length ){
                X_GadgetXHR_requestBatches[ 0 ] = X_GadgetXHR_requestBatches.length + ':' + X_GadgetXHR_requestBatches[ 0 ];    
            };
            
            if( !X_GadgetXHR_useMessage ){
                X_GadgetXHR_timerID = X_Timer_add( 333, 0, X_GadgetXHR_detectImageOverIframe );
            };
            
            X_GadgetXHR_phase === 0 && X_GadgetXHR_workForReceivedMessage();

            X_GadgetXHR._busy = true;
        },
        
        cancel : function(){
            X_GadgetXHR._canceled = true;
        },
        
        reset : function(){
            X_GadgetXHR._busy = X_GadgetXHR._canceled = false;
            X_GadgetXHR._onloadCount = 0;
        }
    };

//}+xhrgadget