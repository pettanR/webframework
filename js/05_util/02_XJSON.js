/**
 * ユーティリティ関数とユーティリティクラス
 * @namespace X.JSON
 */
var X_JSON = X[ 'JSON' ] =

// TODO ie8 は子フレームには JSON がいない…アクセス可能な親を探索

						// JavaScriptでunicode文字列をunescapeする
						// http://perutago.seesaa.net/article/202801583.html
						
						// http://blog.livedoor.jp/dankogai/archives/51503830.html		
						// Ajax - IE8にもJSON入ってます。使えるとは限らないけど
						// Compatibility mode (別名Quirks mode) では、JSONオブジェクトは無効になります。iframeもだめです
( 8 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 9 ) ? {
	'stringify' : function( o ){
		return unescape( JSON.stringify( o ) );
	},
	
	'parse' : JSON.parse
} :

window.JSON ||
{
	'stringify' : X_JSON_stringify,
	
	'parse'     : X_JSON_parseTrustableString
};


/**
 * 
 * @alias X.JSON.stringify
 */
function X_JSON_stringify( obj ){
	var json = '', k, v;
	for( k in obj ){
		if( json ) json += ',';
		v = obj[ k ];
		v = v || v === 0 ? v : null;
		json += '"' + k + '":' + ( X_Type_isObject( v ) ? X_JSON_stringify( v ) : X_Type_isString( v ) ? '"' + v + '"' : v );
	};
	//console.log( json );
	return '{' + json + '}';
};

/**
 * <p>JSON を持たないブラウザでは、eval を使用します。よって、信頼できる文字列だけに対してパースを行います。
 * <p>url パラメータや window.name に対して使用する際は最新の注意を払います。
 * @alias X.JSON.parse
 */
function X_JSON_parseTrustableString( jsonString ){
	if( !jsonString ) return jsonString; // '' の場合エラ－になる
	return window.JSON ? JSON.parse( jsonString ) : eval( '(' + jsonString + ')' );
};

