X_TEMP.jsonTransaction_base = {
    _jsonDB          : null,
    _actions         : null,
    _storeName       : '',
    _storeList       : null,
    _startTimerID    : 0,
    _started         : false,
    _openAsReadwrite : false,
    _totalActions    : 0,

    'Constructor' : function( jsonDB, storeNameOrStoreList ){
        this._jsonDB  = jsonDB;
        this._actions = [];

        if( X_Type_isArray( storeNameOrStoreList ) ){
            this._storeList = storeNameOrStoreList;
        } else {
            this._storeName = storeNameOrStoreList;
        };

        if( 1 < jsonDB.state ){
            this._startTimerID = X_Timer_once( 0, this, X_JSONDB_startTransaction );
        } else {
            jsonDB.listenOnce( X_EVENT_READY, this, X_JSONDB_startTransaction );
        };

        this.listen( X_EVENT_SUCCESS, X_JSONDB_Transaction_handleEvent )
            .listenOnce( [ X_EVENT_ERROR, X_EVENT_CANCELED, X_EVENT_COMPLETE ], X_JSONDB_Transaction_handleEvent );
    },

    // _readyFunction : X_emptyFunction,
    _abort : X_emptyFunction,

    $abort : function(){
        if( this._startTimerID ){
            this._startTimerID = X_Timer_remove( this._startTimerID );
        } else {
            this._abort();
            this._started = false;
        };
    },

    $get : function( opt_storeName, keyOrKeyRange ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_GET, opt_storeName, keyOrKeyRange ] );
        return this;
    },
    $delete : function( opt_storeName, keyOrKeyRange ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_DELETE, opt_storeName, keyOrKeyRange ] );
        this._openAsReadwrite = true;
        return this;
    },
    $add : function( opt_storeName, value, opt_key ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_ADD, opt_storeName, value, opt_key ] );
        this._openAsReadwrite = true;
        return this;
    },
    $put : function( opt_storeName, value, opt_key ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_PUT, opt_storeName, value, opt_key ] );
        this._openAsReadwrite = true;
        return this;
    },
    $count : function( opt_storeName, opt_keyOrKeyRange ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_COUNT, opt_storeName, opt_keyOrKeyRange ] );
        return this;
    },
    $clear : function( opt_storeName ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_CLEAR, opt_storeName ] );
        this._openAsReadwrite = true;
        return this;
    },
    $getAll : function( opt_storeName, opt_keyOrKeyRange, opt_count ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_GETALL, opt_storeName, opt_keyOrKeyRange, opt_count ] );
        return this;
    },
    $getKey : function( opt_storeName, keyOrKeyRange ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_GETKEY, opt_storeName, keyOrKeyRange ] );
        return this;
    },
    $getAllKeys : function( opt_storeName, opt_keyOrKeyRange, opt_count ){
        if( X_IS_DEV && this._started ){
            return;
        };
        this._actions.push( [ X_JSONDB_ACTION_GETALLKEYS, opt_storeName, opt_keyOrKeyRange, opt_count ] );
        return this;
    }
};

function X_JSONDB_startTransaction(){
    var action, storeName, arg1, arg2;

    this._totalActions = this._actions.length;

    if( this._readyFunction ){
        this._readyFunction( X_JSONDB_startTransaction );
        return;
    };

    while( action = this._actions.shift() ){
        if( this._storeList ){
            storeName = action[ 1 ];
            arg1 = action[ 2 ];
            arg2 = action[ 3 ];
        } else {
            arg1 = action[ 1 ];
            arg2 = action[ 2 ];
        };

        switch( action[ 0 ] ){
            case X_JSONDB_ACTION_GET :
                // this._get( arg1, storeName );
                X_JSONDB_try( this._get, this, [ arg1, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_DELETE :
                X_JSONDB_try( this._delete, this, [ arg1, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_ADD :
                // this._add( arg1, arg2, storeName );
                X_JSONDB_try( this._add, this, [ arg1, arg2, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_PUT :
                // this._put( arg1, arg2, storeName );
                X_JSONDB_try( this._put, this, [ arg1, arg2, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_COUNT :
                X_JSONDB_try( this._count, this, [ arg1, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_CLEAR :
                X_JSONDB_try( this._clear, this, [ storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_GETALL :
                X_JSONDB_try( this._getAll, this, [ arg1, arg2, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_GETKEY :
                X_JSONDB_try( this._getKey, this, [ arg1, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
            case X_JSONDB_ACTION_GETALLKEYS :
                X_JSONDB_try( this._getAllKeys, this, [ arg1, arg2, storeName ], X_JSONDB_Transaction_dispatchError );
                break;
        };
    };
    this._startTimerID = 0;
    this._started      = true;
};

function X_JSONDB_getStoreName( transaction, opt_storeNameOrStoreIndex ){
    if( X_IS_DEV ){
        if( transaction._storeList ){
            if( X_Type_isNumber( opt_storeNameOrStoreIndex ) ){
                if( opt_storeNameOrStoreIndex < 0 || transaction._storeList.length <= opt_storeNameOrStoreIndex ){
                    // Bad arg!
                };
            };
            if( X_Type_isString( opt_storeNameOrStoreIndex ) ){
                if( transaction._storeList.indexOf( opt_storeNameOrStoreIndex ) === -1 ){
                    // Bad arg!
                };
            };
        };
    };
    return transaction._storeName || transaction._storeList[ opt_storeNameOrStoreIndex ] || opt_storeNameOrStoreIndex;
};