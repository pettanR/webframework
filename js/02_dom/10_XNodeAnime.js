
var X_NodeAnime_QUEUE           = [],
	X_NodeAnime_uid             = 0,
	X_NodeAnime_reserved        = false,
	X_NodeAnime_updateTimerID   = 0,
	X_NodeAnime_needsDetection  = false,
	
	X_NodeAnime_hasTransform    = !!X_Node_CSS_VENDER_PREFIX.transform,
	// TODO ActiveX filter のチェック
	X_NodeAnime_hasDXTransform  = 5.5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 9 && ( X_UA.IEHost !== 11 ), // IE11 emu では不可
	
	/* Opera mobile で  translateZ(0) が有効だと XY が 0 0 になる */
	/* GPUレイヤーにいる間に要素のコンテンツを変更をすると transitionend が動かなくなるっぽい Mac safari と firefox */
	X_NodeAnime_translateZ      = X_Node_CSS_VENDER_PREFIX.perspective &&
									!( X_UA.PrestoMobile && X_UA.Android ) &&
									// https://twitter.com/uupaa/status/811157467094663168
									// Win7 IE11 と Win10 IE11 は IE11 が利用しているバックエンドが違うため、GPU叩く系のCSS/SVG/Flashの挙動が大きく異なりますよ。簡単に言うと Win7 IE11 はガビガビになる
									// Win7-8 + IE で描画が極めて乱れていた itozyun
                                    !(
                                        ( X_UA.Trident || X_UA.TridentMobile ) &&
                                        6.1 <= ( X_UA.Win32 || X_UA.Win64 ) && ( X_UA.Win32 || X_UA.Win64 ) < 7 // 7 <= windows <= 8.1
                                    ) ? ' translateZ(0)' : '',

// https://ics.media/entry/306
// transform(3D)はAndroid 2.x系の標準ブラウザや、最新版のFirefoxで不具合があるので注意が必要
// translate3dでrotate,scaleが適用されていない, transform(3D)が点滅し採点不可

/*
 * phase:
 *  0: アニメーション無
 *  1: 登録されたばかり
 *  2: 準待機
 *  3: 後続待機
 *  4: 強制停止(GPU転送予約)
 *  5: GPU解除待ち
 *  6: 開始可能
 *  7: アニメーション中
 */

	X_NODE_ANIME_RESET    = 1,
	X_NODE_ANIME_STAY_GPU = 2,
	
	X_NodeAnime_DEFAULT = {
		x        : NaN,
		y        : NaN,
		toX      : NaN,
		toY      : NaN,
		fromX    : NaN,
		fromY    : NaN,
		rotate   : NaN, fromRotate   : NaN, toRotate   : NaN,
		skewX    : NaN, fromSkewX    : NaN, toSkewX    : NaN,
		skewY    : NaN, fromSkewY    : NaN, toSkewY    : NaN,
		scaleX   : 1,   fromScaleX   : 1,   toScaleX   : 1,
		scaleY   : 1,   fromScaleY   : 1,   toScaleY   : 1,
		alpha    : NaN,
		scrollX  : NaN, fromScrollX  : NaN, toScrollX  : NaN,
		scrollY  : NaN, fromScrollY  : NaN, toScrollY  : NaN //,
		//doScroll : false//,
		//duration : 0
		//phase, lazyRelease, easing, follower, releaseNow, inited, progress, fallback
		// fromTime, toTime
	};

/**
 * GPU サポートの効いたアニメーションの設定
 * <a href="https://outcloud.blogspot.jp/2015/12/pettanR-Node-Anime.html">ぺったんRフレームワークのアニメーションメソッド</a>
 * @alias Node.prototype.animate
 * @param {object} obj
 * @return {Node} メソッドチェーン
 * @example
 * xnode.animate{
 * 	 from       : {
 * 	    x       : num,
 *      y       : num,
 *      opacity : 0.0, //～1.0
 *      rotate  : deg,
 *      skew    : deg,
 *      skewX   : deg,
 *      skewY   : deg,
 *      scale   : num,
 *      scaleX  : num,
 *      scaleY  : num,
 *      scrollX : num,
 *      scrollY : num
 *    },
 *   to          : {}, // from と同じ
 *   duration    : ms,
 *   lazyRelease : ms,
 *   easing      : 'quadratic', // function, 'circular', 'back', 'bounce', 'elastic'
 *   fallback    : bitFlag // 16:DXTransform, 8:css-p, 4:zoom(s) > 2:fontSize(s) > 1:width&height(vh,s)
 *   ** tree にいなくてもアニメーションを行いイベントを発生
 *   ** SVG transfrom
 *   fallbackWidth, fallbackHeight, transformOrigin( 0.5, 0.5 )
 * }
 */
function X_Node_animate( obj ){
	var list        = X_NodeAnime_QUEUE,
		from        = obj[ 'from' ] || {},
		dest        = obj[ 'to' ]   || {},
		duration    = obj[ 'duration' ],
		lazyRelease = obj[ 'lazyRelease' ],
		easing      = obj[ 'easing' ],
		fallback    = obj[ 'fallback' ],
		a, sameRate;
		
	obj = this[ '_anime' ];
	
	if( !( this[ '_flags' ] & X_NodeFlags_IN_TREE ) ){
		alert( '@animate 要素はツリーに追加されていません!' );
		// それでもアニメーションしてタイマー代わりにするとか、、、?
		return this;
	};
	
	if( !obj ){
		this[ '_anime' ] = obj = X_Object_copy( X_NodeAnime_DEFAULT );
		a = this[ '_css' ] && parseFloat( this[ '_css' ].opacity );
		if( 0 <= a ) obj.alpha = a;
	};
		
// form :
	obj.fromX       = obj.x       = X_NodeAnime_getFinite( from[ 'x' ],       obj.x );
	obj.fromY       = obj.y       = X_NodeAnime_getFinite( from[ 'y' ],       obj.y );
	obj.fromRotate  = obj.rotate  = X_NodeAnime_getFinite( from[ 'rotate' ],  obj.rotate );
	obj.fromSkewX   = obj.skewX   = X_NodeAnime_getFinite( from[ 'skewX' ],   from[ 'skew' ],  obj.skewX );
	obj.fromSkewY   = obj.skewY   = X_NodeAnime_getFinite( from[ 'skewY' ],   from[ 'skew' ],  obj.skewY );
	obj.fromScaleX  = obj.scaleX  = X_NodeAnime_getFinite( from[ 'scaleX' ],  from[ 'scale' ], obj.scaleX );
	obj.fromScaleY  = obj.scaleY  = X_NodeAnime_getFinite( from[ 'scaleY' ],  from[ 'scale' ], obj.scaleY );
	obj.fromAlpha   = obj.alpha   = X_NodeAnime_getFinite( from[ 'opacity' ], obj.alpha );
	obj.fromScrollX = obj.scrollX = X_NodeAnime_getFinite( from[ 'scrollX' ], obj.scrollX );
	obj.fromScrollY = obj.scrollY = X_NodeAnime_getFinite( from[ 'scrollY' ], obj.scrollY );
 // to :
	obj.toX                       = X_NodeAnime_getFinite( dest[ 'x' ],       obj.x );
	obj.toY                       = X_NodeAnime_getFinite( dest[ 'y' ],       obj.y );
	obj.toRotate                  = X_NodeAnime_getFinite( dest[ 'rotate' ],  obj.rotate );
	obj.toSkewX                   = X_NodeAnime_getFinite( dest[ 'skewX' ],   dest[ 'skew'  ], obj.skewX );
	obj.toSkewY                   = X_NodeAnime_getFinite( dest[ 'skewY' ],   dest[ 'skew'  ], obj.skewY );
	obj.toScaleX                  = X_NodeAnime_getFinite( dest[ 'scaleX' ],  dest[ 'scale' ], obj.scaleX );
	obj.toScaleY                  = X_NodeAnime_getFinite( dest[ 'scaleY' ],  dest[ 'scale' ], obj.scaleY );
	obj.toAlpha                   = X_NodeAnime_getFinite( dest[ 'opacity' ], obj.alpha );
	obj.toScrollX                 = X_NodeAnime_getFinite( dest[ 'scrollX' ], obj.scrollX );
	obj.toScrollY                 = X_NodeAnime_getFinite( dest[ 'scrollY' ], obj.scrollY );

	if( X_Type_isFinite( obj.toX ) && X_Type_isNaN( obj.x ) ) obj.x = obj.fromX = 0;
	if( X_Type_isFinite( obj.toY ) && X_Type_isNaN( obj.y ) ) obj.y = obj.fromY = 0;
	
	if( obj.toRotate && X_Type_isNaN( obj.rotate ) ) obj.rotate = obj.fromRotate = 0;
	if( obj.toSkewX  && X_Type_isNaN( obj.skewX  ) ) obj.skewX  = obj.fromSkewX  = 0;
	if( obj.toSkewY  && X_Type_isNaN( obj.skewY  ) ) obj.skewY  = obj.fromSkewY  = 0;

	obj.duration    = 0 <= duration    && X_Type_isFinite( duration    ) ? duration    : 0;
	obj.lazyRelease = 0 <= lazyRelease && X_Type_isFinite( lazyRelease ) ? lazyRelease : 0;
	obj.easing      = X_Type_isFunction( easing ) ? easing : X_NodeAnime_ease[ easing ] || X_NodeAnime_ease[ 'circular' ];
	obj.inited      = false;
	obj.transform   = ( X_Type_isFinite( obj.x ) || X_Type_isFinite( obj.y ) || obj.lazyRelease ) && X_NodeAnime_hasTransform;
	obj.doScroll    = 0 <= obj.toScrollX || 0 <= obj.toScrollY;
	obj.fallback    = 0;
	obj.altX        = fallback & 8  ? 'right'  : 'left'; 
	obj.altY        = fallback & 16 ? 'bottom' : 'top';
	
	// scale
	if( obj.toScaleX !== 1 || obj.fromScaleX !== 1 || obj.toScaleY !== 1 || obj.fromScaleY !== 1 ){
		sameRate = obj.fromScaleX === obj.fromScaleY && obj.toScaleX === obj.toScaleY;
		
		if( X_NodeAnime_hasTransform ){
			obj.transform = true;
		} else
		if( X_NodeAnime_hasDXTransform && ( fallback & 32 ) ){ // DX Transform
			obj.fallback = 32;
		} else
		if( ( fallback & 4 ) && sameRate ){ // zoom
			obj.fallback = 4;
		} else
		if( ( fallback & 2 ) && sameRate ){ // fontSize
			obj.fallback = 2;
		} else
		if( fallback & 1 ){ // width & height
			obj.fallback = 1;
		};
	};

	// rotate, skew
	if( X_Type_isFinite( obj.rotate ) || X_Type_isFinite( obj.skewX ) || X_Type_isFinite( obj.skewY ) ){
		if( X_NodeAnime_hasTransform ){
			obj.transform = true;
		} else
		if( X_NodeAnime_hasDXTransform && ( fallback & 32 ) ){ // DX Transform
			obj.fallback = 32;
		};
	};

	if( !obj.duration && 6 <= obj.phase ){
		this[ 'stop' ](); // 現在値で停止
	} else {
		if( !obj.phase ){
			list[ list.length ] = this;
			obj.phase = 1;
			obj.uid   = ++X_NodeAnime_uid;
			X_NodeAnime_needsDetection = true;
		} else
		if( obj.phase < 4 ){
			list.splice( list.indexOf( this ), 1 );
			list[ list.length ] = this;
			obj.uid   = ++X_NodeAnime_uid;
			X_NodeAnime_needsDetection = true;
		} else
		if( obj.duration ){
			// リストの先頭にいるため検査不要でアニメーション開始可能 4, 5, 6, 7
			obj.phase = 6;
		} else
		// GPU 転送予約、または transform や opacity の値のみ設定
		if( obj.phase !== 5 ){ // GPU解除待ち ではない -> 4. 6, 7
			obj.phase      = 4; // 強制停止(GPU転送予約)または値のみ更新
			obj.releaseNow = false; // TODO folower がいるため GPU 転送できないケースあり
			X_NodeAnime_needsDetection = true;
		} else {
			obj.phase = 1;
			X_NodeAnime_needsDetection = true;
		};
		
		if( !X_NodeAnime_reserved ){
			X_NodeAnime_reserved = true;
			
			if( X_Node_updateTimerID ){
				if( X_NodeAnime_updateTimerID ) X_NodeAnime_updateTimerID = X_Timer_cancelFrame( X_NodeAnime_updateTimerID );

				X_System[ 'listen' ]( X_EVENT_UPDATED, X_NodeAnime_updateAnimations );
			} else {
				X_System[ 'unlisten' ]( X_EVENT_UPDATED, X_NodeAnime_updateAnimations );
				X_NodeAnime_updateTimerID = X_Timer_requestFrame( X_NodeAnime_updateAnimations );
			};
		};	
	};

	return this;
};

function X_NodeAnime_getFinite( a, b, c ){
	if( a || a === 0 ) return a;
	if( b || b === 0 ) return b;
	if( c || c === 0 ) return c;
	return NaN;
};

/*
 * 1.アニメーション中の要素の停止 ->後続アニメーションの開始
 * 2.アニメーション待機中の要素の停止 -> 後続アニメーションの再調査
 */
/**
 * アニメーションの停止。
 * @alias Node.prototype.stop
 * @return {Node} メソッドチェーン
 */
function X_Node_stop( option ){
	var obj    = this[ '_anime' ],
		list   = X_NodeAnime_QUEUE,
		rm;
	
	if( !obj || !obj.phase ) return this;

	switch( obj.phase ){
		case 6 : // アニメーション開始可能 ??
		case 2 : // 準待機
		case 3 : // アニメーション待機中
			X_NodeAnime_needsDetection = true;
		case 1 :
			rm = true;

		case 4 : // 強制停止(GPU転送予約)
		case 7 : // アニメーション中
			if( option & X_NODE_ANIME_RESET ){
				X_Object_override( obj, X_NodeAnime_DEFAULT );
			}; // TODO 終了値で停止も,,,
			
			// obj.canceled = true;
			
			if( rm ) break; // 1,2,3,6 の場合ここまで
		
			obj.toX       = obj.x;
			obj.toY       = obj.y;
			obj.toRotate  = obj.rotate;
			obj.toSkewX   = obj.skewX;
			obj.toSkewY   = obj.skewY;
			obj.toScaleX  = obj.scaleX;
			obj.toScaleY  = obj.scaleY;
			obj.toAlpha   = obj.alpha;
			obj.toScrollX = obj.scrollX;
			obj.toScrollY = obj.scrollY;

			obj.phase     = 4; // 強制解除
			X_NodeAnime_needsDetection = true;
			
		case 5 : // GPU解除待ち
			obj.releaseNow = !( option & X_NODE_ANIME_STAY_GPU );
			break;
	};

	if( rm ){
		list.splice( list.indexOf( this ), 1 );
		obj.phase = 0;	
	};

	return this;
};
/*
 * remove(append swap 等でない部的に呼ばれている場合も), kill 時に
 */
function X_NodeAnime_stopNow( xnode ){
	var obj   = xnode[ '_anime' ],
		flags = xnode[ '_flags' ],
		list  = X_NodeAnime_QUEUE,
		skipUpdate;
	
	// if( !obj || !obj.phase ) return; 呼び出し側で検証済

	X_NodeAnime_needsDetection = true;
	list.splice( list.indexOf( xnode ), 1 );
	obj.phase = 0;

	// この部分 startUpdate へ?
	if( flags & ~X_Node_BitMask_RESET_GPU ){
		skipUpdate = flags & X_NodeFlags_GPU_RESERVED;
		( flags & X_NodeFlags_GPU_RELEASE_RESERVED ) || X_NodeAnime_updatePosition( xnode, obj, 0.5, false );
		skipUpdate || ( xnode[ '_rawObject' ].style.cssText = X_Node_CSS_objToCssText( xnode ) );
		xnode[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
	};
};

/*
 * 1. 新規アニメーションが現在アニメーション中の要素の親か子であればアニメーションを待機
 */
function X_NodeAnime_detectWaitAnimation( xnode, duration, isTest ){
	var list = X_NodeAnime_QUEUE,
		i    = 0, _xnode, obj;
	
	for( ; _xnode = list[ i ]; ++i ){
		if( _xnode === xnode ) break;
		
		// アニメーションの優先度はリストにいる順
		// まず先行する後続待機要素の中に、親子関係のものがいないか？探す
		if( _xnode[ '_anime' ].phase <= 3 ){
			if( xnode[ 'contains' ]( _xnode ) || _xnode[ 'contains' ]( xnode ) ){ // 祖先か？見た方が早そう
				// -> いる、このような要素が複数いる場合、誰に後続すればいいか？判然としないため、準待機フラグを立てる
				return 2;
			};
		};
	};

	// -> いない、アニメーション中(開始可能も)の要素の中に、親子関係のものがいないか？探す
	//           -> いる、待機状態へ
	//           -> いない、アニメーションが可能
	for( i = 0; _xnode = list[ i ]; ++i ){
		if( _xnode === xnode ) break;
		obj = _xnode[ '_anime' ];
		if( 6 <= obj.phase ){
			if( xnode[ 'contains' ]( _xnode ) || _xnode[ 'contains' ]( xnode ) ){
				return isTest ? 3 : _xnode;
			};
		};
	};
	// アニメーション可能
	return duration ? 6 : 4; // duration がない場合は、アニメーション強制停止へ進みそこから GPU 解除待ちへ
};

function X_NodeAnime_updateAnimations( e ){
	var list = X_NodeAnime_QUEUE,
		now  = X_Timer_now(),
		c    = false,
		i, xnode, obj, _xnode,
		rm, progress, easing, lazy;
	
	if( X_NodeAnime_needsDetection ){
		X_NodeAnime_needsDetection = false;
		
		//
		list.sort( X_NodeAnime_sortAnimationNode );
		
		for( i = 0; xnode = list[ i ]; ++i ){
			obj = xnode[ '_anime' ];
			
			if( obj.phase <= 3 ){
				if( !X_Type_isNumber( obj.phase = _xnode = X_NodeAnime_detectWaitAnimation( xnode, obj.duration ) ) ){
					_xnode[ '_anime' ].follower = true;
					obj.phase = 3; // 後続待機
				};
			} else {
				obj.follower = false;
			};
		};
	};
	
	for( i = list.length; i; ){
		rm    = false;
		xnode = list[ --i ];
		obj   = xnode[ '_anime' ];

		switch( obj.phase ){
			case 7 : // アニメーション中
				if( now < obj.toTime ){
					obj.progress = progress = ( now - obj.fromTime ) / obj.duration;
					easing      = obj.easing( progress );
					obj.x       = ( obj.toX       - obj.fromX       ) * easing + obj.fromX;
					obj.y       = ( obj.toY       - obj.fromY       ) * easing + obj.fromY;
					obj.rotate  = ( obj.toRotate  - obj.fromRotate  ) * easing + obj.fromRotate;
					obj.skewX   = ( obj.toSkewX   - obj.fromSkewX   ) * easing + obj.fromSkewX;
					obj.skewY   = ( obj.toSkewY   - obj.fromSkewY   ) * easing + obj.fromSkewY;
					obj.scaleX  = ( obj.toScaleX  - obj.fromScaleX  ) * easing + obj.fromScaleX;
					obj.scaleY  = ( obj.toScaleY  - obj.fromScaleY  ) * easing + obj.fromScaleY;
					obj.alpha   = ( obj.toAlpha   - obj.fromAlpha   ) * easing + obj.fromAlpha;
					obj.scrollX = ( obj.toScrollX - obj.fromScrollX ) * easing + obj.fromScrollX;
					obj.scrollY = ( obj.toScrollY - obj.fromScrollY ) * easing + obj.fromScrollY;
					X_NodeAnime_updatePosition( xnode, obj, progress, true );
					c = true;
					break;
				};
				// アニメーション終了
				xnode[ 'asyncDispatch' ]( X_EVENT_ANIME_END );
				
			case 4 : // 強制停止(GPU転送予約)または transform や opacity の値のみ設定
				lazy = !obj.follower && !obj.releaseNow && obj.lazyRelease;
				X_NodeAnime_updatePosition( xnode, obj, 1, !!lazy );

				//if( obj.canceled ){
				//	xnode[ 'asyncDispatch' ]( X_EVENT_CANCELED );
				//} else {
					
				//};
				
				if( lazy ){
					console.log( 'アニメーション終了(' + obj.phase + ') -> GPU 解除待機 ' + lazy );
					obj.toTime = now + lazy;
					obj.phase = 5; // GPU解除待ち
					c = true;
				} else {
					console.log( 'アニメーション終了(' + obj.phase + ') -> ' );
					rm = true;
				};
				break;

			case 6 : // アニメーション開始可能
				obj.fromTime = now;
				obj.toTime   = now + obj.duration;
				obj.phase    = 7; // アニメーション中
				obj.progress = 0;			
				xnode[ 'asyncDispatch' ]( X_EVENT_ANIME_START );
				c = true;
				//obj.canceled  = false;
				( !obj.inited || X_NodeAnime_translateZ ) && X_NodeAnime_updatePosition( xnode, obj, 0, true );
				break;
			
			case 5 : // GPU解除待ち
				if( obj.toTime <= now || obj.follower || obj.releaseNow ){
					X_NodeAnime_translateZ && X_NodeAnime_updatePosition( xnode, obj, 1, false );
					rm = true;
				} else {
					c = true;
				};
				break;
			
			default : // 2 or 3
				// 待機状態でも親要素が GPU 化していなければ、開始値をセットすることは可能
				obj.inited || X_NodeAnime_updatePosition( xnode, obj, 0, false );
				obj.inited = true;
				break;
		};
		
		obj.releaseNow = false;
		
		if( rm ){
			X_NodeAnime_translateZ && xnode[ 'asyncDispatch' ]( X_EVENT_GPU_RELEASED );
			// 後続のアニメーションがある場合
			if( obj.follower ) X_NodeAnime_needsDetection = c = true;
			list.splice( i, 1 );
			obj.phase = 0;
		};
	};
	
	//c && console.log( 'anime... ' + X_Node_updateTimerID );
	
	if( X_NodeAnime_reserved = c ){
		if( X_Node_updateTimerID ){
			// scrollbox では X_System X_EVENT_UPDATED は不可。。。
			!e || e.type !== X_EVENT_UPDATED ?
				X_System[ 'listen' ]( X_EVENT_UPDATED, X_NodeAnime_updateAnimations ) :
				X_NodeAnime_updateTimerID && X_Timer_cancelFrame( X_NodeAnime_updateTimerID );
			X_NodeAnime_updateTimerID = 0;
		} else {
			X_System[ 'unlisten' ]( X_EVENT_UPDATED, X_NodeAnime_updateAnimations );
			X_NodeAnime_updateTimerID = X_Timer_requestFrame( X_NodeAnime_updateAnimations );
		};
	} else {
		X_System[ 'unlisten' ]( X_EVENT_UPDATED, X_NodeAnime_updateAnimations );
		X_NodeAnime_updateTimerID = 0;
	};
};

/*
 * アニメーション開始、アニメーション中、強制停止(GPU転送予約)、GPU解除待ち の要素をリストの先頭に
 */
function X_NodeAnime_sortAnimationNode( xnode1, xnode2 ){
	var a = 4 <= xnode1[ '_anime' ].phase,
		b = 4 <= xnode2[ '_anime' ].phase;
	
    if( ( a && b ) && ( !a && !b ) ){ // Chrome のみ
        return xnode1[ '_anime' ].uid - xnode2[ '_anime' ].uid;
    };
    return a ? -1 : 1;
};

function X_NodeAnime_updatePosition( xnode, obj, ratio, useGPU ){
	var str = '',
		x, y, rotate, skewX, skewY, scaleX, scaleY, alpha,
		scrollX, scrollY;
	
	if( ratio === 1 ){
		x      = obj.x = obj.toX;
		y      = obj.y = obj.toY;
		rotate = X_Node_CSS_ieMathRangeFix( obj.rotate = obj.toRotate );
		skewX  = X_Node_CSS_ieMathRangeFix( obj.skewX  = obj.toSkewX );
		skewY  = X_Node_CSS_ieMathRangeFix( obj.skewY  = obj.toSkewY );
		scaleX = obj.scaleX = obj.toScaleX;
		scaleY = obj.scaleY = obj.toScaleY;
		alpha  = obj.alpha  = obj.toAlpha;
		obj.scrollX = obj.toScrollX;
		obj.scrollY = obj.toScrollY;
	} else {
		x      = obj.x;
		y      = obj.y;
		rotate = X_Node_CSS_ieMathRangeFix( obj.rotate );
		skewX  = X_Node_CSS_ieMathRangeFix( obj.skewX );
		skewY  = X_Node_CSS_ieMathRangeFix( obj.skewY );
		scaleX = obj.scaleX;
		scaleY = obj.scaleY;
		alpha  = obj.alpha;
	};
	
	//console.log( 'updatePosition x:' + x + ' gpu:' + !!useGPU );
	if( obj.transform ){
		if( ( x === x || y === y ) && ( x !== 0 || y !== 0 ) ){
			if( X_UA.WebKit && ( X_UA.Win32 || X_UA.Win64 ) ){
                // http://shinimae.hatenablog.com/entry/2016/01/13/151748
                // 本来ベンダープレフィックスはプロパティ名にのみ付けますが、Windows版Safariの場合はプロパティの値にもつけましょう。
				str = ' -webkit-translate(' + ( x | 0 ) + 'px,' + ( y | 0 ) + 'px)';
			} else {
				str = ' translate(' + ( x | 0 ) + 'px,' + ( y | 0 ) + 'px)';
			};
		};
		if( rotate < 0 || 0 < rotate ) str += ' rotate(' + rotate + 'deg)'; // opera は　rad?
		if( skewX  < 0 || 0 < skewX  ) str += ' skewX('  + skewX  + 'deg)';
		if( skewY  < 0 || 0 < skewY  ) str += ' skewY('  + skewY  + 'deg)';
		if( scaleX < 1 || 1 < scaleX ) str += ' scaleX(' + scaleX + ')';
		if( scaleY < 1 || 1 < scaleY ) str += ' scaleY(' + scaleY + ')';

		xnode[ 'css' ]( 'transform', ( str ? str.substr( 1 ) : '' ) + ( useGPU ? X_NodeAnime_translateZ : '' ) );
		console.log( xnode.className() + ' ' + str + ' ' + (xnode[ '_flags' ] & X_NodeFlags_DIRTY_CSS) );
		
		if( X_NodeAnime_translateZ ){
			if( useGPU ){
				if( xnode[ '_flags' ] & X_NodeFlags_GPU_RELEASE_RESERVED ){
					xnode[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
					xnode[ '_flags' ] |= X_NodeFlags_GPU_NOW;
				} else
				if( !( xnode[ '_flags' ] & X_NodeFlags_GPU_NOW ) ){
					xnode[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
					xnode[ '_flags' ] |= X_NodeFlags_GPU_RESERVED;
				};
			} else {
				if( xnode[ '_flags' ] & X_NodeFlags_GPU_NOW ){
					xnode[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
					xnode[ '_flags' ] |= X_NodeFlags_GPU_RELEASE_RESERVED;
				} else
				if( xnode[ '_flags' ] & X_NodeFlags_GPU_RESERVED ){
					xnode[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
				};
			};		
		};		
	} else
	if( obj.fallback === 32 ){
		xnode[ 'css' ]( 'dxtransform', [ x | 0, y | 0, rotate || 0, skewX || 0, skewY || 0, scaleX, scaleY, obj.altX, obj.altY ] );
	} else {
		x === x && xnode[ 'css' ]( obj.altX, ( x | 0 ) + 'px' );
		y === y && xnode[ 'css' ]( obj.altY, ( y | 0 ) + 'px' );
		
		switch( obj.fallback ){
			case 4 :
				xnode[ 'css' ]( 'zoom', scaleX );
				break;
			case 2 :
				xnode[ 'css' ]( 'fontSize', scaleX + 'em' );
				break;
			case 1 :
				
				break;
		};
	};
	
	if( obj.doScroll && xnode[ '_rawObject' ] ){
		console.log( 'ok ' + ratio );
		xnode[ '_rawObject' ].scrollLeft = obj.scrollX | 0;
		xnode[ '_rawObject' ].scrollTop  = obj.scrollY | 0;
		//X_Node_reserveUpdate();
	};
	
	alpha === alpha && xnode[ 'css' ]( 'opacity', alpha );
};


var
	X_NodeAnime_ease = {
		'quadratic' : function (k) {
				return k * ( 2 - k );
				/*{
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}*/
		},
		'circular' : function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			/*style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}*/
		},
		'back' : function (k) {
				return --k * k * ( 5 * k + 4 ) + 1;
			/*style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}*/
		},
		'bounce' : function (k, X) {
				X = 7.5625;
				if ( k < ( 1 / 2.75 ) ) {
					return X * k * k;
				} else
				if ( k < ( 2 / 2.75 ) ) {
					return X * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else
				if ( k < ( 2.5 / 2.75 ) ) {
					return X * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return X * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			/*style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}*/
		},
		'elastic' : function (k) {
				return k === 0 ? 0 : k === 1 ? 1 : ( 0.4 * Math.pow( 2, - 10 * k ) * Math.sin( ( k - 0.055 ) * 28.56 ) + 1 );
			/*style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			} */
		}
	};
