
var ExecuteAtEnd_CALLBACKS = [];

function ExecuteAtEnd_add( func ){
    ExecuteAtEnd_CALLBACKS[ ExecuteAtEnd_CALLBACKS.length ] = func;
};

function ExecuteAtEnd_onEnd(){
    var i = -1, func;
    
    if( !ExecuteAtEnd_CALLBACKS.length ) return;
    
    while( func = ExecuteAtEnd_CALLBACKS[ ++i ] ){
        func();
    };
    ExecuteAtEnd_CALLBACKS.length = 0;
};
