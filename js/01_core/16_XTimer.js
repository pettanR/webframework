/*
 * use X.Callback
 */

/*
 * 
 * http://please-sleep.cou929.nu/script-yielding-with-setimmediate.html
 * setImmediate での script yielding
 * 
 * http://ie.microsoft.com/testdrive/Performance/setImmediateSorting/Default.html
 * setImmediate API
 * 
 * if( timer < 4ms ) useSetImmediate
 * 
 *         if (window.msSetImmediate)
        {
            this.timer = msSetImmediate(function () { t.stepper(); });        
        }
        else if (window.MozSetImmediate)
        {
            this.timer = MozSetImmediate(function () { t.stepper(); });        
        }
        else if (window.WebkitSetImmediate) {
            this.timer = WebkitSetImmediate(function () { t.stepper(); });
        }
        else if (window.OSetImmediate)
        {
            this.timer = OSetImmediate(function () { t.stepper(); });        
        }
 */


// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //

var

	/**
	 * 現在時の ms を返します。 new Date().getTime() の値です。
	 * @alias X.Timer.now
	 * @function
	 * @return {number} ミリ秒
	 */
	X_Timer_now = Date.now || ( function(){ return +new Date; } ),

	// TODO X.AF.request, X.AF.cancel
	// http://uupaa.hatenablog.com/entry/2012/02/01/083607
	// Firefox 4 partial (request only), Mobile Firefox5 ready (request only), Firefox 11 ready (cancel impl)	
	X_Timer_REQ_ANIME_FRAME =
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		false,

	X_Timer_CANCEL_ANIME_FRAME =
		window.cancelAnimationFrame ||
		window.cancelRequestAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		false,
		
	X_Timer_INTERVAL_TIME  = 16,
	X_Timer_TICKET_LIST    = [],
	X_Timer_removal        = null,
	X_Timer_skipUpdate     = false,
	X_Timer_uid            = 0,
	X_Timer_timerId        = 0,
	X_Timer_busyTimeout    = false,
	X_Timer_timeStamp      = 0, // setTimeout に登録した時間
	X_Timer_waitTime       = 0,	// 待ち時間
	X_Timer_currentUID     = 0, // 現在発火中の uid
	
	X_Timer_REQ_FRAME_LIST = [],
	X_Timer_requestID      = 0,
	X_Timer_busyOnFrame    = false,

	/**
	 * requestAnimationFrame をセットします。
	 * @alias X.Timer.requestFrame
	 * @function
	 * @param {*} args1 コールバックのための最大で 3 つの引数を指定します。参考:__CallbackHash__
	 * @param {*} args2
	 * @param {*} args3
	 * @return {number} タイマーID。1 以上の数値。タイマーの解除に使用。
	 */
	X_Timer_requestFrame = X_Timer_REQ_ANIME_FRAME ?
		(function( args1, args2, args3 ){
			var i = X_Timer_REQ_FRAME_LIST.length,
				f;
			i === 0 && ( X_Timer_requestID = X_Timer_REQ_ANIME_FRAME( X_Timer_onEnterFrame ) );
			f = X_Closure_classifyCallbackArgs( args1, args2, args3 );
			if( !f.cbKind ) f = { func : f };
			X_Timer_REQ_FRAME_LIST[ i ] = f;
			return f._uid = ++X_Timer_uid;
		}) :
		(function( args1, args2, args3 ){
			var i = X_Timer_REQ_FRAME_LIST.length,
				f;
			i === 0 && ( X_Timer_requestID = X_Timer_add( 0, 1, X_Timer_onEnterFrame ) );
			f = X_Closure_classifyCallbackArgs( args1, args2, args3 );
			if( !f.cbKind ) f = { func : f };
			X_Timer_REQ_FRAME_LIST[ i ] = f;
			return f._uid = ++X_Timer_uid;
		}),

	/**
	 * requestAnimationFrame を解除します。登録時に受け取ったタイマーIDを使用します。
	 * @alias X.Timer.cancelFrame
	 * @function
	 * @param {number|string} タイマーID, 数字文字の場合もある！
	 * @return {number} 0 が返る
	 * @example if( timerID ) timerID = X.Timer.cancelFrame( timerID );
	 */
	X_Timer_cancelFrame = X_Timer_CANCEL_ANIME_FRAME ?
		(function( uid ){
			var list = X_Timer_REQ_FRAME_LIST,
				l    = list.length,
				i    = l,
				f;

			if( X_Timer_busyOnFrame ){
				// fire 中の cancel
				if( !X_Timer_removal ) X_Timer_removal = {};
				X_Timer_removal[ uid ] = true;
			} else {
				for( ; i; ){
					if( ( f = list[ --i ] )._uid < uid ) break;
					if( f._uid == uid ){
						list.splice( i, 1 );
						// gecko では cancelRequestAnimationFrame が無い場合がある
						l === 1 && X_Timer_CANCEL_ANIME_FRAME && X_Timer_CANCEL_ANIME_FRAME( X_Timer_requestID );
						break;
					};
				};				
			};
			return 0;
		}) :
		(function( uid ){
			var list = X_Timer_REQ_FRAME_LIST,
				l    = list.length,
				i    = l,
				f;

			if( X_Timer_busyOnFrame ){
				// fire 中の cancel
				if( !X_Timer_removal ) X_Timer_removal = {};
				X_Timer_removal[ uid ] = true;
			} else {
				for( ; i; ){
					if( ( f = list[ --i ] )._uid < uid ) break;
					if( f._uid == uid ){
						list.splice( i, 1 );
						l === 1 && X_Timer_remove( X_Timer_requestID );
						break;
					};
				};
			};
			return 0;
		});


// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * <p>setTimeout をラップします。複数のタイマーを登録しても Web ブラウザにはひとつのタイマーを登録します。
 * <p>参考:<a href="http://d.hatena.ne.jp/amachang/20060924/1159084608" target="_blank">複雑で重くなった JavaScript を超高速化する方法３</a>,
 * <a href="http://d.hatena.ne.jp/sawat/20070329" target="_blank">[JavaScript]setIntervalを実験する</a>
 * <p>指定時間の経過したタイマーは、より過去のものから順番にコールバックされます。
 * <p>setTimeout のコールバックに文字列しか指定できないブラウザがあり対策しています。
 * <p>requestAnimationFrame をラップします。ベンダープレフィックス付の requestAnimationFrame もない場合、setTimeout にフォールバックします。
 * 
 * @namespace X.Timer
 * @alias X.Timer
 */ 
X[ 'Timer' ] = {
	// TODO IE4 の resolution は 64ms
	'RESOLUTION'   : X_Timer_INTERVAL_TIME,

	'now'          : X_Timer_now,
	
	'add'          : X_Timer_add,
	
	'once'         : X_Timer_once,
	
	'remove'       : X_Timer_remove,
	
	'requestFrame' : X_Timer_requestFrame,
	
	'cancelFrame'  : X_Timer_cancelFrame
	
};

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //

	/**
	 * タイマーをセットします。
	 * @alias X.Timer.add
	 * @param {number} time ミリ秒
	 * @param {number} opt_count 回数。省略可能。指定回数で自動でタイマーを破棄します。0 を指定した場合無限にタイマーが呼ばれます。省略した場合 0 と同じです。
	 * @param {*} args1 コールバックのための最大で 3 つの引数を指定します。参考:__CallbackHash__
	 * @param {*} args2
	 * @param {*} args3
	 * @return {number} タイマーID。1 以上の数値。タイマーの解除に使用。
	 * @example timerID = X.Timer.add( 1000, 5, thisContext, onTimer );
	 */
	function X_Timer_add( time, opt_count, args1, args2, args3 ){
		var list = X_Timer_TICKET_LIST,
			hash, obj;

		time = time < X_Timer_INTERVAL_TIME ? 1 : time / X_Timer_INTERVAL_TIME | 0; // 正の数で使える「Math.floor(x)」を「(x | 0)」に;
		
		if( !X_Type_isNumber( opt_count ) ){
			args3 = args2;
			args2 = args1;
			args1 = opt_count;
			opt_count = 0;
		};
		
		hash = X_Closure_classifyCallbackArgs( args1, args2, args3 );
		if( !hash ) return -1; // dev only
		
		if( !hash.cbKind ) hash = { func : hash };
		hash._time  = time;
		hash.last   = time;
		hash._count = opt_count;
		hash._uid   = ++X_Timer_uid;
		list[ list.length ] = hash;
		
	    !X_Timer_busyTimeout && X_Timer_update();
	    return X_Timer_uid;
	};
	
	/**
	 * 1 回呼ばれたら解除されるタイマーをセットします。
	 * @alias X.Timer.once
	 * @param {number} time ミリ秒
	 * @param {*} args1 コールバックのための最大で 3 つの引数を指定します。参考:__CallbackHash__
	 * @param {*} args2
	 * @param {*} args3
	 * @return {number} タイマーID。1 以上の数値。タイマーの解除に使用。
	 */
	function X_Timer_once( time, args1, args2, args3 ){
		return X_Timer_add( time, 1, args1, args2, args3 );
	};
	
	/**
	 * タイマーを解除します。登録時に受け取ったタイマーIDを使用します。
	 * @alias X.Timer.remove
	 * @param {number} タイマーID
	 * @return {number} 0 が返る
	 * @example if( timerID ) timerID = X.Timer.remove( timerID );
	 */
	function X_Timer_remove( uid ){
		var list = X_Timer_TICKET_LIST,
			i    = list.length,
			l    = i,
			q;
		
		if( X_Timer_busyTimeout ){
			// fire 中の cancel
			if( !X_Timer_removal ) X_Timer_removal = {};
			X_Timer_removal[ uid ] = true;
		} else {
			for( ; i; ){
				if( ( q = list[ --i ] )._uid == uid ){ // 数字の場合と文字の場合がある
					list.splice( i, 1 );
					
					/*
					 * lazyDispatch 中の EventDispatcher の有無を調べる
					 */
					if( X_EventDispatcher_LAZY_TIMERS[ uid ] ){
						delete X_EventDispatcher_LAZY_TIMERS[ uid ];
					};
					
					!X_Timer_skipUpdate && ( q.last <= X_Timer_waitTime || l === 1 ) && X_Timer_update();
					break;
				};
			};				
		};
		return 0;
	};

if( ( X_UA.Trident || X_UA.TridentMobile ) < 5 || X_UA.Tasman ){
	window[ '__timercb__' ] = X_Timer_onTimeout;
	X_Timer_onTimeout = '__timercb__()';
};

function X_Timer_onTimeout(){
	var now   = X_Timer_now(),
		minus = ( ( now - X_Timer_timeStamp ) / X_Timer_INTERVAL_TIME | 0 ) || 1,
		list  = X_Timer_TICKET_LIST,
		i     = 0,
		l     = list.length,
		limit = now + X_Timer_INTERVAL_TIME / 2,
		heavy,
		q, c, r, uid;
	
	//console.log( '予定時間と発火時間の差:' + ( now - X_Timer_timeStamp - X_Timer_waitTime * X_Timer_INTERVAL_TIME ) + ' -:' + minus + ' next:' + X_Timer_waitTime );
	
	if( X_Timer_busyTimeout ){
		alert( 'X_Timer_busyTimeout フラグが立ったまま!エラーの可能性' );
	};
	
	X_Timer_busyTimeout = true;
	
    for( ; i < l; ++i ){
    	q = list[ i ];
    	if(
    		( X_Timer_removal && X_Timer_removal[ q._uid ] ) || // timerId は remove 登録されている
			0 < ( q.last -= minus ) || // 時間が経過していない
			heavy && ( q.last = 1 ) // 時間は経過したが、ヘビーフラグが立っている
		){
			continue;
		};
		c = q._count;
		
		X_Timer_currentUID = q._uid;
		
		if( q.cbKind ){
			r = X_Closure_proxyCallback( q, [] );
		} else {
			r = q.func();
		};
		
		//console.log( 'fire....' );
		
		if( limit <= X_Timer_now() ){
			//console.log( '******* heavy!' );
			// 関数の実行に時間がかかる場合、次のタイミングに
			heavy = true;
		};
		
		if( r & X_CALLBACK_UN_LISTEN || c === 1 ){
			list.splice( i, 1 );
			--i;
			--l;
			continue;
		} else
		if( 1 < c ) --q._count;
		q.last = q._time;
    };
    X_Timer_timerId     = X_Timer_currentUID = 0;
    X_Timer_busyTimeout = false;
    
    if( X_Timer_removal ){
    	X_Timer_skipUpdate = true;
    	for( uid in X_Timer_removal ){
    		//if( X_EMPTY_OBJECT[ uid ] ) continue;
    		X_Timer_remove( uid );
    	};
    	X_Timer_skipUpdate = false;
    	X_Timer_removal = null;
    };
    X_Timer_update();
    
    ExecuteAtEnd_onEnd();
};

function X_Timer_update(){
	var list = X_Timer_TICKET_LIST,
		i    = list.length,
		n;
	if( i === 0 ){
		X_Timer_timerId && clearTimeout( X_Timer_timerId );
		X_Timer_timerId = 0;
		return;
	};
	
	1 < i && list.sort( X_Timer_compareQueue );
	
    n = list[ 0 ].last;
    
    if( n < X_Timer_waitTime || X_Timer_timerId === 0 ){
    	if( X_Timer_timerId ){
    		clearTimeout( X_Timer_timerId );
    		n -= ( X_Timer_now() - X_Timer_timeStamp ) / X_Timer_INTERVAL_TIME;
    		0 <= n || ( n = 0 ); // 負の数は 0 に
    	};
    	X_Timer_timeStamp = X_Timer_now();
    	X_Timer_timerId   = setTimeout( X_Timer_onTimeout, X_Timer_INTERVAL_TIME * n | 0 );
    	X_Timer_waitTime  = n;
    };
};

// 小さい -> 大きい、 同値の場合  uid の小さいものが先
// http://jsfiddle.net/warby_/X8YUZ/ Chrome で return が 0 の場合の挙動が他のブラウザと異なる
function X_Timer_compareQueue( a, b ){
    if( a.last === b.last ){ // Chrome のみ
        return a._uid - b._uid;
    };
    return a.last - b.last;
	// return a.last <= b.last ? -1 : 1; //a.last === b.last ? 0 : 1;
};

// http://havelog.ayumusato.com/develop/javascript/e528-ios6_scrolling_timer_notcall.html
// iOS6 スクロール中のタイマー発火絡みのバグ備忘
if( ( X_UA.SafariMobile || X_UA.iOSWebView ) ){
	window.addEventListener( 'scroll', function(){
		var last, now;
		if( X_Timer_timerId ){
			clearTimeout( X_Timer_timerId );
			now               = X_Timer_now();
			last              = X_Timer_timeStamp + X_Timer_INTERVAL_TIME * X_Timer_waitTime - now;
			X_Timer_timerId   = setTimeout( X_Timer_onTimeout, 0 < last ? last : 0 );
			// 更新
			X_Timer_timeStamp = now;
			X_Timer_waitTime  = last / X_Timer_INTERVAL_TIME | 0;
		};
		X_ViewPort_getScrollPosition(); // X_DomEvent　のための X_ViewPort_scrollX & Y の更新
	});
};

// ページを読み込んでからの時間
function X_Timer_onEnterFrame( time ){
	var list = X_Timer_REQ_FRAME_LIST,
		l    = list.length,
		i    = 0, q, uid, args;

	time = time || X_Timer_now();
	X_Timer_busyOnFrame = true;
	// console.log( X_Timer_now() + ' , ' + time );
    for( ; i < l; ++i ){
    	q = list[ i ];
    	
    	if( X_Timer_removal && X_Timer_removal[ q._uid ] ) continue;
    	
		if( q.cbKind ){
			X_Closure_proxyCallback( q, args || ( args = [ time ] ) );
		} else {
			q.func( time );
		};
    };

    list.splice( 0, l );
    if( list.length ){
    	X_Timer_requestID = X_Timer_REQ_ANIME_FRAME ? X_Timer_REQ_ANIME_FRAME( X_Timer_onEnterFrame ) : X_Timer_add( 0, 1, X_Timer_onEnterFrame );
    };
    
    X_Timer_busyOnFrame = false;
    if( X_Timer_removal ){
    	for( uid in X_Timer_removal ){
    		//if( X_EMPTY_OBJECT[ uid ] ) continue;
    		X_Timer_cancelFrame( X_Timer_removal[ uid ] );
    	};
    	X_Timer_removal = null;
    };
    
    ExecuteAtEnd_onEnd();
};
