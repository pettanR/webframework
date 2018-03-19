/*
http://shimax.cocolog-nifty.com/search/2006/09/post_b296.html
ここで、「String.fromCharCode(13,10)」というのは、「\r\n」のことであり、Windowsの改行コードです。もちろん、「\r\n」でも良いのですが、半角円マークが出現すると、LinuxのブラウザKonquerorで正しく動作しないことがあるため、半角円マークを使わないようにしています（参照：Konquerorとエスケープ文字（JavaScript謎のエラーを解く））。
*/

// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //
var X_String_CRLF = String.fromCharCode( 13 ) + String.fromCharCode( 10 ), // String.fromCharCode( 13, 10 )
    X_String_CHAR_REFS = {"&nbsp;":160,"&iexcl;":161,"&cent;":162,"&pound;":163,"&curren;":164,"&yen;":165,"&brvbar;":166,"&sect;":167,"&uml;":168,"&copy;":169,
"&ordf;":170,"&laquo;":171,
"&not;":172,"&shy;":173,"&reg;":174,"&macr;":175,"&deg;":176,"&plusmn;":177,"&sup2;":178,"&sup3;":179,"&acute;":180,"&micro;":181,"&para;":182,
"&middot;":183,"&cedil;":184,"&sup1;":185,"&ordm;":186,"&raquo;":187,"&frac14;":188,"&frac12;":189,"&frac34;":190,"&iquest;":191,"&Agrave;":192,
"&Aacute;":193,"&Acirc;":194,"&Atilde;":195,"&Auml;":196,"&Aring;":197,"&AElig;":198,"&Ccedil;":199,"&Egrave;":200,"&Eacute;":201,"&Ecirc;":202,
"&Euml;":203,"&Igrave;":204,"&Iacute;":205,"&Icirc;":206,"&Iuml;":207,"&ETH;":208,"&Ntilde;":209,"&Ograve;":210,"&Oacute;":211,"&Ocirc;":212,
"&Otilde;":213,"&Ouml;":214,"&times;":215,"&Oslash;":216,"&Ugrave;":217,"&Uacute;":218,"&Ucirc;":219,"&Uuml;":220,"&Yacute;":221,"&THORN;":222,
"&szlig;":223,"&agrave;":224,"&aacute;":225,"&acirc;":226,"&atilde;":227,"&auml;":228,"&aring;":229,"&aelig;":230,"&ccedil;":231,"&egrave;":232,
"&eacute;":233,"&ecirc;":234,"&euml;":235,"&igrave;":236,"&iacute;":237,"&icirc;":238,"&iuml;":239,"&eth;":240,"&ntilde;":241,"&ograve;":242,
"&oacute;":243,"&ocirc;":244,"&otilde;":245,"&ouml;":246,"&divide;":247,"&oslash;":248,"&ugrave;":249,"&uacute;":250,"&ucirc;":251,"&uuml;":252,
"&yacute;":253,"&thorn;":254,"&yuml;":255,"&OElig;":338,"&oelig;":339,"&Scaron;":352,"&scaron;":353,"&Yuml;":376,"&circ;":710,"&tilde;":732,"&fnof;":402,
"&Alpha;":913,"&Beta;":914,"&Gamma;":915,"&Delta;":916,"&Epsilon;":917,"&Zeta;":918,"&Eta;":919,"&Theta;":920,"&Iota;":921,"&Kappa;":922,"&Lambda;":923,
"&Mu;":924,"&Nu;":925,"&Xi;":926,"&Omicron;":927,"&Pi;":928,"&Rho;":929,"&Sigma;":931,"&Tau;":932,"&Upsilon;":933,"&Phi;":934,"&Chi;":935,"&Psi;":936,
"&Omega;":937,"&alpha;":945,"&beta;":946,"&gamma;":947,"&delta;":948,"&epsilon;":949,"&zeta;":950,"&eta;":951,"&theta;":952,"&iota;":953,"&kappa;":954,
"&lambda;":955,"&mu;":956,"&nu;":957,"&xi;":958,"&omicron;":959,"&pi;":960,"&rho;":961,"&sigmaf;":962,"&sigma;":963,"&tau;":964,"&upsilon;":965,"&phi;":966,
"&chi;":967,"&psi;":968,"&omega;":969,"&thetasym;":977,"&upsih;":978,"&piv;":982,"&ensp;":8194,"&emsp;":8195,"&thinsp;":8201,"&zwnj;":8204,"&zwj;":8205,
"&lrm;":8206,"&rlm;":8207,"&ndash;":8211,"&mdash;":8212,"&lsquo;":8216,"&rsquo;":8217,"&sbquo;":8218,"&ldquo;":8220,"&rdquo;":8221,"&bdquo;":8222,
"&dagger;":8224,"&Dagger;":8225,"&bull;":8226,"&hellip;":8230,"&permil;":8240,"&prime;":8242,"&Prime;":8243,"&lsaquo;":8249,"&rsaquo;":8250,"&oline;":8254,
"&frasl;":8260,"&euro;":8364,"&image;":8465,"&ewierp;":8472,"&real;":8476,"&trade;":8482,"&alefsym;":8501,"&larr;":8592,"&uarr;":8593,"&rarr;":8594,
"&darr;":8595,"&harr;":8596,"&crarr;":8629,"&lArr;":8656,"&uArr;":8657,"&rArr;":8658,"&dArr;":8659,"&hArr;":8660,"&forall;":8704,"&part;":8706,
"&exist;":8707,"&empty;":8709,"&nabla;":8711,"&isin;":8712,"&notin;":8713,"&ni;":8715,"&prod;":8719,"&sum;":8721,"&minus;":8722,"&lowast;":8727,
"&radic;":8730,"&prop;":8733,"&infin;":8734,"&ang;":8736,"&and;":8743,"&or;":8744,"&cap;":8745,"&cup;":8746,"&int;":8747,"&there4;":8756,"&sim;":8764,
"&cong;":8773,"&asymp;":8776,"&ne;":8800,"&equiv;":8801,"&le;":8804,"&ge;":8805,
"&sub;":8834,"&sup;":8835,"&nsub;":8836,"&sube;":8838,"&supe;":8839,"&oplus;":8853,"&otimes;":8855,"&perp;":8869,"&sdot;":8901,
"&lceil;":8968,"&rceil;":8969,"&lfloor;":8970,"&rfloor;":8971,"&lang;":9001,"&rang;":9002,"&loz;":9674,"&spades;":9824,"&clubs;":9827,
"&hearts;":9829,"&diams;":9830
};

(function( refs, k ){
    for( k in refs ){
        refs[ k ] = String.fromCharCode( refs[ k ] );
    };
})( X_String_CHAR_REFS );

// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * 文字列に関する関数を集めたものです。
 * @namespace X.String
 * @alias X.String
 */
X[ 'String' ] = {
    
    'parse'             : X_String_parse,
    
    'cleanupWhiteSpace' : X_String_cleanupWhiteSpace,
    
    'whiteSpaceToTag'   : X_String_whiteSpaceToTag,
    
    'chrReferanceTo'    : X_String_chrReferanceTo,
    
    'toChrReferance'    : X_String_toChrReferance,
    
    'isNumberString'    : X_String_isNumberString,
    
    'serialize'         : X_String_serialize
};

// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //
/**
 * 文字列を数値、NaN,Infinity,-Infinity,bool値、null,undefinedに変換します。1e3等には未対応です。
 * @alias X.String.parse
 * @param {string}
 * @return {*}
 */
function X_String_parse( v ){
    var _v;
    
    if( X_Type_isString( v ) ){
        switch( v ){
            case ''          : return v;
            //case '{}'        : return {};
            //case '[]'        : return [];
            case 'NaN'       : return NaN;
            case 'null'      : return null;
            case 'true'      : return true;
            case 'false'     : return false;
            case 'Infinity'  : return  1 / 0;//Number.POSITIVE_INFINITY;
            case '-Infinity' : return -1 / 0;//Number.NEGATIVE_INFINITY;
            //case 'void(0)'   :
            //case 'void 0'    :
            case 'undefined' : return;
        };
        _v = v.split( ' ' ).join( '' );
        if( X_String_isNumberString( _v ) ) return _v - 0;
    };
    return v;
};

/**
 * <p>空白文字を半角スペースに変換します。\n\r,\t,\r,\n,\f,\b
 * <p>2つ以上の連続する半角スペースを一つの半角スペースにします。
 * <p>undefined, null が与えられた場合は '' を返します。
 * <p>数値,Object が与えられた場合は toString します。
 * @alias X.String.cleanupWhiteSpace
 * @param {string}
 * @return {string}
 */
function X_String_cleanupWhiteSpace( text ){
    var _ = ' ', __ = '  '; //, CRLF = X_String_CRLF;
    
    if( text == null || text === '' ) return '';
    
    //text.indexOf( CRLF )   !== -1 && ( text = text.split( CRLF ).join( _ ) );
    /*text.indexOf( '\n\r' ) !== -1 && ( text = text.split( '\n\r' ).join( _ ) );
    text.indexOf( '\t' )   !== -1 && ( text = text.split( '\t' ).join( _ ) );
    text.indexOf( '\r' )   !== -1 && ( text = text.split( '\r' ).join( _ ) );
    text.indexOf( '\n' )   !== -1 && ( text = text.split( '\n' ).join( _ ) );
    text.indexOf( '\f' )   !== -1 && ( text = text.split( '\f' ).join( _ ) );
    text.indexOf( '\b' )   !== -1 && ( text = text.split( '\b' ).join( _ ) ); */
    
    text = ( '' + text )
            .split( X_String_CRLF ).join( _ )
            .split( '\r' ).join( _ )
            .split( '\n' ).join( _ )
            .split( '\t' ).join( _ )
            .split( '\f' ).join( _ )
            .split( '\b' ).join( _ );

    while( true ){
        text = text.split( __ );
        if( text.length < 2 ) return text[ 0 ];
        text = text.join( _ );
    };
};

/**
 * 空白文字列を &lt;br&gt; に変換します。タブを &amp;nbsp; 4つに変換します。
 * <p>undefined, null が与えられた場合は '' を返します。
 * <p>数値,Object が与えられた場合は toString します。
 * @alias X.String.whiteSpaceToTag
 * @param {string}
 * @return {string} html文字列
 */
function X_String_whiteSpaceToTag( text ){
    if( text == null || text === '' ) return '';
    return ( '' + text )
        //.split( '\r\n\r\n' ).join( '<br>' )
        //.split( '\n\r\n\r' ).join( '<br>' )
        //.split( '\r\n' ).join( '<br>' )
        .split( X_String_CRLF ).join( '<br>' )
        .split( '\r' ).join( '<br>' )
        .split( '\n' ).join( '<br>' )
        .split( '\t' ).join( '&nbsp;&nbsp;&nbsp;&nbsp;' )
        .split( '\f' ).join( '' )
        .split( '\b' ).join( '' );
};

/**
 * 一部の文字実体参照をデコードします。&quot;, &amp;, &lt;, &gt;, &nbsp;
 * <p>undefined, null が与えられた場合は '' を返します。
 * <p>数値,Object が与えられた場合は toString します。
 * @alias X.String.chrReferanceTo
 * @param {string}
 * @return {string} html文字列
 */
function X_String_chrReferanceTo( str ){
    var refs, k;
    
    if( str == null || str === '' ) return '';
    if( str.indexOf( '&' ) === -1 ) return str;
    
    str = ( '' + str )
        .split( '&quot;' ).join( '"' )
        .split( '&apos;' ).join( "'" )
        .split( '&lt;'   ).join( '<' )
        .split( '&gt;'   ).join( '>' );
    
    if( str.indexOf( '&' ) === -1 ) return str;
    
    refs = X_String_CHAR_REFS;
    for( k in refs ){
        str = str.split( k ).join( refs[ k ] );
    };
  
    return str.split( '&amp;'  ).join( '&' ); // last!
};

/**
 * htmlタグで使われる文字を文字実体参照に変換します。
 * <p>undefined, null が与えられた場合は '' を返します。
 * <p>数値,Object が与えられた場合は toString します。
 * @alias X.String.chrReferanceTo
 * @param {string}
 * @return {string}
 */
function X_String_toChrReferance( str ){
    var refs, k;

    if( str == null || str === '' ) return '';
    
    str = X_String_toChrReferanceForHtmlSafety( str );

    refs = X_String_CHAR_REFS;
    for( k in refs ){
        str = str.split( refs[ k ] ).join( k );
    };

    return str;
};


function X_String_toChrReferanceForHtmlSafety( str ){
    if( str == null || str === '' ) return '';
    
    return ( '' + str )
        .split( '&' ).join( '&amp;' ) // first!
        .split( '"' ).join( '&quot;' )
        .split( "'" ).join( '&apos;' )
        .split( '<' ).join( '&lt;' )
        .split( '>' ).join( '&gt;' );
};

/**
 * 文字列化した数値か？調べます。
 * @alias X.String.isNumberString
 * @param {string}
 * @return {boolean}
 */
function X_String_isNumberString( v ){
    var n = v - 0;
    return '' + n === v || '' + n === '0' + v;
};

/**
 * postdata のために object を文字列に変換します。
 * https://github.com/jquery/jquery/blob/master/src/serialize.js
 * @alias X.String.serialize
 * @param {object}
 * @param {boolean} [traditional=]
 * @return {string}
 */
function X_String_serialize( a, traditional ) {
    var prefix,
        list = [];

    // If an array was passed in, assume that it is an array of form elements.
    //if ( X_Type_isArray( a ) && false ) {
        // Serialize the form elements
        //jQuery.each( a, function() {
        //    X_String_serialize_addParam( list, this.name, this.value );
        //});

    //} else {
        // If traditional, encode the 'old' way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for ( prefix in a ) {
            X_String_serialize_buildParams( list, prefix, a[ prefix ], !!traditional );
        }
    //}

    // Return the resulting serialization
    return list.join( '&' ).split( '%20' ).join( '+' );
};

function X_String_serialize_addParam( list, key, value ){
    // If value is a function, invoke it and return its value
    value = X_Type_isFunction( value ) ? value() : ( value == null ? '' : value );
    list[ list.length ] = encodeURIComponent( key ) + '=' + encodeURIComponent( value );
};

function X_String_serialize_buildParams( list, prefix, obj, traditional ) {
    var name, i, l, v;

    if ( X_Type_isArray( obj ) ) {
        // Serialize array item.
        for( i = 0, l = obj.length; i < l; ++i ){
            v = obj[ i ];
            if ( traditional || prefix === '[]' ) {
                // Treat each array item as a scalar.
                X_String_serialize_addParam( list, prefix, v );

            } else {
                // Item is non-scalar (array or object), encode its numeric index.
                X_String_serialize_buildParams(
                    list,
                    prefix + '[' + ( X_Type_isObject( v ) ? i : '' ) + ']',
                    v,
                    traditional
                );
            };        
        };

    } else
    if ( !traditional && X_Type_isObject( obj ) ) {
        // Serialize object item.
        for ( name in obj ) {
            X_String_serialize_buildParams( list, prefix + '[' + name + ']', obj[ name ], traditional );
        };

    } else {
        // Serialize scalar item.
        X_String_serialize_addParam( list, prefix, obj );
    };
};

