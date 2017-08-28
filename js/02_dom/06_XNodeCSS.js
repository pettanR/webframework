

/*
 * style 値の変更は、enterFrame 後にまとめて適用
 * width(), height(), x(), y() 1em の取得時にも適用
 * css3 の ie用 fix は X.UI レベルで行う
 * 
 * use X.Dom.Event
 */

/* font-size -> fontSize */
function X_Node_CSS_camelize( cssProp ){
	var parts, l, i, parts0, camelized;
	
	if( camelized = X_Node_CSS__DICTIONARY_CAMELIZE[ cssProp ] ) return camelized;
	parts  = cssProp.split( ' ' ).join( '' ).split( '-' );
	parts0 = parts[ 0 ];
	l      = parts.length;
	if( l === 1 ) return parts0;
	
	camelized = cssProp.charAt(0) === '-'
	  ? parts0.charAt( 0 ).toUpperCase() + parts0.substring( 1 )
	  : parts0;
	
	for( i = 1; i < l; ++i ){
		camelized += parts[ i ].charAt( 0 ).toUpperCase() + parts[ i ].substring( 1 );
	};
	return X_Node_CSS__DICTIONARY_CAMELIZE[ cssProp ] = camelized;
};

// TODO use X_HTMLParser_CHARS
/* fontSize -> font-size */
function X_Node_CSS_uncamelize( str ){
	var A = X_Node_CSS_CHAR_CODE_A,
		Z = A + 25,
		uncamelized, l, chr, code, i;
	str = str.split( ' ' ).join( '' );
	if( uncamelized = X_Node_CSS__DICTIONARY_UNCAMELIZE[ str ] ) return uncamelized;
	uncamelized = '';
	for( i = 0, l = str.length; i < l; ++i ){
		chr = str.charAt( i );
		code = chr.charCodeAt( 0 );
		uncamelized += ( A <= code && code <= Z ) ? '-' + chr : chr;
	};
	return X_Node_CSS__DICTIONARY_UNCAMELIZE[ str ] = uncamelized.toLowerCase();
};

var

	X_Node_CSS_getComputedStyle       = window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle,
	
		/* font-size -> fontSize */
	X_Node_CSS__DICTIONARY_CAMELIZE   = {},
	
		/* fontSize -> font-size */
	X_Node_CSS_CHAR_CODE_A            = 'A'.charCodeAt( 0 ),
		
	X_Node_CSS__DICTIONARY_UNCAMELIZE = {},
	
/*
 * CSS における display, position, float プロパティの相互関係
 * http://d.hatena.ne.jp/elm200/20080201/1201874740
 * 
 * CSS21:9.7 Relationships between ’display’, ’position’, and ’float’ 
 * http://www.w3.org/TR/CSS21/visuren.html#dis-pos-flo
 * 
 *   display:none? -yes-> 非表示
 *    ↓
 *   position:absolute? -yes-> float:none,display:block;
 *    ↓
 *   float:none? -no-> display:block;
 *    ↓
 *   display:そのまま
 * 
 *
display		position			float
block		static|relative		none
block		static|relative		right|left
block		absolute			none
inline		static|relative		none

_DISPLAY_NONE
_ABSOLUTE_BOX
_FLOAT_BOX
_GRNERAL
 */
	X_Node_CSS_VENDER_PREFIX          = {},
		
	X_Node_CSS__CLIP_SEPARATOR        = X_UA[ 'IE' ] < 8 ? ' ' : ',',
		
	X_Node_CSS__UNIT_RATIO            = {},
	X_Node_CSS__FONT_SIZE_RATIO       = {},

	//  https://developer.mozilla.org/en-US/docs/Web/CSS/transform
	//  Firefox 3.5, ie9, Opera 10.5, Safari 3.1, Chrome
	//  3D support Firefox 10, ie10, Safari 4.0, Chrome 12.0
	// transform : void 0,
	
	//  https://developer.mozilla.org/ja/docs/Web/Guide/CSS/Using_CSS_transitions
	//  Chrome 1.0, Firefox 4.0, ie10, Opera 10.5, Safari 3.2
	//  Android 2.1, Firefox Android 4.0, Opera Mobile 10, Safari Mobile 3.2	
	// transition : void 0
	
	// ブラウザ毎の getComputedStyle の戻り値 http://d.hatena.ne.jp/uupaa/20080928/1222543331

	X_Node_CSS_COLOR = {
		'BLACK'         : 0x0,
		'RED'           : 0xFF0000,
		'LIME'          : 0x00FF00,
		'BLUE'          : 0x0000FF,
		'YELLOW'        : 0xFFFF00,
		'AQUA'          : 0x00FFFF,
		'CYAN'          : 0x00FFFF,
		'MAGENTA'       : 0xFF00FF,
		'FUCHSIA'       : 0xFF00FF,
		'WHITE'         : 0xFFFFFF,
		'GREEN'         : 0x008000,
		'PURPLE'        : 0x800080,
		'MAROON'        : 0x800000,
		'NAVY'          : 0x000080,
		'OLIVE'         : 0x808000,
		'TEAL'          : 0x008080,
		'GRAY'          : 0x808080,
		'SILVER'        : 0xC0C0C0,
		'DIMGRAY'       : 0x696969,
		'SLATEGRAY'     : 0x708090,
		'DARKGRAY'      : 0xA9A9A9,
		'GAINSBORO'     : 0xDCDCDC,
		'MIDNIGHTBLUE'  : 0x191970,
		'SLATEBLUE'     : 0x6A5ACD,
		'MEDIUMBLUE'    : 0x0000CD,
		'ROYALBLUE'     : 0x4169E1,
		'DODGERBLUE'    : 0x1E90FF,
		'SKYBLUE'       : 0x87CEEB,
		'STEELBLUE'     : 0x4682B4,
		'LIGHTBLUE'     : 0xADD8E6,
		'PALETURQUOISE' : 0xAFEEEE,
		'TURQUOISE'     : 0x40E0D0,
		'LIGHTCYAN'     : 0xE0FFFF,
		'AQUAMARINE'    : 0x7FFFD4,
		'DARKGREEN'     : 0x006400,
		'SEAGREEN'      : 0x2E8B57,
		'LIGHTGREEN'    : 0x90EE90,
		'CHARTREUSE'    : 0x7FFF00,
		'GREENYELLOW'   : 0xADFF2F,
		'LIMEGREEN'     : 0x32CD32,
		'YELLOWGREEN'   : 0x9ACD32,
		'OLIVEDRAB'     : 0x6B8E23,
		'DARKKHAKI'     : 0xBCB76B,
		'PALEGOLDENROD' : 0xEEE8AA,
		'LIGHTYELLOW'   : 0xFFFFE0,
		'GOLD'          : 0xFFD700,
		'GOLDENROD'     : 0xDAA520,
		'DARKGOLDENROD' : 0xB8860B,
		'ROSYBROWN'     : 0xBC8F8F,
		'INDIANRED'     : 0xCD5C5C,
		'SADDLEBROWN'   : 0x8B4513,
		'SIENNA'        : 0xA0522D,
		'PERU'          : 0xCD853F,
		'BURLYWOOD'     : 0xDEB887,
		'BEIGE'         : 0xF5F5DC,
		'WHEAT'         : 0xF5DEB3,
		'SANDYBROWN'    : 0xF4A460,
		'TAN'           : 0xD2B48C,
		'CHOCOLATE'     : 0xD2691E,
		'FIREBRICK'     : 0xB22222,
		'BROWN'         : 0xA52A2A,
		'SALMON'        : 0xFA8072,
		'ORANGE'        : 0xFFA500,
		'CORAL'         : 0xFF7F50,
		'TOMATO'        : 0xFF6347,
		'HOTPINK'       : 0xFF69B4,
		'PINK'          : 0xFFC0CB,
		'DEEPPINK'      : 0xFF1493,
		'PALEVIOLETRED' : 0xDB7093,
		'VIOLET'        : 0xEE82EE,
		'PLUM'          : 0xDDA0DD,
		'ORCHILD'       : 0xDA70D6,
		'DARKVIOLET'    : 0x9400D3,
		'BLUEVIOLET'    : 0x8A2BE2,
		'MEDIUMPURPLE'  : 0x9370DB,
		'THISTLE'       : 0xD8BFD8,
		'LAVENDER'      : 0xE6E6FA,
		'MISTYROSE'     : 0xFFE4E1,
		'IVORY'         : 0xFFFFF0,
		'LEMONCHIFFON'  : 0xFFFACD
	};
	
function X_Node_CSS_parseColor( x ){
	var rgb, r, g, b;
	
	if( X_Type_isNumber( x ) ){
		return ( 0x0 <= x && x <= 0xFFFFFF ) ? x : NaN;
	} else
	if( !X_Type_isString( x ) ) return;
	
	if( X_Type_isNumber( rgb = X_Node_CSS_COLOR[ x.toUpperCase() ] ) && 0x0 <= rgb && rgb <= 0xFFFFFF ){
		return rgb;
	} else
	if( x.charAt( 0 ) === '#' ){
		switch( x.length ){
			case 7 :
				r = parseInt( x.substr( 1, 2 ), 16 );
				g = parseInt( x.substr( 3, 2 ), 16 );
				b = parseInt( x.substr( 5, 2 ), 16 );
				break;
			case 4 :
				r = parseInt( x.charAt( 1 ) + x.charAt( 1 ), 16 );
				g = parseInt( x.charAt( 2 ) + x.charAt( 2 ), 16 );
				b = parseInt( x.charAt( 3 ) + x.charAt( 3 ), 16 );
				break;
			case 2 :
				r = g = b = parseInt( x.charAt( 1 ) + x.charAt( 1 ), 16 );
				break;
			default :
				return;											
		};
	} else
	if( x.indexOf( 'rgb(' ) === 0 ){
		rgb = x.substr( 4 ).split( ',' );
		r = parseFloat( rgb[ 0 ] );
		g = parseFloat( rgb[ 1 ] );
		b = parseFloat( rgb[ 2 ] );
		if( x.indexOf( '%' ) !== -1 ){
			r *= 2.55;
			g *= 2.55;
			b *= 2.55;
		};
	} else
	if( x.indexOf( 'rgba(' ) === 0 ){
		rgb = x.substr( 5 ).split( ',' );
		r = parseFloat( rgb[ 0 ] );
		g = parseFloat( rgb[ 1 ] );
		b = parseFloat( rgb[ 2 ] );
		//a = parseFloat( rgb[ 3 ] );
		if( x.indexOf( '%' ) !== -1 ){
			r *= 2.55;
			g *= 2.55;
			b *= 2.55;
		};
	} else {
		return NaN;
	};
	return X_Type_isFinite( r + b + g ) ? ( r << 16 ) + ( g << 8 ) + b : NaN;
};

function X_Node_CSS_objToCssText( that, skipFilter ){
	var obj   = that[ '_css' ],
		//plain = X_EMPTY_OBJECT,
		css   = [],
		n     = -1,
		p, v, specialFix, filterFix;
	
	that[ '_flags' ] &= ~X_NodeFlags_OLD_CSSTEXT;
	
	if( !obj ){ // Opera7.5 未満?
		delete that[ '_cssText' ];
		return '';
	};
	
	for( p in obj ){
		// object の拡張に備えて plain なオブジェクトを用意し、そのメンバーと一致するものは処理の対象外。
		//if( plain[ p ] ) continue;
			
		v = obj[ p ];
		
		p = X_Node_CSS_uncamelize( X_Node_CSS_VENDER_PREFIX[ p ] || p );
		
		if( specialFix = X_Node_CSS_SPECIAL_FIX_PROP[ p ] ){
			css[ ++n ] = p + ':' + specialFix( v );
		} else
		if( X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[ p ] ){
			( filterFix || ( filterFix = {} ) )[ p ] = v;
		} else {
			css[ ++n ] = p + ':' + v;
		};
	};
	
	if( filterFix ){
		v = X_Node_CSS_objToIEFilterText( that, filterFix, css );
		n = css.length; /* css が変更されている場合あり */
		if( v ){
			css[ ++n ] = 'filter:' + v;
		};
		skipFilter = skipFilter && v;
	} else {
		skipFilter = false;
	};
	
	if( 0 <= n ){
		// cssText には完全なものを控えるが、戻すのは filter を抜いたもの
		that[ '_cssText' ] = css.join( ';' );
		//console.log( that[ '_cssText' ] );
		if( skipFilter ){
			--css.length;
			return css.join( ';' );
		};
		return that[ '_cssText' ];
	};
	delete that[ '_cssText' ];
	return '';
};

var
X_Node_CSS_FILTER_FIX_PROPS =
	X_UA[ 'ActiveX' ] && X_UA[ 'IE' ] < 9 ?
		{
			'opacity'     : 2,
			'boxShadow'   : 3,
			'textShadow'  : 4,
			'transform'   : 5,
			'dxtransform' : 7 // X.NodeAnime で使用
		} :
	X_UA[ 'ActiveX' ] && X_UA[ 'IE9' ] ? // == 9
		{
			'textShadow' : 4
		} :
		null;

function X_Node_CSS_objToIEFilterText( that, opt_css, opt_cssList ){
	var obj     = opt_css || that[ '_css' ],
		test    = X_Node_CSS_FILTER_FIX_PROPS,
		filters = [],
		n       = -1,
		p, id, v, num, vu, u, _v, ary, params, i, l, dir,
		afterUpdate, impossible, color;

	for( p in obj ){
		//if( X_EMPTY_OBJECT[ p ] ) continue;
		
		if( !( id = test[ p ] ) ) continue;
		v = obj[ p ];
		
		switch( id ){
			case 1 : //'filter' :
				filters[ ++n ] = v;
				break;
			case 2 : //'opacity' :
				if( v === 0 ){
					console.log( '@opacity:0 ' + !!opt_cssList );
					opt_cssList && ( opt_cssList[ opt_cssList.length ] = 'visibility:hidden' );
				} else
				if( v < 1 ) filters[ ++n ] = 'alpha(opacity=' + ( v * 100 | 0 ) +')';
				break;
			case 3 : //'boxShadow' :
				// TODO カンマ区切りの複数指定
				// box-shadow: 10px 10px 10px 10px rgba(0,0,0,0.4) inset;
				// スペース区切りで、水平方向の距離 垂直方向の距離 ぼかし距離 広がり距離 影の色 insetキーワードを指定する。 ぼかし距離 広がり距離 影の色 insetキーワードは省略可
				// https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow
				// <length> に絶対値は不可? <color> 省略した場合は、文字の色が使われる（webkit以外）
				// shadow(color=#cccccc, strength=10, direction=135);
				ary = v.split( ' ' );
				params = [ 0, 0, 0, 0 ]; // offset-x, offset-y, blur-radius, spread-radius
				for( i = 0, l = ary.length; i < l; ++i ){
					v = ary[ i ];
					num = i < 4 && parsetFloat( v );
					
					if( num === num ){
						vu = X_Node_CSS__splitValueAndUnit( v );
						v  = vu[ 0 ];
						u  = vu[ 1 ];
						if( v ){
							if( _v = X_Node_CSS__UNIT_RATIO[ u ] ){
								params[ i ] = v / _v;
							} else {
								switch( u ){
									case 'px' :
										params[ i ] = v;
										break;
									case 'em' :
										if( X_Node_updateTimerID ){
											afterUpdate = true;
										} else {
											params[ i ] = X_Node_CSS_getCharSize( that ) * v;
										};
									default :
										params[ i ] = 0;
										break;
								};								
							};
						} else {
							params[ i ] = 0;
						};
					} else
					if( v.charAt( 0 ) === '#' || v.indexOf( 'rgb' ) === 0 || X_Node_CSS_COLOR[ v.toUpperCase() ] ){
						v = X_Node_CSS_parseColor( v );
						if( 0 <= v && v < 0x100000 ){
							color = '00000' + v.toString( 16 );
							color = '#' + color.substr( color.length - 6 );
						} else
						if( v ){
							color = '#' + v.toString( 16 );
						};
					} else					
					if( v === 'inset' ){
						impossible = true;
					} else {
						// unknown
					};
				};
				if( impossible || !color ){
					break;
				};
				if( afterUpdate ){
					// AFTER_UPDATE 時に 再計算
					X_ViewPort[ 'listenOnce' ]( X_EVENT_AFTER_UPDATE, that, X_Node_CSS_onAfterUpdateForIEFilterFix );
					break;
				};
				dir = X_Node_CSS_ieMathRangeFix( Math.atan2( params[ 1 ] + params[ 3 ], params[ 0 ] + params[ 3 ] ) * 180 / Math.PI + 90 );
				filters[ ++n ] = 'shadow(color=' + color + ',strength=' + params[ 3 ] + ',direction=' + ( dir | 0 ) + ')';
				break;
			case 4 : //'textShadow' :
				//text-shadow: 5px 5px 2px blue; 水平方向の距離 垂直方向の距離 影のぼかし半径 影の色 none
				//glow(Color=yellow,Strength=10);
				//どうやらCSSのbackgroundプロパティと同時に使えないようです。 
				break;
			case 6 : //'backgroundImage' :
				//
				break;

			case 5 : // transform scale, matrix
				break;
			case 7 : // dxtransform
				that[ '_flags' ] |= X_NodeFlags_IE_FILTER_FIX_AFTER;
				break;
		};
	};
	return filters.join( ' ' );//n !== -1 ? filters.join( ' ' ) : '';
};


	//0 ～ 360の範囲に収める.
	function X_Node_CSS_ieMathRangeFix( a ){
		a %= 360;
		return a < 0 ? 360 + a : a;
	};

/*
 * http://p2b.jp/200912-CSS3-Transform-for-IE8
 * http://rtilabs.rti-giken.jp/files/2011_09_16/rotate.html
 */
	function X_Node_CSS_IETransform( elm, params ){
		var PI_180 = Math.PI / 180,

			rotate = X_Node_CSS_ieMathRangeFix( params[ 2 ] ),//回転
			radian = rotate * PI_180,
			cosX   = Math.cos( radian ),
			sinY   = Math.sin( radian ),
			
			skewX  = X_Node_CSS_ieMathRangeFix( params[ 3 ] ), //skew
			skewY  = X_Node_CSS_ieMathRangeFix( params[ 4 ] ),
			
			_skX   = Math.tan( skewX * PI_180 ),
			_skY   = Math.tan( skewY * PI_180 ),
			
			scaleX = params[ 5 ], //拡大
			scaleY = params[ 6 ],
			
			m11    = cosX * scaleX,
			m12    = ( -sinY + _skX ) * scaleX,
			m21    = (  sinY + _skY ) * scaleY,
			m22    = cosX * scaleY,

			//absolute時には軸を補正してあげないとだめだ。
			//ブラウザとして軸がずれている。
			//計算式元ネタ http://p2b.jp/200912-CSS3-Transform-for-IE8
	
			//offset*系のサイズは回転によって生じたゆがみも考慮されるらしい。
	
			//拡大縮小も同じ.
			//this.get(0).style.width や height には拡縮の影響を受けない元の数字が入っている
			ow = elm.offsetWidth,
			oh = elm.offsetHeight,
	
			absCosX = Math.abs( cosX ),
			absSinY = Math.abs( sinY ),
	
				//回転の補正
			dx = ( ow - ( ow * absCosX + oh * absSinY ) ) / 2
				//skewの補正(rotate しながらskew すると補正がおかしくなります。 これがわからない)
				 - ow / 2 * _skX
				//拡大の補正
				 - ( ( ow * scaleX - ow ) / 2 | 0 )
				// x
				 + params[ 0 ],
			dy = ( oh - ( ow * absSinY + oh * absCosX ) ) / 2
				//skewの補正(
				 - oh / 2 * _skY
				//拡大の補正
				 - ( ( oh * scaleY - oh ) / 2 | 0 )
				// y
				 + params[ 1 ];

		//console.log( ow +  ' ' + oh )
		elm.style[ params[ 7 ] ] = dx + 'px'; // left or right
		elm.style[ params[ 8 ] ] = dy + 'px'; // top  or bottom
		
		//フィルターで回転と拡大縮小を加えます。
		return 'progid:DXImageTransform.Microsoft.Matrix(' +
								// 'Dx='  + dx +
								//',Dy='  + dy +
								 'M11=' + m11 + 
								',M12=' + m12 + 
								',M21=' + m21 + 
								',M22=' + m22 + 
								',FilterType="bilinear",sizingMethod="auto expand")';
	};

function X_Node_CSS_onAfterUpdateIEFilterFix( that ){
	var PI_180 = Math.PI / 180,
		test   = X_Node_CSS_FILTER_FIX_PROPS,
		css    = that[ '_css' ],
		elm    = that[ '_rawObject' ],
		filter = elm.style.filter || '',
		origin = filter,
		p, v, plus, id;

	for( p in css ){
		if( !( id = test[ p ] ) ) continue;
		plus = 0;
		switch( id ){
			case 7 : // dxtransform
				plus = X_Node_CSS_IETransform( elm, css[ p ] );
				break;
			default :
				continue;
		};
		if( plus ) filter += ( filter ? ' ' : '' ) + plus;
	};
	if( filter !== origin ) elm.style.filter = filter;
};


function X_Node_CSS_onAfterUpdateForIEFilterFix(){
	if( this[ '_flags' ] & X_NodeFlags_IN_TREE ){ // 要素があり、要素がツリーに属している
		this[ '_flags' ] |= X_NodeFlags_DIRTY_IE_FILTER;
		X_Node_reserveUpdate();
	};
};


	/*
	 * http://css-eblog.com/ie-css-problems/rgba-pe.html
	 * ie67 では rgb() は background-color で反応しない、、、
	 */
	
var	
X_Node_CSS_UNIT = {
		'px'   : 0,
		'em'   : 1,
		// ex, rem, vh, vw, vmin, vmax
		'cm'   : 2,
		'mm'   : 3,
		'in'   : 4,
		// pt, pc, mozmm
		'%'    : 5,
		'pct'  : 5,
		'ms'   : 6,
		's'    : 7,
		'#'    : 8,
		'rgb'  : 9,
		'rgba' : 10
};

/*
 * .2, -.1 といったケースに対処
 * 
 */
function X_Node_CSS__splitValueAndUnit( v ){
	var num, _num, u;
	if( X_Type_isNumber( v ) ) return [ v || 0, '' ];
	num = parseFloat( v );
	if( num !== num ) return [ 0, '' ];
	_num = '' + num;
	if(  0 < num && num < 1 && v.charAt( 0 ) === '.' ) _num = _num.slice( 1 );
	if( -1 < num && num < 0 && v.charAt( 1 ) === '.' ) _num = '-.' + _num.substr( 2 );
	u = v.substr( v.indexOf( _num ) + _num.length );
	return [ num, X_Node_CSS_UNIT[ u ] ? u : 'px' ];
};
		/*
		(function( obj ){
			var test    = X_Node_CSS_SPECIAL_FIX_PROP,
				ret = [], p, id, v, bgpX, bgpY, clipT, clipB, clipL, clipR;
			for( p in obj ){
				if( !( id = test[ p ] ) ) continue;
				v = obj[ p ];
				switch( id ){
					case 1 : //'backgroundPositionX' :
						bgpX = v;
						break;
					case 2 : //'backgroundPositionY' :
						bgpY = v;
						break;
					case 3 : //'clipTop' :
						clipT = v;
						break;
					case 4 : //'clipBottom' :
						clipB = v;
						break;
					case 5 : //'clipLeft' :
						clipL = v;
						break;
					case 6 : //'clipRight' :
						clipR = v;
						break;
				};
			};
			if( bgpX || bgpY ) ret[ ret.length ] = 'background-position:';
			if( clipT || clipB || clipL || clipR ){
				ret[ ret.length ] = 'clip:rect(';
			};
			return ret.join( ';' );
		}); */




// export
// name getter
// unitID, name 単位指定のプロパティ取得 geter
// obj setter
// name, value setter
/**
 * style の getter と setter。
 * @alias Node.prototype.css
 * @param {string|object} [nameOrObj] style 名、または追加する style のハッシュ
 * @param {string|number} [value=] style の値
 * @return {Node|string|number} getter の場合は値を、setter の場合は自身を返す。(メソッドチェーン)
 * @example // getter
 * node.css( 'color' );
 * // setter - 1
 * node.css( { width : w + 'px', height : h + 'px' } );
 * // setter - 2
 * node.css( 'color', 0x666666 );
 */
function X_Node_css( nameOrObj /* value */ ){
	var args = arguments,
		css  = this[ '_css' ],
		p, name, v, plain, camelize, flags;

	if( !this[ '_tag' ] || X_Dom_DTD_MOVE_TO_HEAD[ this[ '_tag' ] ] || this[ '_tag' ] === 'SCRIPT' ) return this;
// setter:object
	if( X_Type_isObject( nameOrObj ) ){
		if( !css ) css = this[ '_css' ] = {};
		//plain    = X_EMPTY_OBJECT;
		camelize = X_Node_CSS_camelize;
		flags    = this[ '_flags' ];
		for( p in nameOrObj ){
			//if( plain[ p ] ) continue;
			name = camelize( p );
			v    = nameOrObj[ p ];
			if( css[ name ] === v ) continue;
			flags = X_Node_CSS_setStyle( css, flags, name, v );
		};
		flags |= X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
		this[ '_flags' ] = flags;
		flags & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
		delete this[ '_cssText' ];
		return this;
	} else
	if( 1 < args.length ){
// setter name, value
		if( !css ) css = this[ '_css' ] = {};
		name = X_Node_CSS_camelize( nameOrObj );
		v    = args[ 1 ];
		if( css[ name ] === v ) return this;
		this[ '_flags' ] = X_Node_CSS_setStyle( css, this[ '_flags' ], name, v ) | X_NodeFlags_DIRTY_CSS | X_NodeFlags_OLD_CSSTEXT;
		this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
		delete this[ '_cssText' ];
		return this;
	};
// getter
	if( !css ) return;
	// TODO 集計 border, padding, margin, backgroundPosition, clip
	// TODO border で正確なデータを返せない時は、null を返す
	return css[ X_Node_CSS_camelize( nameOrObj ) ];
};

function X_Node_CSS_setStyle( css, flags, name, newValue ){

	if( X_Node_CSS_FILTER_FIX_PROPS && X_Node_CSS_FILTER_FIX_PROPS[ name ] ){
		flags |= X_NodeFlags_DIRTY_IE_FILTER;
	};
	if( !newValue && newValue !== 0 ){
		delete css[ name ];
	} else {
		css[ name ] = newValue;
	};
	
	switch( name ){
		case 'display' :
			console.log( newValue );
			newValue === 'none' ? ( flags |= X_NodeFlags_STYLE_IS_DISPLAY_NONE ) : ( flags &= ~X_NodeFlags_STYLE_IS_DISPLAY_NONE );
			return flags;
			
		case 'visibility' :
			// すでに opacity:0 で invisible
			if( flags & X_NodeFlags_STYLE_IS_INVISIBLE && css[ 'opacity' ] == 0 ) return flags;
			newValue === 'hidden' ? ( flags |= X_NodeFlags_STYLE_IS_INVISIBLE ) : ( flags &= ~X_NodeFlags_STYLE_IS_INVISIBLE );
			return flags;
			
		case 'opacity' :
			flags |= X_NodeFlags_IE8_OPACITY_FIX;
			// すでに visibility:hidden で invisible
			if( flags & X_NodeFlags_STYLE_IS_INVISIBLE && css[ 'visibility' ] === 'hidden' ) return flags;
			newValue == 0 ? // 0 or "0"
				( flags |= X_NodeFlags_STYLE_IS_INVISIBLE ) : ( flags &= ~X_NodeFlags_STYLE_IS_INVISIBLE );
			return flags;
			
		case 'overflow' :
			newValue === 'hidden' ? ( flags |= X_NodeFlags_STYLE_IS_NO_OVERFLOW ) : ( flags &= ~X_NodeFlags_STYLE_IS_NO_OVERFLOW );
			return flags;
			
		case 'position' :
			newValue === 'absolute' ? ( flags |= X_NodeFlags_STYLE_IS_POS_ABSOLUTE ) : ( flags &= ~X_NodeFlags_STYLE_IS_POS_ABSOLUTE );
			return flags;
			
		case 'width'    :
			newValue = X_Node_CSS__splitValueAndUnit( newValue );
			if( newValue[ 1 ] !== '%' ){
				flags |= X_NodeFlags_STYLE_IS_WIDTH_LENGTH;
				flags &= ~X_NodeFlags_STYLE_IS_WIDTH_PCT;
			} else {
				flags &= ~X_NodeFlags_STYLE_IS_WIDTH_LENGTH;
				flags |= X_NodeFlags_STYLE_IS_WIDTH_PCT;
			};
			return flags;
			
		case 'height'   :
			newValue = X_Node_CSS__splitValueAndUnit( newValue );
			if( newValue[ 1 ] !== '%' ){
				flags |= X_NodeFlags_STYLE_IS_HEIGHT_LENGTH;
				flags &= ~X_NodeFlags_STYLE_IS_HEIGHT_PCT;
			} else {
				flags &= ~X_NodeFlags_STYLE_IS_HEIGHT_LENGTH;
				flags |= X_NodeFlags_STYLE_IS_HEIGHT_PCT;
			};
			return flags;
			
		case 'fontSize' :
			
	};
	return flags;
};

/**
 * cssText の getter と setter。setter の場合 css と異なり全ての style が書き変わる。
 * @alias Node.prototype.cssText
 * @param {string=} v cssText 文字列名
 * @return {Node|string} getter の場合は cssText 文字列を、setter の場合は自身を返す。(メソッドチェーン)
 * @example // getter
 * node.cssText();
 * // setter
 * node.cssText('color:red;width:20px');
 */
function X_Node_cssText( v ){
	var obj, i, l, attr, name;
	
	if( v === this[ '_cssText' ] && ( ( this[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT ) === 0 ) ){
		return this;
	};	
	
	if( v === '' ){
		delete this[ '_css' ];
		delete this[ '_cssText' ];
		this[ '_flags' ] |= X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER;
		this[ '_flags' ] &= ~X_NodeFlags_OLD_CSSTEXT;
		this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
		return this;
	} else
	if( X_Type_isString( v ) ){
		delete this[ '_css' ];
		obj = {};
		v   = v.split( ';' ); // TODO content ";" などにも対応 <- 不要 :before :after 疑似要素には触らない
		for( i = 0, l = v.length; i < l; ++i ){
			attr = v[ i ].split( ':' );
			( name = attr[ 0 ] ) && ( obj[ name ] = attr[ 1 ] || true );
		};
		return this[ 'css' ]( obj );
	};
	// getter
	this[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText( this );
	return this[ '_cssText' ];
};

/*
 * ここでは HTMLElement のチ1ェックは行わない！ <- 行う！
 * TODO
 * body に css attr がセットされた場合には X_ViewPort_baseFontSize をクリア
 * class, id, attr(<font size><basefont>) の変更があった場合は、変更の適用の後、charSize を取得
 * css の場合は、計算で求めることが可能、content は影響しない
 * :hover, #target, が絡む場合、正しく扱えない
 */
var
X_Node_CSS_getCharSize =
	X_Node_CSS_getComputedStyle ?
		(function( that ){
			X_Node_updateTimerID && X_Node_startUpdate();
			if( that === X_Node_body && X_ViewPort_baseFontSize ) return X_ViewPort_baseFontSize;
			if( that[ '_fontSize' ] ) return that[ '_fontSize' ];
			return that[ '_fontSize' ] = that[ '_rawObject' ] ? parseFloat( X_Node_CSS_getComputedStyle( that[ '_rawObject' ], null ).fontSize ) : 0;
		}) :

	5 <= X_UA[ 'IE' ] ?
		(function( that ){
			var font, vu, v, u, _v;
			
			X_Node_updateTimerID && X_Node_startUpdate();
			if( that === X_Node_body && X_ViewPort_baseFontSize ) return X_ViewPort_baseFontSize;
			if( that[ '_fontSize' ] ) return that[ '_fontSize' ];
			
			font = that[ '_rawObject' ].currentStyle.fontSize;
			//font = that[ '_css' ] && that[ '_css' ].fontSize || '1em';
			vu   = X_Node_CSS__splitValueAndUnit( font );
			v    = vu[ 0 ];
			u    = vu[ 1 ];

			if( v === 0 ){
				if( v = X_Node_CSS__FONT_SIZE_RATIO[ font ] ) return that[ '_fontSize' ] = v;
			} else {
				if( _v = X_Node_CSS__UNIT_RATIO[ u ] ) return that[ '_fontSize' ] = v / _v;
			};
			switch( u ){
				case 'px' :
					return that[ '_fontSize' ] = v;
				case 'em' :
				// body まで辿ってしまった場合は？
					if( that.parent ) return that[ '_fontSize' ] = X_Node_CSS_getCharSize( that.parent ) * v;
					break;
				case '%' :
				// body まで辿ってしまった場合は？
					if( that.parent ) return that[ '_fontSize' ] = X_Node_CSS_getCharSize( that.parent ) * v / 100;
			};
			return 0;
		}) :
	X_UA_DOM.W3C ?
		(function( that ){
			var elm, v;
			X_Node_updateTimerID && X_Node_startUpdate();
			if( that === X_Node_body && X_ViewPort_baseFontSize ) return X_ViewPort_baseFontSize;
			if( that[ '_fontSize' ] ) return that[ '_fontSize' ];

			that[ '_rawObject' ].appendChild( elm = document.createElement( 'span' ) );
			elm.style.cssText = 'display:block;position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;';
			elm.innerHTML = 'X';
			v = elm.offsetHeight;
			that[ '_rawObject' ].removeChild( elm );
			return that[ '_fontSize' ] = v;
		}) :
	X_UA_DOM.IE4 ?
		(function( that ){
			var font, vu, v, u, _v, elm;
			
			X_Node_updateTimerID && X_Node_startUpdate();
			if( that === X_Node_body && X_ViewPort_baseFontSize ) return X_ViewPort_baseFontSize;
			if( that[ '_fontSize' ] ) return that[ '_fontSize' ];

			if( that[ '_css' ] && ( font = that[ '_css' ].fontSize ) ){
				vu = X_Node_CSS__splitValueAndUnit( font );
				v  = vu[ 0 ];
				u  = vu[ 1 ];
				
				if( v === 0 ){
					if( _v = X_Node_CSS__FONT_SIZE_RATIO[ font ] ) return that[ '_fontSize' ] = _v;
				} else {
					if( _v = X_Node_CSS__UNIT_RATIO[ u ] ) return that[ '_fontSize' ] = v / _v;
				};
			} else {
				// TODO 要素を生成して測定! ではなくて elm.style.fontSize が使えそう
				( that[ '_rawObject' ] || X_Node__ie4getRawNode( that ) ).insertAdjacentHTML( 'BeforeEnd', '<div id="ie4charsize" style="position:absolute;top:0;left:0;visivility:hidden;line-height:1;height:1em;">X</div>' );
				elm = document.all[ 'ie4charsize' ];
				v = elm.offsetHeight;
				elm.removeAttribute( 'id' ); // ?
				elm.outerHTML = '';
				return that[ '_fontSize' ] = v;
			};

			switch( u ){
				case 'px' :
					return that[ '_fontSize' ] = v;
				case 'em' :
				// body まで辿ってしまった場合は？
					if( that.parent ) return that[ '_fontSize' ] = X_Node_CSS_getCharSize( that.parent ) * v;
					break;
				case '%' :
				// body まで辿ってしまった場合は？
					if( that.parent ) return that[ '_fontSize' ] = X_Node_CSS_getCharSize( that.parent ) * v / 100;
			};
			return 0;
		}) :
		0;

var X_Node_CSS_Support = {},

	X_Node_CSS_SPECIAL_FIX_PROP = {
		
		'transitionDuration' : X_UA[ 'Android' ] && !X_UA[ 'Chrome' ] && function( v ){ // bad Android
				return parseFloat( v ) === 0 ? '0.001s' : v;
			}
		
		//webkit boxShadow <color> が省略された場合。transparent になるのを color に
		//webkit boxShadow が border-radius をはみ出す, background-image に グラデーションのないグラデーション指定
		// http://melty.koume.in/android-bug-boxshadow-radius/
		
	};

/**
 * @namespace X.CSS
 */
X[ 'CSS' ] = {
	/**
	 * @alias X.CSS.VENDER_PREFIX
	 */
	'VENDER_PREFIX' : X_Node_CSS_VENDER_PREFIX,

	/**
	 * @alias X.CSS.Support
	 */
	'Support'       : X_Node_CSS_Support
};

/*
 * 				backgroundPositionX : testStyle.backgroundPositionX === undefined ? 3 : 0,
				backgroundPosiitonY : testStyle.backgroundPositionX === undefined ? 3 : 0,
				clipTop             : testStyle.clipTop === undefined && testStyle[ 'clip-top' ] === undefined ? 3 : 0,
				clipBottom          : testStyle.clipTop === undefined && testStyle[ 'clip-top' ] === undefined ? 4 : 0,
				clipLeft            : testStyle.clipTop === undefined && testStyle[ 'clip-top' ] === undefined ? 5 : 0,
				clipRight           : testStyle.clipTop === undefined && testStyle[ 'clip-top' ] === undefined ? 6 : 0
 */

(function(){
	var testStyle = X_UA[ 'IE4' ] ? {} : ( /*document.documentElement ||*/ document.createElement( 'div' ) ).style,
		temp      = testStyle.cssText,
		vendors   = 'webkit,Webkit,Moz,moz,Ms,ms,O,o,khtml,Khtml'.split( ',' ),
		searches  = (
			'opacity,boxSizing,boxShadow,' +
			'transform,transformOrigin,perspective,' +
			'transisiton,transitionDelay,transitionProperty,transitionDuration,transitionTimingFunction,backfaceVisibility,willChange,filter,' +
			'userSelect,touchSelect,touchAction,touchCallout,contentZooming,userDrag,tapHighlightColor' ).split( ',' ),
		vendor, i, search, prop, j, v;

	for( i = searches.length; i; ){
		search = prop = searches[ --i ];
		
		if( testStyle[ prop ] === undefined ){
			prop = prop.charAt( 0 ).toUpperCase() + prop.substr( 1 );
			for( j = vendors.length; j; ){
				v = vendors[ --j ];
				if( testStyle[ v + prop ] !== undefined ){
					if( v === 'ms'/* && !( 10 <= X_UA[ 'IEHost' ] )*/ ) v = 'Ms';// for ie9, 但し ie11 のieには不要
					if( v === 'o' ) v = 'O';//for opera12
					X_Node_CSS_VENDER_PREFIX[ search ] = v + prop;
					break;
				};
			};				
		} else {
			X_Node_CSS_VENDER_PREFIX[ search ] = prop;
		};
	};
	
	testStyle.cssText = 'background:rgba(0,0,0,0.5);border-color:transparent';
/**
 * 色指定に rgba() が使用できるか?
 * @alias X.CSS.Support.rgba
 * @type {boolean}
 */
	X_Node_CSS_Support[ 'rgba' ] = !!testStyle[ 'background' ];
	
/**
 * 色指定に transparent が使用できるか?
 * @alias X.CSS.Support.transparent
 * @type {boolean}
 */
	X_Node_CSS_Support[ 'transparent' ] = !!testStyle[ 'borderColor' ];
	// TODO border による三角形の可否
	// 2:完全、 1:透過に非対応(IE7-) 0:borderの描画が非標準で三角形が作れない

	if( prop = X_Node_CSS_VENDER_PREFIX[ 'boxShadow' ] ){
		
		testStyle.cssText = X_Node_CSS_uncamelize( prop ) + ':0 0';
		
		/**
		 * boxShadow が使用できるか?
		 * chrome 1+, ff3.5(1.9.1), ie9+, opera10.5+, Safari3+(522)
		 * @alias X.CSS.Support.boxShadow
		 * @type {boolean}
		 */
		X_Node_CSS_Support[ 'boxShadow' ] = !!testStyle[ prop ];

		testStyle.cssText = X_Node_CSS_uncamelize( prop ) + ':0 0, 0 0';
		
		/**
		 * boxShadow の複数指定が使用できるか?<br>
		 * chrome 4+, ff3.5(1.9.1), ie9+, opera10.5+, Safari5+(533)
		 * @alias X.CSS.Support.boxShadowMulti
		 * @type {boolean}
		 */
		X_Node_CSS_Support[ 'boxShadowMulti' ] = !!testStyle[ prop ];
		
		testStyle.cssText = X_Node_CSS_uncamelize( prop ) + ':0 0 inset';
		
		/**
		 * https://developer.mozilla.org/ja/docs/Web/CSS/box-shadow<br>
		 * この値を用いる場合には、spread-radius を省略出来ません。box-shadow が効かないケースに遭遇した時はこの事を思い出して下さい。<br>
		 * chrome 4+, ff3.5(1.9.1), ie9+, opera10.5+, Safari5+(533)<br>
		 * 
		 * http://unformedbuilding.com/articles/considerations-when-using-the-box-shadow/<br>
		 *  box-shadow:inset と border-radius を指定しているときの Google Chrome の表示<br>
		 *  このバグは Windows と Linux で発生するようです。<br>
		 *  Windows 版 Chrome 10.0.648.127 で修正されているのを確認しました。<br>
		 * @alias X.CSS.Support.boxShadowInset
		 * @type {boolean}
		 */
		X_Node_CSS_Support[ 'boxShadowInset' ] = testStyle[ prop ] && testStyle[ prop ].indexOf( 'inset' ) !== -1;

	};

	testStyle.cssText = temp;

})();

X_ViewPort[ 'listenOnce' ]( X_EVENT_INIT, function(){
	var xnode  = X_Node_systemNode,
		output = X_Node_CSS__UNIT_RATIO,
		list   = 'cm,mm,in,pt,pc'.split( ',' ),
		unit, size, base, i;
	
	for( i = list.length; i; ){
		unit = list[ --i ];
		output[ unit ] = xnode[ 'css' ]( 'width', 10 + unit )[ 'width' ]() / 10;
	};

	output = X_Node_CSS__FONT_SIZE_RATIO,
	list   = 'xx-large,x-large,large,larger,medium,small,smaller,x-small,xx-small'.split( ',' );
	xnode[ 'css' ]( { lineHeight : '100%', height : '1em' } )[ 'text' ]( 'X' );
	
	for( i = list.length; i; ){
		size = list[ --i ];
		output[ size ] = xnode[ 'css' ]( 'fontSize', size )[ 'height' ]();// / base;
	};
	
	xnode[ 'cssText' ]( '' )[ 'empty' ]();
});


