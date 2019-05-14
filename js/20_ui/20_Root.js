var XUI_rootData         = null,
    XUI_xnodeIneraction  = null,
    XUI_mousemoveFix     = X_UA[ 'WinPhone' ] === 7.5,
    XUI_mousemoveFixOn   = 0,
    XUI_mousemoveFixX    = 0,
    XUI_mousemoveFixY    = 0,
    XUI_mousemoveFixLast = null,
    XUI_UINODES_HOVER    = [],
    XUI_EVENT_COUNTER    = {},
    XUI_uinodeTarget     = null,
    XUI_xnodeInteractionOverlay,
    XUI_interactionBusy  = false;

function XUI_mousemoveFixResetScroll(){
    var raw = XUI_xnodeInteractionOverlay[ '_rawObject' ];

    if( XUI_mousemoveFix ){
        XUI_mousemoveFixX = raw.scrollLeft = raw.offsetWidth;
        XUI_mousemoveFixY = raw.scrollTop  = raw.offsetHeight;        
    };
};

function XUI_mousemoveFixScrollEnd(){
    var raw  = XUI_xnodeInteractionOverlay[ '_rawObject' ];

    XUI_mousemoveFixOn = 0;
    XUI_mousemoveFixLast.type = 'pointerup';
    X_UI_eventRellay( XUI_mousemoveFixLast );
    
    raw.scrollLeft = XUI_mousemoveFixX;
    raw.scrollTop  = XUI_mousemoveFixY;
};

function X_UI_eventRellay( e ){
    var font    = X_ViewPort_baseFontSize,
        x       = e.pageX, // clientX は iOS4- で通らない？
        y       = e.pageY,
        type    = XUI_Event.NameToID[ e.type ],
        i       = 0,
        data    = XUI_rootData,
        sysOnly = false,
        ret     = X_CALLBACK_NONE,
        list    = XUI_UINODES_HOVER,
        raw, parent, _ret, eventIn, eventOut;

    // mouseup で alert を出すと mouseleave が発生、ということでイベント中のイベント発火を禁止
    if( XUI_interactionBusy ) return ret;
    
    XUI_interactionBusy = true;

    //X_UA[ 'iOS' ] < 5 && console.log( e.type + ':[' + x + ',' + y + ']' );

    if( XUI_mousemoveFix ){
        if( e.type === 'scroll' ){
            raw  = XUI_xnodeInteractionOverlay[ '_rawObject' ];
            type = XUI_mousemoveFixOn ? XUI_Event._POINTER_MOVE : XUI_Event._POINTER_DOWN;
            x    = XUI_mousemoveFixX - raw.scrollLeft;
            y    = XUI_mousemoveFixY - raw.scrollTop;
            e.pageX = x;
            e.pageY = y;
            e[ 'button' ]      = 0;
            e[ 'timestamp' ]   = e[ 'timeStamp' ];
            e[ 'pointerId' ]   = 1;
            e[ 'pointerType' ] = 'mouse';

            XUI_mousemoveFixOn && X_Timer_remove( XUI_mousemoveFixOn );
            XUI_mousemoveFixOn   = X_Timer_once( 250, XUI_mousemoveFixScrollEnd );
            XUI_mousemoveFixLast = X_Object_copy( e );
        };
    };

    e = X_Object_copy( e );
    e.type = type;

    // capture は pointer 毎に!
    data.capcher( x / font, y / font );
    data = XUI_uinodeTarget || data;

    while( data ){
        _ret = data[ 'dispatch' ]( e, sysOnly ) || X_CALLBACK_NONE;
        ret |= _ret;
        if( type < XUI_Event._START_BUBLEUP || ret & X_CALLBACK_STOP_PROPAGATION ){
            break;
        };
        data = data.parentData;
    };

    for( i = list.length; i; ){
        parent = data = list[ --i ];
        while( parent.parentData && parent === parent.parentData.hitChildData ){
            parent = parent.parentData;
        };
        if( parent !== XUI_rootData ){
            if( data[ '_listeners' ] && data[ '_listeners' ][ XUI_Event.POINTER_OUT ] ){
                if( !eventOut ){
                    eventOut = X_Object_copy( e );
                    eventOut.type = XUI_Event.POINTER_OUT;                    
                };
                data[ 'dispatch' ]( eventOut, false );
            };
            delete data.hovering;
            list.splice( i, 1 );
        } else
        if( !data.hovering ){
            if( data[ '_listeners' ] && data[ '_listeners' ][ XUI_Event.POINTER_IN ] ){
                if( !eventIn ){
                    eventIn = X_Object_copy( e );
                    eventIn.type = XUI_Event.POINTER_IN;                
                };
                data[ 'dispatch' ]( eventIn, true );
            };
            data.hovering = true;
        };
    };
    XUI_interactionBusy = false;
    return ret | X_CALLBACK_PREVENT_DEFAULT;
};

function X_UI_onMouseOut( e ){
    var list = XUI_UINODES_HOVER,
        i = list.length, data;
    console.log( 'pointer out!!' + e.type + i + ' ' + e.pointerType );

    e = X_Object_copy( e );
    e.type = XUI_Event.POINTER_OUT;
    
    for( ; i; ){
        data = list[ --i ];
        data[ '_listeners' ] && data[ '_listeners' ][ XUI_Event.POINTER_OUT ] && data[ 'dispatch' ]( e, false ); // new Event
        delete data.hovering;
    };
    list.length = 0;
};

/*
 * body が存在したら要素を作成、css も指定
 * 背景画像を読み終える onload で活動開始
 */

var XUI_Root = XUI_Box.inherits(
    '_Root',
    X_Class.FINAL,
    {
        layout                : XUI_Layout_Canvas,
        
        calcReserved          : false,
        
        cursorStyle           : null,
        
        Constructor : function( user, layout, args ){
            this[ 'Super' ]( user, layout, args );
            
            if( X_ViewPort_readyState === X_EVENT_XDOM_READY ){
                X_Timer_once( 0, this, this.start );
            } else {
                X_ViewPort[ 'listenOnce' ]( X_EVENT_XDOM_READY, this, this.start );
            };
            
            XUI_rootData = this;
        },
        
        start : function(){
            this.initialize( this.User, this, null, null );
            X_Timer_once( 0, this, this.addToView );
        },
        addToView : function(){
            // XUI_xnodeInteractionOverlay の前に追加する！
            this.addToParent( X_Node_body );

            XUI_xnodeInteractionOverlay = X_Node_body.create( 'div', {
                'class'      : XUI_mousemoveFix ? 'mouse-operation-catcher-scrollFix' : 'mouse-operation-catcher',
                unselectable : 'on'
            } );
            
            X_Node_body[ 'listen' ]( 'pointerleave', this, X_UI_onMouseOut );
            
            // hover や rollover rollout のための move イベントの追加
            // TODO この切り替えを ViewPort へ
            XUI_xnodeIneraction = ( X_UA[ 'IE' ] < 9 ? X_ViewPort_document : X_UA[ 'Opera' ] < 8 ? X_Node_body : X_UA[ 'iOS' ] < 5 ? XUI_xnodeInteractionOverlay : X_ViewPort );
            
            if( XUI_mousemoveFix ){
                XUI_xnodeInteractionOverlay[ 'listen' ]( [ 'scroll', 'mouseup' ], X_UI_eventRellay )[ 'create' ]( 'div' );
            } else {
                XUI_xnodeIneraction[ 'listen' ]( 'pointermove', X_UI_eventRellay );
            };
            
            if( XUI_EVENT_COUNTER[ XUI_Event._POINTER_MOVE ] ){
                ++XUI_EVENT_COUNTER[ XUI_Event._POINTER_MOVE ];
            } else {
                XUI_EVENT_COUNTER[ XUI_Event._POINTER_MOVE ] = 1;
            };

            X_Timer_once( 0, this, this.afterAddToView );
        },
        afterAddToView : function(){
            this.xnode[ 'className' ]( 'Root' );
            
            this.creationComplete();
            X_Timer_once( 0, this, XUI_Root_do1stCalculate );
        },
        
        reserveCalc : function(){
            if( !this.calcReserved ){
                this.calcReserved = true;
                X_Timer_once( 0, this, this.calculate );
            };
        },
        calculate : function( e ){
            var cancelable = !e || ( e.type !== X_EVENT_VIEW_RESIZED && e.type !== X_EVENT_BASE_FONT_RESIZED ),
                size, font, w, h;
            
            if( ( this[ 'dispatch' ]( { type : XUI_Event.LAYOUT_BEFORE, 'cancelable' : cancelable } ) & X_CALLBACK_PREVENT_DEFAULT ) && cancelable ){
                console.log( 'Layout のキャンセル' );
                return X_CALLBACK_NONE;
            };
            
            console.log( 'レイアウト開始' );
            
            XUI_mousemoveFix && XUI_mousemoveFixResetScroll();
            
            size = X[ 'ViewPort' ][ 'getSize' ]();
            font = X[ 'ViewPort' ][ 'getBaseFontSize' ]();
            this.layout.calculate( this, false, 0, 0, size[ 0 ] / font, size[ 1 ] / font );
            this.updateLayout();
            
            this.calcReserved = false;

            // size を測りながらレイアウトする結果、アップデートがない場合がある
            if( X_Node_updateTimerID ){
                X_ViewPort[ 'listenOnce' ]( X_EVENT_AFTER_UPDATE, this, XUI_Root_onViewUpdate );
            } else {
                this[ 'asyncDispatch' ]( XUI_Event.LAYOUT_COMPLETE );
            };

            return X_CALLBACK_NONE;
        },
        
        updateCoursor : function( cursor ){
            
        }
    }
);

function XUI_Root_do1stCalculate(){
    this.calculate();
    this.phase = 4;
    X_ViewPort
        [ 'listen' ]( X_EVENT_VIEW_RESIZED, this, this.calculate )
        [ 'listen' ]( X_EVENT_BASE_FONT_RESIZED, this, this.calculate );
};

function XUI_Root_onViewUpdate( e ){
    console.log( 'レイアウト完了' );
    this[ 'dispatch' ]( XUI_Event.LAYOUT_COMPLETE );
};

//var XUI_Root;
// TODO singleton
X.UI.Root = X.UI.Box.inherits(
    'Root',
    X_Class.NONE,
    {
        Constructor : function(){
            var supports;
            
            //if( !XUI_Root ){
                supports = XUI_Attr_createAttrDef( XUI_Box.prototype.usableAttrs, XUI_Layout_Canvas.overrideAttrsForSelf );
                
                //XUI_Root.prototype.layout       = XUI_Layout_Canvas;
                XUI_Root.prototype.usableAttrs = supports;
                XUI_Root.prototype.attrClass    = XUI_Attr_preset( XUI_Box.prototype.attrClass, supports, {
                                    width  : '100%',
                                    height : '100%'
                                } );
            //};
            X_Pair_create( this, XUI_Root( this, XUI_Layout_Canvas, arguments ) );
        }
    });
/*
X.UI.Root = X.UI.Box.presets(
    'Root',
    XUI_Root,
    {
        width  : '100%',
        height : '100%'
    }
);*/

