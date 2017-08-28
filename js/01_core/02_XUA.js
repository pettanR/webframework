
// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //

/**
 * UserAgent に関する定数を保持する。
 * @namespace X.UA
 * @alias X.UA
 * @type {object}
 */
var X_UA = X[ 'UA' ] = {},
	X_UA_classNameForHTML = '';

(function(){
	var dua  = navigator.userAgent,
		dav  = navigator.appVersion,
		tv   = parseFloat(dav),
		sys  = navigator.platform,
		tridentToVer, i, j, v, androidBrowserPCMode;
		
	console.log( ' userAgent  : ' + dua );
	console.log( '-' );
	console.log( ' appVersion : ' + dav );
	console.log( '-' );
	console.log( ' platform   : ' + sys );
	console.log( '-' );
	
	// TODO 3DS, DSi, WiiU
	
	if( sys.indexOf( 'iP' ) === 0 ){

		v = dav.split( 'OS ' )[ 1 ].split( '_' );
		i = window.devicePixelRatio === 1;
		/**
		 * @alias X.UA.iOSMajor
		 * @type {number}
		 */
		X_UA[ 'iOSMajor' ] = parseFloat( v[ 0 ] ) || 0;
		/**
		 * @alias X.UA.iOSMinor
		 * @type {number}
		 */
		X_UA[ 'iOSMinor' ]  = parseFloat( v[ 1 ] ) || 0;
		/**
		 * @alias X.UA.iOSPatch
		 * @type {number}
		 */
		X_UA[ 'iOSPatch' ]  = parseFloat( v[ 2 ] ) || 0;
		/**
		 * @alias X.UA.iOS
		 * @type {number}
		 */
		X_UA[ 'iOS' ]  = X_UA[ 'iOSMajor' ] + X_UA[ 'iOSMinor' ] / 10;

		// 4:3 model
		v = screen.width === screen.height * 1.5 || screen.width * 1.5 === screen.height;

		switch( sys ){
			case 'iPhone' :
			case 'iPhone Simulator' :
				/**
				 * @alias X.UA.iPhone
				 * @type {boolean}
				 */
				X_UA[ 'iPhone' ]  = true;
				if( v ){
					/**
					 * iPhone4s以下
					 * @alias X.UA.iPhone_4s
					 * @type {boolean}
					 */
					X_UA[ 'iPhone_4s' ]  = true;
					
					if( i ){
						/**
						 * iPhone3GS以下
						 * @alias X.UA.iPhone_3GS
						 * @type {boolean}
						 */
						X_UA[ 'iPhone_3GS' ]  = true;
					};				
				};
				break;
			
			case 'iPad' :
			case 'iPad Simulator' :
				/**
				 * @alias X.UA.iPad
				 * @type {boolean}
				 */
				X_UA[ 'iPad' ]    = true;
				if( i ){
					/**
					 * iPad2以下または初代iPad mini 以下
					 * @alias X.UA.iPad_2Mini1
					 * @type {boolean}
					 */
					X_UA[ 'iPad_2Mini1' ]  = true;
				};
				break;
			
			case 'iPod' :
			case 'iPod Simulator' : // 必要??
				/**
				 * @alias X.UA.iPod
				 * @type {boolean}
				 */
				X_UA[ 'iPod' ]    = true;
	
				if( v ){
					/**
					 * iPod4以下
					 * @alias X.UA.iPod_4
					 * @type {boolean}
					 */
					X_UA[ 'iPod_4' ]  = true;
					
					if( i ){
						/**
						 * iPod3以下
						 * @alias X.UA.iPod_3
						 * @type {boolean}
						 */
						X_UA[ 'iPod_3' ]  = true;
					};				
				};
				break;
		};
		
		console.log( '>> iOS : ' + X_UA[ 'iOS' ]  );
	} else
	if( dua.indexOf( 'hp-tablet' ) !== -1 || dua.indexOf( 'webOS' ) !== -1 ){
		/**
		 * http://user-agent-string.info/list-of-ua/os-detail?os=webOS
		 * @alias X.UA.webOS
		 * @type {boolean}
		 */
		X_UA[ 'webOS' ]  = true; // webOS
	} else
	if( sys.indexOf( 'Win' ) + 1 ){

		switch( sys ){
			case 'WinCE' :
				/**
				 * @alias X.UA.WinCE
				 * @type {boolean}
				 */
				X_UA[ sys ] = true;
				break;
			case 'Win16' :
			case 'Win32' :
			case 'Win64' :
				/**
				 * @alias X.UA.Win16
				 * @alias X.UA.Win32
				 * @alias X.UA.Win64
				 * @type {boolean}
				 */
				X_UA[ sys ] = true;

				if( v = dua.split( 'Windows NT 10' )[ 1 ] ){
					switch( v.substr( 0, 2 ) ){
						case '.0' : v = 10; break;
						default : v = '?';
					};
				} else
				if( v = dua.split( 'Windows NT ' )[ 1 ] ){
					switch( v.substr( 0, 3 ) ){
						case '6.3' : v = 8.1; break;
						case '6.2' : v = 8; break;
						case '6.1' : v = 7; break;
						case '6.0' : v = 'Vista'; break;
						case '5.2' : v = '2003|XP64'; break;
						case '5.1' : v = v.indexOf( '5.1; SV1' ) ? 'XP' : 'XPSP2'; break;
						case '5.0' : v = v.indexOf( '5.01' ) ? 2000 : '2kSP1'; break;
						case '4.0' : v = 'NT'; break;
						default : v = '?';
					};	
				} else
				if( v = dua.split( 'Windows ' )[ 1 ] ){
					switch( v.substr( 0, 2 ) ){
						case '98' : v = v.indexOf( '98; Win 9x 4.90' ) ? '98|98SE' : 'ME'; break;
						case '95' : v = 95; break;
						case '3.' : v = parseFloat( v ); break;
						default : v = '?';
					};	
				} else {
					v = '?';
				};
				
				/**
				 * 10, 8.1, 8, 7, Vista, 2003|XP64, XPSP2, XP, 2kSP1, 2000, ME, 98|98SE, 95, ?
				 * @alias X.UA.Windows
				 * @type {number|string}
				 */				
				X_UA[ 'Windows' ] = v;
				break;
		};

		// winRT
	} else
	if( sys.indexOf( 'Mac' ) + 1 ){
		console.log( 'Mac' );
		/**
		 * @alias X.UA.Mac
		 * @type {boolean}
		 */
		X_UA[ 'Mac' ]  = true;
		switch( sys ){
			case 'MacPowerPC' :
				/**
				 * @alias X.UA.MacPPC
				 * @type {boolean}
				 */
				X_UA[ 'MacPPC' ] = true;
				break;
			case 'MacPPC' :
			case 'Mac68K' :
			case 'MacIntel' :
				/**
				 * @alias X.UA.MacPPC
				 * @alias X.UA.Mac68K
				 * @alias X.UA.MacIntel
				 * @type {boolean}
				 */
				X_UA[ sys ] = true;
		};
	} else
	if( ( sys.indexOf( 'Linux' ) + 1 ) || ( sys.indexOf( 'Android' ) + 1 ) ){
		console.log( 'Linux' );
		/**
		 * @alias X.UA.Linux
		 * @type {boolean}
		 */
		if( ( v = dua.split( 'Android ' )[ 1 ] ) ||
			( v = sys.split( 'Android ' )[ 1 ] ) ){ // PCモードの Android Firefox では platform に Android 0.0.0 が存在
			v = v.split( '.' );
			/**
			 * @alias X.UA.AndroidMajor
			 * @type {number}
			 */
			X_UA[ 'AndroidMajor' ] = parseFloat( v[ 0 ] ) || 0;
			/**
			 * @alias X.UA.AndroidMinor
			 * @type {number}
			 */
			X_UA[ 'AndroidMinor' ] = parseFloat( v[ 1 ] ) || 0;
			/**
			 * @alias X.UA.AndroidPatch
			 * @type {number}
			 */
			X_UA[ 'AndroidPatch' ] = parseFloat( v[ 2 ] ) || 0;
			/**
			 * Firefox で Version が取れない！
			 * http://bizmakoto.jp/bizid/articles/1207/31/news004.html
			 * Chrome 	Android 4.0以上 	Google
			 * Dolphin Browser HD 	Android 2.0.1以上 	Mobotap
			 * Firefox 	Android 2.2以上 	Mozilla
			 * Opera Mobile 	Android 1.6以上 	Opera Software ASA
			 * Sleipnir Mobile 	Android 2.1以上 	Fenrir
			 * @alias X.UA.Android
			 * @type {number}
			 */
			X_UA[ 'Android' ] = X_UA[ 'AndroidMajor' ] + X_UA[ 'AndroidMinor' ] / 10;
			console.log( '>> Android : ' + X_UA[ 'Android' ]  );
		} else
		if( ( sys === 'Linux armv7l' || sys === 'Linux i686' ) && window.ontouchstart !== undefined && ( v = parseFloat( dua.split( 'WebKit\/' )[ 1 ] ) ) ){
			// https://ja.wikipedia.org/wiki/WebKit
			// http://www.au.kddi.com/developer/android/kishu/ua/
			// webkit version to Android version...
			androidBrowserPCMode = !window.chrome || v < 534.3; // 4.0 & 3.x には chrome がいる...
			
			if( !window[ 'Int8Array' ] ){
				v =
					v < 529    ? 1.5 : // <= 528.5
					v < 531    ? 2.0 : // 530 2.0~2.1
									   // 533 2.2~2.3
					v < 534    ? ( window.HTMLAudioElement ? 2.3 : 2.2 ) : 0;
			} else {
				v =
						!navigator[ 'connection' ] ? 4.4 :
						Number.isFinite && ( window.history && window.history.pushState ) ? 4.2/* & 4.3 */ : // ここに 4.1, 4.0 も入ってくる...
						Number.isFinite ? 4.1 : 4;
					// 534 - 3.x~4.x , 534.13=3.x
					// 534.30 = 4.0-4.1
					// 535.19 = 4.1
					// 537.36 = 4.4.2-5.x
			};

			if( v ){
				// PC版で見る、にチェックが付いている場合、ユーザーエージェント文字列にも platform にも Android の文字列が存在しない(標準ブラウザ&Chrome)
				// Audio でタッチが必要か？の判定にとても困る...
				// ua には Linux x86_64 になっている
				X_UA[ 'Android' ]    = v;
			};
		};
	};
	
	if( window.opera ){
		i = dua.split( 'Opera' )[ 1 ]; // Opera/
		j = dua.split( 'Version/' )[ 1 ];
		/**
		 * @alias X.UA.Opera
		 * @type {number}
		 */
		X_UA[ 'Opera' ] = v = Math.max( parseFloat( i ) || 0, parseFloat( j ) || 0, tv );
		/**
		 * memo:closure compiler で minify するとOpera7で動かない 
		 * --compilation_level WHITESPACE_ONLY --formatting pretty_print <- 動く
		 * @alias X.UA.Opera7
		 * @type {boolean}
		 */
		X_UA[ 'Opera7' ] = v < 8;
		/**
		 * @alias X.UA.Opera78
		 * @type {boolean}
		 */
		X_UA[ 'Opera78' ] = v < 9;
		
		if( 0 < dua.indexOf( 'Opera Mini' ) )
			/**
			 * @alias X.UA.OperaMini
			 * @type {boolean}
			 */
			X_UA[ 'OperaMini' ] = true;
		
		if( 0 < dua.indexOf( 'Opera Mobi' ) )
			/**
			 * @alias X.UA.OperaMobile
			 * @type {boolean}
			 */
			X_UA[ 'OperaMobile' ] = true;
		
		if( 0 < dua.indexOf('Opera Tablet') )
			/**
			 * @alias X.UA.OperaTablet
			 * @type {boolean}
			 */
			X_UA[ 'OperaTablet' ] = true;
		
		// Android Opera12.10 UserAgent:Desktop
		// この場合 android version 不明...
		if( !X_UA[ 'OperaMini' ] && !X_UA[ 'OperaTablet' ] && !X_UA[ 'OperaMobile' ] && sys === 'Android' ){
			if( screen.width * screen.height < 320000 ){
				X_UA[ 'OperaMobile' ] = true;
			} else {
				X_UA[ 'OperaTablet' ] = true;
			};
		};
		
		if( 0 < dua.indexOf( 'Nintendo Wii' ) )
			/**
			 * @alias X.UA.Wii
			 * @type {boolean}
			 */
			X_UA[ 'Wii' ] = true;

		if( 0 < dua.indexOf( 'Nitro' ) )
			/**
			 * @alias X.UA.NDS
			 * @type {boolean}
			 */
			X_UA[ 'NDS' ] = true;

		console.log( '>> Opera : ' + v );
	} else
	if( v = parseFloat( dav.split( 'Edge/' )[ 1 ] ) ){
		/**
		 * Microsoft Edge
		 * @alias X.UA.Edge
		 * @type {number}
		 */
			X_UA[ 'Edge' ]  = v;

		if( dav.indexOf( 'Mobile' ) ){
			/**
			 * Microsoft Edge for Windows 10 Mobile
			 * @alias X.UA.EdgeMobile
			 * @type {number}
			 */
			X_UA[ 'EdgeMobile' ] = v;
		};

	}  else
	// Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko
	if( ( v = dav.split( 'Trident/' )[ 1 ] ) || document.all ){ // .all は Opera にもいるので Opera の判定が先
		if( v = parseFloat( v ) )
		/**
		 * IE11 の互換モードの navigator.appVersion にも Trident/7.0 が書かれているため互換モードか?判定ができるc 
		 * @alias X.UA.Trident
		 * @type {number}
		 */
			X_UA[ 'Trident' ]  = v;
		
		if( window[ 'ActiveXObject' ] )
		/**
		 * @alias X.UA.ActiveX
		 * @type {boolean}
		 */
			X_UA[ 'ActiveX' ] = true;

		v = parseFloat( dua.split( 'MSIE ' )[ 1 ] ) ||
			parseFloat( dua.split( 'rv:' )[ 1 ] ) || 0;

		tridentToVer = X_UA[ 'Trident' ] ? ( X_UA[ 'Trident' ] + 4 | 0 ) : v;

		if( tridentToVer !== v ){
			/**
			 * IE10 以上の互換モードを使用している場合、そのバージョン
			 * @alias X.UA.IEHost
			 * @type {number}
			 */			
			X_UA[ 'IEHost' ] = tridentToVer;
		};
		/**
		 * documentモードを考慮したIEのバージョン
		 * @alias X.UA.IE
		 * @type {number}
		 */
		X_UA[ 'IE' ] = v = document.documentMode || tridentToVer;

		if( v < 4.5 ){
			/**
			 * @alias X.UA.IE4
			 * @type {boolean}
			 */			
			X_UA[ 'IE4' ] = true;
		} else
		if( v < 5 ){
			/**
			 * @alias X.UA.IE45
			 * @type {boolean}
			 */			
			X_UA[ 'IE45' ] = true;
		} else
		if( v < 5.5 ){
			/**
			 * @alias X.UA.IE5
			 * @type {boolean}
			 */
			X_UA[ 'IE5' ] = true;		
		} else
		if( v < 6 ){
			/**
			 * @alias X.UA.IE55
			 * @type {boolean}
			 */			
			X_UA[ 'IE55' ] = true;		
		} else
		if( v < 7 ){
			/**
			 * @alias X.UA.IE6
			 * @type {boolean}
			 */			
			X_UA[ 'IE6' ] = true;	
		} else
		if( v < 8 ){
			/**
			 * @alias X.UA.IE7
			 * @type {boolean}
			 */			
			X_UA[ 'IE7' ] = true;		
		} else
		if( v < 9 ){
			/**
			 * @alias X.UA.IE8
			 * @type {boolean}
			 */			
			X_UA[ 'IE8' ] = true;		
		} else
		if( v < 10 ){
			/**
			 * @alias X.UA.IE9
			 * @type {boolean}
			 */			
			X_UA[ 'IE9' ] = true;
		};
		
		if( X_UA[ 'IE4' ] || X_UA[ 'IE45' ] ){
			/**
			 * @alias X.UA.IE4x
			 * @type {boolean}
			 */			
			X_UA[ 'IE4x' ] = true;
		};

		if( X_UA[ 'IE5' ] || X_UA[ 'IE55' ] ){
			/**
			 * @alias X.UA.IE5x
			 * @type {boolean}
			 */			
			X_UA[ 'IE5x' ] = true;
		};

		if( X_UA[ 'Mac' ] ){
			/**
			 * @alias X.UA.MacIE
			 * @type {boolean}
			 */			
			X_UA[ 'MacIE' ] = true;
		};
		
		if( 0 < dua.indexOf( 'IEMobile' ) || X_UA[ 'WinCE' ] ){
			/**
			 * @alias X.UA.IEMobile
			 * @type {boolean}
			 */			
			X_UA[ 'IEMobile' ] = true;
		};

		if( 0 < dua.indexOf( 'Windows Phone' ) || 0 < dav.indexOf( 'ZuneWP' ) ){
			/**
			 * @alias X.UA.WinPhone
			 * @type {boolean}
			 */			
			X_UA[ 'WinPhone' ] = true; // ZuneWP はデスクトップモードで登場する
		};
		
		console.log( '>> IE : ' + v + ' ActiveX : ' + X_UA[ 'ActiveX' ] + ' IEHost : ' + X_UA[ 'IEHost' ] );
		// TODO XBox360, XBox1, Modern or Desktop, Standalone
	} else
	
	// 
	if( v = dua.split( 'NetFront\/' )[ 1 ] ){
		/**
		 * http://qa.support.sony.jp/solution/S0812181056444/common/nfb34_dom_200jp/dom_dom0_JP.html
		 * @alias X.UA.NetFront
		 * @type {number}
		 */
		X_UA[ 'NetFront' ] = parseFloat( v ) || 0.1;
		console.log( '>> NetFront : ' + X_UA[ 'NetFront' ] );
	} else
	
	if( X_UA[ 'Linux' ] && tv === 2 && dua.indexOf( 'Sony\/COM2\/' ) !== -1 ){
		X_UA[ 'NetFront' ] = 3.4;
		console.log( '>> NetFront : ' + X_UA[ 'NetFront' ] );
	} else
	
	if( v = dua.toUpperCase().split( 'PLAYSTATION 3' )[ 1 ] ){
		/**
		 * PlayStation 3 システムバージョン 4.10 未満の SONY 独自ブラウザ
		 * http://www.useragentstring.com/pages/Playstation%203/
		 * Mozilla/5.0 (PLAYSTATION 3; 3.55)
		 * Mozilla/4.0 (PS3 (PlayStation 3); 1.00)
		 * https://github.com/Famous/famous/blob/1a02c8084587d80519ea4bd3b55649ab32ee2e65/examples/assets/lib/require.js
		 * PS3 ブラウザのロードイベントについて
		 * @alias X.UA.PS3
		 * @type {number}
		 */
		X_UA[ 'PS3' ] = parseFloat( v ) || 0.1;
		console.log( '>> PS3 : ' + X_UA[ 'PS3' ] );
	} else
	
	if( v = dua.split( 'iCab' )[ 1 ] ){
		/**
		 * http://www.useragentstring.com/pages/iCab/
		 * iCab/3.0.2 (Macintosh; U; PPC Mac OS X)
		 * Mozilla/5.0 (Macintosh; U; PPC Mac OS; en) iCab 3
		 * @alias X.UA.iCab
		 * @type {number}
		 */
		X_UA[ 'iCab' ] = parseFloat( v ) || 0.1;
		console.log( '>> iCab : ' + X_UA[ 'iCab' ] );
	} else
	
	if( 0 < dua.indexOf( 'Gecko\/' ) && ( v = dua.split( 'rv:' )[ 1 ] ) ){
		v = v.split( '.' );
		/**
		 * メジャーバージョン + マイナーバージョン
		 * @alias X.UA.Gecko
		 * @type {number}
		 */
		X_UA[ 'Gecko' ] = parseFloat( v[ 0 ] ) || 0 +
			( parseFloat( v[ 1 ] ) || 0 ) / 10;
		/**
		 * @alias X.UA.GeckoMajor
		 * @type {number}
		 */
		X_UA[ 'GeckoMajor' ] = parseFloat( v[ 0 ] ) || 0;
		/**
		 * @alias X.UA.GeckoMinor
		 * @type {number}
		 */
		X_UA[ 'GeckoMinor' ] = parseFloat( v[ 1 ] ) || 0;
		/**
		 * @alias X.UA.GeckoPatch
		 * @type {number}
		 */
		X_UA[ 'GeckoPatch' ] = parseFloat( v[ 2 ] ) || 0;
		
		// Fennec41- 用
		// https://developer.mozilla.org/ja/docs/Gecko_user_agent_string_reference
		// バージョン 41 以降の Android 版 Firefox では platform トークンに Android バージョンが含まれます。
		// 相互運用性向上のため、Android 4 以前のバージョンでブラウザが動作している場合は 4.4 と出力します。
		// Android バージョン 4 以降では実際のバージョン番号が出力されます。
		// なお、Gecko エンジンはすべての Android バージョンに対して同じ機能を提供しています。		
		if( dua.indexOf( 'Android 4.4; Mobile;' ) !== -1 || dua.indexOf( 'Android 4.4; Tablet;' ) !== -1 ){
			X_UA[ 'Android' ] = '2.3+';
		} else
		if( dua.indexOf( 'Android;' ) !== -1 ){
			X_UA[ 'Android' ] = '2.2+';
		};		
		
		// TODO PC版 Fennec もある
		//Fennec
		if( v = dua.split( 'Fennec/' )[ 1 ] ){
			/**
			 * Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0
			 * @alias X.UA.Fennec
			 * @type {number}
			 */
			X_UA[ 'Fennec' ] = parseFloat( v );
			console.log( '>> Fennec : ' + X_UA[ 'Fennec' ] + ', Gecko : ' + X_UA[ 'Gecko' ] );
		} else
		if( X_UA[ 'Android' ] ){
			X_UA[ 'Fennec' ] = X_UA[ 'Gecko' ];
		} else
		//Firefox
		
		//Netscape
		//Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4.1) Gecko/20020508 Netscape6/6.2.3
		if( ( i = dua.indexOf( 'Netscape6/' ) ) !== -1 ){
			/**
			 * @alias X.UA.NN
			 * @type {number}
			 */
			X_UA[ 'NN' ]  = parseFloat( dua.substr( i + 10 ) ) || 6;
			/**
			 * @alias X.UA.NN6
			 * @type {boolean}
			 */
			X_UA[ 'NN6' ] = true;
			console.log( '>> NN : ' + X_UA[ 'NN' ] + ', Gecko : ' + X_UA[ 'Gecko' ] );
		} else
		//Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.2) Gecko/20040804 Netscape/7.2 (ax)
		//Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20070321 Netscape/8.1.3
		if( v = dua.split( 'Netscape/' )[ 1 ] ){
			X_UA[ 'NN' ] = parseFloat( v ) || 7;
			console.log( '>> NN : ' + X_UA[ 'NN' ] + ', Gecko : ' + X_UA[ 'Gecko' ] );
		} else
		//Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6
		if( v = dua.split( 'Navigator/' )[ 1 ] ){
			X_UA[ 'NN' ] = parseFloat( v ) || 9;
			console.log( '>> NN : ' + X_UA[ 'NN' ] + ', Gecko : ' + X_UA[ 'Gecko' ] );
		};
		
		console.log( '>> Gecko : ' + X_UA[ 'Gecko' ] );
	} else
	
	// Android 標準ブラウザ AOSP と ChromeWeb View, Sブラウザがある
	if( ( v = X_UA[ 'Android' ] ) && ( dua.indexOf( 'Chrome\/' ) < 0 || 0 < dua.indexOf( 'Version\/' ) || androidBrowserPCMode ) ){ // Chrome/ を含まない または Version/ を含む
		
		/* if( window.chrome ){  // Android3.1 のAOSPブラウザで .chrome がいた、、、
		} else */
		if( dua.indexOf( 'Version\/' ) < 0 && 0 < dua.indexOf( 'Chrome\/' ) && !androidBrowserPCMode ){
			/**
			 * Android 標準ブラウザ Chrome WebView ブラウザ
			 * @alias X.UA.ChromeWV
			 * @type {number}
			 */			
			X_UA[ 'ChromeWV' ] = v;
		} else
		// http://uupaa.hatenablog.com/entry/2014/04/15/163346
		// Chrome WebView は Android 4.4 の時点では WebGL や WebAudio など一部の機能が利用できません(can i use)。
		// また UserAgent が書き換え可能なため、旧来のAOSPブラウザの UserAgent を偽装した形で配布されているケースがあります。
		// http://caniuse.com/#compare=chrome+40,android+4.2-4.3,android+4.4,android+4.4.3-4.4.4,and_chr+45
		// CustomElement の有無で判定
		if( document[ 'registerElement' ] ){
			// UA が偽装された Chrome WebView
			X_UA[ 'ChromeWV' ] = v;
		} else {
			/**
			 * Android 標準ブラウザ AOSP
			 * @alias X.UA.AOSP
			 * @type {number}
			 */
			X_UA[ 'AOSP' ] = v;
		};
		
		/*
		 * http://www.flexfirm.jp/blog/article/402
		 * TODO Sブラウザ
		 * SC-04E、SC-01F、SC-02F、 SC-04F、SCL22、SCL23など
		 */
	} else
	// Blink Chrome & Blink Opera
	if( v = parseFloat( dua.split( 'OPR/' )[ 1 ] ) ){
		/**
		 * @alias X.UA.BlinkOpera
		 * @type {number}
		 */
		X_UA[ 'BlinkOpera' ] = v;
		
		X_UA[ 'Blink' ] = parseFloat( dua.split( 'Chrome/' )[ 1 ] );
	} else
	if( window.chrome ){
		/**
		 * @alias X.UA.Blink
		 * @type {number}
		 */
		X_UA[ 'Blink' ] = parseFloat( dua.split( 'Chrome/' )[ 1 ] );

		console.log( '>>Blink : ' + X_UA[ 'Blink' ] );
	} else
	if( dav.indexOf( 'Konqueror' ) !== -1 ){
		/**
		 * @alias X.UA.Khtml
		 * @type {number}
		 */
		X_UA[ 'Khtml' ] = tv;
		console.log( '>>Khtml : ' + X_UA[ 'Khtml' ] );
		
	} else
	if( v = parseFloat( dua.split( 'WebKit\/' )[ 1 ] ) ){
		/**
		 * @alias X.UA.WebKit
		 * @type {number}
		 */
		X_UA[ 'WebKit' ] = v;
		
		if( v = parseFloat( dua.split( 'Chrome\/' )[ 1 ] ) ){
			/**
			 * @alias X.UA.Chrome
			 * @type {number}
			 */
			X_UA[ 'Chrome' ] = v;
		} else
		if( dua.indexOf( 'Safari' ) !== -1 ){
			if( v = parseFloat( dav.split( 'Version/' )[ 1 ] ) ){
				/**
				 * @alias X.UA.Safari
				 * @type {number}
				 */
				X_UA[ 'Safari' ] = v;
			} else
			if( v <= 528.16 ){
				X_UA[ 'Safari' ] = v <   73    ? 0.8 :
								   v <   85    ? 0.9 :
								   v <  100    ? 1 :
								   v <  125    ? 1.1 :
								   v <  312    ? 1.2 :
								   v <  412    ? 1.3 :
								   v <= 419.3  ? 2 :
								   v <= 525.13 ? 3 :
								   v <= 525.25 ? 3.1 : 3.2;
			};
		};	
		
		console.log( '>> Webkit : ' + X_UA[ 'WebKit' ] + ' Safari : ' + X_UA[ 'Safari' ] );
		
		if( dua.toLowerCase().indexOf( 'iris' ) !== -1 ){
			/**
			 * http://www.useragentstring.com/pages/Iris/
			 * @alias X.UA.Iris
			 * @type {boolean}
			 */
			X_UA[ 'Iris' ] = true;
		};
		
		if( // Kobo Mozilla/5.0 (Linux; U; Android 2.0; en-us;) AppleWebKit/533.1 (KHTML, like Gecko) Verson/4.0 Mobile Safari/533.1 (Kobo Touch)
			dua.indexOf( 'Kobo' ) !== -1 ||
			// Kindle paperwhite Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+
			dua.indexOf( 'Kindle' ) !== -1 ||
			// Sony Reader Mozilla/5.0 (Linux; U; ja-jp; EBRD1101; EXT) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
			dua.indexOf( 'EBRD' ) !== -1
			 ){
				/**
				 * Kobo, Kindle, Sony Reader
				 * @alias X.UA.EInk
				 * @type {boolean}
				 */
			 	X_UA[ 'EInk' ] = true;
			};		
	};

})();

(function(){
	var k, v;

	if( X_UA[ 'IE45' ] || X_UA[ 'IE4' ] ){
		if( X_UA[ 'Mac' ] ){
			X_UA_classNameForHTML = 'Mac';
		} else
		if( X_UA[ 'WinCE' ] ){
			// TODO CE3 の ie4 と WM の ie4 の分岐
			X_UA_classNameForHTML = 'WinCE';
		} else
		if( X_UA[ 'Windows' ] ){
			X_UA_classNameForHTML = 'Win';
		} else {
			X_UA_classNameForHTML = 'Other';
		};		
		
		X_UA_classNameForHTML += '_IE4';
		
		if( X_UA[ 'IE45' ] ){
			X_UA_classNameForHTML += '5';
		};

		if( X_UA[ 'ActiveX' ] ){
			X_UA_classNameForHTML += '_ActiveX';
		};
		
	} else {
		for( k in X_UA ){
			v = X_UA[ k ];
			if( v ){
				if( v !== true ){
					X_UA_classNameForHTML += k + v + ' ';
				} else {
					X_UA_classNameForHTML += k + ' ';
				};
			};
		};		
	};
})();

var X_UA_DOM   = {},
	X_UA_EVENT = {},
	X_UA_HID   = {};

/*
 * http://d.hatena.ne.jp/t-uchima/20051003/p1
 * MacIEにはattachEventが一応あるけどwindow.attachEventとdocument.attachEventしかなく他の要素にはattachEventはない。
 */
if( X_UA[ 'IE4' ] && X_UA[ 'IE' ] < 5 ){ // ie4 & iemobi4 & macie4.x
	X_UA_DOM.IE4   = true;
	X_UA_EVENT.IE4 = true;
} else
if( X_UA[ 'MacIE' ] ){
	X_UA_DOM.W3C  = true;
	X_UA_EVENT.IE = true;
} else
if( document.getElementById ){
	X_UA_DOM.W3C = true;
	if( document.addEventListener ){
		X_UA_EVENT.W3C = true;
	} else
	if( document.attachEvent ){
		X_UA_EVENT.IE = true;
	} else {
		X_UA_EVENT.DOM0 = true;
	};
};

var X_elmHtml = document.documentElement ||
				X_UA_DOM.W3C ? document.getElementsByTagName( 'html' )[ 0 ] :
				X_UA_DOM.IE4 ? document.all.tags( 'html' )[ 0 ] : null,
			
	X_elmHead = 
				X_UA_DOM.W3C ? document.getElementsByTagName( 'head' )[ 0 ] :
				X_UA_DOM.IE4 ? document.all.tags( 'head' )[ 0 ] : null,
	
	X_elmBody;

if( navigator.msPointerEnabled || navigator.pointerEnabled ) X_UA_HID.POINTER = true;
if( !X_UA_HID.POINTER && window.ontouchstart !== undefined ) X_UA_HID.TOUCH   = true;

//alert(X_UA[ 'Safari' ]  + ' ' + X_UA[ 'WebKit' ] + '\n\n' + navigator.userAgent + '\n\n' + navigator.appVersion + '\n\n' + navigator.platform );

// Safari 3.1 未満は開発コンソールがない！
// http://shimax.cocolog-nifty.com/search/2006/09/safarijavascrip_c54d.html
/*
if( X_UA[ 'Safari' ]  && X_UA[ 'WebKit' ] < 525.13 ){	
	window.onerror = function( x, y, z ){
		var n = String.fromCharCode( 10 );
	    alert('window.onerrorによるエラーの捕捉:' + n + x + n + y + 'の' + z + '行目付近です。');
	    return true;
	};
};*/

/*
 * HTML5 に対応しない IE8 以下でも <a> の下に <div> を作ることができる
 * その際に <div> の直前に改行文字が出現するが childNodes は長さ 1 で <div> だけの模様、、、
X_UA_ATagWrapDiv = (function( e, h ){
	e = document.createElement( 'div' );
	e.innerHTML = h = '<a><div></div></a>';
	console.log( e.innerHTML.length + '\n' + e.firstChild.tagName );
	return e.childNodes.length === 1;
})();

console.log( 'HTML5? ' + X_UA_ATagWrapDiv ); */
