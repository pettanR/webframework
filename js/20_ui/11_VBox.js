var XUI_Layout_Vertical = X[ 'UI' ][ 'Layout' ][ 'Vertical' ] = XUI_createLayout( {
	
	name : 'VerticalLayout',
	
	/*
	 * 
	 */
	overrideAttrsForSelf : {
		selectable  : false,
		role        : [ 0,             XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.LIST, 'none,chrome,container' ],
		width       : [ '100%',        XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		height      : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		childWidth  : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		childHeight : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		gapY        : [ 0,             XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH ]
	},
	
	overrideAttrsForChild : {
		left   : true,
		right  : true,
		top    : false,
		bottom : false
	},
	
	calculate : function( data, isNeedsDetection, x, y, w, h ){
		var ret     = isNeedsDetection,
			attrs   = data.attrObject || data.attrClass.prototype,
			uinodes = data.uinodes,
			l       = uinodes && uinodes.length,
			minFlag = false,
			childW, childH, gapY,
			i, _x, _y, _w, node,
            contentW, contentH, autoW, autoH, detectionPhase;

		data.preMesure( w, h );
		
		contentW       = data.contentWidth;
		contentH       = data.contentHeight;
		autoW          = contentW === XUI_Attr_AUTO;
		autoH          = contentH === XUI_Attr_AUTO;
		detectionPhase = autoW || autoH;
		gapY           = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.gapY.No ], contentH );
		childW         = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childWidth.No ], contentW );
		childH         = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childHeight.No ], contentH );
		_x             = data.contentL;
		_y             = 0; //data.contentT;

		if( !detectionPhase ) ret = false;

		if( l ){
			_w = 0;
			for( i = 0; i < l; ++i ){
				node = uinodes[ i ];
				node.calculate( detectionPhase, 0, _y, contentW, childH );
				_y += node.boxHeight + gapY;
				//console.dir( node );
				// 概算のみ, 子要素の最大幅を調べる _w
				if( autoW ){
					if( node.boxWidth !== XUI_Attr_AUTO ){
						w = node.boxWidth;
					} else
					if( node.boxWidthMin !== XUI_Attr_AUTO ){
						w = node.boxWidthMin;
						minFlag = true;
					} else {
						w = 0;
					};
					if( _w < w ) _w = w;
				};
			};
			_y -= gapY;
		} else {
			_y = data.contentHeightMin !== XUI_Attr_AUTO ? data.contentHeightMin : 0;
		};

		if( detectionPhase ){
			if( autoW ) data.contentWidth  = _w;
			if( autoH ) data.contentHeight = _y;// - data.contentT;
			_y = 0;//data.contentT;
			for( i = 0; i < l; ++i ){
				node = uinodes[ i ];
				node.calculate( false, 0, _y, data.contentWidth, data.contentHeight );
				_y += node.boxHeight + gapY;
			};
			data.postMesure();
		};
		
		if( !isNeedsDetection ){
			data.boxX += x;
			data.boxY += y;
		};
		return !ret;
	}
});

var XUI_VBox;

X.UI.VBox = X.UI.Box.inherits(
	'VBox',
	X_Class.NONE,
	{
		Constructor : function(){
			var supports;
			
			if( !XUI_VBox ){
				supports = XUI_Attr_createAttrDef( XUI_Box.prototype.usableAttrs, XUI_Layout_Vertical.overrideAttrsForSelf );
				
				XUI_VBox = XUI_Box.inherits(
							{
								layout       : XUI_Layout_Vertical,
								usableAttrs : supports,
								attrClass    : XUI_Attr_preset( XUI_Box.prototype.attrClass, supports, {
										gapY       : '0.2em',
										childWidth : '100%'
									} )
							}
						);
			};
			X_Pair_create( this, XUI_VBox( this, XUI_Layout_Vertical, arguments ) );
		}
	});

