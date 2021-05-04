if( X_JSONDB_USE_WebSQL ){
    X_TEMP.jsonDBStatic_exist = function( transaction, dbName ){
        try {
            X_JSONDB_Transaction_dispatchSuccess( transaction, parseFloat( X_JSONDB_openWebSQL( dbName, '' ).version ) );
        } catch( O_o ){
            X_JSONDB_Transaction_dispatchError( transaction, O_o );
        };
    };

    X_TEMP.jsonDB_implementation = {
        backend             : X_JSONDB_TYPE_WebSQL,
        _sqldbOpened        : null,
        _upgradeTransaction : null,
        _tableDifinitions   : null,
        _numStoreCreation   : 0,

        _init : function( dbName, dbVersion, description, size ){
            var me = this,
                storeName, definition, indexes, uniqueNames, indexedNames, primaryKey, noIndexedKey,
                i, index, unique, keyOrKeyList, isArray, pos, j, keyPath,
                db, v;

            me._tableDifinitions = {};

            for( storeName in me._definitions ){
                definition   = me._definitions[ storeName ];
                indexes      = definition.indexes;
                uniqueNames  = [ definition.keyPath ];
                indexedNames = [];
                primaryKey   = 'id';
                noIndexedKey = 'noidx';

                if( indexes ){
                    for( i = -1; index = indexes[ ++i ]; ){
                        unique       = index.unique;
                        keyOrKeyList = index.keyPath;
                        isArray      = X_Type_isArray( keyOrKeyList );
                        if( !isArray && unique ){
                            if( ( pos = indexedNames.indexOf( keyOrKeyList ) ) !== -1 ){
                                indexedNames.splice( pos, 1 );
                            };
                            if( uniqueNames.indexOf( keyOrKeyList ) === -1 ){
                                uniqueNames.push( keyOrKeyList );
                            };
                        } else {
                            if( !isArray ){
                                keyOrKeyList = [ keyOrKeyList ];
                            };
                            for( j = -1; keyPath = keyOrKeyList[ ++j ]; ){
                                if( uniqueNames.indexOf( keyPath ) === -1 && indexedNames.indexOf( keyPath ) === -1 ){
                                    ( unique ? uniqueNames : indexedNames ).push( keyPath );
                                };
                            };
                        };
                    };
                };

                while( uniqueNames.indexOf( primaryKey ) !== -1 || indexedNames.indexOf( primaryKey ) !== -1 ){
                    primaryKey += '_';
                };
                while( uniqueNames.indexOf( noIndexedKey ) !== -1 || indexedNames.indexOf( noIndexedKey ) !== -1 ){
                    noIndexedKey += '_';
                };

                me._tableDifinitions[ storeName ] = {
                    primaryKey   : primaryKey,
                    noIndexedKey : noIndexedKey,
                    indexedNames : indexedNames,
                    uniqueNames  : uniqueNames
                };
            };

            // https://sites.google.com/site/babukumasstudy/html5/websql
            //   Migration
            try {
                db = me._sqldbOpened = X_JSONDB_openWebSQL(
                    dbName,
                    '',
                    description,
                    size
                );
                v = parseFloat( db.version );

                if( !v || v < dbVersion ){
                    db.changeVersion(
                        v,
                        '' + dbVersion,
                        function( t ){
                            me._upgradeTransaction = t;
                            X_JSONDB_dispatchUpgradeNeededEvent( me, v - 0 || 0 );
                            delete me._upgradeTransaction;
                        },
                        function( e ){
                            X_JSONDB_dispatchOpenDBErrorEvent( me, e );
                        },
                        function(){
                            X_JSONDB_dispatchOpenDBSuccessEvent( me );
                        }
                    );
                } else {
                    X_JSONDB_dispatchOpenDBSuccessEvent( me );
                };
            } catch( O_o ) {
                if( X_IS_DEV ){
                    if( O_o === 2 ){
                        X_JSONDB_dispatchOpenDBErrorEvent( this, 'Invalid database version.' );
                    } else {
                        X_JSONDB_dispatchOpenDBErrorEvent( this, 'Unknown error ' + O_o );
                    };
                };
                return X_JSONDB_dispatchOpenDBErrorEvent( this, O_o );
            };
        },

        _createJsonStore : function( storeName, opt_transaction, opt_successCallback, opt_errorCallback ){
            var me              = this,
                tableDifinition = me._tableDifinitions[ storeName ],
                transaction     = opt_transaction || me._upgradeTransaction;

            transaction.executeSql(
                'CREATE TABLE IF NOT EXISTS ' + storeName + ' ' +
                '(' + tableDifinition.primaryKey + ' INTEGER PRIMARY KEY, ' +
                ( tableDifinition.uniqueNames.length  ? tableDifinition.uniqueNames.join( ' unique, ' ) + ' unique, ' : '' ) +
                ( tableDifinition.indexedNames.length ? tableDifinition.indexedNames.join( ', ' ) + ', ' : '' ) +
                tableDifinition.noIndexedKey + ')', // TODO <- unique な値は列を定義、それ以外は纏めて一つの列に json　で
                [],
                opt_successCallback || function(){
                    /* if( !( --me._numStoreCreation ) ){
                        X_JSONDB_dispatchOpenDBSuccessEvent( me );
                    }; */
                },
                opt_errorCallback || function( e ){
                    // X_JSONDB_dispatchOpenDBErrorEvent( me, e );
                }
            );
        },

        _deleteJsonStore : function( storeName ){
            var me = this;
    
            me._upgradeTransaction.executeSql(
                'DROP TABLE IF EXISTS ' + storeName,
                [],
                function(){
                    /* if( !( --me._numStoreCreation ) ){
                        X_JSONDB_dispatchOpenDBSuccessEvent( me );
                    }; */
                },
                function( e ){
                    // X_JSONDB_dispatchOpenDBErrorEvent( me, e );
                }
            );
        },

        _deleteIndex : function( storeName, indexName ){
            var me = this;

            me._upgradeTransaction.executeSql(
                'DROP INDEX ' + indexName, // + ' ON ' + storeName,
                [],
                function(){
                    /* if( !( --me._numStoreCreation ) ){
                        X_JSONDB_dispatchOpenDBSuccessEvent( me );
                    }; */
                },
                function( e ){
                    // X_JSONDB_dispatchOpenDBErrorEvent( me, e );
                }
            );
        },
    
        _createIndex : function( storeName, indexName ){
            var me      = this,
                indexes = me._definitions[ storeName ].indexes,
                i = -1, index, keyOrKeyList;

            if( indexes ){
                for( ; index = indexes[ ++i ]; ){
                    if( index.indexName === indexName ){
                        keyOrKeyList = index.keyPath;
                        me._upgradeTransaction.executeSql(
                            'CREATE ' + ( index.unique ? 'UNIQUE ' : ' ' ) +
                            'INDEX ' + indexName + ' ON ' + storeName + ' ' +
                            '(' + ( X_Type_isArray( keyOrKeyList ) ? keyOrKeyList.join( ', ' ) : keyOrKeyList ) + ')',
                            [],
                            function(){
                                /* if( !( --me._numStoreCreation ) ){
                                    X_JSONDB_dispatchOpenDBSuccessEvent( me );
                                }; */
                            },
                            function( e ){
                                // X_JSONDB_dispatchOpenDBErrorEvent( me, e );
                            }
                        );
                        break;
                    };
                };
            } else if( X_IS_DEV ){
                X_JSONDB_dispatchOpenDBErrorEvent( this, 'No indexes found!' );
            };
        },

        _drop : function(){
            var me = this;

            dropTable();

            function dropTable(){
                for( var storeName in me._definitions ){
                    delete me._definitions[ storeName ];

                    me._sqldbOpened.executeSql(
                        'DROP TABLE IF EXISTS ' + storeName,
                        [],
                        dropTable,
                        function( t, sqlError ){
                            me.diapatch( { type : X_EVENT_COMPLETE, error : sqlError } );
                        }
                    );
                    return;
                };
                me.diapatch( X_EVENT_COMPLETE );
            };
            return this;
        },

        _drop2 : function(){
            var me = this;

            dropTable();

            function dropTable(){
                for( var storeName in me._definitions ){
                    delete me._definitions[ storeName ];

                    me._sqldbOpened.executeSql(
                        'SELECT name FROM sqlite_master WHERE type="table" AND name = ?',
                        [ storeName ],
                        function( t, results ){
                            
                        },
                        function( sqlError ){
                            me.diapatch( { type : X_EVENT_COMPLETE, error : sqlError } );
                        }
                    );
                };
                me.diapatch( X_EVENT_COMPLETE );
            };
            return this;
        }
    };

    X_TEMP.jsonTransaction_implementation = {
        //_ready             : false,
        _websqlTransaction : null,

        _readyFunction : function( startTransaction ){
            var me = this;
            
            me._readyFunction = 0; // block to skip startTransaction

            me._jsonDB._sqldbOpened.transaction(
                function( t ){
                    me._websqlTransaction = t;
                    startTransaction.call( me );
                }
            );
        },

        _get : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var me = this;

            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'SELECT * FROM $$ WHERE ## = ? LIMIT 1',
                [ keyOrKeyRange ],
                function( t, results ){
                    var result = results.rows.length ? X_JSONDB_WebSQL_createJson( results.rows.item( 0 ) ) : null;

                    X_JSONDB_Transaction_dispatchSuccess( me, result );
                }
            );
        },

        _delete : function( keyOrKeyRange, opt_storeNameOrStoreIndex ){
            X_JSONDB_WebSQL_executeSql(
                this, opt_storeNameOrStoreIndex,
                'DELETE FROM $$ WHERE ## = ?',
                [ keyOrKeyRange ]
            );
        },

        _add : function( value, opt_key, opt_storeNameOrStoreIndex, _retry ){
            var me              = this,
                tableDifinition = X_JSONDB_WebSQL_getTableDifinition( me, opt_storeNameOrStoreIndex ),
                // primaryKey      = tableDifinition.primaryKey,
                noIndexedKey    = tableDifinition.noIndexedKey,
                indexedNames    = tableDifinition.indexedNames,
                uniqueNames     = tableDifinition.uniqueNames,
                noIndexedObject = {},
                columns         = [],
                questions       = [],
                args = [], key, val, niobjHasValue;

            for( key in value ){
                val = value[ key ];
                if( indexedNames.indexOf( key ) !== -1 || uniqueNames.indexOf( key ) !== -1 ){
                    questions.push( '?' );
                    columns.push( key );
                    args.push( JSON.stringify( val ) );
                } else {
                    niobjHasValue = true;
                    noIndexedObject[ key ] = val;
                };
            };

            columns.push( noIndexedKey );
            questions.push( '?' );
            if( niobjHasValue ){
                args.push( JSON.stringify( noIndexedObject ) );
            } else {
                args.push( null );
            };
        
            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'INSERT OR REPLACE INTO $$ (' + columns.join( ', ' ) + ') VALUES (' + questions.join( ', ' ) + ')', // 
                args, // indexed1, indexed2, { noindexed }
                0,
                function( sqlError ){
                    if( sqlError.code === sqlError.QUOTA_ERR ){
                        if( _retry ){
                            X_JSONDB_Transaction_dispatchError( me, sqlError );
                        } else {
                            me._add( value, opt_key, opt_storeNameOrStoreIndex, true );
                        };
                    } else {
                        X_JSONDB_Transaction_dispatchError( me, sqlError );
                    };
                }
            );
        },

        _count : function( opt_keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var me = this;

            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'SELECT COUNT(##) as length FROM $$',
                [],
                function( t, results ){
                    var result = results.rows.item(0).length;
                    X_JSONDB_Transaction_dispatchSuccess( me, result );
                }
            );
        },

        _clear : function( opt_storeNameOrStoreIndex ){
            X_JSONDB_WebSQL_executeSql(
                this, opt_storeNameOrStoreIndex,
                'DELETE FROM $$',
                []
            );
        },

        _getAll : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var me = this;

            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'SELECT ## FROM $$' + ( 0 < opt_count ? ' LIMIT ' + opt_count : '' ),
                [],
                function( t, results ){
                    var items = [], i = 0, rows = results.rows, l = rows.length;

                    for( ; i < l; ++i ){
                        items[ i ] = X_JSONDB_WebSQL_createJson( rows.item( i ) );
                    };
                    X_JSONDB_Transaction_dispatchSuccess( me, items );
                }
            );
        },

        _getKey : function( opt_keyOrKeyRange, opt_storeNameOrStoreIndex ){
            var me = this;

            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'SELECT ## FROM $$ WHERE ** = ? LIMIT 1',
                [],
                function( t, results ){
                    var result = results.rows.length ? results.rows.item(0)[ X_JSONDB_WebSQL_getKeyPath( me, opt_storeNameOrStoreIndex ) ] : null;
                    X_JSONDB_Transaction_dispatchSuccess( me, result );
                }
            );
        },

        _getAllKeys : function( opt_keyOrKeyRange, opt_count, opt_storeNameOrStoreIndex ){
            var me = this;

            X_JSONDB_WebSQL_executeSql(
                me, opt_storeNameOrStoreIndex,
                'SELECT ## FROM $$' + ( 0 < opt_count ? ' LIMIT ' + opt_count : '' ),
                [],
                function( t, results ){
                    var keys = [], i = 0, rows = results.rows, l = rows.length;

                    for( ; i < l; ++i ){
                        keys[ i ] = rows.item( i )[ X_JSONDB_WebSQL_getKeyPath( me, opt_storeNameOrStoreIndex ) ];
                    };
                    X_JSONDB_Transaction_dispatchSuccess( me, keys );
                }
            );
        }
    };
    X_TEMP.jsonTransaction_implementation._put = X_TEMP.jsonTransaction_implementation._add;
};

function X_JSONDB_WebSQL_getTableDifinition( transaction, opt_storeNameOrStoreIndex ){
    var storeName = transaction._storeName || transaction._storeList[ opt_storeNameOrStoreIndex ] || opt_storeNameOrStoreIndex;

    return transaction._jsonDB._tableDifinitions[ storeName ];
};

function X_JSONDB_WebSQL_getPrimaryKey( transaction, opt_storeNameOrStoreIndex ){
    return X_JSONDB_WebSQL_getTableDifinition( transaction, opt_storeNameOrStoreIndex ).primaryKey;
};

function X_JSONDB_WebSQL_getKeyPath( transaction, opt_storeNameOrStoreIndex ){
    return transaction._jsonDB._definitions[ X_JSONDB_getStoreName( transaction, opt_storeNameOrStoreIndex ) ].keyPath;
};

function X_JSONDB_WebSQL_createJson( transaction, opt_storeNameOrStoreIndex, result ){
    var tableDifinition = X_JSONDB_WebSQL_getTableDifinition( transaction, opt_storeNameOrStoreIndex ),
        primaryKey      = tableDifinition.primaryKey,
        noIndexedKey    = tableDifinition.noIndexedKey,
        //indexedNames    = tableDifinition.indexedNames,
        //uniqueNames     = tableDifinition.uniqueNames,
        jsonObject      = JSON.parse( result[ noIndexedKey ] ) || {},
        key;

    for( key in result ){
        if( key !== primaryKey && key !== noIndexedKey ){
            jsonObject[ key ] = JSON.parse( result[ key ] );
        };
    };
    return jsonObject;
};

function X_JSONDB_WebSQL_executeSql( me, opt_storeNameOrStoreIndex, sqlStatement, args, opt_successCallback, opt_errorCallback, _retry ){
    var storeName = X_JSONDB_getStoreName( me, opt_storeNameOrStoreIndex );

    me._websqlTransaction.executeSql(
        sqlStatement.replace( '&&', storeName )
                    .replace( '##', X_JSONDB_WebSQL_getKeyPath( me, opt_storeNameOrStoreIndex ) )
                    .replace( '**', X_JSONDB_WebSQL_getPrimaryKey( me, opt_storeNameOrStoreIndex ) ),
        args,
        opt_successCallback || function( t ){
            X_JSONDB_Transaction_dispatchSuccess( me );
        },
        function( t, sqlError ){
            /* if( !_retry && sqlError.code === sqlError.SYNTAX_ERR ){
                X_JSONDB_WebSQL_executeSql(
                    me, opt_storeNameOrStoreIndex,
                    "SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
                    [ storeName ],
                    function( t, results ){
                        if( !results.rows.length && !_retry ){
                            me._jsonDB._createJsonStore(
                                storeName, t,
                                function( t, results ){
                                    X_JSONDB_WebSQL_executeSql( me, opt_storeNameOrStoreIndex, sqlStatement, args, opt_successCallback, opt_errorCallback, true );
                                },
                                function( sqlError ){
                                    opt_errorCallback ? opt_errorCallback( sqlError ) : X_JSONDB_Transaction_dispatchError( me, sqlError );
                                }
                            );
                        } else {
                            opt_errorCallback ? opt_errorCallback( sqlError ) : X_JSONDB_Transaction_dispatchError( me, sqlError );
                        };
                    },
                    function( sqlError ){
                        opt_errorCallback ? opt_errorCallback( sqlError ) : X_JSONDB_Transaction_dispatchError( me, sqlError );
                    }
                );
            } else {
                opt_errorCallback ? opt_errorCallback( sqlError ) : X_JSONDB_Transaction_dispatchError( me, sqlError );
            }; */
            opt_errorCallback ? opt_errorCallback( sqlError ) : X_JSONDB_Transaction_dispatchError( me, sqlError );
        }
    );
};