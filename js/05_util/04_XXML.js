/*
 * XMLWrapper_find 周りの オリジナルコードに関する情報
 *  Original code by pettanR team
 *  - https://osdn.jp/projects/pettanr/scm/git/clientJs/blobs/master/0.6.x/js/02_dom/08_XNodeSelector.js
 *  and
 *  Original code by ofk ( kQuery, ksk )
 *  - http://d.hatena.ne.jp/ofk/comment/20090106/1231258010
 *  - http://d.hatena.ne.jp/ofk/20090111/1231668170
 * 
 * TODO X.Class で作り、kill を強要する
 */
X[ 'XML' ] = XMLWrapper;

/**
 * XML ツリーを探索して読み出す用のラッパークラスです.XML を操作する機能はありません、あしからず…
 * @alias X.XML
 * @class XML 探索用のラッパークラスです
 * @constructor
 * @param {XMLElement}
 */
function XMLWrapper( xml ){
    if( xml ){
        this._rawXML = xml;
        this.tagName = xml.tagName;
    };
};

/**
 * tagName または nodeName
 * @alias X.XML.prototype.tagName
 * @type {string}
 */
XMLWrapper.prototype.tagName     = '';
/**
 * ラップした xml の数 常に1または0, XMLList の場合2以上
 * @alias X.XML.prototype.length
 * @type {Number}
 */
XMLWrapper.prototype.length      = 1;
XMLWrapper.prototype[ 'parent' ] = XMLWrapper_parent;
XMLWrapper.prototype[ 'has' ]    = XMLWrapper_has;
XMLWrapper.prototype[ 'get' ]    = XMLWrapper_get;
XMLWrapper.prototype[ 'val' ]    = XMLWrapper_val;
XMLWrapper.prototype[ 'find' ]   = XMLWrapper_find;

/**
 * 親要素を返す、ルート要素の場合 null を返す
 * @alias X.XML.prototype.parent
 * @return {X.XML} 親要素
 */
function XMLWrapper_parent(){
    if( this.length === 1 ) return this._rawXML && this._rawXML.parentNode ? new XMLWrapper( this._rawXML.parentNode ) : null;
    if( this.length === 0 ) return null;
    
    return this[ 0 ].parentNode ? ( new XMLWrapper( this[ 0 ].parentNode ) ) : null;
};

/**
 * セレクターにヒットした要素数を返す
 * @alias X.XML.prototype.has
 * @param {string} queryString XML セレクター文字列
 * @return {number}
 */
function XMLWrapper_has( queryString ){
    return !!this.find( queryString ).length;
};

/**
 * <p>X.XML では常に自信を返す
 * <p>X.XMLList ではラップした xml 群から index のものを返す
 * @alias X.XML.prototype.get
 * @param {number} index
 * @return {X.XML} X.XML では自身、X.XMLList では index の X.XML
 */
function XMLWrapper_get( index ){
    if( this.length === 1 ) return this;
    if( this.length === 0 ) return null;
    // 一度発行した XMLWrapper は控えて置いて再発行する。
    if( this._wraps && this._wraps[ index ] ) return this._wraps[ index ];
    if( !this._wraps ) this._wraps = [];
    return this[ index ] ?
        ( this._wraps[ index ] = new XMLWrapper( this[ index ] ) ) :
        null;
};

/**
 * セレクターにヒットした要素の内容を指定されたデータ型で返す。複数要素にヒットした場合、0番目の要素の内容を使用する。
 * '' をセレクタとして渡すとノードの値を返す
 * @alias X.XML.prototype.val
 * @param {string} queryString XML セレクター文字列
 * @param {string} type 'number','int','boolean','string'
 * @return {boolean|number|string} 内容を型変換した値
 */
function XMLWrapper_val( queryString, type ){
    var wrapper, xml, v;

    switch( queryString ){
        case 'number' :
        case 'int' :
        case 'boolean' :
        case 'string' :
        case undefined :
            type = queryString;
            queryString = 0;
    };

    wrapper = queryString ? this.find( queryString ) : this;
    xml     = wrapper.length === 1 ? wrapper._rawXML : wrapper[ 0 ];

    if( !xml ){
        switch( type ){
            case 'number' :
            case 'int' :
                return NaN;
            case 'boolean' :
                return false;
            case 'string' :
                return '';
            default :
                return null;
        };
    };
    
    v = xml.nodeType === 1 ? xml.innerText || xml.text || xml.textContent : xml.nodeValue;
    //xml.toStrign()
    switch( type ){
        case 'number' :
            return parseFloat( v );
        case 'int' :
            return parseFloat( v ) | 0;
        case 'boolean' :
            return !!X_String_parse( v );
        //case 'string' :
        //default :    
    };
    return v || '';
};

/**
 * セレクターにヒットした要素を返す。0～1個の要素がヒットした場合は X.XML を、それ以上の場合は X.XMLList を返す。
 * @alias X.XML.prototype.find
 * @param {string} queryString セレクター文字列
 * @return {X.XML|X.XMLList} 
 */
    function XMLWrapper_find( queryString ){

        var scope     = this.constructor === XMLListWrapper ? this : [ this._rawXML ],
            parents   = scope, // 探索元の親要素 xmlList の場合あり
            ARY_PUSH  = Array.prototype.push,
            ret       = [], // 結果要素
            isXML     = true,
            isMulti   = 1 < scope.length,// 要素をマージする必要がある
            isStart   = true,
            _         = ' ',
            isAll, isNot, hasRoot,
            l, i, n, parsed,
            xmlList, // 一時保存用
            merge, // 要素がコメントノードで汚染されている場合使う
            combinator, selector, name, tagName,
            uid, tmp, xml, filter, key, op, val, toLower, useName,
            links, className, attr, flag;

        // 文字列以外は空で返す
        if( !X_Type_isString( queryString ) ) return XMLListWrapper_0;
        
        xmlList = [];
        
        // 以下、パースと探索
        for( ; queryString.length; ){
            //console.log( 'queryString[' + queryString + ']' );
            
            // 初期化処理
            if( !parsed ){
                parsed = X_Node_Selector__parse( queryString );
                
                if( X_Type_isNumber( parsed ) ){
                    // error
                    return XMLListWrapper_0;
                };
                
                queryString = queryString.substr( parsed[ 0 ] );
                parsed      = parsed[ 1 ];
                
                if( parsed === 5 ){
                    isMulti = true;
                    parents = scope;
                    xmlList && xmlList.length && ARY_PUSH.apply( ret, xmlList );
                    parsed  = null;
                    xmlList = [];
                    isStart = true;
                    continue;
                };
            };
            
            combinator  = parsed[ 0 ];
            selector    = parsed[ 1 ];
            name        = parsed[ 2 ];
            tagName     = selector === 1 ? name : '*';
            isAll       = tagName === '*';
    
            if( !isStart ){
                if( !xmlList.length ){
                    parsed = null;
                    continue;                    
                } else
                if( combinator !== 0 ){
                    parents = xmlList;
                    xmlList = [];
                    //console.log( 'cobinator !== 0 ' + parents.length + ' : ' + xmlList.length );
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
                        for( xml = parents[ i ].firstChild; xml; xml = xml.nextSibling ){
                            if( xml.nodeType === 1 && ( isAll || tagName === xml.tagName ) ) xmlList[ ++n ] = xml;
                        };                
                    };
                    break;
                // + TagName|*
                case 3 :
                    for( ; i < l; ++i ){
                        for( xml = parents[ i ].nextSibling; xml; xml = xml.nextSibling ){
                            if( xml.nodeType === 1 ){
                                if( isAll || tagName === xml.tagName ) xmlList[ ++n ] = xml;
                                break;                                
                            };
                        };                                
                    };
                    break;
                // ~ TagName|*
                case 4 :
                    merge = [];
                    for( ; i < l; ++i ){
                        for( xml = parents[ i ].nextSibling; xml; xml = xml.nextSibling ){
                            if( xml.nodeType === 1 && ( isAll || tagName === xml.tagName ) ){
                                if( merge.indexOf( xml ) !== -1 ){
                                    break;
                                } else {
                                    merge[ merge.length ] = xml;
                                    xmlList[ ++n ] = xml;
                                };
                            };                                    
                        };                                
                    };
                    break;

                // @ 属性ノード
                case 6 :
                    selector = 0;
                    tagName  = '*';
                    for( ; i < l; ++i ){
                        if( xml = parents[ i ].getAttributeNode( name ) ){
                            xmlList[ ++n ] = xml;
                        };
                    };
                    break;
                default :
                    if( combinator === 1 || ( isStart && selector < 7 ) ){
                        //console.log( l + ' > ' + xmlList.length + ' tag:' + tagName );
                        for( ; i < l; ++i ){
                            xml = parents[ i ];
                            xml.childNodes && xml.childNodes.length && XMLWrapper_fetchElements( xmlList, xml, isAll ? null : tagName );
                        };
                        //console.log( l + ' >> ' + xmlList.length + ' tag:' + tagName );
                    };
            };

            isStart = false;

            //alert( 'pre-selector:' + ( xmlList && xmlList.length ) )

            switch( selector ){
                // #, ID
                case 2 :
                    filter = [ 'id', 1, name ]; break;
                // ., class
                case 3 :
                    filter = [ 'class', 3 /*'~='*/, name ]; break;
                // :, 擬似クラス
                case 4 :
                    if( !( filter = XMLWrapper_filter[ name ] ) ){
                        return XMLListWrapper_0;
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
                            filter = [ 'tag', 1, name ]; break;
                        // #, ID
                        case 2 :
                            filter = [ 'id', 1, name ]; break;
                        // ., class
                        case 3 :
                            filter = [ 'class', 3, name ]; break;
                        // :, 擬似クラス
                        case 4 :
                            if( !( filter = XMLWrapper_filter[ name ] ) ){
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
                    xmlList = scope; break;
                /* root
                case 8 :
                    hasRoot = true;
                    xmlList = [ HTML ]; break;
                // link
                case 9 :
                    if( links = document.links ){
                        for( xmlList = [], i = links.length; i; ){
                            xmlList[ --i ] = new X_Node( links[ i ] );
                        };
                    } else {
                        // area[href],a[href]
                    }; */
            };

            if( filter && xmlList.length ){
                // filter.mが関数の場合
                if( filter.m ){
                    xmlList = filter.m(
                        {
                            not : isNot,
                            xml : isXML
                        },
                        xmlList,
                        parsed[ 3 ], parsed[ 4 ]
                    );
                } else
                // filterが関数の場合
                if( X_Type_isFunction( filter ) ){
                    tmp = [];
                    for( i = 0, n = -1; xml = xmlList[ i ]; ++i ){
                        if( ( !!filter( xml ) ) ^ isNot ) tmp[ ++n ] = xml;
                    };
                    xmlList = tmp;
                } else {
                // 属性セレクター
                    tmp = [];
                    key = filter[ 0 ];
                    op  = filter[ 1 ];
                    val = filter[ 2 ];

                    // 通常
                        if( op === 3 ) val = _ + val + _;

                        for( i = 0, n = -1, l = xmlList.length; i < l; ++i ){
                            xml  = xmlList[ i ];
                            attr = xml.getAttribute( key, 2 );
                            flag = attr != null;// && ( !useName || attr !== '' );
                            if( flag && op ){
                                //if( toLower ) attr = attr.toLowerCase();
                                
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
                            if( !!flag ^ isNot ) tmp[ ++n ] = xml;
                        //};
                    };
                    xmlList = tmp;
                };
            };
            filter  = null;
            isNot   = false;
            parsed  = null;
            
            //console.log( '//end :' + ( xmlList && xmlList.length ) );
        };
        //console.log( 'multi:' + ( xmlList && xmlList.length ) );
        
        // tree 順に並び替え、同一要素の排除
        if( isMulti ){
            xmlList && xmlList.length && ARY_PUSH.apply( ret, xmlList );
            l = ret.length;
            if( l === 0 ) return XMLListWrapper_0;
            if( l === 1 ) return new XMLWrapper( ret[ 0 ] );
            
            xmlList = [];
            //merge   = [];
            for( i = 0, n = -1; i < l; ++i ){
                //alert( 'multi:' + i )
                xml = ret[ i ];
                if( xmlList.indexOf( xml ) === -1 ){
                    //merge[ merge.length ] = xml;
                    xmlList[ ++n ] = xml;
                };
            };
            XMLWrapper_sortElementOrder( ret = [], xmlList, this._rawXML.childNodes );
            
            // @
            for( i = 0, l = xmlList.length; i < l; ++i ){
                if( ret.indexOf( xml = xmlList[ i ] ) === -1 ){
                    ret[ ret.length ] = xml;
                };
            };
            
            xmlList = ret;
        };

        return xmlList.length === 1 ? new XMLWrapper( xmlList[ 0 ] ) : new XMLListWrapper( xmlList );
    };

    function XMLWrapper_sortElementOrder( newList, list, xmlList ){
        var l = xmlList.length,
            i = 0,
            j, child, _xmlList;

        for( ; i < l; ++i ){
            child = xmlList[ i ];
            //if( child.nodeType !== 1 ) continue;
            //console.log( child.tagName );
            if( ( j = list.indexOf( child ) ) !== -1 ){
                newList[ newList.length ] = child;
                list.splice( j, 1 );
                if( list.length === 1 ){
                    newList[ newList.length ] = list[ 0 ];
                    list.length = 0;
                    return true;
                };
                if( list.length === 0 ) return true;
            };
            if( ( _xmlList = child.childNodes ) && XMLWrapper_sortElementOrder( newList, list, _xmlList ) ){
                return true;
            };
        };
    };
    
    function XMLWrapper_fetchElements( list, parent, tag ){
        var xmlList = parent.childNodes,
            l      = xmlList.length,
            i      = 0,
            child;

        for( ; i < l; ++i ){
            child = xmlList[ i ];
            if( child.nodeType === 1 ){
                ( !tag || child.tagName === tag ) && ( list[ list.length ] = child );
                //console.log( parent.tagName + ' > ' + child.tagName + ' == ' + tag+ ' l:' + list.length );
                child.childNodes && child.childNodes.length && XMLWrapper_fetchElements( list, child, tag );
            };
        };
    };

    function XMLWrapper_funcSelectorChild( type, flag_all, flags, xmlList ){
        var res      = [],
            flag_not = flags.not,
            i = 0, n = -1, xml, node,
            tagName, tmp;
        for( ; xml = xmlList[ i ]; ++i ){
            tagName = flag_all || xml.tagName;
            tmp     = null;
            if( /* tmp === null && */ type <= 0 ){
                for( node = xml.previousSibling; node; node = node.previousSibling ){
                    if( node.nodeType === 1 && ( flag_all || tagName === node.tagName ) ){
                        tmp = false;
                        break;
                    };
                };
            };
            if( tmp === null && 0 <= type ){
                for( node = xml.nextSibling; node; node = node.nextSibling ){
                    if( node.nodeType === 1 && ( flag_all || tagName === node.tagName ) ){
                        tmp = false;
                        break;
                    };        
                };                        
            };
            if( tmp === null ) tmp = true;
            if( tmp ^ flag_not ) res[ ++n ] = xml;
        };
        return res;
    };
    function XMLWrapper_funcSelectorNth( pointer, sibling, flag_all, flags, xmlList, a, b ){
        var uids     = X_Array_copy( xmlList ),
            res      = [],
            checked  = {},
            flag_not = flags.not,
            i = 0, n = -1,
            c, xml, tmp, node, tagName, uid;

        for( ; xml = xmlList[ i ]; ++i ){
            tmp = checked[ i ];
            if( tmp === undefined ){
                for( c = 0, node = xml.parentNode[ pointer ], tagName = flag_all || xml.tagName; node; node = node[ sibling ] ){
                    if( node.nodeType === 1 && ( flag_all || tagName === node.tagName ) ){
                        ++c;
                        uid = uids.indexOf( node );
                        if( uid === -1 ) uids[ uid = uids.length ] = node;
                        checked[ uid ] = a === 0 ? c === b : (c - b) % a === 0 && (c - b) / a >= 0;
                    };
                };
                tmp = checked[ i ];
            };
            if( tmp ^ flag_not ) res[ ++n ] = xml;
        };
        return res;
    };
    /*
    function XMLWrapper_funcSelectorProp( prop, flag, flags, xmlList ){
        var res = [],
            flag_not = flag ? flags.not : !flags.not,
            i = 0, n = -1, xml;
        for( ; xml = xmlList[ i ]; ++i ){
            if( xml.getAttributeNode( prop ) ^ flag_not ) res[ ++n ] = xml;
        };
        return res;
    }; */

var XMLWrapper_filter = {
    'first-child' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( -1, true, flags, xmlList ); }
    },
    'last-child' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( 1, true, flags, xmlList ); }
    },
    'only-child' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( 0, true, flags, xmlList ); }
    },
    'first-of-type' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( -1, false, flags, xmlList ); }
    },
    'last-of-type' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( 1, false, flags, xmlList ); }
    },
    'only-of-type' : {
        m : function( flags, xmlList ){ return XMLWrapper_funcSelectorChild( 0, false, flags, xmlList ); }
    },
    'nth-child' : {
        m : function( flags, xmlList, a, b ){ return XMLWrapper_funcSelectorNth( 'firstChild', 'nextSibling', true, flags, xmlList, a, b ); }
    },
    'nth-last-child' : {
        m : function( flags, xmlList, a, b ){ return XMLWrapper_funcSelectorNth( 'lastChild', 'previousSibling', true, flags, xmlList, a, b ); }
    },
    'nth-of-type' : {
        m : function( flags, xmlList, a, b ){ return XMLWrapper_funcSelectorNth( 'firstChild', 'nextSibling', false, flags, xmlList, a, b ); }
    },
    'nth-last-of-type' : {
        m : function( flags, xmlList, a, b ){ return XMLWrapper_funcSelectorNth( 'lastChild', 'previousSibling', false, flags, xmlList, a, b ); }
    },
    'empty' : {
        m : function( flags, xmlList ){
            var res = [],
                flag_not = flags.not,
                i = 0, n = -1, xml, tmp, node;
            for( ; xml = xmlList[i]; ++i ){
                tmp = true;
                for( node = xml.firstChild; node; node = node.nextSibling ){
                    if( node.nodeType === 1 || ( node.nodeType === 3 && node.nodeValue ) ){
                        tmp = false;
                        break;
                    };                
                };
                if( tmp ^ flag_not ) res[ ++n ] = xml;
            };
            return res;
        }
    },
    'contains' : {
        m : function( flags, xmlList, arg ){
            var res = [],
                flag_not = flags.not,
                i = 0, n = -1, xml, text = '';

            for( ; xml = xmlList[ i ]; ++i ){
                switch( xml.nodeType ){
                    case 1 :
                        text = xml.innerText || xml.text || xml.textContent;
                        break;
                    //case 2 :
                    case 3 :
                        text = xml.nodeValue;
                        break;
                };
                if ( ( -1 < text.indexOf( arg ) ) ^ flag_not ) res[ ++n ] = xml;        
            };
            return res;
        }
    }
};

/**
 * XML配列を扱う XML 探索用のラッパークラスです
 * @alias X.XMLList
 * @class XMLList XML配列を扱う XML 探索用のラッパークラスです
 * @constructor
 * @extends {X.XML}
 */
function XMLListWrapper( xmlList ){
    var i = 0, l = xmlList ? xmlList.length : 0;
    for( ; i < l; ++i ){
        this[ i ] = xmlList[ i ];
    };
    this.length = l;
};

var XMLListWrapper_0 = new XMLListWrapper();

XMLListWrapper.prototype.length      = 0;
XMLListWrapper.prototype._wraps      = null;
XMLListWrapper.prototype[ 'parent' ] = XMLWrapper_parent;
XMLListWrapper.prototype[ 'has' ]    = XMLWrapper_has;
XMLListWrapper.prototype[ 'get' ]    = XMLWrapper_get;
XMLListWrapper.prototype[ 'val' ]    = XMLWrapper_val;
XMLListWrapper.prototype[ 'find' ]   = XMLWrapper_find;
