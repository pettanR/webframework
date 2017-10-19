
// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //
var X_URL_BASE_URL = ( function( parts ){
		var last = 1 < parts.length && parts[ parts.length - 1 ];
		
		if( last !== false && ( last === '' || //末尾が/で終わるとき
			last.indexOf( '.' ) !== -1 ) ){    //末尾がファイル名で終わる時
			--parts.length;
		};
		return parts.join( '/' );
	})( X_URL_cleanup( location.href ).split( '/' ) ),
	
	X_URL_HOST     = location.protocol + '//' + location.hostname,
	
	X_URL_IS_FILE  = location.protocol === 'file:',
	
	X_URL_IS_LOCAL = X_URL_IS_FILE || location.hostname === 'localhost' || location.hostname === '127.0.0.1',
	
	X_URL_PARAMS = X_URL_paramToObj( location.search.slice( 1 ) );

// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * @namespace X.URL
 * @alias X.URL
 */
X[ 'URL' ] = {
	/**
	 * ベースurl
	 * @alias X.URL.BASE_URL
	 * @type {string}
	 */
	'BASE_URL'       : X_URL_BASE_URL,
	/**
	 * ファイルプロトコルである。
	 * @alias X.URL.IS_FILE
	 * @type {boolean}
	 */
	'IS_FILE'        : X_URL_IS_FILE,
	/**
	 * ローカルホストである。
	 * @alias X.URL.IS_LOCAL
	 * @type {boolean}
	 */
	'IS_LOCAL'       : X_URL_IS_LOCAL,
	/**
	 * url　パラメータを object に格納したもの。
	 * @alias X.URL.PARAMS
	 * @type {object}
	 */
	'PARAMS'         : X_URL_PARAMS,

	'create'         : X_URL_create,
	
	'toAbsolutePath' : X_URL_toAbsolutePath,
	
	'objToParam'     : X_URL_objToParam,

	'paramToObj'     : X_URL_paramToObj,

	'isSameDomain'   : X_URL_isSameDomain,
	
	'isSameProtocol' : X_URL_isSameProtocol,
	
	'isLocal'        : X_URL_isLocal,
	
	'cleanup'        : X_URL_cleanup,
	
	'getEXT'         : X_URL_getEXT,

	'getSearch'      : X_URL_getSearch,
	
	'getHash'        : X_URL_getHash
};

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //
/**
 * <p>絶対 url にして返します。
 * <p>original AS3で相対パスを絶対パスに変換する http://web.archive.org/web/20140404021256/http://www.shin-go.net/motionlab/?p=449
 * @alias X.URL.toAbsolutePath
 * @param {string}
 * @return {string} url
 */
function X_URL_toAbsolutePath( path ){
	var s  = '/',
		ss = '//',
		_ary, ary, i = 0;

	if( 'http:file:https'.indexOf( path.substr( 0, 5 ) ) !== -1 ) return path;
	
	_ary = X_URL_BASE_URL.split( ss );
	ary  = _ary[ 1 ].split( s );

	if( path.charAt( 0 ) === s ) return [ _ary[ 0 ], ss, ary[ 0 ], path ].join( '' );
		
	if( path.substr( 0, 2 ) === './' ){
		path = path.substr( 2 );
	} else {
		while( path.substr( i, 3 ) === '../' ){
			--ary.length;
			i += 3;
		};
		if( i ) path = path.substr( i );
	};
	return [ _ary[ 0 ], ss, ary.join( s ), s, path ].join( '' );
};
/**
 * 同一ドメインか？
 * @alias X.URL.isSameDomain
 * @param {string}
 * @return {boolean}
 */
function X_URL_isSameDomain( path ){
	path = X_URL_cleanup( X_URL_toAbsolutePath( path ) );
	return path === X_URL_HOST || path.indexOf( X_URL_HOST + '/' ) === 0;
};
/**
 * 同一プロトコルか？
 * @alias X.URL.isSameProtocol
 * @param {string}
 * @return {boolean}
 */
function X_URL_isSameProtocol( path ){
	return X_URL_toAbsolutePath( path ).indexOf( location.protocol ) === 0;
};
/**
 * ローカルリソースへのアクセスか？
 * @alias X.URL.isLocal
 * @param {string}
 * @return {boolean}
 */
function X_URL_isLocal( path ){
	return X_URL_toAbsolutePath( path ).indexOf( 'file:' ) === 0;
};
/**
 * url パラメータとハッシュフラグメントを削除します。
 * @alias X.URL.cleanup
 * @param {string}
 * @return {boolean}
 */
function X_URL_cleanup( path ){
	return path.split( '?' )[ 0 ].split( '#' )[ 0 ];
};
/**
 * 拡張子を返します。
 * @alias X.URL.getEXT
 * @param {string}
 * @return {string}
 */
function X_URL_getEXT( path ){
	path = X_URL_cleanup( path ).split( '.' );
	return path.length ? path.pop() : '';
};
/**
 * サーチクエリを返します。
 * @alias X.URL.getSearch
 * @param {string}
 * @return {string}
 */
function X_URL_getSearch( path ){
	path = path.split( '#' )[ 0 ].split( '?' );
	path.splice( 0, 1 );
	return path.join( '?' );
}
/**
 * ハッシュフラグメントを返します。
 * @alias X.URL.getHash
 * @param {string}
 * @return {string}
 */
function X_URL_getHash( path ){
	path = path.split( '#' );
	path.splice( 0, 1 );
	return path.join( '#' );
}

/**
 * object を　url パラメータにします。値が object の場合、データは失われます。
 * @alias X.URL.objToParam
 * @param {object}
 * @return {string}
 */
function X_URL_objToParam( data ){
	var result = [], k, n = -1;
	for( k in data ){
		if( n !== -1 ) result[ ++n ] = '&';
		result[ ++n ] = k;
		result[ ++n ] = '=';
		result[ ++n ] = encodeURIComponent( data[ k ] );
	}
	return result.join( '' );
};
/**
 * url にパラメータを加えた url を返します。
 * @alias X.URL.create
 * @param {string}
 * @param {object}
 * @return {string}
 */
function X_URL_create( url, params ){
	if( !X_Type_isObject( params ) || !( params = X_URL_objToParam( params ) ) ) return url;
	
	return url + ( url.indexOf( '?' ) !== -1 ? '&' : '?' ) + params;
};

/**
 * url パラメータを object にします。
 * @alias X.URL.paramToObj
 * @param {string}
 * @return {object}
 */
function X_URL_paramToObj( str ){
	var i   = 0,
		obj = {},
		parts, l, pair, p;

	if( !str ) return obj;
	
	for( parts = str.split( '&' ), l = parts.length; i < l; ++i ){
		pair = parts[ i ];
		p    = pair.indexOf( '=' );
		if( p === -1 ){
			obj[ decodeURIComponent( pair ) ] = true;
		} else {
			obj[ decodeURIComponent( pair.substr( 0, p ) ) ] = X_String_parse( decodeURIComponent( pair.substr( p + 1 ) ) );
		};
	};

	return obj;	
};
