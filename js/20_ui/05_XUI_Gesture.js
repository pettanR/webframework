var XUI_GestureUtils = {
        /**
         * get the center of all the touches
         * @param   {Array}     touches
         * @returns {Object}    center
         */
        getCenter : function( touches ){
            var i = 0,
                l = touches.length,
                x, y, minX, minY, maxX, maxY;

            switch( l ){
                case 0 :
                    return {};
                case 1 :
                    return {
                        pageX : touches[ 0 ].pageX,
                        pageY : touches[ 0 ].pageY
                    };
                case 2 :
                    return {
                        pageX : ( touches[ 0 ].pageX + touches[ 1 ].pageX ) / 2,
                        pageY : ( touches[ 0 ].pageY + touches[ 1 ].pageY ) / 2
                    };
            };
            minX = minY = 1 / 0;
            maxX = maxY = - 1 / 0;
            for( ; i < l; ++i ){
                x    = touches[ i ].pageX;
                minX = x < minX ? x : minX;
                maxX = maxX < x ? x : maxX;
                y    = touches[ i ].pageY;
                minY = y < minY ? y : minY;
                maxY = maxY < y ? y : maxY;
            };
            return {
                pageX : ( minX + maxX ) / 2 | 0,
                pageY : ( minY + maxY ) / 2 | 0
            };
        },

        /**
         * calculate the velocity between two points
         * @param   {Number}    deltaTime
         * @param   {Number}    deltaX
         * @param   {Number}    deltaY
         * @returns {Object}    velocity
         */
        getVelocity : function( deltaTime, deltaX, deltaY ) {
            return {
                x : Math.abs( deltaX / deltaTime ) || 0,
                y : Math.abs( deltaY / deltaTime ) || 0
            };
        },

        /**
         * calculate the angle between two coordinates
         * @param   {Touch}     touch1
         * @param   {Touch}     touch2
         * @returns {Number}    angle
         */
        getAngle : function( touch1, touch2 ){
            var y = touch2.pageY - touch1.pageY,
                x = touch2.pageX - touch1.pageX;
            return Math.atan2( y, x ) * 180 / Math.PI;
        },

        /**
         * angle to direction define
         * @param   {Touch}     touch1
         * @param   {Touch}     touch2
         * @returns {String}    direction constant, like 'left'
         */
        getDirection : function( touch1, touch2 ){
            var x = touch1.pageX - touch2.pageX,
                y = touch1.pageY - touch2.pageY;
            return Math.abs( y ) <= Math.abs( x ) ?
                ( x > 0 ? 'left' : 'right' ) :
                ( y > 0 ? 'up'   : 'down' );
        },

        /**
         * calculate the distance between two touches
         * @param   {Touch}     touch1
         * @param   {Touch}     touch2
         * @returns {Number}    distance
         */
        getDistance : function( touch1, touch2 ){
            var x = touch2.pageX - touch1.pageX,
                y = touch2.pageY - touch1.pageY;
            return Math.sqrt( ( x * x ) + ( y * y ) );
        },

        /**
         * calculate the scale factor between two touchLists (fingers)
         * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
         * @param   {Array}     start
         * @param   {Array}     end
         * @returns {Number}    scale
         */
        getScale : function( start, end ){
            // need two fingers...
            return ( 2 <= start.length && 2 <= end.length ) ?
                XUI_GestureUtils.getDistance( end[ 0 ], end[ 1 ] ) / XUI_GestureUtils.getDistance( start[ 0 ], start[ 1 ] ) :
                1;
        },

        /**
         * calculate the rotation degrees between two touchLists (fingers)
         * @param   {Array}     start
         * @param   {Array}     end
         * @returns {Number}    rotation
         */
        getRotation : function getRotation( start, end ){
            // need two fingers
            return ( 2 <= start.length && 2 <= end.length ) ?
                XUI_GestureUtils.getAngle( end[ 1 ], end[ 0 ] ) - XUI_GestureUtils.getAngle( start[ 1 ], start[ 0 ] ) :
                0;
        },

        /**
         * boolean if the direction is vertical
         * @param    {String}    direction
         * @returns  {Boolean}   is_vertical
         */
        isVertical : function isVertical( direction ){
            return direction === 'up' || direction === 'down';
        }
    };

var XUI_Gesture_POINTERS = {},
    XUI_Gesture_CAPTURED = {},
    XUI_Gesture_DEFAULTS = {};


function XUI_Gesture_trigger( uinode, type, hammerEvent ){
    if( !uinode.gestureTypes[ type ] ) return X_CALLBACK_NONE;
    hammerEvent = X_Object_copy( hammerEvent );
    hammerEvent.type = type;
    return uinode[ 'dispatch' ]( hammerEvent ) || X_CALLBACK_NONE;
};

function XUI_$UINodeBase_listen( type, arg1, arg2, arg3 ){
    var events, gestures, i, g;
    
    if( XUI_Event._START_POINTER <= type && type <= XUI_Event._END_POINTER ){
        if( this.phase < 3 ){
            if( !( events = this.reserveEvents ) ) this.reserveEvents = events = [];
            events[ events.length ] = [ type, arg1, arg2, arg3 ];
            return this;
        };
        
        if( this[ 'listening' ]( type, arg1, arg2, arg3 ) ){
            return this;
        };
        
        if( XUI_Event._START_XUI_EVENT < type && type < XUI_Event._END_XUI_EVENT ){
            gestures = XUI_Gesture_LIST;
            for( i = gestures.length; i; ){
                g = gestures[ --i ];
                if( g.startID <= type && type <= g.endID ){
                    if( !this.gestureActivated ){
                        this.gestureOptions   = XUI_Gesture_DEFAULTS; //X_Object_override( X_Object_copy( XUI_Gesture_DEFAULTS ), opt_options );
                        this.gestureActivated = {};
                        this.gestureTypes     = {};
                        this.gestureTriggered = {};
                        this.gestureCanceled  = {};
                    };
                    if( X_Object_isEmpty( this.gestureActivated ) ){
                        this[ 'listen' ]( XUI_Event._POINTER_DOWN, this, XUI_Gesture_handleEvent );
                    };
                    this.gestureActivated[ g.name ] = this.gestureTypes[ type ] = true;
                    break;
                };
            };
        } else
            if( XUI_EVENT_COUNTER[ type ] ){
                ++XUI_EVENT_COUNTER[ type ];
            } else {
                XUI_EVENT_COUNTER[ type ] = 1;
                XUI_xnodeIneraction[ 'listen' ]( XUI_Event.IdToName[ type ], X_UI_eventRellay );
            };
    };
    
    return X_EventDispatcher_listen.apply( this, arguments );
};

function XUI_$UINodeBase_unlisten( type, arg1, arg2, arg3 ){
    var events, i, ev, gestures, active, g, f;
    
    if( XUI_Event._START_POINTER <= type && type <= XUI_Event._END_POINTER ){
        if( this.phase < 3 ){
            if( !( events = this.reserveEvents ) ) return this;
            for( i = events.length; i; ){
                ev = events[ --i ];
                if( ev[ 0 ] === type && ev[ 1 ] === arg1 && ev[ 2 ] === arg2 && ev[ 3 ] === arg3 ){
                    events.split( i, 1 );
                    return this;
                };
            };
            return this;
        };

        if( !this[ 'listening' ]( type, arg1, arg2, arg3 ) ){
            return this;
        };

        if( XUI_Event._START_XUI_EVENT < type && type < XUI_Event._END_XUI_EVENT ){
            if( active = this.gestureActivated ){
                gestures = XUI_Gesture_LIST;
                for( i = gestures.length ; i; ){
                    g = gestures[ --i ];
                    if( g.startID <= type && type <= g.endID ){
                        if( active[ g.name ] ){
                            if( this.gestureTypes[ type ] ) delete this.gestureTypes[ type ];
                            for( i = g.startID; i <= g.endID; ++i ){
                                if( this.gestureTypes[ i ] ){
                                    f = true;
                                    break;
                                };
                            };
                            if( !f ){
                                delete active[ g.name ];
                                
                                if( X_Object_isEmpty( active ) ){
                                    this[ 'unlisten' ]( XUI_Event._POINTER_DOWN, this, XUI_Gesture_handleEvent );
                                    //delete this.gestureTriggered;
                                    //delete this.gestureCanceled;
                                    //delete this.gestureTypes;
                                    //delete this.gestureActivated;
                                };
                            };
                        };
                        break;
                    };
                };
            };
        } else {
            if( XUI_EVENT_COUNTER[ type ] === 1 ){
                XUI_xnodeIneraction[ 'unlisten' ]( XUI_Event.IdToName[ type ], X_UI_eventRellay );
                XUI_EVENT_COUNTER[ type ] = 0;
            } else
            if( XUI_EVENT_COUNTER[ type ] ){
                --XUI_EVENT_COUNTER[ type ];
            };
        };
    };

    return X_EventDispatcher_unlisten.apply( this, arguments );
};

function XUI_Gesture_handleEvent( e ){
        var gestures   = XUI_Gesture_LIST,
            type       = e.type,
            uid        = e[ 'pointerId' ],
            isStart    = type === XUI_Event._POINTER_DOWN,
            isEnd      = type === XUI_Event._POINTER_UP || type === XUI_Event._POINTER_CANCEL || type === XUI_Event.POINTER_OUT,
            hammer     = this,
            isMouse    = e.pointerType === 'mouse',
            touches    = [],
            numTouches = 0,// count the total touches on the screen
            i, p, l, j, captured, hammerEvent, ret, activated, gesture, startEv,
            deltaTime, deltaX, deltaY, velocity, center, startCenter;

        if( !isStart && !hammer.gestureStartEvent ) return;

        if( isEnd ){
            if( XUI_Gesture_POINTERS[ uid ] ){
                delete XUI_Gesture_POINTERS[ uid ];
                if( XUI_Gesture_CAPTURED[ uid ] ) delete XUI_Gesture_CAPTURED[ uid ];
            };
        } else {
            XUI_Gesture_POINTERS[ uid ] = e;
        };

        // mousebutton must be down or a touch event
        if( ( isEnd || !isMouse || e.button === 0 ) ){
            numTouches = -1;

            for( i in XUI_Gesture_POINTERS ){
                if( p = XUI_Gesture_POINTERS[ i ] ){
                    // いずれかの hammer によって束縛されている場合、その束縛している hammer なら
                    captured = XUI_Gesture_CAPTURED[ p[ 'pointerId' ] ];
                    if( captured && captured !== hammer ){
                        continue;
                    };
                    touches[ ++numTouches ] = p;
                };
            };
            ++numTouches;

            // if we are in a end event, but when we remove one touch and
            // we still have enough, set eventType to move
            if( !numTouches ){ // no touches, force the end event
                isEnd = true;
            };

            // because touchend has no touches, and we often want to use these in our gestures,
            // we send the last move event as our eventData in touchend
            ( isEnd && hammer.gestureLastMoveEvent ) ? ( e = hammer.gestureLastMoveEvent ) : ( hammer.gestureLastMoveEvent = e ); // store the last move event

            hammerEvent = X_Object_copy( e );
            hammerEvent.touches = touches;

            if( isStart && !hammer.gestureStartEvent ){
                //console.log( '=- add -=' );
                // already busy with a Hammer.gesture detection on an element
                hammer.gestureStartEvent = hammerEvent;
                XUI_rootData[ 'listen' ]( [ XUI_Event._POINTER_MOVE, XUI_Event._POINTER_UP, XUI_Event._POINTER_CANCEL, XUI_Event.POINTER_OUT ], hammer, XUI_Gesture_handleEvent );                
            };

            startEv = hammer.gestureStartEvent;


            // if the touches change, set the new touches over the startEvent touches
            // this because touchevents don't have all the touches on touchstart, or the
            // user must place his fingers at the EXACT same time on the screen, which is not realistic
            // but, sometimes it happens that both fingers are touching at the EXACT same time
            if( startEv && ( numTouches !== startEv.touches.length || touches !== startEv.touches ) ){
                // extend 1 level deep to get the touchlist with the touch objects
                startEv.touches.length = i = 0;
                j = -1;
                for( ; i < numTouches; ++i ){
                    startEv.touches[ ++j ] = touches[ i ];
                };
            };

            deltaTime   = hammerEvent.timestamp  - startEv.timestamp;
            center      = XUI_GestureUtils.getCenter( touches );
            startCenter = startEv.center;
            deltaX      = startCenter ? ( center.pageX - startCenter.pageX ) : 0;
            deltaY      = startCenter ? ( center.pageY - startCenter.pageY ) : 0;
            velocity    = XUI_GestureUtils.getVelocity( deltaTime, deltaX, deltaY );

            X_Object_override( hammerEvent, {
                type       : isEnd ? XUI_Event._POINTER_UP : type,

                deltaTime  : deltaTime,

                deltaX     : deltaX,
                deltaY     : deltaY,

                velocityX  : velocity.x,
                velocityY  : velocity.y,

                center     : center,
                distance   : startCenter ? XUI_GestureUtils.getDistance( startCenter, center ) : 0,
                angle      : startCenter ? XUI_GestureUtils.getAngle( startCenter, center ) : 0,
                direction  : startCenter ? XUI_GestureUtils.getDirection( startCenter, center ) : 0,

                scale      : XUI_GestureUtils.getScale( startEv.touches, touches ),
                rotation   : XUI_GestureUtils.getRotation( startEv.touches, touches ),

                gestureStartEvent : startEv
            });

            // store as previous event event
            hammer.gestureLastEvent = hammerEvent;
            activated = hammer.gestureActivated;
            //console.log( '... ' );
            // call Hammer.gesture handlers
            for( i = 0, l = gestures.length; i < l; ++i ){
                gesture = gestures[ i ];

                if( activated[ gesture.name ] && !hammer.gestureCanceled[ gesture.name ] ){
                    //( console.log( '... ' + i + ' ' + gesture.name ) );
                    // if a handler returns false, we stop with the detection
                    ( ret |= ( gesture.handler( hammerEvent, hammer ) || X_CALLBACK_NONE ) );
                };

                if( ret & X_CALLBACK_CAPTURE_POINTER ){
                    for( i = touches.length; i; ){
                        uid = touches[ --i ][ 'pointerId' ];
                        XUI_Gesture_CAPTURED[ uid ] = hammer;
                        //console.log( 'captured. ' + uid );
                    };
                    break;
                } else
                if( ret & X_CALLBACK_STOP_NOW ){
                    break;
                };
            };
            //console.log( '----' );
        } else {

        };

        if( isEnd || ( ret & X_CALLBACK_RELEASE_POINTER ) ){
            for( i = touches.length; i; ){
                uid = touches[ --i ][ 'pointerId' ];
                if( XUI_Gesture_CAPTURED[ uid ] === hammer ){
                    //console.log( 'released. ' + uid );
                    delete XUI_Gesture_CAPTURED[ uid ];
                };
            };
        };

        if( isEnd ){
            //console.log( '=- clear -=' );
            XUI_rootData[ 'unlisten' ]( [ XUI_Event._POINTER_MOVE, XUI_Event._POINTER_UP, XUI_Event._POINTER_CANCEL, XUI_Event.POINTER_OUT ], hammer, XUI_Gesture_handleEvent );

            hammer.previous = {
                gestureCurrentName   : hammer.gestureCurrentName,
                gestureStartEvent    : hammer.gestureStartEvent,
                gestureLastEvent     : hammer.gestureLastEvent,
                gestureLastMoveEvent : hammer.gestureLastMoveEvent
            };
            
            X_Object_clear( hammer.gestureTriggered );
            X_Object_clear( hammer.gestureCanceled  );

            delete hammer.gestureCurrentName;
            delete hammer.gestureStartEvent;
            delete hammer.gestureLastEvent;
            delete hammer.gestureLastMoveEvent;

            ret |= X_CALLBACK_RELEASE_POINTER;
        };
        
        return ret;
};



var XUI_Gesture_LIST = [
    /*
     * Touch
     * Called as first, tells the user has touched the screen
     * @events  touch
     */
    {
        name     : 'touch',
        index    : -Infinity,
        defaults : {
            // call preventDefault at touchstart, and makes the element blocking by
            // disabling the scrolling of the page, but it improves gestures like
            // transforming and dragging.
            // be careful with using this, it can be very annoying for users to be stuck
            // on the page
            prevent_default : false,

            // disable mouse events, so only touch (or pen!) input triggers events
            prevent_mouseevents : false
        },
        handler : function( e, hammer ){
            if( hammer.gestureOptions.prevent_mouseevents && e[ 'pointerType' ] === 'mouse' ){
                return X_CALLBACK_STOP_NOW;
            };

            //hammer.gestureOptions.prevent_default && e.preventDefault();

            return e.type === XUI_Event._POINTER_DOWN && XUI_Gesture_trigger( hammer, XUI_Event.TOUCH, e );
        }
    },

    /*
     * Transform
     * User want to scale or rotate with 2 fingers
     * @events  transform, transformstart, transformend, pinch, pinchin, pinchout, rotate
     */
    {
        name     : 'transform',
        index    : 45,
        startID  : XUI_Event.TRANSFORM,
        endID    : XUI_Event.ROTATE,
        defaults : {
            // factor, no scale is 1, zoomin is to 0 and zoomout until higher then 1
            transform_min_scale : 0.01,
            // rotation in degrees
            transform_min_rotation : 1,
            // prevent default browser behavior when two touches are on the screen
            // but it makes the element a blocking element
            // when you are using the transform gesture, it is a good practice to set this true
            transform_always_block : false
        },

        handler : function( e, hammer ){
            var transform = this, ret = X_CALLBACK_NONE, scale_threshold, rotation_threshold;
            
            // current gesture isnt drag, but dragged is true
            // this means an other gesture is busy. now call dragend
            if( hammer.gestureCurrentName !== transform.name && hammer.gestureTriggered[ transform.name ] ){
                ret = XUI_Gesture_trigger( hammer, XUI_Event.TRANSFORM_END, e );
                delete hammer.gestureTriggered[ transform.name ];
                return ret;
            };

            // atleast multitouch
            if( e.touches.length < 2 ) return;

            // prevent default when two fingers are on the screen
            //hammer.gestureOptions.transform_always_block && e.preventDefault();

            switch( e.type ){
                case XUI_Event._POINTER_DOWN :
                    //hammer.gestureTriggered[ transform.name ] = false;
                    break;

                case XUI_Event._POINTER_MOVE:
                    scale_threshold    = Math.abs( 1 - e.scale );
                    rotation_threshold = Math.abs( e.rotation );

                    // when the distance we moved is too small we skip this gesture
                    // or we can be already in dragging
                    if( scale_threshold < hammer.gestureOptions.transform_min_scale && rotation_threshold < hammer.gestureOptions.transform_min_rotation ) return;

                    // we are transforming!
                    hammer.gestureCurrentName = transform.name;

                    // first time, trigger dragstart event
                    if( !hammer.gestureTriggered[ transform.name ] ){
                        ret = XUI_Gesture_trigger( hammer, XUI_Event.TRANSFORM_START, e );
                        if( ret & X_CALLBACK_PREVENT_DEFAULT ){
                            hammer.gestureCanceled[ transform.name ] = true;
                            break;
                        };
                        hammer.gestureTriggered[ transform.name ] = true;
                        break;
                    };

                    ret |= XUI_Gesture_trigger( hammer, XUI_Event.TRANSFORM, e );
                    // basic transform event

                    // trigger rotate event
                    if( hammer.gestureOptions.transform_min_rotation < rotation_threshold ){
                        ret |= XUI_Gesture_trigger( hammer, XUI_Event.ROTATE, e );
                    };

                    // trigger pinch event
                    if( scale_threshold > hammer.gestureOptions.transform_min_scale ){
                        ret |= XUI_Gesture_trigger( hammer, XUI_Event.PINCH, e );
                        ret |= XUI_Gesture_trigger( hammer, e.scale < 1 ? XUI_Event.PINCH_IN : XUI_Event.PINCH_OUT, e );
                    };
                    break;

                case XUI_Event.POINTER_OUT :
                case XUI_Event._POINTER_CANCEL :
                case XUI_Event._POINTER_UP :
                    // trigger dragend
                    ret = hammer.gestureTriggered[ transform.name ] && XUI_Gesture_trigger( hammer, XUI_Event.TRANSFORM_END, e );
                    hammer.gestureTriggered[ transform.name ] = false;
                    break;
            };
            return ret;
        }
    },

    /*
     * Drag
     * Move with x fingers (default 1) around on the page. Blocking the scrolling when
     * moving left and right is a good practice. When all the drag events are blocking
     * you disable scrolling on that area.
     * @events  drag, dragstart, dragend, drapleft, dragright, dragup, dragdown
     */
    {
        name     : 'drag',
        index    : 50,
        startID  : XUI_Event.DRAG,
        endID    : XUI_Event.DRAG_DOWN,

        defaults : {
            drag_min_distance : 10,
            // set 0 for unlimited, but this can conflict with transform
            drag_max_touches : 1,
            // prevent default browser behavior when dragging occurs
            // be careful with it, it makes the element a blocking element
            // when you are using the drag gesture, it is a good practice to set this true
            drag_block_horizontal : false,
            drag_block_vertical : false,
            // drag_lock_to_axis keeps the drag gesture on the axis that it started on,
            // It disallows vertical directions if the initial direction was horizontal, and vice versa.
            drag_lock_to_axis : false,
            // drag lock only kicks in when distance > drag_lock_min_distance
            // This way, locking occurs only when the distance has become large enough to reliably determine the direction
            drag_lock_min_distance : 25
        },

        handler : function( e, hammer ){
            var drag = this, last_direction, ret;

            // current gesture isnt drag, but dragged is true
            // this means an other gesture is busy. now call dragend
            if( hammer.gestureCurrentName !== drag.name && hammer.gestureTriggered[ drag.name ] ){
                ret = XUI_Gesture_trigger( hammer, XUI_Event.DRAG_END, e );
                hammer.gestureTriggered[ drag.name ] = false;
                return ret;
            };

            // max touches
            if( 0 < hammer.gestureOptions.drag_max_touches && hammer.gestureOptions.drag_max_touches < e.touches.length ) return;

            switch( e.type ){
                case XUI_Event._POINTER_DOWN :
                    hammer.gestureTriggered[ drag.name ] = false;
                    break;

                case XUI_Event._POINTER_MOVE :
                    // when the distance we moved is too small we skip this gesture
                    // or we can be already in dragging
                    if( e.distance < hammer.gestureOptions.drag_min_distance && hammer.gestureCurrentName !== drag.name ) return;

                    // we are dragging!
                    hammer.gestureCurrentName = drag.name;

                    // lock drag to axis?
                    if( hammer.gestureLastEvent.drag_locked_to_axis || ( hammer.gestureOptions.drag_lock_to_axis && hammer.gestureOptions.drag_lock_min_distance <= e.distance ) ){
                        e.drag_locked_to_axis = true;
                    };
                    last_direction = hammer.gestureLastEvent.direction;
                    if( e.drag_locked_to_axis && last_direction !== e.direction ){
                        // keep direction on the axis that the drag gesture started on
                        e.direction = XUI_GestureUtils.isVertical( last_direction ) ?
                            ( e.deltaY < 0 ? 'up'   : 'down' ) :
                            ( e.deltaX < 0 ? 'left' : 'right' );
                    };

                    ret = X_CALLBACK_NONE;

                    // first time, trigger dragstart event
                    if( !hammer.gestureTriggered[ drag.name ] ){
                        ret = XUI_Gesture_trigger( hammer, XUI_Event.DRAG_START, e );
                        //if( ret & X_CALLBACK_PREVENT_DEFAULT ){
                        //    hammer.gestureCanceled[ drag.name ] = true;
                        //    break;
                        //};
                        ret |= X_CALLBACK_CAPTURE_POINTER;
                        //console.log( '----- drag start ....' + e.type );
                        hammer.gestureTriggered[ drag.name ] = true;
                        break;
                    };

                    //console.log( '----- drag ....' + e.type );
                    // trigger normal event
                    ret = XUI_Gesture_trigger( hammer, XUI_Event.DRAG, e ) | X_CALLBACK_CAPTURE_POINTER;

                    // direction event, like dragdown
                    ret |= XUI_Gesture_trigger( hammer,
                        e.direction === 'up' ?
                            XUI_Event.DRAG_UP :
                        e.direction === 'down' ?
                            XUI_Event.DRAG_DOWN :
                        e.direction === 'left' ?
                            XUI_Event.DRAG_LEFT :
                            XUI_Event.DRAG_RIGHT,
                        e
                    );

                    // block the browser events
                    /* (
                        ( hammer.gestureOptions.drag_block_vertical   &&  XUI_GestureUtils.isVertical( e.direction ) ) ||
                        ( hammer.gestureOptions.drag_block_horizontal && !XUI_GestureUtils.isVertical( e.direction ) )
                    ) && e.preventDefault(); */
                    break;

                case XUI_Event.POINTER_OUT :
                    //console.log( 'cancel!!' );
                case XUI_Event._POINTER_CANCEL :
                case XUI_Event._POINTER_UP:
                    // trigger dragend
                    if( hammer.gestureTriggered[ drag.name ] ){
                        ret = XUI_Gesture_trigger( hammer, XUI_Event.DRAG_END, e ) | X_CALLBACK_CAPTURE_POINTER;
                        //console.log( '----- drag end ....' + e.type );
                        hammer.gestureTriggered[ drag.name ] = false;
                    };
                    break;
            };
            return ret;
        }
    },

    /*
     * Tap/DoubleTap
     * Quick touch at a place or double at the same place
     * @events  tap, doubletap
     */
    {
        name     : 'tap',
        index    : 100,
        startID  : XUI_Event.TAP,
        endID    : XUI_Event.DOUBLE_TAP,
        defaults : {
            tap_max_touchtime  : 250,
            tap_max_distance   : 3,
            tap_always         : true,
            doubletap_distance : 20,
            doubletap_interval : 300
        },
        handler : function( e, hammer ){
            // previous gesture, for the double tap since these are two different gesture detections
            var prev = hammer.previous;

            if( e.type === XUI_Event._POINTER_MOVE && hammer.gestureOptions.tap_max_distance < e.distance ){
                hammer.gestureCanceled[ 'tap' ] = true;
            };
            if( e.type === XUI_Event._POINTER_UP ){
                // when the touchtime is higher then the max touch time
                // or when the moving distance is too much
                if( hammer.gestureOptions.tap_max_touchtime < e.deltaTime || hammer.gestureOptions.tap_max_distance < e.distance ) return;

                // check if double tap
                if( prev && prev.gestureCurrentName === 'tap' && ( e.timestamp - prev.gestureLastEvent.timestamp ) < hammer.gestureOptions.doubletap_interval && e.distance < hammer.gestureOptions.doubletap_distance ){
                    return XUI_Gesture_trigger( hammer, XUI_Event.DOUBLE_TAP, e );
                } else
                // do a single tap
                if( hammer.gestureOptions.tap_always ){
                    hammer.gestureCurrentName = 'tap';
                    //console.log( 'tap! ' + e.deltaTime + 'ms ' + e.type );
                    return XUI_Gesture_trigger( hammer, XUI_Event.TAP, e );
                };
            };
        }
    }

];

(function( i, g ){
    for( ; i; ){
        g = XUI_Gesture_LIST[ --i ];
        X_Object_override( XUI_Gesture_DEFAULTS, g.defaults );
        delete g.defaults;
    };
})( XUI_Gesture_LIST.length );

