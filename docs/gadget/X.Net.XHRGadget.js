
(function( window, document, setInterval, clearInterval, gadgets ){

var gadgets_io_makeRequest = gadgets[ 'io' ][ 'makeRequest' ],
    gadgets_json_parse     = gadgets[ 'json' ][ 'parse' ],
    gadgets_json_stringify = gadgets[ 'json' ][ 'stringify' ],

    whiteList         = [ 'http://127.0.0.1:8020', 'https://pettanr.github.io/' ],
    receivedTaskID    = 0,
    hashString        = ( location.hash || '#{}' ).substr( 1 ),
    initParams        = gadgets_json_parse( decodeURIComponent( hashString ) ),
    proxyImageSrc     = initParams[ 'img' ],
    maxQueryLength    = initParams[ 'len' ] || 1000,
    detectionInterval = initParams[ 'itv' ] || 1000,
    decodeHashString  = initParams[ 'gck' ] ? unescape : decodeURIComponent, // gecko
    eventTypeError    = initParams[ 'err' ] || 'error',
    eventTypeSuccess  = initParams[ 'suc' ] || 'success',

// TODO postmassage
    postMessageKey    = initParams[ 'pmk' ] || 0,
// TODO onhashchange
    useOnHashChange   = window.onhashchange,

    // 分割転送モード
    numReceive = 0, receivedBatches = [],
    canResponse = false, responseBatches = [],
    
    proxyIframe, sendDataType, timerID;

while( true ){
    if( !whiteList.length ) return alert( 'whitelist error!' );
    if( proxyImageSrc.indexOf( whiteList.pop() ) === 0 ) break;
};

onunload = function(){
    timerID && clearInterval( timerID );
    
    try {
        // http://kojikoji75.hatenablog.com/entry/2013/12/15/223839
        if( proxyIframe ) proxyIframe.closed || proxyIframe.open('about:blank','_self').close();
    } catch( e ){
        
    };
};

gadgets[ 'util' ][ 'registerOnLoadHandler' ](function(){
    if( useOnHashChange ){
        onhashchange = detectHashChange;
    } else {
        timerID = setInterval( detectHashChange, detectionInterval );
    };
    
    proxyIframe = document.createElement( 'iframe' );
    document.body.appendChild( proxyIframe );
    proxyIframe.src = proxyImageSrc + '#ready';
});

// init ここまで

function detectHashChange(){
    var params, n;

    if( location.hash !== '#' + hashString ){

        hashString = ( location.hash || '#{}' ).substr( 1 );
        
        // TODO window.close() 指示
        //if( hashString === '_kill_' ) return;
        
        //console.log( hashString );
        
        // 親フレームは、結果受信モードに以降。
        if( hashString === '_waiting_' ){
            if( numReceive ){
                alert( 'コマンド取りこぼし！' + numReceive );
                return;
            };
            // 結果を親フレームに転送可能
            canResponse = true;
            sendResponse();
            return;
        };
        // 分割送信を親フレームが受け取った
        if( hashString.indexOf( '_recived_' ) === 0 ){
            // 続きの送信。 or ready
            if( responseBatches.length ){
                canResponse = true;
                sendResponse();
            } else {
                sendMessage( 'ready' );
                
                if( !useOnHashChange ){
                    clearInterval( timerID );
                    timerID = setInterval( detectHashChange, detectionInterval );                    
                };
            };
            return;
        };

        if( numReceive ){
            // 分割受信中...
            receivedBatches.push( decodeHashString( hashString ) );
            
            if( --numReceive ){
                sendMessage( receivedTaskID + ':' + numReceive );
                return;
            };
            // 分割受信完了
        } else {
            ++receivedTaskID;
            
            // 分割受信モードか?
            n = parseInt( hashString );
            if( 1 < n ){
                receivedBatches[ 0 ] = decodeHashString( hashString.substr( ( n + ':' ).length ) );
                numReceive = --n;
                sendMessage( receivedTaskID + ':' + numReceive );
                return;
            };
            
            receivedBatches[ 0 ] = decodeHashString( hashString );
        };

        sendMessage( receivedTaskID + ':ok' );
        
        doRequest( gadgets_json_parse( receivedBatches.join( '' ) ) );
        receivedBatches.length = 0;
    };
};

/*
 * 親フレームはこの hash の変化を監視して、続くタスクの送信を行う。
 */
function sendMessage( msg ){
    proxyIframe.src = proxyImageSrc + '#' + msg;
    canResponse = false;
};

function sendResponse(){
    if( canResponse && responseBatches.length ){
        sendMessage( responseBatches.shift() );        
    };
};

function doRequest( obj ){
    var url = obj[ 'url' ],
        opt = {
            'CONTENT_TYPE'     : 'TEXT',
            'GET_FULL_HEADERS' : true,
            'REFRESH_INTERVAL' : 0
        }, k, v;
    
    for( k in obj ){
        if( v = '' + obj[ k ] ){
            switch( k ){
                case 'postdata' :
                    v = obj[ k ];
                    opt[ 'POST_DATA' ] = typeof v === 'object' ? gadgets_json_stringify( v ) : v;
                    break;
                case 'method' :
                    opt[ 'METHOD' ] = v;
                    break;                    
                case 'dataType' :
                    // TEXT 以外は無視される?
                    switch( v = v.toUpperCase() ){
                        case 'HTML' : case 'HTM' :
                        case 'XML'  :
                            opt[ 'CONTENT_TYPE' ] = sendDataType = 'DOM';
                            break;
                        default :
                        //case 'FEED' ://case 'DOM'  ://case 'TEXT' ://case 'JSON' :
                            opt[ 'CONTENT_TYPE' ] = sendDataType = v;
                            break;
                    };
                    break;
                case 'headers' :
                    opt[ 'HEADERS' ] = obj[ k ];
                    break;
                case 'cashe' :
                    opt[ 'REFRESH_INTERVAL' ] = 3600;
                    break;
            };                    
        };
    };

    gadgets_io_makeRequest( url, onRequestComplete, opt );
};

function onRequestComplete( response ){
    var data = response[ 'text' ] || response[ 'json' ] || '',
        rc   = response[ 'rc' ],
        str, l, sendStr, errors, error, ev;
    
    //console && console.dir && console.dir( response );
    
    if( data ){
        if( sendDataType === 'JSON' && typeof data !== 'object' ){
            try {
                data = gadgets_json_parse( data );            
            } catch( err ){
                rc     = 500;
                errors = [ '' + err ];
            };
        };
    } else
    if( response[ 'xml' ] ){
        
    } else
    if( response[ 'feed' ] ){
        
    } else {
        
    };

    errors = errors || response[ 'errors' ];
    error  = errors && errors.length;
    
    if( error || rc < 200 || 400 < rc ){
        ev = {
            type      : eventTypeError,
            status    : rc || response[ 'code' ] || 400,
            'message' : error && errors.join( '\n' )
        };
    } else {
        ev = {
            type       : eventTypeSuccess,
            status     : rc || 200,
            'response' : data
        };
    };
    
    ev[ 'headers' ] = response[ 'headers' ];
    
    //console && console.dir && console.dir( ev );
    
    sendStr = gadgets_json_stringify( ev );
    
    while( sendStr.length ){
        l   = maxQueryLength;
        str = encodeURIComponent( sendStr.substr( 0, l ) );
        while( maxQueryLength < str.length ){
            l   = l * ( 2 + l / str.length ) / 3 | 0;
            str = encodeURIComponent( sendStr.substr( 0, l ) );
            //console.log( l );
        };
        responseBatches.push( str );
        str = '';
        sendStr = sendStr.substr( l );
        //console.log( responseBatches.length + ' / ' + str.length );
    };
    
    sendStr = '';
    
    if( 1 < responseBatches.length ){
        responseBatches[ 0 ] = responseBatches.length + ':' + responseBatches[ 0 ];    
    };
    
    // speedup
    if( !useOnHashChange ){
        clearInterval( timerID );
        timerID = setInterval( detectHashChange, 16 );        
    };

    sendResponse();
};

})( window, document, setInterval, clearInterval, window[ 'gadgets' ] );

