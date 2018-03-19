/*
 * scroll 要素は常にひとつ
 * ScrollManager
 * indicatorX, Y は再利用
 */
var XUI_ScrollBox_useCSSP = !X_UA[ 'IE5' ],
	XUI_ScrollBox_current,
	XUI_ScrollBox_indicatorV,
	XUI_ScrollBox_indicatorH;

function XUI_ScrollBox_start( scrollBox ){
	// 既存スクロールの停止
	if( XUI_ScrollBox_current && XUI_ScrollBox_current !== scrollBox ){
		XUI_ScrollBox_indicatorV &&
		XUI_ScrollBox_current[ 'unlisten' ]( [ X_EVENT_CANCELED, XUI_Event.SCROLL_END ], XUI_ScrollBox_indicatorV, XUI_ScrollBox_indicatorHandleEvent );
		
		XUI_ScrollBox_indicatorH &&
		XUI_ScrollBox_current[ 'unlisten' ]( [ X_EVENT_CANCELED, XUI_Event.SCROLL_END ], XUI_ScrollBox_indicatorH, XUI_ScrollBox_indicatorHandleEvent );
	};

	if( scrollBox && scrollBox.hasVScroll ){
		if( !XUI_ScrollBox_indicatorV ){
			XUI_ScrollBox_indicatorV = X_Doc_create( 'div' )[ 'className' ]( 'ScrollBox-IndicatorV' );
		};
		if( scrollBox.xnode !== XUI_ScrollBox_indicatorV.parent ){
			console.log( '*** Scroll Indicator add ***' );
			scrollBox.xnode[ 'append' ]( XUI_ScrollBox_indicatorV );
			XUI_ScrollBox_indicatorV[ 'animate' ]({
					'from'        : { opacity : 0 },
					'to'          : { opacity : 0.5 },
					'duration'    : 900,
					'easing'      : 'circular',
					'lazyRelease' : 300
				});
			scrollBox
				[ 'listen' ]( [ X_EVENT_CANCELED, XUI_Event.SCROLL_END ], XUI_ScrollBox_indicatorV, XUI_ScrollBox_indicatorHandleEvent );
		};
	} else
	if( XUI_ScrollBox_indicatorV ){
		console.log( '*** Scroll Indicator remove ***' );
		XUI_ScrollBox_indicatorV[ 'remove' ]();
	};
	
	if( scrollBox && scrollBox.hasHScroll ){
		if( !XUI_ScrollBox_indicatorH ){
			XUI_ScrollBox_indicatorH = X_Doc_create( 'div' )[ 'className' ]( 'ScrollBox-IndicatorH' );
		};
		if( scrollBox.xnode !== XUI_ScrollBox_indicatorH.parent ){			
			scrollBox.xnode[ 'append' ]( XUI_ScrollBox_indicatorH );
			XUI_ScrollBox_indicatorH[ 'animate' ]({
					'from'        : { opacity : 0 },
					'to'          : { opacity : 0.5 },
					'duration'    : 900,
					'easing'      : 'circular',
					'lazyRelease' : 300
				});
			scrollBox
				[ 'listen' ]( [ X_EVENT_CANCELED, XUI_Event.SCROLL_END ], XUI_ScrollBox_indicatorH, XUI_ScrollBox_indicatorHandleEvent );			
		};
	} else
	if( XUI_ScrollBox_indicatorH ){
		XUI_ScrollBox_indicatorH[ 'remove' ]();
	};
	
	XUI_ScrollBox_current = scrollBox;
};

function XUI_ScrollBox_indicatorHandleEvent( e ){
	//if( !XUI_ScrollBox_useCSSP ) return;
	switch( e.type ){
		case X_EVENT_CANCELED :
		case XUI_Event.SCROLL_END :
			console.log( '-fadeout-' );
			this[ 'animate' ]({
					'from'        : { opacity : 0.5 },
					'to'          : { opacity : 0 },
					'duration'    : 900,
					'easing'      : 'circular',
					'lazyRelease' : 300
				});
			break;
	};
};


var X_UI_ScrollBox_SUPPORT_ATTRS = {
		// スクロール開始するために必要な移動距離、縦か横、どちらか制限する場合、より重要
		directionLockThreshold : [     10, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.LENGTH ],
		scrollXEnabled         : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		scrollYEnabled         : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		scrollEnabled          : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		bounceEnabled          : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		bounceTime             : [    300, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.TIME ],
		useWheel               : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		useKey                 : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		hasScrollShadow        : [   true, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
		scrollShadowColor      : [ '#000', XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.COLOR ]
	};

var XUI_ScrollBox = XUI_ChromeBox.inherits(
	'_ScrollBox',
	X_Class.NONE,
	{
		layout                 : XUI_Layout_Canvas,
		
		directionLockThreshold : 10,
		scrollXEnabled         : true,
		scrollYEnabled         : true,
		scrollEnabled          : true,
		bounceEnabled          : true,
		momentumEnabled        : true,
		bounceTime             : 600,
		useWheel               : true,
		useKey                 : true,
		hasScrollShadow        : true,
		scrollShadowColor      : '#000',
		
		scrolling       : false,
		
		initiated       : '',
		moved		    : false,
		directionLocked : '',
		startTime       : 0,
		endTime         : 0,
		isInTransition  : false,

		hasHScroll      : false,
		hasVScroll      : false,

		wrapperOffset   : 0,
		wheelTimeout    : 0,
		requestFrameID  : 0,
		
		fontSize        : 0,
		
		scrollX         : 0, // px
		scrollY         : 0, // px
		scrollXMax      : 0, // px
		scrollYMax      : 0, // px
		scrollXRatio    : 0, // この値は scroll 不要になっても保持される。 scroll 必要時に参照される
		scrollYRatio    : 0,		
		startX          : 0, // px
		startY          : 0, // px
		absStartX       : 0, // px
		absStartY       : 0, // px
		pointX          : 0, // px
		pointY          : 0, // px
		distX		    : 0, // px
		distY		    : 0, // px
		directionX      : 0, // -1, 0, 1
		directionY      : 0, // -1, 0, 1
		
		lastScrollWidth  : 0,
		lastScrollHeight : 0,
		lastBoxWidth     : 0,
		lastBoxHeight    : 0,
		
		_containerNode   : null,
		xnodeSlider      : null,
		
		Constructor : function( user, layout, args ){
			this[ 'Super' ]( user, layout, args );
			this._containerNode = X_Pair_get( this.containerNode );
			this.xnodeSlider = this._containerNode.xnode[ 'className' ]( 'ScrollSlider' )[ 'listen' ]( X_EVENT_ANIME_END, this, X_UI_ScrollBox_onAnimeEnd );
			this.xnode[ 'className' ]( 'ScrollBox' );
		},
		
		creationComplete : function(){
			XUI_Box.prototype.creationComplete.apply( this, arguments );
		},
		
		calculate : function(){
			this.lastScrollWidth  = this._containerNode.boxWidth;
			this.lastScrollHeight = this._containerNode.boxHeight;
			this.lastBoxWidth     = this.boxWidth;
			this.lastBoxHeight    = this.boxHeight;
			
			XUI_Box.prototype.calculate.apply( this, arguments );
			
			// TODO root の layout_complete 後に。
			// TODO calculate 前に scroll の解放。
			
			if(
					this.lastScrollWidth  !== this._containerNode.boxWidth ||
					this.lastScrollHeight !== this._containerNode.boxHeight ||
					this.lastBoxWidth    !== this.boxWidth    || this.lastBoxHeight    !== this.boxHeight
				){
					console.log( 'scroll - calc' );
					XUI_rootData[ 'listenOnce' ]( XUI_Event.LAYOUT_COMPLETE, this, X_UI_ScrollBox_onLayoutComplete );
				};
		},
	
		scrollTo : function( x, y, opt_time, opt_easing, opt_release ){
			//if( this.scrollX === x && this.scrollY === y ) return;
			
			opt_time    = 0 <= opt_time ? opt_time : 0;
			opt_easing  = opt_easing || 'circular';
			opt_release = 0 <= opt_release ? opt_release : 300;
	
			this.isInTransition = 0 < opt_time;
	
			X_UI_ScrollBox_translate( this, x, y, opt_time, opt_easing, opt_release );
		},
		
		_remove : function(){
			XUI_AbstractUINode.prototype._remove.apply( this, arguments );
			
			if( this.scrolling ){
				// scroller 削除
				this[ 'unlisten' ]( XUI_Event._POINTER_DOWN, X_UI_ScrollBox_onStart )
					[ 'unlisten' ]( XUI_Event.DRAG, X_UI_ScrollBox_onMove )
					[ 'unlisten' ]( XUI_Event.DRAG_END, X_UI_ScrollBox_onEnd );
				XUI_rootData[ 'unlisten' ]( XUI_Event.LAYOUT_BEFORE, this, X_UI_ScrollBox_onLayoutBefore );
				
				XUI_rootData[ 'unlisten' ]( XUI_Event.LAYOUT_COMPLETE, this, X_UI_ScrollBox_onLayoutComplete );
				this[ 'unlisten' ]( XUI_Event.SCROLL_END, XUI_rootData, XUI_rootData.calculate );
				
				XUI_ScrollBox_useCSSP ? this.xnodeSlider[ 'stop' ]() : this.xnode[ 'stop' ]();
				
				XUI_ScrollBox_current === this && XUI_ScrollBox_start( null );
				
				this.scrolling = false;
			};
		}
		
	}
);

function X_UI_ScrollBox_onLayoutBefore( e ){
	if( e[ 'cancelable' ] && this.isInTransition && X_NodeAnime_translateZ ){
		this[ 'listenOnce' ]( XUI_Event.SCROLL_END, XUI_rootData, XUI_rootData.calculate );
		return X_CALLBACK_PREVENT_DEFAULT;
	};
	this.scrollXRatio = this.scrollX / this.scrollXMax;
	this.scrollYRatio = this.scrollY / this.scrollYMax;
	XUI_ScrollBox_useCSSP ? this.xnodeSlider[ 'stop' ]() : this.xnode[ 'stop' ]();
	this.isInTransition = false;
	return X_CALLBACK_NONE;
};

function X_UI_ScrollBox_onLayoutComplete( e ){
	// scroll の停止、GPU の解除
	var font = this.fontSize = this.xnodeSlider[ 'call' ]( 'fontSize' );

	this.scrollXMax	= ( this.boxWidth  - this._containerNode.boxWidth )  * font | 0;
	this.scrollYMax	= ( this.boxHeight - this._containerNode.boxHeight ) * font | 0;

	this.hasHScroll = this.scrollXEnabled && ( this.scrollXMax < -1 ); // < 0 だと 
	this.hasVScroll = this.scrollYEnabled && ( this.scrollYMax < -1 );

	if( !this.hasHScroll ){
		this.scrollXMax  = 0;
	};

	if( !this.hasVScroll ){
		this.scrollYMax   = 0;
	};

	delete this.endTime;
	delete this.directionX;
	delete this.directionY;

	X_UI_ScrollBox_resetPosition( this, 0 );

	if( this.hasHScroll || this.hasVScroll ){
		// scroll が必要。
		if( this.scrolling ){
			X_UI_ScrollBox_translate( this, this.scrollXMax * this.scrollXRatio, this.scrollYMax * this.scrollYRatio, 100, '', 300 );
		} else {
			// scroller 作る
			this[ 'listen' ]( XUI_Event._POINTER_DOWN, X_UI_ScrollBox_onStart )
				[ 'listen' ]( XUI_Event.DRAG, X_UI_ScrollBox_onMove )
				[ 'listen' ]( XUI_Event.DRAG_END, X_UI_ScrollBox_onEnd );
			XUI_rootData[ 'listen' ]( XUI_Event.LAYOUT_BEFORE, this, X_UI_ScrollBox_onLayoutBefore );
			
			X_UI_ScrollBox_translate( this, this.scrollXMax * this.scrollXRatio, this.scrollYMax * this.scrollYRatio, 100, '', 300 );
			this.scrolling = true;
		};
	} else
	// scroll 不要
	if( this.scrolling ){
		// scroller 削除
		this[ 'unlisten' ]( XUI_Event._POINTER_DOWN, X_UI_ScrollBox_onStart )
			[ 'unlisten' ]( XUI_Event.DRAG, X_UI_ScrollBox_onMove )
			[ 'unlisten' ]( XUI_Event.DRAG_END, X_UI_ScrollBox_onEnd );
		XUI_rootData[ 'unlisten' ]( XUI_Event.LAYOUT_BEFORE, this, X_UI_ScrollBox_onLayoutBefore );
		
		( this.scrollX !== 0 || this.scrollY !== 0 ) && X_UI_ScrollBox_translate( this, 0, 0, 100, '', 300 );
		
		delete this.scrolling;
		delete this.scrollXRatio;
		delete this.scrollYRatio;
	};
};

// TODO use scrollLeft, scrollTop
function X_UI_ScrollBox_translate( that, x, y, opt_time, opt_easing, opt_release ){
	var scrollBoxH = that.fontSize * that.boxHeight,
		scrollBoxW = that.fontSize * that.boxWidth,
		indicatorH, indicatorW;
	
	opt_time    = 0 <= opt_time ? opt_time : 0;
	opt_easing  = opt_easing === '' ? '' : opt_easing || 'circular';
	opt_release = 0 <= opt_release ? opt_release : 300;
	
	console.log( 'scr ' + y );
	
	if( !XUI_ScrollBox_useCSSP ){
		that.xnode[ 'animate' ]({
						'from'        : {
								scrollX : -that.scrollX,
								scrollY : -that.scrollY
							},
						'to'          : {
								scrollX : -x,
								scrollY : -y
							},
						'duration'    : opt_time,
						'easing'      : opt_easing
					});	
	} else {
		that.xnodeSlider[ 'animate' ]({
						'from'        : {
								x : that.scrollX,
								y : that.scrollY
							},
						'to'          : {
								x : x,
								y : y
							},
						'duration'    : opt_time,
						'easing'      : opt_easing,
						'lazyRelease' : opt_release
					});		
	};

	if( X_UA[ 'IE' ] < 6 ){
		XUI_ScrollBox_indicatorV && XUI_ScrollBox_indicatorV[ 'css' ]( 'left', ( scrollBoxW - that.fontSize * 0.6 | 0 ) + 'px' );
		XUI_ScrollBox_indicatorH && XUI_ScrollBox_indicatorH[ 'css' ]( 'top' , ( scrollBoxH - that.fontSize * 0.6 | 0 ) + 'px' );
	};

	if( that.hasVScroll && XUI_ScrollBox_indicatorV && XUI_ScrollBox_indicatorV.parent === that.xnode ){
		indicatorH = scrollBoxH * scrollBoxH / ( - that.scrollYMax + scrollBoxH );
		scrollBoxH -= indicatorH;

		XUI_ScrollBox_indicatorV
			[ 'css' ]({
				height : ( indicatorH | 0 ) + 'px'
			})
			[ 'animate' ]({
					'from'        : {
							y       : scrollBoxH * that.scrollY / that.scrollYMax },
					'to'          : {
							y       : scrollBoxH * y / that.scrollYMax,
							opacity : 0.5
						},
					'duration'    : opt_time,
					'easing'      : opt_easing,
					'lazyRelease' : opt_release
				});
	};
	if( that.hasHScroll && XUI_ScrollBox_indicatorH && XUI_ScrollBox_indicatorH.parent === that.xnode ){
		indicatorW = scrollBoxW * scrollBoxW / ( - that.scrollXMax + scrollBoxW );
		scrollBoxW -= indicatorW;
		XUI_ScrollBox_indicatorH
			[ 'css' ]({
				width : ( indicatorW | 0 ) + 'px'
			})
			[ 'animate' ]({
					'from'        : {
							x       : scrollBoxW * that.scrollX / that.scrollXMax },
					'to'          : {
							x       : scrollBoxW * x / that.scrollXMax,
							opacity : 0.5
						},
					'duration'    : opt_time,
					'easing'      : opt_easing,
					'lazyRelease' : opt_release
				});
	};
	
	that.scrollX   = x;
	that.scrollXEm = x / that.fontSize;
	that.scrollY   = y;
	that.scrollYEm = y / that.fontSize;
};

function X_UI_ScrollBox_onStart( e ){
	var ret = X_CALLBACK_NONE;
	
	if( !this.scrollEnabled || ( this.initiated && e.pointerType !== this.initiated ) ){
		return ret;
	};

	this.initiated	     = e.pointerType;
	this.moved		     = false;
	this.distX		     = 0;
	this.distY		     = 0;
	this.directionX      = 0;
	this.directionY      = 0;
	this.directionLocked = '';
	this.startTime       = X_Timer_now();

	// スクロール中の停止
	if( this.isInTransition ){
		this.isInTransition = false;
		//console.log( '-1-' );
		this[ 'dispatch' ]( XUI_Event.SCROLL_END );
		// TODO current位置
		XUI_ScrollBox_useCSSP ? this.xnodeSlider[ 'stop' ]() : this.xnode[ 'stop' ]();
	};

	this.startX    = this.scrollX;
	this.startY    = this.scrollY;
	this.absStartX = this.scrollX;
	this.absStartY = this.scrollY;
	this.pointX    = e.pageX;
	this.pointY    = e.pageY;
	
	console.log( 'scrollstart ' + e.pageY + e.target.className() );

	return ret | X_CALLBACK_PREVENT_DEFAULT;
};

function X_UI_ScrollBox_onMove( e ){
	var ret = X_CALLBACK_NONE,
		deltaX, deltaY, timestamp,
		newX, newY,
		absDistX, absDistY;
	// 規定以上の move でスクロール開始

//console.log( 'scrollmove ' + e.buttons + ' ' + e.button );

	if( !this.scrollEnabled || e.pointerType !== this.initiated ){
		return ret;
	};

	// gpu の用意
	if( !XUI_ScrollBox_useCSSP ? ( !this.xnode[ '_anime' ] || !this.xnode[ '_anime' ].phase ) : ( !this.xnodeSlider[ '_anime' ] || !this.xnodeSlider[ '_anime' ].phase ) ){
		//console.log( 'gpuレイヤーの用意 ' + e.pageY );
		//console.log( 'mov1 x:' + this.scrollX + ' y:' + this.scrollY );
		X_UI_ScrollBox_translate( this, this.scrollX, this.scrollY, 0, '', 300 );
		return ret;
	};

	deltaX		= e.pageX - this.pointX;
	deltaY		= e.pageY - this.pointY;
	timestamp	= X_Timer_now();

	this.pointX	= e.pageX;
	this.pointY	= e.pageY;

	this.distX	+= deltaX;
	this.distY	+= deltaY;
	absDistX	= Math.abs(this.distX);
	absDistY	= Math.abs(this.distY);
	
	// We need to move at least 10 pixels for the scrolling to initiate
	if( 300 < timestamp - this.endTime && ( absDistX < 10 && absDistY < 10 ) ){
		return ret;
	};

	// If you are scrolling in one direction lock the other
	if( !this.directionLocked ){
		if( absDistX > absDistY + this.directionLockThreshold ){
			this.directionLocked = 'h';		// lock horizontally
		} else
		if( absDistY >= absDistX + this.directionLockThreshold ){
			this.directionLocked = 'v';		// lock vertically
		} else {
			this.directionLocked = 'n';		// no lock
		};
	};

	if( this.directionLocked === 'h' ){
		deltaY = 0;
	} else
	if( this.directionLocked === 'v' ){
		deltaX = 0;
	};

	deltaX = this.hasHScroll ? deltaX : 0;
	deltaY = this.hasVScroll ? deltaY : 0;

	if( !this.moved ){
		this[ 'dispatch' ]( XUI_Event.SCROLL_BEFORE_MOVE );
		this.moved  = true;
		this.minusX = deltaX;
		this.minusY = deltaY;
		// indicator
		XUI_ScrollBox_start( this );
	} else {
		this[ 'dispatch' ]( XUI_Event.SCROLL_MOVE );
	};

	newX = this.scrollX + deltaX;// - this.minusX;
	newY = this.scrollY + deltaY;// - this.minusY;

	// Slow down if outside of the boundaries
	if( 0 < newX || newX < this.scrollXMax ){
		newX = this.bounceEnabled ? this.scrollX + ( deltaX ) / 3 : 0 < newX ? 0 : this.scrollXMax;
	};
	
	if( 0 < newY || newY < this.scrollYMax ){
		//console.log( 'slow... ' + newY + ' ' + this.scrollYMax );
		newY = this.bounceEnabled ? this.scrollY + ( deltaY ) / 3 : 0 < newY ? 0 : this.scrollYMax;
	};

	this.directionX = 0 < deltaX ? -1 : deltaX < 0 ? 1 : 0;
	this.directionY = 0 < deltaY ? -1 : deltaY < 0 ? 1 : 0;

	console.log( 'mov2 x:' + newX + ' y:' + newY );
	X_UI_ScrollBox_translate( this, newX, newY, 0, '', 300 );

	if( 300 < timestamp - this.startTime ){
		this.startTime = timestamp;
		this.startX = this.scrollX;
		this.startY = this.scrollY;
	};
	// イベントの拘束
	return ret | X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_CAPTURE_POINTER;
};

function X_UI_ScrollBox_onEnd( e ){
	var ret    = X_CALLBACK_NONE,
		time   = 0,
		easing = '',
		newX, newY,
		momentumX, momentumY,
		duration, distanceX, distanceY;
	
	//console.log( e.type + ' onend ' + XUI_Event.POINTER_OUT  );
	
	if( !this.scrollEnabled || e.pointerType !== this.initiated ){
		//console.log( e.type + ' onend 1 ' + e.pointerType + ' ' + this.initiated  );
		return ret;
	};

	delete this.isInTransition;
	delete this.initiated;
	this.endTime = X_Timer_now();			

	duration  = this.endTime - this.startTime;
	newX      = Math.round( this.scrollX );
	newY      = Math.round( this.scrollY );
	distanceX = Math.abs(newX - this.startX);
	distanceY = Math.abs(newY - this.startY);

	// reset if we are outside of the boundaries
	if( X_UI_ScrollBox_resetPosition( this, this.bounceTime ) ){
		//console.log( e.type + ' onend 2 ' + XUI_Event.POINTER_OUT  );
		return ret | X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_RELEASE_POINTER;
	};

	// we scrolled less than 10 pixels
	if( !this.moved ){
		this[ 'dispatch' ]( X_EVENT_CANCELED );
		//console.log( 'we scrolled less than 10 pixels ' + e.pageY );
		return ret | X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_RELEASE_POINTER;
	};

	// start momentum animation if needed
	if( this.momentumEnabled && duration < 300 ){
		momentumX = this.hasHScroll ?
						X_UI_ScrollBox_momentum( this.scrollX, this.startX, duration, this.scrollXMax, this.bounceEnabled ? this.boxWidth  * this.fontSize : 0, this.deceleration ) :
						{ destination: newX, duration: 0 };
		momentumY = this.hasVScroll   ?
						X_UI_ScrollBox_momentum( this.scrollY, this.startY, duration, this.scrollYMax, this.bounceEnabled ? this.boxHeight * this.fontSize : 0, this.deceleration ) :
						{ destination: newY, duration: 0 };
		newX = momentumX.destination;
		newY = momentumY.destination;
		time = Math.max( momentumX.duration, momentumY.duration ) | 0;
		this.isInTransition = true;
	} else {
		//console.log( '慣性無し' );
	};

	if( newX != this.scrollX || newY != this.scrollY ){
		// change easing function when scroller goes out of the boundaries
		if( 0 < newX || newX < this.scrollXMax || 0 < newY || newY < this.scrollYMax ){
			easing = 'quadratic';
		};

		//console.log( 'end2 x:' + newX + ' y:' + newY + '<-y:' + this.scrollY + ' t:' + time );
		this.scrollTo( newX, newY, time, easing, 1000 );
	} else {
		//console.log( 'end1 x:' + newX + ' y:' + newY );
		this.scrollTo( newX, newY, 0, '', 1000 );	// ensures that the last position is rounded
		//console.log( '-3-' );
		this[ 'dispatch' ]( XUI_Event.SCROLL_END );		
	};

	return ret | X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_RELEASE_POINTER;
};

function X_UI_ScrollBox_resetPosition( that, time ){
	var x = that.scrollX,
		y = that.scrollY;

	time = time || 0;

	if( !that.hasHScroll || 0 < that.scrollX ){
		x = 0;
	} else
	if( that.scrollX < that.scrollXMax ){
		x = that.scrollXMax;
	};

	if( !that.hasVScroll || 0 < that.scrollY ){
		y = 0;
	} else
	if( that.scrollY < that.scrollYMax ){
		y = that.scrollYMax;
	};

	if( x === that.scrollX && y === that.scrollY ){
		//console.log( 'no バウンド y:' + y + ' max:' + that.scrollYMax );
		return false;
	};

	//console.log( ' ===> resetPosition - バウンド!' );
	//console.log( '      x:' + x + ' y:' + y );
	that.scrollTo( x, y, time, that.bounceEasing, 1000 );

	return true;
};

function X_UI_ScrollBox_onAnimeEnd( e ){
	if( this.isInTransition && !X_UI_ScrollBox_resetPosition( this, this.bounceTime ) ){
		this.isInTransition = false;
		//console.log( '-2-' );
		this[ 'dispatch' ]( XUI_Event.SCROLL_END );
	};
	//console.log(' -2.1- '+this.isInTransition );
	return X_CALLBACK_NONE;
};

function X_UI_ScrollBox_momentum( current, start, time, lowerMargin, wrapperSize, deceleration ){
	var distance = current - start,
		speed    = Math.abs( distance ) / time,
		destination,
		duration;

	deceleration = deceleration === undefined ? 0.0006 : deceleration;

	destination  = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
	duration     = speed / deceleration;

	if( destination < lowerMargin ){
		destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
		distance    = Math.abs( destination - current );
		duration    = distance / speed;
	} else
	if ( destination > 0 ) {
		destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
		distance    = Math.abs( current ) + destination;
		duration    = distance / speed;
	};

	return {
		destination : Math.round( destination ),
		duration    : duration
	};
};

X.UI.ScrollBox = X.UI.ChromeBox.inherits(
	'ScrollBox',
	X_Class.NONE,
	{
		Constructor : function(){
			var supports, slider;
			
			if( XUI_ScrollBox.prototype.usableAttrs === XUI_ChromeBox.prototype.usableAttrs ){
				XUI_ScrollBox.prototype.usableAttrs = supports = XUI_Attr_createAttrDef( XUI_Attr_Support, X_UI_ScrollBox_SUPPORT_ATTRS );
		
				XUI_ScrollBox.prototype.attrClass   = XUI_Attr_preset( XUI_Box.prototype.attrClass, supports, { width  : '100%', height : '100%', bgColor : 0x111111 } );
			};
			
			var args = [
						XUI_Layout_Vertical,			
						{
							name      : 'ScrollBox-Scroller',
							role      : 'container',
							width     : 'auto',
							minWidth  : '100%',
							height    : 'auto',
							minHeight : '100%'
						}
					],
				l    = arguments.length, i = 0, j = 1,
				arg, attr;
			
			for( ; i < l; ++i ){
				arg = arguments[ i ];
				if( arg[ 'instanceOf' ] && arg[ 'instanceOf' ]( XUI_LayoutBase ) ){
					args[ 0 ] = arg;
				} else
				if( arg[ 'instanceOf' ] && arg[ 'instanceOf' ]( X.UI.AbstractUINode ) ){
					args[ ++j ] = arg;
				} else
				if( X_Type_isObject( arg ) ){
					args[ ++j ] = attr = arg;
					slider = attr.scrollSlider;
				};
			};
			
			X_Pair_create(
				this,
				XUI_ScrollBox(
					this,
					null,
					[
						slider || X.UI.VBox.apply( 0, args )
					]
				)
			);
			
			//attr && this.attr( attr );
		},
		scrollX  : function(){
			
		},
		scrollY  : function(){
			
		},
		scrollWidth : function(){
			
		},
		scrollHeight : function(){
			
		},
		scrollTo : function( nodeOrX, y ){
			
		}
	}
);

