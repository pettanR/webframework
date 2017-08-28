/*
 * use X.Callback
 * 
 * http://d.hatena.ne.jp/uupaa/20100430/1272561922
 * event.offsetX と offsetY の互換性について
 * 
 * http://www.keynavi.net/ja/tipsj/gokan.html
 * Safari : マウスイベントは大丈夫ですが ページ全体に対するキーイベントをきちんと扱えない問題があります。 
 * その他、リンクに対するフォーカス(element.focus())の動作がおかしい、 スクリーン上のマウス位置(event.screenX/Y)をブラウザ画面の 左下隅から計算する などの問題があり修正が待たれます。 
 * 
 */

// http://msdn.microsoft.com/ja-jp/library/ie/dn255104%28v=vs.85%29.aspx
var X_Dom_Event_devicePixelRatio = window.devicePixelRatio || ( window.screen.deviceXDPI / window.screen.logicalXDPI ) || 1,

	X_Dom_Event_convertMSPointerType = ( !window.PointerEvent && window.MSPointerEvent ) && [ 0, 0, 'touch', 'pen', 'mouse' ], // WP8.1 は PointerEvent と MSPointerEvent 両方ある
	/*{
		'2' : 'touch',
		'3' : 'pen',
		'4' : 'mouse'
	}; */
	/*
	 * https://github.com/markleusink/ios-html5-drag-drop-shim/blob/master/ios-drag-drop.js
	 */
	X_Dom_Event_coordinateSystemForElementFromPoint = X_UA[ 'iOS' ] < 5 ? 'page' : 'client', // iOS4 以下は clientX が undeifned...
	
	X_Dom_Event_CANCEL_MOUSE = {},
	X_DomEvent;

if( X_Dom_Event_devicePixelRatio !== 1 ){
	X_UA_classNameForHTML += ' dpr' + X_Dom_Event_devicePixelRatio;
	
	X_UA[ 'dpr' ] = X_Dom_Event_devicePixelRatio;	
};

if( !X_UA[ 'IE' ] || 9 <= X_UA[ 'IE' ] ){
	X_DomEvent = function( e, xnode ){
		var originalType = e.type,
			isNum = X_Type_isNumber,
			type, pointerEventType,
			touches, events,
			altKey, ctrlKey, metaKey, shiftKey, target, xtarget, offset, related, force,
			elm, i, n, time, touch, ev;
		
		this._e        = e;
		this[ 'type' ]          = type = X_Event_RenameTo[ originalType ] || originalType;
		
		switch( type ){
			case 'message' :
				this[ 'data' ]   = e.data;
				this[ 'origin' ] = e.origin;
				this[ 'source' ] = e.source;
				break;
			case 'progress' :
				this[ 'lengthComputable' ] = e.lengthComputable;
				this[ 'loaded' ] = e.loaded;
				this[ 'total' ]  = e.total;
				break;
			case 'dragstart' :
			case 'dragenter' :
			case 'dragover'  :
			case 'dragleave' :
			case 'drop'      :
			case 'dragend'   :
				this[ 'dataTransfer' ] = e.dataTransfer;
				break;
		};
		
		//console.log( 'original : ' + originalType + ' > ' + type );
		// http://msdn.microsoft.com/ja-jp/library/ie/dn304886%28v=vs.85%29.aspx
		// ポインター イベントの更新
		if( e.pointerType ||
			// IE11 の IE10 モードで click イベントの pointerType が undefined
			( X_UA[ 'IE' ] === 10 && type === 'click' && ( e.pointerType = 'mouse' ) ) ){
			// PointerEvent;
			if( X_Dom_Event_convertMSPointerType ){
				this[ 'pointerType' ]   = X_Dom_Event_convertMSPointerType[ e.pointerType ];
				this[ 'pressure' ]      = isNum( e.pressure ) ? e.pressure : ( e.button !== -1 ? 0.5 : 0 );
				// ポインターの接触形状の スクリーン ピクセル単位の幅と高さ なので変換。(多分、、、)
				this[ 'width' ]         = e.width  / X_Dom_Event_devicePixelRatio;
				this[ 'height' ]        = e.height / X_Dom_Event_devicePixelRatio;
			} else {
				this[ 'pointerType' ]   = e.pointerType;
				this[ 'pressure' ]      = e.pressure;
				// ポインターの接触形状の CSS ピクセル単位の幅と高さ。
				this[ 'width' ]         = e.width;
				this[ 'height' ]        = e.height;
			};

			switch( this[ 'pointerType' ] ){
				case 'pen' :
					//Y-Z 平面と、ペンの軸が含まれる平面の間の角度を返します。Y 軸の範囲は -90 ～ +90 です。X の傾きの正の方向は右方向です。
					this[ 'tiltX' ]         = e.tiltX;
					this[ 'tiltY' ]         = e.tiltY;
					if( originalType === 'MSPointerHover' ){
						this[ 'type' ] = 'pointermove'; // ie10 には pointerhover と pointermoveがあり、ie11 で一本化。ie11 では buttons を見て hover 状態を判定
					};
				case 'touch' :
					this[ 'radiusX' ]       = e.radiusX;
					this[ 'radiusY' ]       = e.radiusY;
					this[ 'rotationAngle' ] = e.rotationAngle;
				case 'mouse' :
			};
			
			this[ 'button' ]        = e.button;
			this[ 'buttons' ]       = e.buttons;
						
			this[ 'pointerId' ]     = e.pointerId;			
			this[ 'target' ]        = X_Node_getXNode( e.target );
			this[ 'relatedTarget' ] = X_Node_getXNode( e.relatedTarget ); // xnode
			this[ 'isPrimary' ]     = e.isPrimary;
			this[ 'hwTimestamp' ]   = e.hwTimestamp;
			this[ 'timestamp' ]     = e.timestamp;

			this[ 'altKey' ]        = e.altKey;
			this[ 'ctrlKey' ]       = e.ctrlKey;
			this[ 'metaKey' ]       = e.metaKey;
			this[ 'shiftKey' ]      = e.shiftKey;
			//this[ 'screenX' ]       = touch.screenX;
			//this[ 'screenY' ]       = touch.screenY;
			this[ 'clientX' ]       = e.clientX;
			this[ 'clientY' ]       = e.clientY;
			this[ 'pageX' ]         = e.pageX;
			this[ 'pageY' ]         = e.pageY;
			this[ 'offsetX' ]       = e.offsetX;
			this[ 'offsetY' ]       = e.offsetY;
		} else
		if( pointerEventType = X_Event_toPointer[ originalType ] ){
			// Touch or Mouse
			//console.log( originalType + ' => ' + pointerEventType );
			
			/* e.constructor === window.TouchEvent -> e.touches for iOS3.13 */
			if( touches = e.changedTouches ){
				//console.log( originalType + ' => ' + pointerEventType );
				if( touches.length === 0 ){
					alert( 'e.changedTouches.length === 0' );
				};
				X_Dom_Event_CANCEL_MOUSE[ xnode[ '_uid' ] ] = pointerEventType;
				
				events   = [];
				altKey   = e.altKey;
				ctrlKey  = e.ctrlKey;
				metaKey  = e.metaKey;
				shiftKey = e.shiftKey;
				time     = X_Timer_now();
				force    = originalType === 'touchend' || originalType === 'touchcancel' ? 0 : 0.5;
				for( i = touches.length; i; ){
					touch   = touches[ --i ];
					target  = touch.target;
					target  = target.nodeType === 3 ? target.parentNode : target;
					xtarget = X_Node_getXNode( target );
					// TODO getter で値を返す
					// https://developer.mozilla.org/en/docs/Web/API/Element/getBoundingClientRect
					// Android 2+, iOS4+
					offset  = X_UA[ 'iOS' ] < 5 ? xtarget.offset() : target.getBoundingClientRect();
					related = touch.relatedTarget;
					events[ i ] = {
						'type'          : pointerEventType,
						'pointerType'   : 'touch',
						'target'        : xtarget,// defeat Safari bug // xnodetouch.target,
						'currentTarget' : xnode,
						'relatedTarget' : related && X_Node_getXNode( related.nodeType === 3 ? related.parentNode : related ), // xnode iOS3 には relatedTarget がない
						'isPrimary'     : true,
						'hwTimestamp'   : time,
						'timestamp'     : time,
						'button'        : /*e.button ||*/ ( force ? 0 : -1 ),
						'buttons'       : /*e.buttons || e.button ||*/ ( force ? 1 : 0 ),
						'altKey'        : altKey,
						'ctrlKey'       : ctrlKey,
						'metaKey'       : metaKey,
						'shiftKey'      : shiftKey,
						'pointerId'     : touch.identifier + 2, // iOS4 は 変換が必要！
						//screenX       : touch.screenX,
						//screenY       : touch.screenY,
						'pageX'         : touch.pageX,
						'pageY'         : touch.pageY,						
						// iOS4 以下では clientX が undef, pageX から scrollLeft を引く.
						// TODO getter にする?
						'clientX'       : isNum( touch.clientX ) ? touch.clientX : ( touch.pageX - X_ViewPort_scrollX ),
						'clientY'       : isNum( touch.clientY ) ? touch.clientY : ( touch.pageY - X_ViewPort_scrollY ),
						// 要素上の座標を取得
						// iOS8 でも offsetX が undef, iOS4　以下では pageX - offset.x, iOS5 以上は clientX - getBCR.left
						// TODO getter にする?
						'offsetX'       : isNum( touch.offsetX ) ? touch.offsetX : touch[ X_Dom_Event_coordinateSystemForElementFromPoint + 'X' ] - ( offset.x || offset.left || 0 ), 
						'offsetY'       : isNum( touch.offsetY ) ? touch.offsetY : touch[ X_Dom_Event_coordinateSystemForElementFromPoint + 'Y' ] - ( offset.y || offset.top  || 0 ),
						'radiusX'       : touch.radiusX || 0,
						'radiusY'       : touch.radiusY || 0,
						'rotationAngle' : touch.rotationAngle || 0,
						'pressure'      : touch.force || touch.webkitForce || force,
						'width'         : touch.width || 0,
						'height'        : touch.height || 0
					};
					//console.log( 'e.pointerId = ' + touch.identifier );
					//X_UA[ 'iOS' ] < 5 && console.log( pointerEventType + ':[' + events[ i ].pageX + ',' + events[ i ].pageY + ']' + events[ i ].pointerId );
				};
				return events.length === 1 ? events[ 0 ] : events;
			} else {
				
				if( X_Dom_Event_CANCEL_MOUSE[ xnode[ '_uid' ] ] === pointerEventType ){
					delete X_Dom_Event_CANCEL_MOUSE[ xnode[ '_uid' ] ];
					return [];
				};
				
				// MouseEvent;
				this[ 'type' ]          = pointerEventType;
				this[ 'pointerType' ]   = 'mouse';
				
				this[ 'button' ]        = e.button !== undefined ? e.button : e.which !== undefined ? e.which - 1 : -1;
				this[ 'buttons' ]       = e.buttons !== undefined ? e.buttons : this[ 'button' ] === 0 ? 1 : this[ 'button' ] === 1 ? 2 : this[ 'button' ] === 2 ? 4 : 0;
				this[ 'pressure' ]      = ( this[ 'button' ] !== -1 ? 0.5 : 0 );
				
				elm = e.target;
				this[ 'target' ]        = X_Node_getXNode( elm.nodeType === 3 ? elm.parentNode : elm );// defeat Safari bug // xnodetouch.target;
				this[ 'isPrimary' ]     = true;
				this[ 'hwTimestamp' ]   = this[ 'timestamp' ] = X_Timer_now();
				this[ 'altKey' ]        = e.altKey;
				this[ 'ctrlKey' ]       = e.ctrlKey;
				this[ 'metaKey' ]       = e.metaKey;
				this[ 'shiftKey' ]      = e.shiftKey;
				this[ 'pointerId' ]     = 1;
				//this[ 'screenX' ]       = touch.screenX;
				//this[ 'screenY' ]       = touch.screenY;
				// TODO http://uupaa-js.googlecode.com/svn-history/r8/trunk/doc/reference/symbols/src/trunk_uu.module.ui.js.html
				// Safari2ではclientX,YはpageX,Yと同じ値を返す
				this[ 'clientX' ]       = e.clientX;
				this[ 'clientY' ]       = e.clientY;
				this[ 'pageX' ]         = e.pageX;
				this[ 'pageY' ]         = e.pageY;
				this[ 'offsetX' ]       = isNum( e.offsetX ) ? e.offsetX : e.layerX; // 要素上の座標を取得 
				this[ 'offsetY' ]       = isNum( e.offsetY ) ? e.offsetY : e.layerY;
				
			// http://www.programming-magic.com/20090127231544/
			// Opera で button==2の場合、コンテキストメニューイベントを発火 「ツール」->「設定」->「詳細設定」->「コンテンツ」->「Javascriptオプション」で「右クリックを制御するスクリプトを許可する」
				if( originalType === 'mousedown' && this[ 'button' ] === 2 && X_UA[ 'Opera' ] ){
					events = [ X_Object_copy( this ), X_Object_copy( this ) ];
					events[ 1 ].type = 'contextmenu';
					return events;
				};
			};
		} else {
			// Other
			
			this[ 'keyCode' ]       = X_Type_isFinite( e.keyCode ) ? e.keyCode : X_Type_isFinite( e.charCode ) ? e.charCode : e.which;
			this[ 'charCode' ]      = X_Type_isFinite( e.charCode ) ? e.charCode : e.which;
			this[ 'altKey' ]        = e.altKey   || !!( e.modifiers & 1 );
			this[ 'ctrlKey' ]       = e.ctrlKey  || !!( e.modifiers & 2 );
			this[ 'shiftKey' ]      = e.shiftKey || !!( e.modifiers & 4 );
			this[ 'metaKey' ]       = e.metaKey  || !!( e.modifiers & 8 );;
			
			this[ 'button' ]        = e.button !== undefined ? e.button :
								 e.which !== undefined ? e.which - 1 : -1;
			this[ 'buttons' ]       = e.buttons !== undefined ? e.buttons : this[ 'button' ] === 0 ? 1 : this[ 'button' ] === 1 ? 2 : this[ 'button' ] === 2 ? 4 : 0;
			
			//http://www.quirksmode.org/js/events_properties.html
			if( elm = e.target ){
				this[ 'target' ]        = X_Node_getXNode( elm.nodeType === 3 ? elm.parentNode : elm );// defeat Safari bug // xnode
			};
			if( elm = e.relatedTarget ){
				this[ 'relatedTarget' ] = X_Node_getXNode( elm.nodeType === 3 ? elm.parentNode : elm ); // xnode
			};
			
			if( type === 'wheel' ){
				// https://developer.mozilla.org/ja/docs/DOM/DOM_event_reference/mousewheel
				// TODO axis
				// https://w3g.jp/blog/tools/wheelevent_crossbrowser
				// ホイール系イベント2014年版クロスブラウザ
				if( e.deltaY !== undefined ){
					this[ 'deltaX' ] = e.deltaX;
					this[ 'deltaY' ] = e.deltaY;
					this[ 'deltaZ' ] = e.deltaZ || 0;
				} else
				if( e.wheelDeltaY !== undefined ){
					this[ 'deltaX' ] = e.wheelDeltaX / 120;
					this[ 'deltaY' ] = e.wheelDeltaY / 120;
					this[ 'deltaZ' ] = e.wheelDeltaZ / 120 || 0;
				} else
				if( e.wheelDelta !== undefined ){
					this[ 'deltaX' ] = this[ 'deltaZ' ] = 0;
					this[ 'deltaY' ] = e.wheelDelta / -120;
				} else
				if( e.detail !== undefined ){
					this[ 'deltaX' ] = this[ 'deltaZ' ] = 0;
					this[ 'deltaY' ] = originalType === 'MozMousePixelScroll' ? e.detail / 45 : e.detail / 3; // 3
				} else {
					this[ 'deltaX' ] = this[ 'deltaY' ] = this[ 'deltaZ' ] = 0;
				};
			};
		};

		this[ 'currentTarget' ] = xnode; // xnode
		this[ 'eventPhase' ]    = e.eventPhase;
		this[ 'detail' ]        = e.detail;
	};
} else {
	X_DomEvent = function( e, xnode, element ){
		var originalType = e.type, btn, type;
		
		this[ 'type' ]          = X_Event_RenameTo[ originalType ] || originalType;
		this[ 'target' ]        = X_Node_getXNode( e.srcElement ); // xnode
		if( this[ 'target' ] && !this[ 'target' ][ '_tag' ] ) this[ 'target' ] = this[ 'target' ].parent; // ie4 の fake Textnode がヒットしていないか？
		this[ 'currentTarget' ] = xnode; // xnode
		this[ 'relatedTarget' ] = X_Node_getXNode( e.formElement || e.toElement ); // xnode
		//this[ 'relatedTarget' ] && console.dir( 'relatide...' );
		this[ 'eventPhase' ]    = e.srcElement === element ? 2: 3;
		
		this[ 'keyCode' ]       = e.keyCode;
		this[ 'charCode' ]      = e.keyCode;
		this[ 'altKey' ]        = e.altKey;
		this[ 'ctrlKey' ]       = e.ctrlKey;
		this[ 'shiftKey' ]      = e.shiftKey;

		
		switch( this[ 'type' ] ){
			case 'message' :
				this[ 'data' ]   = e.data;
				this[ 'origin' ] = e.origin;
				this[ 'source' ] = e.source;
				break;
			case 'progress' :
				this[ 'loaded' ] = e.loaded;
				this[ 'total' ]  = e.total;
				break;
		};

		// http://www.programming-magic.com/20090127231544/
		switch( originalType ){
			case 'click'    :
			case 'dblclick' :
				this[ 'button' ] = 0;
				break;
			case 'contextmenu' :
				this[ 'button' ] = 2;
				break;
			default :
				// mouseup, mousedown
				btn = e.button;
				this[ 'button' ] =
					btn & 1 ? 0 :
					btn & 4 ? 2 :
					btn & 2 ? 1 : -1; // 左:1(click:0), 中:4, 右:2
				
		};
		this[ 'buttons' ]     = e.button;
	
		this[ 'deltaX' ]      = 0;
		this[ 'deltaY' ]      = e.wheelDelta / -120;	
	
		if( type = X_Event_toPointer[ originalType ] ){
			this[ 'type' ]          = type;
			this[ 'pointerType' ]   = 'mouse';
			this[ 'clientX' ]       = e.clientX;
			this[ 'clientY' ]       = e.clientY;
			//this[ 'screenX' ]       = e.screenX;
			//this[ 'screenY' ]       = e.screenY;
			
			//if( X_ViewPort_rootElement ){ // uuu...
				this[ 'pageX' ]         = e.clientX + X_ViewPort_rootElement.scrollLeft;
				this[ 'pageY' ]         = e.clientY + X_ViewPort_rootElement.scrollTop;
				// DOMAssistant 2.8.1
				//event.pageX = DOMAssistant.def(e.pageX)? e.pageX : (event.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0));
				//event.pageY = DOMAssistant.def(e.pageY)? e.pageY : (event.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0));							
			//};

			if( 5 <= X_UA[ 'IE' ] ){
				this[ 'offsetX' ]       = e.offsetX; // イベントターゲット左上からの座標
				this[ 'offsetY' ]       = e.offsetY;			
			}// else
			//if( e.srcElement ){
			//	this[ 'offsetX' ]       = e.x - e.srcElement.offsetLeft; // e.x はイベント発生要素の親要素を基準にした座標。
			//	this[ 'offsetY' ]       = e.y - e.srcElement.offsetTop;	
			//};
			this[ 'pressure' ]      = ( this[ 'button' ] !== -1 ? 0.5 : 0 );
			this[ 'isPrimary' ]     = true;
			this[ 'hwTimestamp' ]   = this[ 'timestamp' ] = X_Timer_now();
			this[ 'pointerId' ]     = 1;
			this[ 'radiusX' ]       = 0;
			this[ 'radiusY' ]       = 0;
			this[ 'rotationAngle' ] = 0;
			this[ 'width' ]         = 0;
			this[ 'height' ]        = 0;
			this[ 'tiltX' ]         = 0;
			this[ 'tiltY' ]         = 0;
		};
	};
};

// TODO load -> readystatechange this.readyState === "loaded" || this.readyState === "complete"

// https://github.com/georgeadamson/jQuery.prefixfree-events/blob/master/jQuery.prefixfree-events.js
// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
//
if( document.onwheel === undefined ){
	// DOMMoseScroll
	if( X_UA[ 'Gecko' ] && window.MouseScrollEvent ){
		if( 2 <= X_UA[ 'Gecko' ] || ( 1.9 <= X_UA[ 'Gecko' ] && 1 <= X_UA[ 'GeckoPatch' ] ) ){ // Gecko 1.9.1+ (firefox3.5+)
			console.log( 'wheel <= MozMousePixelScroll' );
			X_Event_Rename[ 'wheel' ] = 'MozMousePixelScroll';
		} else
		if( 1 <= X_UA[ 'Gecko' ] || ( 0.9 <= X_UA[ 'Gecko' ] && 7 <= X_UA[ 'GeckoPatch' ] ) ){ // Gecko 0.9.7+ (NN6.2+?)
			console.log( 'wheel <= DOMMouseScroll' );
			X_Event_Rename[ 'wheel' ] = 'DOMMouseScroll';
		};
	} else {
		X_Event_Rename[ 'wheel' ] = 'mousewheel';
	};
	//if( document.onmousewheel !== undefined ){ // Opera で判定失敗する
	//	X_Event_Rename[ 'wheel' ] = 'mousewheel';
	//};
};

if( X_UA[ 'Webkit' ] || X_UA[ 'Opera' ] || X_UA[ 'Blink' ] || X_UA[ 'Khtml' ] || X_UA[ 'AOSP' ] || X_UA[ 'ChromeWV' ] ){
	// http://d.hatena.ne.jp/uupaa/20091231/1262202954
	X_Event_Rename[ 'focusin'  ] = 'DOMFocusIn';
	X_Event_Rename[ 'focusout' ] = 'DOMFocusOut';
};


if( window.onwebkitanimationend !== undefined && window.onanimationend === undefined ){
	console.log( 'animationend <= webkitAnimationEnd' );
	X_Event_Rename[ 'animationend' ]        = 'webkitAnimationEnd';
	X_Event_Rename[ 'animationstart' ]      = 'webkitAnimationStart';
	X_Event_Rename[ 'animationiteration' ]  = 'webkitAnimationIteration';
} else
if( window.onoanimationend !== undefined && window.onanimationend === undefined ){
	console.log( 'animationend <= oAnimationEnd' );
	X_Event_Rename[ 'animationend' ]        = 'oAnimationEnd';
	X_Event_Rename[ 'animationstart' ]      = 'oAnimationStart';
	X_Event_Rename[ 'animationiteration' ]  = 'oAnimationIteration';
} else
/*
if( window.onmozanimationend !== undefined && window.onanimationend === undefined ){
	  X_Event_Rename[ 'animationend' ]          = 'mozAnimationEnd';
	X_Event_RenameTo[ 'mozAnimationEnd' ]       = 'animationend';
	  X_Event_Rename[ 'animationstart' ]        = 'mozAnimationStart';
	X_Event_RenameTo[ 'mozAnimationStart' ]     = 'animationstart';
	  X_Event_Rename[ 'animationiteration' ]    = 'mozAnimationIteration';
	X_Event_RenameTo[ 'mozAnimationIteration' ] = 'animationiteration';
} else*/
if( document.documentElement && document.documentElement.style.msAnimation !== undefined && document.documentElement.style.animation === undefined ){ //document.documentElement.style.msAnimation 
	console.log( 'animationend <= MSAnimationEnd' );
	X_Event_Rename[ 'animationend' ]         = 'MSAnimationEnd';
	X_Event_Rename[ 'animationstart' ]       = 'MSAnimationStart';
	X_Event_Rename[ 'animationiteration' ]   = 'MSAnimationIteration';
};
// https://developer.mozilla.org/en-US/docs/Web/Events/transitionend
// chrome1+, firefox4+, IE10+, Opera10.5+, Safari3.2+, Android2.1+
if( window.onwebkittransitionend !== undefined && window.ontransitionend === undefined ){
	console.log( 'transitionend <= webkitTransitionEnd' );
	X_Event_Rename[ 'transitionend' ]      = 'webkitTransitionEnd';
} else
if( window.onotransitionend !== undefined && window.ontransitionend === undefined ){
	if( X_UA[ 'Opera' ] < 12 ){
		console.log( 'transitionend <= oTransitionEnd|ver.' + X_UA[ 'Opera' ] );
		X_Event_Rename[ 'transitionend' ]  = 'oTransitionEnd';
	} else {
		console.log( 'transitionend <= otransitionEnd|ver.' + X_UA[ 'Opera' ] );
		X_Event_Rename[ 'transitionend' ]  = 'otransitionEnd';
	};
} else
if( window.onmoztransitionend !== undefined && window.ontransitionend === undefined ){
	console.log( 'transitionend <= mozTransitionEnd' );
	X_Event_Rename[ 'transitionend' ]    = 'mozTransitionEnd';
};

if( !navigator.pointerEnabled ){
	if( navigator.msPointerEnabled ){
		console.log( 'pointerdown <= MSPointerDown' );
		X_Event_Rename[ 'pointerdown'     ] = 'MSPointerDown';
		X_Event_Rename[ 'pointerup'       ] = 'MSPointerUp';
		X_Event_Rename[ 'pointermove'     ] = [ 'MSPointerMove', 'MSPointerHover' ];// ie10 と ie11 でペンのhoverevent の値が異なる
		X_Event_Rename[ 'pointercancel'   ] = 'MSPointerCancel';
		X_Event_Rename[ 'pointerout'      ] = 'MSPointerOut';
		X_Event_Rename[ 'pointerleave'    ] = 'MSPointerLeave';
		// http://msdn.microsoft.com/ja-jp/library/ie/dn304886%28v=vs.85%29.aspx
	} else
	if( X_UA_HID.TOUCH ){
		// touch のみ(iOS でも脱獄したら?)、 touch と mouse(Android), mouse のみ
		X_Event_Rename[ 'pointerdown'     ] = [ 'touchstart', 'mousedown' ];
		X_Event_Rename[ 'pointerup'       ] = [ 'touchend',   'mouseup' ];
		X_Event_Rename[ 'pointermove'     ] = [ 'touchmove',  'mousemove' ];
		X_Event_Rename[ 'pointercancel'   ] = 'touchcancel';
		//X_Event_Rename[ 'pointerout'      ] = 
		X_Event_Rename[ 'pointerleave'    ] = 'touchleave';
		// X_Event_Rename[ 'click'           ] = [ 'touchstart', 'touchmove', 'touchend' ]; // ループになってしまう!直した!直ってない！
	} else {
		X_Event_Rename[ 'pointerdown'     ] = 'mousedown';
		X_Event_Rename[ 'pointerup'       ] = 'mouseup';
		X_Event_Rename[ 'pointermove'     ] = 'mousemove';
		//X_Event_Rename[ 'pointercancel'   ] = 
		//X_Event_Rename[ 'pointerout'      ] = 
		X_Event_Rename[ 'pointerleave'    ] = X_elmHtml.onmouseleave !== undefined ? 'mouseleave' : 'mouseout';
		
		// Opera は ブラウザ設定から右クリックの通知を許可すると mousedown で e.button==2 が返る,ｷｬﾝｾﾙは可能??
		X_UA[ 'Opera' ] && ( X_Event_Rename[ 'contextmenu' ] = 'mousedown' );
		
		/*
		 * buttons の無いブラウザには mouseup, mousedown を監視して、buttons フラグを更新し続ける
		 */
	};
};
