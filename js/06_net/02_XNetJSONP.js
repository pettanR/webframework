//{+jsonp"jsonpによるajax"(jsonpによるクロスドメイン通信。)[+net,+ninjaiframe]

/*
 * Operaでも非同期リクエストが並列処理できる img-JSONP
 * http://developer.cybozu.co.jp/takesako/2007/06/opera_img-jsonp.html
 * 
 * iframe を使った jsonp の読み込みエラー判定の記事、
 * https://web.archive.org/web/20120917100043/http://d.hatena.ne.jp/yuushimizu/20090128/1233146321
 * TODO JSONPの動的取得+エラー処理
 * http://d.hatena.ne.jp/NeoCat/20110206/1296934235
 * 
 * Safari が JavaScript ファイルを動的ロードできない件
 * http://www.bricklife.com/weblog/000618.html
 * 
 * IE9でiframe内で遷移した場合window.parentのメソッドを呼べない 
 * http://kozo002.blogspot.jp/2012/07/ie9iframewindowparent.html
 * 
 * IE6(IETester,localhost) で動かない,
 * 
 * TODO iframe 内を他ドメインにして jsonp のセキュリティを強化。他ドメインに jsonp を読み込んで 正しい JSON か？検証後にフレーム間通信で戻す。
 */

    // TODO chashe
    // TODO iframe useful or not. TODO check dynamicIframe
    // TODO file: では http: は使えない

X_TEMP.X_JSONP_cb = function( accessKey, jsonString, time, opt_json2FileSize ){
            if( accessKey !== X_JSONP_ACCESS_KEY || !X_JSONP._busy ) return;
            
            X_JSONP._busy = false;
            
            X_JSONP
                [ 'asyncDispatch' ]( {
                    type     : jsonString ? X_EVENT_SUCCESS : X_EVENT_ERROR,
                    response : X_JSON_parseTrustableString( jsonString )
                } );
            
            X_JSONP_errorTimerID && X_Timer_remove( X_JSONP_errorTimerID );
            
            console.log( 'ms : ' + time + ' speed : ' + ( ( jsonString.length + ( opt_json2FileSize || 0 ) ) / time * 1000 ) + ' バイト/秒.' );
    };

var X_JSONP_ACCESS_KEY = Math.random(),
    
    X_JSONP_maxOnloadCount,
    
    X_JSONP_onloadCount = 0,
    
    X_JSONP_errorTimerID;

X_TEMP.X_JSONP_init = function(){
    X[ 'Net' ][ '__json_cb__' ] = X_TEMP.X_JSONP_cb;
    
    X_JSONP = X_Class_override( X_NinjaIframe(), X_TEMP.X_JSONP_params );
    
    delete X_TEMP.X_JSONP_cb;
    delete X_TEMP.X_JSONP_init;
    delete X_TEMP.X_JSONP_params;
    
    return X_JSONP;
};

X_TEMP.X_JSONP_params = {
    
            _busy         : false,
            _canceled     : false,
            
            load : function( option ){
                //createURL
                var url           = option[ 'url' ],
                    callback      = option[ 'callbackName' ],
                    charset       = option[ 'charset' ],
                    json2Path     = window.RegExp ? 'js/libs/json2.js' : 'js/libs/json2_regfree.js',
                    json2FileSize = 18103,
                    html;
                
                // file プロトコルで外部アクセスの禁止
                if( !X_URL_isSameProtocol( url ) ){
                    return X_JSONP[ 'asyncDispatch' ]( X_EVENT_ERROR );
                };

                if( !callback && !( callback = X_URL_paramToObj( url.split( '?' )[ 1 ] )[ 'callback' ] ) ){
                    url += '&callback=cb';
                    callback = 'cb';
                };
                
                charset = charset ? ' charset="' + charset + '"' : '';
                
                // TODO '<scr'+'ipt> 化 恐らくアンチウイルスソフトが反応しないための対策
                // document.postMessage()→window.postMessage() (Opera 9.50 build 9841 -)
                // http://d.hatena.ne.jp/cnrd/20080518/1211099169
                // 最近の仕様変更(引数のtargetOriginとかMessageEventのoriginとか)にはまだ対応してないみたい 
            
                if( X_UA[ 'Prsto' ] ){
                    html = [
                        ( window[ 'JSON' ] ? '' : '<script src="' + json2Path + '"></script>' ),
                        '<script>',
                            'onunload=function(){im.onload=im.onerror=""};',
                            'nw=+new Date;',
                            'function ', callback, '(o){if(nw){nw-=+new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw', window[ 'JSON' ] ? json2FileSize : 0 ,');nw=0}}',
                        '</script>',    
                        '<script', charset, ' id="jp"></script>',
                        '<img id="im" src="', url, '" onload="jp.src=im.src" onerror="jp.src=im.src">'
                    ];
                    X_JSONP_maxOnloadCount = 2;
                } else
                if( X_UA[ 'IE' ] < 5 || X_UA[ 'MacIE' ] ){
                    html = [
                        '<script id="jn"></script>',
                        '<script', charset, ' id="jp"></script>',
                        '<script>',
                            'onunload=function(){clearTimeout(id)};',
                            'function ', callback, '(o){nw-=new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw-16,', json2FileSize, ')}',
                            'function t1(){document.all.jn.src="', json2Path ,'";id=setTimeout("t2()",16);nw=+new Date}',
                            'id=setTimeout("t1()",16);',
                            'function t2(){if(window.JSON){document.all.jp.src="', url ,'"}else{id=setTimeout("t2()",16)}}',
                        '</script>'
                    ];
                    X_JSONP_maxOnloadCount = 3;
                } else
                if( X_UA[ 'IE' ] < 8 ){ // ie5-7
                    html = [
                        '<script id="jn"></script>',
                        '<script', charset, ' id="jp"></script>',
                        '<script>',
                            'onunload=function(){clearTimeout(id)};',
                            'function ', callback, '(o){nw-=new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw-16,', json2FileSize, ')}',
                            'function t1(){jn.src="', json2Path ,'";id=setTimeout(t2,16);nw=+new Date}',
                            'id=setTimeout(t1,16);',
                            'function t2(){if(window.JSON){jp.src="', url ,'"}else{id=setTimeout(t2,16)}}',
                        '</script>'
                    ];
                    X_JSONP_maxOnloadCount = 3;
                } else
                if( X_UA[ 'IE' ] < 9 ){
                    html = [
                        '<script', charset, ' id="jp"></script>',
                        '<script>',
                            'onunload=function(){clearTimeout(id)};',
                            'nw=0;', // なぜか必要,,,
                            'function ', callback, '(o){nw-=+new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',parent.X.JSON.stringify(o),-nw)}',
                            //'function ', callback, '(o){if(nw){nw-=+new Date;postMessage("', X_JSONP_SEND_MSG_KEY,' "+nw+"|"+parent.JSON.stringify(o).replace(/\\\\u([a-fA-F0-9]{4})/g,function(a,b){return String.fromCharCode(parseInt(b,16))}),"*");nw=0}}',            
                            'function tm(){jp.src="', url ,'";nw=+new Date}',
                            'id=setTimeout(tm,16);',
                        '</script>'
                        
                        /* 以下のコードは XP ie8 では動くけど、win8 IE11(8モード)で動かない 開発の便宜を取って,setTimeout を挟む
                        '<script>',
                            'function ', callback, '(o){window.parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',window.parent.JSON.stringify(o))}',
                        '</script>',
                        '<script src="', url, '"></script>' */
                    ];
                    X_JSONP_maxOnloadCount = 2;
                } else
                if( X_UA[ 'IE' ] < 10 ){
                    html = [
                        '<script', charset, ' id="jp"></script>',
                        '<script>',
                            'onunload=function(){clearTimeout(id)};',
                            'function ', callback, '(o){nw-=+new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw)}',
                            'function tm(){jp.src="', url ,'";nw=+new Date}',
                            'id=setTimeout(tm,16);',
                        '</script>'
                    ];
                    X_JSONP_maxOnloadCount = 2;
                } else
                if( window[ 'JSON' ] ){
                    html = [    
                        '<script>',
                            'nw=+new Date;',
                            'function ', callback, '(o){if(nw){nw-=+new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw);nw=0}}',
                            //'function ', callback, '(o){if(nw){nw-=+new Date;parent.postMessage("', X_JSONP_SEND_MSG_KEY,' "+nw+"|"+JSON.stringify(o),"', location.origin, '");nw=0}}',
                        '</script>',
                        '<script', charset, ' src="', url, '"></script>'
                    ];
                    X_JSONP_maxOnloadCount = 1;
                } else {
                    html = [
                        '<script>',
                            'function ', callback, '(o){if(nw){nw-=new Date;parent.X.Net.__json_cb__(' + X_JSONP_ACCESS_KEY + ',JSON.stringify(o),-nw,', json2FileSize, ');nw=0}}',
                            'nw=+new Date;',
                        '</script>',
                        '<script src="', json2Path, '"></script>',
                        '<script', charset, ' src="', url, '"></script>'
                    ];
                    X_JSONP_maxOnloadCount = 2;
                };
                
                X_JSONP
                    [ 'refresh' ]( html.join( '' ) )
                    [ 'listen' ]( [ 'ninjaload', 'ninjaerror' ], X_JSONP_iframeListener );
                            
                X_JSONP._busy = true;
            },
            
            cancel : function(){
                X_JSONP.reset();
                X_JSONP._canceled = true;
            },
            
            reset : function(){
                X_JSONP._busy = X_JSONP._canceled = false;
                X_JSONP[ 'unlisten' ]( [ 'ninjaload', 'ninjaerror' ], X_JSONP_iframeListener );
                X_JSONP[ 'refresh' ]( '' );
                X_JSONP_errorTimerID && X_Timer_remove( X_JSONP_errorTimerID );
                X_JSONP_errorTimerID = X_JSONP_onloadCount = 0;
            }
        };

function X_JSONP_iframeListener( e ){
    switch( e.type ){
        case 'ninjaload' :
            console.log( 'iframe onload, but ' + X_JSONP_onloadCount + ' < ' + X_JSONP_maxOnloadCount );
            if( ++X_JSONP_onloadCount < X_JSONP_maxOnloadCount ) return;
            
            // TODO callback が無ければ error -> timeout を観る?
            X_JSONP_errorTimerID = X_JSONP[ 'asyncDispatch' ]( 1000, X_EVENT_ERROR );
            break;
        case 'ninjaerror' :
            console.log( 'iframe onerror' );
            X_JSONP[ 'asyncDispatch' ]( X_EVENT_ERROR );
            break;
    };
    return X_CALLBACK_UN_LISTEN;
};
