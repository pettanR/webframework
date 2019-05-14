
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
	X_UA_classNameForHTML = '',
	X_UA_Gecko_Version;

(function(){
/**
 * @param {string} str1 
 * @param {string} str2 
 * @param {*=} v 
 */
function getNumber( str1, str2, v ){
    v = parseFloat( str1.split( str2 )[ 1 ] );
    return 0 <= v ? v : 0;
};
function fromString( str1, str2 ){
    return str1.indexOf( str2 ) === 0;
};
function findString( str1, str2 ){
    return 0 <= str1.indexOf( str2 );
};

var ua           = X_UA,
    html         = document.documentElement,
    dua          = navigator.userAgent,
    dav          = navigator.appVersion,
    tv           = parseFloat(dav) | 0,
    sys          = navigator.platform,
    docMode      = document.documentMode,
    screenW      = screen.width,
    screenH      = screen.height,
    MathMax      = Math.max,
    AudioElement = window.HTMLAudioElement,
    performance  = window.performance,
    Int8Array    = window.Int8Array,

    isTouch      = window.ontouchstart !== undefined,

    verVersion   = getNumber( dav, 'Version/' ) || getNumber( dua, 'Version/' ),
    /*
     * http://help.dottoro.com/ljifbjwf.php
     * version method (opera)
     *   window.opera.buildNumber();
     *   window.opera.version();
     * 
     * kquery.js
     *   opera.versionは8から実装
     */
    isPrsto     = window.opera,
    verOpera    = isPrsto && ( isPrsto.version ? parseFloat( isPrsto.version() ) : MathMax( getNumber( dua, 'Opera' ), verVersion, tv ) ),
    isOPR       = window.opr,
    /*
     * http://qiita.com/takanamito/items/8c2b6bc24ea01381f1b5#_reference-8eedaa6525b73cd272b7
     * インドネシアの特殊なブラウザ事情(Opera Mini,UC Browser Mini)
     */
    isOpMin     = window.operamini,
    verOpMin    = isOpMin && MathMax( /* isOpMin.version && parseFloat( isOpMin.version() ) | 0, */ getNumber( dua, 'Opera Mini/' ), getNumber( dua, 'Opera Mobi/' ), verVersion ),
    isUCWEB     = findString( dua, 'UCWEB' ),
    verUC2      = getNumber( dua, ' U2/' ),

    isTrident   = !isPrsto && ( document.all || docMode ), // IE11 には .all が居ない .docMode == 11
    isEdge      = !isTrident && html.msContentZoomFactor,
    isBlink     = !isEdge && window.chrome,

    isSafari    = findString( dua, 'Safari' ),
    isIris      = findString( dua.toLowerCase(), 'iris' ),
    /*
     * https://www.fxsitecompat.com/ja/docs/2017/moz-appearance-property-has-been-removed/
     * -moz-appearance プロパティが廃止されました -> 更新: この変更は Firefox 54 で予定されていましたが、延期されました。
     */
    isGecko      = html && html.style.MozAppearance !== undefined, // window.Components
    isKHTML      = findString( dav, 'Konqueror' ),

    isYahooAdr   = findString( dav, 'YJApp-ANDROID' ), // Android 7, Y!browser 2.5.56
    isEdgeAdr    = findString( dav, 'EdgA/' ),

    verPS3       = getNumber( dua.toUpperCase(), 'PLAYSTATION 3' ),
// https://github.com/chitoku-k/SystemInfo/blob/master/systeminfo.js
// http://www.jp.playstation.com/psp/dl/pdf/InternetBrowser_ContentGuideline-J_500.pdf
    isPSP        = findString( dav, 'PSP' ),
    verPSVita    = getNumber( dua, 'PlayStation Vita' ),
// http://blog.gutyan.jp/entry/2015/01/31/NintendoBrowser
    isNDS        = sys === 'Nitro',
    isNDSi       = sys === 'Nintendo DSi',
    isN3DS       = sys === 'Nintendo 3DS',
    isNew3DS     = sys === 'New Nintendo 3DS' || ( findString( dua, 'iPhone OS 6_0' ) && screenW === 320 && screenH === 240 ),
    isWii        = sys === 'Nintendo Wii',
    isWiiU       = sys === 'Nintendo WiiU',
    
    isiOS        = !isNew3DS && fromString( sys, 'iP' )
                    || fromString( dua, '; iPh OS ' ), // UC Browser
                    // || fromString( dua, 'EdgiOS' ),
                    // FxiOS, CriOS, Coast
    isWebOS      = window.palmGetResource,
    verWP        = getNumber( dua, 'Windows Phone' ) || getNumber( dav, 'Windows Phone OS ' )
                    || getNumber( dua, '; wds' ), // UC Browser
    wpPCMode     = findString( dav, 'ZuneWP' ), // ZuneWP はデスクトップモードで登場する
    isWin        = fromString( sys, 'Win' ),
    isMac        = fromString( sys, 'Mac' ),
// Kobo Mozilla/5.0 (Linux; U; Android 2.0; en-us;) AppleWebKit/533.1 (KHTML, like Gecko) Verson/4.0 Mobile Safari/533.1 (Kobo Touch)
    isKobo       = findString( dua, 'Kobo' ),
// Kindle paperwhite Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+
    isKindle     = findString( dua, 'Kindle' ), // Kindle Fire|KFOT|KFTT|KFJW
// Sony Reader Mozilla/5.0 (Linux; U; ja-jp; EBRD1101; EXT) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    isSonyReader = findString( dua, 'EBRD' ),
    isMylo       = tv === 2 && findString( dua, 'Sony/COM2/' ),
    isAndroid    = findString( sys, 'Android' ) ||
        ( isGecko && findString( dav, 'Android' ) ) || /* Android2.3.5 Firefox3.1 */
        isYahooAdr,
    isLinux      = findString( sys, 'Linux' ),
    isMeeGo      = findString( dua, 'MeeGo' ) && findString( dua, 'NokiaBrowser/8.5.0' ),
    isXBoxOne    = findString( dua, 'Xbox One' ),
    isXBox360    = !isXBoxOne && findString( dua, 'Xbox' ),
    isFireFoxOS,
    isBlackBerry,
    isSolaris, // ua SunOS
    // (Ubuntu|Linux|(Free|Net|Open)BSD)

    verAndroid = getNumber( sys, 'Android ' ) || getNumber( dav, 'Android ' ) || getNumber( dua, 'Android ' )
                    || getNumber( dua, '; Adr ' ), // Android for UC Browser Speed mode

    verSafari  = verVersion,
    verTrident = getNumber( dav, 'Trident/' ),
    verEdge    = getNumber( dav, 'Edge/' ),
    verMSIE    =
        docMode               ? docMode :
        window.XMLHTTPRequest ? ( document.getElementsByTagName ? 7 : 4 ) :
        document.compatMode   ? 6 :
        (0).toFixed           ? 5.5 :
        window.attachEvent    ? 5 : 4,

    verGecko   = getNumber( dua, 'rv:' ),
    verWebKit  = getNumber( dua, 'AppleWebKit/' ),
    verChrome  = getNumber( dua, 'Chrome/' ),
    verOPR     = getNumber( dua, 'OPR/' ),
    verFennec  = getNumber( dua, 'Fennec/' ),

// Netscape Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4.1) Gecko/20020508 Netscape6/6.2.3
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.2) Gecko/20040804 Netscape/7.2 (ax)
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20070321 Netscape/8.1.3
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6
    verNetscape = getNumber( dua, 'Netscape6/' ) || // NN6
                  getNumber( dua, 'Netscape/'  ) || // NN7-8
                  getNumber( dua, 'Navigator/' ),   // NN
    verNetFront = getNumber( dua, 'NetFront/' ),
    ver_iCab    = getNumber( dua, 'iCab' ),
    maybeAOSP   = isBlink && verWebKit <= 534.3, // 4.0 & 3.x には chrome がいる... 534~534.3
    maybePCMode =
        ( isTouch && ( verWebKit || isGecko ) && ( sys === 'Linux armv7l' || sys === 'Linux i686' ) && findString( dua, 'Linux x86_64' ) ) ||
        ( !verAndroid && isYahooAdr ),
    
    docRegElm    = !verMSIE && document.registerElement,
    docExecCmd   = !verMSIE && document.execCommand,

    surelyPcMode, isPcMode,
    v, dpRatio;

// system 判定
    if( isKobo ){
        ua[ 'Kobo' ] = true;
    } else if( isKindle ){
        ua[ 'KindlePW' ] = true;
    } else if( isSonyReader ){
        ua[ 'SonyReader' ] = true;
    } else if( isWiiU ){
        ua[ 'WiiU' ] = true;
    } else if( isWii ){
        ua[ 'Wii' ] = true;
        // ua[ 'Opera' ] = verOpera;
    } else if( isNDS ){
        ua[ 'NDS' ] = true;
        // ua[ 'Opera' ] = verOpera;
    } else if( isNDSi ){
        ua[ 'NDSi' ] = true;
        // ua[ 'Opera' ] = verOpera;
    } else if( isN3DS ){
        ua[ 'N3DS' ] = true;
    } else if( isNew3DS ){
        ua[ 'New3DS' ] = true;
    } else if( verPS3 ){
        ua[ 'PS3' ] = true;
    } else if( isPSP ){
        ua[ 'PSP' ] = true;
    } else if( verPSVita ){
        ua[ 'PSVita' ] = verPSVita;
    } else if( isXBox360 ){
        ua[ 'XBox360' ] = true;
    } else if( isXBoxOne ){
        ua[ 'XBoxOne' ] = true;
    } else if( isMylo ){
        ua[ 'Mylo' ] = 2;
        verNetFront = 3.4;
    } else if( isWebOS ){
        ua[ 'WebOS' ] = true;
    } else if( isMeeGo ){
        ua[ 'MeeGo' ] = true;
    } else if( isiOS ){
        dpRatio = window.devicePixelRatio === 1;
        v       = getNumber( dav.split( '_' ).join( '.' ), 'OS ' );

        if( !v ){
            isPcMode = true;
            v =
                // navigator[ 'mediaDevices'    ] ? 11.2 : // WebView では無効
                // https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc/issues/250#issuecomment-336240953
                window.WebAssembly         ? 11.2 :
                window.HTMLMeterElement    ? 10.3 :
                window.Proxy               ? 10.2 :
                window.HTMLPictureElement  ?  9.3 :
                Number.isNaN               ?  9.2 :
                // http://uupaa.hatenablog.com/entry/2015/03/03/223344
                window.SharedWorker        ?
                    ( performance && performance.now ? 8.0 : 8.4 ) :
                docExecCmd                 ?  7.1 :
                window.webkitURL           ?  6.1 :
                window.Worker              ?  5.1 :
                Int8Array                  ?  4.3 :
                AudioElement               ?  4.1 : 3.2;
        };

        ua[ 'iOS' ] = v;

        // 4:3 model
        v = screenW === screenH * 1.5 || screenW * 1.5 === screenH;

        switch( sys ){
            case 'iPhone' :
            case 'iPhone Simulator' :
                ua[ 'iPhone' ] = v ? ( dpRatio ? '3GS-' : '4|4s' ) : '5+';
                break;
            case 'iPad' :
            case 'iPad Simulator' :
                ua[ 'iPad' ] = dpRatio ? '2-|1min-' : '3+|2min+';  
                break;
            case 'iPod' :
            // case 'iPod Simulator' : // 必要??
                ua[ 'iPod' ] = v ? ( dpRatio ? '3-' : '4' ) : '5+';
                break;
        };
    } else if( verWP ){
        ua[ 'WinPhone' ] = verWP;
    } else if( verEdge && sys === 'ARM' ){
        ua[ 'WinPhone' ] = 10;
        isPcMode = true;
    } else if( wpPCMode ){
        ua[ 'WinPhone' ] = verMSIE === 11 ? 8.1 :
                           verMSIE === 10 ? 8   :
                           verMSIE ===  9 ? 7.5 :
                           verMSIE ===  7 ? 7   : '?';
        isPcMode = true;
    } else if( isWin ){
        switch( sys ){
            case 'WinCE' :
                ua[ sys ] = true;
                break;
            case 'Win16' :
            case 'Win32' :
            case 'Win64' :
                ua[ sys ] = true;

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
                        case '5.1' : v = findString( v, '5.1; SV1' ) ? 'XPSP2' : 'XP'; break;
                        case '5.0' : v = findString( v, '5.01' ) ? '2kSP1' : 2000; break;
                        case '4.0' : v = 'NT'; break;
                        default : v = '?';
                    };    
                } else
                if( v = dua.split( 'Windows ' )[ 1 ] ){
                    switch( v.substr( 0, 2 ) ){
                        case '98' : v = findString( v, '98; Win 9x 4.90' ) ? 'ME' : '98|98SE'; break;
                        case '95' : v = 95; break;
                        case '3.' : v = parseFloat( v ); break;
                        default : v = '?';
                    };    
                } else {
                    v = '?';
                };
                
                // 10, 8.1, 8, 7, Vista, 2003|XP64, XPSP2, XP, 2kSP1, 2000, ME, 98|98SE, 95, ?                
                ua[ 'Windows' ] = v;
                break;
        };
    } else if( isMac ){
        ua[ 'Mac' ] = true;
        switch( sys ){
            case 'MacPowerPC' :
                sys = 'MacPPC';
            case 'MacPPC' :
            case 'Mac68K' :
            case 'MacIntel' :
                ua[ sys ] = true;
        };
// Android Fennec
    } else if( isAndroid && isGecko ){
        // PCモードの Android Firefox では platform に Android 0.0.0 が存在
        // Fennec41- 用
        // https://developer.mozilla.org/ja/docs/Gecko_user_agent_string_reference
        // バージョン 41 以降の Android 版 Firefox では platform トークンに Android バージョンが含まれます。
        // 相互運用性向上のため、Android 4 以前のバージョンでブラウザが動作している場合は 4.4 と出力します。
        // Android バージョン 4 以降では実際のバージョン番号が出力されます。
        // なお、Gecko エンジンはすべての Android バージョンに対して同じ機能を提供しています。    
        if( findString( dua, 'Android 4.4;' ) ){
            v = '2.3+';
        } else if( 4 <= verAndroid ){
            v = verAndroid;
        } else if( isAndroid ){
            v = '2.2+';
        };
        if( maybePCMode ) isPcMode = true;
    } else if( isAndroid && isPrsto ){
        if( verAndroid ){
            v = verAndroid;
        } else {
            v = '1.6+';
            isPcMode = true;
        };
        ua[ 'Android' ] = v;
// Android other | Linux
    } else if( verAndroid ){
        ua[ 'Android' ] = verAndroid;
    } else if( isLinux && maybePCMode ){
        // https://ja.wikipedia.org/wiki/WebKit
        // http://www.au.kddi.com/developer/android/kishu/ua/
        // webkit version to Android version...
        surelyPcMode = true;
        // AOSP の判定は Version/ の有無. 但し「デスクトップ版で見る」場合、Version/ が居なくなる...
        // PC版で見る、にチェックが付いている場合、ユーザーエージェント文字列にも platform にも Android の文字列が存在しない(標準ブラウザ&Chrome)
        // Audio でタッチが必要か？の判定にとても困る...
        // ua には Linux x86_64 になっている sys と矛盾する. ATOM CPU の場合は？    
        if( ( isBlink && !maybeAOSP ) || isOPR || verOPR ){
            v = verAndroid = '4+';
        } else if( docRegElm ){
            // http://caniuse.com/#feat=document-execcommand
            // Android 5+ で非対応に
            v = verAndroid = docExecCmd ? 4.4 : 5;

        } else if( Int8Array ){
            v = verAndroid =
                !navigator.connection ? 4.4 :
                ( !window.searchBoxJavaBridge_ && !isBlink ) ? 4.2 : /* & 4.3. 4.1 には searchBoxJavaBridge_ と chrome が存在 */
                Number.isNaN ? 4.1 : 4;
                // 534 - 3.x~4.x , 534.13=3.x
                // 534.30 = 4.0-4.1
                // 535.19 = 4.1
                // 537.36 = 4.4.2-5.x
        } else {
            v = verAndroid =
                verWebKit < 529 ? 1.5 : // <= 528.5
                verWebKit < 531 ? 2.0 : // 530 2.0~2.1
                                        // 533 2.2~2.3
                verWebKit < 534 ? ( AudioElement ? 2.3 : 2.2 ) : 3;
        };
        ua[ 'Android' ] = v;
    } else if( isLinux ){
        ua[ 'Linux' ] = true;
    };

// browser 判定
    if( verNetFront ){
        ua[ 'NetFront' ] = verNetFront;
    } else
    if( ver_iCab ){
        ua[ 'iCab' ] = ver_iCab;
    } else
// PS3 Sony Browser
    if( verPS3 ){
        ua[ 'Sony' ] = verPS3;
    } else
// Opera Mini
    if( isOpMin ){
        ua[ 'OperaMin' ] = verOpMin;
    } else
// UC Browser Speed Mode
    if( isUCWEB ){
        ua[ 'UCWEB' ] = verUC2;
    } else
// Prsto Opera
    if( isPrsto ){
        ua[ 'Opera' ] = ua[ 'Prsto' ] = verOpera;
    } else
// ie11-
    if( isTrident ){
        verTrident = verTrident ? ( verTrident + 4 | 0 ) : verMSIE;

        if( verTrident !== verMSIE ){        
            ua[ 'IEHost' ] = verTrident;
        };
        ua[ 'IE' ] = verMSIE;

        // https://stackoverflow.com/questions/8751479/detect-metro-ui-version-of-ie
        if( 10 <= verMSIE && 8 <= ua[ 'Windows' ] && ua[ 'Windows' ] < 9 ){
            if( screenY === 0 && ( innerHeight + 1 ) !== outerHeight ){
                ua[ 'ModernIE' ] = verMSIE;
            };
        };

        if( ua[ 'Mac' ] ){
            ua[ 'MacIE' ] = verMSIE;
        };
    } else
// edge
    if( isEdge ){
        ua[ 'Edge' ] = verEdge;
    } else
// Gecko
    if( isGecko ){
        ua[ 'Gecko' ] = verGecko;        
    /** TODO PC版 Fennec もある */
    //Fennec
        if( verFennec ){
            /*
             * Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0
             */
            ua[ 'Fennec' ] = verFennec;
        } else
        if( isAndroid ){
            ua[ 'Fennec' ] = verGecko;
        } else
    //Firefox
        if( verNetscape ){
            ua[ 'NN' ] = verNetscape;
        };
    } else
// Blink Opera
    if( /* isBlink && */ isOPR || verOPR ){
        ua[ 'OPR'   ] = verOPR;
        ua[ 'Blink' ] = verChrome;
        if( surelyPcMode ) isPcMode = true;
    } else
// AOSP | Chrome WebView Wrapped Browser
// Android3.x-4.0 のAOSPで window.chrome がいるので AOSP の判定を Blink より先に
    if( verAndroid && maybeAOSP ){
        ua[ 'AOSP' ] = verAndroid;
        if( surelyPcMode ) isPcMode = true;
    } else
// Blink Chrome
    if( isBlink ){
        ua[ 'Blink' ] = verChrome;
        if( surelyPcMode ) isPcMode = true;
    } else
// http://uupaa.hatenablog.com/entry/2014/04/15/163346
// Chrome WebView は Android 4.4 の時点では WebGL や WebAudio など一部の機能が利用できません(can i use)。
// また UserAgent が書き換え可能なため、旧来のAOSPブラウザの UserAgent を偽装した形で配布されているケースがあります。
// http://caniuse.com/#compare=chrome+40,android+4.2-4.3,android+4.4,android+4.4.3-4.4.4,and_chr+45
// CustomElement の有無で判定
    if( verAndroid && docRegElm ){
        // Android 標準ブラウザ Chrome WebView ブラウザ
        ua[ 'CrWV' ] = verAndroid;
        if( surelyPcMode ) isPcMode = true;
    } else
    if( verAndroid && ( verVersion || surelyPcMode ) ){
        ua[ 'AOSP' ] = verAndroid;
        if( surelyPcMode ) isPcMode = true;
    } else
    if( isKHTML ){
        ua[ 'Khtml' ] = tv;
    } else
    if( verWebKit ){
        ua[ 'WebKit' ] = verWebKit;
        
        if( verChrome ){
            ua[ 'Chrome' ] = verChrome;
        } else
        if( isIris ){
            ua[ 'Iris' ] = verWebKit;
        } else
        if( isSafari ){
            if( verSafari ){
                v = verSafari;
            } else
            if( verWebKit <= 528.16 ){
                v = verWebKit <   73    ? 0.8 :
                    verWebKit <   85    ? 0.9 :
                    verWebKit <  100    ? 1 :
                    verWebKit <  125    ? 1.1 :
                    verWebKit <  312    ? 1.2 :
                    verWebKit <  412    ? 1.3 :
                    verWebKit <= 419.3  ? 2 :
                    verWebKit <= 525.13 ? 3 :
                    verWebKit <= 525.25 ? 3.1 : 3.2;
            };
            ua[ 'Safari' ] = v;
        };
    };

    if( isPcMode ) ua[ 'PCMode' ] = true;
})();

(function(){
	var k, v;

	if( X_UA[ 'IE' ] < 5 ){
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
		
		if( 4.5 <= X_UA[ 'IE' ] ){
			X_UA_classNameForHTML += '5';
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
	
	if( X_UA[ 'Gecko' ] && ( v = navigator.userAgent.split( 'rv:' )[ 1 ] )){
		v = v.split( '.' );
		X_UA_Gecko_Version = v[ 0 ] +
			( 0 <= parseFloat( v[ 1 ] ) ?
				'.' + v[ 1 ] +
					( 0  < parseFloat( v[ 2 ] ) ? '.' + v[ 2 ] : '' ) : '' );
	};
})();

var X_UA_DOM   = {},
	X_UA_EVENT = {},
	X_UA_HID   = {};

/*
 * http://d.hatena.ne.jp/t-uchima/20051003/p1
 * MacIEにはattachEventが一応あるけどwindow.attachEventとdocument.attachEventしかなく他の要素にはattachEventはない。
 */
if( X_UA[ 'IE' ] < 5 ){ // ie4 & iemobi4 & macie4.x
	X_UA_DOM.IE4   = true;
	X_UA_EVENT.IE4 = true;
} else
if( X_UA[ 'Mac' ] && X_UA[ 'IE' ] ){
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
