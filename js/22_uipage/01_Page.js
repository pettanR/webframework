var XUI_PAGES = {},
    XUI_Page_prev = [],
    XUI_Page_current,
    XUI_Page_new,
    XUI_Page_isBack,
    XUI_Page_direction;

X.UI.Page = X_EventDispatcher[ 'inherits' ](
    'Page',
    X_Class.NONE,
    {
        'Constructor' : function( title, uid ){
            var args = X_Array_copy( arguments );
            
            if( !XUI_PAGES[ uid ] ){
                args.splice( 0, 2 );
                XUI_PAGES[ uid ] = {
                    page    : this,
                    title   : title,
                    uid     : uid,
                    uinodes : args
                };
            };
        },

        'show' : function( direction ){
            var size;
            
            if( XUI_Page_current !== this ){
                XUI_Page_new       = this;
                XUI_Page_direction = direction;
                
                if( XUI_Page_current ){
                    if( XUI_Page_current[ 'dispatch' ]( XUI_Event.PAGE_HIDE_BEFORE ) & X_CALLBACK_PREVENT_DEFAULT ){
                        return false;
                    };
                    XUI_Page_current[ 'dispatch' ]( XUI_Event.PAGE_HIDE );
                    
                    console.log( 'スライドアウト開始' );
                    
                    // slideOut
                    XUI_rootData.xnode
                        [ 'animate' ]( {
                            'from'     : { x : 0 },
                            'to'       : { x : X[ 'ViewPort' ][ 'getSize' ]()[ 0 ] * -.05 * direction, opacity : 0 },
                            'duration' : 333,
                            'easing'   : 'circular',
                            'lazyRelease' : 0 })
                        [ 'listenOnce' ]( X_EVENT_ANIME_END, XUI_Page_onSlideOut );
                } else {
                    XUI_Page_onSlideOut();
                };
            };
        }
    }
);

X.UI.Page[ 'move' ] = XUI_Page_move;
X.UI.Page[ 'back' ] = XUI_Page_back;

function XUI_Page_move( uid ){
    for( var k in XUI_PAGES ){
        if( XUI_PAGES[ k ].uid === uid ){
            return XUI_PAGES[ k ].page[ 'show' ]( 1 );
        };
    };
};

function XUI_Page_back(){
    var last = XUI_Page_prev[ XUI_Page_prev.length - 1 ];
    
    for( var k in XUI_PAGES ){
        if( XUI_PAGES[ k ].page === last ){
            XUI_Page_isBack = true;
            XUI_Page_prev.pop();
            return XUI_PAGES[ k ].page[ 'show' ]( -1 );
        };
    };
};

function XUI_Page_onSlideOut(){
    var k, uinodes;
    
    if( XUI_Page_current ){
        XUI_rootData.removeAt( 0, 9999 );
        if( !XUI_Page_isBack ){
            XUI_Page_prev.push( XUI_Page_current );
        };
    };
    
    XUI_Page_isBack  = false;
    XUI_Page_current = XUI_Page_new;
        
    for( k in XUI_PAGES ){
        if( XUI_PAGES[ k ].page === XUI_Page_new ){
            uinodes = XUI_PAGES[ k ].uinodes;
        };
    };



    if( !XUI_rootData ){
        X.UI.Root.apply( 1, uinodes ).attr( { opacity : 0 } );
    } else {
        XUI_rootData.User.add.apply( XUI_rootData.User, uinodes );
    };

    XUI_rootData[ 'listenOnce' ]( XUI_Event.LAYOUT_COMPLETE, XUI_Page_startSlideIn );
    //if( XUI_rootData.phase < 4 ){

    //} else {
    //    XUI_Page_startSlideIn();
    //};
    console.log( 'スライドアウト完了' );
};

function XUI_Page_startSlideIn(){
    console.log( 'スライドイン開始' );
    XUI_rootData.xnode[ 'animate' ]( {
                            'from'     : { x : X[ 'ViewPort' ][ 'getSize' ]()[ 0 ] * .05 * XUI_Page_direction, opacity : 0 },
                            'to'       : { x : 0, opacity : 1 },
                            'duration' : 333,
                            'easing'   : 'circular',
                            'lazyRelease' : 0 });
};
