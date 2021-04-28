'use strict';
LineRangeFromLast = function( xnode, isTextField, from, to ){
    var result = LineRangeFromLast_getRawRange( null, xnode, isTextField, from, to );

    return result && {
        _xnode       : xnode,
        _isTextField : isTextField,
        _result      : result,
        _getRawRange : LineRangeFromLast_getRawRange,

        'getOffset'  : X_TextRange_getOffset,
        // ieSelection の場合だけ TextField のrectが取れる
        'getRect'    : !isTextField || X_TextRange_ieRange ? X_TextRange_getRect : null,
        'move'       : X_TextRange_move,
        'text'       : isTextField ? X_TextRange_text : null,
        'select'     : X_TextRange_select
    };
};

function LineRangeFromLast_getRawRange( range, xnode, isTextField, from, to ){
    var elm = xnode[ '_rawObject' ],
        texts, i, l, is1stNode, currentNode, j, m, is1st, isLast, rect,
        minY, lines = 0,
        lastTextNode, lastOffset, startLineFrom, endLineTextNode, endLineOffset;

    if( !isTextField && X_TextRange_w3cRange ){
        if( !range ){
            range = document.createRange();
        };
        X_TextRange_collectTextNodes( elm, texts = [] );
        for( i = l = texts.length; currentNode = texts[ --i ]; ){
            is1stNode = i === l - 1;
            // range.selectNodeContents( text ); 不要っぽい
            for( j = m = currentNode.data.length; j; --j ){
                is1st  = is1stNode && j === m;
                isLast = i + j === 1;
                range.setEnd( currentNode, j );
                range.setStart( currentNode, j - 1 );
                rect = X_TextRange_getCorrectRect( false, range, xnode );
                if( sumup(
                    is1st,
                    isLast,
                    j,
                    rect.top | 0,
                    rect.bottom | 0
                ) ){
                    lastOffset = ( isLast ? 0 : lastOffset - 1 );
                    if( l === 1 ){
                        startLineFrom = lastOffset;
                    } else {
                        range.setStart( texts[ 0 ], 0 );
                        range.setEnd( lastTextNode, lastOffset );
                        startLineFrom = ( range + '' ).length;
                    };
                    range.setStart( lastTextNode, lastOffset );
                    range.setEnd( endLineTextNode, endLineOffset );
                    return {
                        range : range,
                        rect  : X_TextRange_getCorrectRect( false, range, xnode ),
                        from  : startLineFrom,
                        to    : startLineFrom + ( range + '' ).length
                    };
                    return range;
                };
                lastTextNode = currentNode;
                lastOffset   = j;
            };
        };
    } else {
        currentNode = true; // dummy
        if( !range ){
            if( elm.isTextEdit ){
                range = elm.createTextRange();
            } else {
                range = X_elmBody.createTextRange();
                range.moveToElementText( elm );
            };
        };
        l = i = range.text.length;
        range.collapse( false );
        range.moveStart( 'character', -1 );
        for( ; i; --i ){
            isLast = i === 1;
            rect = X_TextRange_getCorrectRect( isTextField, range, xnode );
            if( sumup(
                i === l,
                isLast,
                i - 1,
                rect.top,
                rect.bottom
            ) ){
                !isLast && range.moveStart( 'character', 1 );
                range.moveEnd( 'character', endLineOffset - i + 1 );
                if( isLast ) --i;
                return {
                    range : range,
                    rect  : X_TextRange_getCorrectRect( isTextField, range, xnode ),
                    from  : i,
                    to    : i + range.text.length
                };    
            };
            range.moveStart( 'character', -1 );
            range.moveEnd( 'character', -1 );
        };
    };
    
    function sumup( is1st, last, offset, y, b ){
        var cr;

        if( is1st ){
            if( from === 0 ){
                endLineTextNode = currentNode;
                endLineOffset   = offset;
            };
            minY = y;
            return last;
        };

        if( b <= minY ){
            cr   = true;
            minY = y;
        } else {
            minY = y < minY ? y : minY;
        };

        if( cr || last ){
            if( cr ){
                ++lines;
                isLast = false; // 最後の行が一文字のケースで必要な処理

                if( from === lines ){
                    endLineTextNode = currentNode;
                    endLineOffset   = offset;
                };                
            };

            if( to < lines || ( last && endLineTextNode ) ){
                return true;
            };
        };
    };
};