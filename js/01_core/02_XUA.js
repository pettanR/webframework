
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

function getVersionString( strTarget, strStart ){
    var ret = '', i = -1, charCode;

    if( strTarget = strTarget.split( strStart )[ 1 ] ){
        while( charCode = strTarget.charCodeAt( ++i ) ){
            if( ( 48 <= charCode && charCode <= 57 ) || charCode === 46 ){
                ret += strTarget.charAt( i );
            } else {
                break;
            };
        };
        i = ret.length;
        while( i ){
            if( ret.charCodeAt( --i ) === 46 ){
                ret = ret.substr( 0, i );
            } else {
                break;
            };
        };
    };
    return ret;
};

function conpareVersionString( v1, v2 ){
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
	return v1.length > v2.length ? 1 : -1;
};

/**
 * @param {...string}
 * @return {string}
 */
function max(){
    var args = arguments, i = 1, l = args.length, max = args[ 0 ], v;
    
    for( ; i < l; ++i ){
        if( conpareVersionString( max, v = args[ i ] ) < 0 ) max = v;
    };
    return max;
};

var ua            = X_UA,
    engine, engineVersion, platform, platformVersion, brand, brandVersion, device, deviceVersion,
    
    strUserAgent  = navigator.userAgent,
    strAppVersion = navigator.appVersion,
    appVersion    = parseFloat( strAppVersion ) | 0,
    strPlatform   = navigator.platform,

    html          = document.documentElement,
    docMode       = document.documentMode,
    screenW       = screen.width,
    screenH       = screen.height,
    AudioElement  = window.HTMLAudioElement,
    performance   = window.performance,
    Int8Array     = window.Int8Array,

    isTouch       = window.ontouchstart !== undefined,

    verVersion    = getVersionString( strAppVersion, 'Version/' ) || getVersionString( strUserAgent, 'Version/' ),

    // https://www.fxsitecompat.com/ja/docs/2017/moz-appearance-property-has-been-removed/
    // -moz-appearance プロパティが廃止されました -> 更新: この変更は Firefox 54 で予定されていましたが、延期されました。
    isGecko = html && html.style.MozAppearance !== undefined, // window.Components

    /*
     * http://qiita.com/takanamito/items/8c2b6bc24ea01381f1b5#_reference-8eedaa6525b73cd272b7
     * インドネシアの特殊なブラウザ事情(Opera Mini,UC Browser Mini)
     */
    hasOperaMiniObject = window.operamini, // iOS Opera Mini には .operamini が無い. iOS 12.2 Opera Mini 16.0.14

    isUCWEB      = findString( strUserAgent, 'UCWEB' ),
    versionUCWEB = isUCWEB && getVersionString( strUserAgent, ' U2/' ),
    // https://developers.whatismybrowser.com/useragents/parse/244780-uc-browser-windows
    // UCWEB/2.0 (Windows; U; wds 8.10; en-US; NOKIA; RM-976_1115) U2/1.0.0 UCBrowser/4.2.1.541 U2/1.0.0 Mobile
    versionWPWithUC = isUCWEB && getVersionString( strUserAgent, '; wds ' ),// UC Browser
    // http://thadafinser.github.io/UserAgentParserComparison/v4/user-agent-detail/d4/26/d4262844-7040-4f5b-8f26-bf0477b215c3.html
    // UCWEB/2.0 (iOS; U; iPh OS 6_1_3; xx; iPh3,1) U2/1.0.0 UCBrowser/9.0.1.284 U2/1.0.0 Mobile
    versioniOSWithUC        = getVersionString( strUserAgent.split( '_' ).join( '.' ), '; iPh OS ' ),
    versionAndroidWithUCWEB = getVersionString( strUserAgent, '; Adr ' ), // Android for UC Browser Speed mode

    isYahooForAandroid = findString( strAppVersion, 'YJApp-ANDROID' ), // Android 7, Y!browser 2.5.56
    
    isAndroid  = findString( strPlatform, 'Android' ) ||
                 ( isGecko && findString( strAppVersion, 'Android' ) ) || /* Android2.3.5 Firefox3.1 */
                 isYahooForAandroid,
    versionAndroid = getVersionString( strPlatform , 'Android ' ) || getVersionString( strAppVersion, 'Android ' ) ||
                     getVersionString( strUserAgent, 'Android ' ) || versionAndroidWithUCWEB,
    maybeLinux  = findString( strPlatform, 'Linux' ), // Linux or Android

    /*
     * http://help.dottoro.com/ljifbjwf.php
     * version method (opera)
     *   window.opera.buildNumber();
     *   window.opera.version();
     * 
     * kquery.js
     *   opera.versionは8から実装
     */
    isPresto      = !hasOperaMiniObject && window.opera,
    versionPresto = isPresto && (
        ( isPresto.version && typeof isPresto.version === 'function' ) ? isPresto.version() : max( getVersionString( strUserAgent, 'Opera ' ), verVersion, '' + appVersion )
    ),
    hasOPRObject  = window.opr, // 全ての Blink Opera に存在するわけではない？

    isTrident      = !isPresto && ( document.all || docMode ), // IE11 には .all が居ない .docMode == 11
    versionTrident = isTrident && (
        docMode               ? docMode :
        window.XMLHTTPRequest ? ( document.getElementsByTagName ? 7 : 4 ) :
        document.compatMode   ? 6 :
        (0).toFixed           ? 5.5 :
        window.attachEvent    ? 5 : 4 ),
 
    isEdgeHTML  = !isTrident && html.msContentZoomFactor,
    versionEdge = isEdgeHTML && getVersionString( strAppVersion, 'Edge/' ),

    hasChromeObject = !isEdgeHTML && window.chrome, // AOSP 4.1 にもいる！

// https://developers.whatismybrowser.com/useragents/parse/987005-pale-moon-windows-goanna
// TODO Goanna/20161201 になっている時がある…
    versionGoanna = isGecko && getVersionString( strUserAgent, 'Goanna/' ),
    versionGecko  = !versionGoanna && isGecko && getVersionString( strUserAgent, 'rv:' ),

    versionWebKit = getNumber( strUserAgent, 'AppleWebKit/' ),
    versionChrome = getVersionString( strUserAgent, 'Chrome/' ),
    versionOPR    = getVersionString( strUserAgent, 'OPR/' ),
    versionKHTML  = getVersionString( strAppVersion, 'KHTML/' ),
    versionIris   = getVersionString( strUserAgent.toLowerCase(), 'iris' ),
    versionFxiOS  = getVersionString( strUserAgent, 'FxiOS/' ),

    // https://issuetracker.google.com/issues/36957795
    //  Canvas clearRect failing to clear
    // https://stackoverflow.com/questions/14948720/is-it-possible-to-detect-samsung-stock-browser
    //  Is it possible to detect samsung stock browser


    // https://gist.github.com/poshaughnessy/5718717a04db20a02e9fdb3fc16e2258
    // https://gist.github.com/NielsLeenheer/4daa6a9ce7f4a0f4733d

    // https://gist.github.com/uupaa/b25c9cf47bbeedea5a7f
    // Android 4.4 から Android Browser は Chrome WebView をベースにしているとのことなので、ちょっと古めの Chrome という扱いで良さそうです。
    verSamsung   = getNumber( strUserAgent, 'SamsungBrowser/' ),
    maybeSamsung = !verSamsung && (function(){
        var unversionedDevices = (
                'GT-I9300 GT-I9305 SHV-E210 SGH-T999L SGH-I747 ' +                   // Galaxy S III          , 2012.05, 4.0.4~4.4.4
                'SGH-N064 SC-06D SGH-N035 SC-03E SCH-J021 SCL21 SCH-R530 SCH-I535 ' +
                'SCH-S960L SCH-S968C GT-I9308 SCH-I939 SHV-E210S ' +
                'GT-I8160 ' +                                                         // Galaxy Ace 2          , 2012.05, 2.3.6~4.1.2
                'GT-I8260 GT-I8262 ' +                                                // Galaxy Core           , 2013.06, 4.1.2
                'SM-G350 SM-G352 ' + // SM-G3502 SM-G3520                             // Galaxy Core Plus      , 2013.10, 4.2.2
                'SM-G386F SM-G386T1' +                                                // Galaxy Core LTE       , 2014.03, 4.2.2
                'GT-N7000 GT-N7005 SHV-E160 SC-05D ' +                                // Galaxy Note           , 2011.10, 2.3.6~4.1.2
                'SGH-N054 SGH-I717 SGH-T879 GT-I9220 GT-I9228 SCH-I889 ' +
                // GT-N7000B SHV-E160K SHV-E160L SGH-I717I 
                'GT-N7100 GT-N7105 SCH-I605 SCH-R950 SGH-I317 SGH-T889 ' +            // Galaxy Note II        , 2012.09, 4.1.1~4.4.2
                'SPH-L900 SCH-N719 GT-N7102 GT-N7108 SGH-N025 SC-02E SHV-E250 ' +
                // SGH-I317M SGH-T889V GT-N7108D SHV-E250K SHV-E250L SHV-E250S 
                'GT-N5100 GT-N5110 GT-N5120 ' +                                       // Galaxy Note 8.0       , 2013.04, 4.1.2~4.4.2
                'GT-N8000 GT-N8005 GT-N8010 GT-N8013 GT-N8020 ' +                     // Galaxy Note 10.1      , 2012.02, 4.0.3~4.4.2
                'GT-I9100 GT-I9108 GT-I9210 ' +                                       // Galaxy S II           , 2011.05, 2.3  ~4.1.2
                'SGH-I777 SGH-I757M SGH-I727 SGH-I927 SGH-T989 '+
                'SHW-M250 ' +
                'SPH-D710 ISW11SC SC-02C SCH-R760 SCH-I929 ' +
                // GT-I9100G GT-I9100T GT-I9100M GT-I9100P GT-I9210T SGH-I727R SGH-T989D SHW-M250K SHW-M250L SHW-M250S 
                'GT-I9105 ' + // GT-I9105                                             // Galaxy S II Plus      , 2013.01, 4.1.2~4.2.2
                'GT-I8190 ' + // GT-I8190N                                            // Galaxy S III Mini     , 2012.10, 4.1.1~4.1.2
                'GT-I8200 ' + /* GT-I8200N */                                         // Galaxy S III Mini VE  , 2014.03, 4.2.2
                'SM-G730A ' +                                                         // Galaxy S III Mini     , 2014.06, 4.4
                'GT-P3100 GT-P3110 GT-P3113 SCH-I705 ' +                              // Galaxy Tab 2 7.0      , 2012.04, 4.0.3~4.2.2
                'GT-P5100 GT-P5110 GT-P5113 SCH-I915 ' +                              // Galaxy Tab 2 10.1     , 2012.04, 4.0.3~4.2.2
                'SM-G3508 SM-G3509 ' + /* SM-G3502 SM-G3502U */                       // Galaxy Trend 3        , 2013.10, 4.2.2~ 
                'GT-S7580 GT-S7582 ' +                                                // Galaxy Trend Plus(S Duos 2), 2013.12, 4.2
                'GT-S6310 GT-S6312 GT-S6313T' // GT-S6310L                            // Galaxy Young          , 2013.03, 4.1.2
            ).split( ' ' ),
            device, i = unversionedDevices.length;
        
        while( device = unversionedDevices[ --i ] ){
            if( findString( strUserAgent, device ) ) return parseFloat( verVersion ) < 2 ? verVersion : 0.9;
        };

        var versionedDevices = (
            // Galaxy J (SC-02F) にも Chrome 28 相当と主張する S Browser が搭載されています。
            'SC-02F SGH-N075 ' +                                                      // Galaxy J              , 2013.10, 4.3
            'GT-S7270 GT-S7272 GT-S7275R ' + // GT-S720?                              // Galaxy Ace 3          , 2013.06, 4.2.2
            'GT-I9150 GT-I9152 GT-I9200 GT-I9205 ' +                                  // Galaxy Mega           , 2013.04, 4.2.2

            'GT-I9500 GT-I9506 SC-04E SGH-N045 ' +                                    // Galaxy S4             , 2013.04, 4.2.2
            'GT-I9190 GT-I9192 GT-I9295 GT-I9197 GT-I9198 SGH-I257M SCH-I435 ' +      // Galaxy S4 Mini        , 2013.07, 4.2.2, 
            'GT-I8666 GT-I8552 GT-I8558 SHV-E500S/L GT-18552B ' +                     // Galaxy Win            , 2013.03, 4.1.2, 
            'SM-N900 N9000 N9002 SC-01F SCL22 ' + // SM-N900D SM-N900J                // Galaxy Note 3         , 2013.09, 4.3
            // 'SM-N9005 SM-N9006 SM-N900A SM-N900T SM-N900P SM-N900V SM-N900R4 SM-N900W8 '
            'SM-G7100 SM-G7102 SM-G7105 ' +                                           // Galaxy Grand 2        , 2013.11, 4.3
            'SM-N750 ' +                                                              // Galaxy Note 3 Neo     , 2014.01, 4.3   
            // 'SM-N7509V SM-N7506V SM-N7502 SM-N750K SM-N750L SM-N750S SM-N7507, SM-N7500Q, SM-N7505L, SM-N7505 '
            'SM-P600 SM-P601 SM-P605 ' +                                              // Galaxy Note 10.1(2014), 2013.09, 4.3
            'GT-I9301I GT-I9300RWI ' +                                                // Galaxy S3 Neo         , 2012.03, 4.0.4
            'SGH-T399 ' +                                                             // Galaxy Light          , 2013.10, 4.2.2?
            'SM-P900 SM-P901 SM-P90 SM-P905 ' +                                       // Galaxy Note Pro       , 2014.02, 4.4.2
            'GT-I9295 SGH-I537 ' +                                                    // Galaxy S4 Active      , 2013.06, 4.2.2
            'SHV-E330S GT-I9507V ' +                                                  // Galaxy S4 Advance     , 2013.    4.2.2
            'GT-I9505 GT-I9515 SGH-I337 ' +                                           // Galaxy S4 VE(Neo)     , 2013.03, 4.2.2
            'SM-T230 SM-T231 SM-T235 SM-T237 403SC ' +  // (SM-T237Z)                 // Galaxy Tab 4(7.0)     , 2014.03, 4.4.2
            'SM-T330NU SM-T331NU SM-T337V ' +                                         // Galaxy Tab 4(8.0)     , 2014.03, 4.4.2
            'SM-T530 SM-T531 SM-T535 ' +                                              // Galaxy Tab 4(10.1)    , 2014.03, 4.4.2
            'M-T320 SM-T321 SM-T325 ' +                                               // Galaxy Tab Pro 8.4    , 2014.01, 4.4
            'SM-T520 SM-T525 ' +                                                      // Galaxy Tab Pro 10.1   , 2014.02, 4.4
            'SM-T900 SM-T905 ' +                                                      // Galaxy Tab Pro 12.2   , 2014.02, 4.4
            'SM-T700 SM-T705 SM-T707V ' +                                             // Galaxy Tab S 8.4      , 2014.07, 4.4.2
            'SM-T800 SM-T805 SM-T807 ' + // 'SM-T807P SM-T807V'                       // Galaxy Tab S 10.5     , 2014.06, 4.4.2
            'SM-A300 ' + //SM-A300H SM-A300H/DS SM-A300M/DS SM-A300F SM-A300F         // Galaxy A3             , 2014.10, 4.4.4
            'SM-A5000 SM-A5009 SM-A500F SM-A500F1 SM-A500FQ SM-A500FU SM-A500G ' +    // Galaxy A5             , 2014.10, 4.4.4
            'SM-A500H SM-A500HQ SM-A500K ' +
            'SM-G850 ' +                                                              // Galaxy Alpha          , 2014.08, 4.4.4
            // SM-G850F SM-G850FQ SM-G850K SM-G850L SM-G850M SM-G850S SM-G850W SM-G850Y
            'SM-C115 SM-C111 ' +                                                      // Galaxy S4 Zoom        , 2014.04, 4.4.2
            'SM-G750F SM-G7508 SM-G7508Q SM-G750H ' +                                 // Galaxy Mega 2         , 2014.09, 4.4.3
            'GT-I9301I ' + // GT-I9300I                                               // Galaxy S III Neo      , 2014.04, 4.3
            'SM-900 SC-04F SCL23 ' + // SM-G900D SM-G900J                             // Galaxy S5             , 2014.04, 4.4.2
            // SM-G900F SM-G900I SM-G900M SM-G900T SM-G900W8 SM-G900H SM-G900FD SM-G900P SM-G900A SM-G9008W SM-G900L SM-G900FQ
            'SM-G906S SM-G906K SM-G906L ' +                                           // Galaxy S5 LTE         , 2014.07, 4.4.2
            'SM-G870A SM-N915 SC-02G ' + // SM-N915D                                  // Galaxy S5 Active      , 2014.05, 4.4.2
            // SM-G8508S                                                              // Galaxy Alpha(S801)    , 2014.08, 4.4.4
            'SM-800'                                                                  // Galaxy S5 Mini        , 2014.07, 4.4.2
            // SM-G800A SM-G800F SM-G800H SM-G800H/DS SM-G800M SM-G800Y SM-G800R4

            //'SM-G9105 ' +                            // Galaxy Round      , 2013.10, 4.3
            //'SM-G3815 ' +                            // Galaxy Express 2  , 2013.10, 4.2.2
            // 'GT-S7260 ' +                            // Galaxy Star PRO , 2013.10, 4.1.2 // http://webcache.googleusercontent.com/search?q=cache:OLmO9AXHO5wJ:www.mforum.ru/phones/samsunggts7260galaxystarpro.htm

            //'SGH-N075 ' +                            // Galaxy J          , 2013.12, 4.3
            //'SM-G3812 SM-G3818 SM-G3819 SM-G3819D ' +                            // Galaxy Win Pro    , 2013.12, 4.2.2
            //'GT-I9060 ' +                            // Galaxy Grand Neo  , 2014.01, 4.3, Known as "Galaxy Grand Lite"

            //'SM-G360 ' +                             // Galaxy Win 2      , 2014.03, 4.4.4?  
            
            //'SM-G310H ' +                            // Galaxy Ace Style  , 2014.05, 4.4.2?
            //'SM-C115 ' +                             // Galaxy K Zoom     , 2014.05, 4.4.2?

            //'SM-G355H ' +                            // Galaxy Core 2     , 2014.07, 4.4.2
            //'SM-G313HU ' +                           // Galaxy S Duos 3   , 2014.08, 4.4.2
            //'SM-G313F SM-G313MU SM-G313M SM-G3139 ' +// Galaxy Ace 4      , 2014.08, 4.4.2
            //'SM-G350E ' +                            // Galaxy Star 2 Plus, 2014.08, 4.4.2
            //'SM-G110B SM-G110B/DS SM-G110H SM-G110M' +
                                                        // Galaxy Pocket 2   , 2014.09, 4.4.2
            //'SM-G130H'                               // Galaxy Young 2    , 2014.10, 4.4.2
            //'SM-C1010 ' +                                                           // Galaxy S4 Zoom    , 2013.06, 4.2.2
        ).split( ' ' );
        i = versionedDevices.length;

        while( device = versionedDevices[ --i ] ){
            if( findString( strUserAgent, device ) ) return verVersion;
        };
    })(),
// https://developers.whatismybrowser.com/useragents/explore/software_name/samsung-browser/
// スマホに登場するのは 4.4.4 以降で SamsungBrowser/2.0 から。
// SMART-TV には /1.0 から。Tizen 2.3

    maybeAOSP   = hasChromeObject && versionWebKit <= 534.3, // 4.0 & 3.x には chrome がいる... 534~534.3
    maybePCMode =
        ( isTouch && ( versionWebKit || isGecko ) && (
            fromString( strPlatform, 'Linux armv'  ) || // armv7l, armv8l
            fromString( strPlatform, 'Linux aarch' ) || // aarch32, aarch64
            strPlatform === 'Linux i686'
        ) && findString( strUserAgent, 'Linux x86_64' ) ) ||
        ( !versionAndroid && isYahooForAandroid ),

    hasPuffinObject      = window.puffinDevice,
    puffinClientInfo     = hasPuffinObject && hasPuffinObject.clientInfo,
    versioniOSWithPuffin = puffinClientInfo && puffinClientInfo.os === 'iOS' && puffinClientInfo.osVersion,
    puffinDevice         = versioniOSWithPuffin && puffinClientInfo.model,

    docRegElm    = !versionTrident && document.registerElement,
    docExecCmd   = !versionTrident && document.execCommand,

    // Android 5.0 ChromeWebView 37.0.0.0 (Genymotion) で window.opener に触るとセキュリティエラーが発生するのを利用して Android を判定する。
    maybeChromeWebView = maybeLinux && docRegElm && versionChrome && /* window.CSS || */ (new Function('try{for(var k in opener){}}catch(e){return true}'))(),

    surelyPcMode, isPcMode, strVersion,
    v, dpRatio,
    
    deviceTypeIsPDA, deviceTypeIsGame, deviceTypeIsTV,
    deviceTypeIsMediaPlayer, deviceTypeIsEBookReader,
    deviceTypeIsPhone, deviceTypeIsTablet,
    deviceTypeIsPC,
    isMac, isAndroidBrowser, isAndroidChromeWebView, isAndroidBased, is_iOSWebView;
/*----------------------------------------------------------------------------//
 *  Nintendo DS
 */
if( strPlatform === 'Nitro' ){
    // https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%B3%E3%83%86%E3%83%B3%E3%83%89%E3%83%BCDS%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC
    platform         = 'NDS';
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  Nintendo DSi
 */
if( strPlatform === 'Nintendo DSi' ){
    // https://ja.wikipedia.org/wiki/%E3%83%8B%E3%83%B3%E3%83%86%E3%83%B3%E3%83%89%E3%83%BCDSi%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%83%BC
    // https://developers.whatismybrowser.com/useragents/explore/operating_platform/nintendo-dsi/
    platform         = 'NDSi';
    platformVersion  = getVersionString( strAppVersion, 'Opera/' ); // Opera/9.50 ... Opera/507
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  New 3DS
 */
if( strPlatform === 'New Nintendo 3DS' || ( findString( strUserAgent, 'iPhone OS 6_0' ) && screenW === 320 && screenH === 240 ) ){
    platform         = 'New3DS';
    platformVersion  = getVersionString( strUserAgent, 'NintendoBrowser/' );
    engine           = 'WebKit';
    engineVersion    = versionWebKit;
    brand            = 'NetFrontNX';
    brandVersion     = getVersionString( strUserAgent, 'NX/' );
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  3DS
 */
if( strPlatform === 'Nintendo 3DS' ){
    platform         = 'N3DS';
    platformVersion  = getVersionString( strUserAgent, 'Version/' );
    engine           = 'WebKit';
    engineVersion    = 535; // 534:2.0.0-2J - 9.5.0-22J, 9.5.0-23J -
    brand            = 'NetFrontNX';
    brandVersion     = platformVersion;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  Nintendo Swicth
 */
if( strPlatform === 'Nintendo Swicth' ){
    platform         = 'Swicth';
    platformVersion  = getVersionString( strAppVersion, 'NintendoBrowser/' );
    engine           = 'WebKit';
    engineVersion    = versionWebKit;
    brand            = 'NetFrontNX';
    brandVersion     = getVersionString( strAppVersion, 'NX/' );
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  WiiU
 */
if( strPlatform === 'Nintendo WiiU' ){
    // https://www.nintendo.co.jp/hardware/wiiu/internetbrowser/index.html
    platform         = 'WiiU';
    platformVersion  = getVersionString( strAppVersion, 'NintendoBrowser/' );
    brand            = 'NetFrontNX';
    brandVersion     = getVersionString( strAppVersion, 'NX/' );
    engine           = 'WebKit';
    // https://blog.gutyan.jp/entry/2015/01/31/NintendoBrowser
    // UブラウザにはNew3DS以上のUA切替機能がある。
    // platform始めUA以外のnavigatorのプロパティはいずれの場合も変更されない。
    engineVersion    = getVersionString( strAppVersion, 'AppleWebKit/' ); // 534:2.1.0J - 3.1.0J, 536:4.0.0J - 
    deviceTypeIsGame = true;
    // TODO isPcMode
} else
/*----------------------------------------------------------------------------//
 *  Wii
 */
if( strPlatform === 'Nintendo Wii' ){
    // https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88%E3%83%81%E3%83%A3%E3%83%B3%E3%83%8D%E3%83%AB
    // 2007年 4月12日版：Opera/9.10（Nintendo Wii; U; ; 1621; ja）
    // 2007年10月10日版：Opera/9.30（Nintendo Wii; U; ; 2047-7; ja）
    // 2009年 9月 1日版：Opera/9.30 (Nintendo Wii; U; ; 3642; ja)
    platform         = 'Wii';
    platformVersion  = getVersionString( strUserAgent, 'Wii; U; ; ' );
    brand            = platform;
    brandVersion     = platformVersion;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  PlayStation Vita
 */
if( strVersion = getVersionString( strUserAgent, 'PlayStation Vita ' ) ){
    // http://d.hatena.ne.jp/nakamura001/20111221/1324486445
    // Mozilla/5.0 (PlayStation Vita 1.50) AppleWebKit/531.22.8 (KHTML, like Gecko) Silk/3.2
    platform         = 'PSVita';
    platformVersion  = strVersion;
    engine           = 'WebKit';
    engineVersion    = versionWebKit; // 531, 536, 537
    brand            = platform;
    brandVersion     = strVersion;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  PSP
 */
if( strVersion = getVersionString( strUserAgent, '(PlayStation Portable); ' ) ){
    // https://github.com/chitoku-k/SystemInfo/blob/master/systeminfo.js
    // http://www.jp.playstation.com/psp/dl/pdf/InternetBrowser_ContentGuideline-J_500.pdf
    // User-Agent: Mozilla/4.0 (PSP (PlayStation Portable); 2.00)
    platform         = 'PSP';
    platformVersion  = strVersion;
    engine           = 'NetFront';
    engineVersion    = 3.3; // 多分
    brand            = platform;
    brandVersion     = strVersion;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  PLAYSTATION 3
 */
if( strVersion = getVersionString( strUserAgent, 'PLAYSTATION 3; ' ) || getVersionString( strUserAgent, 'PLAYSTATION 3 ' ) ){
    platform         = 'PS3';
    platformVersion  = strVersion;
    brand            = platform;
    brandVersion     = strVersion;
    if( 0 <= conpareVersionString( '4.10', strVersion ) ){
        engine        = 'WebKit';
        engineVersion = versionWebKit;
    } else {
        engine        = 'Sony';
        engineVersion = strVersion;
    };
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  XBox One
 */
if( findString( strUserAgent, 'Xbox One' ) ){
    platform         = 'XboxOne';
    platformVersion  = 1;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  XBox 360
 */
if( findString( strUserAgent, 'Xbox' ) ){
    platform         = 'Xbox360';
    platformVersion  = 1;
    deviceTypeIsGame = true;
} else
/*----------------------------------------------------------------------------//
 *  Mylo2
 */
if( appVersion === 2 && findString( strUserAgent, 'Sony/COM2/' ) ){
    platform         = 'Mylo';
    platformVersion  = 2;
    engine           = 'NetFront';
    engineVersion    = 3.4;
    brand            = engine;
    brandVersion     = engineVersion;
    deviceTypeIsPDA  = true;
} else
/*----------------------------------------------------------------------------//
 *  iOS
 */
if( fromString( strPlatform, 'iP' ) || versioniOSWithUC || versioniOSWithPuffin ){
    if( versioniOSWithPuffin ){
        platformVersion = versioniOSWithPuffin;
        switch( puffinDevice.substr( 0, 4 ) ){
            case 'iPho' :
                device        = 'iPhone';
                deviceVersion = parseFloat( puffinDevice.substr( 6 ) );
                deviceTypeIsPhone = true;
                break;
            case 'iPad' :
                device        = 'iPad';
                deviceVersion = parseFloat( puffinDevice.substr( 4 ) );
                deviceTypeIsTablet = true;
                break;
            case 'iPod' :
                device        = 'iPod';
                deviceVersion = parseFloat( puffinDevice.substr( 4 ) );
                deviceTypeIsMediaPlayer = true;
                break;
        };
    } else {
        if( versioniOSWithUC ){
            platformVersion = versioniOSWithUC;
        } else {
            platformVersion = getVersionString( strAppVersion.split( '_' ).join( '.' ), 'OS ' );
        };

        if( !platformVersion ){
            isPcMode = true;
            platformVersion =
                // navigator[ 'mediaDevices'    ] ? 11.2 : // WebView では無効
                // https://github.com/BasqueVoIPMafia/cordova-plugin-iosrtc/issues/250#issuecomment-336240953
                window.PointerEvent        ? 13   :
                window.HTMLDataListElement ? 12.2 :
                Array.prototype.flat       ? 12   :
                navigator.sendBeacon       ? 11.3 :
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

        dpRatio       = window.devicePixelRatio === 1;
        // 4:3 model
        v = screenW === screenH * 1.5 || screenW * 1.5 === screenH;

        if( fromString( strPlatform, 'iPhone' ) ){ // iPhone or iPhone Simulator
            device             = 'iPhone';
            deviceVersion      = v ? ( dpRatio ? { max : 3 } : { min : 4, max : 5 } ) : { max : 6 };
            deviceTypeIsPhone = true;
        } else if( fromString( strPlatform, 'iPad' ) ){ // iPad or iPad Simulator
            device            = 'iPad';
            deviceVersion     = dpRatio ? { max : 2 } : { min : 3 }; 
            deviceTypeIsTablet = true;
        } else if( fromString( strPlatform, 'iPod' ) ){
            device                  = 'iPod';
            deviceVersion           = v ? ( dpRatio ? { max : 3 } : 4 ) : { min : 5 };
            deviceTypeIsMediaPlayer = true;
        };
    };

    if( !versioniOSWithPuffin && // iPad iOS12.2 Puffin5.2.2 で fullscreenEnabled が存在の模様
        ( document.fullscreenEnabled !== undefined || document.webkitFullscreenEnabled !== undefined ) ){
        // https://github.com/uupaa/WebApp2/blob/master/app/assets/modules/UserAgent.js
        // _isWebView_iOS(options)
        engine       = 'SafariMobile';
        brand        = 'Safari';
        brandVersion = platformVersion;
    } else {
        is_iOSWebView = true;
        engine        = 'iOSWebView';
    };
    platform      = 'iOS';
    engineVersion = platformVersion;
} else
/*----------------------------------------------------------------------------//
 *  Kobo
 */
if( findString( strUserAgent, 'Kobo' ) ){
// Mozilla/5.0 (Linux; U; Android 2.0; en-us;) AppleWebKit/533.1 (KHTML, like Gecko) Verson/4.0 Mobile Safari/533.1 (Kobo Touch)
    platform                = 'Kobo';
    engine                  = 'AOSP';
    engineVersion           = 2.2;    
    brand                   = engine;
    brandVersion            = engineVersion;
    deviceTypeIsEBookReader = true;
    isAndroid = true;
} else
/*----------------------------------------------------------------------------//
 *  Sony Reader
 */
if( findString( strUserAgent, 'EBRD' ) ){
// Mozilla/5.0 (Linux; U; ja-jp; EBRD1101; EXT) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1
    platform                = 'SonyReader';
    //platformVersion         = 1;
    engine                  = 'AOSP';
    engineVersion           = 2.2;    
    brand                   = engine;
    brandVersion            = engineVersion;
    deviceTypeIsEBookReader = true;
} else
/*----------------------------------------------------------------------------//
 *  ChromeOS
 */
if( strVersion =
        getVersionString( strUserAgent, 'CrOS x86_64 '  ) ||
        getVersionString( strUserAgent, 'CrOS aarch64 ' ) ||
        getVersionString( strUserAgent, 'CrOS i686 '    ) ||
        getVersionString( strUserAgent, 'CrOS armv7l '  ) ){
    platform        = 'ChromeOS';
    platformVersion = strVersion;
    deviceTypeIsPC  = true;
} else
/*----------------------------------------------------------------------------//
 *  FirefoxOS
 */
if( window.onmoztimechange !== undefined ){
    // https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Window/onmoztimechange
    // This API is available on Firefox OS for internal applications only.
    platform        = 'FirefoxOS';
    platformVersion = versionGecko < 18.1 ? '1.0.1' :
                    versionGecko < 19   ? 1.1 :
                    versionGecko < 27   ? 1.2 :
                    versionGecko < 29   ? 1.3 :
                    versionGecko < 31   ? 1.4 :
                    versionGecko < 33   ? 2.0 :
                    versionGecko < 35   ? 2.1 :
                    versionGecko < 38   ? 2.2 :
                    versionGecko < 45   ? 2.5 :
                                          2.6; // Gecko 45
    // https://developer.mozilla.org/ja/docs/Web/HTTP/Gecko_user_agent_string_reference#Firefox_OS
    if( findString( strUserAgent, 'Mobile' ) ){
        deviceTypeIsPhone = true;
    } else if( findString( strUserAgent, 'Tablet' ) ){
        deviceTypeIsTablet = true;
    } else if( findString( strUserAgent, 'TV' ) ){
        deviceTypeIsTV = true;
    };
    // isFirefoxOS = window.pkcs11 /* 1.1 */ || window.SpecialPowers /* 1.4, 2.0, 2.1, 2.2 */ || window.home /* 1.4 */ || window.getInterface /* 1.4 */
} else
/*----------------------------------------------------------------------------//
 *  webOS
 */
if( window.palmGetResource ){
    // https://developers.whatismybrowser.com/useragents/explore/operating_system_name/hp-webos/
    platform        = 'webOS';
    platformVersion = getVersionString( strUserAgent, 'webOS/' ) || getVersionString( strUserAgent, 'WEBOS' ) || getVersionString( strUserAgent, 'hpwOS/' );
    brand           = platform;
    brandVersion    = platformVersion;
    engine          = 'WebKit';
    engineVersion   = versionWebKit;
    if( findString( strUserAgent, 'webOS.TV' ) || findString( strUserAgent, '/SmartTV' ) ){
        deviceTypeIsTV = true;
    } else {
        deviceTypeIsPhone = true;
    };
} else
/*----------------------------------------------------------------------------//
 *  Tizen
 */
if( strVersion = getVersionString( strUserAgent, 'Tizen ' ) ){
    platform          = 'Tizen';
    platformVersion   = strVersion;
    brand             = 'Samsung';
    brandVersion      = verSamsung;
    engine            = brand;
    engineVersion     = brandVersion;
    deviceTypeIsPhone = true; // TODO deviceTypeIsTV = true;
} else
/*----------------------------------------------------------------------------//
 *  WindowsPhone
 */
if( strVersion = getVersionString( strUserAgent, 'Windows Phone ' ) || getVersionString( strAppVersion, 'Windows Phone OS ' ) || versionWPWithUC ){
    platform          = 'WindowsPhone';
    platformVersion   = strVersion;
    deviceTypeIsPhone = true;
} else if( isEdgeHTML && strPlatform === 'ARM' ){
    platform          = 'WindowsPhone';
    platformVersion   = 10;
    deviceTypeIsPhone = true;
    isPcMode          = true;
} else if( isTrident && findString( strAppVersion, 'ZuneWP' ) ){ // ZuneWP はデスクトップモードで登場する
    platform          = 'WindowsPhone';
    platformVersion   = versionTrident === 11 ? 8.1 :
                        versionTrident === 10 ? 8   :
                        versionTrident ===  9 ? 7.5 :
                        versionTrident ===  7 ? 7   : '?';
    deviceTypeIsPhone = true;
    isPcMode          = true;
} else
/*----------------------------------------------------------------------------//
 *  Feature Phone
 */
// https://qiita.com/nao_tuboyaki/items/342bffd963f166393045
// ガラケーのフルブラウザ判定
if( findString( strUserAgent, 'FOMA;' ) ){
    platform          = 'FeaturePhone';
    deviceTypeIsPhone = true;
} else if( findString( strUserAgent, 'SoftBank;' ) ){
    platform          = 'FeaturePhone';
    deviceTypeIsPhone = true;
} else
/*----------------------------------------------------------------------------//
 *  Fire OS
 */
if( findString( strUserAgent, 'KFMUWI' ) ){
// https://developer.amazon.com/ja/docs/fire-tablets/ft-device-and-feature-specifications.html
/**
 * (2019, 9th Gen) Fire OS 6.3.0, Android 7.1.25
 * "KFMUWI"   Fire 7  
 */
    platform           = 'FireOS';
    platformVersion    = 6.3;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFKAWI' ) ){
/**
 * (2018, 8th Gen) Fire OS 6.0 => 6.3.0, Android 7.1.25
 * "KFKAWI"   Fire HD 8   
 */
    platform           = 'FireOS';
    platformVersion    = 6;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFSUWI' ) || findString( strUserAgent, 'KFAUWI' ) || findString( strUserAgent, 'KFDOWI' ) ){
/**
 * (2017, 7th Gen) Fire OS 5.3.3 => 5.3.6, Android 5.1.22
 * "KFSUWI"   Fire HD 10
 * "KFAUWI"   Fire 7
 * "KFDOWI"   Fire HD 8
 */  
    platform           = 'FireOS';
    platformVersion    = 5;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFGIWI' ) ){
/**
 * (2016, 6th Gen) Fire OS 5 => 5.3.6, Android 5.1.22
 * "KFGIWI"   Fire HD 8 (2016)
 */
    platform           = 'FireOS';
    platformVersion    = 5;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFARWI' ) || findString( strUserAgent, 'KFSAWA' ) || findString( strUserAgent, 'KFSAWI' ) ){
/**
 * (4th Gen) Fire OS 5, Android 5.1  , API level 22 (system update, available 2015)
 *           Fire OS 4, Android 4.4.2, API level 19
 * "KFARWI"   Fire HD 6
 * "KFSAWA"   Fire HDX 8.9 (WAN)
 * "KFSAWI"   Fire HDX 8.9 (Wi-Fi)
 */
    platform           = 'FireOS';
    platformVersion    = 5 <= parseFloat( versionAndroid ) ? 5 : 4;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFSOWI' ) || findString( strUserAgent, 'KFTHWA' ) || findString( strUserAgent, 'KFTHWI' ) || findString( strUserAgent, 'KFAPWA' ) || findString( strUserAgent, 'KFAPWI' ) ){
// https://dennou-note.blogspot.com/2014/02/kindle.html
/**
 * （第三世代）Fire OS 3.0。Android4.2.2（JellyBean / API level17）
 * "KFSOWI"   Kindle Fire HD
 * "KFTHWA"   Kindle Fire HDX (wan)
 * "KFTHWI"   Kindle Fire HDX (wi-fi)
 * "KFAPWA"   Kindle Fire HDX 8.9 (wan)
 * "KFAPWI"   Kindle Fire HDX 8.9 (wifi)
 */
    platform           = 'FireOS';
    platformVersion    = 3;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'KFOT' ) || findString( strUserAgent, 'KFTT' ) || findString( strUserAgent, 'KFJWA' ) || findString( strUserAgent, 'KFJWI' ) ){ 
/**
 * （第二世代）Android4.0.3（ Ice Cream Sandwich / API level15)
 * "KFOT"     Kindle Fire
 * "KFTT"     Kindle Fire HD
 * "KFJWA"    Kindle Fire HD8.9 (wan)
 * "KFJWI"    Kindle Fire HD8.9 (wi-fi)
 */
    platform           = 'FireOS';
    platformVersion    = 2;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else if( findString( strUserAgent, 'Kindle Fire' ) ){
// （第一世代）Android 2.3.3（Gingerbread / API level10）
// "kindle Fire"   Kindle Fire
    platform           = 'FireOS';
    platformVersion    = 1;
    deviceTypeIsTablet = true;
    isAndroidBased     = true;
} else
/*----------------------------------------------------------------------------//
 *  Kindle paperwhite
 */
if( strVersion = getVersionString( strUserAgent, 'Kindle/' ) ){
// Mozilla/5.0 (X11; U; Linux armv7l like Android; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/533.2+ Kindle/3.0+
    platform                = 'Kindle';
    platformVersion         = strVersion;
    engine                  = 'AOSP';
    engineVersion           = 2.2;    
    brand                   = engine;
    brandVersion            = engineVersion;
    deviceTypeIsEBookReader = true;
} else
/*----------------------------------------------------------------------------//
 *  FireOS
 */
// https://developer.amazon.com/ja/docs/fire-tv/user-agent-strings.html
if( findString( strUserAgent, 'AmazonWebAppPlatform' ) || findString( strUserAgent, '; AFT' ) ){
    platform        = 'FireOS';
    platformVersion = versionAndroid;
    deviceTypeIsTV  = true;
    isAndroidBased  = true; // Chrome 等のインストールが可能
} else
/*----------------------------------------------------------------------------//
 *  MeeGo
 */
if( findString( strUserAgent, 'MeeGo' ) ){
    platform = 'MeeGo';
} else
/*----------------------------------------------------------------------------//
 *  Maemo
 */
// https://developer.mozilla.org/ja/docs/Web/HTTP/Gecko_user_agent_string_reference
// Mozilla/5.0 (Maemo; Linux armv7l; rv:10.0) Gecko/20100101 Firefox/10.0 Fennec/10.0
if( findString( strUserAgent, 'Maemo' ) ){
    platform = 'Maemo';
} else
/*----------------------------------------------------------------------------//
 *  WindowsMobile
 */
if( fromString( strUserAgent, 'Windows Mobile;' ) || versionIris ){
    platform        = 'WindowsMobile';
    deviceTypeIsPDA = true;
} else
/*----------------------------------------------------------------------------//
 *  WinCE
 */
if( strPlatform === 'WinCE' ){
    platform        = strPlatform;
    deviceTypeIsPDA = true;
} else
/*----------------------------------------------------------------------------//
 *  Win16 Win32 Win64
 */
if( strPlatform === 'Win16' || strPlatform === 'Win32' || strPlatform === 'Win64' ){
    platform        = strPlatform;
    platformVersion = getVersionString( strUserAgent, 'Windows NT ' ) || getVersionString( strUserAgent, 'Windows ' );
    deviceTypeIsPC  = true;
} else
/*----------------------------------------------------------------------------//
 *  Mac
 */
if( fromString( strPlatform, 'Mac' ) ){
    platform        = strPlatform === 'MacPowerPC' ? 'MacPPC' : strPlatform;
    if( strVersion = getVersionString( strUserAgent.split( '_' ).join( '.' ), 'Mac OS X ' ) ){
        platformVersion = strVersion;
    };
    deviceTypeIsPC  = true;
    isMac           = true;
} else
/*----------------------------------------------------------------------------//
 *  BlackBerry
 */
if( findString( strUserAgent, 'BlackBerry' ) || findString( strUserAgent, 'BB10' ) ){
    platform          = 'BlackBerry';
    platformVersion   = verVersion;
    deviceTypeIsPhone = true;
} else
/*----------------------------------------------------------------------------//
 *  SunOS
 */
if( findString( strUserAgent, 'SunOS' ) || findString( strUserAgent, 'Sun Solaris' ) ){
    platform       = 'SunOS';
    deviceTypeIsPC = true;
} else
/*----------------------------------------------------------------------------//
 *  BSD
 */
if( findString( strUserAgent, 'FreeBSD' ) ){
    platform = 'FreeBSD';
} else if( findString( strUserAgent, 'OpenBSD' ) ){
    platform = 'OpenBSD';
} else if( findString( strUserAgent, 'NetBSD' ) ){
    platform = 'NetBSD';
} else 
/*----------------------------------------------------------------------------//
 *  Android Fennec
 */
if( isAndroid && isGecko ){
    // PCモードの Android Firefox では platform に Android 0.0.0 が存在
    // Fennec41- 用
    // https://developer.mozilla.org/ja/docs/Gecko_user_agent_string_reference
    // バージョン 41 以降の Android 版 Firefox では platform トークンに Android バージョンが含まれます。
    // 相互運用性向上のため、Android 4 以前のバージョンでブラウザが動作している場合は 4.4 と出力します。
    // Android バージョン 4 以降では実際のバージョン番号が出力されます。
    // なお、Gecko エンジンはすべての Android バージョンに対して同じ機能を提供しています。    
    if( findString( strUserAgent, 'Android 4.4;' ) ){
        v = { min : 2.3 };
    } else if( 4 <= parseFloat( versionAndroid ) ){
        v = versionAndroid;
    } else {
        v = { min : 2.2 };
    };

    platform        = 'Android';
    platformVersion = v;
    isAndroid       = true;
    if( maybePCMode ) isPcMode = true;
} else
/*----------------------------------------------------------------------------//
 *  Android Presto
 */
if( isAndroid && isPresto ){
    if( versionAndroid ){
        v = versionAndroid;
    } else {
        v = { min : 1.6 };
        isPcMode = true;
    };
    platform        = 'Android';
    platformVersion = v;
    isAndroid       = true;
    if( findString( strUserAgent, 'Tablet' ) ){
        deviceTypeIsTablet = true;
    } else {
        deviceTypeIsPhone  = true;
    };
} else
/*----------------------------------------------------------------------------//
 *  Android
 */
if( versionAndroid ){
    platform        = 'Android';
    platformVersion = versionAndroid;
    isAndroid       = true;
} else
/*----------------------------------------------------------------------------//
 *  Android PC_MODE
 */
if( maybeLinux && maybePCMode ){
    // https://ja.wikipedia.org/wiki/WebKit
    // http://www.au.kddi.com/developer/android/kishu/ua/
    // webkit version to Android version...
    surelyPcMode = true;
    // AOSP の判定は Version/ の有無. 但し「デスクトップ版で見る」場合、Version/ が居なくなる...
    // PC版で見る、にチェックが付いている場合、ユーザーエージェント文字列にも platform にも Android の文字列が存在しない(標準ブラウザ&Chrome)
    // Audio でタッチが必要か？の判定にとても困る...
    // ua には Linux x86_64 になっている strPlatform と矛盾する. ATOM CPU の場合は？    
    if( ( hasChromeObject && !maybeAOSP ) || hasOPRObject || versionOPR ){
        v = { min : 4 };
    } else {
        // https://developer.chrome.com/multidevice/webview/overview
        //   The WebView shipped with Android 4.4 (KitKat) is based on the same code as Chrome for Android version 30.
        //   This WebView does not have full feature parity with Chrome for Android and is given the version number 30.0.0.0.
        //   The updated WebView shipped with Android 4.4.3 has the version number 33.0.0.0.
        //   A developer preview WebView is shipping with the Android L Developer Preview. The developer preview version number is 36.0.0.0.
        // https://caniuse.com/#compare=chrome+30,chrome+31,chrome+32,chrome+33,chrome+34,chrome+35,chrome+36,chrome+37,android+4.4.3-4.4.4
        //   chrome30 と Android4.4.3 で未実装で Chrome36 で追加された "CSS touch-action property" を Android5+ の判定に使用。
        // https://qiita.com/DriftwoodJP/items/1916d5519857295622b2
        //   Android OS 5.0（Lollipop）から、Chromium WebView が OS から切り離され、Google Play から 「AndroidシステムのWebView」として更新できるようになった。
        //   この結果、端末ベンダー提供のパッチ適用に影響されずに更新されることになったが、この「ブラウザ」と Chrome for Android とは別物であることには注意が必要である。 
        v = versionAndroid =
            html.style.touchAction !== undefined ? { min : 5 } : 
            docRegElm ? 4.4 :
            // ＾______Chromium_____
            Int8Array ? (
                !navigator.connection ? 4.4 : // AOSP
                ( !window.searchBoxJavaBridge_ && !hasChromeObject ) ? 4.2 : /* 4.1- には searchBoxJavaBridge_ と chrome が存在 */
                Number.isNaN ? 4.1 : 4 ) :
            534 <= versionWebKit ? 3 :
            533 <= versionWebKit ? ( AudioElement ? 2.3 : 2.2 ) :
            530 <= versionWebKit ? 2.0 : 1.5;
    
        if( maybeSamsung ){
            engine        = 'Samsung';
            engineVersion = maybeSamsung;
        };
    };
    platform        = 'Android';
    platformVersion = v;
    isAndroid       = true;
} else
/*----------------------------------------------------------------------------//
 *  Android 5 ChromeWebView PC_MODE
 */
if( maybeChromeWebView ){
    platform        = 'Android';
    platformVersion = { min : 5 };
    isAndroid       = true;
    surelyPcMode    = true;
} else
/*----------------------------------------------------------------------------//
 *  Linux
 */
if( maybeLinux ){
    if( findString(  strUserAgent, 'Ubuntu' ) ){
        platform = 'Ubuntu';
    } else if( strVersion = getVersionString( strUserAgent, 'Mint/' ) ){
        platform        = 'Mint';
        platformVersion = strVersion;
    } else if( strVersion = getVersionString( strUserAgent, 'Fedora/' ) ){
        platform        = 'Fedora';
        platformVersion = strVersion;
    } else if( findString( strUserAgent, 'Gentoo' ) ){
        platform = 'Gentoo';
    } else {
        platform = 'Linux';
    };
};if( !engine ){
    isAndroidBased = isAndroidBased || isAndroid;
/*----------------------------------------------------------------------------//
 *  Presto
 */
    if( isPresto ){
        engine        = isAndroidBased || deviceTypeIsPDA || deviceTypeIsPhone || deviceTypeIsTablet ? 'PrestoMobile' : 'Presto';
        engineVersion = versionPresto;
    } else
/*----------------------------------------------------------------------------//
 *  Trident or Tasman
 */
    if( isTrident ){
        if( v = getNumber( strAppVersion, 'Trident/' ) + 4 ){
            if( v !== versionTrident ){
                brand        = 'IEHost';
                brandVersion = v;
            };
        };

        // https://stackoverflow.com/questions/8751479/detect-metro-ui-version-of-ie
        if( 10 <= versionTrident && 6.2 <= platformVersion && platformVersion < 7 ){ // WinNT6.2 = Win8, WinNT6.3 = Win8.1
            if( screenY === 0 && ( innerHeight + 1 ) !== outerHeight ){
                brand        = 'ModernIE';
                brandVersion = versionTrident;
            };
        };

        if( deviceTypeIsPDA || deviceTypeIsPhone || deviceTypeIsTablet || deviceTypeIsMediaPlayer ){ // TODO device:MS Zune
            engine = 'TridentMobile';
        } else if( isMac && 5 <= versionTrident ){
            engine       = 'Tasman';
            brand        = 'MacIE';
            brandVersion = versionTrident;
        } else {
            engine = 'Trident';
            if( isMac ){
                brand        = 'MacIE';
                brandVersion = versionTrident;
            };
        };
        engineVersion = versionTrident; 
    } else
/*----------------------------------------------------------------------------//
 *  EdgeHTML
 */
    if( isEdgeHTML ){
        engine        = 'EdgeHTML'; // TODO EdgeHTMLMobile
        engineVersion = versionEdge;
    } else
/*----------------------------------------------------------------------------//
 *  Goannna
 */
    if( versionGoanna ){
        engine        = 'Goanna';
        engineVersion = versionGoanna;
    } else
/*----------------------------------------------------------------------------//
 *  Gecko
 */
    if( isGecko ){
        engine        = isAndroidBased ? 'Fennec' : 'Gecko';
        engineVersion = versionGecko;
    } else
/*----------------------------------------------------------------------------//
 *  Samsung Browser
 */
    if( verSamsung ){
        engine        = 'Samsung';
        engineVersion = verSamsung;
        // TODO if( surelyPcMode ) isPcMode = true;
    } else
/*----------------------------------------------------------------------------//
 *  NetFront
 */
    if( strVersion = getVersionString( strUserAgent, 'NetFront/' ) ){
        engine        = 'NetFront';
        engineVersion = strVersion;
    } else
/*----------------------------------------------------------------------------//
 *  iCab
 */
    if( strVersion = getVersionString( strUserAgent, 'iCab' ) ){
        engine        = 'iCab';
        engineVersion = strVersion;
    } else
/*----------------------------------------------------------------------------//
 *  Opera Mini
 */
    if( strVersion = max( getVersionString( strUserAgent, 'Opera Mini/' ), getVersionString( strUserAgent, 'Opera Mobi/' ) ) || ( hasOperaMiniObject && verVersion ) ){
        engine        = 'OperaMini'; 
        engineVersion = strVersion;
        if( !platform ){
            if( findString( strUserAgent, 'iPhone' ) ){
                device = 'iPhone';
            } else if( findString( strUserAgent, 'iPad' ) ){
                device = 'iPad';
            } else if( findString( strUserAgent, 'iPod' ) ){
                device = 'iPod';
            };
            if( device ) platform = 'iOS';
        };
    } else
/*----------------------------------------------------------------------------//
 *  UC Browser Speed Mode
 */
    if( isUCWEB ){
        engine        = 'UCWEB';
        engineVersion = versionUCWEB;
    } else
/*----------------------------------------------------------------------------//
 *  KHTML
 */
    if( versionKHTML ){
        engine        = 'KHTML';
        engineVersion = appVersion;
    } else
/*----------------------------------------------------------------------------//
 *  AOSP
 */
// Android3.x-4.1 のAOSPで window.chrome がいるので AOSP の判定を Blink より先に
    if( isAndroid && maybeAOSP ){
        engine           = 'AOSP';
        engineVersion    = versionAndroid;
        isAndroidBrowser = true;
        if( surelyPcMode ) isPcMode = true;
    } else
/*----------------------------------------------------------------------------//
 *  Chromium or ChromiumMobile
 */
    if( hasChromeObject || hasOPRObject || versionOPR ){
        engine        = isAndroidBased ? 'ChromiumMobile' : 'Chromium';
        engineVersion = versionChrome;
        if( surelyPcMode ) isPcMode = true;
    } else
/*----------------------------------------------------------------------------//
 *  ChromeWebView
 */
// http://uupaa.hatenablog.com/entry/2014/04/15/163346
// Chrome WebView は Android 4.4 の時点では WebGL や WebAudio など一部の機能が利用できません(can i use)。
// また UserAgent が書き換え可能なため、旧来のAOSPブラウザの UserAgent を偽装した形で配布されているケースがあります。
// http://caniuse.com/#compare=chrome+40,android+4.2-4.3,android+4.4,android+4.4.3-4.4.4,and_chr+45
    if( isAndroid && docRegElm ){
        // Android 標準ブラウザ Chrome WebView ブラウザ
        engine           = 'ChromeWebView';
        engineVersion    = parseFloat( versionAndroid ) < 5 ? versionAndroid : versionChrome; // Android 4.4.4- では Android の Version を。5.0+ では Chrome のバージョンを使用。
        // TODO PCモードでは Chrome/11 とあり得ない値が入っている
        isAndroidBrowser = true;
        if( !( window.requestFileSystem || window.webkitRequestFileSystem ) ){
            isAndroidChromeWebView = true;
        };
        if( surelyPcMode ) isPcMode = true;
    } else
/*----------------------------------------------------------------------------//
 *  AOSP PC_Mode
 */
    if( isAndroid && ( verVersion || surelyPcMode ) ){
        engine           = 'AOSP';
        engineVersion    = versionAndroid;
        isAndroidBrowser = true;
        if( surelyPcMode ) isPcMode = true;
    } else
/*----------------------------------------------------------------------------//
 *  Chromium or ChromiumMobile (window.chrome 無)
 */
    if( versionChrome ){
        engine        = isAndroidBased ? 'ChromiumMobile' : 'Chromium';
        engineVersion = versionChrome;
    } else
/*----------------------------------------------------------------------------//
 *  WebKit
 */
    if( versionWebKit ){
        engine        = 'WebKit'
        engineVersion = versionWebKit;
    };
};if( !brand ){
// https://qiita.com/Ungaahhhh/items/980316d11c55acecbfa5
// Edge のユーザーエージェントがいろいろとひどい
    if( strVersion =
        ( isEdgeHTML && getVersionString( strUserAgent, 'Edge/'   ) ) || // Win Edge
        getVersionString( strUserAgent, 'EdgA/'   ) || // Android
        getVersionString( strUserAgent, 'EdgiOS/' ) || // iOS
        getVersionString( strUserAgent, 'Edg/'    )    // Chromium based Microsoft Edge(MSEdge)
    ){
        brand        = 'Edge';
        brandVersion = strVersion;
    } else if( strVersion = getVersionString( strAppVersion, 'Coast/' ) ){
        brand        = 'Coast';
        brandVersion = strVersion;
    } else 
// https://himenaotaro.hatenablog.com/entry/20151011/1444564265
// YJApp-IOS ユーザエージェント(User Agent)
    if( strVersion = getVersionString( strUserAgent.toLowerCase(), 'ybrowser/' ) ){
        brand        = 'Yahoo';
        brandVersion = strVersion;
    } else
    if( !isUCWEB && ( strVersion = getVersionString( strUserAgent, 'UCBrowser/' ) ) ){
        brand        = 'UC';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'SilK/' ) ){
        brand        = 'Silk';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Vivaldi/' ) ){
        brand        = 'Vivaldi';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'QQBrowser/' ) ){
        brand        = 'QQ';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'YaBrowser/' ) ){
        brand        = 'Yandex';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'coc_coc_browser/' ) ){
        brand        = 'coccoc';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Camino/' ) ){
        brand        = 'Camino';
        brandVersion = strVersion;
    } else
    if( findString( strUserAgent, 'SE 2.X MetaSr 1.0' ) ){
        brand = 'Sogou';
    } else
// https://developer.mozilla.org/ja/docs/Web/HTTP/Gecko_user_agent_string_reference
// バージョン 6 より前では、 Focus for Android は Android WebView によって実現されていたため、以下の UA 文字列形式を使用していました。
// Mozilla/5.0 (Linux; <Android Version> <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Version/4.0 Focus/<focusversion> Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>

    if( strVersion =
        getVersionString( strUserAgent, 'Focus/' ) ||
        // https://apps.apple.com/jp/app/firefox-focus-e3-83-97-e3-83-a9-e3-82-a4-e3-83-90-e3/id1055677337
        // iOS 12.2, Focus 8.1.2, (iOS 11.0以降)
        // https://en.wikipedia.org/wiki/Firefox_for_iOS#cite_note-10
        // Focus : FxiOS が 8.x にも拘わらず、iOS のバージョンが 11 以上、を使って判定
        // Firefox : FxiOS が 9.x 移行が、iSO 11+ 対応を持って判定
        ( parseFloat( versionFxiOS ) < 9 && is_iOSWebView && 11 <= parseFloat( platformVersion ) && versionFxiOS )
    ){
        brand        = 'Focus';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Klar/' ) ){
        brand        = 'Klar';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'AOLBUILD/' ) || getVersionString( strUserAgent, 'AOL/' ) || getVersionString( strUserAgent, 'AOL ' ) ){
        brand        = 'AOL';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'IceDragon/' ) ){
        brand        = 'IceDragon';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Iceweasel/' ) ){
        brand        = 'Iceweasel';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'TenFourFox/' ) ){
        brand        = 'ITenFourFox';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Waterfox/' ) ){
        brand        = 'Waterfox';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'GNUzilla/' ) ){
        brand        = 'GNUzilla';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'SeaMonkey/' ) ){
        brand        = 'SeaMonkey';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'PaleMoon/' ) ){
        brand        = 'PaleMoon';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Basilisk/' ) ){
        brand        = 'Basilisk';
        brandVersion = strVersion;
    } else
    if( ( strVersion = getVersionString( strUserAgent, 'Maxthon/' ) ||
                       getVersionString( strUserAgent, 'Maxthon ' ) ||
                       getVersionString( strUserAgent, 'MXiOS/' )
        ) || findString( strUserAgent, 'Maxthon' ) ){
        brand        = 'Maxthon';
        brandVersion = strVersion || 1;
    } else
    if( findString( strUserAgent, 'Avant Browser;' ) ){
        brand = 'Avant';
    } else
    if( strVersion = getVersionString( strUserAgent, 'Lunascape/' ) ){
        brand        = 'Lunascape';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Konqueror/' ) ){
        brand        = 'Konqueror';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Midori/' ) ){
        brand        = 'Midori';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'OmniWeb/' ) ){
        brand        = 'OmniWeb';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Roccat/' ) ){
        brand        = 'Roccat';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Epiphany/' ) ){
        brand        = 'Epiphany';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'WebPositive/' ) ){
        brand        = 'WebPositive';
        brandVersion = strVersion;
    } else
    if( ( strVersion = getVersionString( strUserAgent, 'Iron/' ) ) || findString( strUserAgent, ' Iron ' ) ){
        brand        = 'Iron';
        brandVersion = strVersion || ( hasChromeObject && versionChrome );
    } else
    if( strVersion = getVersionString( strUserAgent, 'Comodo Dragon/' ) ){
        brand        = 'ComodoDragon';
        brandVersion = strVersion;
    } else
    if( ( strVersion = getVersionString( strUserAgent, 'Brave/' ) ) || findString( strUserAgent, ' Brave ' ) ){
        brand        = 'Brave';
        brandVersion = strVersion || ( hasChromeObject && versionChrome );
    } else
    if( strVersion = getVersionString( strUserAgent, 'Rockmelt/' ) ){
        brand        = 'Rockmelt';
        brandVersion = strVersion;
    } else
    if( ( strVersion = getVersionString( strUserAgent, 'Sleipnir/' ) ) || window.FNRBrowser ){
        brand        = 'Sleipnir';
        if( strVersion ){
            brandVersion = strVersion;
        };
    } else
    if( strVersion = getVersionString( strUserAgent, 'Puffin/' ) ){
        brand        = 'Puffin';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Dooble/' ) ){
        brand        = 'Dooble';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Flock/' ) ){
        brand        = 'Flock';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Galeon/' ) ){
        brand        = 'Galeon';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Falkon/' ) ){
        brand        = 'Falkon';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'Iceape/' ) ){
        brand        = 'Iceape';
        brandVersion = strVersion;
    } else
    if( strVersion = getVersionString( strUserAgent, 'K-Meleon/' ) ){
        brand        = 'KMeleon';
        brandVersion = strVersion;
    } else
// Netscape Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:0.9.4.1) Gecko/20020508 Netscape6/6.2.3
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.2) Gecko/20040804 Netscape/7.2 (ax)
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.7.5) Gecko/20070321 Netscape/8.1.3
// Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6
    if( strVersion =
        getVersionString( strUserAgent, 'Netscape6/' ) || // NN6
        getVersionString( strUserAgent, 'Netscape/'  ) || // NN7-8
        getVersionString( strUserAgent, 'Navigator/' )    // NN9
    ){
        brand        = 'NN';
        brandVersion = strVersion;
    } else if( versionIris ){
        // http://archive.is/0trve
        // Mozilla/5.0 (Windows NT; U; en) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Iris/1.1.7 Safari/525.20
        brand        = 'Iris';
        brandVersion = strVersion;
    } else if( strVersion = getVersionString( strAppVersion, 'Line/' ) ){
        brand        = 'LINE';
        brandVersion = strVersion;
    } else if( strVersion = getVersionString( strUserAgent, 'QtWebEngine/' ) ){
        brand         = 'QtWebEngine';
        brandVersion  = strVersion;
    } else if( strVersion = getVersionString( strUserAgent, 'QtWebKit/' ) ){
        brand         = 'QtWebKit';
        brandVersion  = strVersion;
    } else if(
        versionFxiOS ||
        ( isGecko && ( getVersionString( strUserAgent, 'Firefox/' ) || getVersionString( strAppVersion, 'rv:' ) ) )
    ){
        brand        = 'Firefox';
        brandVersion = strVersion;
    } else if( strVersion = versionPresto || versionOPR || getVersionString( strUserAgent, 'Opera/' ) ){
        brand        = 'Opera';
        brandVersion = strVersion;
    } else if( isTrident ){
        brand        = 'IE';
        brandVersion = engineVersion;
    } else if( strVersion =
        getVersionString( strUserAgent, 'CriOS/' ) ||
        ( hasChromeObject || ( maybeChromeWebView && isAndroidBrowser ) ) && versionChrome ){
        brand        = 'Chrome';
        brandVersion = strVersion;
    } else if( isAndroidBrowser && !isAndroidChromeWebView ){
        brand        = engine;
        brandVersion = engineVersion;
    } else if( is_iOSWebView || isAndroidChromeWebView ){
        brand = 'unknown';
    } else if( findString( strUserAgent, 'Safari' ) || verVersion ){
        brand        = 'Safari';
        brandVersion = verVersion || (
                        versionWebKit <   73    ? 0.8 :
                        versionWebKit <   85    ? 0.9 :
                        versionWebKit <  100    ? 1 :
                        versionWebKit <  125    ? 1.1 :
                        versionWebKit <  312    ? 1.2 :
                        versionWebKit <  412    ? 1.3 :
                        versionWebKit <= 419.3  ? 2 :
                        versionWebKit <= 525.13 ? 3 :
                        versionWebKit <= 525.25 ? 3.1 : 3.2 );
    };
};
function toVersionString( v ){
    if( v === v + '' ){
        return v;
    };
    if( v === v - 0 ){
        return '' + v;
    };
    return v.min && v.max ?
              v.min + '~' + v.max :
           v.min ?
            v.min + '~' :
            '~' + v.max;
};

function toValue( v ){
    if( v === v + '' ){
        return parseFloat( v );
    };
    return v;
};

if( platform ){
    ua.PLATFORM = platform;
    if( platformVersion ){
        ua.PLATFORM_VERSION = toVersionString( platformVersion );
        ua[ platform ] = toValue( platformVersion );
    } else {
        ua[ platform ] = true;
    };
};

if( engine ){
    ua.ENGINE = engine;
    if( engineVersion ){
        // 数値はそのまま。文字列は数値化して。
        // 生のバージョン文字列も ua.ENGINE_VERSION に記録
        ua.ENGINE_VERSION = toVersionString( engineVersion );
        ua[ engine ] = toValue( engineVersion );
    } else {
        ua[ engine ] = true;
    };

    // brand が無い場合は、engine をコピー。
    if( !brand ){
        brand        = engine;
        brandVersion = engineVersion;
    };
};

if( brand ){
    ua.BRAND = brand;
    if( brandVersion ){
        ua.BRAND_VERSION = toVersionString( brandVersion );
        ua[ brand ] = toValue( brandVersion );
    } else {
        ua[ brand ] = true;
    };
};

if( device ){
    ua.DEVICE = device;
    if( deviceVersion ){
        ua.DEVICE_VERSION = toVersionString( deviceVersion );
        ua[ device ] = toValue( deviceVersion );
    } else {
        ua[ device ] = true;
    };
};

if( isPcMode ) ua.PC_MODE = true;
})();

var X_UA_DOM   = {},
	X_UA_EVENT = {},
	X_UA_HID   = {};

/*
 * http://d.hatena.ne.jp/t-uchima/20051003/p1
 * MacIEにはattachEventが一応あるけどwindow.attachEventとdocument.attachEventしかなく他の要素にはattachEventはない。
 */
if( ( X_UA.Trident || X_UA.TridentMobile ) < 5 ){ // ie4 & iemobi4 & macie4.x
	X_UA_DOM.IE4   = true;
	X_UA_EVENT.IE4 = true;
} else
if( X_UA.MacIE ){
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

    // ActiveX filter とゴッチャになっているので、修正する。
    // TODO X_UA_maybeCanUseActiveXFilter = X_UA.Trident
    X_UA_ActiveX = !!window[ 'ActiveXObject' ],
	
	X_elmBody;

if( navigator.msPointerEnabled || navigator.pointerEnabled ) X_UA_HID.POINTER = true;
if( !X_UA_HID.POINTER && window.ontouchstart !== undefined ) X_UA_HID.TOUCH   = true;