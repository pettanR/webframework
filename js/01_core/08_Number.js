/**
 * Number に関する関数を集めたものです。
 * @namespace X.Number
 * @alias X.Number
 */
X[ 'Number' ] = {
	'conpareVersion'      : X_Number_conpareVersion
};

/**
 * X.X.X という形式のバージョン文字列同志の比較  
 * -1 v1 < v2
 *  0 v1 = v2
 *  1 v1 > v2
 * @alias X.Number.copy
 * @param {Number} ary コピー元のオブジェクトです。
 * @return {Number}
 */
 function X_Number_conpareVersion( v1, v2 ){
	var i = 0,
		l, n1, n2;
	
	v1 = v1.split( '.' );
	v2 = v2.split( '.' );	
	
	l = Math.min( v1.length, v2.length );

	for( ; i < l; ++i ){
		n1 = parseFloat( v1[ i ] );
		n2 = parseFloat( v2[ i ] );
		if( n1 !== n2 ){
			return n1 > n2 ? 1 : -1;
		};
	};
	if( v1.length === v2.length ) return 0;
	return v1.length > v2.length ? 1 : -1;
};
