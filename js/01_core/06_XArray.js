/**
 * Array に関する関数を集めたものです。
 * @namespace X.Array
 * @alias X.Array
 */
X[ 'Array' ] = {
	'copy'      : X_Array_copy
};

// renamed
// X.Object.cloneArray -> X.Array.copy
// X.Object.clone -> X.Object.copy

/**
 * 単純にメンバーをコピーした Array を返します。
 * @alias X.Array.copy
 * @param {Array} ary コピー元のオブジェクトです。
 * @return {Array}
 */
function X_Array_copy( ary ){
	var ret = [],
		i = 0,
		l = ary.length;

	for( ; i < l; ++i ){
		ret[ i ] = ary[ i ];
	};
	return ret;
};

/*	
X.matchTest = function( array1, array2 ){
	var i = array2.length;
	for( ; i; ){
		if( array1.indexOf( array2[ --i ] ) === -1 ) return false;
	};
	return true;
}; */

