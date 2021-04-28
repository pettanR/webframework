
//{+oauth2"OAuth2 サービスの定義"(OAuth2外部サービスを定義し、認可プロセス・xhrの署名を自動化します)[+xhr,+window]
var X_OAUTH2_authWindow,
    X_OAUTH2_authTimerID;

/**
 * イベント
 * <dl>
 * <dt>X.Event.NEED_AUTH<dd>window を popup して認可を行う必要あり。ポインターイベント内で oauth2.requestAuth() を呼ぶ。このイベントをキャンセルすると
 * <dt>X.Event.CANCELED<dd>認可 window が閉じられた。([x]等でウインドウが閉じられた、oauth2.cancelAuth() が呼ばれた)
 * <dt>X.Event.SUCCESS<dd>認可 window でユーザーが認可し、続いてコードの認可が済んだ。
 * <dt>X.Event.ERROR<dd>コードの認可のエラー、リフレッシュトークンのｴﾗｰ、ネットワークエラー
 * <dt>X.Event.PROGRESS<dd>コードを window から受け取った、リフレッシュトークンの開始、コードの認可を header -> params に切替
 * </dl>
 * 
 * original :
 *  oauth2.js , <opendata@oucs.ox.ac.uk>
 *  https://github.com/ox-it/javascript-oauth2/blob/master/oauth2/oauth2.js
 * 
 * @alias X.OAuth2
 * @class OAuth2 サービスを定義し接続状況をモニタする。適宜にトークンのアップデートなどを行う
 * @constructs OAuth2
 * @extends {EventDispatcher}
 * @example // OAuth2 サービスの定義
oauth2 = X.OAuth2({
    'clientID'          : 'xxxxxxxx.apps.googleusercontent.com',
    'clientSecret'      : 'xxxxxxxx',
    'authorizeEndpoint' : 'https://accounts.google.com/o/oauth2/auth',
    'tokenEndpoint'     : 'https://accounts.google.com/o/oauth2/token',
    'redirectURI'       : X.URL.cleanup( document.location.href ), // 専用の軽量ページを用意してもよいが、現在のアドレスでも可能, gif は？
    'scopes'            : [ 'https://www.googleapis.com/auth/blogger' ],
    'refreshMargin'     : 300000
}).listen( [ X.Event.NEED_AUTH, X.Event.CANCELED, X.Event.SUCCESS, X.Event.ERROR, X.Event.PROGRESS ], updateOAuth2State );

// XHR 時に oauth2 を渡す
X.Net( {
    xhr      : 'https://www.googleapis.com/blogger/v3/users/self/blogs',
    dataType : 'json',
    auth     : oauth2,
    test     : 'gadget' // http -> https:xProtocol なリクエストのため、google ガジェットを proxy に使用
    } )
    .listen( [ X.Event.SUCCESS, X.Event.ERROR, X.Event.PROGRESS ], updateOAuth2State );
 */
X[ 'OAuth2' ] = X_EventDispatcher[ 'inherits' ](
        'X.OAuth2',
        X_Class.NONE,
        
        /** @lends OAuth2.prototype */
        {
            'Constructor' : function( obj ){
                var expires_at;
                
                obj = X_Object_copy( obj );
                obj[ 'refreshMargin' ] = obj[ 'refreshMargin' ] || 300000;
                
                X_Pair_create( this, obj );
                
                obj.onAuthError   = X_NET_OAUTH2_onXHR401Error;
                obj.updateRequest = X_NET_OAUTH2_updateRequest;                
                
                if( X_OAuth2_getAccessToken( this ) && ( expires_at = X_OAuth2_getAccessTokenExpiry( this ) ) ){
                    if( expires_at < X_Timer_now() + obj[ 'refreshMargin' ] ){ // 寿命が5分を切った
                        this[ 'refreshToken' ]();
                    } else {
                        obj.oauth2State = 4;
                        this[ 'asyncDispatch' ]( X_EVENT_SUCCESS );                        
                    };
                } else {
                    this[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
                };
                
                // TODO canUse gadgetProxy
                this[ 'listen' ]( [ X_EVENT_KILL_INSTANCE, X_EVENT_SUCCESS, X_EVENT_ERROR, X_EVENT_NEED_AUTH ], X_OAUTH2_handleEvent );
            },

            /**
             * OAuth2 の状態。
             * <dl>
             * <dt>0 : <dd>未接続
             * <dt>1 : <dd>認可用 window がポップアップ中
             * <dt>2 : <dd>コードを認可中
             * <dt>3 : <dd>トークンのリフレッシュ中
             * <dt>4 : <dd>接続
             * </dl>
             * @return {number}
             */
            'state' : function(){
                return X_Pair_get( this ).oauth2State || 0;
            },

            /**
             * 認可用 window をポップアップする。ポップアップブロックが働かないように必ず pointer event 内で呼ぶこと。
             * <dl>
             * <dt>1 : <dd>認可用 window がポップアップ中(自身)
             * <dt>2 : <dd>コードを認可中
             * <dt>3 : <dd>トークンのリフレッシュ中
             * <dt>4 : <dd>接続
             * <dt>5 : <dd>他のOAuth2サービスの認可用 window がポップアップ中
             * </dl>
             * @return {number}
             */
            'requestAuth' : function(){
                var e = X_EventDispatcher_CURRENT_EVENTS[ X_EventDispatcher_CURRENT_EVENTS.length - 1 ],
                    /* w, h, */ pair;

                // TODO pointer event 内か？チェック
                if( !e || !e.pointerType ){
                    //alert( 'タッチイベント以外での popup! ' + ( e ? e.type : '' ) );
                    return;
                };

                // 二つ以上の popup を作らない
                if( X_OAUTH2_authWindow ) return;

                pair = X_Pair_get( this );

                if( pair.net || pair.oauth2State ) return;

                // Google の OAuth パネルで下に切れるコンテンツが表示できない問題に遭遇。以降はタブで表示されるようにする。
                /* w   = pair[ 'authorizeWindowWidth' ]  || 500;
                h   = pair[ 'authorizeWindowHeight' ] || 500; */

                X_OAUTH2_authWindow = X_Window( {
                    'url' : X_URL_create( pair[ 'authorizeEndpoint' ],
                            {
                                response_type : 'code',
                                client_id     : pair[ 'clientID' ],
                                redirect_uri  : pair[ 'redirectURI' ],
                                scope         : ( pair[ 'scopes' ] || [] ).join( ' ' )
                            }
                        ),
                    'name'   : 'oauthauthorize' /*,
                    'params' : 'width=' + w
                        + ',height=' + h
                        + ',left=' + ( screen.width  - w ) / 2
                        + ',top='  + ( screen.height - h ) / 2
                        + ',menubar=no,toolbar=no' */
                } )[ 'listen' ]( X_EVENT_UNLOAD, this, X_OAuth2_detectAuthPopup );

                X_OAUTH2_authTimerID = X_Timer_add( 333, 0, this, X_OAuth2_detectAuthPopup );

                pair.oauth2State = 1;

                this[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, message : 'Start to auth.' } );
            },

            /**
             * 認可プロセスのキャンセル。ポップアップを閉じて認可用の通信は中断する。
             */
            'cancelAuth' : function(){
                var pair = X_Pair_get( this );

                if( pair.net ){
                    pair.net[ 'kill' ]();
                    delete pair.net;
                };

                if( pair.oauth2State !== 1 ){
                    return;
                };

                // http://kojikoji75.hatenablog.com/entry/2013/12/15/223839
                if( X_OAUTH2_authWindow ){
                    X_OAUTH2_authWindow[ 'kill' ]();
                    X_OAUTH2_authWindow = null;                    
                };

                X_OAUTH2_authTimerID && X_Timer_remove( X_OAUTH2_authTimerID );
                X_OAUTH2_authTimerID = 0;

                this[ 'asyncDispatch' ]( X_EVENT_CANCELED );
            },

            /**
             * アクセストークンのリフレッシュ。
             */
            'refreshToken' : function(){
                var pair = X_Pair_get( this ),
                    refreshToken = X_OAuth2_getRefreshToken( this );

                if( !refreshToken ){
                    pair.oauth2State = 0;
                    this[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
                    return;
                };

                if( pair.net ) return;

                if( pair.refreshTimerID ){
                    X_Timer_remove( pair.refreshTimerID );
                    delete pair.refreshTimerID;
                };

                pair.oauth2State = 3;

                pair.net = X.Net( {
                    'xhr'      : pair[ 'tokenEndpoint' ],
                    'postdata' : X_URL_objToParam({
                        client_id     : pair[ 'clientID' ],
                        client_secret : pair[ 'clientSecret' ],
                        grant_type    : 'refresh_token',
                        refresh_token : refreshToken
                    }),
                    'dataType' : 'json',
                    'headers'  : {
                                    Accept         : 'application/json',
                                    'Content-Type' : 'application/x-www-form-urlencoded'
                                },
                    'test'     : 'gadget' // canuse
                } ).listenOnce( [ X_EVENT_SUCCESS, X_EVENT_ERROR ], this, X_OAuth2_responceHandler );

                this[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, message : 'Start to refresh token.' } );
            }
        }
    );

function X_OAUTH2_handleEvent( e ){
    var pair = X_Pair_get( this );
    
    switch( e.type ){
        case X_EVENT_KILL_INSTANCE :
            this[ 'cancelAuth' ]();
        
        case X_EVENT_ERROR :
        case X_EVENT_NEED_AUTH :
            pair.refreshTimerID && X_Timer_remove( pair.refreshTimerID );
            break;
            
        case X_EVENT_SUCCESS :
            pair.refreshTimerID && X_Timer_remove( pair.refreshTimerID );
            if( X_OAuth2_getRefreshToken( this ) ){
                // 自動リフレッシュ
                pair.refreshTimerID = X_Timer_once( X_OAuth2_getAccessTokenExpiry( this ) - X_Timer_now() - pair[ 'refreshMargin' ], this, this[ 'refreshToken' ] );
            };
    };
};

function X_OAuth2_detectAuthPopup( e ){
    var pair = X_Pair_get( this ),
        status, search;

    if( X_OAUTH2_authWindow[ 'closed' ]() ){
        status = 0;
        this[ 'asyncDispatch' ]( X_EVENT_CANCELED );
    } else
    if( search = X_OAUTH2_authWindow[ 'find' ]( 'location>search' ) ){
        pair = X_Pair_get( this );
        pair.code = X_URL_paramToObj( search.slice( 1 ) )[ 'code' ];
        status = 2;
        X_OAuth2_authorizationCode( this, pair );
        this[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, message : 'Get code success, then authorization code.' } );
    };
    
    if( 0 <= status ){
        pair = pair || X_Pair_get( this );
        pair.oauth2State = status;
        
        X_OAUTH2_authWindow[ 'kill' ]();
        X_OAUTH2_authWindow  = null;
        X_OAUTH2_authTimerID = X_Timer_remove( X_OAUTH2_authTimerID );
        
        return X_CALLBACK_UN_LISTEN;
    };
};

function X_OAuth2_authorizationCode( oauth2, pair ){    
    pair.net = X.Net( {
        'xhr'      : pair[ 'tokenEndpoint' ],
        'postdata' : X_URL_objToParam({
            'client_id'     : pair[ 'clientID' ],
            'client_secret' : pair[ 'clientSecret' ],
            'grant_type'    : 'authorization_code',
            'code'          : pair.code,
            'redirect_uri'  : pair[ 'redirectURI' ]
        }),
        'dataType' : 'json',
        'headers'  : {
            'Accept'       : 'application/json',
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        'test'     : 'gadget'
    } ).listenOnce( [ X_EVENT_SUCCESS, X_EVENT_ERROR ], oauth2, X_OAuth2_responceHandler );
};

function X_OAuth2_responceHandler( e ){
    var data = e.response,
        pair = X_Pair_get( this ),
        isRefresh = pair.oauth2State === 3;
    
    delete pair.net;
    
    switch( e.type ){
        case X_EVENT_SUCCESS :
            if( isRefresh && data.error ){
                X_OAuth2_removeRefreshToken( this );
                pair.oauth2State = 0;
                this[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, message : 'Refresh access token error.' } );
                this[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
                return;
            } else
            if( data.error ){
                pair.oauth2State = 0;
                this[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, message : 'Get new access token error.' } );
                this[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
                return;
            };
            
            X_OAuth2_setAccessToken( this, data[ 'access_token' ] || '' );
            ( !isRefresh || data[ 'refresh_token' ] ) && X_OAuth2_setRefreshToken( this, data[ 'refresh_token' ] || '' );
            
            if( data[ 'expires_in' ] ){
                X_OAuth2_setAccessTokenExpiry( this, X_Timer_now() + data[ 'expires_in' ] * 1000 );
            } else
            if( X_OAuth2_getAccessTokenExpiry( this ) ){
                X_OAuth2_removeAccessTokenExpiry( this );
            };
            
            pair.oauth2State = 4;
            
            if( pair.lazyRequests && pair.lazyRequests.length ){
                //X_NET_QUEUE_LIST.push.apply( X_NET_QUEUE_LIST, pair.lazyRequests );
                //pair.lazyRequests.length = 0;                
            };

            this[ 'asyncDispatch' ]( { type : X_EVENT_SUCCESS, message : isRefresh ? 'Refresh access token success.' : 'Get new access token success.' } );
            break;
            
        case X_EVENT_ERROR :
            if( isRefresh ){
                // other error, not auth
                pair.oauth2State = 0;
                this[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, message : 'Refresh access token error.' } );
                X_OAuth2_removeRefreshToken( this );
                this[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
            } else
            if( X_OAuth2_getAuthMechanism( this ) === 'param' ){
                pair.oauth2State = 0;
                this[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, message : 'network-error' } );
            } else {
                pair.oauth2State = 0;
                X_OAuth2_setAuthMechanism( this, 'param' );
                this[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, message : 'Refresh access token failed. retry header -> param. ' } );
                // retry
                X_OAuth2_authorizationCode( this, pair );
            };
            break;
    };
};

function X_NET_OAUTH2_onXHR401Error( oauth2, e ){
    var pair = this,
        headers = e[ 'headers' ],
        bearerParams, headersExposed = false;
    
    if( X_OAuth2_getAuthMechanism( oauth2 ) !== 'param' ){
        headersExposed = !X_NET_currentWrapper.isXDR || !!headers; // this is a hack for Firefox and IE
        bearerParams   = headersExposed && ( headers[ 'WWW-Authenticate' ] || headers[ 'www-authenticate' ] );
        X_Type_isArray( bearerParams ) && ( bearerParams = bearerParams.join( '\n' ) );
    };
    
    // http://d.hatena.ne.jp/ritou/20110402/1301679908
    if( bearerParams && bearerParams.indexOf( ' error=' ) === -1 ){ // bearerParams.error == undefined
        pair.oauth2State = 0;
        oauth2[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
    } else
    if( ( ( bearerParams && bearerParams.indexOf( 'invalid_token' ) !== -1 ) || !headersExposed ) && X_OAuth2_getRefreshToken( oauth2 ) ){
        X_OAuth2_removeAccessToken( oauth2 ); // It doesn't work any more.
        pair.oauth2State = 3;
        oauth2[ 'refreshToken' ]();
    } else {
        X_OAuth2_removeAccessToken( oauth2 ); // It doesn't work any more.
        pair.oauth2State = 0;
        oauth2[ 'asyncDispatch' ]( X_EVENT_NEED_AUTH );
    };
};

function X_NET_OAUTH2_updateRequest( oauth2, request ){
    var token     = X_OAuth2_getAccessToken( oauth2 ),
        mechanism = X_OAuth2_getAuthMechanism( oauth2 ),
        url       = request[ 'url' ],
        headers;

    if( token && mechanism === 'param' ){
        request[ 'url' ] = X_URL_create( url, { 'bearer_token' : encodeURIComponent( token ) } );
    };
    
    if( token && ( !mechanism || mechanism === 'header' ) ){
        headers = request[ 'headers' ] || ( request[ 'headers' ] = {} );
        headers[ 'Authorization' ] = 'Bearer ' + token;
    };
};

function X_OAuth2_getAccessToken( that ){ return X_OAuth2_updateLocalStorage( '', that, 'accessToken' ); }
function X_OAuth2_getRefreshToken( that ){ return X_OAuth2_updateLocalStorage( '', that, 'refreshToken' ); }
function X_OAuth2_getAccessTokenExpiry( that ){ return parseFloat( X_OAuth2_updateLocalStorage( '', that, 'tokenExpiry' ) ) || 0; }
function X_OAuth2_getAuthMechanism( that ){
        // TODO use gadget | flash ...
        // IE's XDomainRequest doesn't support sending headers, so don't try.
        return ( X_NET_currentWrapper === X_XHR ) && X_XHR_createXDR ? 'param' : X_OAuth2_updateLocalStorage( '', that, 'AuthMechanism' );
    }
function X_OAuth2_setAccessToken( that, value ){ X_OAuth2_updateLocalStorage( '+', that, 'accessToken' , value); }
function X_OAuth2_setRefreshToken( that, value ){ X_OAuth2_updateLocalStorage( '+', that, 'refreshToken', value); }
function X_OAuth2_setAccessTokenExpiry( that, value ){ X_OAuth2_updateLocalStorage( '+', that, 'tokenExpiry', value); }
function X_OAuth2_setAuthMechanism( that, value ){ X_OAuth2_updateLocalStorage( '+', that, 'AuthMechanism', value); }

function X_OAuth2_removeAccessToken( that ){ X_OAuth2_updateLocalStorage( '-', that, 'accessToken' ); }
function X_OAuth2_removeRefreshToken( that ){ X_OAuth2_updateLocalStorage( '-', that, 'refreshToken' ); }
function X_OAuth2_removeAccessTokenExpiry( that ){ X_OAuth2_updateLocalStorage( '-', that, 'tokenExpiry' ); }
function X_OAuth2_removeAuthMechanism( that ){ X_OAuth2_updateLocalStorage( '-', that, 'AuthMechanism' ); }
    
function X_OAuth2_updateLocalStorage( cmd, that, name, value ){
    var action = cmd === '+' ? 'setItem' : cmd === '-' ? 'removeItem' : 'getItem',
        pair;
    
    if( window.localStorage ){ // TODO http://qiita.com/narikei/items/f55fb9cb398beac52ea9
        return window.localStorage[ action ]( X_Pair_get( that )[ 'clientID' ] + name, value );
    };
    
    pair = X_Pair_get( that );
    switch( cmd ){
        case '+' :
            pair[ name ] = value;
            break;
        case '-' :
            if( pair[ name ] !== undefined ) delete pair[ name ];
    };
    return pair[ name ];
};

//}+oauth2