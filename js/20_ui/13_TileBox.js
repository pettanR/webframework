var XUI_Layout_Tile = X[ 'UI' ][ 'Layout' ][ 'Tile' ] = XUI_createLayout( {    
    name : 'TileLayout',
    
    overrideAttrsForSelf : {
        selectable  : false,
        role        : [ 0,     XUI_Dirty.CLEAN,  XUI_Attr_USER.UINODE, XUI_Attr_Type.INIT_ONLY | XUI_Attr_Type.LIST, 'none,chrome,container' ],
        childWidth  : [ '8em', XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
        childHeight : [ '8em', XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH | XUI_Attr_Type.PERCENT ],
        gapX        : [ 0,     XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH ],
        gapY        : [ 0,     XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.LENGTH ],
        hCenter     : [ true,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.BOOLEAN ],
        vCenter     : [ true,  XUI_Dirty.LAYOUT, XUI_Attr_USER.LAYOUT, XUI_Attr_Type.BOOLEAN ]
    },
    
    overrideAttrsForChild : {
        left   : false,
        right  : false,
        top    : false,
        bottom : false,
        width  : false,
        height : false
    },
    
    calculate : function( data, isNeedsDetection, x, y, w, h ){
        var attrs   = data.attrObject || data.attrClass.prototype,
            gapX, gapY, childW, childH,
            uinodes, l, i, node,
            _x, _y, _w, _h, numH, numV, n, startX, __x, __y;

        data.preMesure( w, h );
        
        if( isNeedsDetection && ( data.boxWidth === XUI_Attr_AUTO || data.boxHeight === XUI_Attr_AUTO ) ) return;
        
        if( ( uinodes  = data.uinodes ) && ( l = uinodes.length ) ){
            _x      = data.contentL;
            _y      = data.contentT;
            _w      = data.contentWidth;
            gapX    = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.gapX.No ], contentW );
            gapY    = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.gapY.No ], contentH );
            childW  = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childWidth.No ], contentW );
            childH  = XUI_AbstractUINode_calcValue( attrs[ data.usableAttrs.childHeight.No ], contentH );
            numH    = XUI_Attr_FLOOR( ( _w + gapX ) / ( childW + gapX ) );
            numV    = l % numH ? XUI_Attr_FLOOR( l / numH ) + 1 : l / numH;
            _h      = _y + data.contentB + ( childH + gapY ) * numH - gapY;
            
            startX  = attrs[ data.usableAttrs.hCenter.No ] ?
                        ( _w - ( childW + gapX ) * numH - gapX ) / 2 : _x;
            __x     = startX;
            __y     = attrs[ data.usableAttrs.vCenter.No ] && _h <= h ?
                        ( h - _h ) / 2 + _y : _y;
            
            for( i = 0; i < l; ++i ){
                node = uinodes[ i ];
                node.calculate( false, __x, __y, childW, childH );
                
                if( i % numH === numH - 1 ){
                    __x  = startX;
                    __y += childH + gapY;
                } else {
                    __x += childW + gapX;
                };
            };
            
            data.contentHeight = _h;
            
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

/*
X.UI.TileBox = X.UI.Box.presets(
    'TileBox',
    XUI_Layout_Tile,
    {
        gapX    : '0.2em',
        gapY    : '0.2em',
        hCenter : true,
        vCenter : true
    }
);*/

X.UI.TileBox = X.UI.Box.inherits(
    'TileBox',
    X_Class.NONE,
    {
        Constructor : function(){
            var supports;
            
            if( !XUI_TileBox ){
                supports = XUI_Attr_createAttrDef( XUI_Box.prototype.usableAttrs, XUI_Layout_Tile.overrideAttrsForSelf );
                
                XUI_TileBox = XUI_Box.inherits(
                            {
                                layout       : XUI_Layout_Tile,
                                usableAttrs : supports,
                                attrClass    : XUI_Attr_preset( XUI_Box.prototype.attrClass, supports, {
                                        gapX    : '0.2em',
                                        gapY    : '0.2em',
                                        hCenter : true,
                                        vCenter : true
                                    })
                            }
                        );    
            };
            X_Pair_create( this, XUI_TileBox( this, XUI_Layout_Tile, arguments ) );
        }
    });