'use strict';

var CHECK_TEXTAREA_INTERVAL = 16,
    TOP_LEVEL_SELECTOR = (function( k, arr ){
        arr = [];
        for( k in DDTD ) arr.push( k );
        return arr.join( ',' );
    })(),
    xnodeBody, xnodeRoot, xnodeCurrent, xnodeForm, xnodeTextarea,
    lastTextareaValue, lastKeyName, lastCursorOffset,
    timerID,
    editStartAction  = X.UA.SafariMobile || X.UA.iOSWebView ||
                       X.UA.Android &&
                           ( X.UA.Fennec || X_UA.ChromiumMobile || X_UA.Samsung || X_UA.ChromeWebView ) ? 'click' : 'pointerup',
    isIeOrEdge       = X.UA.Trident || X.UA.TridentMobile || X.UA.EdgeHTML || X.UA.EdgeMobile,
    scrollAfterInput = true || X.UA.SafariMobile || X.UA.iOSWebView;

X(function(){
    X.KB.listen( 'keydown', onKeyDown );

    xnodeBody = X.Doc.body;
    xnodeRoot = xnodeBody
        .create( 'div', { className : 'articleBody' } )
        .html( content )
        .listen( editStartAction, onPointerUp );
        // document, body へクリックイベントを設定すると iOS CrWV で動かない。ハックで動く模様だが、パフォーマンスに影響しそうなので辞めておく

    xnodeForm     = X.Doc.create( 'form' );
    xnodeTextarea = xnodeForm.create( 'textarea', {
        value : '', // 初回の xnodeTextarea.attr( 'value' ).length でエラーになる問題の回避、fw側の問題
        autocapitalize : 'none',
        autocomplete   : 'off',
        spellcheck     : 'false' } );
});

function onPointerUp( e ){
    var target = e.target,
        ddtd, selector, xnodes, i, xnode, _target;
    
    if( target !== xnodeTextarea ){
        if( target === xnodeRoot /*  || target === xnodeBody */ ){
            if( xnodeCurrent ){
                stopEdit();
                xnodeForm.remove(); 
                xnodeTextarea.attr( 'value', '' );
                timerID = X.Timer.remove( timerID );
            };
            return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
        };
        ddtd = DDTD;

        for( selector in ddtd ){
            xnodes = xnodeRoot.find( selector );
            _target = target;
            while( _target !== xnodeRoot ){
                i = -1;
                while( xnode = xnodes[ ++i ] ){
                    if( xnode === _target ){
                        startEdit( _target, true );
                        return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
                    };
                };
                _target = _target.parent;
            };
        };
        return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
    };
};

function stopEdit(){
    var v = xnodeTextarea.attr( 'value' );

    if( !v || X.String.cleanupWhiteSpace( v ) === ' ' ){
        xnodeCurrent.kill();
    } else {
        xnodeForm.prev(
            xnodeCurrent
                .attr( { 'alia-hidden' : undefined } )
                .removeClass( 'hideForEdit' )
                .html( v )
        );    
    };
    xnodeCurrent = null;
};

function startEdit( target, byTouch ){
    var range  = byTouch && target.createRange( 'selection', true ),
        offset = range && range.getOffset(),
        len    = xnodeTextarea.attr( 'value' ).length,
        range;

    xnodeCurrent && stopEdit();

    xnodeCurrent = target.attr( { 'alia-hidden' : 'true' } ).addClass( 'hideForEdit' ).next( xnodeForm );
    xnodeForm.appendAt( 0, target );// 隠し要素は parent　の最初へ、IE7- absolute要素は前へ

    lastTextareaValue = X.String.chrReferanceTo( target.html() );
    lastKeyName       = '';
    target.text( lastTextareaValue );

    xnodeForm.css( { height : target.height() + 'px' } )
    range = xnodeTextarea.createRange( 'index', 0, len ).text( lastTextareaValue );
    offset && range.move( offset.from, offset.to ).select();

    if( !timerID ){
        timerID = X.Timer.add( CHECK_TEXTAREA_INTERVAL, 0, checkTextarea );
    };
};
function checkTextarea(){
    var v     = xnodeTextarea.attr( 'value' ),
        lines = v.split( '\n' ),
        l     = lines.length,
        i, range, rect, scrlY, winH,
        offset, from, to, xnode, lineRange, lineOffset;

    if( 2 <= l ){
        for( i = 0; i < l - 1; ++i ){
            lines[ i ] &&
                xnodeForm.prev(
                    xnodeCurrent.clone()
                        .attr( { 'alia-hidden' : undefined } )
                        .removeClass( 'hideForEdit' )
                        .html( lines[ i ] )
                );
        };
        range = xnodeTextarea.createRange( 'index', 0, v.length ).text( v = lines[ l - 1 ] ).move( 0, 0 ).select();
    };

    function getLineRange( from, index ){
        return xnodeTextarea.createRange( from, index ) || xnodeCurrent.createRange( from, index );
    };

    if( lastTextareaValue !== v ){
        lastTextareaValue = v;
        v = X.String.whiteSpaceToTag( v ) || 'X';
        xnodeForm.css( { height : xnodeCurrent.text( v ).height() + 'px' } );
        if( scrollAfterInput ){
            range = xnodeTextarea.createRange( 'selection' );
            from  = range.getOffset().from;
            // iOS ではカーソル位置の rect が取れない? 必ず char を選択
            rect  = xnodeCurrent.createRange( 'index', from - 1, from ).getRect();
            scrlY = X.ViewPort.getScrollPosition()[ 1 ];
            winH  = X.ViewPort.getSize()[ 1 ];
            if( rect.y < scrlY ){
                window.scrollTo( 0, rect.y );
            } else if( scrlY + winH < rect.y + rect.height ){
                window.scrollTo( 0, rect.y + rect.height - winH );
            };
        };
    } else {
        if( lastKeyName ){
            range  = range || xnodeTextarea.createRange( 'selection' );
            if( range ){
                offset = range.getOffset();
                from   = offset.from;
                to     = offset.to;
                
                switch( lastKeyName ){
                    case 'CSR_L' :
                        if( lastCursorOffset.from === lastCursorOffset.to && lastCursorOffset.to === 0 ){
                            if( xnode = workPrev( xnodeCurrent ) ){
                                startEdit( xnode );
                                v = xnodeCurrent.html().length;
                                xnodeTextarea.createRange( 'index', v, v ).select();
                                return;
                            };
                        };
                        break;
                    case 'CSR_R' :
                        if( lastCursorOffset.from === lastCursorOffset.to && lastCursorOffset.to === v.length ){
                            if( xnode = workNext( xnodeCurrent ) ){
                                startEdit( xnode );
                                xnodeTextarea.createRange( 'index', 0, 0 ).select();
                                return;
                            };
                        };
                        break;
                    case 'CSR_U' :
                        if( from === to && ( to === 0 || isIeOrEdge ) ){ // 1行目でカーソル上を押したとき、IEは先頭に行かない
                            lineRange = getLineRange( 'line-index', 0 );
                            if( lineRange ){
                                lineOffset = lineRange.getOffset();
                                if( lastCursorOffset.to < lineOffset.to || ( lastCursorOffset.to === lineOffset.to && !getLineRange( 'line-index', 1 ) ) ){
                                    if( xnode = workPrev( xnodeCurrent ) ){
                                        startEdit( xnode );
                                        lineRange  = getLineRange( 'line-last', 0 );
                                        lineOffset = lineRange.getOffset();
                                        if( lastCursorOffset.to <= lineOffset.to - lineOffset.from ){
                                            v = lineOffset.from + lastCursorOffset.to;
                                        } else {
                                            v = xnodeCurrent.html().length;
                                        };
                                        xnodeTextarea.createRange( 'index', v, v ).select();
                                        return;
                                    };
                                };
                            };
                        };
                        break;
                    case 'CSR_D' :
                        if( from === to && ( to === v.length || isIeOrEdge ) ){
                            lineRange = getLineRange( 'line-last', 0 );
                            if( lineRange ){
                                lineOffset = lineRange.getOffset();
                                if( lineOffset.from <= lastCursorOffset.from ){
                                    if( xnode = workNext( xnodeCurrent ) ){
                                        from = lastCursorOffset.from - lineOffset.from;
                                        startEdit( xnode );
                                        lineRange  = getLineRange( 'line-index', 0 );
                                        lineOffset = lineRange.getOffset();
                                        from       = from <= lineOffset.to ? from : lineOffset.to;
                                        xnodeTextarea.createRange( 'index', from, from ).select();
                                        return;
                                    };
                                };
                            };
                        };
                        break;
                };
            };
        };
    };
    lastKeyName = '';
};
function onKeyDown( e ){
    var range, xnode, html, len;

    if( xnodeCurrent ){
        switch( e.keyName ){
            case 'ENTER' :
                range = xnodeTextarea.createRange( 'selection' );
                if( range && range.getOffset().from === 0 ){
                    return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
                };
                X.Timer.once( 1, checkTextarea );
                break;
            case 'BS' :
                range = xnodeTextarea.createRange( 'selection' );
                if( range && range.getOffset().from === 0 ){
                    if( xnode = workPrev( xnodeCurrent ) ){
                        html = X.String.chrReferanceTo( xnode.html() );
                        xnode.kill();
                        range.move( 0, 0 ).text( html ).move( html.length, html.length ).select();
                        return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
                    };
                };
                break;
            case 'DEL' :
                range = xnodeTextarea.createRange( 'selection' );
                if( range ){
                    len = xnodeTextarea.attr( 'value' ).length;
                    if( range.getOffset().from === len ){
                        if( xnode = workNext( xnodeCurrent ) ){
                            range.text( xnode.html() ).move( len, len ).select();
                            xnode.kill();
                            return X.Callback.PREVENT_DEFAULT | X.Callback.STOP_PROPAGATION;
                        };
                    };
                };
                break;
            case 'CSR_R' :
            case 'CSR_L' :
            case 'CSR_U' :
            case 'CSR_D' :
                range = xnodeTextarea.createRange( 'selection' );
                if( range ){
                    lastCursorOffset  = range.getOffset();
                    lastTextareaValue = xnodeTextarea.attr( 'value' );
                    lastKeyName       = e.keyName;
                    X.Timer.once( 1, checkTextarea );
                };
                break;
        };
    };
};

function workPrev( xnodeStart ){
    var xnodes = xnodeRoot.find( TOP_LEVEL_SELECTOR ),
        i = -1;

    while( xnodes[ ++i ] !== xnodeStart ){}
    return xnodes[ i - 1 ];
};

function workNext( xnodeStart ){
    var xnodes = xnodeRoot.find( TOP_LEVEL_SELECTOR ),
        i = -1;

    while( xnodes[ ++i ] !== xnodeStart ){}
    return xnodes[ i + 1 ];
};