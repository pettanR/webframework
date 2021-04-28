'use strict';
RangeFromSelection = function( xnode, isTextField, truncate ){
    var result = RangeFromSelection_getRawRange( xnode, isTextField, truncate );

    return result && {
        _xnode       : xnode,
        _isTextField : isTextField,
        _result      : result,

        'getOffset'  : isTextField ? RangeFromSelection_getOffsetTextField : X_TextRange_w3cRange ? RangeFromSelection_getOffsetW3c : X_TextRange_getOffset,
        // ieSelection の場合だけ TextField のrectが取れる
        'getRect'    : !isTextField || X_TextRange_ieRange ? X_TextRange_getRect : null,
        'move'       : X_TextRange_move, // ieRange はこれではだめ
        'text'       : isTextField ? X_TextRange_text : null,
        'select'     : X_TextRange_select
    };
};

function RangeFromSelection_getRawRange( xnode, isTextField, truncate ){
    var elm = xnode[ '_rawObject' ],
        selection, i, l, range, anchor, focus, parent,
        _range;

    if( isTextField && X_TextRange_canGetCursorPosition && !X_TextRange_ieRange ){
        return {};
    } else if( !isTextField && X_TextRange_w3cRange ){
        selection = X_TextRange_w3cSelection;
        if( selection.getRangeAt ){
            for( i = 0, l = selection.rangeCount; i < l; ++i ){
                range  = selection.getRangeAt( i );
                anchor = range.startContainer;
                focus  = range.endContainer;
                if( anchor === focus ){
                    if( !contains( elm, anchor ) ) range = null;
                } else {
                    if( !contains( elm, anchor ) || !contains( elm, focus ) ){
                        if( truncate ){
                            range = truncateRange( range, elm, anchor, focus, range.startOffset, range.endOffset, range.commonAncestorContainer );
                        } else {
                            range = null;
                        };
                    };
                };
                if( range ) break;
            };
        } else {
            // http://d.hatena.ne.jp/dayflower/20080423/1208941641
            // for Safari 1.3
            anchor = selection.anchorNode;
            focus  = selection.focusNode;
            if( elm.contains( anchor ) && elm.contains( focus ) ){
                range = document.createRange();
                range.setStart( anchor, selection.anchorOffset );
                range.setEnd( focus, selection.focusOffset );
            } else if( truncate ){
                parent = anchor.parentNode;
                while( !parent.contains( focus ) ){
                    parent = parent.parentNode;
                };
                range = truncateRange( document.createRange(), elm, anchor, focus, selection.anchorOffset, selection.focusOffset, parent );
            } else {
                range = null;
            };
        };
        if( range ){
            return {
                range : range,
                rect  : X_TextRange_getCorrectRect( false, range, xnode )
            };
        };
    } else {
        switch( X_TextRange_ieSelection.type ){
            case 'text' :
            case 'Text' : // ie11 ie10 mode
            case 'none' :
            case 'None' : // ie11 ie10 mode 選択が無くカーソルだけ
                range  = X_TextRange_ieSelection.createRange();
                parent = range.parentElement();
                if( elm === parent || elm.contains( parent ) ){
                    return {
                        range : range,
                        rect  : X_TextRange_getCorrectRect( isTextField, range, xnode )
                    };
                };
                if( truncate && parent.contains( elm ) ){
                    if( elm.isTextEdit ){
                        _range = elm.createTextRange();
                    } else {
                        _range = X_elmBody.createTextRange();
                        _range.moveToElementText( elm );
                    };
                    if( range.compareEndPoints( 'StartToStart', _range ) === -1 ){
                        range.setEndPoint( 'StartToStart', _range );
                    };
                    if( range.compareEndPoints( 'EndToEnd', _range ) === 1 ){
                        range.setEndPoint( 'EndToEnd', _range );
                    };
                    return {
                        range : range,
                        rect  : X_TextRange_getCorrectRect( isTextField, range, xnode )
                    };
                };
                break;
            case 'Control' :
        };
    };

    // ie11, ie11-10mode, ie11-9mode は startContainer に contains が効かない！
    function contains( elm, kid ){
        if( ( X_UA.Trident || X_UA.TridentMobile ) === 11 || // for IE11
              X_UA.IEHost === 11 // for IE11 9~10 mode
          ){
            parent = kid.parentNode;
            return elm === parent || elm.contains( parent );
        } else {
            return elm.contains( kid );
        };
    };

    // 要素の前後に選択範囲がはみ出すのを切り詰めます。
    function truncateRange( range, elm, anchor, focus, anchorOffset, focusOffset, commonAncestorContainer ){
        var texts = [], i = 1, l, text, start, end;

        X_TextRange_collectTextNodes( commonAncestorContainer, texts );
        texts.splice( 0, texts.indexOf( anchor ) );
        texts.splice( texts.indexOf( focus ) + 1 );
        for( i = 0, l = texts.length; i < l; ++i ){
            if( contains( elm, text = texts[ i ] ) ){
                if( !start ){
                    start = end = text;
                } else {
                    end = text;
                };
            } else if( end ){
                break;
            };
        };
        if( end ){
            range.setStart( start, start === anchor ? anchorOffset : 0 );
            range.setEnd( end, end === focus ? focusOffset : end.data.length );
            return range;
        };
    };
};

function RangeFromSelection_getOffsetTextField(){
    var result = this._result,
        xnode  = this._xnode,
        elm    = xnode[ '_rawObject' ],
        l, from, to, ret,
        selection_range, before_range, text;
        
    if( X_TextRange_canGetCursorPosition ){
        if( ( X_UA.Trident || X_UA.TridentMobile ) ){
            l    = elm.value.length;
            from = elm.selectionStart;
            to   = elm.selectionEnd;
            from = from < l ? from : l;
            to   = to   < l ? to   : l;
        } else {
            from = elm.selectionStart;
            to   = elm.selectionEnd;
        };
    } else {
    // http://www.studio-freesky.net/programming/javascript/3/
    // それは、IEのTextRangeオブジェクトで取得した範囲にもしラストに改行コード￥ｒ￥ｎがあった場合それが含まれないのです。（視覚的な選択範囲には含まれています）
    
    // https://web.archive.org/web/20090904134938/http://www.dedestruct.com/2008/03/22/howto-cross-browser-cursor-position-in-textareas/
    // https://web.archive.org/web/20090904183807/http://www.dedestruct.com/cursorPosition.html
        
        /* ret  = X_TextRange_cursorPosition( result.range, elm );
        from = ret.from;
        to   = ret.to; */
        
        selection_range = result.range.duplicate();

        if( selection_range.parentElement() !== elm ){
            // TODO 正しくはカーソル位置・選択範囲の復帰
            
            FocusUtility_setTemporarilyFocus( elm ); // 必要？
                
            // 要素のテキスト範囲を作成する
            selection_range = X_elmBody.createTextRange();
            // BODY要素のテキスト範囲を elm のテキスト範囲に移動する
            selection_range.moveToElementText( elm );

            selection_range.collapse( true ); // 末尾に移動
            selection_range.select(); // 必要?
        };

        before_range = X_elmBody.createTextRange();
        before_range.moveToElementText( elm );
        before_range.setEndPoint( 'EndToStart', selection_range );
    
        text = before_range.text;
        from = text.split( '\r' ).join( '' ).length;

        while( true ){
            if( before_range.compareEndPoints( 'StartToEnd', before_range ) === 0 ){
                break;
            } else {
                before_range.moveEnd( 'character', -1 );
                if( before_range.text === text ){
                    ++from;
                } else {
                    break;
                };
            };
        };
        
        text = selection_range.text;
        to   = from + text.split( '\r' ).join( '' ).length;
        
        while( true ){
            if( selection_range.compareEndPoints( 'StartToEnd', selection_range ) === 0 ){
                break;
            } else {
                selection_range.moveEnd( 'character', -1 );
                if( selection_range.text === text ){
                    ++to;
                } else {
                    break;
                };
            };
        };
    };
    return {
        'from' : result.from = from,
        'to'   : result.to   = to
    };
};

function RangeFromSelection_getOffsetW3c(){
    var result = this._result,
        range  = result.range,
        texts  = [],
        startText = range.startContainer,
        i      = -1,
        n      = range.startOffset,
        text, from, to;

    X_TextRange_collectTextNodes( this._xnode[ '_rawObject' ], texts );

    for( ; text = texts[ ++i ]; ){
        if( text === startText ){
            from = n;
            to   = n + ( '' + range ).length;
            return {
                'from' : result.from = from,
                'to'   : result.to   = to
            };
        };
        n += text.data.length;
    };
};