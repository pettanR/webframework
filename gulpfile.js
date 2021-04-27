const gulp            = require('gulp');
const closureCompiler = require('google-closure-compiler').gulp();

const name = 'wdebframework';

/* -------------------------------------------------------
 *  gulp js
 */
const globalVariables = 'document,navigator,location,screen,Object,Function,Array,String,Math,setTimeout,clearTimeout,parseFloat,parseInt',
      externs         = [
        './closureCompiler/externs.webDocBase.js',
        './closureCompiler/externs.pettanR.js',
        './node_modules/google-closure-compiler/contrib/externs/svg.js'
      ],
      tempDir         = require('os').tmpdir() + '/' + name;

var jsName, isDevelop = false;

gulp.task('compiler',
    function(){
        return closureCompiler(
                {
                    js                : [
                        'js/01_core/00_builtin.js',
                        'js/01_core/01_X.js',
                        'js/01_core/02_XUA.js',
                        'js/01_core/03_XScript.js',
                        'js/01_core/04_XType.js',
                        'js/01_core/05_XObject.js',
                        'js/01_core/06_XArray.js',
                        'js/01_core/07_XString.js',
                        'js/01_core/08_XNumber.js',
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
                        'js/02_dom/21_XElementPool.js',
                        'js/02_dom/22_XTreeBuilder.js',
                        'js/02_dom/30_XTextRange.js',

                        'js/03_plugin/00_XPlugin.js',
                        'js/03_plugin/01_XFlash.js',

                        'js/05_util/00_XUtil.js',
                        'js/05_util/01_XNinjaIframe.js',
                        'js/05_util/02_XJSON.js',
                        'js/05_util/03_XUtilImage.js',
                        'js/05_util/04_XXML.js',
                        'js/05_util/06_XWindow.js',

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
                        'js/07_audio/05_XWMPAudio.js',
                        'js/07_audio/10_XAudioSprite.js',
    
                        'js/11_hid/01_KB.js',

                        'js/onReachEndOfScript.js',
                        'js/export.js'
                    ],
                    define            : [
                        'X_IS_DEV=' + isDevelop,
                        'X_DEFINE_BUILD_TIMESTAMP=' + (Date.now())
                    ],
                    externs           : externs,
                    //compilation_level : 'ADVANCED',
                    //compilation_level : 'WHITESPACE_ONLY',
                    //formatting        : 'PRETTY_PRINT',
                    warning_level     : 'VERBOSE',
                    language_in       : 'ECMASCRIPT3',
                    language_out      : 'ECMASCRIPT3',
                    output_wrapper    : '(function(window,' + globalVariables + ',undefined){"use strict";\n%output%\n})(this,' + globalVariables + ')',
                    js_output_file    : jsName
                }
            )
            .src()
            .pipe(gulp.dest( tempDir ));
    }
);

gulp.task('debug', gulp.series(
    function( cb ){
        isDevelop = true;
        jsName    = 'debug.js'
        cb();
    },
    'compiler',
    function(){
        return gulp.src( tempDir + '/' + jsName ).pipe( gulp.dest( 'docs' ) );
    }
));
