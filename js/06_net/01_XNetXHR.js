//{+xhr"XHR,XDR,MSXMLによる通信"(XMLHTTPRequest, XDomainRequest, ActiveX-MSXML を使った通信)[+net]

// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://web.archive.org/web/20071101021832/http://web.paulownia.jp/script/ajax/xmlhttp4.html
// https://web.archive.org/web/20091029170015/http://wiki.paulownia.jp/ajax/xmlhttprequest
/* 
 * http://ponpon-village.net/ajax/xmlhttp.htm
 * IE のバージョンによっては、ActiveXObject("Msxml2.XMLHTTP.5.0") , ActiveXObject("Msxml2.XMLHTTP.4.0") ,
ActiveXObject("Msxml2.XMLHTTP.3.0") , ActiveXObject("Msxml2.XMLHTTP") なども使用出来る。

http://vird2002.s8.xrea.com/javascript/XMLHttpRequest.html
// --- 使うべきオブジェクト
new ActiveXObject( 'Msxml2.XMLHTTP.3.0' ); // バージョン3.0 広範に利用されているので、今後も bugfix を行う
new ActiveXObject( 'Msxml2.XMLHTTP.6.0' ); // バージョン6.0 は最新版なので bugfix を続ける

// --- 使うべきではないオブジェクト
new ActiveXObject( 'Microsoft.XMLHTTP' );  // Microsoft接頭辞は古いので指定すべきではない
new ActiveXObject( 'Msxml.XMLHTTP' );      // Msxml2接頭辞を指定すべき
new ActiveXObject( 'Msxml2.XMLHTTP' );     // バージョンを省略すると 3.0 として扱われるので、バージョンは明記すべき
new ActiveXObject( 'Msxml2.XMLHTTP.4.0' ); // バージョン4.0 は bugfix が行われないので、3.0 か 6.0 を指定すべき
new ActiveXObject( 'Msxml2.XMLHTTP.5.0' ); // バージョン5.0 は bugfix が行われないので、3.0 か 6.0 を指定すべき

[IE][Javascript][Json] IE+Jsonではまった
http://d.hatena.ne.jp/khiker/20081026/javascript_json
> AddCharset utf-8 json
> AddType text/javascript json

JavaScriptでJSONをeval
http://d.hatena.ne.jp/sshi/20060904/p1

itozyun 2014-10-30 20:55:41
basic 認証のかかったhtml を表示して、そのjsが xhr をすると Android1.6 では 401 error が返る。Android 2.3 では解決している。
Android1.6- の XHR で 401 エラーが返った場合は、iframe に xml を表示させてその内容を取ればサーバ側の対応無しでいけるかも？
Android2 にも xdomain な GET が一回しかできない問題 gears 使えない？

IE9 で 画像バイナリの取得 VBA をかましている
http://web.archive.org/web/20130808105151/http://gurimmer.lolipop.jp/daihakken/2012/05/22/javascriptajaxxmlhttprequest%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9Fajax%E3%81%AE%E3%82%A8%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%89
http://d.hatena.ne.jp/maachang/20130221/1361427565

http://web.archive.org/web/20130531162446/http://gurimmer.lolipop.jp/daihakken/2012/06/25/ajaxjavascript%E3%83%8D%E3%82%A4%E3%83%86%E3%82%A3%E3%83%96xmlhttp%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%81%A8%E3%81%AF/

IE8 以下で xhr の失敗率が高い問題 
http://tkengo-totoro.blogspot.jp/2011/11/iexmlhttprequest.html
TODO クライアント側にもリトライ機構を入れてみる


TODO xml の取得には XMLDOM を使用する
var activex = JKL.ParseXML.HTTP.ACTIVEX_XMLHTTP;    // IXMLHttpRequest
if ( this.method == "GET" && ! this.textmode ) {
    // use IXMLDOMElement to accept any mime types
    // because overrideMimeType() is not available on IE6
    activex = JKL.ParseXML.HTTP.ACTIVEX_XMLDOM;     // IXMLDOMElement
};
// debug.print( "new ActiveXObject( '"+activex+"' )" );
this.req = new ActiveXObject( activex );

 */
var // Opera7.6+, Safari1.2+, khtml3.?+, Gecko0.9.7+
	// ie9- ではローカルリソースには MSXML を使う
	X_XHR_createW3C   = window.XMLHttpRequest && function(){ return X_XHR_w3c || ( X_XHR_w3c = new XMLHttpRequest() ); },
	X_XHR_w3c         = X_XHR_createW3C && X_XHR_createW3C(),
	X_XHR_cors        = X_XHR_w3c && X_XHR_w3c.withCredentials !== undefined,
	X_XHR_progress    = X_XHR_w3c && X_XHR_w3c.onprogress !== undefined,
	X_XHR_upload      = X_XHR_w3c && !!X_XHR_w3c.upload,
	
	X_XHR_createXDR   = window.XDomainRequest && function(){ return X_XHR_xdr || ( X_XHR_xdr = new XDomainRequest() ); },
	X_XHR_xdr         = X_XHR_createXDR && X_XHR_createXDR(),

	X_XHR_msXMLVer    = 0,
	X_XHR_msXMLName   = '',
	X_XHR_msXML,
		
	// ie11の互換モード(7,8)の msxml はいまいち動かない
	X_XHR_createMSXML = X_UA_ActiveX &&
						( ( 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 7 ) || X_URL_IS_LOCAL ) &&
							function(){ return X_Script_createActiveXObjectSafty( X_XHR_msXMLName ); },


	
	X_XHR_neverReuse  = ( X_UA.Trident || X_UA.TridentMobile ) < 9, // ie7,8 の xhr はリユース不可。msxml はリユース可能。
	
	X_XHR_TYPE_FLASH  = 8,
	X_XHR_TYPE_GADGET = 16;

if( X_XHR_createMSXML ){
	( function(){
		var x = '.XMLHTTP',
			m = 'Msxml2' + x,
			n = [ m + '.6.0', m + '.3.0', m + '.5.0', m + '.4.0', m, 'Microsoft' + x ],
			v = [ 6, 3, 5, 4, 2, 1 ],
			i = -1,
			a;
		for( ; i < 5; ){
			a = X_Script_createActiveXObjectSafty( n[ ++i ] );
			if( a ){
				X_XHR_msXMLVer  = v[ i ];
				X_XHR_msXMLName = n[ i ];
				X_XHR_msXML     = a;
				return;
			};
		};
		X_XHR_createMSXML = null;
	})();
};

X[ 'XHR' ] = {

	'W3C'         : X_XHR_createW3C   ? 1 : 0,
	'MSXML'       : X_XHR_createMSXML ? 2 : 0,
	'XDR'         : X_XHR_createXDR   ? 4 : 0,

/*
 * http://hakuhin.jp/as/import.html
 * ファイルの読み込みについて(4 or 5 or 6+)
 * http://hakuhin.jp/as/javascript.html
 * Flash から JavaScript にアクセスする(3+)
 */
	'FLASH'       : 4 <= X_Plugin_FLASH_VERSION ? 8 : 0,
	
	'GADGET'      : 5.5 <= ( X_UA.Trident || X_UA.TridentMobile ) || !( X_UA.Trident || X_UA.TridentMobile ) ? 16 : 0,

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 * Progress Events 	Chrome7, firefox3.5, ie10, opera12, Safari?, Chrome for Android 0.16
 */
	'PROGRESS'        : X_XHR_progress,

	'UPLOAD_PROGRESS' : X_XHR_upload,

	// or gadget proxy or flash
	'CORS'            : X_XHR_xdr || X_XHR_cors,
	
	'BINARY'          : X_Script_VBS_ENABLED
};

if( X_XHR_msXMLVer ) X[ 'XHR' ][ 'MSXML_VERSION' ] = X_XHR_msXMLVer;

if( X_XHR_w3c || X_XHR_msXML ){

	X_TEMP.X_XHR_init = function(){
		X_XHR = X_Class_override( X_EventDispatcher(), X_TEMP.X_XHR_params, true );
		
		delete X_TEMP.X_XHR_init;
		delete X_TEMP.X_XHR_params;	
		
		return X_XHR;
	};
	
	X_TEMP.X_XHR_params = {
			
			'_rawType'   : X_EventDispatcher_EVENT_TARGET_XHR,
			
			_isXDR       : false,
			_isMsXML     : false,
			
			_method      : '',
			_dataType    : '',
			_busy        : false,
			_canceled    : false,
			_error       : false,
			_percent     : 0,
			_timerID     : 0,
			
			load : function( obj ){
				var raw      = X_XHR[ '_rawObject' ],
					method   = obj[ 'method' ],
					url      = obj[ 'url' ],
					async    = obj[ 'async' ] !== false,
					username = obj[ 'username' ],
					password = obj[ 'password' ],
					headers  = obj[ 'headers' ] || {},
					postdata = obj[ 'postdata' ] || '',
					timeout  = obj[ 'timeout' ] || 20000,
					noCache  = obj[ 'cache' ] !== true,
					dataType = X_XHR._dataType = obj[ 'dataType' ], // 明示され無い場合、拡張子が入っている
					xDomain  = !X_URL_isSameDomain( url ),
					isFile   = X_URL_isLocal( url ),
					init,
					type, tmp, p;
				
				if( !raw || xDomain !== X_XHR._isXDR || ( X_XHR_createMSXML && isFile !== X_XHR._isMsXML ) ){
					raw && X_XHR[ 'unlisten' ]( [ 'load', 'readystatechange', 'progress', 'error', 'timeout' ] );
					init = true;
					X_XHR[ '_rawObject' ] = raw = xDomain ?
													( X_XHR_cors ?
														X_XHR_createW3C() :
														X_XHR_createXDR()
													) :
												 isFile ?
												 	( X_XHR_createMSXML ?
														( X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML() ):
														X_XHR_createW3C()
													 ) :
												 X_XHR_createW3C ?
													X_XHR_createW3C() :
													( X_XHR_msXML = X_XHR_msXML || X_XHR_createMSXML() );

					// raw === XDR これは　error になるのでフラグに控える
					X_XHR._isXDR   = X_XHR_createXDR && xDomain;
					X_XHR._isMsXML = !X_XHR_createW3C || ( isFile && X_XHR_createMSXML );
				};
				
				raw.open( method, url, async, username, password );

				switch( dataType ){
					case '' :
					case 'txt' :
					case 'text' :
					// js, css
						X_XHR._dataType = 'text';
						break;
					case 'json' :
						X_XHR._dataType  = 'json';
						break;
					case 'document' :
					case 'xml' :
					case 'html' :
					case 'htm' :
					case 'svg' :
					case 'vml' :
						X_XHR._dataType = 'document';
						break;
					case 'blob' :
					case 'arraybuffer' :
					// jpeg,jpg,png,gif,mp3,ogg...
						X_XHR._dataType = dataType;
						break;
				};

				if( raw.responseType !== undefined && X_XHR._dataType ){
					if( X_XHR._dataType === 'json' ){
						// firefox9- は moz-json
						raw.responseType = ( X_UA.Gecko || X_UA.Fennec ) < 10 ? 'moz-json' : ( X_UA.Gecko || X_UA.Fennec ) ? 'json' : ''; // Iron 37 でエラー
					} else {
						raw.responseType = X_XHR._dataType;
					};
				};
				
				// http://www.quirksmode.org/blog/archives/2005/09/xmlhttp_notes_r_1.html
				if( !X_XHR._isMsXML && raw.overrideMimeType ){
					switch( type = dataType ){
						case 'document' :
						case 'xml' :
						case 'html' :
						case 'htm' :
						case 'svg' :
						case 'vml' :
							tmp = 'text/xml';
							break;
						case 'json' :
							tmp = 'application/json';
							break;
						case 'mp3' :
							tmp = 'mpeg';	
						case 'weba' :
							tmp = tmp || 'webm';			
						case 'opus' :
							tmp = tmp || 'ogg';
						case 'ogg' :	
						case 'wav' :						
						case 'aac' :
							tmp = 'audio/' + ( tmp || type );
							break;
						case 'm4a' :
						case 'mp4' :
							tmp = 'audio/x-' + type;
							break;
						case 'jpeg' :
						case 'jpg' :
						case 'png' :
						case 'gif' :
						case 'bmp' :
						case 'ico' :
							tmp = 'text/plain; charset=x-user-defined';
							break;
							
					};
					if( obj[ 'mimeType' ] || tmp ) raw.overrideMimeType( obj[ 'mimeType' ] || tmp );
				};

				if( !X_XHR._isXDR && ( X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : raw.setRequestHeader ) ){ // msxml は setRequestHeader getter がいけない
					
					/*
					if( noCache ){
						headers[ 'Pragma' ] = 'no-cache';
						headers[ 'Cache-Control' ] = 'no-cache';
						headers[ 'If-Modified-Since' ] = 'Thu, 01 Jun 1970 00:00:00 GMT';
					} */

					// http://8note.phpapps.jp/jquery-ajax%E3%81%A7%E3%81%AE412%E3%82%A8%E3%83%A9%E3%83%BC/
					if( 'document json text'.indexOf( X_XHR._dataType ) !== -1 && X_UA.WebKit ){
						headers[ 'If-Modified-Since' ] = 'Thu, 01 Jun 1970 00:00:00 GMT';
					};
					
					// http://boscono.hatenablog.com/entry/2013/12/23/152851
					if ( !xDomain && !headers[ 'X-Requested-With' ] ) {
						headers[ 'X-Requested-With' ] = 'XMLHttpRequest';
					};
					
					if( method === 'POST' && !headers[ 'Content-Type' ] ){
						if( X_Type_isObject( postdata ) ){
							headers[ 'Content-Type' ] = 'application/x-www-form-urlencoded';
						} else {
							headers[ 'Content-Type' ] = 'text/plain';
						};
					};

					for( p in headers ){
						headers[ p ] !== undefined && raw.setRequestHeader( p, headers[ p ] + '' ); // Opera8.01+, MSXML3+
					};
				};
				
				if( !X_XHR._isMsXML && raw.timeout !== undefined ){
					raw.timeout = timeout;
				} else {
					X_XHR._timerID = X_Timer_once( timeout, X_XHR.onTimeout );
				};	
				
				// send 前にフラグを立てる,回線が早いと raw.send() 内で onload -> _busy = false ののち、 _busy = true するため。
				X_XHR._busy = true;

				raw.send( X_Type_isObject( postdata ) ? X_String_serialize( postdata ) : '' + postdata );

				if( !async || raw.readyState === 4 ){
					X_Timer_once( 32, X_XHR, [ { type : 'readystatechange' } ] );
				} else
				if( init ){
					if( X_XHR._isMsXML ){
						raw[ 'onreadystatechange' ] = X_XHR.handleEvent;
					} else
					if( X_XHR_progress || X_XHR._isXDR ){
						X_XHR[ 'listen' ]( [ 'load', 'progress', 'error', 'timeout' ] ); //, 'abort'
					} else
					if( ( X_UA.Trident || X_UA.TridentMobile ) === 8 ){
						X_XHR[ 'listen' ]( [ 'readystatechange', 'error', 'timeout' ] );
					} else
					if( ( X_UA.Trident || X_UA.TridentMobile ) === 7 ){
						X_XHR[ 'listen' ]( [ 'readystatechange', 'error' ] );
					} else {
						X_XHR[ 'listen' ]( [ 'load', 'readystatechange', 'error', 'timeout' ] ); //, 'abort'
					};
				
					if( X_XHR_upload ){
						raw.upload.addEventListener( 'progress', X_XHR.onUploadProgress );
					};
				};
			},
			
			cancel : function(){
				/* X_XHR[ '_rawObject' ].abort && */ X_XHR[ '_rawObject' ].abort();
				X_XHR._canceled = true;
			},
			
			reset : function(){
				
				X_XHR._method   = X_XHR._dataType = '';
				X_XHR._canceled = X_XHR._busy = X_XHR._error = false;
				X_XHR._timerID && X_Timer_remove( X_XHR._timerID );
				X_XHR._percent  = X_XHR._timerID = 0;
				
				// XMLHttpRequest の使い方
				// http://webos-goodies.jp/archives/50548720.html
				// XMLHttpRequest オブジェクトを再利用する際も、 abort メソッドを呼び出す必要があるようです。
				/* X_XHR[ '_rawObject' ].abort && */ X_XHR[ '_rawObject' ].abort();	
				
				// XMLHttpRequest で順番にリソースを取得する
				// http://note.chiebukuro.yahoo.co.jp/detail/n16248
				// Opera 10.10 と Safari 4.1 はエラーが起きた XHR を再利用できないので毎回作る
				
				// 
				// domes.lingua.heliohost.org/dom-intro/load-save2.html
				// 規定上は open() を呼び出すと XMLHttpRequest オブジェクトが未送信状態に戻りますが、
				// Opera 10.10、Safari 4.1 では、同一オリジン制限に違反した XMLHttpRequest オブジェクトは再度 open() しても未送信状態に戻りません。
				
				// Timeout した Gecko の xhr.response に触るとエラー??

				if( X_XHR._error || ( X_XHR_neverReuse && !X_XHR._isMsXML ) ){
					
					if( X_XHR_upload ){
						X_XHR_w3c.upload.removeEventListener( 'progress', X_XHR.onUploadProgress );
					};

					// ie7 は xhr object を再利用できない。但し send のあとに alert を挟むと動いた、、、
					// ie7モード(IE11) では再利用可能、、、
										
					X_EventDispatcher_toggleAllEvents( X_XHR, false );
					X_XHR[ '_rawObject' ] = null;
					
					if( X_XHR._isXDR ){
						X_XHR_xdr   = null;
						delete X_XHR._isXDR;
					} else {
						X_XHR_w3c   = null;
					};				

					X_XHR[ 'unlisten' ]( [ 'load', 'readystatechange', 'progress', 'error', 'timeout' ] );
				};
			},
			
			handleEvent : function( e ){
				var raw  = X_XHR[ '_rawObject' ],
					live = !X_XHR._canceled,
					headers, status, data;

                function escapeForOldSafariAndKHTML( data ){
                    var esc;
                    /*
                    * http://www.kawa.net/works/js/jkl/parsexml.html
                    * http://www.kawa.net/works/js/jkl/archive/jkl-parsexml-0.22.zip line:671
                    *
                    // Safari and Konqueror cannot understand the encoding of text files.*/
                    if( data && ( X_UA.WebKit < 420 || X_UA.KHTML < 4 ) ){
                        esc = escape( data );
                        if ( !esc.match( '%u' ) && esc.match( '%' ) ){
                            data = decodeURIComponent( esc );
                        };
                    };
                    return data;
                };

				switch( e && e.type || 'readystatechange' ){
					/*
					 * http://memopad.bitter.jp/w3c/ajax/ajax_xmlhttprequest_onreadystatechange.html
					readyState 	XMLHttpRequest のステータスを保持する。0 から 4 までに変化する:
					0: リクエストは初期化されていない
					1: サーバ接続は確立した
					2: リクエストを受信した
					3: リクエストの処理中
					4: リクエストは終了してレスポンスの準備が完了
					status 	200: 'OK'
					404: Page not found
					
					If-Modified-Sinceヘッダを利用してWebページのキャッシュを行うXMLHttpRequestラッパー
					http://www.semblog.org/msano/archives/000407.html
					* */		
					case 'readystatechange' :
						//if( !X.XHR.PROGRESS ){
							switch( raw.readyState ){
								case 0 :
								case 1 :
									return;
								case 2 : // 0% ajaxstart
									live && X_XHR[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : 0 } );
									return;
								case 3 :
									live && X_XHR[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : X_XHR._percent < 99.9 ? 99.9 : ( X_XHR._percent + 100 ) / 2 } );
									// 99.9%
									return;
								case 4 :
									if( X_XHR._percent === 100 ) return; // Opera8 readystatechange が2重に発生
									// 100%
									break; // load へ
								default :
									// error
									return;
							};						
						//};
	
					case 'load' :

						if( !X_XHR._busy ) return;
						
						X_XHR._percent = 100;
						X_XHR._busy    = false;
						status        = raw.status;
						
						// TODO GET_FULL_HEADERS
						// https://msdn.microsoft.com/en-us/library/ms766595%28v=vs.85%29.aspx
						// Implemented in: MSXML 3.0 and MSXML 6.0
						if( X_XHR._isXDR ){
							headers = { 'Content-Type' : raw.contentType };
						} else
						if( ( X_XHR._isMsXML ? 3 <= X_XHR_msXMLVer : raw.setRequestHeader ) && ( headers = raw.getAllResponseHeaders() ) ){
							headers = X_XHR_parseResponseHeaders( headers );
						};
						
						// https://code.google.com/p/fakeworker-js/source/browse/src/javascript/fakeworker.js
						if(
							( !status && location.protocol === 'file:' ) ||
							// IE 6.0 でローカルファイルにアクセスした
							( status < 100 && ( status = 200 ) ) ||
				            ( 200 <= status && status < 400 ) ||
				            //status === 304 ||
                            ( status === 1223 && ( status = 204 ) ) ||
                            // https://techblog.kayac.com/application-cache-cache-manifest-advent-calendar-2012.html
                            // Android 2.1, 2.2, 4.1に関してはキャッシュ対象ファイルをXHRで取得しようとするとxhr.status === 0になる症状が確認されたので注意してください。
                            ( status === 0 && X_UA.AOSP ) ||
				            ( X_UA.WebKit && status === undefined ) // safari: /webkit/.test(userAgent)
						){
							// parse json, html, xml, text, script, css
							switch( X_XHR._dataType ){
								case 'text' :
                                    data = X_Script_try( X_Object_find, [ raw, 'responseText' ] );
                                    data = escapeForOldSafariAndKHTML( data );
									break;
								case 'json' :
                                    data = X_Script_try( X_Object_find, [ raw, 'response' ] ) || X_Script_try( X_Object_find, [ raw, 'responseText' ] );
									// eval() を使っているけど JSON の無いブラウザは XDomain な XHR はできないのでよしとする。
									// XDomain な XHR の際は Flash 等で代替し、その中に Json parser も組み込む。
									// http://d.hatena.ne.jp/sshi/20060904/p1
									if( X_Type_isString( data ) ){
                                        data = X_JSON_parseTrustableString( escapeForOldSafariAndKHTML( data ) );
                                    };
									break;
								case 'document' :
									data = raw[ 'responseXML' ] || raw[ 'response' ] || raw[ 'responseText' ]; // とりあえず
									break;
								case 'blob' :
								case 'arraybuffer' :
									// TODO resoponceBody if( ( X_UA.Trident || X_UA.TridentMobile ) < 10 )
									// http://d.hatena.ne.jp/maachang/20130221/1361427565
									data = raw[ 'response' ] || raw[ 'responseText' ]; // とりあえず
									break;
							};
						};
						
						if( data ){
							X_XHR[ 'asyncDispatch' ]( 32, { type : X_EVENT_SUCCESS, status : status || 200, response : data, 'headers' : headers || null } );
						} else {
							X_XHR[ 'asyncDispatch' ]( 32, { type : X_EVENT_ERROR, status : status || 400, 'headers' : headers || null } );
						};
						break;
					
					case 'progress' :
						if( e.lengthComputable ){
							X_XHR._percent = e.loaded / e.total * 100;
							live && X_XHR._percent < 100 && X_XHR[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : X_XHR._percent } );
						};
						break;
					
					case 'error' :
					//console.dir( e );
						X_XHR._busy  = false;
						X_XHR._error = X_UA.Presto || X_UA.PrestoMobile || X_UA.WebKit ;
						live && X_XHR[ 'asyncDispatch' ]( 32, { type : X_EVENT_ERROR, status : raw.status } );
						break;

					case 'timeout' : // Gecko 12.0 https://developer.mozilla.org/ja/docs/XMLHttpRequest/Synchronous_and_Asynchronous_Requests
						X_XHR._busy  = false;
						X_XHR._error = !!( X_UA.Gecko || X_UA.Fennec );
						X_XHR[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, 'timeout' : true, status : 408 } );
						break;
				};
			},

/*
 * http://www.kawa.net/works/js/jkl/parsexml.html
 * 
// ================================================================
//  method: documentElement()
//  return: XML DOM in response body

JKL.ParseXML.HTTP.prototype.documentElement = function() {
    // debug.print( 'documentElement: '+this.req );
    if ( ! this.req ) return;
    if ( this.req.responseXML ) {
        return this.req.responseXML.documentElement;    // XMLHTTPRequest
    } else {
        return this.req.documentElement;                // IXMLDOMDocument
    }
};
 */
		
			onTimeout : function(){
				var raw  = X_XHR[ '_rawObject' ],
					live = !X_XHR._canceled || !X_XHR._busy;

				if( live || raw.readyState < 3 ){
					X_XHR._busy = false;
					live && X_XHR[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, 'timeout' : true, status : 408 } );
				};
				X_XHR._timerID = 0;
			},
			
			onUploadProgress : X_XHR_upload && function( e ){
				!X_XHR._canceled &&
					X_XHR[ 'asyncDispatch' ]( {
						type            : X_EVENT_PROGRESS,
						'percent'       : X_XHR._percent,
						'uploadPercent' : e.loaded / e.total * 100
					} );
			}
		};
	// 同期リクエストでなければならない場合, unload, beforeunload時
};
/*
 * https://gist.github.com/mmazer/5404301
 * 
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 * 
 * http://hakuhin.jp/js/xmlhttprequest.html#XHR_GET_ALL_RESPONSE_HEADERS
 * 複数の情報が存在する場合、改行で区切られています。
 */

function X_XHR_parseResponseHeaders( headerStr ){
	var headers = {}, headerPairs, i = 0, l, headerPair, index, key, val;
	
	if( !headerStr ) return headers;

	headerPairs = headerStr.split( '\u000d\u000a' );
	for( l = headerPairs.length; i < l ; ++i ){
		headerPair = headerPairs[i];
		index      = headerPair.indexOf( '\u003a\u0020' );
		if( index > 0 ){
			key = headerPair.substring( 0, index );
			val = headerPair.substring( index + 2 );
			headers[ key ] = val.split( '\r\n' ).join( '\n' ).split( '\n' );
		};
	};
	return headers;
};

