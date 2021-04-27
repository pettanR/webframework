var X_NodeFlags_DESTROYED              = 0x0,
	X_NodeFlags_EXIST                  = 0x1,
	X_NodeFlags_IN_TREE                = 0x2, // xnode が(仮想)ツリーに追加されている -> 描画の対象

	X_NodeFlags_STYLE_IS_DISPLAY_NONE  = 2 <<  1, // display    : none		
	X_NodeFlags_STYLE_IS_INVISIBLE     = 2 <<  2, // visibility : hidden or opacity : 0
	X_NodeFlags_STYLE_IS_POS_ABSOLUTE  = 2 <<  3, // position   : absolute
	X_NodeFlags_STYLE_IS_NO_OVERFLOW   = 2 <<  4, // overflow   : hidden
	X_NodeFlags_STYLE_IS_WIDTH_LENGTH  = 2 <<  5, // width  : overflow:hidden,要素無し、または要素が非表示なら、 width() のための commitUpdate が不要
	X_NodeFlags_STYLE_IS_WIDTH_PCT     = 2 <<  6, // width  : width() のための commitUpdate が不要かもしれない。(親で LENGTH が指定されているなら)
	X_NodeFlags_STYLE_IS_HEIGHT_LENGTH = 2 <<  7, // height :
	X_NodeFlags_STYLE_IS_HEIGHT_PCT    = 2 <<  8, // height :
	X_NodeFlags_STYLE_IS_FONT_LENGTH   = 2 <<  9, // fontSize :
	X_NodeFlags_STYLE_IS_FONT_PCT      = 2 << 10, // fontSize :

	X_NodeFlags_DIRTY_POSITION         = 2 << 11, // 要素位置の変更が起こった。
	X_NodeFlags_DIRTY_CONTENT          = 2 << 12, // width, height, x, y textNode の内容, html と排他なので ID と共通でいい
	X_NodeFlags_DIRTY_ID               = 2 << 12, // width, height, x, y
	X_NodeFlags_DIRTY_CLASSNAME        = 2 << 13, // X_Node_CSS_getCharSize, width, height, x, y
	X_NodeFlags_DIRTY_ATTR             = 2 << 14, // X_Node_CSS_getCharSize, width, height, x, y
	X_NodeFlags_DIRTY_CSS              = 2 << 15, // X_Node_CSS_getCharSize, width, height, x, y
	X_NodeFlags_DIRTY_IE_FILTER        = ( X_UA.Trident || X_UA.TridentMobile ) < 10 && X_UA_ActiveX ? 2 << 16 : 0, // 

	X_NodeFlags_ACTUAL_LISTENING       = 2 << 17,
	X_NodeFlags_OLD_ATTRTEXT           = 2 << 18,
	X_NodeFlags_OLD_CSSTEXT            = 2 << 19,

		// filter 要素が親子になると不具合が出るのを検出
	X_NodeFlags_IE_FILTER_NOW          = 2 << 20,

		//GPU_WAITING            = 2 << 20, // 1:子のGPU解除待
	X_NodeFlags_GPU_RESERVED           = 2 << 21, // 2:GPU予約
	X_NodeFlags_GPU_NOW                = 2 << 22, // 3:GPU now!
	X_NodeFlags_GPU_RELEASE_RESERVED   = 2 << 23, // 4:GPU解除予約
	X_NodeFlags_GPU_CHILD              = 2 << 24, 
	
	X_NodeFlags_IE4_HAS_TEXTNODE       = ( X_UA.Trident || X_UA.TridentMobile ) < 5 ? 2 << 21 : 0,
	X_NodeFlags_IE4_HAS_ELEMENT        = ( X_UA.Trident || X_UA.TridentMobile ) < 5 ? 2 << 22 : 0,
	X_NodeFlags_IE4_DIRTY_CHILDREN     = ( X_UA.Trident || X_UA.TridentMobile ) < 5 ? 2 << 23 : 0,
	X_NodeFlags_IE4_FIXED              = ( X_UA.Trident || X_UA.TridentMobile ) < 5 ? 2 << 24 : 0,

    X_NodeFlags_IE5_DISPLAY_NONE_FIX   = 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 5.5 &&
                                             X_UA.Win32 !== 10 && /* 2020/4/7 Win10 では不要 */
                                             X_UA_ActiveX ? 2 << 24 : 0,
	X_NodeFlags_IE8_OPACITY_FIX        = 0,//( X_UA.Trident || X_UA.TridentMobile ) === 8 && X_UA_ActiveX ? 2 << 25 : 0,
	X_NodeFlags_IE_FILTER_FIX_AFTER    = X_UA_ActiveX && 2 << 26,
	
	// http://modernizr.com/downloads/modernizr.js
	// Thanks to Erik Dahlstrom
	X_NodeFlags_IS_SVG                 = document.createElementNS && document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect ? 2 << 27 : 0,
	X_NodeFlags_IS_VML                 =
			( function(){
				if( !X_UA_ActiveX || ( X_UA.Trident || X_UA.TridentMobile ) < 5 || 9 < ( X_UA.Trident || X_UA.TridentMobile ) ) return 0;

				document.write(
					'<!--[if vml]><script id=vmltest1>__vml=1;</script><![endif]-->' +
					'<!--[if gte vml 1]><script id=vmltest2>__vml=2;</script><![endif]-->' );
				
				/**
				 * VML のバージョン
				 * @alias X.Doc.VML
				 * @type {number}
				 */
				X[ 'Doc' ][ 'VML' ] = window.__vml / 2 || 0;
				
				switch( window.__vml ){
					case 2 :
						document.getElementById( 'vmltest2' ).removeNode( true );
					case 1 :
						document.getElementById( 'vmltest1' ).removeNode( true );
						return 2 << 28;
				};
				return 0;
			})(),

	X_Node_BITMASK_RESET_STYLE  = ( ( 2 << 29 ) - 1 + ( 2 << 29 ) ) ^ (
		X_NodeFlags_STYLE_IS_DISPLAY_NONE |
		X_NodeFlags_STYLE_IS_INVISIBLE |
		X_NodeFlags_STYLE_IS_POS_ABSOLUTE |
		X_NodeFlags_STYLE_IS_NO_OVERFLOW |
		X_NodeFlags_STYLE_IS_WIDTH_LENGTH |
		X_NodeFlags_STYLE_IS_WIDTH_PCT |
		X_NodeFlags_STYLE_IS_HEIGHT_LENGTH |
		X_NodeFlags_STYLE_IS_HEIGHT_PCT |
		X_NodeFlags_STYLE_IS_FONT_LENGTH |
		X_NodeFlags_STYLE_IS_FONT_PCT ),

	X_Node_BitMask_IS_DIRTY     = X_NodeFlags_DIRTY_POSITION | 
		X_NodeFlags_DIRTY_CONTENT | X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME |
		X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER | X_NodeFlags_IE8_OPACITY_FIX,

	X_Node_BitMask_RESET_DIRTY  = ( ( 2 << 29 ) - 1 + ( 2 << 29 ) ) ^ X_Node_BitMask_IS_DIRTY,
	
	X_Node_BitMask_RESET_GPU    = ( ( 2 << 29 ) - 1 + ( 2 << 29 ) ) ^ ( X_NodeFlags_GPU_RESERVED | X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED ),
	
	X_Node_BitMask_IE4_IS_MIX   = X_NodeFlags_IE4_HAS_TEXTNODE | X_NodeFlags_IE4_HAS_ELEMENT;

// TODO SVGのバージョン
/**
 * SVG が有効か?
 * @alias X.Doc.SVG
 * @type {boolean}
 */
X[ 'Doc' ][ 'SVG' ] = !!X_NodeFlags_IS_SVG;
