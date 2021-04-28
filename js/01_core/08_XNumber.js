/**
 * Number に関する関数を集めたものです。
 * @namespace X.Number
 * @alias X.Number
 */
X[ 'Number' ] = {
    'conpareVersion' : X_Number_conpareVersion
};

/**
 * X.X.X という形式のバージョン文字列同士の比較 <br>
 * -1 v1 < v2<br>
 *  0 v1 = v2<br>
 *  1 v1 > v2
 * @alias X.Number.conpareVersion
 * @param {string} v1 '1.12.20151114' バージョン文字列。
 * @param {string} v2
 * @return {number} 比較結果
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
    // TODO 末尾が .000 の場合
    return v1.length > v2.length ? 1 : -1;
};
