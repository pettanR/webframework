var X_UI_Text_SUPPORT_ATTRS = {
        content   : [ '' , XUI_Dirty.CONTENT, XUI_Attr_USER.UINODE, XUI_Attr_Type.STRING ],
        bgColor   : [ NaN, XUI_Dirty.PAINT,  XUI_Attr_USER.XNODE,  XUI_Attr_Type.COLOR ]
},

X_UI_Text_usableAttrs = XUI_Attr_createAttrDef( XUI_AbstractUINode.prototype.usableAttrs, X_UI_Text_SUPPORT_ATTRS );

var XUI_Text = XUI_AbstractUINode.inherits(
    '_Text',
    X_Class.NONE,
    {
        content     : '',
        
        usableAttrs : __textAttrs = X_UI_Text_usableAttrs,
        
        attrClass   : XUI_Attr_preset( XUI_AbstractUINode.prototype.attrClass,  X_UI_Text_usableAttrs ),
        
        Constructor : function( user, content ){
            if( !( user[ 'instanceOf' ]( X.UI.Text ) ) ){
                alert( 'Text を継承したインスタンスだけが _Text のオーナーになれます' );
            };
            this.User  = user;
            this.xnode = X_Doc_create( 'div' );
            
            if( content != null ){
                this.content = '' + content;
            };
        },
        
        creationComplete : function(){
            if( X_Type_isString( this.content ) && this.content ){
                this.xnode[ 'text' ]( this.content );
                this.dirty   = XUI_Dirty.CONTENT;
            };
            
            XUI_AbstractUINode.prototype.creationComplete.apply( this, arguments );            
        },
        
        setContent : function( v ){
            if( this.content !== v ){
                this.content = v;
                this.xnode && this.xnode[ 'text' ]( v );
                this.rootData.reserveCalc();
                if( this.dirty < XUI_Dirty.CONTENT ) this.dirty = XUI_Dirty.CONTENT;
            };
            return this;
        },
        
        setItemData : function( itemData ){
            if( this.itemData === itemData ) return;
            
            XUI_AbstractUINode.prototype.setItemData.apply( this, arguments );
            
            if( X_Type_isObject( itemData = this.itemData ) && itemData[ this.dataFeild ] != null ){
                this.setContent( '' + itemData[ this.dataFeild ] );
            };
        }
    }
);

X.UI.Text = X.UI.AbstractUINode.inherits(
    'Text',
    X_Class.NONE,
    {
        Constructor : function( opt_content, opt_attrObj ){
            X_Pair_create( this, XUI_Text( this, opt_content ) );

            X_Type_isObject( opt_attrObj = opt_attrObj || opt_content ) && this[ 'attr' ]( opt_attrObj );
        },
        content : function( v ){
            var data = X_Pair_get( this ),
                content = data.content;
            
            if( v === undefined ){
                return content;
            };
            v += '';
            content !== v && data.setContent( v );
            return this;
        }
    }
);