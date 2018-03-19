var basePath = '';
(function(){
    var src = document.scripts[ document.scripts.length - 1 ].src;
    basePath = src.split( 'js/' )[ 0 ];
})();

document.write( [
    '<script src="' + basePath +
        'js/01_core/00_builtin.js',
        'js/01_core/01_X.js',
        'js/01_core/02_XUA.js',

        'js/01_core/03_XScript.js',
        'js/01_core/04_XType.js',
        'js/01_core/05_XObject.js',
        'js/01_core/06_XArray.js',
        'js/01_core/07_XString.js',
        'js/01_core/09_XURL.js',
        
        'js/01_core/10_XPair.js',
        'js/01_core/11_XCallback.js',
        'js/01_core/12_XClosure.js',
        'js/01_core/13_XClass.js',
        'js/01_core/14_XEvent.js',
        'js/01_core/15_XEventDispatcher.js',
        'js/01_core/16_XTimer.js',
        'js/01_core/17_ExecuteAtEnd.js',
        'js/01_core/18_FocusUtility.js',

        'js/01_core/20_XSystem.js',
        'js/01_core/21_XViewPort.js',    
        'js/01_core/22_XLogger.js',

        
        'js/02_dom/00_XDoc.js',
        'js/02_dom/01_XDTD.js',
        'js/02_dom/02_XNodeFlags.js',
        'js/02_dom/03_XDomEvent.js',
        'js/02_dom/04_XBoxModel.js',
        'js/02_dom/05_XNodeAttr.js',
        'js/02_dom/06_XNodeCSS.js',
        'js/02_dom/07_XNodeList.js',
        'js/02_dom/08_XNodeSelector.js',
        'js/02_dom/09_XHTMLParser.js',
        'js/02_dom/10_XNodeAnime.js',
        'js/02_dom/20_XNode.js',
        'js/02_dom/22_XTreeBuilder.js',
        'js/02_dom/30_XTextRange.js',

        'js/03_plugin/00_XPlugin.js',

        //'js/04_backend/00_XBackend.js',

        'js/05_util/00_XUtil.js',
        'js/05_util/01_XNinjaIframe.js',
        'js/05_util/02_XJSON.js',
        'js/05_util/03_XUtilImage.js',
        
        'js/06_net/00_XNet.js',
        'js/06_net/01_XNetXHR.js',
        'js/06_net/02_XNetJSONP.js',
        'js/06_net/03_XNetForm.js',
        'js/06_net/04_XNetImage.js',
        'js/06_net/05_XXHRGadget.js',
        'js/06_net/10_XOAuth2.js',
        
        'js/07_audio/00_XAudio.js',
        'js/07_audio/01_XWebAudio.js',
        'js/07_audio/02_XHTMLAudio.js',
        'js/07_audio/03_XSilverlightAudio.js',
        'js/07_audio/10_XAudioSprite.js',

        'js/11_hid/01_KB.js'

    + '"></script>'
].join( '"></script><script src="' + basePath ));



