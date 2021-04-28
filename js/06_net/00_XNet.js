// TODO  onlineevent offlineevent, netspeed
// local への通信に対しては、netspeed を更新しない

// http://bugs.jquery.com/ticket/2709
// <head><base> がある場合、<script>の追加に失敗する



/**
 * <p>state() メソッドだけを持つ。通信用のプロパティは X.Pair によって隠蔽されています。
 * <h4>通信のキャンセル</h4>
 * <p>kill() で通信待ち中はキャンセル&破棄、通信中の場合は通信の中断&破棄を行う。
 * <h4>イベント</h4>
 * <dl>
 * <dt>X.Event.PROGRESS<dd>通信進行状況
 * <dt>X.Event.SUCCESS<dd>通信成功
 * <dt>X.Event.ERROR<dd>通信エラー タイムアウトの場合、e.timeout == true で分かる。
 * <dt>X.Event.CANCELED<dd>通信のユーザー、プログラムによるキャンセル。SUCCESS, ERROR, COMPLETE 後に kill()してもCANCELEDは呼ばれません。
 * <dt>X.Event.COMPLETE<dd>通信完了。SUCCESS, ERROR, CANCELED 後に発生。
 * </dl>
 * <p>X.Net インスタンスは COMPLETE 後に自動で破棄される。
 * <h4>必須プロパティ</h4>
 * <dl>
 * <dt>url<dd>URL
 * <dt>type<dd>'xhr', 'jsonp', 'form', 'image', 'img'
 * <dt>xhr<dd>URL { url : 'hoge', type : 'xhr' } の省略形
 * <dt>jsonp<dd>URL { url : 'hoge', type : 'jsonp' } の省略形
 * <dt>form<dd>URL { url : 'hoge', type : 'form' } の省略形
 * <dt>image, img<dd>URL { url : 'hoge', type : 'image' } の省略形
 * </dl>
 * <h4>XHR 用プロパティ</h4>
 * <dl>
 * <dt>method<dd>'GET', 'POST' 未指定かつ postdata を設定している場合、'POST' になる。
 * <dt>params<dd>url パラメータを object で渡すことが出来る。
 * <dt>postdata<dd>string, object の場合は X.String.serialize される。
 * <dt>async<dd>boolean
 * <dt>username<dd>BASIC 認証
 * <dt>password<dd>BASIC 認証
 * <dt>headers<dd>object xhr.setRequestHeader する値
 * <dt>timeout<dd>タイムアウト ms
 * <dt>cache<dd>headers[ 'Pragma' ] = 'no-cache' 等を設定するか?
 * <dt>dataType<dd>'text', 'json', 'xml', 'blob', 'arraybuffer' 等。xhr.responseType に指定する値
 * <dt>mimeType<dd>'text/xml', 'audio/mpeg' 等。xhr.overrideMimeType する値
 * <dt>auth<dd>X.OAuth2 インスタンス(OAuth2 サービスの定義)
 * <dt>getFullHeaders<dd>getAllResponseHeaders() をパースしたハッシュを返す。値は配列になっている。XDR は Content-Type しか取得でいない。
 * <dt>canUse<dd>未実装。gadget proxy, YQL, <del>YPipes</del> 等のマッシュアップの許可。現在は test : 'gadget' としている
 * </dl>
 * 
 * <h4>JSONP 用プロパティ</h4>
 * <dl>
 * <dt>params<dd>url パラメータを object で渡すことが出来る。
 * <dt>callbackName<dd>callback(json) コールバック名が固定されている際に指定。または &callback=hoge 以外の名前でコールバックを指定する場合に params と callbackName に書いておく。url パラメータに callback が無く、callbackName もない場合、フレームワーク内で自動で設定される
 * <dt>charset<dd>ページと異なるjsonpを読み込む場合に指定 'EUC-JP', 'Shift-JIS' 等 script タグの charset に入る。https://code.google.com/p/ajaxzip3/issues/detail?id=5
 * <dt>useFireWall<dd>異なるドメインに jsonp を読み込んだ後、xdomain iframe 通信を使ってデータを受け取る。不正なコードの実行を防ぐことが出来る(はず)、未実装
 * </dl>
 * 
 * <h4>Form 用プロパティ</h4>
 * <dl>
 * <dt>method<dd>'GET' or 'POST'
 * <dt>params<dd>パラメータ object は input タグの name & value に展開される。object を入れ子にすることはできない。
 * <dt>target<dd>'_self', '_parent', '_top' の場合、ページから離脱する。target を指定せず同一ドメインの場合 response に body.innerHTML が返る。TODO X.Window
 * <dt>timeout<dd>ms タイムアウト時間、省略可能
 * <dt>charset<dd>未実装
 * </dl>
 * 
 * @alias X.Net
 * @class 各種ネットワーク機能をラップしインターフェイスを共通化する。
 * @constructs Net
 * @extends {EventDispatcher}
 * @example // XHR - GET
 * var net = X.Net( { xhr : urlString } )
 *         .listen( X.Event.PROGRESS )
 *         .listenOnce( [ X.Event.SUCCESS, X.Event.ERROR, X.Event.TIMEOUT, X.Event.CANCELED ] );
 * 
 * // XHR - GET 
 * var net = X.Net( urlString );
 * 
 * // XHR - POST 
 * var net = X.Net( { xhr : urlString, postdata : myData } );
 * 
 * // JSONP
 * var net = X.Net( { jsonp : urlString, params : params, callbackName : callbackName, charset : charset, useFireWall : false } );
 * 
 * // Form
 * var net = X.Net( { form : urlString, method : 'POST', target : '_self', params : {} } );
 * 
 * // Image preload & getSize
 * var net = X.Net( { image : src, sizeDetection : true } );
 * 
 * // load &lt;script&gt;, &lt;link&gt;
 */
X[ 'Net' ] = X_EventDispatcher[ 'inherits' ](
        //'X.Net',
        X_Class.NONE,
        {

            'Constructor' : function( urlOrObject, opt_options ){
                var opt, url, type, auth;

                if( X_Type_isObject( opt = urlOrObject ) ){
                    //{+xhr
                    if( X_Type_isString( url = opt[ 'xhr' ] ) ){
                        type = X_NET_TYPE_XHR;
                    } else
                    //}+xhr
                    //{+jsonp
                    if( X_Type_isString( url = opt[ 'jsonp' ] ) ){
                        type = X_NET_TYPE_JSONP;
                    } else
                    //}+jsonp
                    //{+netimage
                    if( X_Type_isString( url = opt[ 'img' ] || opt[ 'image' ] ) ){
                        type = X_NET_TYPE_IMAGE;
                    } else
                    //}+netimage
                    //{+netform
                    if( X_Type_isString( url = opt[ 'form' ] ) ){
                        type = X_NET_TYPE_FORM;
                    } else
                    //}+netform
                    if( !( type = X_NET_NAME_TO_ID[ opt[ 'type' ] ] ) ){
                        if( X_IS_DEV ){
                            X_error( 'X.Net : Invalid type=' +  opt[ 'type' ] );
                            return;
                        };
                    } else {
                        url = opt[ 'url' ];
                    };
                    if( X_IS_DEV && !X_Type_isString( url ) ){
                        X_error( 'X.Net : Invalid url=' + url );
                        return;
                    };
                } else
                if( X_Type_isString( urlOrObject ) ){
                    url = urlOrObject;
                    
                    if( X_Type_isObject( opt = opt_options ) ){
                        type = opt[ 'type' ] || X_NET_TYPE_XHR;
                    } else {
                        type = X_NET_TYPE_XHR;
                        opt  = { 'url' : url, 'method' : 'GET' };
                    };
                } else {
                    if( X_IS_DEV ){
                        X_error( 'X.Net : Args error!' );
                        return;
                    };
                };

                // auth の退避
                if( auth = opt[ 'auth' ] ){
                    delete opt[ 'auth' ];
                };
                opt = X_Object_deepCopy( opt );
                if( auth ){
                    opt[ 'auth' ] = auth; // auth は deep copy されるとまずい
                };

                // params を url に追加 但し form は除く
                if( opt[ 'params' ] && type !== X_NET_TYPE_FORM ){
                    url = X_URL_create( url, opt[ 'params' ] );
                    delete opt[ 'params' ];
                };

                if( type === X_NET_TYPE_XHR ){
                    opt[ 'method' ] = opt[ 'method' ] || ( opt[ 'postdata' ] ? 'POST' : 'GET' );

                    // XDomain 不可 -> Flash, Gears, Silverlight, canUseGadget なら gadget に切替?
                    // PUT DELETE UPDATE 不可 -> Flash, Gears, Silverlight, canUseGadget なら gadget に切替?
                    // xプロトコル(X_URL_isSameProtocol) な binary のロード -> gadget 内で proxyURL による XHR
                    //  or X_EVENT_ERROR
                    
                    opt[ 'dataType' ] = opt[ 'dataType' ] || X_URL_getEXT( url );
                };

                opt.netType   = type;
                opt[ 'url'  ] = url;

                X_Pair_create( this, opt );

                this[ 'listen' ]( X_EVENT_KILL_INSTANCE, X_NET_proxyDispatch );

                X_NET_QUEUE_LIST[ X_NET_QUEUE_LIST.length ] = this;
                !X_NET_currentQueue && X_NET_shiftQueue();
            },

        /**
         * 現在の状態。1:順番待ち, 2:通信中, 3:通信完了フェーズ
         * @alias Net.prototype.state
         */
            'state' : function(){
                return this === X_NET_currentQueue ?
                    ( X_NET_completePhase ? 3 : 2 ) :
                    0 <= X_NET_QUEUE_LIST.indexOf( this ) ? 1 : 0;
            }
        }
    );
/*
 * @interface
 */
var X_NET_IWrapper = function(){};
    X_NET_IWrapper.prototype.load   = function(){};
    X_NET_IWrapper.prototype.cancel = function(){};
    X_NET_IWrapper.prototype.reset  = function(){};


var X_NET_TYPE_XHR   = 1,
    X_NET_TYPE_JSONP = 2,
    X_NET_TYPE_FORM  = 3,
    X_NET_TYPE_IMAGE = 4,

    X_NET_NAME_TO_ID = {
        'xhr'   : X_NET_TYPE_XHR,
        'jsonp' : X_NET_TYPE_JSONP,
        'form'  : X_NET_TYPE_FORM,
        'img'   : X_NET_TYPE_IMAGE,
        'image' : X_NET_TYPE_IMAGE
    },

    X_NET_QUEUE_LIST = [],

    X_XHR,
    X_JSONP,
    X_FormSender,
    X_ImgLoader,
    X_GadgetXHR,

    X_NET_currentWrapper,
    X_NET_currentQueue,
    X_NET_currentData,
    X_NET_completePhase;

function X_NET_proxyDispatch( e ){
    var i, flag, auth;

    switch( e.type ){
        case X_EVENT_KILL_INSTANCE :
            if( this === X_NET_currentQueue && X_NET_completePhase ){
                if( X_NET_completePhase === 1 ){
                    this[ 'unlisten' ]( X_EVENT_COMPLETE, X_NET_proxyDispatch )
                        [ 'dispatch' ]( X_EVENT_COMPLETE );
                };
                X_NET_shiftQueue( true );
                X_Pair_release( this );
                X_NET_completePhase = 0;
            } else
            if( this === X_NET_currentQueue ){
                X_NET_currentWrapper.cancel();
                X_NET_shiftQueue( true );
                flag = true;
            } else
            if( ( i = X_NET_QUEUE_LIST.indexOf( this ) ) !== -1 ){
                X_NET_QUEUE_LIST.splice( i, 1 );
                flag = true;
            };

            if( flag ){ // flag が立つ場合、これは中断
                this[ 'dispatch' ]( X_EVENT_CANCELED );
                this[ 'dispatch' ]( { type : X_EVENT_COMPLETE, 'lastEventType' : X_EVENT_CANCELED } );
                X_Pair_release( this );
            };
            break;
        case X_EVENT_PROGRESS :
            this[ 'dispatch' ]( e );
            break;

        case X_EVENT_ERROR :
            if( e.status === 401 ){
                if( auth = X_Pair_get( this )[ 'auth' ] ){
                    X_Pair_get( auth ).onAuthError( auth, e );
                    // TODO 破棄しないで待機。
                };
            };

        case X_EVENT_SUCCESS :
            X_NET_completePhase = 1;
            this[ 'listenOnce' ]( X_EVENT_COMPLETE, X_NET_proxyDispatch )
                [ 'asyncDispatch' ]( 32, { type : X_EVENT_COMPLETE, 'lastEventType' : e.type } );

            // target を上書き X_NET_currentWrapper -> X_NET_currentQueue
            e[ 'target' ] = e[ 'currentTarget' ] = this;
            this[ 'asyncDispatch' ]( e );
            break;

        case X_EVENT_COMPLETE :
            X_NET_completePhase = 2;
            this[ 'kill' ]();
            break;
    };
};

// TODO _busy は X.Net で触る.
function X_NET_shiftQueue( currentKilled ){
    var q, auth, authSettings;

    if( X_NET_currentQueue ){
        if( !currentKilled ) return;

        X_NET_currentWrapper
            [ 'unlisten' ]( [ X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR ], X_NET_currentQueue, X_NET_proxyDispatch )
            .reset();

        X_NET_currentQueue = X_NET_currentWrapper = X_NET_currentData = null;
    };

    //console.log( '■■------------ X_NET_shiftQueue ' + X_NET_QUEUE_LIST.length );

    if( !X_NET_QUEUE_LIST.length ) return;


    X_NET_currentQueue = q = X_NET_QUEUE_LIST.shift();
    X_NET_currentData  = X_Pair_get( X_NET_currentQueue );

    switch( X_NET_currentData.netType ){
        case X_NET_TYPE_XHR :
            
            // TODO (xProtocol | method='update' | !cors) & canUse -> gadget.io.makeRequset, flash
            // force 'gadget', 'flash'
            switch( X_NET_currentData[ 'test' ] ){
                case 'gadget' :
                    X_NET_currentWrapper = X_GadgetXHR || X_TEMP.X_GadgetXHR_init();
                    break;
                case 'flash'  :
                    break;
                
                default :
                    X_NET_currentWrapper = X_XHR || X_TEMP.X_XHR_init();
            };


            // OAuth2
            if( auth = X_NET_currentData[ 'auth' ] ){
                authSettings = X_Pair_get( auth );
                switch( auth[ 'state' ]() ){
                    case 0 :
                    case 1 :
                    case 2 :
                        if( !( auth[ 'dispatch' ]( X_EVENT_NEED_AUTH ) & X_CALLBACK_PREVENT_DEFAULT ) ){
                            // event 内で kill されていないことを確認
                            if( X_NET_currentQueue === q ){
                                authSettings.lazyRequests = authSettings.lazyRequests || [];
                                authSettings.lazyRequests.indexOf( q ) === -1 && authSettings.lazyRequests.push( q );
                                X_NET_currentQueue = null;
                                X_NET_shiftQueue();                                    
                            };
                        } else {
                            X_NET_currentQueue === q && q[ 'kill' ]();
                        };
                        return;
                    case 3 : // refresh token
                        X_NET_QUEUE_LIST.push( X_NET_currentQueue );
                        X_NET_currentQueue = null;
                        X_NET_shiftQueue();
                        return;
                };
                authSettings.updateRequest( auth, X_NET_currentData );
            };
            break;
        case X_NET_TYPE_JSONP :
            X_NET_currentWrapper = X_JSONP || X_TEMP.X_JSONP_init();
            break;
        case X_NET_TYPE_FORM :
            X_NET_currentWrapper = X_FormSender  || X_TEMP.X_FormSender_init();
            break;
        case X_NET_TYPE_IMAGE :
            X_NET_currentWrapper = X_ImgLoader || X_TEMP.X_ImgLoader_init();
            break;
    };

    X_NET_currentWrapper[ 'listen' ]( [ X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_ERROR ], X_NET_currentQueue, X_NET_proxyDispatch );

    X_NET_currentWrapper.load( X_NET_currentData );
};

