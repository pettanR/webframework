var 
    X_CLOSURE_LIVE_LIST     = [],

    X_CLOSURE_POOL_LIST     = [],

    X_Closure_COMMAND_BACK  = X_CLOSURE_LIVE_LIST,

    X_Closure_COMMAND_DROP  = X_CLOSURE_POOL_LIST,
    
    X_CLOSURE_THIS_FUNC     = 1,
    X_CLOSURE_HANDLEEVENT   = 2,
    X_CLOSURE_FUNC_ONLY     = 3,
    X_CLOSURE_THIS_FUNCNAME = 4;

/**
 * <p>クロージャに関するポリシーと再利用可能クロージャについて次の記事をご覧ください。
 *     <a href="http://outcloud.blogspot.jp/2015/05/reusable-closure.html" target="_blank">再利用できるクロージャを使ったWebアプリケーション開発</a>
 * 
 * <h5>再利用可能クロージャの作成</h5>
 * X_Closure_create() で再利用可能なクロージャの作成。次のパターンで呼び出します。<br>
 * 最大で三つの引数を並べる一連のパターンは、 EventDispatcher.listen unlisten, listening や X.Timer.add, once でも使われますので、ここでよく目を通しておきます。
 * 
 * <h5>再利用可能クロージャの破棄と再利用</h5>
 * X_Closure_correct() によってクロージャは回収され再利用に備えます。<br>
 * 実は、クロージャが束縛するのは、this コンテキストやコールバック関数といった、<strong>そのもの</strong>ではなく、それらを一定のルールで格納したハッシュです。<br>
 * このハッシュはクロージャに与えた後も、適宜に取得が可能です。このハッシュのメンバーを書き換えることで、クロージャの this コンテキストやコールバック関数を書き換えています。
 * 
 * @class __CallbackHash__
 * @classdesc コールバック関数に this コンテキストや、追加の引数を設定するための情報を収めたハッシュです。<br>
 * フレームワークユーザは直接触ることにはないが、重要な情報なので書いておきます。
 * @private
 */
var __CallbackHash__ =
/** @lends __CallbackHash__.prototype */
{
    /**
     * コールバックの種類を表す数値。 this + function, this.handleEvent, function only がある。
     * @type {number} 
     */
    cbKind : X_CLOSURE_THIS_FUNC,
    /**
     * コールバック。
     * @type {funciton|undefined} 
     */
    func : undefined,
    /**
     * コールバック名。コールバック作成時に関数が無い、関数が入れ替わっていても動作する。
     * @type {string|undefined} 
     */
    funcName : undefined,
    /**
     * コールバックの this コンテキスト。 
     * @type {object|undefined}
     */
    context : undefined,
    /**
     * コールバックに追加する引数。イベントのコールバックでは event オブジェクトのあとに追加されるため supplement[0] が第一引数にならない点に注意。
     * @type {Array|undefined}
     */
    supplement : undefined,
    /**
     * __CallbackHash__ の情報を元に、コールバックを実施するプロキシ。
     * @type {Function}
     */
    proxy : X_Closure_proxyCallback
};

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

function X_Closure_create( thisObject, opt_callback, opt_args /* [ listener || ( context + function ) || function ][ args... ] */ ){
    var obj = X_Closure_classifyCallbackArgs( thisObject, opt_callback, opt_args ),
        l, ret, _obj;

    if( !obj.cbKind ) return obj;

    if( l = X_CLOSURE_POOL_LIST.length ){
        ret  = X_CLOSURE_POOL_LIST[ l - 1 ]; --X_CLOSURE_POOL_LIST.length; // ret = X_CLOSURE_POOL_LIST.pop();
        _obj = ret( X_Closure_COMMAND_BACK );
        
        _obj.cbKind     = obj.cbKind;
        _obj.funcName   = obj.funcName;
        _obj.func       = obj.func;
        _obj.context    = obj.context;
        _obj.supplement = obj.supplement;
        _obj.proxy      = X_Closure_proxyCallback;
    } else {
        ret             = X_Closure_actualClosure( obj );
        obj.proxy       = X_Closure_proxyCallback;
    };
    X_CLOSURE_LIVE_LIST[ X_CLOSURE_LIVE_LIST.length ] = ret;
    return ret;
};


function X_Closure_classifyCallbackArgs( arg1, arg2, arg3, alt_context ){
    var obj;

    if( X_Type_isObject( arg1 ) && X_Type_isFunction( arg2 ) ){
        obj  = { context : arg1, func : arg2, cbKind : X_CLOSURE_THIS_FUNC };
    } else
    if( X_Type_isObject( arg1 ) ){
        if( arg2 && X_Type_isString( arg2 ) ){
            obj  = { context : arg1, funcName : arg2, cbKind : X_CLOSURE_THIS_FUNCNAME };
        } else {
            obj  = { context : arg1, cbKind : X_CLOSURE_HANDLEEVENT };
            arg3 = arg2;
        };
    } else
    if( X_Type_isFunction( arg1 ) ){
        arg3 = arg2;
        if( alt_context ){
            obj  = { context : alt_context, func : arg1, cbKind : X_CLOSURE_THIS_FUNC };
        } else {
            obj  = { func : arg1, cbKind : X_CLOSURE_FUNC_ONLY };
        };
    } else
    if( X_Type_isFunction( arg2 ) ){
        if( alt_context ){
            obj  = { context : alt_context, func : arg2, cbKind : X_CLOSURE_THIS_FUNC };
        } else {
            obj  = { func : arg2, cbKind : X_CLOSURE_FUNC_ONLY };
        };
    } else
    if( alt_context && X_Type_isString( arg1 ) ){
        arg3 = arg2;
        obj  = { context : alt_context, funcName : arg1, cbKind : X_CLOSURE_THIS_FUNCNAME };
    } else
    if( alt_context ){
        obj  = { context : alt_context, cbKind : X_CLOSURE_HANDLEEVENT };
        arg3 = arg1;
    } else {
        if( X_IS_DEV ){
            X_error( 'X.Closure.create : Invalid args! arguments[0]=' + arg1 );
            return;
        };
    };

    if( X_Type_isArray( arg3 )){
        obj.supplement = arg3;
    };
    return ( obj.context || obj.supplement ) ? obj : arg1;
};

function X_Closure_actualClosure( obj ){
    return function(){
        if( arguments[ 0 ] === X_Closure_COMMAND_BACK ) return obj;
        if( arguments[ 0 ] !== X_Closure_COMMAND_DROP ) return obj.proxy && obj.proxy( obj, arguments );
    };
};

function X_Closure_proxyCallback( xfunc, _args ){
    var args    = _args || [],
        thisObj = xfunc.context,
        func    = xfunc.func,
        supp    = xfunc.supplement,
        temp, ret, funcName;

    if( supp && supp.length ){
        temp = [];
        args.length &&
            (
                args.length === 1 ?
                    ( temp[ 0 ] = args[ 0 ] ) :
                    temp.push.apply( temp, args )
            );
        supp.length === 1 ?
            ( temp[ temp.length ] = supp[ 0 ] ) :
            temp.push.apply( temp, supp );
        args = temp;
    };
    
    switch( xfunc.cbKind ){

        case X_CLOSURE_THIS_FUNC :
            // closure 作成時に this オブジェクトに func が居るか調べ、funcName を調べる。( supplement が居ない場合 )
            // arg.length < 2 であり、現在も this[ funcName ] === func なら this[ funcName ]( arg[ 0 ] ) で呼び出す。
            // this[ funcName ] !== func なら funcName を削除
            return args.length === 0 ? func.call( thisObj ) : func.apply( thisObj, args );

        case X_CLOSURE_THIS_FUNCNAME :
            funcName = xfunc.funcName;
        case X_CLOSURE_HANDLEEVENT :
            funcName = funcName || 'handleEvent';
            temp = thisObj[ funcName ];
            if( X_Type_isFunction( temp ) ){
                return args.length === 0 ? thisObj[ funcName ]() :
                       args.length === 1 ? thisObj[ funcName ]( args[ 0 ] ) : temp.apply( thisObj, args );
            };
            break;
            /*
            if( temp !== func && X_Type_isFunction( temp ) ){
                return args.length === 0 ? thisObj[ 'handleEvent' ]() : temp.apply( thisObj, args );
            } else
            if( X_Type_isFunction( thisObj ) ){
                return args.length === 0 ? thisObj.call( thisObj ) : thisObj.apply( thisObj, args );
            };
            return args.length === 0 ? func.call( thisObj ) : func.apply( thisObj, args );*/

        case X_CLOSURE_FUNC_ONLY :
            return args.length === 0 ?
                    func() :
                args.length === 1 ?
                    func( args[ 0 ] ) :
                    func.apply( null, args );
    };
    return X_CALLBACK_NONE;
};

function X_Closure_correct( f ){
    var i = X_CLOSURE_LIVE_LIST.indexOf( f ),
        obj;

    if( i !== -1 ){
        X_CLOSURE_LIVE_LIST.splice( i, 1 );
        // 2020.3.16 Firefox74 Windows10 クロージャのリユースが出来ず、DOM Event のコールバックで再利用前の設定で呼ばれてしまう！
        // 2020.3.31 Chrome80 Windows10 でも確認。
        // 
        if( !( 69 <= X_UA.Gecko && X_UA.Win32 ) && !( 80 <= X_UA.Chromium && X_UA.Win32 ) && !( X_UA.Trident === 8 && X_UA.Win32 === 10 ) ){
            X_CLOSURE_POOL_LIST[ X_CLOSURE_POOL_LIST.length ] = f;
        };
        obj = f( X_Closure_COMMAND_BACK );
        X_Object_clear( obj );
        return true;
    };
};

function X_Closure_monitor(){
    return {
        'Callback:Live' : X_CLOSURE_LIVE_LIST.length,
        'Callback:Pool' : X_CLOSURE_POOL_LIST.length
    };
};
function X_Closure_gc(){
    X_CLOSURE_POOL_LIST.length = 0; // ?
};

X_TEMP.onSystemReady.push( function( sys ){
    sys.monitor( X_Closure_monitor );
    sys.gc( X_Closure_gc );
});
