if( X_JSONDB_USE_localStorage ){
    X_TEMP.jsonDBStatic_exist = function( transaction, dbName ){
        try {
            var l = X_JSONDB_localStorage.length,
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( dbName + '.' ) === 0 ){
                    return X_JSONDB_Transaction_dispatchSuccess( transaction, true );
                };
            };
            X_JSONDB_Transaction_dispatchSuccess( transaction, false );
        } catch( O_o ){
            X_JSONDB_Transaction_dispatchError( transaction, O_o );
        };
    };

    X_TEMP.jsonDB_implementation = {
        backend : X_JSONDB_TYPE_localStorage,
        //_dbName : '',

        _init : function( dbName, dbVersion, description, size ){
            var localStorageTestKey = '_localforage_support_test',
                currentVersion;

            //this._dbName = dbName;

            try {
                X_JSONDB_localStorage.setItem( localStorageTestKey, true );
                X_JSONDB_localStorage.removeItem( localStorageTestKey );
            } catch ( O_o ){
                if( !X_JSONDB_localStorage.length ){
                    return X_JSONDB_dispatchOpenDBErrorEvent( O_o );
                };
                X_JSONDB_localStorage.removeItem( localStorageTestKey );
            };
            currentVersion = ( X_JSONDB_localStorage.getItem( dbName ) - 0 ) || 0;

            if( !currentVersion || currentVersion < dbVersion ){
                X_JSONDB_dispatchUpgradeNeededEvent( this, currentVersion );
            };
            X_JSONDB_localStorage.setItem( dbName, dbVersion );
            X_JSONDB_dispatchOpenDBSuccessEvent( this );
        },

        /* _createJsonStore : function( storeName ){}, */

        _deleteJsonStore : function( storeName ){
            var l = X_JSONDB_localStorage.length,
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( this._dbName + '.' + storeName ) === 0 ){
                    X_JSONDB_localStorage.removeItem( key );
                };
            };
        },

        /* _deleteIndex : function( storeName, indexName ){},
    
        _createIndex : function( storeName, indexName ){} */

        _drop : function(){
            try {
                var l = X_JSONDB_localStorage.length,
                    i = 0, key;
    
                for( ; i < l; ++i ){
                    key = X_JSONDB_localStorage.key( i );
                    if( key.indexOf( this._dbName + '.' ) === 0 ){
                        X_JSONDB_localStorage.removeItem( key );
                    };
                };
                this.asyncDispatch( X_EVENT_COMPLETE );
            } catch( O_o ){
                this.asyncDispatch( { type : X_EVENT_COMPLETE, error : O_o } );
            };
        }
    };

    X_TEMP.jsonTransaction_implementation = {
        _get : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                result = X_JSONDB_localStorage.getItem( prefix + keyOrKeyRange );

            X_JSONDB_Transaction_dispatchSuccess( this, X_JSONDB_localStorage_createJson( this, opt_storeNameOrStoreIndex, result, X_String_parse( keyOrKeyRange ) ) );
        },

        _delete : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex );

            X_JSONDB_localStorage.removeItem( prefix + keyOrKeyRange );

            X_JSONDB_Transaction_dispatchSuccess( this );
        },

        _add : function( value, opt_key, opt_storeNameOrStoreIndex ){
            var prefix  = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                keyPath = X_JSONDB_localStorage_getKeyPath( this, opt_storeNameOrStoreIndex );

            if( X_Type_isObject( value ) ){
                opt_key = value[ keyPath ];
                delete value[ keyPath ];
            };

            try {
                X_JSONDB_localStorage.removeItem( prefix + opt_key );
                X_JSONDB_localStorage.setItem( prefix + opt_key, X_JSON.stringify( value === undefined ? null : value ) );
                X_JSONDB_Transaction_dispatchSuccess( this );
            } catch ( O_o ) {
                X_JSONDB_Transaction_dispatchError( this, O_o );
            };
        },

        _count : function( opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                l      = X_JSONDB_localStorage.length,
                i      = 0,
                n      = 0,
                key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( prefix ) === 0 ){
                    ++n;
                };
            };
            X_JSONDB_Transaction_dispatchSuccess( this, n );
        },


        _clear : function( opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                l      = X_JSONDB_localStorage.length,
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( prefix ) === 0 ){
                    X_JSONDB_localStorage.removeItem( key );
                };
            };

            X_JSONDB_Transaction_dispatchSuccess( this );
        },

        _getAll : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                l      = X_JSONDB_localStorage.length,
                items  = [],
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( prefix ) === 0 ){
                    items.push(
                        X_JSONDB_localStorage_createJson(
                            this, opt_storeNameOrStoreIndex, X_JSONDB_localStorage.getItem( key ), X_String_parse( key.substr( prefix.length ) )
                        )
                    );
                };
            };

            X_JSONDB_Transaction_dispatchSuccess( this, items );
        },

        _getKey : function( opt_keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                l      = X_JSONDB_localStorage.length,
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( prefix ) === 0 ){
                    return X_JSONDB_Transaction_dispatchSuccess( this, key.substr( prefix.length ) );
                };
            };

            X_JSONDB_Transaction_dispatchSuccess( this, null );
        },

        _getAllKeys : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var prefix = X_JSONDB_localStorage_getPrefix( this, opt_storeNameOrStoreIndex ),
                l      = X_JSONDB_localStorage.length,
                keys   = [],
                i = 0, key;

            for( ; i < l; ++i ){
                key = X_JSONDB_localStorage.key( i );
                if( key.indexOf( prefix ) === 0 ){
                    keys.push( key.substr( prefix.length ) );
                };
            };

            X_JSONDB_Transaction_dispatchSuccess( this, keys );
        }
    };

    X_TEMP.jsonTransaction_implementation._put = X_TEMP.jsonTransaction_implementation._add;
};

function X_JSONDB_localStorage_createJson( me, opt_storeNameOrStoreIndex, result, keyValue ){
    var keyPath = X_JSONDB_localStorage_getKeyPath( me, opt_storeNameOrStoreIndex );

    result = X_JSON.parse( result );

    if( keyPath && X_Type_isObject( result ) ){
        result[ keyPath ] = keyValue;
    };
    return result;
};

function X_JSONDB_localStorage_getKeyPath( me, opt_storeNameOrStoreIndex ){
    return me._jsonDB._definitions[ X_JSONDB_getStoreName( me, opt_storeNameOrStoreIndex ) ].keyPath;
};

function X_JSONDB_localStorage_getPrefix( me, opt_storeNameOrStoreIndex ){
    return me._jsonDB._dbName + '.' + X_JSONDB_getStoreName( me, opt_storeNameOrStoreIndex ) + '.';
};