var X_Node_BoxModel = {
		CONTENT_BOX      : 1,
		PADDING_BOX      : 2,
		BORDER_BOX       : 3
	},
	
	X_Node_BoxModel_defaultBoxModel,
	
	X_Node_BoxModel_boxSizingEnabled,
	// TODO: offsetLeft, offsetTop の基準位置
	X_Node_BoxModel_absoluteOffset;

X_ViewPort[ 'listenOnce' ]( X_EVENT_INIT, function(){
	var node = X_Node_systemNode;
	
	node[ 'cssText' ]( 'width:10px;padding:1px;border:2px solid #0;margin:4px;' );
	
	X_Node_BoxModel_defaultBoxModel = node[ 'width' ]() === 10 ?
		X_Node_BoxModel.BORDER_BOX :
		X_Node_BoxModel.CONTENT_BOX;
	
	if( X_Node_BoxModel_defaultBoxModel === X_Node_BoxModel.CONTENT_BOX ){
		X_Node_BoxModel_boxSizingEnabled = node[ 'cssText' ]( 'width:10px;padding:1px;border:2px solid red;margin:4px;' +
			'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;' )
											[ 'width' ]() === 10;
	};
	
	/*
	 * 古い Gekco、 Presto、 WebKit では影がレイアウトに影響します。たとえば、width が 100% のボックスに外向きの box-shadow を指定すると、横スクロールバーが表示されてしまいます。
	 * TODO boxShadow が有効な要素に対して offsetWidth 等の補正(?) -> 隠し要素を生成してその要素で描画
	 */
	if( X_Node_CSS_Support[ 'boxShadow' ] &&
		node[ 'cssText' ](
				X_Node_CSS_uncamelize( X_Node_CSS_VENDER_PREFIX.boxShadow ) + ':10px 10px 0 0 #000;width:10px;'
			)[ 'width' ]() !== 10
	){
	 	//console.log( node[ 'cssText' ]() + node[ 'width' ]() );
		X_Node_CSS_Support[ 'boxShadowLayoutBug' ] = true;
	};

	// padding
	// border
	// margin
	// top

	X_Node_BoxModel_absoluteOffset =
		node[ 'cssText' ]( 'position:absolute;top:0;left:0;margin:1px;border:2px solid #000;padding:4px;' )
			[ 'append' ]( '<div></div>' )
			[ 'firstChild' ]()
				[ 'cssText' ]( 'position:absolute;top:8px;left:8px;margin:16px;border:32px solid #666;padding:64px;' )
				[ 'y' ]();

	node[ 'cssText' ]( '' )[ 'empty' ]();
});

/* --------------------------------------
 * Width, Height
 *  display:blobk かつ overflow:hidden かつ size（px,em）が設定されていたら、再描画しないでその値を返す
 *  display:none なら 0
 * 
 * getBoxObjectFor
 * getBoundingClientRect
 */

function X_Node_BoxModel_mesure( that, name, svgName ){
	var flags = that[ '_flags' ], elm;
	
	if( !that[ '_tag' ] || ( ( flags & X_NodeFlags_IN_TREE ) === 0 ) || ( flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE ) ) return 0;
	
	X_Node_updateTimerID && X_Node_startUpdate();
	
    elm = that[ '_rawObject' ] || X_Node__ie4getRawNode && X_Node__ie4getRawNode( that );

    if( that[ '_flags' ] & X_NodeFlags_IS_SVG ){
        return elm ? elm.getBoundingClientRect()[ svgName ] | 0 : 0;
    };
	return elm ? elm[ name ] : 0;
};

/**
 * 要素の幅。elm.offsetWidth
 * @alias Node.prototype.width
 * @return {number} 
 * @example node.width();
 */
function X_Node_width(){
	return X_Node_BoxModel_mesure( this, 'offsetWidth', 'width' );
	
	// TODO width : length + overflow : hidden ならそれを返す? <- block or inline
	// TODO TextNode どうする?
	//if( X_UA_DOM.IE4 ) return elm ? elm.style.pixelWidth : 0;
	//return elm ? elm.offsetWidth : 0;
};

/**
 * 要素の高さ。elm.offsetHeight
 * @alias Node.prototype.height
 * @return {number} 
 * @example node.height();
 */
function X_Node_height(){
	return X_Node_BoxModel_mesure( this, 'offsetHeight', 'height' );
	
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'height' );
	//if( X_UA_DOM.IE4 ) return elm ? elm.style.pixelHeight : 0;
	//return elm ? elm.offsetHeight : 0;
};

/**
 * 要素のコンテンツ領域の幅。elm.clientWidth
 * @alias Node.prototype.clientWidth
 * @return {number} 
 * @example node.clientWidth();
 */
function X_Node_clientWidth(){
	return X_Node_BoxModel_mesure( this, 'clientWidth', 'width' );
	
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'width' );
	//return elm ? elm.clientWidth : 0;
};

/**
 * 要素のコンテンツ領域の高さ。elm.clientHeight
 * @alias Node.prototype.clientHeight
 * @return {number} 
 * @example node.clientHeight();
 */
function X_Node_clientHeight(){
	return X_Node_BoxModel_mesure( this, 'clientHeight', 'height' );

	// this[ 'css' ]( X_Node_CSS_Unit.px, 'height' );
	//return elm ? elm.clientHeight : 0;
};

/**
 * 要素のスクロール領域の幅。elm.scrollWidth
 * @alias Node.prototype.scrollWidth
 * @return {number} 
 * @example node.scrollWidth();
 */
function X_Node_scrollWidth(){
	return X_Node_BoxModel_mesure( this, 'scrollWidth', 'width' );

	// this[ 'css' ]( X_Node_CSS_Unit.px, 'width' );
	//return elm ? elm.scrollWidth : 0;
};

/**
 * 要素のスクロール領域の高さ。elm.scrollHeight
 * @alias Node.prototype.scrollHeight
 * @return {number} 
 * @example node.scrollHeight();
 */
function X_Node_scrollHeight(){
	return X_Node_BoxModel_mesure( this, 'scrollHeight', 'height' );
};

/**
 * 要素のスクロール位置。elm.scrollLeft
 * @alias Node.prototype.scrollLeft
 * @return {number} 
 * @example node.scrollLeft();
 */
function X_Node_scrollLeft(){
    if( this[ '_flags' ] & X_NodeFlags_IS_SVG ){
        return 0;
    };
	return X_Node_BoxModel_mesure( this, 'scrollLeft' );
};

/**
 * 要素のスクロール位置。elm.scrollTop
 * @alias Node.prototype.scrollTop
 * @return {number} 
 * @example node.scrollTop();
 */
function X_Node_scrollTop(){
    if( this[ '_flags' ] & X_NodeFlags_IS_SVG ){
        return 0;
    };
	return X_Node_BoxModel_mesure( this, 'scrollTop' );
};

/* --------------------------------------
 *  x, y
 *  position:absolute かつ x か y が設定されていたら、再描画しないで css オブジェクトから計算した値を返す。 float は?
 *  position:absolute の指定で自動で top,left を補う必要あり？ -> X.Node.CSS
 *  親要素 border 外側からの値。 IE, Firefox, Safari, Chrome の offsetLeft/Topでは、border 内側なので補正する。
 * transformX, Y は加える？ アニメーション中は？
 * 
 * http://www.din.or.jp/~hagi3/JavaScript/JSTips/DHTML/ProbIE5.htm#StyleObject
 */
// TODO X_Node_CSS_transform,

/**
 * 要素の親要素に対する位置。offsetLeft
 * @alias Node.prototype.x
 * @return {number} 
 * @example node.x();
 */
function X_Node_x(){
	return X_Node_BoxModel_mesure( this, 'offsetLeft', 'left' );
	
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'left' );
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'translateX' );
	//if( X_UA_DOM.IE4 ) return elm ? elm.style.pixelLeft : 0;
	//return elm ? elm.offsetLeft : 0;
};

/**
 * 要素の親要素に対する位置。offsetTop
 * @alias Node.prototype.y
 * @return {number} 
 * @example node.y();
 */
function X_Node_y(){
	return X_Node_BoxModel_mesure( this, 'offsetTop', 'top' );
	
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'top' );
	// this[ 'css' ]( X_Node_CSS_Unit.px, 'transisitonY' );
	//if( X_UA_DOM.IE4 ) return elm ? elm.style.pixelTop : 0;
	//return elm ? elm.offsetTop : 0;
};

/**
 * 要素の文書内の位置。
 * @alias Node.prototype.offset
 * @return {object} { x: {number}, y : {number} }
 * @example node.offset();
 */
function X_Node_offset(){
	var flags  = this[ '_flags' ],
		offset = { x : 0, y : 0 },
		obj, parent, elm;
	
	if( ( ( flags & X_NodeFlags_IN_TREE ) === 0 ) || ( flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE ) ) return offset;
	
	if( X_Node_body === this || X_Node_html === this ) return offset;

	X_Node_updateTimerID && X_Node_startUpdate();

	elm = this[ '_rawObject' ] || X_Node__ie4getRawNode && X_Node__ie4getRawNode( this );
	
	return elm ? X_Node_getPosition( elm ) : offset;
};

// エレメントの座標取得 ～スクロール要素～
// http://n-yagi.0r2.net/script/2009/07/post_16.html

// TODO getClientRects Safari2- ?

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//  エレメントの絶対座標を得たい
//------------------------------------------------------------------------------
//  座標取得
var X_Node_getPosition =
	!( ( X_UA.Trident || X_UA.TridentMobile ) < 5 ) && X_elmHtml.getBoundingClientRect ?
		(
			document.compatMode === 'CSS1Compat' && !X_UA.WebKit ? function( el ){
		        var pos  = el.getBoundingClientRect(),
		        	html = X_elmHtml;
		        return  {   x:(pos.left + html.scrollLeft - html.clientLeft)
		                ,   y:(pos.top  + html.scrollTop  - html.clientTop) };
			} :
			function( el ){
		        var pos  = el.getBoundingClientRect();
	            return  {   x:(pos.left +   window.pageXOffset)
	                    ,   y:(pos.top  +   window.pageYOffset)   };
			}
		) :
	( X_UA.Presto || X_UA.PrestoMobile ) < 10 ?
		function( el ){
            var ex  =   0;
            var ey  =   0;
            do
            { 
                ex  +=  el.offsetLeft;
                ey  +=  el.offsetTop;
            }
            while(  el  =   el.offsetParent );
            //
            return  {x:ex,y:ey};
		} :
		function(target)
        {
            var ex  =   0;
            var ey  =   0;
            //
            var el  =   target;
            var bd  =   X_elmBody;
            
            do
            { 
                ex  +=  el.offsetLeft   ||  0;
                ey  +=  el.offsetTop    ||  0;
            }
            while(  el  =   el.offsetParent );
            //  要素内スクロール対応
            el  =   target;
            do
            {
                ex  -=  el.scrollLeft   ||  0;
                ey  -=  el.scrollTop    ||  0;
                el  =   el.parentNode;
            }
            while(  el!=bd  );
            //
            return  {x:ex,y:ey};
        };

//■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

