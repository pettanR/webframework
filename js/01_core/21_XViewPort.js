
var X_ViewPort_readyState,
	X_ViewPort_active = ( window.parent === window ) || !window.parent, // parent は frameに読み込まれた場合のieのerror回避	
	X_ViewPort_activeTimerID,
	X_ViewPort_rootElement,
	X_ViewPort_lock,
	X_ViewPort_width,
	X_ViewPort_height,
	X_ViewPort_scrollX = 0,
	X_ViewPort_scrollY = 0,
	X_ViewPort_baseFontSize,
	X_ViewPort_vScrollbarSize,
	X_ViewPort_hScrollbarSize,
	
	X_ViewPort_useDetectionLoop = ( X_UA.Trident || X_UA.TridentMobile ) < 9 || ( X_UA.SafariMobile || X_UA.iOSWebView ),
	X_ViewPort_detectFontSize = !X_ViewPort_useDetectionLoop && function(){
			var size = X_Node_fontSizeNode[ '_rawObject' ].offsetHeight;
			if( X_ViewPort_baseFontSize !== size ){
				X_ViewPort_baseFontSize = size;
				X_ViewPort_baseFontSize && X_ViewPort[ 'asyncDispatch' ]( X_EVENT_BASE_FONT_RESIZED );
			};
	},

	X_ViewPort_orientationFlag,	
	X_ViewPort_orientationchange = window.orientation !== undefined && function( e ){
		X_ViewPort_orientationFlag = true;
		!X_UA.Android && X_ViewPort_resize();
		//console.log( '-- orientationchange : ' + X[ 'ViewPort' ][ 'getSize' ][ 0 ] + ' ' + X[ 'ViewPort' ][ 'getSize' ][ 1 ] );
	},
	
	X_ViewPort_document = X_EventDispatcher( document ),

X_ViewPort = X_Class_override(
	X_EventDispatcher( window ),
	{

		'handleEvent' : function( e ){
			var href, active = false, elm, xnode;
			
			switch( e.type ){
				case 'beforeunload' :
					// ie では a href='javascript' な要素でも beforeunload が起こる
					href = e.target && e.target[ 'attr' ] && e.target[ 'attr' ]( 'href' );
					if( X_Type_isString( href ) && !href.toLowerCase().indexOf( 'javascript:' ) ) return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
					
					return X_ViewPort[ 'dispatch' ]( X_EVENT_BEFORE_UNLOAD );
					
				case 'unload' :
					//https://developer.mozilla.org/ja/docs/Web/JavaScript/A_re-introduction_to_JavaScript
					//Firefox 1.5 の bfcache が無効になりますので、他に理由がない限り Firefox では unload リスナを登録するべきではないことに注意してください。
					X_ViewPort[ 'dispatch' ]( X_EVENT_UNLOAD );
					//alert('unload');
					X_ViewPort_document[ 'kill' ]();
					X_ViewPort[ 'kill' ]();
					//X_System[ 'dispatch' ]( X_EVENT_SHUT_DOWN );
					break;

				case 'visibilitychange' :
					console.log( e.type + ':' + document[ 'hidden' ] );
					X_ViewPort[ 'dispatch' ]( ( X_ViewPort_active = !document[ 'hidden' ] ) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE );
					break;
				case 'msvisibilitychange' :
					console.log( e.type + ':' + document[ 'msHidden' ] );
					X_ViewPort[ 'dispatch' ]( ( X_ViewPort_active = !document[ 'msHidden' ] ) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE );
					break;
				case 'mozvisibilitychange' :
					console.log( e.type + ':' + document[ 'mozHidden' ] );
					X_ViewPort[ 'dispatch' ]( ( X_ViewPort_active = !document[ 'mozHidden' ] ) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE );
					break;
				case 'webkitvisibilitychange' :
					console.log( e.type + ':' + document[ 'webkitHidden' ] );
					X_ViewPort[ 'dispatch' ]( ( X_ViewPort_active = !document[ 'webkitHidden' ] ) ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE );
					break;
	
				case 'blur' :
				case 'focusout' :
					if( ( X_UA.Trident || X_UA.TridentMobile ) < 9 && ( elm = FocusUtility_getFocusedElement() ) ){
						xnode = X_Node_getXNode( elm );
						if( xnode ){
							xnode[ 'listenOnce' ]( [ 'focus', 'blur' ], X_ViewPort_detectFocusForIE );
							//break;
						};
						if( X_ViewPort_activeTimerID ){
							X_Timer_remove( X_ViewPort_activeTimerID );
						};
						X_ViewPort_activeTimerID = X_Timer_once( 16, X_ViewPort_changeFocus );
						return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
					};
					// 他の要素のfocusout がバブルアップしてきたもの
					if( e.target !== X_ViewPort_document ) break;
				case 'pagehide' :		
					active = true;
				case 'focus' :
				case 'pageshow' :
				case 'focusin' :
					if( X_ViewPort_active === active ){
						X_ViewPort_active = !active;
						// console.log( e.type + ':' + X_ViewPort_active );
						X_ViewPort[ 'dispatch' ]( active ? X_EVENT_VIEW_DEACTIVATE : X_EVENT_VIEW_ACTIVATE );
					};
					break;
			};
		}
	}
);

function X_ViewPort_detectFocusForIE( e ){
	//console.log( 'iefix! ' + e.type + ':' + this.attr( 'tag' ) + ' isActive?:' + ( this[ '_rawObject' ] === document.activeElement ) );
	var elmActive = FocusUtility_getFocusedElement();
	X_ViewPort_active = e.type === 'focus';

	if( elmActive && this[ '_rawObject' ] !== elmActive ){
		this[ 'unlisten' ]( X_ViewPort_active ? 'blur' : 'focus', X_ViewPort_detectFocusForIE );
		console.log( '>>>>>> activeElement 取得 不一致 ' + this._tag );
	} else
	if( !elmActive ){
		//console.log( '******** activeElement 取得のエラー' );
	} else if( elmActive ){
		//console.log( '>>>>>> activeElement 取得' );
	};

	if( X_ViewPort_activeTimerID ){
		X_Timer_remove( X_ViewPort_activeTimerID );
	};
	X_ViewPort_activeTimerID = X_Timer_once( 16, X_ViewPort_changeFocus );
	
	return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
};

function X_ViewPort_changeFocus(){
	X_ViewPort[ 'dispatch' ]( X_ViewPort_active ? X_EVENT_VIEW_ACTIVATE : X_EVENT_VIEW_DEACTIVATE );
	X_ViewPort_activeTimerID = 0;
};


/**
 * 
 * @alias X.ViewPort.getScrollPosition
 */
var X_ViewPort_getScrollPosition =
		window.pageXOffset !== undefined ?
			( function(){
				X_Node_updateTimerID && X_Node_startUpdate();
				return[ X_ViewPort_scrollX = window.pageXOffset, X_ViewPort_scrollY = window.pageYOffset ];
			} ) :
		window.scrollLeft  !== undefined ?
			( function(){
				X_Node_updateTimerID && X_Node_startUpdate();
				return[ X_ViewPort_scrollX = window.scrollLeft, X_ViewPort_scrollY = window.scrollTop ];
			} ) :
			( function(){
				X_Node_updateTimerID && X_Node_startUpdate();
				// body は Safari2-
				return[ X_ViewPort_scrollX = X_ViewPort_rootElement.scrollLeft || X_elmBody.scrollLeft, X_ViewPort_scrollY = X_ViewPort_rootElement.scrollTop || X_elmBody.scrollTop ];
			} );

// TODO EventDispatcherProxy
/**
 * window に相当する ViewPort 情報を提供するオブジェクト。
 * @namespace X.ViewPort
 * @alias X.ViewPort
 */
X[ 'ViewPort' ] = {
	/**
	 * 
	 * @alias X.ViewPort.listen
	 */
	'listen' : function( type, arg1, arg2, arg3 ){
		var f;
		
		if( type <= X_ViewPort_readyState ){
			/*
			 * X_EVENT_XDOM_READY 以後に listen した場合の対策
			 */
			X_ViewPort[ 'asyncDispatch' ]( type );
		};
		
		f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		if( !f.cbKind ){
			X_ViewPort[ 'listen' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort[ 'listen' ]( type, this, f.func, f.supplement );
		} else {
			X_ViewPort[ 'listen' ]( type, arg1, arg2, arg3 );
		};
		return X[ 'ViewPort' ];
	},
	
	/**
	 * 
	 * @alias X.ViewPort.listenOnce
	 */
	'listenOnce' : function( type, arg1, arg2, arg3 ){
		var f;
		
		if( type <= X_ViewPort_readyState ){
			/*
			 * X.Event.XDOM_READY 以後に listen した場合の対策
			 */
			X_ViewPort[ 'asyncDispatch' ]( type );
		};
		
		f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		if( !f.cbKind ){
			X_ViewPort[ 'listenOnce' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort[ 'listenOnce' ]( type, this, f.func, f.supplement );
		} else {
			X_ViewPort[ 'listenOnce' ]( type, arg1, arg2, arg3 );
		};
		return X[ 'ViewPort' ];
	},
	
	/**
	 * 
	 * @alias X.ViewPort.unlisten
	 */
	'unlisten' : function( type, arg1, arg2, arg3 ){
		var f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		
		if( !f.cbKind ){
			X_ViewPort[ 'unlisten' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort[ 'unlisten' ]( type, this, f.func, f.supplement );
		} else {
			X_ViewPort[ 'unlisten' ]( type, arg1, arg2, arg3 );
		};
		return X[ 'ViewPort' ];
	},
	
	/**
	 * 
	 * @alias X.ViewPort.listening
	 */
	'listening' : function( type, arg1, arg2, arg3 ){
		var f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		
		if( !f.cbKind ){
			return X_ViewPort[ 'listening' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			return X_ViewPort[ 'listening' ]( type, this, f.func, f.supplement );
		};
		return X_ViewPort[ 'listening' ]( type, arg1, arg2, arg3 );
	},

	/**
	 * hammer のテストファイルだけが使用
	 * @alias X.ViewPort.asyncDispatch
	 */
	'asyncDispatch' : function(){
		return X_ViewPort[ 'asyncDispatch' ].apply( X_ViewPort, arguments );
	},
	
	'getPointerPosition' : function(){
		
	},
	
	/* 要素が視界に入った  http://remysharp.com/2009/01/26/element-in-view-event-plugin/
	 * TODO -> X_Node.call('inView')
	 */
	'inView' : function( elm ){
		
	},
	
	/**
	 * 
	 * @alias X.ViewPort.getSize
	 */
	'getSize' : function(){
		return [ X_ViewPort_width, X_ViewPort_height ];
	},
//https://developer.mozilla.org/en-US/docs/Web/API/Element.getBoundingClientRect
//use window.pageXOffset and window.pageYOffset instead of window.scrollX and window.scrollY
//(((t = document.documentElement) || (t = X_elmBody.parentNode)) && typeof t.ScrollLeft == 'number' ? t : X_elmBody).ScrollLeft;
//(((t = document.documentElement) || (t = X_elmBody.parentNode)) && typeof t.ScrollTop == 'number' ? t : X_elmBody).ScrollTop
	
	// TODO X.Doc へ
	/**
	 * @alias X.ViewPort.getDocumentSize
	 */
	'getDocumentSize' : function(){
		// Opera は互換モードでは document.body.scrollHeight、標準モードでは document.documentElement.scrollHeight でページの高さが取れる。と思ってたんだけど、例外があった。
		// http://orera.g.hatena.ne.jp/edvakf/20100515/1273908051
	//http://onozaty.hatenablog.com/entry/20060803/p1
	// Safari2.0.4では標準・互換どちらも document.body
	// http://hisasann.com/housetect/2008/08/jqueryheightwidthopera95.html このdocument.body[ 'client' + name ]はおそらくOpera9.5未満のバージョンで有効なんじゃないかな？
		
		X_Node_updateTimerID && X_Node_startUpdate();
		/*( X_UA.Presto || X_UA.PrestoMobile ) ?
			( document.documentElement && document.documentElement.clientWidth ?
				new Function( 'return[document.documentElement.clientWidth,document.documentElement.clientHeight]' ) :
				new Function( 'return[X_elmBody.clientWidth,X_elmBody.clientHeight]' )
			) :*/			
		return [
			X_ViewPort_rootElement.scrollWidth  || X_ViewPort_rootElement.offsetWidth,
			X_ViewPort_rootElement.scrollHeight || X_ViewPort_rootElement.offsetHeight
		];
	},

	'getScrollPosition' : X_ViewPort_getScrollPosition,

	/**
	 * 
	 * @alias X.ViewPort.getScrollbarSize
	 */
	'getScrollbarSize' : function(){
		return [ X_ViewPort_vScrollbarSize, X_ViewPort_hScrollbarSize ];	
	},
	
	/**
	 * 
	 * @alias X.ViewPort.getBaseFontSize
	 */
	'getBaseFontSize' : function(){
		if( X_Node_updateTimerID ){
			X_Node_startUpdate();
			return X_ViewPort_baseFontSize = X_Node_fontSizeNode[ '_rawObject' ].offsetHeight;
		};
		return X_ViewPort_baseFontSize;
	},
	
	/**
	 * キーボードイベントを受け付ける
	 * @alias X.ViewPort.isActive
	 */
	'isActive' : function(){
		return X_ViewPort_active;
	},
	
	/**
	 * 可視である。iframe 内のhtmlも
	 * @alias X.ViewPort.isVisible
	 */
	'isVisible' : function(){
		return X_ViewPort_active;
	}
	
};



/* -----------------------------------------------
 * Resize
 *  original : uupaa.js
 * 
 * TODO
 *  https://w3g.jp/blog/studies/ios7_1_minimal-ui_warning
 *  iOS7.0からあったiPad Safariの高さ100%コンテンツでlandscape（横向き）時に起きる不具合
 * 
 * http://looxu.blogspot.jp/2013/11/ios7mobile-safariwindowinnerheight.html
 * iOS7にて、Mobile Safariのwindow.innerHeightを正しく取得する方法
 * 
 *  http://tenderfeel.xsrv.jp/javascript/1182/
 *  アドレスバーの高さの算出
 * 
 * http://sssslide.com/www.slideshare.net/hiroakiwakamatsu/javascript-14514208
 * 1. 傾き時の画面サイズ取得ー 対処方法の例
 * (1)ー? タイマーを使って、画面サイズ取得の タイミングを少しだけ遅延させる
 * window.onorientationchange = function() { setTimeout(function() { alert('W: ' + window.innerWidth + ', H: ' + window.innerHeight); }, 200); }
 * 横に傾けた時、正常に横向け時の 幅と高さが取得できている ただし、端末によってはうまく取得できな い場合がある(Galaxy S IIIとか・・・) 7 
 * 
 * http://sssslide.com/www.slideshare.net/hiroakiwakamatsu/ss-12718639
 * 
 * 
 * getBoundingClientRect で fontsize の調査
 */
		var X_ViewPort_resize =
			// iOS もループで回す,,,iOS3.1.3, iOS6 で確認
			X_ViewPort_useDetectionLoop ?
				(function(){
					var size;
					if( !X_ViewPort_lock ){
						size = X_ViewPort_getWindowSize();
						if( X_ViewPort_width !== size[ 0 ] || X_ViewPort_height !== size[ 1 ] ){
							X_ViewPort_width = size[ 0 ];
							X_ViewPort_height = size[ 1 ];
							X_Timer_once( 100, X_ViewPort_detectFinishResizing );
							X_ViewPort_lock = true;
						};
					};
					
					size = X_Node_fontSizeNode[ '_rawObject' ].offsetHeight;
					if( X_ViewPort_baseFontSize !== size ){
						X_ViewPort_baseFontSize && X_ViewPort[ 'asyncDispatch' ]( X_EVENT_BASE_FONT_RESIZED );
						X_ViewPort_baseFontSize = size;
					};
					
				}) :
				(function( e ){
					console.log( '-- resize : ' + X_Timer_now() );
					
					!X_ViewPort_lock && ( X_ViewPort_lock = true ) && X_Timer_once( 100, X_ViewPort_detectFinishResizing );
					return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
				});
		
		function X_ViewPort_detectFinishResizing(){
			var size = X_ViewPort_getWindowSize();
			if( X_ViewPort_width !== size[ 0 ] || X_ViewPort_height !== size[ 1 ] ){
				X_ViewPort_width  = size[ 0 ];
				X_ViewPort_height = size[ 1 ];
				X_Timer_once( 100, X_ViewPort_detectFinishResizing );
			} else {
				console.log( '-- detectFinishResizing : ' + X_Timer_now() );
				
				X_ViewPort[ 'asyncDispatch' ]( X_EVENT_VIEW_RESIZED );
				X_ViewPort_lock = false;
				if( X_ViewPort_orientationFlag ){
					X_ViewPort_orientationFlag = false;
					X_ViewPort[ 'asyncDispatch' ]( 100, { type : X_EVENT_VIEW_TURNED, 'orientation' : window.orientation } );
				};
			};
		};

		X_TEMP.onDomContentLoaded = function(){
			var html, head, body;
			
			console.log( '> X_TEMP.onDomContentLoaded rs:' + X_ViewPort_readyState );
			
			if( X_EVENT_PRE_INIT <= X_ViewPort_readyState ) return X_CALLBACK_UN_LISTEN;
			X_ViewPort_readyState = X_EVENT_PRE_INIT;
			
			// DOMContentLoaded の無いブラウザで X_TEMP.onDomContentLoaded への参照が残り続けるのを回避
			X_TEMP.onDomContentLoaded && X_ViewPort_document[ 'unlisten' ]( 'DOMContentLoaded', X_TEMP.onDomContentLoaded );
			delete X_TEMP.onDomContentLoaded;

			X_elmBody = document.body;

			X_ViewPort_rootElement = document.compatMode !== 'CSS1Compat' ? X_elmBody : X_elmHtml || X_elmBody;

	/**
	 * X.Node( documentElement )
	 * @alias X.Doc.html
	 * @type {Node}
	 */
			X[ 'Doc' ][ 'html' ] = html = X_Node_html = X_elmHtml && X_Node( X_elmHtml )[ 'removeClass' ]( 'js-disabled' )[ 'addClass' ]( X_UA_classNameForHTML.split( '.' ).join( '_' ) );
			html[ '_flags' ] |= X_NodeFlags_IN_TREE;

	/**
	 * X.Node( head )
	 * @alias X.Doc.head
	 * @type {Node}
	 */			
			X[ 'Doc' ][ 'head' ] = head = X_Node_head = X_elmHead && X_Node( X_elmHead );

	/**
	 * X.Node( body )
	 * @alias X.Doc.body
	 * @type {Node}
	 */		
			X[ 'Doc' ][ 'body' ] = body = X_Node_body = X_Node( X_elmBody );

			body[ 'parent ' ] = head[ 'parent' ] = html;
			html[ '_xnodes' ] = [ head, body ];
			
			html[ 'appendTo' ] = html[ 'prev' ] = html[ 'next' ] = html[ 'clone' ] = html[ 'remove' ] = html[ 'kill' ] =
			html[ 'create' ] = html[ 'createText' ] = html[ 'createAt' ] = html[ 'createTextAt' ] = html[ 'append' ] = html[ 'appendAt' ] = html[ 'empty' ] = html[ 'html' ] = html[ 'text' ] =
			html[ 'css' ] = html[ 'cssText' ] =
			head[ 'appendTo' ] = head[ 'prev' ] = head[ 'clone' ] = head[ 'remove' ] = head[ 'kill' ] =
			head[ 'createText' ] = head[ 'createTextAt' ] = head[ 'empty' ] = head[ 'html' ] = head[ 'text' ] = head[ 'css' ] = head[ 'cssText' ] =
			body[ 'appendTo' ] = body[ 'next' ] = body[ 'clone' ] = body[ 'remove' ] = body[ 'kill' ] = new Function( 'return this' );

			X_ViewPort[ 'listenOnce' ]( X_EVENT_PRE_INIT, function(){
				X_ViewPort_readyState = X_EVENT_XTREE_READY;
				!X_TEMP.X_Dom_useBuilder && X_ViewPort[ 'asyncDispatch' ]( X_EVENT_XTREE_READY );
			} );
			
			X_ViewPort[ 'listenOnce' ]( X_EVENT_XTREE_READY, function(){
				X_ViewPort_readyState = X_EVENT_INIT;
				X_Node_body[ 'appendAt' ]( 0,
					X_Node_systemNode = X_Doc_create( 'div', { 'class' : 'hidden-system-node' } ),
					X_Node_fontSizeNode = X_Doc_create( 'div', { 'class' : 'hidden-system-node' } )[ 'cssText' ]( 'line-height:1;height:1em;' )[ 'text' ]( 'X' )
				);
				X_Node_startUpdate();

				X_ViewPort[ 'asyncDispatch' ]( X_EVENT_INIT );
			} );

			X_ViewPort[ 'listenOnce' ]( X_EVENT_INIT, function(){
				var size = X_ViewPort_getWindowSize(),
				
				// http://jsdo.it/imaya/kTYg
					defaultOverflow = X_elmBody.style.overflow,
					w, h;
			
				X_ViewPort_width  = size[ 0 ];
				X_ViewPort_height = size[ 1 ];
			
				X_elmBody.style.overflow = 'hidden';
				w = X_elmBody.clientWidth;
				h = X_elmBody.clientHeight;
			
				X_elmBody.style.overflow = 'scroll';
				w -= X_elmBody.clientWidth;
				h -= X_elmBody.clientHeight;
			
				if( !w ) w = X_elmBody.offsetWidth  - X_elmBody.clientWidth;
				if( !h ) h = X_elmBody.offsetHeight - X_elmBody.clientHeight;
				X_elmBody.style.overflow = defaultOverflow; 
			
				X_ViewPort_vScrollbarSize = w;
				X_ViewPort_hScrollbarSize = h;
				if( h <= 0 ){ // ie6, ie11, firefox で 負の値が返る
					// console.log( 'invalid hScrollbarSize: ' + h );
					X_ViewPort_hScrollbarSize = w;
				};
				
				//
				if( X_ViewPort_orientationchange ){
					X_ViewPort[ 'listen' ]( 'orientationchange', X_ViewPort_orientationchange );
				};
				
				if( X_ViewPort_detectFontSize ){
					X_ViewPort[ 'listen' ]( 'resize', X_ViewPort_resize );
					X_Timer_add( 333, X_ViewPort_detectFontSize );
				} else {
					X_Timer_add( 333, X_ViewPort_resize );
				};
				
				X_ViewPort_baseFontSize = X_Node_fontSizeNode[ '_rawObject' ].offsetHeight;

				X_ViewPort[ 'asyncDispatch' ]( X_ViewPort_readyState = X_EVENT_XDOM_READY );
			} );

			if( X_TEMP.X_Dom_useBuilder ) X_TEMP.X_Dom_useBuilder = !!X_elmBody.children.length;
			X_ViewPort[ 'asyncDispatch' ]( X_EVENT_PRE_INIT );

			X_ViewPort[ 'listen' ]( [ 'beforeunload', 'unload' ] );

		//ブラウザの戻るボタンで戻ったときに呼ばれるイベントとかキャッシュとかそこらへんのこと
		//http://d.hatena.ne.jp/koumiya/20080916/1221580149

			if( document[ 'hidden' ] !== undefined ){// iOS 7+
				X_ViewPort_document[ 'listen' ]( 'visibilitychange', X_ViewPort );
			} else
			if( document[ 'webkitHidden' ] !== undefined ){
				X_ViewPort_document[ 'listen' ]( 'webkitvisibilitychange', X_ViewPort );
			} else
			if( document[ 'msHidden' ] !== undefined ){
				X_ViewPort_document[ 'listen' ]( 'msvisibilitychange', X_ViewPort );
			} else
			if( document[ 'mozHidden' ] !== undefined ){
				// TODO Firefox + Android2 でブラウザにフォーカスが戻ったことが判らない...
				X_ViewPort_document[ 'listen' ]( 'mozvisibilitychange', X_ViewPort );
			};
			
			if( window[ 'onpageshow' ] !== undefined ){
				X_ViewPort[ 'listen' ]( [ 'pageshow', 'pagehide' ] );
			};
			
			if( ( X_UA.Gecko || X_UA.Fennec ) ){
				// http://d.hatena.ne.jp/uupaa/20091231/1262202954
				// 現状で capture = true でリッスンする手段が無いので...
				document.addEventListener( 'focus', X_ViewPort[ 'handleEvent' ], true ); // capture
				document.addEventListener( 'blur' , X_ViewPort[ 'handleEvent' ], true ); // capture
			} else {
				// https://github.com/ai/visibilityjs/blob/master/lib/visibility.fallback.js
				X_ViewPort_document[ 'listen' ]( [ 'focusin', 'focusout' ], X_ViewPort );
			};
			// http://help.dottoro.com/ljuoivsj.php
			
			
			// TODO activeElement が無い対策
			if( !FocusUtility_docActiveElmSupport ){
				X_ViewPort[ 'listen' ]( 'focus', X_ViewPort_fixActiveElm );
			};
			
			// bubleup しない!
			X_ViewPort[ 'listen' ]( [ 'focus', 'blur' ] );

			return X_CALLBACK_UN_LISTEN;
		};

		function X_ViewPort_fixActiveElm( e ){
			// textNode を修正して elm にする処理は　EventDisptcher に入っている
			FocusUtility_fixActiveElm = e.target[ '_rawObject' ];
		};

		function X_ViewPort_getWindowSize(){
			return ( X_UA.Trident || X_UA.TridentMobile ) ?
				[ X_ViewPort_rootElement.clientWidth, X_ViewPort_rootElement.clientHeight ] :
				( X_UA.Presto || X_UA.PrestoMobile ) < 12 ? // Opera10.1 では ズーム + resize 時に表示領域のサイズが取れない！
                [ X_ViewPort_rootElement.offsetWidth, X_ViewPort_rootElement.offsetHeight ] :
                // wemo.tech/470
                // iOS12.2 + Firefox + iPad の場合、outerHeight がアドレスバーのサイズを除いた意図した値を返す
				[ window.innerWidth, window.innerHeight ];
		};


// console.log( 'X.Dom dom:w3c=' + X_UA_DOM.W3C + ' ev:w3c=' + X_UA_EVENT.W3C );

/* -----------------------------------------------
 * Document Ready
 *  Dean Edwards/Matthias Miller/John Resig
 */

// SafariでJavaScriptのデバッグをする方法
// safari1.3 可
// http://shimax.cocolog-nifty.com/search/2006/09/safarijavascrip_c54d.html

/* for ie9+/Mozilla/Opera9 */
if( X_UA_EVENT.W3C ){
	X_ViewPort_document[ 'listenOnce' ]( 'DOMContentLoaded', X_TEMP.onDomContentLoaded );
} else
if( 6 <= ( X_UA.Trident || X_UA.TridentMobile ) && X[ 'inHead' ] ){
    X_TEMP._script = document.createElement( '<script id=__ieonload defer src=javascript:void(0)></script>' );
	// 次のコードはスタンドアローン版ie6でエラー
	// document.write( '<script id=__ieonload defer src=javascript:void(0)></script>' );
    X_elmHead.appendChild( X_TEMP._script );

	X_TEMP._script.onreadystatechange = function(){
		var s = X_TEMP._script;
		if( s && s.readyState === 'complete' ){
			s.onreadystatechange = X_emptyFunction;
			s.onreadystatechange = null;
			s.removeNode( true );
			delete X_TEMP._script;
			X_TEMP.onDomContentLoaded && X_TEMP.onDomContentLoaded();
		};
	};
};
// Re: onLoad doesn't work with Safari?
// http://lists.apple.com/archives/web-dev/2003/Oct/msg00036.html
if( X_UA.WebKit <= 419.3 ){ // Safari 2-
	X_Timer_add( 16, function(){
		if( !X_TEMP.onDomContentLoaded ) return X_CALLBACK_UN_LISTEN;
		if( document.readyState === 'loaded' || document.readyState === 'complete' ) return X_TEMP.onDomContentLoaded();
	});
};

/* for other browsers */
X_ViewPort[ 'listenOnce' ]( 'load', X_TEMP.onDomContentLoaded );
