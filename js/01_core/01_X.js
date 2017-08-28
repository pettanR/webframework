
/**
 * <p>API ドキュメントと併せて、その意図や背景を綴っていく副読本もご覧ください。
 * <a href="http://outcloud.blogspot.jp/p/pettanr-api-docs-supplementary-reader.html">クラウド番外地 &gt; ぺったんR API文書の副読本</a>
 * 
 * @example // ライブラリは X という名前空間を使用します。
 * //ショートハンド
 * X( func ) == X.ViewPort[ 'listenOnce' ](X.Event.XDOM_READY, func);
 * X('#mydiv') == X.Doc.find('#mydiv');
 * @namespace X
 */
function X( v ){
	if( X_Type_isFunction( v ) ){
		X[ 'ViewPort' ][ 'listenOnce' ]( X_EVENT_XDOM_READY, v );
	} else
	if( X_shortcutFunction ){
		return X_shortcutFunction.apply( X_shortcutContext || X, arguments );
	};
};

//{+DEV
if( !window['console'] || ( window.parent && window.parent.log ) ){
	console = {
		log : function(a){
				var elm;
				//alert(a);
				if( window.parent ){
					elm = parent.document.all ? parent.document.all.log : parent.log || parent.document.getElementById( 'log' );
					elm && ( elm.innerHTML = a + '<br>' + elm.innerHTML );
				};
			}
	};	
};

if( !console.dir ) console.dir = function(){};
//+DEV}

//{-AUDIO
//-AUDIO}

var undefined,
	X_EMPTY_OBJECT = {},
	X_TEMP = { onSystemReady : [] },
	X_emptyFunction = new Function,
	X_shortcutFunction,
	X_shortcutContext;

/**
 * バージョン文字列:"0.6.xxx"
 * @type {string} */
X[ 'VERSION' ] = '0.6.181';

/**
 * ブートタイム ms
 * @type {number} */
X[ 'bootTime' ] = + new Date;

/**
 * 空の関数
 * @type {Function} */
X[ 'emptyFunction' ] = X_emptyFunction;

/**
 * このscriptはheadタグの中にあるか？
 *  @type {boolean} */
// TODO defer の場合もあるので、document.readyState を見る
// TODO body の有無を見ればOKではないか?
// MacIE で false
X[ 'inHead' ] = (function( s ){
	if( !s ) return false;
	if( !s.length ) return false; // Safari1.3 312.8 でerror
	s = s[ s.length - 1 ];
	// Dom0 || Dom1
	s = s.parentElement || s.parentNode || s;// s is for opera7.11
	return s.tagName.toLowerCase() === 'head';// opera7.23 s.tagName is 'HTML'
})( document.scripts || document.getElementsByTagName && document.getElementsByTagName( 'script' ) || document.all && document.all.tags( 'script' ) );

