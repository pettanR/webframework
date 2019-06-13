	/**
	 * Array か？判定する。argumnets 等のフェイク Array は false なので注意。
	 * @function
	 * @alias X.Type.isArray
	 */
var X_Type_isArray =
		new Function( 'v',
			( X_UA.Trident || X_UA.TridentMobile ) < 5.5 || X_UA.NetFront < 4 ? // netfront3.4 は html に  instanceof をすると error になる
				'return v&&v.push===Array.prototype.push' : // win ie5-, MacIE5.2
			( X_UA.Trident || X_UA.TridentMobile ) ?
				'return v&&Object.prototype.toString.call(v)==="[object Array]"' :
				'return v instanceof Array'
		),

	/**
	 * HTMLElement か？判定する。ちなみに return v instanceof Element は ie8 でエラー。
	 * @function
	 * @alias X.Type.isHTMLElement
	 */
	X_Type_isHTMLElement =
		new Function( 'v',
			( ( X_UA.Trident || X_UA.TridentMobile ) < 5 || X_UA.Tasman ) ?
				'return v&&v.tagName&&v.insertAdjacentHTML&&!0' : // ie4 or MacIE5.23, v.all <- error
			X_UA.NetFront < 4 ?
				'return v&&v.nodeType===1' : // instanceof not a function. netfront3.4 は html に  instanceof をすると error になる
			window[ 'HTMLElement' ] ?
				'return v instanceof HTMLElement' :
				'return v&&v.appendChild&&v.nodeType===1'
		);



/**
 * <p>ビルトイン型の判定に使用する関数を集めたもの。ブラウザのネイティブな判定関数には不可解な挙動があるので、X.Type を使用するほうがよい。
 * <a href="http://pettanr.sourceforge.jp/test/type.html">http://pettanr.sourceforge.jp/test/type.html</a>
 * @namespace X.Type
 * @alias X.Type
 */
X[ 'Type' ] = {
	'isObject'      : X_Type_isObject,
	'isFunction'    : X_Type_isFunction,
	'isUnknown'     : X_Type_isUnknown,
	'isArray'       : X_Type_isArray,
	'isBoolean'     : X_Type_isBoolean,
	'isString'      : X_Type_isString,
	'isNumber'      : X_Type_isNumber,
	'isFinite'      : X_Type_isFinite,
	'isNaN'         : X_Type_isNaN,
	'isHTMLElement' : X_Type_isHTMLElement,
	'isImage'       : X_Type_isImage,
	'isNull'        : X_Type_isNull,
	'isUndefined'   : X_Type_isUndefined
};

	/**
	 * <p>Object か？判定する。
	 * <p>typeof null === 'object' に対策済なので null は Object ではない。
	 * <p>new String(), new Number(), new Boolean() も typeof object なので対策
	 * @alias X.Type.isObject
	 */
	function X_Type_isObject( v ){
		return v && typeof v === 'object' && v !== v + '' && v !== v + 0 && v !== true; // typeof null === 'object' に対策
	};
	/**
	 * Function か？判定する。
	 * @alias X.Type.isFunction
	 */
	function X_Type_isFunction( v ){
		return typeof v === 'function';
	};
	/**
	 * ie の XHR.open 等ビルトインオブジェクトか？判定する。
	 * @alias X.Type.isUnknown
	 */
	function X_Type_isUnknown( v ){
		return typeof v === 'unknown';
	};

	/**
	 * 真偽値か？判定する。
	 * @alias X.Type.isBoolean
	 */
	function X_Type_isBoolean( v ){
		return v === true || v === false;
	};
	/**
	 * 文字列か？判定する。
	 * @alias X.Type.isString
	 */
	function X_Type_isString( v ){
		return /* typeof v === 'string'; */ v === v + ''; // 文字列の加算は IE で遅いかも。
	};
	/**
	 * 数値か？判定する。
	 * @alias X.Type.isNumber
	 */
	function X_Type_isNumber( v ){
		return /* typeof v === 'number'; */ v + 0 === v || v !== v;
	};
	/**
	 * finite か？判定する。isFinite( '123' ) === true に対策済。
	 * @alias X.Type.isFinite
	 */
	function X_Type_isFinite( v ){
		return v + 0 === v && isFinite( v );
	};
	/**
	 * NaN か？判定する。isNaN( 'NaN' ) === true に対策済。
	 * @alias X.Type.isNaN
	 */
	function X_Type_isNaN( v ){
		return v !== v;
	};

	
	/**
	 * new Image した場合に HTMLImageElement が作られるブラウザと,そうでないブラウザ(IE8-)がある
	 * @alias X.Type.isImage
	 */	
	function X_Type_isImage( v ){
		if( v && v.constructor === window.Image ) return true;
		if( v && window.HTMLImageElement && v.constructor === window.HTMLImageElement ) return true; // ie6- は constructor が undef、HTMLImageElement が undef なので、HTMLElement の存在確認が必要
		if( X_UA.WebKit < 525.13 ){ // Safari3-
			if( v && !X_Type_isUndefined( v.src ) && !X_Type_isUndefined( v.onload ) && X_Type_isNumber( v.height ) && X_Type_isNumber( v.width ) && X_Type_isBoolean( v.complete ) ){
				return true;
			};
		};
		return false;
	};
	/*
	isElementCollection : function(v) {
		return (Object.prototype.toString.call(v) === "[object HTMLCollection]");
	},
	*/
	/**
	 * Null か？判定する。
	 * @alias X.Type.isNull
	 */
	function X_Type_isNull( v ){
		return v === null;
	};
	/**
	 * undefined か？判定する。
	 * @alias X.Type.isUndefined
	 */
	function X_Type_isUndefined( v ){
		return v === undefined;
	};
