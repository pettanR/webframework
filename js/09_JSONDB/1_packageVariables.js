var X_JSONDB_indexedDB    = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB,
    X_JSONDB_openWebSQL   = window.openDatabase,
    X_JSONDB_localStorage = window.localStorage,

    X_CANUSE_indexedDB = !!X_JSONDB_indexedDB,
    X_CANUSE_WebSQL    = !!X_JSONDB_openWebSQL,
    X_CANUSE_localStorage = !!X_JSONDB_localStorage,

    X_JSONDB_USE_indexedDB    = ( X_IS_DEV && X_URL_PARAMS.jsondb ) ?
                                    ( X_URL_PARAMS.jsondb === X_JSONDB_TYPE_indexedDB ) :
                                    ( X_UA.SafariMobile || X_UA.iOSWebView ) < 10.1 ?
                                        false :
                                        X_CANUSE_indexedDB,
    X_JSONDB_USE_WebSQL       = X_JSONDB_USE_indexedDB ?
                                    false :
                                    ( X_IS_DEV && X_URL_PARAMS.jsondb ) ?
                                        ( X_URL_PARAMS.jsondb === X_JSONDB_TYPE_WebSQL ) :
                                        X_CANUSE_WebSQL,
    X_JSONDB_USE_localStorage = ( X_JSONDB_USE_indexedDB || X_JSONDB_USE_WebSQL ) ?
                                    false :
                                    ( X_IS_DEV && X_URL_PARAMS.jsondb ) ?
                                        ( X_URL_PARAMS.jsondb === X_JSONDB_TYPE_localStorage ) :
                                        X_CANUSE_localStorage,

    X_JSONDB_ACTION_GET        = 1,
    X_JSONDB_ACTION_DELETE     = 2,
    X_JSONDB_ACTION_ADD        = 3,
    X_JSONDB_ACTION_PUT        = 4,
    X_JSONDB_ACTION_COUNT      = 5,
    X_JSONDB_ACTION_CLEAR      = 6,
    X_JSONDB_ACTION_GETALL     = 7,
    X_JSONDB_ACTION_GETKEY     = 8,
    X_JSONDB_ACTION_GETALLKEYS = 9,

    X_JSONDB,
    X_JSONDB_TransactionClass,
    
    X_JSONDB_try = new Function( 'f,t,a,c', 'try{f.apply(t,a)}catch(_){c(t,_)}' );

/** ===========================================================================
 * open JSONDB events
 *  error, success, upgradeneeded
 */
function X_JSONDB_dispatchOpenDBErrorEvent( jsonDB, errorObject ){
    jsonDB.asyncDispatch( { type : X_EVENT_ERROR, error : errorObject + '' } );
};

function X_JSONDB_dispatchOpenDBSuccessEvent( jsonDB ){
    jsonDB.state = 2;
    jsonDB.asyncDispatch( X_EVENT_READY );
};

function X_JSONDB_dispatchUpgradeNeededEvent( jsonDB, oldVersion ){
    var definitions = jsonDB._definitions,
        storeName, definition, indexes, i, index;

    jsonDB.deleteJsonStore = function( storeName ){
        this._deleteJsonStore( storeName );
    };
    jsonDB.createIndexIn = function( storeName, indexName ){
        this._createIndex( storeName, indexName );
    };
    jsonDB.deleteIndexIn = function( storeName, indexName ){
        this._deleteIndex( storeName, indexName );
    };
    jsonDB.createJsonStore = function( storeName ){
        this._createJsonStore( storeName );
    };

    if( !oldVersion ){
        for( storeName in definitions ){
            jsonDB._createJsonStore( storeName );
            definition = definitions[ storeName ];
            indexes    = definition.indexes;

            if( indexes ){
                for( i = -1; index = indexes[ ++i ]; ){
                    jsonDB._createIndex( storeName, index.indexName );
                };
            };
        };
    } else {
        jsonDB.dispatch( { type : X_EVENT_NEED_UPGRADE, oldVersion : oldVersion } );
    };

    delete jsonDB.deleteJsonStore;
    delete jsonDB.createIndexIn;
    delete jsonDB.deleteIndexIn;
    delete jsonDB.createJsonStore;
};

/** ===========================================================================
 * transaction events
 *  error, success, upgradeneeded
 */
function X_JSONDB_Transaction_dispatchError( transaction, error ){
    /* if( !X_JSONDB_IS_SYNC ){
        X_JSONDB_Transaction_removeTransaction( transaction );
    }; */
    transaction.asyncDispatch( { type : X_EVENT_ERROR, error : error + '' } );
};

function X_JSONDB_Transaction_dispatchSuccess( transaction, result ){
    /* if( !X_JSONDB_IS_SYNC ){
        X_JSONDB_Transaction_removeTransaction( transaction );
    }; */
    transaction.asyncDispatch( { type : X_EVENT_SUCCESS, result : result == null ? null : result } );
};

function X_JSONDB_Transaction_removeTransaction( transaction ){
    
};

function X_JSONDB_Transaction_handleEvent( e ){
    switch( e.type ){
        case X_EVENT_SUCCESS :
            --this._totalActions;
            if( this._totalActions ){
                return;
            };
        case X_EVENT_ERROR :
        case X_EVENT_CANCELED :
            e = X_Object_copy( e );
            e.type = X_EVENT_COMPLETE;
            this.asyncDispatch( e );
            break;
        case X_EVENT_COMPLETE :
            this.kill();
            break;
    };
};

function X_JSONDB_closed(){
    /* if( X_JSONDB_TRANSACTIONS.length ){
        // localStorage に保存
    }; */
};