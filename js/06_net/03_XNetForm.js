//{+netform"<form>によるGETとPOST"(動的に生成したフォームによるGETとPOST。)[+net,+ninjaiframe]

var X_FormSender_errorTimerID,
    X_FormSender_isLeave, X_FormSender_isSameDomain,
    X_FormSender_onloadCount = 0;

X_TEMP.X_FormSender_init = function(){
    X_FormSender = X_Class_override( X_NinjaIframe(), X_TEMP.X_FormSender_params );

    delete X_TEMP.X_FormSender_init;
    delete X_TEMP.X_FormSender_params;

    return X_FormSender;
};

/*
 * form 構築時に "><script> といった文字列の挿入を禁止するために " を エスケープする
 * TODO 改行文字を消す escape?
 */
function X_FormSender_escapeQuote( str ){
    
    return X_String_toChrReferanceForHtmlSafety( str );
};

X_TEMP.X_FormSender_params = {

            _busy     : false,
            _canceled : false,

            load : function( option ){
                //createURL
                var params  = option[ 'params'  ] || {},
                    url     = option[ 'url' ],
                    target  = option[ 'target'  ],
                    timeout = option[ 'timeout' ],
                    // http://search.web-sun.com/zatu/charset.html
                    // charset = option[ 'charset' ],
                    html, k;

                target = target === '_self' ? '_parent' : target === '_blank' ? '_self' : target || '_self',
                html   = [
                    // <meta http-equiv="Content-Type" content="text/html; charset=euc-jp">
                    '<form method="', X_FormSender_escapeQuote( option[ 'method' ] || 'GET' ), 
                        '" action="', X_FormSender_escapeQuote( url || '' ), 
                        '" target="', X_FormSender_escapeQuote( target ),
                        '">' ];

                X_FormSender_isLeave      = target === '_top' || target === '_parent';
                X_FormSender_isSameDomain = X_URL_isSameDomain( url );

                for( k in params ){
                    // TODO 使用すべきでない name
                    html.push( '<input type="hidden" name="', X_FormSender_escapeQuote( k ), '" value="', X_FormSender_escapeQuote( params[ k ] || '' ), '">' );
                    // TODO 改行を含む text には textarea
                };

                html.push( '</form><script>document.forms[0].submit();</script>' );

                X_FormSender
                    [ 'refresh' ]( html.join( '' ) )
                    [ 'listen' ]( [ 'ninjaload', 'ninjaerror' ], X_FormSender_iframeListener );

                if( 0 < timeout ){
                    X_FormSender_errorTimerID = X_FormSender[ 'asyncDispatch' ]( timeout, { type : X_EVENT_ERROR, 'timeout' : true } );
                };

                X_FormSender._busy = true;
            },

            cancel : function(){
                X_FormSender.reset();
                X_FormSender._canceled = true;
            },

            reset : function(){
                X_FormSender._busy = X_FormSender._canceled = false;
                X_FormSender
                    [ 'unlisten' ]( [ 'ninjaload', 'ninjaerror' ], X_FormSender_iframeListener )
                    [ 'refresh' ]( '' );
                X_FormSender_errorTimerID && X_Timer_remove( X_FormSender_errorTimerID );
                X_FormSender_errorTimerID = X_FormSender_onloadCount = 0;
            }
        };

function X_FormSender_iframeListener( e ){
    var idoc;

    switch( e.type ){
        case 'ninjaload' :
            if( X_FormSender_isLeave ){
                return;
            };

            if( ++X_FormSender_onloadCount === 1 ){
                if( X_FormSender_isSameDomain ){
                    idoc = this[ '_rawObject' ].contentDocument || this._iwin.document;
                    X_FormSender[ 'asyncDispatch' ]( { type : X_EVENT_SUCCESS, response : idoc && idoc.body ? idoc.body.innerHTML : '' } );
                } else {
                    X_FormSender[ 'asyncDispatch' ]( { type : X_EVENT_SUCCESS } );
                };
            };
            break;
        case 'ninjaerror' :
            // console.log( 'iframe onerror' );
            X_FormSender[ 'asyncDispatch' ]( X_EVENT_ERROR );
            break;
    };
    return X_CALLBACK_UN_LISTEN;
};

//}+netform