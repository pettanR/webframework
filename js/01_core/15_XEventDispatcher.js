/**
 * <p>EventDispatcher インスタンスのメンバ(_listeners)でイベントリスナをイベント名(string)や
 * イベントID(5~以上の number, フレームワーク内で定義、5 以上になる理由は後述)をキーとする Array で記憶します。
 * 
 * <p>Arrayには、__CallbackHash__ というハッシュ、または関数が蓄えられています。
 * 
 * <p>また、イベントターゲット(EventDispatcher[ '_rawObject' ])に渡された再利用可能クロージャの控えを _listeners[0] に記憶します。(ACTUAL_HANDLER)
 * 
 * <p>dispatch 中の状態と操作を記録し不整合が起きないようにするためのプロパティ(_listeners[1]～_listeners[4])を持ちます。イベントID が 5 から始まるのはこのためです。
 * 
 * <dl>
 * <dt>0:ACTUAL_HANDLER
 * <dd>イベントターゲットの addEventListener 等に渡される実際の関数(多くの場合、再利用可能クロージャ、それ以外は通常の関数)を控えています。
 * <dt>1:DISPATCHING number
 * <dd>dispatch 中か？さらにインスタンス自身の dispatch がネストした場合、その深さを記憶します。
 * <dt>2:RESERVES Array
 * <dd>イベント発火中に listen() が呼ばれた場合に引数を蓄え、完了時(DISPATCHING===0)に再度 listen() するための一時ストアです。
 * <dt>3:UNLISTENS Object
 * <dd>イベント発火中に unlisten() が呼ばれた場合に対象リスナを記憶し、リスナが呼ばれないようにします。完了時(DISPATCHING===0)に再度 unlisten() します。
 * <dt>4:KILL_RESERVED boolean
 * <dd>dispatch 中に kill() が呼ばれた場合に一旦 kill をキャンセルし、完了時(DISPATCHING===0)に再度 kill() するためのフラグです。
 * </dl>
 * 
 * @class __Listeners__
 * @private
 */
var X_Listeners_;

var X_LISTENERS_ACTUAL_HANDLER = 0,
	X_LISTENERS_DISPATCHING    = 1,
	X_LISTENERS_RESERVES       = 2,
	X_LISTENERS_UNLISTENS      = 3,
	X_LISTENERS_KILL_RESERVED  = 4; // X.Event で、イベントIDを 5 から始めているので注意。


// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //
var X_EventDispatcher_EVENT_TARGET_OTHER        = 0,
	X_EventDispatcher_EVENT_TARGET_XHR          = 1,
	X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT = 2;

var X_EventDispatcher_once         = false,
	X_EventDispatcher_lock         = false,
	X_EventDispatcher_unlock       = false,
	X_EventDispatcher_needsIndex   = false,
	
	X_EventDispatcher_safariPreventDefault = false, // Safari3-

	X_EventDispatcher_LAZY_TIMERS  = {},// Object.<number, X.EventDispatcher> number は timerID
	
	// iOS と MacOSX Iron36 で発生。連続してアニメーションが起こると、クロージャの束縛された obj へのアクセスに失敗する。Win では起きない?
	// むしろ、MacOSX のブラウザ全般で起こる??
	X_EventDispatcher_ANIME_EVENTS = ( X_UA[ 'WebKit' ] || X_UA[ 'Blink' ] ) && {
		'transitionend'      : true, 'webkitTransitionEnd'      : true, 'mozTransitionEnd'    : true, 'oTransitionEnd' : true, 'otransitionEnd' : true,
		'animationend'       : true, 'webkitAnimationEnd'       : true, 'oAnimationEnd'       : true,
		'animationstart'     : true, 'webkitAnimationStart'     : true, 'oAnimationStart'     : true,
		'animationiteration' : true, 'webkitAnimationIteration' : true, 'oAnimationIteration' : true
	};

// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * <p>ぺったんR フレームワークの特徴であるイベントリスナの作法は次の記事で詳しく解説しています。
 * 	<a href="http://outcloud.blogspot.jp/2015/06/eventdispatcher.html" target="_blank">ぺったんRフレームワークのコールバックのお作法</a>
 * 
 * <ol>
 * <li>as3 の EventDispatcher ライクなクラス。そのまま使ったり、継承したり。
 * <li>_rawObject メンバがいる場合、addEventListener, attachEvent, on 等で生のブラウザオブジェクトにリスナを登録する。
 *     window, document, HTMLElement, Image, XHR, Silverlight などが _rawObject になる。
 * <li>イベントディスパッチ中にリスナの追加が呼び出された場合、リスナはこれ以降のイベントから呼ばれます。同様にリスナの削除が呼ばれた場合、そのリスナが呼ばれることはありません。
 * </ol>
 * <p>listen, unlisten, dispatch という addEventListener, removeEventListener, dispatchEvent に対応する関数を持ちます。
 * また listening という ActionScript3 の hasEventListener に相当する関数を持ちます。
 * 
 * <p>イベントターゲットオブジェクト(widnow, document, HTMLElement, XHR, Silverlight 等)が this[ '_rawObject' ] に設定されていた場合に、それらへ実際のイベント登録・解除も行います。
 * このイベントの登録・解除はクロスブラウザで、IE5～8 の独自イベントの差異を吸収し、DOM0 に対しても複数のコールバックを登録することができます。
 * 
 * <p>またコールバックに対して、this コンテキストや、追加の引数を指定もできます。 this コンテキストを指定しなかった場合、EventDispatcher インスタンスがコールバックの this になります。 
 * 
 * <p>unlisten() では systemListen 経由で登録されたハンドラは解除されません。
 * 
 * systemListen, systemUnlisten は、ライブラリ内のコードからしかアクセスできません。
 * 
 * @alias X.EventDispatcher
 * @class EventDispatcher オブジェクトをラップしたり、アプリケーションで独自に定義したイベントを発信するためのクラスです。
 * @constructor 
 * @constructs EventDispatcher
 * @extends {__ClassBase__}
 */
var X_EventDispatcher = X[ 'EventDispatcher' ] =
	X_Class_create(
		'EventDispatcher',
		
	    /** @lends EventDispatcher.prototype */
		{

		/**
		 * EventDispatcher がラップしている EventTarget オブジェクトのタイプです。<br>
		 * X_EventDispatcher_actualAddEvent で使用されます。<br>
		 * OTHER:0(node,window,document,Image,Audio), XHR:1, Silverlight:2
		 * @private
		 * @type {number}
		 */
			'_rawType'      : X_EventDispatcher_EVENT_TARGET_OTHER,
		
		/**
		 * イベントリスナをイベント名文字列や数値(5以上、フレームワーク内で定義)をキーとするArrayで記憶します。<br>
		 * Arrayには、{cbKind:種類,context:コンテキスト(thisObject),func:コールバック関数,supplement:サプリメントする引数の配列} というハッシュ、または関数が蓄えられています。
		 * 
		 * @private
		 * @type {__Listeners__}
		 */
			'_listeners'    : null,

		/**
		 * _rawObject には HTMLElement, window, document, XHR といったイベントターゲットオブジェクトを設定します。
		 * _rawObject が設定されていると listen(), unlisten() 時に addEventListener(DOM Level2) や detachEvent(ie5～8), on～(DOM0) 等を操作します。
		 * _rawObject は最初の listen() 前に設定しておかないと addEventListener 等が意図したように行われません。
		 * X.Node では非同期に HTMLElement を生成していますが、要素生成以前に listen, unlisten を呼び出すことができます。これは適宜に X_EventDispatcher_toggleAllEvents を呼んで解決しているためです。
		 * @private
		 * @type {Object}
		 */
			'_rawObject'    : null,
			
	    /**
	     * X.EventDispatcher のコンストラクタの実体。<br>
		 * イベントターゲットをラップする場合、通常は new 時に渡します。<br>
		 * アプリケーション独自のイベントをやり取りしたいだけ、という場合イベントターゲットは指定しません。
	     * @param {object=} opt_rawObject
	     */
			'Constructor' : function( opt_rawObject ){
				if( opt_rawObject ){
					this[ '_rawObject' ] = opt_rawObject;
				};
			},

			'dispatch' : X_EventDispatcher_dispatch,
			
			'listen' : X_EventDispatcher_listen,
		
		/**
		 * dispatch 時に自動で unlisten されるフラグを立てて listen する。
		 * @param {string|number|Array.<string,number>} type 配列を指定した場合、複数のイベントタイプに対して同じコールバックを登録する。
		 * @param {listener|function|Array} [opt_arg1=]
		 * @param {function|Array} [opt_arg2=]
		 * @param {Array} [opt_arg3=] コールバック時の引数を配列に入れる。引数がひとつでも配列を使用する。省略した場合引数なし。unlisten() に使用するので、配列も適宜に保持しておくこと。
		 * @return {EventDispatcher} チェインメソッド
		 */
			'listenOnce' : function( type, opt_arg1, opt_arg2, opt_arg3 ){
				X_EventDispatcher_once = true;
				this[ 'listen' ]( type, opt_arg1, opt_arg2, opt_arg3 );
				X_EventDispatcher_once = false;
				return this;
			},

			'unlisten' : X_EventDispatcher_unlisten,

		/**
		 * <p>イベントリスナの登録状況を真偽値で返す。戻り値が数値(index)の場合もあるが、これは内部のみで使用。
		 * <p>this.listening(); のように type を省略した場合、一つでも登録があれば true を返す。
		 * <p>this.listening( 'myevent' ); と type だけを与えた場合、その type に登録があれば true を返す。
		 * <p>type と イベントリスナの組み合わせが登録されているかを調べる場合は、listen 時の thisObject や args(Array) も一致させて渡す必要がある。
		 * 
		 * @example 
		 *  this.listen( [ 'myevent', 'yourevent' ], this, onMyEvent, args = [ 1, 'a' ] );
		 *  this.listening( 'myevent', this, onMyEvent, args ) === true;
		 * 
		 * @return {number|boolean}
		 * @param {string|number} opt_type
		 * @param {listener|function|Array|callbackHash} opt_arg1
		 * @param {function|Array} opt_arg2
		 * @param {Array} opt_arg3
		 */			
			'listening' : function( opt_type, opt_arg1, opt_arg2, opt_arg3 ){
				var listeners = this[ '_listeners' ],
					lock      = X_EventDispatcher_lock || X_EventDispatcher_unlock,
					list, cbHash, unlistens, i, f;
				
				if( opt_type === undefined ) return !!listeners;
				if( !listeners || !( list = listeners[ opt_type ] ) ) return false;
				if( opt_arg1 === undefined ) return X_EventDispatcher_needsIndex ? 0 : true;
				
				// TODO callbackHash か？判定が不十分！ skipConvertion
				if( opt_arg1.cbKind ){
					cbHash = opt_arg1;
				} else {
					cbHash = X_Closure_classifyCallbackArgs( opt_arg1, opt_arg2, opt_arg3, this );
				};
				
				if( ( unlistens = listeners[ X_LISTENERS_UNLISTENS ] ) && ( unlistens = unlistens[ opt_type ] ) ){
					for( i = unlistens.length; i; ){
						f = unlistens[ --i ];
						if( f === cbHash || ( f.context === cbHash.context && f.func === cbHash.func && f.funcName === cbHash.funcName && f.supplement === cbHash.supplement && f.lock === lock ) ) return false;
					};
				};
				
				for( i = list.length; i; ){
					f = list[ --i ];
					if( f === cbHash || ( f.context === cbHash.context && f.func === cbHash.func && f.funcName === cbHash.funcName && f.supplement === cbHash.supplement && f.lock === lock ) ){
						// index を要求された場合、lock されていない、または unlock なら index を返す
						return X_EventDispatcher_needsIndex ? i : true;
					};
				};
				return false;
			},

		/**
		 * delay(ミリ秒)後にイベントを dispatch する。戻り値は uid = X.Timer.once() のタイマーID(数値)。X.Timer.remove(uid) でタイマーを解除して dispatch を中止できる。
		 * kill() 時には内部でまだ呼ばれていないタイマーの X.Timer.remove() が行われる。インスタンスが破棄された後にタイマーが呼ばれることがないので神経質にならなくても安全に使える。
		 * @example this[ 'asyncDispatch' ]( 'myevent' );
		 * // どちらのコードも同じ動作をする。
		 * this.asyncDispatch( 0, 'myevent' );
		 * @param {number|eventHash|string} delay ms 省略した場合は 0 として扱う asyncDispatch( 'myevent' ) -> asyncDispatch( 0, 'myevent' )
		 * @param {eventHash|string|number} e イベントを表す数値、文字列、{ type : XXX, ... } なオブジェクト
		 * @return {number} X.Timer.add() の戻り値
		 */			
			'asyncDispatch' : function( delay, e ){
				var timerID;
				if( delay && e === undefined ){
					e = delay;
					delay = 0;
				};
				//{+dev
				delay === undefined && eval( 'throw "asyncDispatch で undefined イベントが指定されました"' );
				//}+dev
				timerID = X_Timer_add( delay, 1, this, X_EventDispatcher_dispatch, [ e ] );
				X_EventDispatcher_LAZY_TIMERS[ timerID ] = this;
				return timerID;
			}
		}
	);

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * 登録されたイベントリスナを呼び出す。イベントリスナの返り値(数値)を OR したものを返す。イベントハッシュでなく、string|number を渡すと内部でイベントハッシュを作る。
 * dispatch のコールバック中で kill() が呼ばれた場合、実際の kill は、dispatch の終わりまで待機する。dispatch がネストする場合は全ての dispatch の完了で kill() する。__ClassBase__ も参照。
 * dispatch のコールバック中で listen() が呼ばれた場合、実際の listen は、dispatch の終わりまで待機する。dispatch がネストする場合は全ての dispatch の完了で listen() する。
 * dispatch のコールバック中で unlisten() が呼ばれた場合、即座に反映され削除されたイベントリスナーは呼ばれない。
 * @alias EventDispatcher.prototype.dispatch
 * @param {eventHash|string|number} e
 * @return {number} X.Callback で定義された数値(ビットフラグ)
 */
function X_EventDispatcher_dispatch( e ){
	var listeners = this[ '_listeners' ],
		ret       = X_CALLBACK_NONE,
		type      = e[ 'type' ],
		list, unlistens, i, l, args, f, r, sysOnly, timerID, k;
	
	if( !listeners || !( list = listeners[ type || e ] ) ) return X_CALLBACK_NONE;
	
	// 数値, 文字が渡された場合
	if( !type ){
		e = { 'type' : type = e };
	};
	e[ 'target' ]        = e[ 'target' ] || this;
	e[ 'currentTarget' ] = e[ 'currentTarget' ] || this;
	
	if( listeners[ X_LISTENERS_DISPATCHING ] ){
		++listeners[ X_LISTENERS_DISPATCHING ];
	} else {
		listeners[ X_LISTENERS_DISPATCHING ] = 1;
	};

	//listeners[ X_LISTENERS_UNLISTENS ] = listeners[ X_LISTENERS_UNLISTENS ] || {};
	//unlistens = listeners[ X_LISTENERS_UNLISTENS ][ type ];
	
	for( i = 0; i < list.length; ++i ){
		f = list[ i ];
		// TODO removed フラグは?
		if( f.removed ) continue;
		/*
		if( !unlistens ){
			unlistens = listeners[ X_LISTENERS_UNLISTENS ][ type ];
		};
		if( unlistens && unlistens.indexOf( f ) !== -1 ) continue;
		*/
		
		r = X_Closure_proxyCallback( f, args || ( args = [ e ] ) );
		
		if( f.once || ( r & X_CALLBACK_UN_LISTEN ) ){
			// dispatch 中に unlisten が作られることがある
			if( !unlistens ){
				unlistens = listeners[ X_LISTENERS_UNLISTENS ] || ( listeners[ X_LISTENERS_UNLISTENS ] = {} );
				unlistens = unlistens[ type ] || ( unlistens[ type ] = [] );
			};
			unlistens.indexOf( f ) === -1 && ( unlistens[ unlistens.length ] = f );
		};
		ret |= X_Type_isFinite( r ) ? r : 0;
		
		if( ( r & X_CALLBACK_STOP_NOW ) === X_CALLBACK_STOP_NOW ){ // iOS では ( & ) 括弧が無いと判定を誤る
			sysOnly = true;
			break;
		};
	};
	
	if( ( --listeners[ X_LISTENERS_DISPATCHING ] ) === 0 ){

		delete listeners[ X_LISTENERS_DISPATCHING ];
		
		// dispatch 中に listen されたイベントの追加
		if( list = listeners[ X_LISTENERS_RESERVES ] ){
			for( i = 0, l = list.length; i < l; ++i ){
				f = list[ i ];
				X_EventDispatcher_once = f[ 4 ];
				X_EventDispatcher_lock = f[ 5 ];
				this[ 'listen' ]( f[ 0 ], f[ 1 ], f[ 2 ], f[ 3 ] );	
				f.length = 0;
			};
			list.length = 0;
			X_EventDispatcher_once = X_EventDispatcher_lock = false;
			delete listeners[ X_LISTENERS_RESERVES ];
		};		
		
		// dispatch 中に unlisten されたイベントの削除
		if( unlistens = listeners[ X_LISTENERS_UNLISTENS ] ){
			delete listeners[ X_LISTENERS_UNLISTENS ];
			
			// _unlistens に入っている callbackHash は、lock をクリアしている
			X_EventDispatcher_unlock = true;
			for( k in unlistens ){
				//if( X_EMPTY_OBJECT[ k ] ) continue;
				list = unlistens[ k ];
				for( i = list.length; i; ){
					this[ 'unlisten' ]( k, list[ --i ] );
				};
				list.length = 0;
				delete unlistens[ k ];
			};
			X_EventDispatcher_unlock = false;
		};
		
		if( X_EventDispatcher_LAZY_TIMERS[ X_Timer_currentUID ] === this ){
			delete X_EventDispatcher_LAZY_TIMERS[ X_Timer_currentUID ];
		};

		if( listeners[ X_LISTENERS_KILL_RESERVED ] ){
			this[ 'kill' ]();
		};
	};
	
	return ret;
};

/**
 * イベントリスナを追加する。同一イベントに対して重複するリスナ(context, function, 引数 array が一致)の追加は無視される。
 * ユーザーが触ることは無いが、システム内部でロックフラグを立てたリスナは、立てられていないフラグとは区別される。
 * この仕組みによってシステムの登録したリスナを、システム外から不用意に削除されることを回避する。
 * @example // 'myEvent' に対して、 this コンテキストを指定して 、コールバック関数を渡す。
 * this[ 'listen' ]( 'myEvent', context, func );
 * // 'myEvent' に対して、 this コンテキストを指定して 、コールバック関数と追加の引数を渡す。
 * args = [ 'arg1', 'arg2', 3 ]; // unlisten(　'myEvent', context, func, args　) で使用するので Array も控えておく。
 * this[ 'listen' ]( 'myEvent', context, func, args );
 * // 'myEvent' に対して、 listener オブジェクトを渡す。listener は handleEvent という関数を持つオブジェクトのこと。
 * listener.handleEvent = function( e ){};
 * this[ 'listen' ]( 'myEvent', listener );
 * // 'myEvent' に対して、 listener オブジェクトと追加の引数を渡す。
 * listener.handleEvent = function( e, arg1, arg2, arg3 ){};
 * this[ 'listen' ]( 'myEvent', listener, [ arg1, arg2, arg3 ] );
 * // 'myEvent' に対して、 function を渡す。
 * this[ 'listen' ]( 'myEvent', onMyEvent );
 * // 'myEvent' に対して、 function と追加の引数を渡す。
 * this[ 'listen' ]( 'myEvent', onMyEvent, args );
 * // 次の二つは同じ動作です。 this コンテキストが与えられなかった場合、コールバックの this は発火元インスタンスになります。
 * this[ 'listen' ]( 'myEvent', this [, func [, args ] ] );
 * this[ 'listen' ]( 'myEvent' [, func [, args ] ] );
 * // 複数のイベントタイプを同時に登録。コールバックは同じ指定が使われる。
 * this[ 'listen' ]( [ 'open', 'close', 'ready' ], onUpdate );
 * 
 * @alias EventDispatcher.prototype.listen
 * @return {EventDispatcher} チェインメソッド
 */
function X_EventDispatcher_listen( type, opt_arg1, opt_arg2, opt_arg3 ){
	var listeners = this[ '_listeners' ],
		i, raw, add, list, f;

	if( !type ) return this;
	
	if( listeners && listeners[ X_LISTENERS_DISPATCHING ] ){
		if( !listeners[ X_LISTENERS_RESERVES ] ) listeners[ X_LISTENERS_RESERVES ] = [];
		listeners[ X_LISTENERS_RESERVES ][ listeners[ X_LISTENERS_RESERVES ].length ] = [ type, opt_arg1, opt_arg2, opt_arg3, X_EventDispatcher_once, X_EventDispatcher_lock ];
		return this;
	};
	
	if( X_Type_isArray( type ) ){
		for( i = type.length; i; ){
			this[ 'listen' ]( type[ --i ], opt_arg1, opt_arg2, opt_arg3 );
		};
		return this;
	};
	
	raw = this[ '_rawObject' ] || X_UA_DOM.IE4 && X_Node__ie4getRawNode( this );
	add = raw && ( !listeners || !listeners[ type ] ) && X_Type_isString( type );

	if( this[ 'listening' ]( type, opt_arg1 || this, opt_arg2, opt_arg3 ) ) return this;

	if( !listeners ) listeners = this[ '_listeners' ] = {};
	list = listeners[ type ] || ( listeners[ type ] = [] );
	
	add && X_EventDispatcher_actualAddEvent( this, type, raw, list );
	
	f = X_Closure_classifyCallbackArgs( opt_arg1, opt_arg2, opt_arg3, this );
	list[ list.length ] = f;
	f.once = X_EventDispatcher_once;
	f.lock = X_EventDispatcher_lock;
	
	return this;
};

/*
 * X_EventDispatcher_systemUnlisten 経由でないと解除できないリスナの登録
 */
function X_EventDispatcher_systemListen( that, type, opt_arg1, opt_arg2, opt_arg3 ){
	X_EventDispatcher_lock = true;
	that[ 'listen' ]( type, opt_arg1, opt_arg2, opt_arg3 );
	X_EventDispatcher_lock = false;
};

/**
 * イベントリスナの解除を行う。登録時と同じ引数を与える必要がある。kill() で自信に登録されたすべてのイベントが解除されるので、途中で解除されるイベント以外は kill() に任せてしまってよい。<br>
 * 他人に登録したイベントを解除せずに kill するのは NG。
 * @alias EventDispatcher.prototype.unlisten
 * @return {EventDispatcher}
 */
function X_EventDispatcher_unlisten( opt_type, opt_arg1, opt_arg2, opt_arg3 ){
	var listeners = this[ '_listeners' ],
		list, reserves, unlistens, i, f, raw, k, empty;

	if( !listeners ) return this;
	
	if( X_Type_isArray( opt_type ) ){
		for( i = opt_type.length; i; ){
			this[ 'unlisten' ]( opt_type[ --i ], opt_arg1, opt_arg2, opt_arg3 );
			if( !opt_type[ i ] ){
				alert( '不正な unlisten Array' );
			};
		};
		return this;
	};

	if( reserves = listeners[ X_LISTENERS_RESERVES ] ){
		for( i = reserves.length; i; ){
			f = reserves[ --i ];
			if( f[ 0 ] === opt_type && f[ 1 ] === opt_arg1 && f[ 2 ] === opt_arg2 && f[ 3 ] === opt_arg3 && ( !f[ 5 ] || X_EventDispatcher_unlock ) ){
				reserves.splice( i, 1 );
				if( !reserves.legth ) delete listeners[ X_LISTENERS_RESERVES ];
				return this;
			};
		};
	};
	
	X_EventDispatcher_needsIndex = true;
	i = this[ 'listening' ]( opt_type, opt_arg1, opt_arg2, opt_arg3 );
	X_EventDispatcher_needsIndex = false;
	if( i === false ) return this;

	f = ( list = listeners[ opt_type ] )[ i ];
	
	if( listeners[ X_LISTENERS_DISPATCHING ] ){
		unlistens = listeners[ X_LISTENERS_UNLISTENS ] || ( listeners[ X_LISTENERS_UNLISTENS ] = {} );
		// _unlistens に入っている callbackHash は、lock のチェックは済んでいる
		( unlistens = unlistens[ opt_type ] ) ?
			( unlistens[ unlistens.length ] = f ) :
			( listeners[ X_LISTENERS_UNLISTENS ][ opt_type ] = [ f ] );
		f.removed = true;
	} else {
		//delete f.once;
		X_Object_clear( f );
		
		if( list.length !== 1 ){
			list.splice( i, 1 );
		} else {
			list.length = 0;

			delete listeners[ opt_type ];

			// TODO カウンター
			empty = true;
			for( k in listeners ){
				if( k <= X_LISTENERS_KILL_RESERVED ) continue;
				empty = false;
				break;
			};

			if( !X_String_isNumberString( '' + opt_type ) ){ // 数字イベントの除外
				raw = this[ '_rawObject' ] || X_UA_DOM.IE4 && X_Node__ie4getRawNode( this );
				raw && X_EventDispatcher_actualRemoveEvent( this, opt_type, raw, list, !empty );
			};
			
			if( empty ) delete this[ '_listeners' ];
		};
	};
	return this;
};

/*
 * X_EventDispatcher_systemListen から登録したイベントの解除
 */
function X_EventDispatcher_systemUnlisten( that, type, opt_arg1, opt_arg2, opt_arg3 ){
	X_EventDispatcher_unlock = true;
	that[ 'unlisten' ]( type, opt_arg1, opt_arg2, opt_arg3 );
	X_EventDispatcher_unlock = false;
};

function X_EventDispatcher_unlistenAll( that ){
	var listeners = that[ '_listeners' ],
		type, list, i;
	if( !listeners ) return;
	
	for( type in listeners ){
		//if( X_EMPTY_OBJECT[ opt_type ] ) continue;
		if( type <= X_LISTENERS_KILL_RESERVED ) continue;
		list = listeners[ type ];
		for( i = list.length; i; ){
			that[ 'unlisten' ]( type, list[ --i ] );
		};
	};
};

function X_EventDispatcher_actualAddEvent( that, type, raw, list ){
	var i, f;

	X_EventDispatcher_lock || ( type = X_Event_Rename[ type ] || type );
	
	if( X_Type_isArray( type ) ){
		for( i = type.length; i; ){
			X_EventDispatcher_systemListen( that, type[ --i ], X_emptyFunction );
			console.log( 'events fix > ' + type[ i ] );
		};
	} else {
		
	// Days on the Moon DOM Events とブラウザの実装 
	// http://nanto.asablo.jp/blog/2007/03/23/1339502
	// Safari 2 では関数オブジェクトしか EventListener として使えませんが、Safari のナイトリービルドでは handleEvent メソッドを持つオブジェクトも EventListener として使えるようです。
		
		if( X_UA_EVENT.W3C ){
			switch( that[ '_rawType' ] ){
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					list.slcallback = X_Closure_create( that, X_EventDispatcher_sliverLightDispatch, [ type ] );
					list.sltoken    = raw[ 'AddEventListener' ]( type, list.slcallback );
					break;
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					if( X_UA[ 'Opera' ] < 12 ){
						// Opera11- の XHR は event オブジェクトが返らないため, eventType 毎に callback を指定する addEventListener もない
						raw[ 'on' + type ] = X_Closure_create( that, X_EventDispatcher_dispatch, [ type ] );
						break;
					};

				default :
					if( X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[ type ] ){
						raw.addEventListener( type, X_EventDispatcher_iOSTransitionEndDispatch, false );
					} else {
						f = that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] || ( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] = X_Closure_create( that, X_EventDispatcher_actualHandleEvent ) );
		
						if( raw.addEventListener ){
							raw.addEventListener( type, f, false );
						} else {
							// Safari は Image, Opera7 は window
							raw[ 'on' + type ] = f;
						};
					};
			};
		} else
		if( X_UA_EVENT.IE ){
			switch( that[ '_rawType' ] ){	
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					list.slcallback = X_Closure_create( that, X_EventDispatcher_sliverLightDispatch, [ type ] );
					list.sltoken    = raw[ 'AddEventListener' ]( type, list.slcallback );
					break;				
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					console.log( 'XHR addEvent ' + type );
					// ie8- の XHR は window.event が更新されないため, eventType 毎に callback を指定する
					raw[ 'on' + type ] = X_Closure_create( that, X_EventDispatcher_dispatch, [ type ] );
					break;
				
				default :
					f = that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] || ( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] = X_Closure_create( that, X_EventDispatcher_actualHandleEvent ) );
					
					if( raw.attachEvent ){
						raw.attachEvent( 'on' + type, f );
					} else {
						raw[ 'on' + type ] = f;
					};
					break;
			};
		} else {
			switch( that[ '_rawType' ] ){
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					// DOM0 で Silverlight ってあるの -> ie4 mobile?
					list.slcallback = X_Closure_create( that, X_EventDispatcher_sliverLightDispatch, [ type ] );
					list.sltoken    = raw[ 'AddEventListener' ]( type, list.slcallback );
					break;				
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					// ie4 mobile は XHR をサポート！
					raw[ 'on' + type ] = X_Closure_create( that, X_EventDispatcher_dispatch, [ type ] );
					break;

				default :
					raw[ 'on' + type ] = that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] || ( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] = X_Closure_create( that, X_EventDispatcher_actualHandleEvent ) );
					break;
			};
		}
	};
};


/*
 * iOS の webkitTransitionEnd が連続して起こる場合、
 * コールバックの(that[ X_LISTENERS_ACTUAL_HANDLER ])クロージャ内の実際のコールバック(X_Closure_actualClosure:obj._)が
 * 参照できていない問題に遭遇、、、iOS3.1.3 & iOS6.1.5 で確認
 * animation も怪しい、、、
 */
function X_EventDispatcher_iOSTransitionEndDispatch( e ){
	return X_Node_getXNode( this )[ 'dispatch' ]( X_Event_RenameTo[ e.type ] || e.type );
};

/*
 * Silverlight のイベントの概要
 * http://msdn.microsoft.com/ja-jp/library/cc189018%28v=vs.95%29.aspx#the_sender_parameter_and_event_data
 */
function X_EventDispatcher_sliverLightDispatch( sender, e, type ){
	return this[ 'dispatch' ]( type );
};

function X_EventDispatcher_actualRemoveEvent( that, type, raw, list, skip ){
	var i;

	X_EventDispatcher_unlock || ( type = X_Event_Rename[ type ] || type );
	
	if( X_Type_isArray( type ) ){
		for( i = type.length; i; ){
			X_EventDispatcher_systemUnlisten( that, type[ --i ], X_emptyFunction );
		};
	} else {
		if( X_UA_EVENT.W3C ){
			switch( that[ '_rawType' ] ){
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					raw[ 'RemoveEventListener' ]( type, list.sltoken ); // token
					X_Closure_correct( list.slcallback );
					delete list.sltoken;
					delete list.slcallback;
					break;
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					if( X_UA[ 'Opera' ] < 12 ){
						// Opera11- の XHR は event オブジェクトが返らないため, eventType 毎に callback を指定する addEventListener もない
						X_Closure_correct( raw[ 'on' + type ] );
						raw[ 'on' + type ] = '';
						break;
					};

				default :
					if( X_EventDispatcher_ANIME_EVENTS && X_EventDispatcher_ANIME_EVENTS[ type ] ){
						raw.removeEventListener( type, X_EventDispatcher_iOSTransitionEndDispatch, false );
					} else
					if( raw.addEventListener ){
						raw.removeEventListener( type, that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ], false );
					} else {
						raw[ 'on' + type ] = null;
					};
					
					if( !skip && that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] ){
						X_Closure_correct( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] );
						delete that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ];
					};
			};
		} else
		if( X_UA_EVENT.IE ){
			switch( that[ '_rawType' ] ){
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					raw[ 'RemoveEventListener' ]( type, list.sltoken ); // token
					X_Closure_correct( list.slcallback );
					delete list.sltoken;
					delete list.slcallback;
					break;
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					X_Closure_correct( raw[ 'on' + type ] );
					raw[ 'on' + type ] = X_emptyFunction;
					raw[ 'on' + type ] = '';
					console.log( 'XHR rmEvent ' + type );
					break;

				default :
					if( raw.attachEvent ){
						raw.detachEvent( 'on' + type, that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] );
						console.log( 'raw rmEvent ' + type );
					} else {
						raw[ 'on' + type ] = X_emptyFunction;
						raw[ 'on' + type ] = '';
					};
					
					if( !skip ){
						X_Closure_correct( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] );
						delete that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ];
					};
			};
		} else {
			switch( that[ '_rawType' ] ){
				case X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT :
					raw[ 'RemoveEventListener' ]( type, list.sltoken ); // token
					X_Closure_correct( list.slcallback );
					delete list.sltoken;
					delete list.slcallback;
					break;
				
				case X_EventDispatcher_EVENT_TARGET_XHR :
					X_Closure_correct( raw[ 'on' + type ] );
					raw[ 'on' + type ] = X_emptyFunction;
					raw[ 'on' + type ] = '';
					break;

				default :
					raw[ 'on' + type ] = X_emptyFunction;
					raw[ 'on' + type ] = '';
					
					if( !skip ){
						X_Closure_correct( that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ] );
						delete that[ '_listeners' ][ X_LISTENERS_ACTUAL_HANDLER ];
					};
			};
		};
	};
};


// TODO ブラウザからの呼び出しの最後に登録された関数を呼び出す機能(例えば画面の更新)
var X_EventDispatcher_CURRENT_EVENTS    = [];
var X_EventDispatcher_ignoreActualEvent;
var X_EventDispatcher_rawEvent;

// handleEvent を拡張可能にするために、クロージャに移動した
// Is this in regard to the Safari 1.x preventDefault bug on click/dblclick?
// https://groups.google.com/forum/#!msg/comp.lang.javascript/uYEuCHjHxnw/yKoHtZJPa1QJ
var X_EventDispatcher_actualHandleEvent =
	X_UA_EVENT.IE4 || X_UA_EVENT.IE ? // ie45678 EVENT_IE & EVENT_DOM0 for ie4
		(function(){
			var e   = event,
				elm = this[ '_rawObject' ],
				ev, ret;
			
			if( X_EventDispatcher_ignoreActualEvent ){
				e.cancelBubble = true;
				return;
			};
			
			X_EventDispatcher_rawEvent = e;
			
			ev = new X_DomEvent( e, this, elm );

			X_EventDispatcher_CURRENT_EVENTS[ X_EventDispatcher_CURRENT_EVENTS.length ] = ev;
			
			ret = this[ 'dispatch' ]( ev );

			if( X_EventDispatcher_rawEvent === e ) X_EventDispatcher_rawEvent = null;

			--X_EventDispatcher_CURRENT_EVENTS.length;

			if( ret & X_CALLBACK_STOP_PROPAGATION ){
				e.cancelBubble = true;
			};
			
			if( !X_EventDispatcher_CURRENT_EVENTS.length ) ExecuteAtEnd_onEnd();
			
			if( ret & X_CALLBACK_PREVENT_DEFAULT ){
				X_EventDispatcher_ignoreActualEvent = true;
				this[ '_tag' ] === 'A' && elm.blur(); // おかしくない??
				X_EventDispatcher_ignoreActualEvent = false;
				return e.returnValue = false;
			};
		}) :
	//X_UA_EVENT.W3C || X_UA_EVENT.DOM0
		(function( e ){
			var ret = X_CALLBACK_NONE,
				elm = this[ '_rawObject' ],
				ev, i, l;
			
			if( X_EventDispatcher_ignoreActualEvent ){
				e.stopPropagation();
				return;
			};

			X_EventDispatcher_rawEvent = e;
			
			ev  = new X_DomEvent( e, this );
			X_EventDispatcher_CURRENT_EVENTS[ X_EventDispatcher_CURRENT_EVENTS.length ] = ev;

			// touch event -> pointer
			if( X_Type_isArray( ev ) ){
				if( ev.length === 0 ){
					// TouchEvent の後に発生した MouseEvent のｷｬﾝｾﾙ
					ret = X_CALLBACK_STOP_PROPAGATION | X_CALLBACK_PREVENT_DEFAULT;
				} else {
					for( i = 0, l = ev.length; i < l; ++i ){
						//console.log( 'handleEvent ' + ev[ i ].type );
						ret |= this[ 'dispatch' ]( ev[ i ] ) || 0;
					};
				};
			} else {
				ret = this[ 'dispatch' ]( ev );
			};
			
			if( X_EventDispatcher_rawEvent === e ) X_EventDispatcher_rawEvent = null;
			
			--X_EventDispatcher_CURRENT_EVENTS.length;
			
			if( !X_EventDispatcher_CURRENT_EVENTS.length ) ExecuteAtEnd_onEnd();
			
			if( ret & X_CALLBACK_STOP_PROPAGATION ){
				e.stopPropagation();
			};
			if( ret & X_CALLBACK_PREVENT_DEFAULT ){
				X_EventDispatcher_ignoreActualEvent = true;
				this[ '_tag' ] === 'A' && elm.blur();
				X_EventDispatcher_ignoreActualEvent = false;
				
				e.preventDefault();
				if( X_UA[ 'WebKit' ] < 525.13 ){ // Safari3-
					if( e.type === 'click' || e.type === 'dbclick' ){
						X_EventDispatcher_safariPreventDefault = true;
					};
				};
				return false;
			};
		});

if( X_UA[ 'WebKit' ] < 525.13 ){ // Safari3-
	document.documentElement.onclick =
	document.documentElement[ 'ondbclick' ] = function( e ){
			if( X_EventDispatcher_safariPreventDefault ){
				X_EventDispatcher_safariPreventDefault = false;
				e.preventDefault();
				return false;
			};
		};
};

// イベントの退避、dom が画面から抜かれる場合に実施しておく
// 退避したイベントの復帰
function X_EventDispatcher_toggleAllEvents( that, add ){
	var list = that[ '_listeners' ],
		raw  = that[ '_rawObject' ] || X_UA_DOM.IE4 && X_Node__ie4getRawNode( that ),
		func = add ? X_EventDispatcher_actualAddEvent : X_EventDispatcher_actualRemoveEvent,
		type;
	if( !list || !raw ) return;
	for( type in list ){
		//if( X_EMPTY_OBJECT[ type ] ) continue;
		// 数字イベントの除外
		if( !X_String_isNumberString( type ) ){
			// TODO type rename はここ
			func( that, type, raw, list[ type ], true );
		};
	};
};


console.log( 'X.Core.EventDispatcher' );
