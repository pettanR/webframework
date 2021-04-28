'use strict';
LineRangeFromPoint = function( xnode, isTextField, x, y ){
    var result = LineRangeFromPoint_getRawRange( null, xnode, isTextField, x, y );

    return result && {
        _xnode       : xnode,
        _isTextField : isTextField,
        _result      : result,
        _getRawRange : LineRangeFromPoint_getRawRange,

        'getOffset'  : X_TextRange_getOffset,
        // ieSelection の場合だけ TextField のrectが取れる
        'getRect'    : !isTextField || X_TextRange_ieRange ? X_TextRange_getRect : null,
        'move'       : X_TextRange_move,
        'text'       : isTextField ? X_TextRange_text : null,
        'select'     : X_TextRange_select
    };
};

function LineRangeFromPoint_getRawRange( range, xnode, isTextField, x, y ){
    var elm = xnode[ '_rawObject' ],
        texts, i, l, currentNode, isLastNode, j, m, isLast, rect, hit,
        maxB,
        lastTextNode, lastOffset, totalOffset = 0,
        startLineTextNode, startLineOffset, startLineFrom,
        currentLineStartTextNode, currentLineStartOffset, currentLineStartFrom;

    if( !isTextField && X_TextRange_w3cRange ){
        if( !range ){
            range = document.createRange();
        };
        X_TextRange_collectTextNodes( elm, texts = [] );
        for( i = 0, l = texts.length; currentNode = texts[ i ]; ++i ){
            isLastNode = i === l - 1;
            // if( hit || X_TextRange_hitRect( currentNode.getBoundingClientRect(), x, y ) ){}; // ダメ lineStartTextNodeが取れない
            for( j = 0, m = currentNode.data.length; j < m; ++j ){
                isLast = isLastNode && ( j === m - 1 );
                range.setEnd( currentNode, j + 1 );
                range.setStart( currentNode, j );
                rect = X_TextRange_getCorrectRect( false, range, xnode );
                hit  = hit || X_TextRange_hitRect( rect, x, y );
                if( sumup(
                    i + j === 0, // i === 0 && j === 0
                    isLast,
                    j,
                    rect.top | 0,
                    rect.bottom | 0
                ) ){
                    range.setEnd( isLast ? currentNode : lastTextNode, 1 + ( isLast ? j : lastOffset ) );
                    range.setStart( startLineTextNode, startLineOffset );
                    return {
                        range : range,
                        rect  : X_TextRange_getCorrectRect( false, range, xnode ), // rect補正
                        from  : startLineFrom,
                        to    : startLineFrom + ( range + '' ).length
                    };
                };
                lastTextNode = currentNode;
                lastOffset   = j;
            };
            totalOffset += m;
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
        l = range.text.length;
        range.collapse( true );
        range.moveEnd( 'character', 1 );
        for( i = 0; i < l; ++i ){
            isLast = i + 1 === l;
            rect = X_TextRange_getCorrectRect( isTextField, range, xnode );
            hit = hit || X_TextRange_hitRect( rect, x, y );
            if( sumup(
                i === 0,
                isLast,
                i,
                rect.top,
                rect.bottom
            ) ){
                range.moveStart( 'character', startLineFrom - i );
                if( !isLast ) range.moveEnd( 'character', -1 );
                return {
                    range : range,
                    rect  : X_TextRange_getCorrectRect( isTextField, range, xnode ),
                    from  : startLineFrom,
                    to    : startLineFrom + range.text.length // 改行が含まれない?
                };
            };
            range.moveEnd( 'character', 1 );
            range.moveStart( 'character', 1 );
        };
    };
    
    function sumup( is1st, last, offset, y, b ){
        var cr;

        if( is1st ){
            if( hit ){
                startLineTextNode = currentNode;
                startLineOffset   = startLineFrom = 0;
            } else {
                currentLineStartTextNode = currentNode;
                currentLineStartOffset   = currentLineStartFrom = 0;
            };
            maxB = b;
            return last;
        };

        if( maxB <= y ){
            cr   = true;
            maxB = b;
        } else {
            maxB = maxB < b ? b : maxB;
        };

        if( cr || last ){
            if( cr && startLineTextNode ) isLast = false; // 最後の行が一文字のケースで必要な処理

            if( startLineTextNode ){
                return true;
            } else if( cr || !currentLineStartTextNode ){
                currentLineStartTextNode = currentNode;
                currentLineStartOffset   = offset;
                currentLineStartFrom     = offset + totalOffset;
            };
        };
        if( !startLineTextNode && hit ){
            startLineTextNode = currentLineStartTextNode;
            startLineOffset   = currentLineStartOffset;
            startLineFrom     = currentLineStartFrom;
            if( last ) return true;
        };
    };
};