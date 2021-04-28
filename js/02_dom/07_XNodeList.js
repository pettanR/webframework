
function X_NodeList( v ){
    var args = [],
        l    = arguments.length,
        i    = 0,
        xnode, j, n = 0, skip;

    for( ; i < l; ++i ){
        args.push.apply( args, arguments[ i ] );
    };

    if( ( l = args.length ) === 1 ) return new X_Node( args[ 0 ] );
    if( !this || this[ 'append' ] !== X_NodeList.prototype[ 'append' ] ) return new X_NodeList( args );

    for( i = 0; i < l; ++i ){
        xnode = args[ i ];
        skip  = false;
        for( j = 0; j < n; ++j ){
            if( this[ j ] === xnode ){
                skip = true;
                break;
            };
        };
        if( !skip ){
            this[ n ] = xnode;
            n = ++this.length;
        };
    };
};
X_NodeList.prototype.length = 0;

X_NodeList.prototype[ 'each' ] = function( func /* opt_args... */ ){
    var l = this.length,
        i = 0, args;

    if( 1 < arguments.length ){
        args = X_Array_copy( arguments );
        for( ; i < l; ++i ){
            args[ 0 ] = i;
            if( func.apply( this[ i ], args ) === false ) break;
        };
    } else {
        for( ; i < l; ++i ){
            if( func.call( this[ i ], i ) === false ) break;
        };
    };
    return this;
};

/* --------------------------------------
 *  Fuction Base, multi, getter, setter,
 */
X_TEMP.onSystemReady.push( function(){
    var target = X_NodeList.prototype,
        src    = X_Node.prototype,
        p, v;

    for( p in src ){
        //if( X_EMPTY_OBJECT[ p ] ) continue;
        v = src[ p ];
        if( X_Type_isFunction( v ) && !target[ p ] ){
            target[ p ] = new Function( [
                'var a=arguments,f=X.Node.prototype.', p, ',t=this,i,l=t.length;',
                'if(l)',
                    'for(i=0;i<l;++i)',
                        'if(i===l-1)return f.apply(t[i],a);',
                        'else f.apply(t[i],a);',
                'return f.apply(t,a)'
            ].join( '' ) );
        };
    };
});

