/*
 * Original code by ofk ( kQuery, ksk )
 * http://d.hatena.ne.jp/ofk/comment/20090106/1231258010
 * http://d.hatena.ne.jp/ofk/20090111/1231668170 
 *
 * セレクタ Level 3
 * http://standards.mitsue.co.jp/resources/w3c/TR/css3-selectors/#nth-child-pseudo
 */

var
    X_Node_Selector__PSEUDO = {
        'nth-child'        : 9,
        'nth-last-child'   : 14,
        'nth-of-type'      : 11,
        'nth-last-of-type' : 16,
        'root'             : 4,
        'link'             : 4,
        'lang'             : 4,
        'empty'            : 5,
        'target'           : 6,
        'invalid'          : 7,
        'enabled'          : 7,
        'checked'          : 7,
        'disabled'         : 8,
        'contains'         : 8,
        'last-child'       : 10,
        'only-child'       : 10,
        'first-child'      : 11,
        'last-of-type'     : 12,
        'only-of-type'     : 12,
        'first-of-type'    : 13
    },

    X_Node_Selector__COMBINATOR = {
        ''    : 0, // none
        ' '   : 1, // 子孫セレクタ
        '>'   : 2, // 子セレクタ
        '+'   : 3, // 兄弟セレクタ,共通の親を持つ、1番目要素が2番目要素の1つ前にある
        '~'   : 4, // 一般兄弟セレクタ,共通の親を持つ、1番目要素が2番目要素の前 (直前でなくともよい) にある
        ','   : 5,
        '@'   : 6  // XML 用の拡張、属性ノードを辿る　http://www.marguerite.jp/Nihongo/WWW/RefDOM/_Attr_interface.html
    },
    X_Node_Selector__SELECTOR = {
        ''    : 0, // none
        tag   : 1,
        '#'   : 2,
        '.'   : 3,
        ':'   : 4,
        '['   : 5,
        not   : 6,
        scope : 7,
        root  : 8,
        link  : 9
    },
    X_Node_Selector__OPERATORS = { '==' : 1, '!=': 2, '~=': 3, '^=': 4, '$=': 5, '*=': 6, '|=': 7 }, // '':0 は属性が存在するならtrue
    // TODO { a : 1, A : 2, _ : 3,,, }
    X_Node_Selector__ALPHABET  = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789\\',
    X_Node_Selector__NUMBER    = '+-0123456789';

/*
 * セレクタ文字列の解析、但し一挙に行わず、ひと塊づつ
 * 結合子 + 単体セレクタ( タグ,*,#,.,[],: )
 * ' ' 子孫セレクタ, '>' 直下,'+','~' の場合、tagName|* を返す
 * return [ 今回のパースで解析した終端位置, [ selector, ... ] ] error: return pointer
 */
function X_Node_Selector__parse( query, last ){
    var COMBINATOR = X_Node_Selector__COMBINATOR,
        SELECTOR   = X_Node_Selector__SELECTOR,
        OPERATORS  = X_Node_Selector__OPERATORS,
        ALPHABET   = X_Node_Selector__ALPHABET,
        NUMBER     = X_Node_Selector__NUMBER,
        result     = [],
        i          = -1,
        l          = query.length,
        phase      = 0x0,
        combinator = 0,
        selector   = 0,
        chr, chrCode, nameChr, name1st,
        tmp, escape, quot, start,
        name, key, value, operator, a, b, not;

    query += ' ';
    while( i < l ){
        chr     = query.charAt( ++i );
        chrCode = ALPHABET.indexOf( chr ); // TODO この関数無くす！
        nameChr = chrCode !== -1;
        name1st = nameChr && chrCode < 52;
        switch( phase ){
            case 0x0 :
                name1st ? // tagName
                    ( ( selector = 1 ) && ( phase = 0x2 ) && ( start = i ) ) :
                !not && ( tmp = COMBINATOR[ chr ] ) ? (
                    ( 1 < tmp && 1 < combinator ) ?
                        ( phase = 0xf ) : // ' ' でない結合子の上書きはエラー
                        ( phase = tmp === 5 ? 0xe : 0x0 ) & ( ( 1 < tmp || combinator < 1 ) && ( combinator = tmp ) ) & ( tmp === 5 && ++i ) ) :
                ( tmp = SELECTOR[ chr ] ) ? // [
                    ( selector = tmp ) && ( phase = selector === 5 ? 0x4 : 0x1 ) : // 7:[, 0<:
                chr === '*' ?
                    ( ( selector = 1 ) && ( name = chr ) && ( phase = 0xe ) && ++i ) :
                    chr !== ' ' && ( phase = 0xf );
                //console.log( '0x0: ' + name1st + ' ' + chrCode + ' ' + chr + ' ' + phase + ' tmp:' + tmp + ' comb:' + combinator );
                break;
            case 0x1 :
                name1st ?
                    ( ( start = i ) && ( phase = 0x2 ) ) :
                    chr !== ' ' && ( phase = 0xf );
                break;
            case 0x2 :
                !nameChr && !( escape && ( selector === 2 || selector === 3 ) && ( chr === ':' || chr === '.' ) ) ? // id or class の場合 : . を直前にエスケープした場合に限り使える
                    ( name = query.substring( start, i ) ) && ( phase = selector === 4 && name !== 'not' && chr === '(' ? ( name !== 'lang' && name !== 'contains' ? 0x8 : 0xb ) : 0xe ) :
                SELECTOR[ chr ] < 4 && ( phase = 0xe );
                break;
            
            case 0x3 : //:nth-
                break;
            
            case 0x4 : // start attr filter
                name1st ?
                    ( ( phase = 0x5 ) && ( start = i ) ) :
                chr !== ' ' &&
                    ( phase = 0xf );
                break;
            case 0x5 : // attr filter key
                chr === '=' ?
                    ( ( operator = 1 ) && ( phase = 0x6 ) && ( key || ( key = query.substring( start, i ) ) ) && ( start = i + 1 ) ) :
                chr === ']' ?
                    ( !( operator = 0 ) && ( phase = 0xe ) && ( key || ( key = query.substring( start, i ) ) ) && ++i ) :
                chr === ' ' ?
                    ( key || ( key = query.substring( start, i ) ) ) :
                ( operator = OPERATORS[ query.substr( i, 2 ) ] ) ?
                    ( ( phase = 0x6 ) && ( key || ( key = query.substring( start, i ) ) ) && ( start = ++i ) ) :
                    !nameChr && ( phase = 0xf );
                //console.log( name1st + ' ' + chrCode + chr + phase );
                break;
            case 0x6 :
                ( chr === '"' || chr === "'" ) && !escape && !quot ?
                    ( quot = chr ) && ( start = i + 1 ) && ( phase = 0x7 ) :
                    chr !== ' ' && ( start = i ) && ( phase = 0x7 );
                break;
                
            case 0x7 : // attr filter value
                chr === quot ?
                    !escape && !value && ( value = query.substring( start, i ) ) :
                chr === ']' ?
                    ( ( value || ( value = query.substring( start, i ) ) ) && ( phase = 0xe ) && ++i ) :
                chr === ' ' && !quot && !value && ( value = query.substring( start, i ) );
                    //( chr === '"' || chr === "'" ) && !quot && ( quot = chr ) && ( start = i + 1 );
                break;
                
            case 0x8 : // 4, 2n, even, odd, -n+4,
                NUMBER.indexOf( chr ) !== -1 ?
                    ( start = i ) && ( phase = 0x9 ) :
                chr === 'n' ?
                    ( phase = 0xa ) && ( a = 1 ) && ( start = i + 1 ) :
                query.substr( i, 4 ) === 'even' ?
                    ( ( a = 2 ) && !( b = 0 ) && ( i += 3 ) ) :
                query.substr( i, 3 ) === 'odd' ?
                    ( ( a = 2 ) && ( b = 1 ) && ( i += 2 ) ) :
                chr === ')' && ( phase = a ? 0xe : 0xf ) && ++i;
                //console.log( '0x8: ' + name1st + ' ' + chrCode + ' ' + chr + ' ' + phase + ' ' + name );
                break;
            case 0x9 :
                tmp = query.substring( start, i );
                chr === 'n' ?
                    ( phase = 0xa ) && ( start = i + 1 ) && ( a = tmp === '+' ? 1 : tmp === '-' ? -1 : parseFloat( tmp ) ) :
                chr === ')' && ( phase = 0xe ) && ++i && ( b = parseFloat( tmp ) ) && ( a = 0 );
                //console.log( '0x9: ' + name1st + ' ' + chrCode + ' ' + chr + ' ' + phase );
                break;
            case 0xa :
                chr === ')' && ( phase = 0xe ) && ++i && ( b = parseFloat( query.substring( start, i ) ) || 0 );
                //console.log( '0xa: ' + start + ' ' + i );
                break;
            // contains, lang
            case 0xb :
                ( chr === '"' || chr === "'" ) && !escape && !quot &&
                    ( quot = chr ) && ( start = i + 1 ) && ( phase = 0xc );
                break;
            case 0xc :
                chr === quot && !escape && ( value = query.substring( start, i ) ) && ( phase = 0xd );
                break;
            case 0xd :
                chr === ')' && ( phase = 0xe ) && ++i;
                break;
            default :
        };

        if( phase === 0xf ) return i;

        //alert( chr + ' ' + phase + ' ' + selector + ' ' + name + ' ' + name1st )
        if( phase === 0xe ){
            if( selector === 4 ){// :not
                if( name === 'not' ){
                    if( not ){
                        return i; // error
                    } else {
                        not      = true;
                        selector = 0;
                        phase    = 0x0;
                        name     = null;
                    };
                    //continue;
                } else
                if( name === 'lang' || name === 'contains' ){
                    result = [ not ? 0 : combinator, selector, name, value ];
                    break;
                } else {
                    if( a !== a || b !== b ) return i;
                    result = [ not ? 0 : combinator, SELECTOR[ name ] || selector, name, a, b ];
                    break;
                };
            } else {
                result =
                    combinator === 5 ?
                        5 :
                    selector === 5 ?
                        [ not ? 0 : combinator, selector, key, operator, value ] :
                        [ not ? 0 : combinator, selector, name.split( '\\' ).join( '' ) ];
                break;
            };
        };

        escape = chr === '\\' && !escape;
    };
    //if( phase !== 0xe ) return i;
    if( not && ( tmp = query.substr( i ).indexOf( ')' ) ) === -1 ) return i;
    return not ? [ i + tmp + 1, [ combinator, 6, result ] ] : [ i, result ];
};

    /**
     * selector を使って Node, NodeList を取得する
     * @alias X.Doc.find
     * @function
     * @param {string} セレクター文字列
     * @return {Node|NodeList}
     */
    X[ 'Doc' ][ 'find' ] = X_shortcutFunction =

    /**
     * selector を使って Node, NodeList を取得する
     * @alias NodeList.prototype.find
     * @function
     * @param {string} セレクター文字列
     * @return {Node|NodeList}
     */
    X_NodeList.prototype[ 'find' ] = X_Node_find;

    /**
     * selector を使って Node, NodeList を取得する
     * @alias Node.prototype.find
     * @function
     * @param {string} セレクター文字列
     * @return {Node|NodeList}
     */
    function X_Node_find( queryString ){
        var HTML      = X_Node_html,
            scope     = this.constructor === X_NodeList && this.length ? this : [ this.constructor === X_Node || this[ 'instanceOf' ] && this[ 'instanceOf' ]( X_Node ) ? this : X_Node_body ],
            parents   = scope, // 探索元の親要素 XNodeList の場合あり
            // TODO { title : true,,, }
            noLower   = 'title id name class for action archive background cite classid codebase data href longdesc profile src usemap',// + X_Dom_DTD_ATTR_VAL_IS_URI.join( ' ' ),
            ARY_PUSH  = Array.prototype.push,
            ret       = [], // 結果要素
            root      = X_Node_getRoot( scope[ 0 ] ),
            isXML     = !!X_Node_isXmlDocument( root ),
            isMulti   = 1 < scope.length,// 要素をマージする必要がある
            isStart   = true,
            _         = ' ',
            isAll, isNot, hasRoot,
            l, i, n, parsed,
            xnodes, // 一時保存用
            merge, // 要素がコメントノードで汚染されている場合使う
            parent, children, j, m,
            combinator, selector, name, tagName,
            uid, tmp, xnode, filter, key, op, val, toLower, useName,
            links, className, attr, flag;

        function X_Node_Selector__fetchElements( list, xnodes, tag, merge ){
            var l = xnodes.length,
                i = 0,
                child, uid, _tag, _xnodes;
    
            for( ; i < l; ++i ){ // for( ; child = xnodes[ ++i ]; )
                child = xnodes[ i ];
                uid   = child[ '_uid' ];
                _tag  = child[ '_tag' ];
                if( !merge[ uid ] && _tag ){
                    merge[ uid ] = true;
                    ( !tag || tag === _tag ) && ( list[ list.length ] = child );
                    if( ( _xnodes = child[ '_xnodes' ] ) && ( 1 < _xnodes.length || ( _xnodes[ 0 ] && _xnodes[ 0 ][ '_tag' ] ) ) ){
                        X_Node_Selector__fetchElements( list, _xnodes, tag, merge );
                    };
                };
            };
        };

        /*@+debug[*/
        if( X_ViewPort_readyState < X_EVENT_XDOM_READY ){
            // alert( 'not ready! use X.ViewPort.listenOnce( X_EVENT_XDOM_READY, callback )' );
            return;
        };
        /*]@+debug*/

        // 文字列以外は空で返す
        if( !X_Type_isString( queryString ) ) return ret;
        
        xnodes = [];
        
        // 以下、パースと探索
        for( ; queryString.length; ){
            //console.log( 'queryString[' + queryString + ']' );
            
            // 初期化処理
            if( !parsed ){
                parsed = X_Node_Selector__parse( queryString );
                
                if( X_Type_isNumber( parsed ) ){
                    // error
                    return [];
                };
                
                queryString = queryString.substr( parsed[ 0 ] );
                parsed      = parsed[ 1 ];
                
                //console.log( 'X_Node_Selector__parse ' + parsed );
                
                if( parsed === 5 ){
                    isMulti = true;
                    parents = scope;
                    xnodes && xnodes.length && ARY_PUSH.apply( ret, xnodes );
                    parsed  = null;
                    xnodes  = [];
                    isStart = true;
                    continue;
                };
            };
            
            combinator  = parsed[ 0 ];
            selector    = parsed[ 1 ];
            name        = parsed[ 2 ];
            tagName     = selector === 1 ? ( isXML ? name : name.toUpperCase() ) : '*';
            isAll       = tagName === '*';
    
            if( !isStart ){
                if( !xnodes.length ){
                    parsed = null;
                    continue;
                } else
                if( combinator !== 0 ){
                    parents = xnodes;
                    xnodes  = [];
                    //console.log( 'cobinator !== 0 ' + parents.length + ' : ' + xnodes.length );
                };
            };
            
            i = 0;
            l = parents.length;
            n = -1;    
            isMulti = isMulti || 1 < l;
            
            //console.log( 'combinator ' + combinator );
    
            switch( combinator ){
                // > TagName|*
                case 2 :
                    for( ; i < l; ++i ){
                        parent = parents[ i ];
                        if( ( children = parent[ '_xnodes' ] ) && ( m = children.length ) ){
                            for( j = 0; j < m; ++j ){
                                xnode = children[ j ];
                                if( xnode[ '_tag' ] && ( isAll || tagName === xnode[ '_tag' ] ) ) xnodes[ ++n ] = xnode;
                            };
                        };
                    };
                    break;
                // + TagName|*
                case 3 :
                    for( ; i < l; ++i ){
                        
                        xnode = parents[ i ];
                        j = xnode[ 'getOrder' ]() + 1;
                        parent = xnode.parent;
                        if( parent && ( children = parent[ '_xnodes' ] ) && ( m = children.length ) ){
                            for( ; j < m; ++j ){
                                xnode = children[ j ];
                                if( xnode[ '_tag' ] ){
                                    if( isAll || tagName === xnode[ '_tag' ] ){
                                        xnodes[ ++n ] = xnode;
                                    };
                                    break;
                                };
                            };
                        };
                        /*
                        for( xnode = parents[ i ][ 'next' ](); xnode; xnode = xnode[ 'next' ]() ){
                            if( xnode[ '_tag' ] ){
                                if( isAll || tagName === xnode[ '_tag' ] ) xnodes[ ++n ] = xnode;
                                break;
                            };
                        };    */
                    };
                    break;
                // ~ TagName|*
                case 4 :
                    merge  = {};
                    for( ; i < l; ++i ){
                        for( xnode = parents[ i ][ 'next' ](); xnode; xnode = xnode[ 'next' ]() ){
                            if( xnode[ '_tag' ] && ( isAll || tagName === xnode[ '_tag' ] ) ){
                                uid = xnode[ '_uid' ];
                                if( merge[ uid ] ){
                                    break;
                                } else {
                                    merge[ uid ] = true;
                                    xnodes[ ++n ] = xnode;
                                };
                            };
                        };
                    };
                    break;

                // case 6 : 属性ノードは実装しない

                default :
                    if( combinator === 1 || ( isStart && selector < 7 ) ){
                        if( isStart ){
                            if( tagName === 'HTML' ){
                                xnodes[ 0 ] = X_Node_html;
                                break;
                            };
                            if( tagName === 'HEAD' ){
                                xnodes[ 0 ] = X_Node_head;
                                break;
                            };
                            if( tagName === 'BODY' ){
                                xnodes[ 0 ] = X_Node_body;
                                break;
                            };

                        };
                        //console.log( l + ' > ' + xnodes.length + ' tag:' + tagName );
                        merge = {};
                        X_Node_Selector__fetchElements( xnodes, parents, isAll ? '' : tagName, merge );
                        //console.log( l + ' >> ' + xnodes.length + ' tag:' + tagName );
                    };
            };

            isStart = false;

            //alert( 'pre-selector:' + ( xnodes && xnodes.length ) )

            switch( selector ){
                // #, ID
                case 2 :
                    filter = [ 'id', 1, name ]; break;
                // ., class
                case 3 :
                    filter = [ 'class', 3 /*'~='*/, name ]; break;
                // :, 擬似クラス
                case 4 :
                    if( !( filter = X_Node_Selector__filter[ name ] ) ){
                        return [];
                    };
                    break;
                // [] 属性
                case 5 :
                    filter = [ name, parsed[ 3 ], parsed[ 4 ] ]; break;
                // :not
                case 6 :
                    isNot  = true;
                    parsed = parsed[ 2 ];
                    name   = parsed[ 2 ];
                    switch( parsed[ 1 ] ) {
                        case 1 :
                            filter = [ 'tag', 1, isXML ? name : name.toUpperCase() ]; break;
                        // #, ID
                        case 2 :
                            filter = [ 'id', 1, name ]; break;
                        // ., class
                        case 3 :
                            filter = [ 'class', 3, name ]; break;
                        // :, 擬似クラス
                        case 4 :
                            if( !( filter = X_Node_Selector__filter[ name ] ) ){
                                return [];
                            };
                            break;
                        // [] 属性
                        case 5 :
                            filter = [ name, parsed[ 3 ], parsed[ 4 ] ]; break;
                    };
                    break;
                // scope
                case 7 :
                    xnodes = scope; break;
                // root
                case 8 :
                    hasRoot = true;
                    xnodes = [ HTML ]; break;
                // link
                case 9 :
                    if( links = document.links ){
                        for( xnodes = [], i = links.length; i; ){
                            xnodes[ --i ] = X_Node( links[ i ] );
                        };
                    } else {
                        // area[href],a[href]
                    };
            };
            
            if( filter && xnodes.length ){
                // filter.mが関数の場合
                if( filter.m ){
                    xnodes = filter.m(
                        {
                            not : isNot,
                            xml : isXML
                        },
                        xnodes,
                        parsed[ 3 ], parsed[ 4 ]
                    );
                } else
                // filterが関数の場合
                if( X_Type_isFunction( filter ) ){
                    tmp = [];
                    for( i = 0, n = -1; xnode = xnodes[ i ]; ++i ){
                        if( ( !!filter( xnode ) ) ^ isNot ) tmp[ ++n ] = xnode;    
                    };
                    xnodes = tmp;
                } else {
                // 属性セレクター
                    tmp = [];
                    key = filter[ 0 ];
                    op  = filter[ 1 ];
                    val = filter[ 2 ];
                    
                    key = X_Node_Attr_renameForTag[ key ] || key;
                    
                    // [class~='val']
                    if( !isXML && key === 'class' && op === 3 ){
                        val = _ + val + _;
                        for( i = 0, n = -1; xnode = xnodes[ i ]; ++i ){
                            className = xnode[ '_className' ];
                            if( !!( className && ( _ + className + _ ).indexOf( val ) > -1 ) ^ isNot ) tmp[ ++n ] = xnode;
                        };
                    } else {
                    // 通常
                        // 諦めて、funcAttrを呼ぶ
                        // flag_call  = ($.browser.safari && key === 'selected');
                        // getAttributeを使わない
                        useName = ( X_UA.Trident || X_UA.TridentMobile ) && key !== 'href' && key !== 'src';
                        toLower = !!val && !isXML && noLower.indexOf( key ) === -1; //!noLower.test(key);
                        if( toLower ) val = val.toLowerCase();
                        if( op === 3 ) val = _ + val + _;

                        for( i = 0, n = -1, l = xnodes.length; i < l; ++i ){
                            xnode = xnodes[ i ];
                            attr =
                                key === 'tag' ? xnode[ '_tag' ] :
                                key === 'id' ? xnode[ '_id' ] :
                                key === 'class' ? xnode[ '_className' ] :
                                xnode[ '_attrs' ] && xnode[ '_attrs' ][ key ];
                                //flag_call ?
                                //    funcAttr( elem, key ) :
                                //useName ?
                                //    elem[ X_Node_Attr_renameForDOM[ key ] || key ] :
                                //    elem.getAttribute( key, 2 );
                            flag = !!attr;// && ( !useName || attr !== '' );
                            if( flag && op ){
                                if( toLower ) attr = attr.toLowerCase();
                                
                                switch( op ){
                                    case 1: // =
                                        flag = attr === val;
                                        break;
                                    case 2: // !=
                                        flag = attr !== val;
                                        break;
                                    case 3: // ~=
                                        flag = ( _ + attr + _ ).indexOf( val ) !== -1;
                                        break;
                                    case 4: // ^=
                                        flag = attr.indexOf( val ) === 0;
                                        break;
                                    case 5: // $=
                                        flag = attr.lastIndexOf( val ) + val.length === attr.length;
                                        break;
                                    case 6: // *=
                                        flag = attr.indexOf( val ) !== -1;
                                        break;
                                    case 7: // |=
                                        flag = attr === val || attr.substring( 0, val.length + 1 ) === val + '-';
                                        break;
                                };
                            };
                            if( !!flag ^ isNot ) tmp[ ++n ] = xnode;
                        };
                    };
                    xnodes = tmp;
                };
            };
            filter  = null;
            isNot   = false;
            parsed  = null;
            
            //console.log( '//end :' + ( xnodes && xnodes.length ) );
        };
        //console.log( 'multi:' + ( xnodes && xnodes.length ) );
        
        // tree 順に並び替え、同一要素の排除
        if( isMulti ){
            xnodes && xnodes.length && ARY_PUSH.apply( ret, xnodes );
            l = ret.length;
            if( l < 2 ) return ret[ 0 ] || X_Node_none;

            xnodes = [];
            merge  = {};
            for( i = 0, n = -1; i < l; ++i ){
                //alert( 'multi:' + i )
                xnode = ret[ i ];
                if( !merge[ uid = xnode[ '_uid' ] ] ){
                    merge[ uid ] = true;
                    xnodes[ ++n ] = xnode;
                };
            };
            // TODO Tree に接続していない場合でも、 scope の順番で
            xnodes = X_Node_Selector__sortElementOrder( [], xnodes, hasRoot ? [ HTML ] : HTML[ '_xnodes' ] );
        };

        function X_Node_Selector__sortElementOrder( newList, list, xnodes ){
            var l = xnodes.length,
                i = 0,
                j, child, _xnodes;
    
            for( ; i < l; ++i ){
                child = xnodes[ i ];
                if( !child[ '_tag' ] ) continue;
    
                j = list.indexOf( child );
                if( j !== -1 ){
                    newList[ newList.length ] = child;
                    if( list.length === 2 ){
                        newList[ newList.length ] = list[ j === 0 ? 1 : 0 ];
                        return newList;
                    };
                    list.splice( j, 1 );
                };
    
                if( ( _xnodes = child[ '_xnodes' ] ) && X_Node_Selector__sortElementOrder( newList, list, _xnodes ) ){
                    return newList;
                };
            };
        };

        return xnodes.length === 1 ? xnodes[ 0 ] : new X_NodeList( xnodes );
    };

/*
    function X_Node_Selector__fetchElements( list, parent, tag, merge ){
        
        var xnodes   = parent[ '_xnodes' ],
            memory   = {
                i      : 0,
                l      : xnodes.length,
                xnodes : xnodes
            },        
            memories = [ memory ],
            i, l, xnode,
            uid, _xnodes;
        
        while( memories.length ){
            memory = memories.pop();
            xnodes = memory.xnodes;
            i      = memory.i;
            l      = memory.l;
            for( ; i < l; ++i ){
                xnode = xnodes[ i ];
                uid   = xnode[ '_uid' ];
                if( !merge[ uid ] && xnode[ '_tag' ] ){
                    if( !tag || xnode[ '_tag' ] === tag ) list[ list.length ] = xnode;
                    
                    if( _xnodes = xnode[ '_xnodes' ] ){
                        if( 1 < _xnodes.length || ( _xnodes[ 0 ] && _xnodes[ 0 ][ '_tag' ] ) ){
                            memory.i = i + 1;
                            memory.l = l;
                            memory.xnodes = xnodes;
                            memories[ memories.length ] = memory;
                            memories[ memories.length ] = {
                                i      : 0,
                                l      : _xnodes.length,
                                xnodes : _xnodes
                            };
                            merge[ uid ] = true;
                            break;
                        };
                    };
                };
                merge[ uid ] = true;
            };
        };
    };
 */
    function X_Node_Selector__funcSelectorChild( type, flag_all, flags, xnodes ){
        var res      = [],
            flag_not = flags.not,
            i = 0, n = -1, xnode, node,
            tagName, tmp;
        for( ; xnode = xnodes[ i ]; ++i ){
            tagName = flag_all || xnode[ '_tag' ];
            tmp     = null;
            if( /* tmp === null && */ type <= 0 ){
                for( node = xnode[ 'prev' ](); node; node = node[ 'prev' ]() ){
                    if( node[ '_tag' ] && ( flag_all || tagName === node[ '_tag' ] ) ){
                        tmp = false;
                        break;
                    };
                };
            };
            if( tmp === null && 0 <= type ){
                for( node = xnode[ 'next' ](); node; node = node[ 'next' ]() ){
                    if( node[ '_tag' ] && ( flag_all || tagName === node[ '_tag' ] ) ){
                        tmp = false;
                        break;
                    };
                };
            };
            if( tmp === null ) tmp = true;
            if( tmp ^ flag_not ) res[ ++n ] = xnode;
        };
        return res;
    };
    function X_Node_Selector__funcSelectorNth( pointer, sibling, flag_all, flags, xnodes, a, b ){
        var res      = [],
            checked  = {},
            flag_not = flags.not,
            i = 0, n = -1, uid,
            c, xnode, tmp, node, tagName;
        for( ; xnode = xnodes[ i ]; ++i ){
            uid = xnode[ '_uid' ];
            tmp = checked[ uid ];
            if( tmp === void 0 ){
                for( c = 0, node = xnode.parent[ pointer ](), tagName = flag_all || xnode[ '_tag' ]; node; node = node[ sibling ]() ){
                    if( node[ '_tag' ] && ( flag_all || tagName === node[ '_tag' ] ) ){
                        ++c;
                        checked[ node[ '_uid' ] ] = a === 0 ? c === b : (c - b) % a === 0 && (c - b) / a >= 0;
                    };
                };
                tmp = checked[ uid ];
            };
            if( tmp ^ flag_not ) res[ ++n ] = xnode;
        };
        return res;
    };
    function X_Node_Selector__funcSelectorProp( prop, flag, flags, xnodes ){
        var res = [],
            flag_not = flag ? flags.not : !flags.not,
            i = 0, n = -1, xnode;
        for( ; xnode = xnodes[ i ]; ++i ){
            if( xnode[ '_attrs' ] && xnode[ '_attrs' ][ prop ] ^ flag_not ) res[ ++n ] = xnode;
        };
        return res;
    };

var X_Node_Selector__filter = {
    root : function(){
        return X_Node_html;
    },
    target : {
        m : function( flags, xnodes ){
            var res  = [],
                hash = location.hash.slice( 1 ),
                flag_not = flags.not,
                i = 0, n = -1, xnode;
            for ( ; xnode = xnodes[ i ]; ++i ){
                if( ( ( xnode[ '_id' ] || xnode[ '_attrs' ] && xnode[ '_attrs' ][ 'name' ] ) === hash ) ^ flag_not ) res[ ++n ] = xnode;
            };
            return res;
        }
    },
    'first-child' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( -1, true, flags, xnodes ); }
    },
    'last-child' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( 1, true, flags, xnodes ); }
    },
    'only-child' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( 0, true, flags, xnodes ); }
    },
    'first-of-type' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( -1, false, flags, xnodes ); }
    },
    'last-of-type' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( 1, false, flags, xnodes ); }
    },
    'only-of-type' : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorChild( 0, false, flags, xnodes ); }
    },
    'nth-child' : {
        m : function( flags, xnodes, a, b ){ return X_Node_Selector__funcSelectorNth( 'firstChild', 'next', true, flags, xnodes, a, b ); }
    },
    'nth-last-child' : {
        m : function( flags, xnodes, a, b ){ return X_Node_Selector__funcSelectorNth( 'lastChild', 'prev', true, flags, xnodes, a, b ); }
    },
    'nth-of-type' : {
        m : function( flags, xnodes, a, b ){ return X_Node_Selector__funcSelectorNth( 'firstChild', 'next', false, flags, xnodes, a, b ); }
    },
    'nth-last-of-type' : {
        m : function( flags, xnodes, a, b ){ return X_Node_Selector__funcSelectorNth( 'lastChild', 'prev', false, flags, xnodes, a, b ); }
    },
    empty : {
        m : function( flags, xnodes ){
            var res = [],
                flag_not = flags.not,
                i = 0, n = -1, xnode, tmp, node;
            for( ; xnode = xnodes[i]; ++i ){
                tmp = true;
                for( node = xnode[ 'firstChild' ](); node; node = node[ 'next' ]() ){
                    if( node[ '_tag' ] || node[ '_text' ] ){
                        tmp = false;
                        break;
                    };
                };
                if( tmp ^ flag_not ) res[ ++n ] = xnode;
            };
            return res;
        }
    },
    link : {
        m : function( flags, xnodes ){
            var links = document.links,
                res   = [],
                checked, flag_not, i, link, xnode, n;
            if( !links ) return res;
            checked = {};
            flag_not = flags.not;
            for( i = 0; link = links[ i ]; ++i ){
                checked[ ( X_Node( link ) )[ '_uid' ] ] = true;
            };
            for( i = 0, n = -1; xnode = xnodes[ i ]; ++i ){
                if( checked[ xnode[ '_uid' ] ] ^ flag_not ) res[ ++n ] = xnode;
            };
            return res;
        }
    },
    lang : {
        m : function( flags, xnodes, arg ){
            var res = [],
                //reg = new RegExp('^' + arg, 'i'),
                flag_not = flags.not,
                i = 0, n = -1, xnode, tmp, lang;
            arg = arg.toLowerCase();
            for( ; tmp = xnode = xnodes[ i ]; ++i ){
                while( tmp && !( lang = tmp[ '_attrs' ] && tmp[ '_attrs' ][ 'lang' ] ) ){
                    tmp = tmp.parent;
                };
                //tmp = !!(tmp && reg.test(tmp.getAttribute('lang')));
                if( ( !!lang && lang.toLowerCase().indexOf( arg ) === 0 ) ^ flag_not ) res[ ++n ] = xnode;
            };
            return res;
        }
    },
    enabled : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorProp( 'disabled', false, flags, xnodes ); }
    },
    disabled : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorProp( 'disabled', true, flags, xnodes ); }
    },
    checked : {
        m : function( flags, xnodes ){ return X_Node_Selector__funcSelectorProp( 'checked', true, flags, xnodes ); }
    },
    contains : {
        m : function( flags, xnodes, arg ){
            var res = [],
                flag_not = flags.not,
                i = 0, n = -1, xnode;

            for( ; xnode = xnodes[ i ]; ++i ){
                if ( ( -1 < ( xnode[ 'text' ]() ).indexOf( arg ) ) ^ flag_not ) res[ ++n ] = xnode;
            };
            return res;
        }
    }
};
