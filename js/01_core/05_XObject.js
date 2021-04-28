/**
 * name in object 構文が使えない環境で構文解析エラーを回避するためにこのメソッドを使用します。
 * 但し for( name in object ) については構文解析エラーになる環境はありません。
 * @alias X.Object.inObject
 * @function
 * @param {string|number} name 
 * @param {object} obj 
 * @return {boolean} name が定義されている(値が undefined や null でも) -> true
 */
var X_Object_inObject = !X_Script_gte15 ? // TODO JScript で判定
    (function( name, obj, _ ){
        name += ''; // 数値も許可
        if( obj[ name ] ) return true; // quick
        for( _ in obj ){
            if( _ === name ) return true;
        };
        return false;
    }) :
    new Function( 'a,b', 'return (""+a) in b' );


// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * Object に関する関数を集めたものです。
 * @namespace X.Object
 * @alias X.Object
 */
X[ 'Object' ] = {

    'copy'       : X_Object_copy,
    
    'deepCopy'   : X_Object_deepCopy,
    
    'override'   : X_Object_override,
    
    'clear'      : X_Object_clear,
    
    'isEmpty'    : X_Object_isEmpty,
    
    'inObject'   : X_Object_inObject,
    
    'find'       : X_Object_find
    // TODO hasOwnProperty
};

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //
/**
 * 単純なクローンでメンバーをコピーしたオブジェクトを返します。 k in null でエラーになる Opera7- に対策済。
 * @alias X.Object.copy
 * @param {object|Array} src コピー元のオブジェクトです。
 * @return {object|Array}
 */
function X_Object_copy( src ){
    var ret, k;
    
    if( !src || !X_Type_isObject( src ) ) return src;
    
    ret = {};
    for( k in src ){
        ret[ k ] = src[ k ];
    };
    return ret;
};

/**
 * オブジェクトにオブジェトのメンバーをコピーします。同じ名前のメンバーは上書きされます。
 * @alias X.Object.override
 * @param {object} target コピーされるオブジェクトです。返り値はこのオブジェクトです。
 * @param {object} src コピー元のオブジェクトです。
 * @return {object} target が返る。
 */
function X_Object_override( target, src ){
    var k;
    if( !src || !X_Type_isObject( src ) ) return target;
    for( k in src ){
        target[ k ] = src[ k ];
    };
    return target;
};

/**
 * オブジェクトの全てのメンバーを破棄します。
 * @alias X.Object.clear
 * @param {object} obj
 */
function X_Object_clear( obj, k ){
    if( obj ){
        for( k in obj ){
            delete obj[ k ];
        };
    };
};


/**
 * オブジェクト(object, Array)のメンバーを探索して、ディープコピーしたオブジェクトを返します。
 * オブジェクトが循環参照している場合は、既にコピーしているオブジェクトが現れた時点で、先に作成しているコピーの参照を返すので無限にループすることはありません。
 * @alias X.Object.deepCopy
 * @param {object|Array} src コピー元のオブジェクトです。
 * @return {object|Array}
 */
function X_Object_deepCopy( src ){        
    return X_Object_deepCopy_( src, [], [], -1 );
};

function X_Object_deepCopy_( src, objSrc, objCopy, n ){
    var ret, i, k;

    if( !src ){ // 0, "", null, undefined, NaN, false
        return src;
    } else
    if( X_Type_isArray( src ) ){
        i = objSrc.indexOf( src );
        if( i !== -1 ) return objCopy[ i ];
        objSrc[ ++n ] = src;
        objCopy[ n ]  = ret = [];
    } else
    if( X_Type_isObject( src ) ){
        i = objSrc.indexOf( src );
        if( i !== -1 ) return objCopy[ i ];
        objSrc[ ++n ] = src;
        objCopy[ n ]  = ret = {};
    } else {
        // string, number, true
        return src;
    };
    for( k in src ){
        ret[ k ] = X_Object_deepCopy_( src[ k ], objSrc, objCopy, n );
    };
    return ret;
};

/**
 * object が空か？調べます。 object でない場合、undefined が返る
 * @alias X.Object.isEmpty
 * @param {object} v 
 * @return {boolean|undefined}
 */
function X_Object_isEmpty( v ){
    if( !v ) return;
    for( var k in v ){
        return false;//if( v.hasOwnProperty && v.hasOwnProperty( p ) ) return false; ie4 で動かない、、、
    };
    return true;
};

/**
 * obj に対し、selector で示した値を返す。メンバを辿れなかった場合、undefined が返る。
 * @alias X.Object.find
 * @param {object} obj
 * @param {string} selector 'navigator>mineTypes>hoge'
 * @return {*}
 */
function X_Object_find( obj, selector ){
    var selectors = selector.split( '>' );
    
    for( ; selector = selectors.shift(); ){
        obj = obj[ selector ];
        if( !obj ) return;
    };
    return obj;
};

// TODO X.Object.own( obj, name )
// delete obj[ name ] の戻り値で知ることが出来ない？
/*
 * Safari の JavaScript の不備 
 * http://nanto.asablo.jp/blog/2006/01/13/209495
 * 
 * web.paulownia.jp - JavaScriptとクロージャ
 * https://web.archive.org/web/20070526063400/http://web.paulownia.jp/script/oop/closure.html
 * MacOSX 10.3のsafariにはhasOwnPropertyが実装されていないので、独自に追加する必要があります。
 * 
 * prototype汚染問題でhasOwnPropertyを使わないクロスブラウザな方法
 * http://os0x.hatenablog.com/entry/20080901/1220272509
 */
/*
Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function( p ){
        var proto = this.constructor && this.constructor.prototype,
            __p__ = proto && proto.__proto__,
            v     = this[ p ],
            r     = false;
        
        if( __p__ ) proto.__proto__ = null;
        
        if( p in this ){
            if( v !== v ){
                if( proto && ( p in proto ) && proto[ p ] !== proto[ p ] ){ // proto[ p ] is NaN
                    proto[ p ] = 0; // different value
                    r = this[ p ] !== this[ p ]; // isNaN?
                    proto[ p ] = v; // set NaN
                } else {
                    r = true;
                };
            } else
            if( proto && p in proto && proto[ p ] === v ){
                // this と proto に同名で同値が書かれている可能性あり
                proto[ p ] = v + ' '; // different value
                r = v === this[ p ];
                proto[ p ] = v;
            } else {
                r = true;
            };
        };
        
        if( __p__ ) proto.__proto__ = __p__;
        
        return r;
  }); */
/*
Object.prototype.hasOwnProperty || (Object.prototype.hasOwnProperty = function( p ){
        var proto = this.constructor && this.constructor.prototype,
            __p__ = proto && proto.__proto__,
            r     = false,//!!( __p__ && ( proto.__proto__ = null ) )
            _pro_, v, isNaN;
        
        if( __p__ ) proto.__proto__ = null;
        if( this.__proto__ ){
            _pro_ = this.__proto__;
            this.__proto__ = null;
        };
        
        if( p === '__proto__' ){
            r = !!_pro_;
        } else {
            v     = this[ p ];
            isNaN = v !== v;        
            
            if( p in this ){
                if( proto && p in proto && ( proto[ p ] === v ) ^ isNaN ){ //true + false, false + true
                    // this と proto に同名で同値が書かれている可能性あり
                    proto[ p ] = v + ' '; // different value
                    r = ( v === this[ p ] ) ^ isNaN; // true + false, false + true
                    proto[ p ] = v;
                } else {
                    r = true;
                };
            };            
        };

        if( __p__ ) proto.__proto__ = __p__;
        if( _p_ ) this.__proto__ = _pro_;
        return r;
  }); */
 
 

