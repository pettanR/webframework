
var X_Event_Rename    = {},
	X_Event_RenameTo  = {},
	
	// TODO IFRAMEload, SCRIPTload, LINKload raw.readyState !== 'complete' && raw.readyState !== 'loaded' && this.dispatch( 'load' )
	
	
	X_Event_proxy     = {
		
		'IFRAMEload' : function( eventDispatcher ){
			eventDispatcher[ 'listen' ]( 'readystatechange', X_Event_proxy.IFRAMEload_proxy );
		},
		
			IFRAMEload_proxy : function( e ){
				var raw = this[ '_rawObject' ];
				
				return ( raw.readyState === 'complete' || raw.readyState === 'loaded' ) ?
					 	X_EventDispatcher_actualHandleEvent( 'load' ) : X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
			},
		
		// TODO  focusin focusout
		
		// X_UA[ 'Opera' ]
		'contextmenu' : function( eventDispatcher ){
			eventDispatcher[ 'listen' ]( 'mousedown', contextmenu_proxy );
		},
		
			contextmenu_proxy : function( e ){
				return e.button === 2 ? this[ 'dispatch' ]( 'contextmenu' ) : X_CALLBACK_NONE;
			}
	},
	
	X_Event_toPointer = !X_UA_HID.POINTER && ( X_UA_HID.TOUCH ?
		{
			'touchstart'  : 'pointerdown',
			'mousedown'   : 'pointerdown',
			'touchend'    : 'pointerup', 
			'mouseup'     : 'pointerup',
			'touchmove'   : 'pointermove',
			'mousemove'   : 'pointermove',
			'touchleave'  : 'pointerleave',
			'mouseout'    : 'pointerout',
			'mouseleave'  : 'pointerleave',
			'touchcancel' : 'pointercancel',
			'contextmenu' : 'contextmenu',
			'dbclick'     : 'dbclick',
			'click'       : 'click'
		} :
		{
			'mousedown'   : 'pointerdown',
			'mouseup'     : 'pointerup',
			'mousemove'   : 'pointermove',
			'mouseout'    : 'pointerout',
			'mouseleave'  : 'pointerleave',
			'contextmenu' : 'contextmenu',
			'dbclick'     : 'dbclick',
			'click'       : 'click'
		});

var // 内部イベント
	X_EVENT_PRE_INIT               =  5, // X_LISTENERS_KILL_RESERVED に　+1 した値から開始。
	X_EVENT_XTREE_READY            =  6,
	X_EVENT_INIT                   =  7,

	// 公開イベント
	X_EVENT_XDOM_READY             =  8,
	
	X_EVENT_COMPLETE               =  9,
	X_EVENT_READY                  = 10,
	X_EVENT_SUCCESS                = 11,
	X_EVENT_ERROR                  = 12,
	X_EVENT_PROGRESS               = 13,
	X_EVENT_BEFORE_CANCEL          = 14,
	X_EVENT_CANCELED               = 15,
	X_EVENT_TIMEOUT                = 16,

	X_EVENT_BEFORE_KILL_INSTANCE   = 17,
	X_EVENT_KILL_INSTANCE_CANCELED = 18,
	X_EVENT_KILL_INSTANCE          = 19,
	
	X_EVENT_VIEW_ACTIVATE          = 20,
	X_EVENT_VIEW_DEACTIVATE        = 21,
	X_EVENT_VIEW_RESIZED           = 22,
	X_EVENT_VIEW_TURNED            = 23,

	X_EVENT_BASE_FONT_RESIZED      = 24,

	X_EVENT_BEFORE_UPDATE          = 25,
	X_EVENT_UPDATED                = 26,
	X_EVENT_AFTER_UPDATE           = 27,

	X_EVENT_HASH_CHANGED           = 28,


	X_EVENT_BEFORE_UNLOAD          = 29,
	X_EVENT_UNLOAD                 = 30,
	
	X_EVENT_BACKEND_READY          = 31,
	X_EVENT_BACKEND_NONE           = 32,
	X_EVENT_BACKEND_RESEARCH       = 33,
	X_EVENT_BACKEND_CHANGED        = 34,
	
	X_EVENT_ANIME_BEFORE_START     = 35,
	X_EVENT_ANIME_START            = 36,
	X_EVENT_ANIME                  = 37,
	X_EVENT_ANIME_END              = 38,
	X_EVENT_ANIME_BEFORE_STOP      = 39,
	X_EVENT_ANIME_STOP             = 40,
	
	X_EVENT_GPU_RELEASED           = 41,

	X_EVENT_MEDIA_PLAYING          = 42,
	X_EVENT_MEDIA_BEFORE_LOOP      = 43,
	X_EVENT_MEDIA_LOOPED           = 44,
	X_EVENT_MEDIA_PAUSED           = 45,
	X_EVENT_MEDIA_ENDED            = 46,
	X_EVENT_MEDIA_WAITING          = 47,
	X_EVENT_MEDIA_SEEKING          = 48,
	X_EVENT_MEDIA_WAIT_FOR_TOUCH   = 49,
	
	X_EVENT_NEED_AUTH              = 50,
	
	X_EVENT_DEBUG                  = 51,
	
	X_Event_last                   = 51;

// in_page_jump
// on_screen_keyboard_show
// on_screen_keyboard_hide

/**
 * フレームワーク内で定義されたイベント。
 * @namespace X.Event
 */
X[ 'Event' ] = /** @lends X.Event */
{
	/**
	 * X.ViewPort で発生する。DomContentLoaded に相当。document.body.innerHTML の内容から X.Node ツリーの作成が完了した。
	 * このイベント以降、X.Doc.create(), X.Doc.find() 等が可能になる。
	 */
	'XDOM_READY'             : X_EVENT_XDOM_READY,
	
	'COMPLETE'               : X_EVENT_COMPLETE,
	'READY'                  : X_EVENT_READY,
	'SUCCESS'                : X_EVENT_SUCCESS,
	'ERROR'                  : X_EVENT_ERROR,
	'PROGRESS'               : X_EVENT_PROGRESS,
	'BEFORE_CANCEL'          : X_EVENT_BEFORE_CANCEL,
	'CANCELED'               : X_EVENT_CANCELED,
	'TIMEOUT'                : X_EVENT_TIMEOUT,

	/**
	 * X.EventDispatcher インスタンスを kill() すると発生。キャンセル可能。
	 */	
	'BEFORE_KILL_INSTANCE'   : X_EVENT_BEFORE_KILL_INSTANCE,
	/**
	 * X.EventDispatcher インスタンスの kill() がキャンセルされた場合に発生。
	 */	
	'KILL_INSTANCE_CANCELED' : X_EVENT_KILL_INSTANCE_CANCELED,
	/**
	 * X.EventDispatcher インスタンスの kill が確定し、kill プロセスの前に発生。
	 */
	'KILL_INSTANCE'          : X_EVENT_KILL_INSTANCE,

	/**
	 * X.ViewPort で発生する。'visibilitychange', 'pageshow', window.onfocus を検出している。
	 */
	'VIEW_ACTIVATE'          : X_EVENT_VIEW_ACTIVATE,
	/**
	 * X.ViewPort で発生する。'visibilitychange', 'pagehide', window.onblur を検出している。
	 */
	'VIEW_DEACTIVATE'        : X_EVENT_VIEW_DEACTIVATE,
	/**
	 * X.ViewPort で発生する。
	 */
	'VIEW_RESIZED'           : X_EVENT_VIEW_RESIZED,
	/**
	 * X.ViewPort で発生する。
	 */
	'VIEW_TURNED'            : X_EVENT_VIEW_TURNED,
	/**
	 * X.ViewPort で発生する。ベースフォントサイズが変化すると発生する。body 直下の隠し要素のテキストサイズの変化で検出している。
	 */
	'BASE_FONT_RESIZED'      : X_EVENT_BASE_FONT_RESIZED,

	/**
	 * X_System で発生する。このイベントで要素のサイズを取得すると無限ループに！
	 */
	'BEFORE_UPDATE'          : X_EVENT_BEFORE_UPDATE,
	/**
	 * X_System で発生する。X.Node ツリーへの変更を Real DOM に反映した。
	 */
	'UPDATED'                : X_EVENT_UPDATED,
	
	/**
	 * X.ViewPort で発生する。X.Node ツリーへの変更を Real DOM に反映した。このイベントは lazyDispatch している。
	 */
	'AFTER_UPDATE'           : X_EVENT_AFTER_UPDATE,

	'HASH_CHANGED'           : X_EVENT_HASH_CHANGED,

	/**
	 * X.ViewPort で発生する。
	 */
	'BEFORE_UNLOAD'          : X_EVENT_BEFORE_UNLOAD,
	/**
	 * X.ViewPort で発生する。
	 */
	'UNLOAD'                 : X_EVENT_UNLOAD,
	
	'BACKEND_READY'          : X_EVENT_BACKEND_READY,
	'BACKEND_NONE'           : X_EVENT_BACKEND_NONE,
	'BACKEND_RESEARCH'       : X_EVENT_BACKEND_RESEARCH,
	'BACKEND_CHANGED'        : X_EVENT_BACKEND_CHANGED,
	
	'ANIME_BEFORE_START'     : X_EVENT_ANIME_BEFORE_START,
	'ANIME_START'            : X_EVENT_ANIME_START,
	'ANIME'                  : X_EVENT_ANIME,
	'ANIME_END'              : X_EVENT_ANIME_END,
	/**
	 * xnode.stop() のみ、指定時間による停止では呼ばれない
	 */
	'ANIME_BEFORE_STOP'      : X_EVENT_ANIME_BEFORE_STOP,
	'ANIME_STOP'             : X_EVENT_ANIME_STOP,
	
	'GPU_RELEASED'           : X_EVENT_GPU_RELEASED,

	'MEDIA_PLAYING'          : X_EVENT_MEDIA_PLAYING,
	'MEDIA_BEFORE_LOOP'      : X_EVENT_MEDIA_BEFORE_LOOP, // cancelable
	'MEDIA_LOOPED'           : X_EVENT_MEDIA_LOOPED,
	'MEDIA_PAUSED'           : X_EVENT_MEDIA_PAUSED,
	'MEDIA_ENDED'            : X_EVENT_MEDIA_ENDED,
	'MEDIA_WAITING'          : X_EVENT_MEDIA_WAITING,
	'MEDIA_SEEKING'          : X_EVENT_MEDIA_SEEKING,
	'MEDIA_WAIT_FOR_TOUCH'   : X_EVENT_MEDIA_WAIT_FOR_TOUCH,
	
	'NEED_AUTH'              : X_EVENT_NEED_AUTH,
	
	'DEBUG'                  : X_EVENT_DEBUG
};

X_TEMP.onSystemReady.push(
	function(){
		var k, name, i;
		for( k in X_Event_Rename ){
			//if( X_EMPTY_OBJECT[ k ] ) continue;
			name = X_Event_Rename[ k ];
			if( X_Type_isArray( name ) ){
				for( i = name.length; i; ){
					X_Event_RenameTo[ name[ --i ] ] = k;
				};
			} else {
				X_Event_RenameTo[ name ] = k;
			};
		};
	});
