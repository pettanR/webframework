/**
 * http://www5b.biglobe.ne.jp/~clap/3ds/tips/button_comment.html
 * http://www5b.biglobe.ne.jp/~clap/3ds/tips/button_ab.html
 */
var centerRadioButton,
    pressedButtons      = {};
    pressButtonBCounter = 0,
    timerID;

if( X_UA.New3DS ){
    X_HID_GamepadImplementation = {
        _init : function(){
            /**
             * 隠しラジオボタンを 上下左右中央に作る
             */
        },

        startCapture : function(){
            if( X_HID_GamepadImplementation._init ){

            } else {

            };
            // フォーカス初期化
            X_EventDispatcher_ignoreActualEvent = true; // ignoreAllEvent focus, blur
            centerRadioButton[ '_rawObject' ].focus();
            X_EventDispatcher_ignoreActualEvent = false;
            document.addEventListener( 'keydown', onKeydown );
            document.addEventListener( 'keyup'  , onKeyup   );
            document.addEventListener( 'click'  , onClick   );
            centerRadioButton[ '_rawObject' ].addEventListener( 'blur', onBlur );
        },
        stopCapture : function(){
            document.removeEventListener( 'keydown', onKeydown );
            document.removeEventListener( 'keyup'  , onKeyup   );
            document.removeEventListener( 'click'  , onClick   );
            centerRadioButton[ '_rawObject' ].removeEventListener( 'blur', onBlur );
        },

        isConnected : function(){
            return true;
        },
        getTotalButtons : function(){
            return 6;
        },
        getButtonAt : function( index ){
            return pressedButtons[ 37, 38, 39, 40, 13, 66 ][ index ];
        },
        getTotalAxis : function(){
            return 0;
        },
        getAxisAt : function( index ){
            return 0;
        }
    };
};

    // キーダウン処理
    function onKeydown( e ){
        pressedButtons[ e.keyCode ] = true;
        e.preventDefault();
        e.stopPropagation();
    };

    // キーアップ処理
    function onKeyup( e ){
        pressedButtons[ e.keyCode ] = false;
        e.preventDefault();
        e.stopPropagation();
    };

    // click
    function onClick( e ){
        if( timerID && e.srcElement !== centerRadioButton[ '_rawObject' ] ){ /* !pressedButtons[13] */
            pressedButtons[ 66 ] = false;
            pressButtonBCounter  = timerID = X_Timer_remove( timerID );
        };
        e.preventDefault();
        e.stopPropagation();
    };

    // B
    function onBlur( e ){
        //X_EventDispatcher_ignoreActualEvent = true; // ignoreAllEvent focus, blur
        //centerRadioButton[ '_rawObject' ].focus();
        //X_EventDispatcher_ignoreActualEvent = false;
        pressButtonBCounter = 6;
        timerID = X_Timer_add( 31, 0, keyupButtonBTimer );
        e.preventDefault();
        e.stopPropagation();
    };

    function keyupButtonBTimer(){
        if( --pressButtonBCounter ){
            pressedButtons[ 66 ] = true;
        } else {
            pressedButtons[ 66 ] = false;
            pressButtonBCounter = timerID = X_Timer_remove( timerID );
        };
    };