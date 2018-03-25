
'use strict';
X_TextRange = function( xnode, rangeType, a, b ){
    var tag         = xnode[ '_tag' ],
        type        = xnode[ '_attrs' ] && xnode[ '_attrs' ][ 'type' ],
        flags       = xnode[ '_flags' ],
        elm         = xnode[ '_rawObject' ],
        isTextField =
            tag === 'TEXTAREA' || 
            ( tag === 'INPUT' && ( 0 < ' text,search,url,telephone,password'.indexOf( type ) ) );

    function canCreateRange(){
        if( X_TextRange_canGetCursorPosition === undefined && isTextField && !( X_UA[ 'IE' ] < 9 ) ){
            X_TextRange_canGetCursorPosition = !!elm.setSelectionRange;
        };
        return !isTextField || X_TextRange_canGetCursorPosition || X_TextRange_ieRange;
    };

    if( flags & X_NodeFlags_IN_TREE && !( flags & X_NodeFlags_STYLE_IS_DISPLAY_NONE ) ){
        // X_Node_updateTimerID && X_Node_startUpdate();

        if( rangeType === 'selection' ){
            // focus が無い場合はつくれない
            if( isTextField && FocusUtility_getFocusedElement() !== elm ) return;
            return canCreateRange() && RangeFromSelection( xnode, isTextField, a );
        };
        if( rangeType === 'index' ){
            if( !( a <= b ) ) b = a;
            return canCreateRange() && RangeFromIndex( xnode, isTextField, a, b );
        };
        // TextField の場合、ieRange でないと無理です。同じテキストフローになる隠し要素を作って下さい。ごめんなさい。
        if( isTextField && !X_TextRange_ieRange ) return;

        switch( rangeType ){    
            case 'point' :
                if( !X_Type_isFinite( a + b ) ) return;
                return RangeFromPoint( xnode, isTextField, a, b );
            case 'line-index' :
                if( !( a <= b ) ) b = a;
                return LineRangeFromIndex( xnode, isTextField, a, b );
            case 'line-last' :
                if( !( a <= b ) ) b = a;
                return LineRangeFromLast( xnode, isTextField, a, b );
            case 'line-point' :
                if( !X_Type_isFinite( a + b ) ) return;
                return LineRangeFromPoint( xnode, isTextField, a, b );
        };
    };
};

// TextNode を探して flat な配列に格納する
function X_TextRange_collectTextNodes( elm, ary ){
    var kids = elm.childNodes,
        i, kid;
    
    if( !kids || !kids.length ) return;
    
    for( i = 0; kid = kids[ i ]; ++i ){
        switch( kid.nodeType ){
            case 1 :
                X_TextRange_collectTextNodes( kid, ary );
                break;
            case 3 :
                ary[ ary.length ] = kid;
                break;
        };
    };
};

// 行の最後の文字の端をクリックすると次の行の文字が選択されてしまう ie, edge
// 選択を移動して補正する https://msdn.microsoft.com/ja-jp/library/ms535872(v=vs.85).aspx
function X_TextRange_getCorrectRect( isTextField, range ){
    var rect, endOffset, endContainer, _rect, left, height, right, _left, _height;

    if( !isTextField && X_TextRange_w3cRange ){
        if( !X_UA[ 'IE' ] && !X_UA[ 'Edge' ] ){
            return range.getBoundingClientRect();
        } else {
            rect = range.getBoundingClientRect();
            if( !range.collapsed ){
                endOffset    = range.endOffset;
                endContainer = range.endContainer;
                range.setEnd( endContainer, endOffset - 1 );
                _rect = range.getBoundingClientRect();
                if( _rect.height < rect.height ){
                    rect = {
                        left   : _rect.left,
                        top    : rect.top,
                        right  : rect.right,
                        bottom : _rect.bottom,
                        width  : rect.right - _rect.left, // dir?
                        height : _rect.height
                    };
                };
                range.setEnd( endContainer, endOffset );
            };
            return rect;            
        };
    } else {
        rect   = range;
        left   = range.boundingLeft;
        right  = range.boundingWidth + left;
        height = range.boundingHeight;
        if( range.text ){
            range.moveEnd( 'character', -1 );
            _left   = range.boundingLeft;
            _height = range.boundingHeight;
            if( left < _left || _height < height ){
                rect = {
                    left   : _left,
                    top    : range.boundingTop,
                    right  : right,
                    bottom : _height + range.boundingTop,
                    width  : right - _left,
                    height : _height
                };
                range.moveEnd( 'character', 1 );
                if( X_UA[ 'IE' ] < 8 ){ // ie11 7mode で確認
                    if( rect.width === 0 ){
                        range.moveStart( 'character', 1 );
                        rect.top    = range.boundingTop;
                        rect.bottom = rect.top + _height;
                        rect.width  = range.boundingLeft - left;
                        rect.left   = left;
                        rect.right  = left + rect.width;
                        range.moveStart( 'character', -1 );
                    };
                };
            } else {
                range.moveEnd( 'character', 1 );
                rect = {
                    left   : left,
                    top    : range.boundingTop,
                    right  : right,
                    bottom : height + range.boundingTop,
                    width  : range.boundingWidth,
                    height : height
                };
            };
        }; 
        return rect;
    };
};

function X_TextRange_hitRect( rect, x, y ){
    return rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom;
};

function X_TextRange_getOffset(){
    var result = this._result,
        range, _range, from;
    
    if( !X_TextRange_w3cRange && !X_TextRange_canGetCursorPosition ){
        // http://www.studio-freesky.net/programming/javascript/3/
        range  = result.range;
        _range = range.duplicate();
        _range.moveToElementText( this._xnode[ '_rawObject' ] );
        _range.setEndPoint( 'EndToStart', range );
        from  = _range.text.length;
        result.from = from;
        result.to   = from + range.text.length;
    };

    return {
        'from' : result.from,
        'to'   : result.to
    };
};

function X_TextRange_getRect(){
    var result = this._result,
        rect = result.rect;
    
    if( !rect ){
        rect = result.rect = X_TextRange_getCorrectRect( this._isTextField, result.range );
    };

    if( !this._isTextField && X_TextRange_w3cRange ){
        return {
            'x'      : rect.left | 0,
            'y'      : rect.top  | 0,
            'width'  : ( rect.width || ( rect.right - rect.left ) ) | 0,
            'height' : ( rect.height || ( rect.bottom - rect.top ) ) | 0
        };
    } else {
        return {
            'x'      : rect.left,
            'y'      : rect.top,
            'width'  : rect.width,
            'height' : rect.height
        };
    };
};

function X_TextRange_move( from, to ){
    var result = this._result,
        range  = result.range,
        elm    = this._xnode[ '_rawObject' ],
        texts, i, z, n, text, len, start, end,
        _range;
    
    if( !X_Type_isNumber( result.from ) ){
        this[ 'getOffset' ](); // createRange('selection')では _result に from, to が居ない
    };

    if( from < 0 ){
        from  += result.from;
        from < 0 && ( from = 0 );
    };

    if( X_Type_isNumber( to ) ){
        if( to < 0 ){
            to += result.to;
            to < from && ( to = from );
        };
    } else {
        to = result.to;
    };

    // if( result.from === from && result.to === to ) return this;

    if( this._isTextField && !X_TextRange_ieRange ){
        elm.setSelectionRange( from, to );
        from = elm.selectionStart;
        to   = elm.selectionEnd;
    } else if( !this._isTextField && X_TextRange_w3cRange ){
        X_TextRange_collectTextNodes( elm, texts = [] );

        for( i = n = 0, z = texts.length; i < z; ++i ){
            text = texts[ i ];
            len  = text.data.length;
            if( n <= from && from < n + len ){
                start = true;
                range.setStart( text, from - n );
            };
            if( n <= to && to < n + len ){
                end = true;
                range.setEnd( text, to - n );
                break;
            };
            n += len;
        };
        // over
        if( !end ){
            if( !start ){
                range.setStart( text, len );
                from = n;
            };
            range.setEnd( text, len );
            to = n;
        };
    } else if( X_TextRange_ieRange ){
        // http://blog.enjoyxstudy.com/entry/20060305/p1
        if( X_UA[ 'Prsto' ] ){
            FocusUtility_setTemporarilyFocus( elm );
        };
        // レンジを elm に一致させる必要がある。しかし moveToElementText は不可
        //if( range.parentElement() === elm ){
        //    _range = elm.createTextRange();
        //} else {
            _range = X_elmBody.createTextRange();
            _range.moveToElementText( elm );
        //};
        range.setEndPoint( 'StartToStart', _range );
        range.setEndPoint( 'EndToEnd', _range );
        
        if( from + to === 0 ){
            range.collapse( true ); // 先頭に移動
        } else {
            len  = _range.text.length;
            from = from < len ? from : len;
            to   = to   < len ? to   : len;
            range.collapse( true ); // おまじない? 先頭に移動
            range.moveEnd( 'character', to );
            range.moveStart( 'character', from );
        };
    };
    result.from = from;
    result.to   = to;
    result.rect = null;
    return this;
};

function X_TextRange_text( v ){
    var result = this._result,
        range  = result.range,
        from   = result.from,
        to     = result.to,
        attrs, range, elm, val;

    if( v === undefined && X_TextRange_ieRange ){
        return range.text;
    };

    if( !( 0 <= from ) ){
        this[ 'getOffset' ]();
        from = result.from;
        to   = result.to;
    };

    if( v === undefined ){
        return this._xnode[ '_rawObject' ].value.substring( from, to );
    } else {
        attrs  = this._xnode[ '_attrs' ];
        if( attrs.value !== undefined ) delete attrs.value;

        if( X_TextRange_ieRange ){
            range.text = v;
        } else {
            elm = this._xnode[ '_rawObject' ];
            val = X_UA[ 'IE' ] < 9 ? X_Node_Attr_getValueForIE( elm ) : elm.value;
            elm.value = val.substr( 0, from ) + v + val.substr( to );
        };
            
        if( to !== from ){
            // カーソル位置を挿入した文字列の最後へ
            to = from + v.length;
        } else {
            // カーソル位置を挿入した文字列の後ろへ
            to += v.length;
            from = to;
        };
        this[ 'move' ]( from, to );
    };
    return this;
};

// https://stackoverflow.com/questions/12047648/setselectionrange-with-on-click-in-chrome-does-not-select-on-second-click
// The bug is now marked as FIXED and will be delivered in Chrome 39.
function X_TextRange_select(){
    var result = this._result, elm;

    if( !this._isTextField ){
        if( X_TextRange_w3cRange ){
            // https://okwave.jp/qa/q6022016.html
            X_TextRange_w3cSelection.removeAllRanges(); // IE9~Edge で必須
            X_TextRange_w3cSelection.addRange( result.range );
        } else {
            result.range.select();
        };
    } else if( X_TextRange_canGetCursorPosition ){
        elm = this._xnode[ '_rawObject' ];

        // iOS, Android Chrome, Gecko, CrWV では click イベントで focus する
        if( FocusUtility_getFocusedElement() !== elm ){
            elm.focus();
        };
        if( X_UA[ 'IE' ] < 11 ){
            elm.setSelectionRange( result.from, result.to );
        };
    } else {
        if( X_TextRange_lazySelectTimerID ){
            X_Timer_remove( X_TextRange_lazySelectTimerID );
        };
        X_TextRange_lazySelectTimerID = X_Timer_once( 100, this._xnode, X_TextRange_lazyFocus, [ result ] );
    };
    return this;
};

function X_TextRange_lazyFocus( result ){
    var range     = result.range,
        selection = X_TextRange_ieSelection.createRange(),
        elm       = this[ '_rawObject' ];

    if( FocusUtility_getFocusedElement() !== elm ){
        elm.focus();
    };

    selection.moveToElementText( elm );
    selection.setEndPoint( 'StartToStart', range );
    selection.setEndPoint( 'EndToEnd', range );
    selection.select();
    X_TextRange_lazySelectTimerID = 0;
};