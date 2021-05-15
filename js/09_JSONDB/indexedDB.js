if( X_JSONDB_USE_indexedDB ){
    X_TEMP.jsonDBStatic_exist = function( transaction, dbName ){
        var request;

        // https://stackoverflow.com/questions/17468963/check-if-indexeddb-database-exists
        try {
            if( X_JSONDB_indexedDB.webkitGetDatabaseNames ){
                request = X_JSONDB_indexedDB.webkitGetDatabaseNames();

                request.onerror = function( e ){
                    this.onsuccess = this.onerror = null;
                    X_JSONDB_Transaction_dispatchError( transaction, e );
                };
                request.onsuccess = function(){
                    this.onsuccess = this.onerror = null;
                    X_JSONDB_Transaction_dispatchSuccess(
                        transaction,
                        this.result.indexOf( dbName ) !== -1
                    );
                };
            } else {
                request = X_JSONDB_indexedDB.open( dbName );

                request.onerror = function( e ){
                    this.onsuccess = this.onerror = this.onupgradeneeded = null;
                    X_JSONDB_Transaction_dispatchError( transaction, e );
                };
                request.onsuccess = function(){
                    var db = this.result;

                    this.onsuccess = this.onerror = this.onupgradeneeded = null;
                    if( db.objectStoreNames && !db.objectStoreNames.length ){
                        db.close();
                        dropDB();
                    } else {
                        X_JSONDB_Transaction_dispatchSuccess( transaction, true );
                    };
                };
                request.onupgradeneeded = function(){
                    this.onsuccess = this.onerror = this.onupgradeneeded = null;
                    this.result.close();
                    if( !X.UA.Goanna && !X.UA.Gecko ){ // Wimdows 10 + PaleMoon 28.6 Goanna 4.3, Firefox45 abort に失敗する
                        this.transaction.abort();
                        // 存在確認をした時に空の DB を作る問題?
                        X_JSONDB_Transaction_dispatchSuccess( transaction, false );
                    } else {
                        dropDB();
                    };
                };
            };
        } catch( O_o ){
            X_JSONDB_Transaction_dispatchError( transaction, O_o );
        };

        function dropDB(){
            var request = X_JSONDB_indexedDB.deleteDatabase( dbName );

            request.onerror = function( e ){
                this.onsuccess = this.onerror = this.onblocked = null;
                X_JSONDB_Transaction_dispatchError( transaction, e );
            };
            request.onsuccess = function(){
                this.onsuccess = this.onerror = this.onblocked = null;
                X_JSONDB_Transaction_dispatchSuccess( transaction, false );
            };
            request.onblocked = function( e ){
                this.onsuccess = this.onerror = this.onblocked = null;
                X_JSONDB_Transaction_dispatchError( transaction, e );
            };
        };
    };

    X_TEMP.jsonDB_implementation = {
        backend           : X_JSONDB_TYPE_indexedDB,
        _rawIndexedDB     : null,

        _init : function( dbName, dbVersion, description, size ){
            var me            = this,
                dbOpenRequest = X_JSONDB_indexedDB.open( dbName, dbVersion );

            dbOpenRequest.onerror = function( e ){
                this.onsuccess = this.onerror = this.onupgradeneeded = null;
                X_JSONDB_dispatchOpenDBErrorEvent( me, e );
            };
            
            dbOpenRequest.onsuccess = function( e ){
                this.onsuccess = this.onerror = this.onupgradeneeded = null;
                me._rawIndexedDB = this.result;
                X_JSONDB_dispatchOpenDBSuccessEvent( me );
            };

            dbOpenRequest.onupgradeneeded = function( e ){
                // this.onsuccess = this.onerror = this.onupgradeneeded = null; ?
                me._rawIndexedDB = this.result;
                X_JSONDB_dispatchUpgradeNeededEvent( me, me._rawIndexedDB.oldVersion );
            };
        },

        _createJsonStore : function( storeName ){
            var definition  = this._definitions[ storeName ];

            if( definition.keyPath ){
                this._rawIndexedDB.createObjectStore( storeName, { keyPath : definition.keyPath, autoIncrement : definition.autoIncrement || false } );
            } else {
                this._rawIndexedDB.createObjectStore( storeName /*, { autoIncrement : definition.autoIncrement || false } */ );
            };
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/deleteObjectStore
        _deleteJsonStore : function( storeName ){
            this._rawIndexedDB.deleteObjectStore( storeName );
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/deleteIndex
        _deleteIndex : function( storeName, indexName ){
            var objectStore = this._rawIndexedDB.objectStore( storeName );

            objectStore.deleteIndex( indexName );
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex
        _createIndex : function( storeName, indexName ){
            var definition  = this._definitions[ storeName ],
                indexes     = definition.indexes,
                objectStore = this._rawIndexedDB.objectStore( storeName ),
                i = -1, index;

            if( indexes ){
                while( index = indexes[ ++i ] ){
                    if( index.indexName === indexName ){
                        objectStore.createIndex( index.indexName, index.keyPath || index.indexName, { unique : index.unique, multiEntry : index.multiEntry } );
                        break;
                    };
                };
            } else if( X_IS_DEV ){
                X_JSONDB_dispatchOpenDBErrorEvent( this, 'No indexes found!' );
            };
        },

        _drop : function(){
            var me      = this,
                request = X_JSONDB_indexedDB.deleteDatabase( me._dbName );
    
            request.onerror = function( e ){
                this.onsuccess = this.onerror = this.onblocked = null;
                me.dispatch( { type : X_EVENT_COMPLETE, error : e } );
            };
            request.onsuccess = function(){
                this.onsuccess = this.onerror = this.onblocked = null;
                me.dispatch( X_EVENT_COMPLETE );
            };
            request.onblocked = function( e ){
                this.onsuccess = this.onerror = this.onblocked = null;
                me.dispatch( { type : X_EVENT_COMPLETE, blocked : e } );
            };
        }
    };

    X_TEMP.jsonTransaction_implementation = {
        _idbTransaction : null,

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get
        _get : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).get( keyOrKeyRange );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        _delete : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).delete( keyOrKeyRange );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        _add : function( value, opt_key, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).add( value, opt_key );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
        _put : function( value, opt_key, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).put( value, opt_key );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/count
        _count : function( opt_keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).count( opt_keyOrKeyRange );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/clear
        _clear : function( opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).clear();

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },

        /** IndexedDB 2 */
        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll
        _getAll : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).getAll( opt_keyOrKeyRange, opt_count );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },
        /** IndexedDB 2 */
        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getKey
        _getKey : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).getKey( keyOrKeyRange );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        },
        /** IndexedDB 2 */
        // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAllKeys
        _getAllKeys : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var request = X_JSONDB_indexedDB_getObjectStore( this, opt_storeNameOrStoreIndex ).getAllKeys( opt_keyOrKeyRange, opt_count );

            X_JSONDB_indexedDB_Store_dispatcher( this, request );
        }
    };
};

function X_JSONDB_indexedDB_getObjectStore( me, opt_storeNameOrStoreIndex ){
    if( !me._idbTransaction ){
        me._idbTransaction = me._jsonDB._rawIndexedDB.transaction( me._storeName || me._storeList, me._openAsReadwrite ? 'readwrite' : 'readonly' );
    };
    return me._idbTransaction.objectStore( X_JSONDB_getStoreName( me, opt_storeNameOrStoreIndex ) );
};

function X_JSONDB_indexedDB_Store_dispatcher( me, request ){
    request.onerror = function( e ){
        this.onerror = this.onsuccess = null;
        X_JSONDB_Transaction_dispatchError( me, this.error );
    };
    request.onsuccess = function( e ){
        this.onerror = this.onsuccess = null;
        X_JSONDB_Transaction_dispatchSuccess( me, this.result );
    };
};