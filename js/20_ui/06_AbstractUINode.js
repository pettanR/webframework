// TODO -> Node[ 'inherits' ]
var XUI_AbstractUINode = X_EventDispatcher[ 'inherits' ](
	'X.UI._AbstractUINode',
	X_Class.ABSTRACT,
	{
		itemData          : null,
		
		phase             : 0,
		dirty             : XUI_Dirty.CLEAN,
		
		root              : null,
		rootData          : null,
		parent            : null,
		parentData        : null,
		xnode             : null,

		usableAttrs       : XUI_Attr_Support,
		attrClass         : XUI_AttrClass,
		attrObject        : null,
		unverifiedAttrs   : null,
		
		role              : 1,
		pointerDisabled   : false,
		hovering          : false,
		
		reserveEvents     : null,
		gestureOptions       : null,
		gestureActivated     : null,
		gestureTypes         : null,
		gestureTriggered     : null,
		gestureCanceled      : null,
		gestureCurrentName   : '',
		gestureStartEvent    : null,
		gestureLastEvent     : null,
		gestureLastMoveEvent : null,

		absoluteX         : 0,
		absoluteY         : 0,
		
		boxX              : 0,
		boxY              : 0,
		boxWidth          : XUI_Attr_AUTO,
		boxWidthMin       : 0,
		boxWidthMax       : XUI_Attr_AUTO,	
		boxHeight         : XUI_Attr_AUTO,
		boxHeightMin      : 0,
		boxHeightMax      : XUI_Attr_AUTO,
		contentL          : 0,
		contentT          : 0,
		contentR          : 0,
		contentB          : 0,
		paddingL          : 0,
		paddingT          : 0,
		borderL           : 0,
		borderT           : 0,
		boxSizingOffsetLR : 0,
		boxSizingOffsetTB : 0,		
		contentWidth      : XUI_Attr_AUTO,
		contentWidthMin   : 0,
		contentWidthMax   : XUI_Attr_AUTO,
		contentWidthLast  : -1,
		contentHeight     : XUI_Attr_AUTO,
		contentHeightMin  : 0,
		contentHeightMax  : XUI_Attr_AUTO,
		contentHeightLast : -1,
		
		constraintW       : false,
		constraintH       : false,
		autoWidth         : false,
		autoHeight        : false,
		noWidth           : false,
		noHeight          : false,
		percentWidth      : false,
		percentHeight     : false,
		// :hover, :focus, :disabled
		
		initialize : function( root, rootData, parent, parentData ){
			this.root       = root;
			this.rootData   = rootData;
			this.parent     = parent;
			this.parentData = parentData;
			this.phase      = 1;
			
			this[ 'dispatch' ]( XUI_Event.INIT );
		},
		
		addToParent : function( xnodeParent ){
			var attr = this.attrObject || this.attrClass.prototype,
				usableAttrs = this.usableAttrs,
				i = 0, l = usableAttrs.length, def, k;
			
			xnodeParent && xnodeParent[ 'append' ]( this.xnode );
			
			if( attr ){
				for( k in usableAttrs ){
					def = usableAttrs[ k ];
					if( def[ 2 ] === XUI_Attr_USER.XNODE && X_Object_inObject( def.No, attr ) && attr[ def.No ] !== def[ 0 ] ){
						this.xnode[ 'css' ]( XUI_Attr_Rename[ k ] || k, XUI_AbstractUINode_createCssText( this, k ) );
					};
				};
			};
			
			this.phase = 2;
			this[ 'dispatch' ]( XUI_Event.ADDED );
		},
		
		creationComplete : function(){
			var events = this.reserveEvents,
				l, i;
			
			this.phase = 3;
			this.User[ 'dispatch' ]( XUI_Event.CREATION_COMPLETE );
			
			// html 要素が親に追加されるまで控えていたイベントの登録
			// TODO listenOnce
			if( events && ( l = events.length ) ){
				for( i = 0; i < l; ++i ){
					this.listen.apply( this, events[ i ] );
				};
				events.length = 0;
				delete this.reserveEvents;
			};			
		},
		
		/*
		 * _UINode への setAttr の他、attrClass.prototype への setAttr にも対応する
		 * 親要素が変化した場合、unverifiedAttrs を元に attrObject を再設定．
		 */
		setAttr : function( name, def, v ){
			var attrs      = XUI_attrClassProto || this.attrObject,
				propID     = def.No || def[ 5 ],
				defaultVal = XUI_attrClassProto ? attrs[ propID ] : this.attrClass.prototype[ propID ], // def[ 0 ],
				currentVal = attrs ? attrs[ propID ] : defaultVal,
				dirty      = def[ 1 ],
				user       = def[ 2 ],
				type       = def[ 3 ],
				list       = def[ 4 ],
				length     = !!( type & XUI_Attr_Type.LENGTH        ),
				minusLen   = !!( type & XUI_Attr_Type.MINUS_LENGTH  ),
				percent    = !!( type & XUI_Attr_Type.PERCENT       ),
				minusPct   = !!( type & XUI_Attr_Type.MINUS_PERCENT ),
				numerical  = !!( type & XUI_Attr_Type.NUMERICAL     ),
				auto       = !!( type & XUI_Attr_Type.AUTO          ),
				color      = !!( type & XUI_Attr_Type.COLOR         ),
				url        = !!( type & XUI_Attr_Type.URL           ),
				fontName   = !!( type & XUI_Attr_Type.FONT_NAME     ),
				flag       = !!( type & XUI_Attr_Type.BOOLEAN       ),
				combi      = !!( type & XUI_Attr_Type.COMBI         ),
				quartet    = !!( type & XUI_Attr_Type.QUARTET       ),
				_v, i, l, nodes, root, roots;
		
			if( X_Type_isString( v ) ){
				//v = v.toLowercase();
				if( url || fontName ){
					// good
				} else
				if( auto && v === 'auto' ){
					v = XUI_Attr_AUTO;
				} else
				if( list && ( _v = list[ v ] ) ){
					// good
					console.log( v + ' ' + _v );
					v = _v;
				} else
				if( ( percent || minusPct ) && v.lastIndexOf( '%' ) !== -1 && X_Type_isFinite( _v = parseFloat( v ) ) && v === _v + '%' ){
					// good
				} else
				if( ( length || minusLen ) && v.lastIndexOf( 'em' ) !== -1 && X_Type_isFinite( _v = parseFloat( v ) ) && v === _v + 'em' ){
					v = _v;
				} else				
				if( v.indexOf( ' ' ) !== -1 ){
					v = v.split( ' ' );
				} else
				if( color && X_Type_isNumber( _v = X_Node_CSS_parseColor( v ) ) ){
					v = _v;	
				} else {
					// bad
					return;
				};
			};
			
			if( ( quartet || combi ) && !X_Type_isArray( v ) ){
				v = [ v ];
			};
			
			if( X_Type_isNumber( v ) ){
				if( 
				    ( length    && ( 0 <= v ) ) ||
				    ( minusLen  && ( v <= 0 ) ) ||
				    ( percent   && 0 <= v && v <= 1 ) ||
					( minusPct  && -1 <= v && v < 0 ) ||
				    ( numerical && 0 <= v ) ||
				    ( auto      && v === XUI_Attr_AUTO ) ||
				    ( color     && ( 0 <= v && v <= 0xFFFFFF ) || ( v !== v ) ) || // isNaN
				    ( list      && list[ v ] )
				){
					// good
				} else {
					// bad
					return;
				};
			} else
			if( X_Type_isBoolean( v ) && !flag ){
				return;
			} else
			if( X_Type_isArray( v ) ){
				if( v.length <= 4 && quartet ){
					type &= ~XUI_Attr_Type.QUARTET;
					switch( v.length ){
						case 1 :
							this.setAttr( false, [ defaultVal, user, dirty, type, list,   propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 0 ] );
							break;
						case 2 :
							this.setAttr( false, [ defaultVal, user, dirty, type, list,   propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
							break;
						case 3 :
							this.setAttr( false, [ defaultVal, user, dirty, type, list,   propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 2 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
							break;
						case 4 :
							this.setAttr( false, [ defaultVal, user, dirty, type, list,   propID ], v[ 0 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 2 ] );
							this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 3 ] );
							break;
					};					
				} else
				if( v.length === 2 && combi ){
					type &= ~XUI_Attr_Type.COMBI;
					this.setAttr( false, [ defaultVal, user, dirty, type, list,   propID ], v[ 0 ] );
					this.setAttr( false, [ defaultVal, user, dirty, type, list, ++propID ], v[ 1 ] );
				} else {
					// bad
					return;
				};

				if( !XUI_attrClassProto && user === XUI_Attr_USER.XNODE && this.xnode ){
					this.xnode[ 'css' ]( XUI_Attr_Rename[ name ] || name, XUI_AbstractUINode_createCssText( this, name ) );
					//console.log( ( XUI_Attr_Rename[ name ] || name ) + ' ' + XUI_AbstractUINode_createCssText( this, name ) + ' ' + propID + ' ' + attrs[ propID ] );
				};
				return;
			};

			if( !v && v !== 0 ) v = defaultVal;
			
			// UIAttrClass の初期設定の場合、ここで終わる
			if( XUI_attrClassProto ){
				attrs[ propID ] = v;
				return;			
			};		

			if( currentVal !== v ){
				switch( propID ){
					case XUI_Attr_Support.left.No :
						this.constraintW = attrs[ XUI_Attr_Support.right.No ] !== null;
						break;
					case XUI_Attr_Support.right.No :
						this.constraintW = attrs[ XUI_Attr_Support.left.No ] !== null;
						break;
					case XUI_Attr_Support.top.No :
						this.constraintH = attrs[ XUI_Attr_Support.bottom.No ] !== null;
						break;
					case XUI_Attr_Support.bottom.No :
						this.constraintH = attrs[ XUI_Attr_Support.top.No ] !== null;
						break;
					case XUI_Attr_Support.width.No :
						this.autoWidth    = v === XUI_Attr_AUTO;
						this.percentWidth = X_Type_isString( v );
						break;
					case XUI_Attr_Support.height.No :
						this.autoHeight    = v === XUI_Attr_AUTO;
						this.percentHeight = X_Type_isString( v );
						break;
				};
				
				if( defaultVal === v ){
					if( attrs ) delete attrs[ propID ];
				} else {
					if( !attrs ) attrs = this.attrObject = new this.attrClass;
					attrs[ propID ] = v;
				};
				
				if( name && user === XUI_Attr_USER.UINODE ){
					this[ name ] = v;
				};
				
				if( name && user === XUI_Attr_USER.XNODE && this.xnode ){
					this.xnode[ 'css' ]( XUI_Attr_Rename[ name ] || name, XUI_AbstractUINode_createCssText( this, name ) );
					//console.log( ( XUI_Attr_Rename[ name ] || name ) + ' ' + XUI_AbstractUINode_createCssText( this, name ) + ' ' + propID + ' ' + attrs[ propID ] );
				} else
				if( this.dirty < dirty ) this.dirty = dirty;
			};
		},

		getAttr : function( name ){
			var attrs   = this.attrObject || this.attrClass.prototype || XUI_AttrClass,
				support = this.usableAttrs[ name ],
                v, type, list;
			if( !support ) return;
			
			if( name.indexOf( 'border' ) === 0 ){
				name = name.substr( 6 );
				return [ this.getAttr( 'borderTop' + name ), this.getAttr( 'borderRight' + name ), this.getAttr( 'borderBottom' + name ), this.getAttr( 'borderLeft' + name ) ];
			};
			
			type = support[ 3 ];
			// Unit
			if( type & XUI_Attr_Type.QUARTET ){
				return [ this.getAttr( name + 'Top' ), this.getAttr( name + 'Right' ), this.getAttr( name + 'Bottom' ), this.getAttr( name + 'Left' ) ];
			};
			if( type & XUI_Attr_Type.COMBI   ) return [ v, data[ ++propID ] ];
			
			v    = attrs[ support.No ];		
			if( type & XUI_Attr_Type.AUTO && v === XUI_Attr_AUTO ) return 'auto'; 
			
			list = support[ 4 ];
			if( list ) return list[ v ];
			
			if( type & XUI_Attr_Type.COLOR && X_Type_isNumber( v ) ) return v;
			if( !( type & XUI_Attr_Type.NUMERICAL ) && X_Type_isNumber( v ) ) return v + 'em';
			return v;
		},
		
		// em, px, %
		getAttrWithUnit : function( prop, unit ){
			
		},

		_remove : function(){
			switch( this.phase ){
				case 4:
				case 3:

				case 2:
					
				case 1:
					this.xnode[ 'remove' ]();
				
					delete this.root;
					delete this.rootData;
					delete this.parent;
					delete this.parentData;
					
					delete this.phase;
			};
			
		},
		//killed

		calculate : function( isNeedsDetection, x, y, allowedW, allowedH ){
			this.preMesure( allowedW, allowedH );
			
			this.noWidth  = this.boxWidth === XUI_Attr_AUTO;
			this.noHeight = this.boxHeight === XUI_Attr_AUTO;
			
			if( this.noWidth || this.noHeight ){
				this.mesure();
				this.postMesure();
			};
			
			if( !isNeedsDetection ){
				this.boxX += x;
				this.boxY += y;			
			};
		},
		
		/*
		 * X_Node_BoxModel の情報を引きながら top,left,width,height,padding,border の設定
		 */
		updateLayout : function(){
			var x = this.boxX + ( this.parentData ? this.parentData.paddingL : 0 ),
				y = this.boxY + ( this.parentData ? this.parentData.paddingT : 0 ),
				w = X_UA[ 'IE' ] < 6 ? this.boxWidth  : this.contentWidth, // IE6 の互換モードも
				h = X_UA[ 'IE' ] < 6 ? this.boxHeight : this.contentHeight;

			this.xnode
				[ 'css' ]( 'left',        x ? x + 'em' : 0 ) // 親の padding 分ずらす
				[ 'css' ]( 'top',         y ? y + 'em' : 0 ) // 親の padding 分ずらす
				[ 'css' ]( 'width',       this.noWidth  ? 'auto' : w ? w + 'em' : 0 )
				[ 'css' ]( 'height',      this.noHeight ? 'auto' : h ? h + 'em' : 0 )
				[ 'css' ]( 'padding',     XUI_AbstractUINode_createCssText( this, 'padding' ) ) // TODO 不要? その分 w, h に足す
				[ 'css' ]( 'borderWidth', XUI_AbstractUINode_createCssText( this, 'borderWidth' ) );
		},

		/*
		 * 親の サイズを元に自身のサイズを計算していく
		 */
		preMesure : function( allowedW, allowedH ){
			var attrs = this.attrObject || this.attrClass.prototype || XUI_AttrClass,
				box   = attrs[ XUI_Attr_Support.sizing.No ],
				min, max,
				boxL, boxT, boxR, boxB,
				contentW, contentH, boxMinus,
				paddingT, paddingR, paddingB, paddingL,
				borderT, borderR, borderB, borderL;
			
			// Width が確定するパターン
			// 自身が constraintW の場合 親が AUTO ではない
			// 自身が constraintW でない場合自身が  AUTO はなくかつ親 が AUTO の場合 or 自身は % でない
			
			paddingR = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 1 ], allowedW );
			paddingL = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 3 ], allowedW );
			borderR  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No + 1 ], allowedW );
			borderL  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No + 3 ], allowedW );
			boxMinus = 0;
			switch( box ){
				case 3 : // border-box
					 boxMinus -= borderR + borderL;
				case 2 : // padding-box
					 boxMinus -= paddingR + paddingL;
				// case 1 : // content-box
			};
			this.contentL = borderL + paddingL;
			this.contentR = borderR + paddingR;
			this.paddingL = paddingL;
			this.borderL  = borderL;
			
			if( this.constraintW ? allowedW !== XUI_Attr_AUTO : !this.autoWidth && ( allowedW !== XUI_Attr_AUTO || !this.percentWidth ) ){
				if( this.constraintW ){ // 制約レイアウト
					contentW = allowedW - ( boxL = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.left.No ], allowedW ) ) - ( boxR = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.right.No ], allowedW ) );
				} else {
					contentW = XUI_AbstractUINode_calcFinalValue( attrs[ XUI_Attr_Support.width.No ], attrs[ XUI_Attr_Support.minWidth.No ], attrs[ XUI_Attr_Support.maxWidth.No ], allowedW );					
				};
				this.contentWidth      = contentW + boxMinus;
				this.boxWidth          = this.contentWidth + this.contentL + this.contentR;
				this.boxSizingOffsetLR = boxMinus;
				delete this.contentWidthMin;
				delete this.contentWidthMax;
				delete this.boxWidthMin;
				delete this.boxWidthMax;
			} else {	
				this.contentWidthMin   = XUI_AbstractUINode_ceil( XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.minWidth.No ], allowedW ) + boxMinus );
				this.contentWidthMax   = XUI_AbstractUINode_ceil( XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.maxWidth.No ], allowedW ) + boxMinus );
				this.boxWidthMin       = this.contentWidthMin + this.contentL + this.contentR;
				this.boxWidthMax       = this.contentWidthMax + this.contentL + this.contentR;
				this.contentWidth      = this.contentWidthMin;
				this.boxWidth          = this.boxWidthMin;
				this.boxSizingOffsetLR = boxMinus;
			};
			
			paddingT  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 0 ], allowedH );// paddingTRBL の % 指定は 最大幅に対して TB でも幅に対して
			paddingB  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 2 ], allowedH );
			borderT   = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No  + 0 ], allowedH );
			borderB   = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No  + 2 ], allowedH );
			boxMinus = 0;
			switch( box ){
				case 3 : // border-box
					 boxMinus -= borderT + borderB;
				case 2 : // padding-box
					 boxMinus -= paddingT + paddingB;
				// case 1 : // content-box
			};
			this.contentT = borderT + paddingT;
			this.contentB = borderB + paddingB;
			this.paddingT = paddingT;
			this.borderT  = borderT;
			
			// Height
			if( this.constraintH ? allowedH !== XUI_Attr_AUTO : !this.autoHeight && ( allowedH !== XUI_Attr_AUTO || !this.percentHeight ) ){
				if( this.constraintH ){ // 制約レイアウト
					contentH = allowedH - ( boxT = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.top.No ], allowedH ) ) - ( boxB = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.bottom.No ], allowedH ) );
				} else {
					contentH = XUI_AbstractUINode_calcFinalValue( attrs[ XUI_Attr_Support.height.No ], attrs[ XUI_Attr_Support.minHeight.No ], attrs[ XUI_Attr_Support.maxHeight.No ], allowedH );
				};			
				this.contentHeight     = contentH + boxMinus;
				this.boxHeight         = this.contentHeight + this.contentT + this.contentB; // padding-box の場合 border だけ足される
				this.boxSizingOffsetTB = boxMinus;
				delete this.contentHeightMin;
				delete this.contentHeightMax;
				delete this.boxHeightMin;
				delete this.boxHeightMax;
			} else {
				this.contentHeightMin  = XUI_AbstractUINode_ceil( XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.minHeight.No ], allowedH ) + boxMinus );
				this.contentHeightMax  = XUI_AbstractUINode_ceil( XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.maxHeight.No ], allowedH ) + boxMinus );				
				this.boxHeightMin      = this.contentHeightMin + this.contentT + this.contentB;
				this.boxHeightMax      = this.contentHeightMax + this.contentT + this.contentB;
				this.contentHeight     = this.contentHeightMin;
				this.boxHeight         = this.boxHeightMin;
				this.boxSizingOffsetTB = boxMinus;
			};
			
			// x
			if( this.parentData && this.parentData.layout.overrideAttrsForChild.left ){
				if( this.constraintW || attrs[ XUI_Attr_Support.right.No ] === null ){
					this.boxX = ( boxL || boxL === 0 ) ? boxL : XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.left.No ], allowedW );
				} else {
					this.boxX = allowedW - this.boxWidth - ( ( boxR || boxR === 0 ) ? boxR : XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.right.No ], allowedW ) );
				};
			} else {
				delete this.boxX;
			};
			
			// y
			if( this.parentData && this.parentData.layout.overrideAttrsForChild.top ){
				if( this.constraintH || attrs[ XUI_Attr_Support.bottom.No ] === null ){
					this.boxY = ( boxT || boxT === 0 ) ? boxT : XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.top.No ], allowedH );
				} else {
					this.boxY = allowedH - this.boxHeight - ( ( boxB || boxB === 0 ) ? boxB : XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.bottom.No ], allowedH ) );
				};
			} else {
				delete this.boxY;
			};
		},
		
		/*
		 * 描画・計測を行って、contentSize の決定
		 */
		mesure : function(){
			var dirty = this.dirty,
				w, _w, h, xnode;
			
			if( dirty === XUI_Dirty.CLEAN ){
				if( this.percentWidth || this.percentHeight ){
					
				};
			};
			
			switch( dirty ){
				
				case XUI_Dirty.CONTENT : // コンテンツが変更された
				case XUI_Dirty.FONT    : // フォントサイズが変更された
					delete this.contentWidthLast;
					delete this.contentHeightLast;
					
				case XUI_Dirty.LAYOUT : // レイアウトの再計算が必要
				
				default : // TODO レイアウト指定が不正な場合 bgcolor を変更、これ以下のレイアウトの中止
				
					w     = this.contentWidth;
					h     = this.contentHeight;
					xnode = this.xnode;
					
					/* http://web-designs.seesaa.net/article/188400668.html
					 * min-width の値が max-width の値より大きい場合は、max-width の値は min-width の値に設定される。
					 * 
					 * テキストノードがあり
					 * 1. contentWidth === AUTO
					 *     style を更新して contentWidth の決定
					 *     min or max に引っかかったら style 更新
					 *     contentHeight === AUTO の場合
					 *     textHeight の決定
					 *     contentHeight !== AUTO の場合 scrollHeight のみ更新
					 * 2. contentHeight === AUTO かつ 
					 *     コンテンツの高さの再取得が必要( contentWidth が最終計測時の contentWidth と一致 かつ フォント・コンテンツに変更無し の場合再取得不要)
					 *      style を更新して contentHeight の決定
					 *     必要でない
					 * 3. content のサイズがすでに決定している
					 *     コンテンツの高さの再取得が必要
					 *     必要でない
					 */
					if( xnode[ '_xnodes' ] && xnode[ '_xnodes' ].length ){
						if( w === XUI_Attr_AUTO ){
							
							w = _w = XUI_AbstractUINode_ceil( xnode[ 'css' ]( 'width', 'auto' )[ 'clientWidth' ]() / X_Node_CSS_getCharSize( xnode ) );

							if( this.contentWidthMax < w - this.boxSizingOffsetLR ){
								this.noWidth = false;
								w = this.contentWidthMax + this.boxSizingOffsetLR;
							};
							if( w - this.boxSizingOffsetLR < this.contentWidthMin ){
								this.noWidth = false;
								w = this.contentWidthMin + this.boxSizingOffsetLR;
							};

							if( h === XUI_Attr_AUTO ){
								w !== _w && xnode[ 'css' ]( 'width', w + 'em' );
								h = XUI_AbstractUINode_ceil( xnode[ 'css' ]( 'height', 'auto' )[ 'scrollHeight' ]() / X_Node_CSS_getCharSize( xnode ) );
								w !== _w && xnode[ 'css' ]( 'width', 'auto' );
							};

							this.contentWidthLast = this.contentWidth = w;

						} else
						if( h === XUI_Attr_AUTO ){
							if( w !== this.contentWidthLast ){
								xnode[ 'css' ]( 'width', w + 'em' );								
								this.contentWidthLast = w;
								
								// ie8 clientHeight, ff scrollHeight & clientHeight
								h = XUI_AbstractUINode_ceil( xnode[ 'css' ]( 'height', 'auto' )[ 'scrollHeight' ]() / X_Node_CSS_getCharSize( xnode ) );
							} else {
								h = this.contentHeightLast === -1 ?
										XUI_AbstractUINode_ceil( xnode[ 'css' ]( 'height', 'auto' )[ 'scrollHeight' ]() / X_Node_CSS_getCharSize( xnode ) ) :
										this.contentHeightLast;
							};
						} else
						if( dirty !== XUI_Dirty.LAYOUT ){
							this.contentWidth  = this.contentWidthLast  = w;
							h = XUI_AbstractUINode_ceil( xnode[ 'css' ]( 'height', 'auto' )[ 'scrollHeight' ]() / X_Node_CSS_getCharSize( xnode ) );
						};
						
						if( this.contentHeightMax < h - this.boxSizingOffsetTB ){
							this.noHeight = false;
							h = this.contentHeightMax + this.boxSizingOffsetTB;
						};
						if( h - this.boxSizingOffsetTB < this.contentHeightMin ){
							this.noHeight = false;
							h = this.contentHeightMin + this.boxSizingOffsetTB;
						};
						
						this.contentHeight = this.contentHeightLast = h;
						
					} else {
						// コンテンツを持たないため基本のサイズは0
						if( w === XUI_Attr_AUTO ) this.contentWidth  = w = 0 < this.contentWidthMin  ? this.contentWidthMin  : 0;
						if( h === XUI_Attr_AUTO ) this.contentHeight = h = 0 < this.contentHeightMin ? this.contentHeightMin : 0;
						this.noWidth = this.noHeight = false;
					};
					
					delete this.dirty;
					break;			
				//case XUI_Dirty.PAINT : // 再描画のみ必要
				//	break;
			};
		},
		/*
		 * 自身の contentWidth, contentHeight を元に AUTO な width, height を確定していく
		 */
		postMesure : function(){
			var	attrs = this.attrObject || this.attrClass.prototype || XUI_AttrClass,
				box   = attrs[ XUI_Attr_Support.sizing.No ],
				contentW, contentH,
				contentPlus,
				paddingT, paddingR, paddingB, paddingL,
				borderT, borderR, borderB, borderL,
				min, max;
				
			// Width
			if( this.boxWidth === XUI_Attr_AUTO ){
				contentW = this.contentWidth;
				paddingR = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 1 ], contentW );					
				paddingL = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 3 ], contentW );					
				borderR  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No + 1 ], contentW );
				borderL  = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No + 3 ], contentW );
				contentPlus = 0;
				switch( box ){
					case 1 : // content-box
						 contentPlus  = paddingR + paddingL;
					case 2 : // padding-box
						 contentPlus += borderR + borderL;
					// case 3 : // border-box
				};
				
				if( !this.constraintW ){
					contentW += contentPlus;
					min = this.boxWidthMin = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.minWidth.No ], contentW );
					max = this.boxWidthMax = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.maxWidth.No ], contentW );
					if( contentW < min && contentPlus < min ){
						this.contentWidth = min - contentPlus;
					} else
					if( max < contentW && contentPlus < max ){
						this.contentWidth = max - contentPlus;
					};
				};
				this.contentL = borderL + paddingL;
				this.contentR = borderR + paddingR;
				this.paddingL = paddingL;
				this.borderL  = borderL;
				this.boxWidth = this.contentWidth + this.contentL + this.contentR;
			};
			// Height
			if( this.boxHeight === XUI_Attr_AUTO ){
				contentH    = this.contentHeight;
				paddingT    = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 0 ], contentH );// paddingTRBL の % 指定は 最大幅に対して TB でも幅に対して
				paddingB    = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.padding.No + 2 ], contentH );
				borderT     = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No  + 0 ], contentH );
				borderB     = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.borderWidth.No  + 2 ], contentH );
				contentPlus = 0;
				switch( box ){
					case 1 : // content-box
						 contentPlus  = paddingT + paddingB;
					case 2 : // padding-box
						 contentPlus += borderT + borderB;
					// case 3 : // border-box
				};
				if( !this.constraintH ){
					contentH += contentPlus;
					min = this.boxHeightMin = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.minHeight.No ], contentH );
					max = this.boxHeightMax = XUI_AbstractUINode_calcValue( attrs[ XUI_Attr_Support.maxHeight.No ], contentH );
					if( contentH < min && contentPlus < min ){
						this.contentHeight = min - contentPlus;
					} else
					if( max < contentH && contentPlus < max ){
						this.contentHeight = max - contentPlus;
					};
				};
				this.contentT  = borderT + paddingT;
				this.contentB  = borderB + paddingB;
				this.paddingT  = paddingT;
				this.borderT   = borderT;
				this.boxHeight = this.contentHeight + this.contentT + this.contentB;
			};
		},

		// TODO fontsize が変わることもある
		capcher : function( x, y ){
			if( this.pointerDisabled ) return false;
			
			x -= this.boxX;
			y -= this.boxY;

			if( 0 <= x && x < this.boxWidth && 0 <= y && y < this.boxHeight ){
				!this.hovering && ( XUI_UINODES_HOVER[ XUI_UINODES_HOVER.length ] = this );
				XUI_uinodeTarget = this;
				//console.log( 'hit ' + this.xnode.className() )
				return true;
			};
		},
		
		listen : XUI_$UINodeBase_listen,
		
		unlisten : XUI_$UINodeBase_unlisten,
		
		setItemData : function( itemData ){
			if( this.itemData === itemData ) return;

			this.itemData = itemData;

			this[ 'dispatch' ]( { type : XUI_Event.ITEMDATA_CHANGED, itemData : itemData } );
			// itemData && itemData.listen( X_Event_CHANGED )
			// dataFeild dataFormatter dataValidator
			
			// itemData.listen( X_Event_CHANGED ) -> this[ 'dispatch' ]( UI_Event.ITEMDATA_UPDATED );
		}
		
	}
);

function XUI_AbstractUINode_createCssText( that, name ){
	var attrs      = that.attrObject || that.attrClass.prototype || XUI_AttrClass,
		def        = that.usableAttrs[ name ],
		no         = def.No,
		v          = attrs[ def.No ],
		type       = def[ 3 ],
		list       = def[ 4 ],
		flag       = !!( type & XUI_Attr_Type.BOOLEAN ),
		combi      = !!( type & XUI_Attr_Type.COMBI   ),
		quartet    = !!( type & XUI_Attr_Type.QUARTET );

	if( quartet ){
		if( attrs[ no + 1 ] === attrs[ no + 3 ] ){
			if( v === attrs[ no + 2 ] ){
				if( v === attrs[ no + 1 ] ){
					return XUI_AbstractUINode_createCssValue( v, type, list );
				};
				return [
					XUI_AbstractUINode_createCssValue( v, type, list ),
					XUI_AbstractUINode_createCssValue( attrs[ no + 1 ], type, list )
				].join( ' ' );
			};
			return [
				XUI_AbstractUINode_createCssValue( v, type, list ),
				XUI_AbstractUINode_createCssValue( attrs[ no + 1 ], type, list ),
				XUI_AbstractUINode_createCssValue( attrs[ no + 2 ], type, list )
			].join( ' ' );
		};
		return [
			XUI_AbstractUINode_createCssValue( v, type, list ),
			XUI_AbstractUINode_createCssValue( attrs[ no + 1 ], type, list ),
			XUI_AbstractUINode_createCssValue( attrs[ no + 2 ], type, list ),
			XUI_AbstractUINode_createCssValue( attrs[ no + 3 ], type, list )
		].join( ' ' );
	} else
	if( combi ){
		return [
			XUI_AbstractUINode_createCssValue( v, type, list ),
			XUI_AbstractUINode_createCssValue( attrs[ no + 1 ], type, list )
		].join( ' ' );
	} else
	if( flag ){
		return v ? list : 'normal'; // 
	};
	return XUI_AbstractUINode_createCssValue( v, type, list );
};

function XUI_AbstractUINode_createCssValue( v, type, list ){
	var length     = !!( type & XUI_Attr_Type.LENGTH        ),
		minusLen   = !!( type & XUI_Attr_Type.MINUS_LENGTH  ),
		percent    = !!( type & XUI_Attr_Type.PERCENT       ),
		minusPct   = !!( type & XUI_Attr_Type.MINUS_PERCENT ),
		numerical  = !!( type & XUI_Attr_Type.NUMERICAL     ),
		auto       = !!( type & XUI_Attr_Type.AUTO          ),
		color      = !!( type & XUI_Attr_Type.COLOR         ),
		url        = !!( type & XUI_Attr_Type.URL           ),
		fontName   = !!( type & XUI_Attr_Type.FONT_NAME     );
	
	if( X_Type_isNumber( v ) ){
		if( auto && v === XUI_Attr_AUTO ) return 'auto';
		if( length || minusLen ) return v ? v + 'em' : 0;
		if( numerical ) return v;
		if( list && list[ v ] ) return list[ v ];
		if( color ){
			if( v < 0x100000 ){
				v = '00000' + v.toString( 16 );
				return '#' + v.substr( v.length - 6 );
			} else
			if( v !== v ){ // iSNaN
				return 'none';
			};
			return '#' + v.toString( 16 );
		};
	};
	if( X_Type_isString( v ) ){
		if( percent || minusPct || url || fontName ) return v;
	};
};

function XUI_AbstractUINode_calcValue( styleValue, srcValue ){
	/*
	 * String の場合は必ず %
	 */	
	if( X_Type_isString( styleValue ) ){
		return srcValue * parseFloat( styleValue ) / 100;
	};
	if( !X_Type_isNumber( styleValue ) ) return 0;
	return styleValue;
};

function XUI_AbstractUINode_calcFinalValue( styleValue, styleMin, styleMax, srcValue ){
	var v    = XUI_AbstractUINode_calcValue( styleValue, srcValue ),
		min  = XUI_AbstractUINode_calcValue( styleMin, srcValue ),
		max  = XUI_AbstractUINode_calcValue( styleMax, srcValue );
	return v <= min ? min : max <= v ? max : v;
};
function XUI_AbstractUINode_ceil( v ){
	if( 0 <= v ){
		return ( v * 10 + 0.999 | 0 ) / 10;
	};
	return ( -v * 10 + 0.999 | 0 ) / -10;
};

X.UI.AbstractUINode = X_Class_create(
	'AbstractUINode',
	X_Class.ABSTRACT,
	{
		parent : function(){
			return X_Pair_get( this ).parent;
		},
		root : function(){
			return X_Pair_get( this ).root;
		},
		
		/*
		 * unverifiedAttrs に全ての指定を控える
		 * サポートされていない場合は無視される．親のレイアウトによって変わる
		 */
		attr : function( nameOrObject, valueOrUnit ){
			var p = X_Pair_get( this ),
				layout, k, def, attrs, v;
			if( nameOrObject && X_Type_isObject( nameOrObject ) ){
				// setter
				layout = p.parentData && p.parentData.layout.overrideAttrsForChild; // root には parent がない
				for( k in nameOrObject ){
					if( X_EMPTY_OBJECT[ k ] ) continue;
					// 親のレイアウトマネージャの許可しない
					if( layout && !layout[ k ] ){
						continue;
					};
					if( def = p.usableAttrs[ k ] ){
						p.setAttr( k, def, nameOrObject[ k ] );
					};
				};
			} else
			if( X_Type_isString( nameOrObject ) && ( def = p.usableAttrs[ nameOrObject ] ) ){
				if( valueOrUnit !== undefined ){
					if( 'em,%'.indexOf( valueOrUnit ) === -1 ){
						// setter
						p.setAttr( nameOrObject, def, valueOrUnit );
					} else {
						// getter with unit
						return p.getAttrWithUnit( nameOrObject, valueOrUnit );
					};
				};
				// getter
				if( attrs = ( p.attrObject || p.attrClass.prototype || XUI_AttrClass ) ){
					def = p.usableAttrs[ nameOrObject ];
					return def && attrs[ def.No ];
				};
				return v;
			};
			return this;
		},
		
		listen : function( type, arg1, arg2, arg3 ){
			var pair = X_Pair_get( this );
			
			( !arg1 || !arg1.cbKind ) && ( arg1 = X_Closure_classifyCallbackArgs( arg1, arg2, arg3, this ) );
			
			if( arg1.cbKind === X_CLOSURE_FUNC_ONLY ){
				pair[ 'listen' ].apply( pair, [ type, this, arg1.func, arg1.supplement ] );
			} else {
				pair[ 'listen' ]( type, arg1.context, arg1.func, arg1.supplement );
			};
			return this;
		},
		listenOnce : function( type, arg1, arg2, arg3 ){
			X_Pair_get( this )[ 'listenOnce' ]( type, arg1, arg2, arg3 );
			return this;
		},
		listening : function( type, arg1, arg2, arg3 ){
			return X_Pair_get( this )[ 'listening' ]( type, arg1, arg2, arg3 );
		},
		unlisten : function( type, arg1, arg2, arg3 ){
			var pair = X_Pair_get( this );
			
			( !arg1 || !arg1.cbKind ) && ( arg1 = X_Closure_classifyCallbackArgs( arg1, arg2, arg3, this ) );
			
			if( arg1.cbKind === X_CLOSURE_FUNC_ONLY ){
				pair[ 'unlisten' ].apply( pair, [ type, this, arg1.func, arg1.supplement ] );
			} else {
				pair[ 'unlisten' ]( type, arg1.context, arg1.func, arg1.supplement );
			};
			return this;
		},
		dispatch : function( e ){
			return X_Pair_get( this )[ 'dispatch' ]( e );
		},
			
		nextNode : function(){
			
		},
		prevNode : function(){
			
		},
		nodeIndex : function( v ){
			var data = X_Pair_get( this );
			if( typeof v === 'number' ){
				// data.nodeIndex( v );
				return this;
			};
			return data.parentData ? data.parentData.nodes.indexOf( data ) : 0;
		},
		displayIndex : function(){
			
		},
		getX : function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).boxX;
		},
		getY : function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).boxY;
		},
		getAbsoluteX : function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).absoluteX;
		},
		getAbsoluteY: function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).absoluteY;
		},
		getWidth : function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).boxWidth;
		},
		getHeight : function(){
			// dirty の場合、rootData.calculate
			return X_Pair_get( this ).boxHeight;
		},
		
		/*
		 * Repeater に於いて、繰り返されるアイテムの元(itemRenderer)からの複製に使用
		 */
		clone : function( opt_cloneListener ){
			var newNode,
				//newPair = X_Pair_get( newNode ),
				pair    = X_Pair_get( this ),
				attr, listeners, type, list, i, l, k, def, f;

			// attr もコピー
			if( pair.attrObject ){
				attr = {};
				for( k in pair.usableAttrs ){
					def = pair.usableAttrs[ k ];
					attr[ k ] = pair.attrObject[ def.No ];
				};
				newNode = this.constructor( attr );
			};

			// handleEvent 等の拡張されたオブジェクトもコピーする!
			for( k in this ){
				if( this[ k ] !== newNode[ k ] && !newNode[ k ] ) newNode[ k ] = this[ k ];
			};
			
			// User.UINODE な値は pair にコピーされているのでこれをコピー
			for( k in pair ){
				//pair[ k ] !== newPair[ k ] && !newPair[ k ] && console.log( k );
				//if( pair[ k ] !== newPair[ k ] && !newPair[ k ] && k !== 'attrObject' && k !== '_listeners' ){
					//newPair[ k ] = pair[ k ];
					//console.log( k );
				//};
			};
			

			
			// listener もコピーする!
			if( opt_cloneListener && ( listeners = pair[ '_listeners' ] ) ){
				for( type in listeners ){
					list = listeners[ type ];
					for( i = 0, l = list.length; i < l; ++i ){
						f = list[ i ];
						switch( f.cbKind ){
							case X_CLOSURE_THIS_FUNC :
								newNode[ f.once ? 'listenOnce' : 'listen' ]( type, f.context === this ? newNode : f.context, f.func, f.supplement );
								break;
							case X_CLOSURE_HANDLEEVENT :
								newNode[ f.once ? 'listenOnce' : 'listen' ]( type, f.context === this ? newNode : f.context, f.supplement );
								break;
							/*
							case X_CLOSURE_FUNC_ONLY :
								if( f.lock ){
									newNode[ 'listen' ]( type, f.func, f.supplement );
								} else {
									newNode[ f.once ? 'listenOnce' : 'listen' ]( type, f.func, f.supplement );
								};
								break;
							default :
								newNode[ 'listen' ]( type, f );
								break; */
						};
					};				
				};
			} else
			if( opt_cloneListener && ( list = this.reserveEvents ) ){
				for( i = 0, l = list.length; i < l; ++i ){
					f = list[ i ];
					newNode[ f.once ? 'listenOnce' : 'listen' ]( f[ 0 ], newNode, f[ 1 ], f[ 2 ] );
				};	
			};
			
			return newNode;
		}
	}
);

