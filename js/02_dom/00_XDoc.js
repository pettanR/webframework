/**
 * document をラップする
 * @namespace X.Doc
 * @alias X.Doc
 */
X[ 'Doc' ] = {
	/**
	 * EventDispatcher.prototype.listen 参照
	 * @alias X.Doc.listen
	 */
	'listen' : function( type, arg1, arg2, arg3 ){
		var f;
		
		if( type <= X_ViewPort_readyState && type === 'DOMContentLoaded' ){
			/*
			 * X.Event.XDOM_READY 以後に listen した場合の対策
			 */
			X_ViewPort_document[ 'asyncDispatch' ]( type );
		};
		
		f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		if( !f.cbKind ){
			X_ViewPort_document[ 'listen' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort_document[ 'listen' ]( type, this, f.func, f.supplement );
		} else {
			X_ViewPort_document[ 'listen' ]( type, arg1, arg2, arg3 );
		};
		return X[ 'Doc' ];
	},
	
	/**
	 * EventDispatcher.prototype.listenOnce 参照
	 * @alias X.Doc.listenOnce
	 */
	'listenOnce' : function( type, arg1, arg2, arg3 ){
		var f;
		
		if( type <= X_ViewPort_readyState && type === 'DOMContentLoaded' ){
			/*
			 * X.Event.XDOM_READY 以後に listen した場合の対策
			 */
			X_ViewPort_document[ 'asyncDispatch' ]( type );
		};
		
		f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		if( !f.cbKind ){
			X_ViewPort_document[ 'listenOnce' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort_document[ 'listenOnce' ]( type, this, f.func, f.supplement );
		};
		X_ViewPort_document[ 'listenOnce' ]( type, arg1, arg2, arg3 );
		return X[ 'Doc' ];
	},

	/**
	 * EventDispatcher.prototype.unlisten 参照
	 * @alias X.Doc.unlisten
	 */	
	'unlisten' : function( type, arg1, arg2, arg3 ){
		var f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		
		if( !f.cbKind ){
			X_ViewPort_document[ 'unlisten' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			X_ViewPort_document[ 'unlisten' ]( type, this, f.func, f.supplement );
		} else {
			X_ViewPort_document[ 'unlisten' ]( type, arg1, arg2, arg3 );
		};
		return X[ 'Doc' ];
	},

	/**
	 * EventDispatcher.prototype.listening 参照
	 * @alias X.Doc.listening
	 */	
	'listening' : function( type, arg1, arg2, arg3 ){
		var f = X_Closure_classifyCallbackArgs( arg1, arg2, arg3 );
		
		if( !f.cbKind ){
			return X_ViewPort_document[ 'listening' ]( type, this, arg1 );
		} else
		if( f.cbKind === X_CLOSURE_FUNC_ONLY ){
			return X_ViewPort_document[ 'listening' ]( type, this, f.func, f.supplement );
		};
		return X_ViewPort_document[ 'listening' ]( type, arg1, arg2, arg3 );
	},
	
	'create'     : X_Doc_create,
	
	'createText' : X_Doc_createText

};

/**
 * X.Node 要素を作成する。この時点でツリーには追加されない。
 * @alias X.Doc.create
 * @param {string} tag タグ名
 * @param {object} opt_attrs 属性
 * @param {object} opt_css スタイル
 * @return {Node}
 */
function X_Doc_create( tag, opt_attrs, opt_css ){
	var list, i;
	switch( X_Node_getType( tag ) ){
		case X_NodeType_STRING :
			X_Node_newByTag = true;
			return new Node( tag, opt_attrs, opt_css );
		case X_NodeType_HTML_STRING :
			list = X_HtmlParser_parse( tag, true );
			for( i = list.length; 1 < i; ){
				list[ --i ][ 'kill' ]();
			};
			return list[ 0 ];
	};
};

/**
 * X.Node テキストを作成する。この時点でツリーには追加されない。
 * @alias X.Doc.createText
 * @param {string} textContent
 * @return {Node}
 */
function X_Doc_createText( text ){
	X_Node_newByText = true;
	return new Node( text );
};
