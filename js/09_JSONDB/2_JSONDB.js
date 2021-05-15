// JSONDB と BlobDB
X_TEMP.jsonDB_base = {
    state        : 1,
    _dbName      : '',
    _dbVersion   : 0,
    _definitions : null,

    'Constructor' : function( dbName, dbVersion, description, dbSize, jsonStoreDefinitions ){
        var jsonStoreName;

        this._dbName      = dbName;
        this._dbVersion   = dbVersion;
        if( X_Type_isString( jsonStoreDefinitions ) ){
            this._definitions = {};
            this._definitions[ jsonStoreDefinitions ] = 1;
        } else if( X_Type_isArray( jsonStoreDefinitions ) ){
            this._definitions = {};
            for( jsonStoreName in jsonStoreDefinitions ){
                this._definitions[ jsonStoreName ] = 1;
            };
        } else {
            this._definitions = jsonStoreDefinitions;
        };

        this._init( dbName, dbVersion, description, dbSize );
    },

    createTransaction : function( storeNameOrStoreList ){
        return X_JSONDB_TransactionClass( this, storeNameOrStoreList );
    },

    drop : function(){
        this.state = 0;
        this._drop();
        return this.listen( X_EVENT_COMPLETE, this.kill );
    },

    _createJsonStore : X_emptyFunction,

    _deleteIndex : X_emptyFunction,

    _createIndex : X_emptyFunction
};

// X.JSONDB.exist()
X_TEMP.jsonDBStatic$exist = function( dbName ){
    var transaction = X_EventDispatcher();

    X_JSONDB._exist( transaction, dbName );

    transaction.listenOnce( [ X_EVENT_SUCCESS, X_EVENT_ERROR ], X_JSONDB_Transaction_handleEvent );
    return transaction;
};

X_TEMP.onSystemReady.push( function(){
    // JSONDB Class
	X[ 'JSONDB' ] = X_JSONDB = X_EventDispatcher[ 'inherits' ](
        X_Object_override( X_TEMP.jsonDB_base, X_TEMP.jsonDB_implementation )
    );
    delete X_TEMP.jsonDB_base;
    delete X_TEMP.jsonDB_implementation;

    // JSONDB static methods
    X_JSONDB.exist  = X_TEMP.jsonDBStatic$exist;
    X_JSONDB._exist = X_TEMP.jsonDBStatic_exist;
    delete X_TEMP.jsonDBStatic$exist;
    delete X_TEMP.jsonDBStatic_exist;

    // Transaction Class
    X_JSONDB_TransactionClass = X_EventDispatcher[ 'inherits' ](
        X_Object_override( X_TEMP.jsonTransaction_base, X_TEMP.jsonTransaction_implementation )
    );
    delete X_TEMP.jsonTransaction_base;
    delete X_TEMP.jsonTransaction_implementation;
});

