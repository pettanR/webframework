
var 
    X_System_postMessageAccessKey = window.postMessage ? Math.random() * 10000 | 0 : 0,
    
    X_System_MESSAGE_RECIVERS = X_System_postMessageAccessKey && {},

    X_System = X_Class_override(
        X_EventDispatcher(),
        {
            monitor : function(){
                
            },
            
            gc : function(){
                
            },
            
            message : function( name, callback ){
                var key = Math.random() * 10000 | 0;
                if( !X_System_postMessageAccessKey ) return;
                // name にスペースは含まない
                X_System_MESSAGE_RECIVERS[ name + key ] = callback;
                X_ViewPort[ 'listen' ]( 'message', X_System );
                
                return X_System_postMessageAccessKey + '-' + name + key;
            },
            
            handleEvent : function( e ){
                var i, _i, name;
                switch( e ){
                    case 'message' :
                        if( e.origin === X.URL.BASE_URL ){
                            i = e.data.indexOf( '-' );
                            console.log( 'msg ||| ' + e.data.substr( 0, i ) );
                            if( e.data.substr( 0, i ) == X_System_postMessageAccessKey ){
                                name = e.data.substr( i, _i = e.data.indexOf( ' ' ) );
                                if( X_System_MESSAGE_RECIVERS[ name ] ){
                                    X_System_MESSAGE_RECIVERS[ name ]( e.data.substr( _i + name.length ) );
                                };
                            };
                        };
                        console.log( e.origin + ' ' + X.URL.BASE_URL );
                        
                        return X_CALLBACK_PREVENT_DEFAULT | X_CALLBACK_STOP_PROPAGATION;
                };
            }
        }
),

X_System_javascriptScore;

// beforeunload
// unload

X_TEMP.onRearchEndOfScript = function(){
    var callbacks = X_TEMP.onSystemReady,
        i     = callbacks.length,
        now   = X_Timer_now(),
        speed = now - X[ 'bootTime' ];
    
    X[ 'bootSpeed' ] = X_System_javascriptScore = speed;
    console.log( 'js score ' + speed );
    
    delete X_TEMP.onRearchEndOfScript;
    delete X_TEMP.onSystemReady;
    
    for( ; i; ){
        callbacks[ --i ]( X_System );
    };
};