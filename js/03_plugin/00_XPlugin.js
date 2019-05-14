
/*
 * Flash Player 10 バージョン判別チェックリスト
 * http://www.adobe.com/jp/devnet/flashplayer/articles/ver_check_flp10.html
 * 
 * IE7でswfobjectが動作しない件
 * https://web.archive.org/web/20130317163030/http://mtl.recruit.co.jp/blog/2008/02/ie7swfobject.html
 * 
 * flash player 10, ie6+, ff2+, safari3, opera9.5
 * flash player 11, ie7+, ff4(?), safari5, opera11
 * flash player 12, ie8+, ff17, opera11
 * 
 * http://helpx.adobe.com/jp/flash-player/kb/228683.html
 * flash player  9, Mac 10.1-10.3, 98, ME
 * flash player 10.1, Mac 10.4
 * flash player 10.3, Mac 10.5
 * flash player 11.1, Win2k, Android 2.x-4.x
 */
var X_Plugin_FLASH_VERSION =
        !X_UA[ 'IE' ] || !X_UA[ 'ActiveX' ] ? parseFloat( X_Object_find( navigator, 'plugins>Shockwave Flash>version' ) || 0 ) :
        !( X_UA[ 'IE' ] < 5.5 ) & X_UA[ 'ActiveX' ] ? (function(){
                var obj = X_Script_createActiveXObjectSafty( 'ShockwaveFlash.ShockwaveFlash' );
                
                return parseFloat( obj && obj[ 'GetVariable' ]( '$version' ).split( 'WIN ' )[ 1 ] ) || 0;
            })() :
            0,

    X_Plugin_SILVER_LIGHT_VERSION =    
        !X_UA[ 'IE' ] || !X_UA[ 'ActiveX' ] ? parseFloat( X_Object_find( navigator, 'plugins>Silverlight Plug-In>version' ) || 0 ) :
        X_UA[ 'ActiveX' ] && 6 <= X_UA[ 'IE' ] ? (function(){
                var obj = X_Script_createActiveXObjectSafty( 'AgControl.AgControl' ),
                    i = obj ? 5 : 0;

                for( ; i; --i ){
                    if( obj[ 'IsVersionSupported' ]( i + '.0' ) ) return i;
                };
                return 0;
            })() :
            0,

//http://docs.unity3d.ru/Manual/Detecting%20the%20Unity%20Web%20Player%20using%20browser%20scripting.html
    X_Plugin_UNITY_VERSION =    
        !X_UA[ 'IE' ] || !X_UA[ 'ActiveX' ] ?
            parseFloat( X_Object_find( navigator, 'plugins>Unity Player>version' ) || 0 ) :
        !( X_UA[ 'IE' ] < 5.5 ) && X_UA[ 'ActiveX' ] ? (function(){
                var obj = X_Script_createActiveXObjectSafty( 'UnityWebPlayer.UnityWebPlayer.1' );

                return obj ? parseFloat( obj[ 'GetPluginVersion' ]() ) : 0;
            })() :
            0,

    X_Plugin_GEARS_ENABLED =
        window.GearsFactory ||
        ( X_UA[ 'ActiveX' ] && 6 <= X_UA[ 'IE' ] ?
            (function(){
                return X_Script_createActiveXObjectSafty( 'Gears.Factory' );
            })() :
            X_Object_find( navigator, 'mimeTypes>application/x-googlegears>enabledPlugin' )
        ),

// https://support.microsoft.com/ja-jp/kb/279022
// Windows Media Player 7 がクライアントにインストールされている場合に、自動的に Web ページに埋め込む方法
// TODO GeckoActiveXObject
    X_Plugin_WMP_VERSION =    
        !X_UA[ 'IE' ] || !X_UA[ 'ActiveX' ] ? 0 :
        (function(){
                var obj = X_Script_createActiveXObjectSafty( 'WMPlayer.OCX.7' );

                return obj ? parseFloat( obj[ 'versionInfo' ] ) :
                    X_Script_createActiveXObjectSafty( '{22D6F312-B0F6-11D0-94AB-0080C74C7E95}' ) ? 6.4 : 0;
            })();

    // QuickTime Plug-in 7.7.6
    /*
    X_Plugin_QUICKTIME_VERSION =
            !X_UA[ 'IE' ] || !X_UA[ 'ActiveX' ] ? (function( plugins, k ){
                for( k in plugins ){
                    if( k.indexOf( 'QuickTime' ) === 0 ) return parseFloat( k.substr( 18 ) ) || 0;
                };
                return 0;
            })( navigator.plugins ) :
            !( X_UA[ 'IE' ] < 5.5 ) && X_UA[ 'ActiveX' ] ? (function(){
                    var obj = QuickTimeCheckObject.QuickTimeCheck.1' ),
                        ver = obj && obj[ 'QuickTimeVersion' ].toString( 16 );

                    return ver ? parseFloat( ver.substr( 0, 3 ) ) / 100 : 0;
                })() :
                0, */

/**
 * @namespace X.Plugin
 */
X[ 'Plugin' ] = {
    
    'Flash'       : X_Plugin_FLASH_VERSION,

    // FlashLite

    'Silverlight' : X_Plugin_SILVER_LIGHT_VERSION,
    
    'Unity'       : X_Plugin_UNITY_VERSION,
    
    //'QuickTime'          : X_Plugin_QUICKTIME_VERSION,
    
    'Gears'       : !!X_Plugin_GEARS_ENABLED,
    
    'WMP'         : X_Plugin_WMP_VERSION
    
};

//if( X_Plugin_GEARS_ENABLED ) alert( 'X_Plugin_GEARS_ENABLED' );

