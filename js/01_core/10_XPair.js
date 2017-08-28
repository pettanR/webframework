/**
 * Object(Array|Function)をキーにする、キーバリューストアを作る。js 自体にオブジェクトをキーとするハッシュの機能は無い為、内部はArrayで代用している。そのため値へのアクセスは低速。
 * 値を隠蔽したい場合に加え、速度が問題にならないケースや、速度対策を実施したうえで使用する。
 * @namespace X.Pair
 */
X[ 'Pair' ] = {
	'create'  : X_Pair_create,
	
	'get'     : X_Pair_get,
	
	'release' : X_Pair_release
};

var X_Pair_SIZE            = 1024,
	X_Pair_KEY_STORE_LIST  = [[]],
	X_Pair_PAIR_STORE_LIST = [[]],
	X_Pair_noChashe        = false,
	
	X_Pair_functionString  = new Function( 's', 'p', 'k', (function(){
		var ret = 'var i=0,l=s.length,a;' +
				  'for(;i<l;++i){' +
				  'a=s[i];' +
				  'switch(k){',
			j = 0, hex;
		for( ; j < X_Pair_SIZE; ++j ){
			hex = j.toString( 16 );
			ret += 'case a[0x' + hex + ']:return p[i][0x' + hex + '];';
		};
		return ret + '}}';
	})()),
	
	// TODO キャッシュするペアの数とヒット率、探索時間の記録
	X_Pair_lastKey, X_Pair_lastPair;

/**
 * Object(Array|Function)をキーとして値を登録。すでにキーが登録されている場合は登録できない。
 * @alias X.Pair.create
 * @param {object|function|array} key
 * @param {*} pair == false な値は不可
 * @return {boolean} true の場合、登録成功
 */
function X_Pair_create( key, pair ){
	var keyStore  = X_Pair_KEY_STORE_LIST[ X_Pair_KEY_STORE_LIST.length - 1 ],
		pairStore = X_Pair_PAIR_STORE_LIST[ X_Pair_PAIR_STORE_LIST.length - 1 ];
	
	X_Pair_noChashe = true;
	if( !pair || X_Pair_get( key ) || !( X_Type_isObject( key ) || X_Type_isArray( key ) || X_Type_isFunction( key ) ) ) return false;
	
	if( keyStore.length === X_Pair_SIZE ){
		keyStore  = X_Pair_KEY_STORE_LIST[ X_Pair_KEY_STORE_LIST.length   ] = [];
		pairStore = X_Pair_PAIR_STORE_LIST[ X_Pair_PAIR_STORE_LIST.length ] = [];
	};
	
	keyStore[  keyStore.length  ] = key;
	pairStore[ pairStore.length ] = pair;
	return true;
};

/**
 * キーとペアになっている値の取得。
 * @alias X.Pair.get
 * @param {object|function|array} key
 * @return {*}
 */
function X_Pair_get( key ){
	var chashe = !X_Pair_noChashe, pair;
	
	X_Pair_noChashe = false;
	if( key === X_Pair_lastKey ) return X_Pair_lastPair; // quick
	
	if( ( pair = X_Pair_functionString( X_Pair_KEY_STORE_LIST, X_Pair_PAIR_STORE_LIST, key ) ) && chashe ){
		X_Pair_lastKey  = key;
		X_Pair_lastPair = pair;
	};
	return pair;
};

/**
 * キー/バリューのペアを解消する。バリューは指定しなくても可。
 * @alias X.Pair.release
 * @param {object|function|array} key
 * @param {*} [pair=]
 * @return {boolean} true の場合解除成功
 */
function X_Pair_release( key, opt_pair ){
	var i = 0,
		l = X_Pair_KEY_STORE_LIST.length,
		keyStore, pairStore, j;
	
	for( ; i < l; ++i ){
		keyStore  = X_Pair_KEY_STORE_LIST[ i ];
		pairStore = X_Pair_PAIR_STORE_LIST[ i ];
		j = keyStore.indexOf( key );
		if( j !== -1 && ( opt_pair === undefined || pairStore[ j ] === opt_pair ) ){
			keyStore.splice( j, 1 );
			pairStore.splice( j, 1 );
			if( X_Pair_lastKey === key ){
				X_Pair_lastKey = X_Pair_lastPair = null;
			};
			return true;
		};
	};
	return false;
};

