/**
 * @preserve Copyright 2012-2014 pettanR team.
 * https://sourceforge.jp/projects/pettanr/
 * BSD 3-Clause License
 */

/* 
 * ビルトインオブジェクトに拡張したい10のメソッド
 * http://d.hatena.ne.jp/ofk/20080922/1222047483
 */

Function.prototype.apply || (Function.prototype.apply = function (x, y) {
    var apply = '__apply',
        a, i, r, j;

    x = x || window;
    y = y || [];
    
    // apply 内で apply を呼んだ場合に備える
    if( x === window ){
        x[ apply ] = void 0;
    } else {
        if( x.constructor && x.constructor.prototype[ apply ] ){
            delete x.constructor.prototype[ apply ];
        } else
        if( x[ apply ] ) delete x[ apply ];
    };
    
    x[ apply ] = this;
    if (!x[ apply ]) x.constructor.prototype[ apply ] = this;
    j = y.length;
    switch (j) {
        case 0: r = x[ apply ](); break;
        case 1: r = x[ apply ](y[0]); break;
        case 2: r = x[ apply ](y[0], y[1]); break;
        case 3: r = x[ apply ](y[0], y[1], y[2]); break;
        case 4: r = x[ apply ](y[0], y[1], y[2], y[3]); break;
        case 5: r = x[ apply ](y[0], y[1], y[2], y[3], y[4]); break;
        case 6: r = x[ apply ](y[0], y[1], y[2], y[3], y[4], y[5]); break;
        case 7: r = x[ apply ](y[0], y[1], y[2], y[3], y[4], y[5], y[6]); break;
        case 8: r = x[ apply ](y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7]); break;
        case 9: r = x[ apply ](y[0], y[1], y[2], y[3], y[4], y[5], y[6], y[7], y[8]); break;
        default:
            a = [];
            for (i = 0; i < j; ++i)
                a[i] = 'y[' + i + ']';
            //r = eval('x.__apply(' + a.join(',') + ')');
            // closuer compiler 対策
            r = (new Function( 'x,y', 'return x.__apply(' + a.join(',') + ')' ))( x, y );
            break;
    };
    // ie5
    if( x === window ){
        x[ apply ] = void 0;
    } else {
        //alert( typeof x );
        if( x.constructor && x.constructor.prototype[ apply ] ){
            delete x.constructor.prototype[ apply ];
        } else
        if( x[ apply ] ) delete x[ apply ];
    };
    return r;
});
Function.prototype.call || (Function.prototype.call = function () {
    var a = arguments, x = a[0], y = [], i = 1, j = a.length;
    for (; i < j; ++i)
        y[i - 1] = a[i];
    return this.apply(x, y);
});

Array.prototype.pop || (Array.prototype.pop = function () {
    var r = this[this.length - 1];
    --this.length;
    return r;
});
Array.prototype.push || (Array.prototype.push = function () {
    var a = arguments, i = 0, j = a.length, l = this.length;
    for (; i < j; ++i)
        this[l + i] = a[i];
    return this.length;
});
Array.prototype.shift || (Array.prototype.shift = function () {
    var r = this[0], i = 1, j = this.length;
    for( ; i < j; ++i)
        this[i - 1] = this[i];
    --this.length;
    return r;
});
Array.prototype.unshift || (Array.prototype.unshift = function () {
    var a = arguments, l = a.length, j = this.length += l - 1, i = j;
    for (; i >= l; --i)
        this[i] = this[i - l];
    for (i = 0; i < l; ++i)
        this[i] = a[i];
    return j;
});
Array.prototype.splice || (Array.prototype.splice = function (x, y) {
    var a = arguments, s = a.length - 2 - y, r = this.slice(x, x + y),i,j;
    if (s > 0) {
        for (i = this.length - 1, j = x + y; i >= j; --i)
            this[i + s] = this[i];
    }
    else if (s < 0) {
        for (i = x + y, j = this.length; i < j; ++i)
            this[i + s] = this[i];
        this.length += s;
    }
    for (i = 2, j = a.length; i < j; ++i)
        this[i - 2 + x] = a[i];
    return r;
});

/*
 * original
 * JavaScript 1.6, Array.indexOfを下位互換実装する
 * http://www.inazumatv.com/contents/archives/7965
 */

Array.prototype.indexOf || (Array.prototype.indexOf = function( searchElement, fromIndex ){
        var l = this.length >>> 0, i;
        
        if( l === 0 ) return -1;
        
        if( fromIndex ){
            i = fromIndex || 0;
            i = i === -Infinity ? 0 : ( i < 0 ? -i : i ) | 0; // Math.floor
            if( l <= i ) return -1;
        };

        for( i = 0 <= i ? i : 0 < l + i ? l + i : 0; i < l; ++i ){
            if( this[ i ] === searchElement ) return i;
        };
        return -1;
    });


/*
 * JavaScript split Bugs: Fixed!
 * http://blog.stevenlevithan.com/archives/cross-browser-split
 */

/*
 * original:
 * by https://web.archive.org/web/20100413085309/http://nurucom-archives.hp.infoseek.co.jp/digital/trans-uri.html
 */
var _builtin_skipEncodeURI = (function(){
    var encodeURIComponentTarget = '!\'()*-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~',
        encodeURITarget = '#$&+,-/:;=?@',
        obj = {}, i;
    for( i = encodeURIComponentTarget.length; i; ){
        obj[ encodeURIComponentTarget.charCodeAt( --i ) ] = 2;
    };
    for( i = encodeURITarget.length; i; ){
        obj[ encodeURITarget.charCodeAt( --i ) ] = 1;
    };
    return obj;
})();

// /[^!#$&-;=?-Z_a-z~]/g
window[ 'encodeURI' ] || (window[ 'encodeURI' ] = function( x ){ return _builtin_encodeURI( x, 0 ); });
// /[^!'-*.0-9A-Z_a-z~-]/g
window[ 'encodeURIComponent' ] || (window[ 'encodeURIComponent' ] = function( x ){ return _builtin_encodeURI( x, 1 ); });

function _builtin_encodeURI( x, kind ){
    var result = [],
        skip   = _builtin_skipEncodeURI,
        p      = '%',
        i = 0, l, chr, c;
    
    x += '';
    
    for( l = x.length; i < l; ++i ){
        if( !( kind < skip[ c = x.charCodeAt( i ) ] ) ){
            chr = (
                c < 16 ? '%0' + c.toString(16) :
                c < 128 ? p + c.toString(16) :
                c < 2048 ? p + (c >> 6 | 192).toString(16) + p + (c & 63 | 128).toString(16) :
                p + (c >> 12 | 224).toString(16) + p + (c >> 6 & 63 | 128).toString(16) + p + (c & 63 | 128).toString(16)
            ).toUpperCase();
        } else {
            chr = x.charAt( i );
        };
        result[ i ] = chr;
    };
    
    return result.join( '' );
};


function _builtin_decodeURI( x ){
    var result    = [],
        toInt     = parseInt,
        toChrCode = String.fromCharCode,
        n = -1, i = 0, l, chr, decode, code, memory;
    
    x += '';
    
    for( l = x.length; i < l; ++i ){
        if( decode ){
            code = toInt( x.substr( i, 2 ), 16 );
            ++i;                    
            if( 127 < code ){
                if( 223 < code ){
                    memory = ( code & 15 ) << 12;
                    code = toInt( x.substr( i + 2, 2 ), 16 ) & 63; // 00%00%00
                    i += 3;
                    memory += code << 6;                            
                } else {
                    memory = ( code & 63 ) << 6;
                };
                code = toInt( x.substr( i + 2, 2 ), 16 ) & 63;
                i += 3;
                code += memory;
            };
            // if( code !== code ) error
            //console.log( code );
            result[ ++n ] = toChrCode( code );
            decode = false;
        } else {
            chr = x.charAt( i );
            if( !( decode = chr === '%' ) ){
                result[ ++n ] = chr;            
            };
        };
    };
    
    return result.join( '' );
};

window[ 'decodeURI' ] || (window[ 'decodeURI' ] = _builtin_decodeURI);
window[ 'decodeURIComponent' ] || (window[ 'decodeURIComponent' ] = window.decodeURI);


/*
 * String
 */

// replace(RegExp, Function)対応
/*
if (window.ActiveXObject ? !Number.prototype.toFixed : (!navigator.taintEnabled && !document.createElement("input").setSelectionRange))
    (function () {
        var g = String.prototype.replace;
        String.prototype.replace = function (x, y) {
            var s = this, z = y;
            // 第二引数が関数
            if (y instanceof Function) {
                // 第一引数が正規表現
                if (x instanceof RegExp) {
                    // その上、グローバルマッチ
                    if (x.global || /^\/.*g$/.test(x)) {
                        var r = [], m;
                        while ((m = x.exec(s)) != null) {
                            var i = m.index;
                            r[r.length] = s.slice(0, i);
                            s = s.slice(i + m[0].length);
                            r[r.length] = y.apply(null, m.concat(i, this));
                        }
                        r[r.length] = s;
                        return r.join("");
                    }
                    var m = x.exec(s);
                    if (!m)
                        return s;
                    z = y.apply(null, m.concat(m.index, s));
                }
                else {
                    var i = s.indexOf(x);
                    if (i < 0)
                        return s;
                    z = y(x, i, s);
                }
            }
            return g.call(s, x, z);
        };
    })(); */
    
