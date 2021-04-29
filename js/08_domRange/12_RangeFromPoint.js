'use strict';
RangeFromPoint = function( xnode, isTextField, x, y ){
    var result = RangeFromPoint_getRawRange( xnode, isTextField, x, y );

    return result && {
        _xnode       : xnode,
        _isTextField : isTextField,
        _result      : result,

        'getOffset'  : X_TextRange_getOffset,
        // ieSelection の場合だけ TextField のrectが取れる
        'getRect'    : !isTextField || X_TextRange_ieRange ? X_TextRange_getRect : null,
        'move'       : X_TextRange_move,
        'text'       : isTextField ? X_TextRange_text : null,
        'select'     : X_TextRange_select
    };
};

function RangeFromPoint_getRawRange( xnode, isTextField, x, y ){
    var range = null,
        texts, range, i, offset, l, text, j, m,
        elm, parent, rect;
        
    if( !isTextField && X_TextRange_w3cRange ){
        X_TextRange_collectTextNodes( xnode[ '_rawObject' ], texts = [] );
        range = document.createRange();
        
        for( i = offset = 0, l = texts.length; text = texts[ i ]; ++i ){
            range.selectNodeContents( text );
            rect = X_TextRange_getCorrectRect( false, range, xnode );
            m    = text.data.length;
            if( X_TextRange_hitRect( rect, x, y ) ){
                for( j = 0; j < m; ++j ){
                    range.setEnd( text, j + 1 );
                    range.setStart( text, j );
                    rect = X_TextRange_getCorrectRect( false, range, xnode );
                    //console.log( text.data.charAt( j ), ' x:', x, ' y:', y, ' top:', rect.top | 0, ' left:', rect.left | 0, ' bottom:', rect.bottom | 0, ' right:', rect.right | 0 );
                    if( X_TextRange_hitRect( rect, x, y ) ){
                        return {
                            range : range,
                            rect  : rect,
                            from  : offset + j,
                            to    : offset + j + 1
                        };
                    };
                };
            };
            offset += m;
        };
    } else {
        elm   = xnode[ '_rawObject' ];
        range = X_elmBody.createTextRange();
        range.moveToPoint( x, y );
        parent = range.parentElement();
        if( parent === elm || elm.contains( parent ) ){
            if( range.expand( 'character' ) ){
                rect = X_TextRange_getCorrectRect( isTextField, range, xnode );
                if( rect !== range ){
                    if( !X_TextRange_hitRect( rect, x, y ) ){
                        range = null;
                    };
                };
            } else {
                range = null;
            };
            if( range ){
                // 何文字目
                return {
                    range : range,
                    rect  : rect
                };
            };
        };
    };
};