var XUI_Attr_AUTO = 1/0,//Number.POSITIVE_INFINITY,
	XUI_Attr_FLOOR = new Function( 'v', 'return 0 <= v ? v | 0 : -( -v | 0 )' ),
	XUI_Attr_USER = {
		XNODE  : 0, // 値は xnode.css にコピーされます。
		UINODE : 1, // 値は _uinode にコピーされます。
		LAYOUT : 2  // 
	},
	XUI_Attr_Type = {
		LIST              : 16384,
		LENGTH            :     1, // '1.5em'
		MINUS_LENGTH      :     2,
		PERCENT           :     4, // '90%', 0.0 ~ 1.0 こういう指定はできない！
		MINUS_PERCENT     :     8,
		NUMERICAL         :    16, // 1.1 (lineHeight only)
		AUTO              :    32, // 'auto'
		COLOR             :    64, // 0x000000 ~ 0xFFFFFF, RED, #000000 ~ #FFFFFF, #000 ~ #FFF
		URL               :   128,
		STRING            :   128,
		FONT_NAME         :   256,
		BOOLEAN           :   512,
		COMBI             :  1024,
		QUARTET           :  2048,
		DEFAULT_ONLY      :  4096,
		INIT_ONLY         :  8192,
		OBJECT            : 32768
	},
	XUI_Attr_Option = {
		BORDER_STYLE      : 'none,hidden,dotted,dashed,solid,double,groove,ridge,inset,outset',
		ALIGN             : 'left,center,right,justify',
		TEXT_DECORATION   : 'none,underline,overline,line-through,blink',
		TEXT_TRANSFORM    : 'none,capitalize,lowercase,uppercase',
		BOX_SIZING        : 'content,padding,border',
		CURSOR            : 'pointer,wait'
	},
	XUI_Attr_CSS3 = {
		opacity         : true,
		bgColorAlpha    : true,
		bgGradient      : true,
		bgGradientAplha : true,
		cournerRadius   : true,
		boxShadowBlur   : true,
		boxShadowAlpha  : true,
		glowBlur        : true,
		glowAlpha       : true,
		textShadowBlur  : true,
		textShadowAlpha : true
	},
	XUI_Attr_Rename = {
		bgColor       : 'backgroundColor',
		fontColor     : 'color',
		fontBold      : 'fontWeight',
		fontItalic    : 'fontStyle',
		fontSmallCaps : 'fontVariant'
	},

/*
 * 0: 初期値 : undefined は不可！
 * 1: dirty
 * 2: この attr を処理する人
 * 3: 受け付けるデータ型
 * 4: 選択方式の場合、その候補
 */
	XUI_Attr_Support = XUI_Attr_createAttrDef( 0,
{
	className         : [ '',             XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.DEFAULT_ONLY | XUI_Attr_Type.STRING ],
	pointerHoverClass : [ '',             XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.DEFAULT_ONLY | XUI_Attr_Type.STRING ],
	pointerDownClass  : [ null,           XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.DEFAULT_ONLY | XUI_Attr_Type.STRING ],
	invalidLayoutColor: [ null,           XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.DEFAULT_ONLY | XUI_Attr_Type.COLOR ],
	
	dataFeild         : [ '',             XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.STRING ],
	
	role              : [ 1,              XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.LIST, 'none,chrome' ],
	selectable        : [ false,          XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.BOOLEAN ],
	
	visible           : [ true,           XUI_Dirty.LAYOUT, XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
	pointerEnabled    : [ false,          XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
	pointerChildren   : [ true,           XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.BOOLEAN ],
	cursor            : [ 1,              XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.LIST, XUI_Attr_Option.CURSOR ],
	tooltip           : [ '',             XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.STRING ],
	
	borderWidth       : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.QUARTET | XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT  ], // em [ top, right, bottom, left ]
	padding           : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.QUARTET | XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
	
	width             : [ XUI_Attr_AUTO,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
	minWidth          : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
	maxWidth          : [ XUI_Attr_AUTO,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
	height            : [ XUI_Attr_AUTO,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
	minHeight         : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
	maxHeight         : [ XUI_Attr_AUTO,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.AUTO ],
	sizing            : [ 1,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LIST, XUI_Attr_Option.BOX_SIZING ],
	left              : [ null,           XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.MINUS_LENGTH | XUI_Attr_Type.MINUS_PERCENT ],
	top               : [ null,           XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.MINUS_LENGTH | XUI_Attr_Type.MINUS_PERCENT ],
	bottom            : [ null,           XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.MINUS_LENGTH | XUI_Attr_Type.MINUS_PERCENT ],
	right             : [ null,           XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT | XUI_Attr_Type.MINUS_LENGTH | XUI_Attr_Type.MINUS_PERCENT ],	

	borderColor       : [ 0x0,            XUI_Dirty.PAINT,  XUI_Attr_USER.XNODE,  XUI_Attr_Type.QUARTET | XUI_Attr_Type.COLOR   ], // color [ top, right, bottom, left ]
	borderStyle       : [ 1,              XUI_Dirty.PAINT,  XUI_Attr_USER.XNODE,  XUI_Attr_Type.QUARTET | XUI_Attr_Type.LIST, XUI_Attr_Option.BORDER_STYLE ], // string [ top, right, bottom, left ]
	bgColor           : [ 0xFFFFFF,       XUI_Dirty.PAINT,  XUI_Attr_USER.XNODE,  XUI_Attr_Type.COLOR     ], // color, none

	fontColor         : [ 0x0,            XUI_Dirty.PAINT,  XUI_Attr_USER.XNODE, XUI_Attr_Type.COLOR     ],
	fontFamily        : [ null,           XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.FONT_NAME ],
	fontSize          : [ 1,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
	fontBold          : [ false,          XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.BOOLEAN, 'bold'   ],
	fontItalic        : [ false,          XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.BOOLEAN, 'italic' ],
	fontSmallCaps     : [ false,          XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.BOOLEAN, 'small-caps' ],
	lineHeight        : [ 1,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.NUMERICAL ], // percent
	letterSpacing     : [ 0,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LENGTH    ],
	wordSpacing       : [ 0,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LENGTH    ],
	textAlign         : [ 1,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LIST, XUI_Attr_Option.ALIGN           ],
	textDecoration    : [ 1,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LIST, XUI_Attr_Option.TEXT_DECORATION ],
	textTransform     : [ 1,              XUI_Dirty.FONT,   XUI_Attr_USER.XNODE, XUI_Attr_Type.LIST, XUI_Attr_Option.TEXT_TRANSFORM  ]
}
),

/*
 * 共通する attr 指定を prototype に設定しながら拡張できる、属性データ保持クラス
 */

XUI_attrClassProto = null,

XUI_AttrClass = X_Class_create( 'XUI_AttrClass', X_Class.POOL_OBJECT );

/*
 * 'none,chrome,container' を受け取ったら、
 * {
 * 	'none' : 1,
 *  'chrome' : 2,
 *  'container' : 3,
 *  1 : 'none',
 *  2 : 'chrome',
 *  3 : 'container'
 * }　こんな object を返す。
 */
function XUI_createChecker( str ){
	var ret = {},
		ary = str.split( ',' ),
		l   = ary.length,
		i   = 0, v;
	for( ; i < l; ){
		v = ary[ i ];
		ret[ v ] = ++i;
		ret[ i ] = v;
	};
	return ret;
};

	function XUI_Attr_createAttrDef( base, defs ){
		var F = base ? X_Object_copy( base ) : {},
			z = base ? base._last : 0,
			n = 1,
			p, def;
		
		// 属性定義の上書き
		for( p in defs ){
			//if( X_EMPTY_OBJECT[ p ] ) continue;
			if( p === '_last' ) continue;
			if( !X_Type_isArray( def = defs[ p ] ) ) continue;
			F[ p ] = def;
			if( !base || !X_Type_isArray( base[ p ] ) ){
				def.No = z += n;
				// add
				n = def[ 3 ] & XUI_Attr_Type.QUARTET ? 4 :
				    def[ 3 ] & XUI_Attr_Type.COMBI   ? 2 : 1;
			} else {
				def.No = base[ p ].No;
			};
			if( def[ 3 ] & XUI_Attr_Type.LIST && X_Type_isString( def[ 4 ] ) ){
				def[ 4 ] = XUI_createChecker( def[ 4 ] );
			};
		};
		F._last = z;
		return F;
	};

function XUI_Attr_copy( proto, supports ){
	var support, p;
	
	for( p in supports ){
		//if( X_EMPTY_OBJECT[ p ] ) continue;
		if( p === '_last' ) continue;
		support = supports[ p ];
		proto[ support.No ] = support[ 0 ];
		if( support[ 3 ] & XUI_Attr_Type.QUARTET ){
			proto[ support.No + 1 ] = support[ 0 ];
			proto[ support.No + 2 ] = support[ 0 ];
			proto[ support.No + 3 ] = support[ 0 ];
		} else
		if( support[ 3 ] & XUI_Attr_Type.COMBI ){
			proto[ support.No + 1 ] = support[ 0 ];
		};
	};
};

XUI_Attr_copy( XUI_AttrClass.prototype, XUI_Attr_Support );

function XUI_Attr_preset( baseKlass, opt_supports, opt_attrs ){
	var klass = baseKlass.inherits(),
		proto = klass.prototype,
		supports = proto.usableAttrs || opt_supports,
		p;
	
	// 属性プリセット
	XUI_Attr_copy( proto, opt_supports );
	
	// setAttr に書き換え
	XUI_attrClassProto = proto;
	for( p in opt_attrs ){
		//if( X_EMPTY_OBJECT[ p ] ) continue;
		supports[ p ] && XUI_AbstractUINode.prototype.setAttr( p, supports[ p ], opt_attrs[ p ] );
	};
	XUI_attrClassProto = null;
	return klass;
};
