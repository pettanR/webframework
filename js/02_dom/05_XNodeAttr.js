var X_Node_Attr_noValue = {
    checked  : 1,
    compact  : 1,
    declare  : 1,
    defer    : 1,
    disabled : 1,
    ismap    : 1,
    multiple : 1,
    nohref   : 1,
    noresize : 1,
    noshade  : 1,
    nowrap   : 1,
    readonly : 1,
    selected : 1
},
X_Node_Attr_renameForDOM = {
    'class'          : 'className',
    accesskey        : 'accessKey',
    'accept-charset' : 'acceptCharset',
    bgcolor          : 'bgColor',
    cellpadding      : 'cellPadding',
    cellspacing      : 'cellSpacing',
    'char'           : 'ch',
    charoff          : 'chOff',
    codebase         : 'codeBase',
    codetype         : 'codeType',
    colspan          : 'colSpan',
    datetime         : 'dateTime',
    'for'            : 'htmlFor',
    frameborder      : 'frameBorder',
    'http-equiv'     : 'httpEquiv',
    ismap            : 'isMap',
    longdesc         : 'longDesc',
    maxlength        : 'maxLength',
    nohref           : 'noHref',
    readonly         : 'readOnly',
    rowspan          : 'rowSpan',
    tabindex         : 'tabIndex',
    usemap           : 'useMap',
    valuetype        : 'valueType',
    checked          : 'defaultChecked'
},

X_Node_Attr_HAS_VALUE = {
    INPUT    : true,
    TEXTAREA : true,
    SELECT   : true,
    BUTTON   : true,
    OBJECT   : true,
    PARAM    : true // FlashVars が flash 側から書き換えられるケースがある??
},

// <input type=button,hidden,submit,reset,radio,checkbox> の場合、value の値はユーザーで変えることはない
// <input type=text,password,file> はユーザーによって常に変更される HTML5 ではこれにさらにいろいろ加わる
X_Node_Attr_STATIC_VALUE_TYPES = {
    button   : true,
    hidden   : true,
    submit   : true,
    reset    : true,
    radio    : true,
    checkbox : true
},

// 自由な内容が入るため、参照文字への変換が必要
X_Node_Attr_toChrReferance = {
    value : true,
    title : true,
    alt   : true
},

X_Node_Attr_renameForTag = {};
    // http://nanto.asablo.jp/blog/2005/10/29/123294
    // checked -> defaultChecked
    // 動的に生成した input 要素を文書ツリーに挿入する前に設定した checked 属性は反映されず、defaultChecked だと反映される
    // ロードイベントを拾うために、要素生成時にネットワーク関連の属性を設定しない。
    //  -> src (img, iframe, ), link の href, <param name="movie" src=>
    // 
function X_Node_Attr_objToAttrText( that, skipNetworkForElmCreation ){
    var obj     = that[ '_attrs' ],
        noValue = X_Node_Attr_noValue,
        attrs   = [ '' ], // 先頭にスペース
        plain   = X_EMPTY_OBJECT,
        n = 0, k, check;

    if( skipNetworkForElmCreation ){
        delete that[ '_newAttrs' ];
        // このあとで _newAttr にネットワーク系の属性を控える, attrText には加えない
    } else {
        that[ '_flags' ] &= ~X_NodeFlags_OLD_ATTRTEXT;
        // 完全な attrText
    };

    if( !obj ){ // Opera7
        delete that[ '_attrText' ];
        return '';
    };

    for( k in obj ){
        if( plain[ k ] ) continue;
        
        if( skipNetworkForElmCreation ){
            check = false;
            switch( that[ '_tag' ] + k ){
                case 'PARAMvalue' :
                    check = obj[ 'name' ] !== 'movie';
                case 'INPUTsrc'  :
                    check = check || ( obj[ 'type' ] !== 'image' );
                case 'LINKhref' :
                    check = check || ( obj[ 'rel' ] !== 'stylesheet' );
                    
                    if( !check ) break;

                case 'IMGsrc'     :
                case 'IFRAMEsrc'  :
                case 'FRAMEsrc'   :
                case 'SCRIPTsrc'  :
                case 'EMBEDsrc'   :
                case 'OBJECTdata' :
                case 'BGSOUNDsrc' :
                case 'APPLETcode' :
                //case 'AUDIOsrc' :
                //case 'VIDEOsrc' :
                    if( !that[ '_newAttrs' ] ) that[ '_newAttrs' ] = {};
                    that[ '_newAttrs' ][ k ] = obj[ k ];
                    continue;
            };
        };

        attrs[ ++n ] = noValue[ k ] ? k : [
            k, '="',
            X_Node_Attr_toChrReferance[ k ] ? X_String_toChrReferanceForHtmlSafety( obj[ k ] ) : obj[ k ],
            '"' ].join( '' );
    };
    
    if( 0 < n ){
        return that[ '_attrText' ] = attrs.join( ' ' );
    };
    delete that[ '_attrText' ];
    return '';
};

(function( renameForDOM, renameForTag ){
    var k;
    for( k in renameForDOM ){
        //if( X_EMPTY_OBJECT[ k ] ) continue;
        renameForTag[ renameForDOM[ k ] ] = k;
    };
})( X_Node_Attr_renameForDOM, X_Node_Attr_renameForTag );


/**
 * 属性の getter と setter。onclick等はできないので listen, listenOnce を使うこと。http://nanto.asablo.jp/blog/2005/10/29/123294
 * @alias Node.prototype.attr
 * @param {string|object} [nameOrObj] 属性名、または追加する属性のハッシュ
 * @param {string|number} [value=] 属性の値
 * @return {Node|string|number} getter の場合は値を、setter の場合は自身を返す。(メソッドチェーン)
 * @example // getter
 * node.attr( 'tagName' ) === 'DIV';
 * // setter - 1
 * node.attr( { src : url, width : 100, height : 100 } );
 * // setter - 2
 * node.attr( 'src', url );
 */
function X_Node_attr( nameOrObj /* v */ ){
    var attrs = this[ '_attrs' ], tag = this[ '_tag' ], newAttrs, f, k, elm, v;
    
    if( nameOrObj && X_Type_isObject( nameOrObj ) ){
        if( !tag ) return this;
        
        attrs || ( attrs = this[ '_attrs' ] = {} );
        newAttrs = this[ '_newAttrs' ] || ( this[ '_newAttrs' ] = {} );
        
        for( k in nameOrObj ){
            //if( X_EMPTY_OBJECT[ k ] ) continue;
            if( X_Node_Attr_setAttr( this, attrs, newAttrs, k, nameOrObj[ k ] ) === true ) f = true;
        };
        if( f ){
            delete this[ '_attrText' ];
            this[ '_flags' ] |= X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT;
            this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        };
        return this;
    } else
    if( 1 < arguments.length ){
        if( !tag ) return this;
        
        // setter
        if( X_Node_Attr_setAttr( this, attrs || ( this[ '_attrs' ] = {} ), this[ '_newAttrs' ] || ( this[ '_newAttrs' ] = {} ), nameOrObj, arguments[ 1 ] ) === true ){
            delete this[ '_attrText' ];
            this[ '_flags' ] |= X_NodeFlags_DIRTY_ATTR | X_NodeFlags_OLD_ATTRTEXT;
            this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
        };
        return this;
    } else
    if( X_Type_isString( nameOrObj ) ){
        if( !tag ) return;
        
        // getter
        switch( nameOrObj ){
            case 'id' :
                return this[ '_id' ];
            case 'class' :
            case 'className' :
                return this[ '_className' ];
            case 'tag' :
            case 'tagName' :
                return tag;
            case 'style' :
            case 'cssText' :
                return this[ 'cssText' ]();

            case 'src' : // src は遷移して変化する, name も?
                if( tag !== 'IFRAME' ) break;
                if( this[ '_newAttrs' ] && X_Object_inObject( nameOrObj, this[ '_newAttrs' ] ) ) return this[ '_newAttrs' ][ nameOrObj ];
                if( elm = X_UA_DOM.IE4 ? this[ '_rawObject' ] || X_Node__ie4getRawNode( this ) : this[ '_rawObject' ] ){
                    if( !attrs ) attrs = this[ '_attrs' ] = {};
                    return attrs[ nameOrObj ] = elm[ nameOrObj ]; // getAttribute( nameOrObj )?
                };
                break;

            case 'selected' :
                // kquery.js : safariのバグ対策
                // if ($.browser.safari && key === "selected" && tmp) tmp.selectedIndex;
                // 親ノードの selectedIndex の getter を呼んでおくと値が正しくなる、ということ?( by itozyun )
                if( X_UA.WebKit && ( elm = this[ '_rawObject' ] ) ){
                    elm.parentNode && elm.selectedIndex;
                };
            case 'value' :
                if( tag === 'INPUT' && X_Node_Attr_STATIC_VALUE_TYPES[ attrs[ 'type' ] ] ) break;
            case 'checked' :
            case 'disabled' :
            case 'selectedIndex' :
                if( X_Node_Attr_HAS_VALUE[ tag ] ){
                    if( this[ '_newAttrs' ] && X_Object_inObject( nameOrObj, this[ '_newAttrs' ] ) ) return this[ '_newAttrs' ][ nameOrObj ];
                    if( elm = X_UA_DOM.IE4 ? this[ '_rawObject' ] || X_Node__ie4getRawNode( this ) : this[ '_rawObject' ] ){
                        if( !attrs ) attrs = this[ '_attrs' ] = {};
                        
                        if( tag === 'TEXTAREA' && nameOrObj === 'value' && ( X_UA.Trident || X_UA.TridentMobile ) < 9 ){
                            return attrs[ nameOrObj ] = X_Node_Attr_getValueForIE( elm );
                        };
                        return attrs[ nameOrObj ] = elm[ nameOrObj ]; // getAttribute( nameOrObj )?
                    };
                };
                break;
        };
        return attrs && attrs[ X_Node_Attr_renameForTag[ nameOrObj ] || nameOrObj ];
    };
};


        // ie8- 用に改行文字が \n の場合、 \r\n に変換しておく <- fromawork 内に移動
        // http://qiita.com/hanoopy/items/71456afe32f207369d24
function X_Node_Attr_getValueForIE( elm ){
    // console.log( elm[ nameOrObj ].length + ' -> ' + elm[ nameOrObj ].split( '\r' ).join( '' ).length );
    // IE は改行文字が /r/n になるがこれを /n に変換
    return elm.value.split( '\r' ).join( '' );
};

function X_Node_Attr_setAttr( that, attrs, newAttrs, name, v ){
    switch( name ){
        case 'ns' :
        case 'NS' :
            if( v === 'svg' || v === 'SVG' ){
                that[ '_flags' ] |= X_NodeFlags_IS_SVG;
            };
            if( v === 'vml' || v === 'VML' ){
                that[ '_flags' ] |= X_NodeFlags_IS_VML;
            };
            return;

        // case 'type' : TODO IE は input, button, object に対して type の再設定が出来ない _state が要素生成済なら不可
        case 'UID' :
        case 'tag' :
        case 'tagName' :
            return;
        case 'id' :
            v = ( v !== 'ie4uid' + that[ '_uid' ] ) ? v : undefined;
            // TODO unique の check
            if( v !== that[ '_id' ] ){
                that[ '_id' ] = v;
                that[ '_flags' ] |= X_NodeFlags_DIRTY_ID;
                that[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
            };
            return;
        case 'class' :
        case 'className' :
            return that[ 'className' ]( v );
        case 'style' :
        case 'cssText' :
            return that[ 'cssText' ]( v );
        case 'text' :
            return that[ 'text' ]( v );
        case 'html' :
            return that[ 'html' ]( v );
    };
    // debug
    if( X_IS_DEV && !X_TEMP.X_Dom_useBuilder && name.indexOf( 'on' ) === 0 ){ // TreeBuilder 中は許可する
        X_error( 'X.Node.attr : xnode.attr(' + name + ') is wrong, Use xnode.listen() & xnode.unlisten().' );
        return;
    };

    name = X_Node_Attr_renameForTag[ name ] || name;
    if( attrs[ name ] === v ) return;

    if( v == null ){
        newAttrs[ name ] = undefined;
        if( X_Object_inObject( name, attrs ) ) delete attrs[ name ];
    } else {
        newAttrs[ name ] = attrs[ name ] = v;
    };
    return true;
};

