var XUI_ChromeBox = XUI_Box.inherits(
    '_ChromeBox',
    X_Class.NONE,
    {
        chromeNodes   : null,
        containerNode : null,
        
        Constructor : function( user, layout, args ){
            var uinodes, i, l, node, after, index = 0;

            this[ 'Super' ]( user, layout, args );

            uinodes = this.uinodes;
            l = i   = uinodes.length;

            for( ; i; ){
                node = uinodes[ --i ];
                if( node.role === 3 ){
                    if( this.containerNode ){
                        //throw new Error( 'ContainerNode　が複数設定されています！ContainerNode はクロームボックスにひとつ、生成時に設定できます ' + node );
                    };
                    this.containerNode  = node.User;
                    this._containerNode = node;
                } else {
                    if( !this.chromeNodes ) this.chromeNodes = [];
                    this.chromeNodes[ this.chromeNodes.length ] = node;
                };
            };
            if( !this.containerNode ){
                //throw new Error( 'ContainerNode が設定されてい\ません！ContainerNode はクロームボックスにひとつ、生成時に設定できます ' );
            };

            for( i = 0, l = args.length; i < l; ++i ){
                node = args[ i ];
                if( node === this.containerNode ){
                    after = true;
                    index = 0;
                };
                if( node[ 'instanceOf' ] && node[ 'instanceOf' ]( X_Node ) ){

                };
            };
        }
    }
);

X.UI.ChromeBox = X.UI.Box.inherits(
    'ChromeBox',
    X_Class.NONE,
    {
        Constructor : function(){
            X_Pair_create( this, XUI_ChromeBox( this, XUI_Layout_Canvas, arguments ) );
        },
        add : function( /* node, node, node ... */ ){
            X_Pair_get( this ).containerNode.addAt( this.numNodes(), X_Array_copy( arguments ) );
            return this;
        },
        addAt : function( index /* , node, node, node ... */ ){
            var nodes;
            if( index < 0 ) index = 0;
            nodes = X_Array_copy( arguments );
            X_Pair_get( this ).containerNode.addAt( nodes.shift(), nodes );
            return this;
        },
        remove : function( node /* , node, node ... */ ){
            X_Pair_get( this ).containerNode.remove( arguments );
            return this;
        },
        removeAt : function( from, length ){
            X_Pair_get( this ).containerNode.removeAt( from, length );
            return this;
        },
        getNodesByClass : function( klass ){
            return X_Pair_get( this ).containerNode.User.getNodesByClass( klass );
        },
        getFirstChild : function(){
            return X_Pair_get( this ).containerNode.User.getFirstChild();
        },
        getLastChild : function(){
            return X_Pair_get( this ).containerNode.User.getLastChild();
        },
        getNodeAt : function( index ){
            return X_Pair_get( this ).containerNode.User.getNodeAt( index );
        },
        numNodes : function(){
            return X_Pair_get( this ).containerNode.User.numNodes();
        }
    }
);