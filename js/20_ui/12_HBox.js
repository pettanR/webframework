var XUI_Layout_Horizontal = X[ 'UI' ][ 'Layout' ][ 'Horizontal' ] = XUI_createLayout( {	
	name : 'HorizontalLayout',
	
	overrideAttrsForSelf : {
		selectable  : false,
		role        : [ 0,              XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.LIST, 'none,chrome,container' ],
		width       : [ '100%',         XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		height      : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		childWidth  : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		childHeight : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
		gapX        : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH ]
	},
	
	overrideAttrsForChild : {
		left   : false,
		right  : false,
		top    : true,
		bottom : true
	},
	
	calculate : function( data, isNeedsDetection, x, y, w, h ){
		var ret     = isNeedsDetection,
			attrs   = data.attrObject || data.attrClass.prototype,
			uinodes = data.uinodes,
			l       = uinodes && uinodes.length,
			i,
            contentW, contentH, autoW, autoH, detectionPhase, gapX,		
			childW, childH, _x, _y, _h, node, minFlag;

		data.preMesure( w, h );
		
		contentW       = data.contentWidth;
		contentH       = data.contentHeight;
		autoW          = contentW === XUI_Attr_AUTO;
		autoH          = contentH === XUI_Attr_AUTO;
		detectionPhase = autoW || autoH;
		gapX           = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.gapX.No ], contentW );
		childW         = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childWidth.No ], contentW );
		childH         = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childHeight.No ], contentH );
		_x             = 0; //data.contentL;
		_y             = 0; //data.contentT;		

		if( !detectionPhase ) ret = false;

		if( l ){
			_h = 0;
			for( i = 0; i < l; ++i ){
				node = uinodes[ i ];
				node.calculate( detectionPhase, _x, 0, childW, childH );
				_x += node.boxWidth + gapX;
				if( autoH ){
					if( node.boxHeight !== XUI_Attr_AUTO ){
						h = node.boxHeight;
					} else
					if( node.boxHeightMin !== XUI_Attr_AUTO ){
						h = node.boxHeightMin;
						minFlag = true;
					} else {
						h = 0;
					};
					if( _h < h ) _h = h;				
				};
			};
			_x -= gapX;
		} else {
			_h = data.contentHeightMin !== XUI_Attr_AUTO ? data.contentHeightMin : 0;
		};

		if( detectionPhase ){
			if( autoW ) data.contentWidth  = _x;
			if( autoH ) data.contentHeight = _h;
			_x = 0; //data.contentL;
			for( i = 0; i < l; ++i ){
				node = uinodes[ i ];
				node.calculate( false, _x, 0, data.contentWidth, data.contentHeight );
				_x += node.boxWidth + gapX;
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

/*
X.UI.HBox = X.UI.Box.presets(
	XUI_Layout_Horizontal,
	'HBox',
	{
		gapX : '0.2em'
	}
);*/

var XUI_HBox;

X.UI.HBox = X.UI.Box.inherits(
	'HBox',
	X_Class.NONE,
	{
		Constructor : function(){
			var supports;
			
			if( !XUI_HBox ){
				supports = XUI_Attr_createAttrDef( XUI_Box.prototype.usableAttrs, XUI_Layout_Horizontal.overrideAttrsForSelf );
				
				XUI_HBox = XUI_Box.inherits(
							{
								layout      : XUI_Layout_Horizontal,
								usableAttrs : supports,
								attrClass   : XUI_Attr_preset( XUI_Box.prototype.attrClass, supports, {
										gapX       : '0.2em'
									} )
							}
						);	
			};
			X_Pair_create( this, XUI_HBox( this, XUI_Layout_Horizontal, arguments ) );
		}
	});