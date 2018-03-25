'use strict';
RangeFromIndex = function( xnode, isTextField, from, to ){
    var range;

    if( !isTextField && X_TextRange_w3cRange ){
        range = document.createRange();
    } else if( X_TextRange_ieRange ){
        range = X_elmBody.createTextRange();
    };

    return ({
        _xnode       : xnode,
        _isTextField : isTextField,
        _result      : { range : range, from : 0, to : 0 },

        'getOffset'  : X_TextRange_getOffset,
        // ieSelection の場合だけ TextField のrectが取れる
        'getRect'    : !isTextField || X_TextRange_ieRange ? X_TextRange_getRect : null,
        'move'       : X_TextRange_move,
        'text'       : isTextField ? X_TextRange_text : null,
        'select'     : X_TextRange_select
    })[ 'move' ]( from, to );
};
