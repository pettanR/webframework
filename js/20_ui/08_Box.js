
var XUI_Layout_Canvas = X[ 'UI' ][ 'Layout' ][ 'Canvas' ] = XUI_createLayout( {
    name : 'CanvasLayout',
    
    overrideAttrsForSelf : {
        selectable  : false,
        role        : [ 0, XUI_Dirty.CLEAN, XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.LIST, 'none,chrome,container' ],
        
        width       : [ '100%',         XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
        maxWidth    : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
        height      : [ 0,              XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
        maxHeight   : [ XUI_Attr_AUTO, XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ]
    },
    
    overrideAttrsForChild : {
        left   : true,
        top    : true,
        bottom : true,
        right  : true
    },
    
    calculate : function( data, isNeedsDetection, x, y, w, h ){
        var uinodes, l, i, _x, _y, _w, _h, node;

        data.preMesure( w, h );
        
        //console.log( w + ' > ' + data.boxWidth );
        
        //  data.boxWidth と data.boxHeight のどちらかでも Infinity
        if( isNeedsDetection && data.boxWidth + data.boxHeight === XUI_Attr_AUTO ) return false;
        
        _x = data.contentL;
        _y = data.contentT;
        _w = data.contentWidth;
        _h = data.contentHeight;

        if( ( uinodes = data.uinodes ) && ( l = uinodes.length ) ){
            //console.log( _w + ' x ' + _h + ' l:' + l );
            for( i = 0; i < l; ++i ){
                node = uinodes[ i ];
                node.calculate( false, _x, _y, _w, _h );
            };
        } else
        if( data.contentHeight === XUI_Attr_AUTO ){
            data.contentHeight = data.contentHeightMin !== XUI_Attr_AUTO ? data.contentHeightMin : 0;
        };
        
        data.postMesure();

        if( !isNeedsDetection ){
            data.boxX += x;
            data.boxY += y;
        };
        return true;
    }
});


var XUI_Box = XUI_AbstractUINode.inherits(
    'X.UI._Box',
    X_Class.NONE,
    {
        usableAttrs     : XUI_Attr_createAttrDef( XUI_AbstractUINode.prototype.usableAttrs, XUI_Layout_Canvas.overrideAttrsForSelf ),
        
        layout          : null,
        uinodes         : null,
        xnodes          : null,
        
        hitChildData    : null,
        pointerChildren : true,
        through         : false,

        scrollXEm       : 0,
        scrollYEm       : 0,

        Constructor : function( user, layout, args ){
            var i = 0,
                l = args && args.length,
                j = -1,
                uinodes, arg, _data, attrs, attrDef, p;
            
            //if( !args.length ) args = [ args ];
            
            if( !user[ 'instanceOf' ]( X.UI.Box ) ){
                //throw new Error( 'Box を継承したインスタンスだけが _Box のオーナーになれます' );
            };
            
            this.User   = user;
            
            // TODO デフォルトの attr 指定の中から XNODE に指定するものを集めて適用。
            this.xnode  = X_Doc_create( 'div' );
            
            // すでに定義されていればそちらを採用
            // usableAttrs や attrClass が、layout を元に上書きされているため
            this.layout = this.layout || layout;
            
            for( ; i < l; ++i ){
                arg = args[ i ];
                if( arg[ 'instanceOf' ] && arg[ 'instanceOf' ]( X.UI.AbstractUINode ) ){
                    _data = X_Pair_get( arg );
                    if( !uinodes ) this.uinodes = uinodes = [];
                    uinodes[ ++j ] = _data;
                    if( _data.parent ){
                        //throw new Error( 'インスタンスはすでに親に追加されています ' + arg );
                    };
                } else
                if( X_Type_isObject( arg ) ){
                    if( attrs ){
                        attrs = X_Class_override( attrs, arg );
                    } else {
                        attrs = arg;
                    };
                } else {
                    //throw new Error( 'AbstractUINode を継承したインスタンスを渡してください ' + arg );
                };
            };
            
            for( p in attrs ){
                //if( X_EMPTY_OBJECT[ p ] ) continue;
                ( attrDef = this.usableAttrs[ p ] ) && this.setAttr( p, attrDef, attrs[ p ] );
            };
        },
    /* Rellay */
        initialize : function( root, rootData, parent, parentData ){
            var uinodes = this.uinodes,
                l       = uinodes && uinodes.length, i = 0;
            
            for( ; i < l; ++i ){
                uinodes[ i ].initialize( root, rootData, this.User, this );
            };
            
            XUI_AbstractUINode.prototype.initialize.apply( this, arguments );
        },
        
        addToParent : function( parentXNode ){
            var uinodes = this.uinodes,
                l       = uinodes && uinodes.length,
                i = 0;

            for( ; i < l; ++i ){
                uinodes[ i ].addToParent( this.xnode );
            };
            
            XUI_AbstractUINode.prototype.addToParent.apply( this, arguments );
        },
        
    /* Rellay */
        creationComplete : function(){
            var uinodes = this.uinodes,
                l       = uinodes && uinodes.length,
                i = 0;
                
            for( ; i < l; ++i ){
                uinodes[ i ].creationComplete();
            };
            
            XUI_AbstractUINode.prototype.creationComplete.apply( this, arguments );
        },
        
        calculate : function( isNeedsDetection, x, y, w, h ){
            var ret = this.layout.calculate( this, isNeedsDetection, x, y, w, h );            
            this.phase = 4;
            return ret;
        },
    
        updateLayout : function(){
            var uinodes = this.uinodes, i, l;

            if( uinodes && ( l = uinodes.length ) ){
                for( i = 0; i < l; ++i ){
                    uinodes[ i ].updateLayout();
                };    
            };
            XUI_AbstractUINode.prototype.updateLayout.call( this );
        },
        
        capcher : function( x, y ){
            var uinodes, child, _x, _y, hit, i;
            
            if( this.pointerDisabled ) return false;

            delete this.hitChildData;
            x -= this.boxX;
            y -= this.boxY;
            if( this.pointerChildren && ( uinodes = this.uinodes ) && ( i = uinodes.length ) ){
                _x = x - this.scrollXEm;
                _y = y - this.scrollYEm;
                for( ; i; ){
                    child = uinodes[ --i ];
                    if( !child.pointerDisabled && child.boxX <= _x && _x < child.boxX + child.boxWidth && child.boxY <= _y && _y < child.boxY + child.boxHeight && child.capcher( _x, _y ) ){
                        //console.log( 'hit child ' + _x + ' ' + _y + ' boxX:' + child.boxX + ' boxY:' + child.boxY );
                        this.hitChildData = child;
                        break;
                    };
                };
            };
            if( this.through ){
                this.hitChildData && !this.hovering && ( XUI_UINODES_HOVER[ XUI_UINODES_HOVER.length ] = this );
                return !!this.hitChildData;
            };
            hit = 0 <= x && x < this.boxWidth && 0 <= y && y < this.boxHeight;
            ( this.hitChildData || hit ) && !this.hovering && ( XUI_UINODES_HOVER[ XUI_UINODES_HOVER.length ] = this );
            if( hit && this.hitChildData === null ){
                XUI_uinodeTarget = this;
            };
            return hit || !!this.hitChildData;
        },
        
        addAt : function( index, _uinodes ){
            //console.log( '# AddAt ' + this.phase )
            var uinodes = this.uinodes || ( this.uinodes = [] ),
                num     = uinodes.length,
                p1      = 1 <= this.phase,
                p2      = 2 <= this.phase,
                p3      = 3 <= this.phase,
                i       = 0,
                _p1, _p2,
                l, data;

            //console.log( '### AddAt ' + this.phase )
            for( l = _uinodes.length; i < l; ++i ){
                data = X_Pair_get( _uinodes[ i ] );
                _p1  = p1 && data.phase < 1;
                _p2  = p2 && data.phase < 2;
                _p1 && data.initialize( this.root, this.rootData, this.User, this );
                if( index < num ){
                    _p2 && uinodes[ index + i ].xnode[ 'prev' ]( data.xnode );
                    _p2 && data.addToParent( this.xnode );
                    uinodes.splice( index + i, 0, data );
                } else {
                    _p2 && data.addToParent( this.xnode );
                    uinodes[ uinodes.length ] = data;
                };
                p3 && data.phase < 3 && data.creationComplete();
            };
            
            console.log( 'addAt レイアウト 4? ' + this.phase );
            4 <= this.phase && this.rootData.reserveCalc();
        },
        
        remove : function( _uinodes ){
            //console.log( '# AddAt ' + this.phase )
            var uinodes = this.uinodes,
                i       = _uinodes.length,
                n, data;

            //console.log( '### AddAt ' + this.phase )
            for( ; i; ){
                data = X_Pair_get( _uinodes[ --i ] );
                if( ( n = uinodes.indexOf( data ) ) !== -1 ){
                    uinodes.splice( n, 1 );
                    data._remove();
                };
            };
            4 <= this.phase && this.rootData.reserveCalc();
        },
        
        removeAt : function( from, length ){
            var uinodes = this.uinodes,
                i       = uinodes.length,
                to      = from + ( X_Type_isNumber( length ) && 1 <= length ? length : 1 ),
                node;
            for( ; i; ){
                node = uinodes[ --i ];
                if( from <= i && i < to ){
                    uinodes.splice( i, 1 );
                    node._remove();
                };
            };
            4 <= this.phase && this.rootData.reserveCalc();
        },
        
        _remove : function(){
            var uinodes = this.uinodes,
                i       = uinodes.length;
            for( ; i; ){ uinodes[ --i ]._remove(); };
                    
            switch( this.phase ){
                case 4:
                case 3:
                case 2:
                    this.xnode[ 'remove' ]();
                case 1:
                    delete this.root;
                    delete this.rootData;
                    delete this.parent;
                    delete this.parentData;
            };
            delete this.phase;
        }
    }
);

X.UI.Box = X.UI.AbstractUINode.inherits(
    'Box',
    X_Class.NONE,
    {
        Constructor : function(){
            X_Pair_create( this, XUI_Box( this, XUI_Layout_Canvas, arguments ) );
        },
        
        add : function( /* node, node, node ... */ ){
            X_Pair_get( this ).addAt( this.numNodes() + 1, X_Array_copy( arguments ) );
            return this;
        },
        addAt : function( index /* , node , node, node ... */ ){
            var nodes;
            if( index < 0 ) index = 0;
            nodes = X_Array_copy( arguments );
            X_Pair_get( this ).addAt( nodes.shift(), nodes );
            return this;
        },
        remove : function( /* node, node, node ... */ ){
            X_Pair_get( this )[ 'remove' ]( X_Array_copy( arguments ) );
            return this;
        },
        removeAt : function( from, length ){
            X_Pair_get( this ).removeAt( from, length );
            return this;
        },
        getNodesByClass : function( klass ){
            var ret     = [],
                uinodes = X_Pair_get( this ).uinodes,
                i, l, node;
            if( !uinodes || uinodes.length === 0 ) return ret;
            for( i = 0, l = uinodes.length; i < l; ++i ){
                node = uinodes[ i ].User;
                if( node[ 'instanceOf' ]( klass ) ) ret[ ret.length ] = node;
            };
            return ret;
        },
        getFirstChild : function(){
            return this.getNodeAt( 0 );
        },
        getLastChild : function(){
            var uinodes = X_Pair_get( this ).uinodes;
            return uinodes && uinodes.length && uinodes[ uinodes.length - 1 ].User || null;
        },
        getNodeAt : function( index ){
            if( index < 0 ) return null;
            var uinodes = X_Pair_get( this ).uinodes;
            return uinodes && uinodes[ index ].User || null;
        },
        numNodes : function(){
            var uinodes = X_Pair_get( this ).uinodes;
            return uinodes && uinodes.length || 0;
        },
        
        clone : function( opt_cloneListener ){
            var clone   = X.UI.AbstractUINode.prototype.clone.call( this,  opt_cloneListener ),
                uinodes = X_Pair_get( this ).uinodes,
                i       = 0,
                l       = uinodes && uinodes.length,
                copies  = [];
            
            for( ; i < l; ++i ){
                copies[ i ] = uinodes[ i ].clone( opt_cloneListener );
            };

            return l ? clone.add.apply( clone, copies ) : clone;
        }
    }
);

/*
 * layout が設定されている Box のサブクラスに対して、layout を指定できない.
 * 
 */
X.UI.Box.presets = function(){
    var args   = arguments,
        i      = 0,
        l      = args.length,    
        shadow = X_Class_getClassDef( this ).privateClass,
        layout = shadow.prototype.layout,
        arg, attrs, supports, klass, klassDef, privateKlass, boxName;
            
    for( ; i < l; ++i ){
        arg = args[ i ];
        if( !arg ) continue;
        // レイアウトの preset ができるのは layout が未定義な Box だけ
        if( !shadow.prototype.layout && arg[ 'instanceOf' ] && arg[ 'instanceOf' ]( XUI_LayoutBase ) ){
            layout = arg;
        } else
        if( ( klassDef = X_Class_getClassDef( arg ) ) && klassDef.isPrivate ){
            privateKlass = arg;
            layout = privateKlass.prototype.layout;
        } else
        if( X_Type_isObject( arg ) ){
            if( attrs ){
                X_Class_override( attrs, arg, true );
            } else {
                attrs = arg;
            };
        } else
        if( X_Type_isString( arg ) ){
            boxName = arg;
        };
    };
    
    if( privateKlass ){
        /*
         * スーパークラスの属性定義リストをレイアウトの持つ属性定義で上書きした新しい属性定義リストを作る。
         */
        supports = XUI_Attr_createAttrDef( privateKlass.prototype.usableAttrs, layout.overrideAttrsForSelf );
        
        klass = this.inherits( privateKlass );
        privateKlass.prototype.usableAttrs = supports;
        privateKlass.prototype.attrClass    = XUI_Attr_preset( privateKlass.prototype.attrClass, supports, attrs );
    } else {
        supports = XUI_Attr_createAttrDef( shadow.prototype.usableAttrs, layout.overrideAttrsForSelf );
        
        klass = this.inherits(
            boxName,
            shadow.inherits(
                {
                    layout       : layout,
                    usableAttrs : supports,
                    attrClass    : XUI_Attr_preset( shadow.prototype.attrClass, supports, attrs )
                }
            )
        );        
    };

    klass.presets = this.presets || X.UI.Box.presets;
    
    return klass;
};
