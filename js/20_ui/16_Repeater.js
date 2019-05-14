var X_UI_Repeater_SUPPORT_ATTRS = {
        dataSource   : [ null, XUI_Dirty.LAYOUT, XUI_Attr_USER.UINODE, XUI_Attr_Type.OBJECT ],
        itemRenderer : [ null, XUI_Dirty.LAYOUT, XUI_Attr_USER.UINODE, XUI_Attr_Type.OBJECT ]
};

var XUI_Repeater = XUI_Box.inherits(
    '_Repeater',
    X_Class.NONE,
    {
        layout           : XUI_Layout_Vertical,
        
        dataSource       : null, // Array.<object>, Array.<ItemData>
        
        itemRenderer     : null,
        
        itemNodes        : null,

        itemHeightLast   : 0,
        itemHeightLastEM : 0,
        
        Constructor : function( user, dataSource, itemRenderer, attr ){
            this.Super( user, null, [ attr ] );
            this.dataSource   = dataSource;
            this.itemRenderer = itemRenderer;
            this.itemNodes    = [];
            this.__item__     = X_Pair_get( itemRenderer );
        },
        
        initialize : function(){
            XUI_AbstractUINode.prototype.initialize.apply( this, arguments );
        },
        
        /*
         * ここに来るのは、初描画とリサイズ
         */
        calculate : function( isNeedsDetection, x, y, allowedW, allowedH ){
            var dataSource = this[ 'dataSource' ];

            if( allowedW + allowedH === XUI_Attr_AUTO ) return false;
            
            this.preMesure( allowedW, allowedH );
            
            if( dataSource && dataSource.length ){
                this.updateItemRenderer( this.contentWidth, allowedH );
            } else
            if( this.contentHeight === XUI_Attr_AUTO ){
                this.contentHeight = this.contentHeightMin !== XUI_Attr_AUTO ? this.contentHeightMin : 0;
            };
            
            this.postMesure();
    
            if( !isNeedsDetection ){
                this.boxX += x;
                this.boxY += y;
            };
            return true;
        },
        
        handleEvent : function( e ){
            switch( e.type ){

            };
        },
        
        updateItemRenderer : function( _w, _h ){
            var itemNodes  = this.itemNodes,
                attrs      = this.attrObject || this.attrClass.prototype,
                gapY       = XUI_AbstractUINode_calcValue( attrs[ this.usableAttrs.gapY.No ], _w ),
                dataSource = this[ 'dataSource' ],
                renderer   = this[ 'itemRenderer' ],
                l          = dataSource.length,
                itemH      = this.itemHeightLastEM,
                i = 0, data, node, _y = 0, last, n;
            
            for( ; i < l; ++i ){
                if( !( data = itemNodes[ i ] ) ){
                    node = renderer.clone( true );
                    this.addAt( i, [ node ] );
                    data = itemNodes[ i ] = X_Pair_get( node );
                    // init -> addToParent -> creationComplete
                };
                data.setItemData( dataSource[ i ] );
                
                data.calculate( false, 0, _y, _w, _h );
                _y += ( itemH || data.boxHeight ) + gapY;
                
                // 一番最初のループ。ここでページあたりのアイテム数を計算
                if( !itemH && i === 0 ){
                    itemH = _y - gapY;
                    this.itemHeightLastEM = itemH;
                    this.itemHeightLast   = itemH * X_ViewPort_baseFontSize;
                };
            };
            
            for( l = itemNodes.length; i < l; ++i ){
                // itemNodes[ i ] hide
            };
            
            // TODO contentHeight は attr を無視する -> 未表示領域につくるアイテム数 GPU の有無で変わる
            this.contentHeight = l * ( itemH + gapY ) - gapY;
        },
        
        onPropertyChange : function( name, newValue ){
            var itemNodes, i, l, uinode, dataList, from;
            
            switch( name ){
                case 'itemRenderer' :
                    for( itemNodes = this.itemNodes, i = itemNodes && itemNodes.length; i; ){
                        itemNodes[ --i ][ 'kill' ]();
                    };
                    
                case 'dataSource' :
                    if( itemNodes = this.itemNodes ){
                        i = itemNodes.length;
                        l = this[ 'dataSource' ].length;
                        while( l < i ){
                            itemNodes[ --i ][ 'kill' ]();
                            itemNodes.length = i;
                        };                        
                    };

                    
                    break;
            };
        }
    }
);

X.UI.Repeater = X.UI.Box.inherits(
    'Repeater',
    X_Class.NONE,
    {
        Constructor : function( dataSource, itemRenderer ){
            var supports;
            
            if( XUI_Repeater.prototype.usableAttrs === XUI_Box.prototype.usableAttrs ){
                supports = XUI_Attr_createAttrDef( XUI_Attr_Support, X_UI_Repeater_SUPPORT_ATTRS );
                XUI_Repeater.prototype.usableAttrs = supports = XUI_Attr_createAttrDef( supports, XUI_Layout_Vertical.overrideAttrsForSelf );
        
                XUI_Repeater.prototype.attrClass   = XUI_Attr_preset( XUI_Box.prototype.attrClass, supports );
            };
            
            // dataProvider
            // itemBase parent に追加されている uinode は不可
            // minHeight=300% height=auto
            X_Pair_create( this,
                XUI_Repeater(
                    this,
                    dataSource, itemRenderer,
                    {
                        name      : 'ScrollBox-Scroller',
                        role      : 'container',
                        width     : 'auto',
                        minWidth  : '100%',
                        height    : 'auto',
                        minHeight : '100%',
                borderColor : 0x252527,
                borderWidth : [ 0.15, 0, 0 ],
                borderStyle : 'solid',
                height      : 'auto',
                bgColor     : 0x444643,
                gapY        : 0.15
                    }));
        },
        
        getItemDataAt : function(){
            
        },
        
        add : function( /* node, node, node ... */ ){
        },
        addAt : function( index /* , node , node, node ... */ ){
        },
        remove : function( /* node, node, node ... */ ){
        },
        removeAt : function( from, length ){
        },
        getNodesByClass : function( klass ){
        },
        getFirstChild : function(){
        },
        getLastChild : function(){
        },
        getNodeAt : function( index ){
        },
        numNodes : function(){
            var uinodes = X_Pair_get( this ).uinodes;
            return uinodes && uinodes.length || 0;
        }

    }
);
