
var X_Util_Image_actualSize = {};

/**
 * ユーティリティ関数とユーティリティクラス
 * @namespace X.Util.Image
 */
X[ 'Util' ][ 'Image' ] = {	
	'getActualDimension' : X_Util_Image_getActualDimension
	
	// Alpha Image, data uri ong ...
};

/*
 * Opacity不可 NetFront3.4
 */

/**
 * <p>画像の実際のサイズを返します。
 * <p>original
 * <p> LICENSE: MIT
 * <p> AUTHOR: uupaa.js@gmail.com
 * @alias X.Util.Image.getActualDimension
 * @param {Node|ImageElement|string}
 * @return {array.<number>}
 */
function X_Util_Image_getActualDimension( XnodeOrImageElemOrSrc ){
	var xnode, img, remove, ret, run, memW, memH, w, h;

	if( X_Type_isString( XnodeOrImageElemOrSrc ) ){
		if( ret = X_Util_Image_actualSize[ X_URL_toAbsolutePath( XnodeOrImageElemOrSrc ) ] ) return ret;
		
		xnode = X_Node_systemNode[ 'create' ](
			'img',
			{
				src : XnodeOrImageElemOrSrc
			},
			{
				position   : 'absolute'
			}
		);
		X_Node_startUpdate();
		img    = X_UA_DOM.IE4 ? X_Node__ie4getRawNode( xnode ) : xnode[ '_rawObject' ];
		remove = true;
	} else {
		if( XnodeOrImageElemOrSrc.constructor === X_Node ){
			xnode = XnodeOrImageElemOrSrc;
			img   = X_UA_DOM.IE4 ? X_Node__ie4getRawNode( xnode )[ '_rawObject' ] : xnode[ '_rawObject' ];
		} else
		if( X_Type_isHTMLElement( XnodeOrImageElemOrSrc ) ){
			img = XnodeOrImageElemOrSrc;
		} else
		if( XnodeOrImageElemOrSrc.constructor === X_EventDispatcher && X_Type_isImage( XnodeOrImageElemOrSrc[ '_rawObject' ] ) ){
			xnode = XnodeOrImageElemOrSrc;
			img   = xnode[ '_rawObject' ];
		} else {
			return;
		};
		if( ret = X_Util_Image_actualSize[ img.src ] ) return ret;
	};

	// for Firefox, Safari, Google Chrome
	if( img.naturalWidth ) return [ img.naturalWidth, img.naturalHeight ];

	if( 5 <= ( X_UA.Trident || X_UA.TridentMobile ) ){// for IE
		run  = img.runtimeStyle;
		memW = run.width;
		memH = run.height;

		// keep runtimeStyle
		run.width  = 'auto';
		// override
		run.height = 'auto';
		w = img.width;
		h = img.height;
		run.width  = memW;
		// restore
		run.height = memH;
	} else {// for Opera and Other
		
		memW = w = img.width;
		memH = h = img.height;
		
		if( img.removeAttribute ){ // Safari1.3 の Image は removeAttribute がない
			// keep current style
			img.removeAttribute( 'width' );
			img.removeAttribute( 'height' );
			
			w = img.width;
			h = img.height;
			
			// restore
			img.width  = memW;
			img.height = memH;
		};
	};
	
	ret = X_Util_Image_actualSize[ img.src ] = [ w, h ];
	
	remove && xnode[ 'kill' ]();
	
	return ret;
};


