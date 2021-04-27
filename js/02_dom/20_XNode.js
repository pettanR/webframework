/**
 * Node( rawElement | rawTextnode | htmlString | textString )
 *	
 * @alias X.Node
 * @class Node HTMLElement、TextNode をラップし jQuery 風な API で操作できます。
 * @constructs Node
 * @extends {EventDispatcher}
 */
var	X_Node = X[ 'Node' ] = X_EventDispatcher[ 'inherits' ](
	//'X.Node',
	X_Class.NONE,
	{
		/**
		 * 要素に振られるユニークID
		 * @type {number}
		 * @private
		 * @alias Node.prototype._uid
		 */
		'_uid'       : 0,
		
		/**
		 * Node の状態を表すフラグ。
		 * @type {number}
		 * @private
		 * @alias Node.prototype._flags
		 */
		'_flags'     : X_NodeFlags_DESTROYED,

		'_rect'      : null, // TODO
		
		/**
		 * 最後に計測したフォントサイズを保持している。ツリーが変更されると削除される。
		 * @type {number}
		 * @private
		 * @alias Node.prototype._fontSize
		 */
		'_fontSize'  : 0,
		
		/**
		 * NodeList と動作を一致させるためのプロパティ。常に 1。
		 * @type {number}
		 * @const
		 * @alias Node.prototype.length
		 */
		length       : 1,
		
		/**
		 * 親 Node。
		 * @type {Node}
		 * @alias Node.prototype.parent
		 */
		parent       : null, // remove された枝も親子構造は維持している。
		
		/**
		 * 子 Node リスト
		 * @type {Array}
		 * @private
		 * @alias Node.prototype._xnodes
		 */
		'_xnodes'    : null,
		
		/**
		 * GPU レイヤーに転送されている場合、その一番親となっている Node。未実装。
		 * @type {Node}
		 * @private
		 * @alias Node.prototype._gpuParent
		 */
		'_gpuParent' : null,

		/**
		 * タグ名。テキストノードの場合は空文字列。
		 * @type {string}
		 * @private
		 * @alias Node.prototype._tag
		 */
		'_tag'       : '',
		
		/**
		 * テキストコンテンツ。テキストノードで使用。
		 * @type {string}
		 * @private
		 * @alias Node.prototype._text
		 */
		'_text'      : '',
		
		/**
		 * id
		 * @type {string}
		 * @private
		 * @alias Node.prototype._id
		 */
		'_id'        : '',
		
		/**
		 * クラス名。複数のクラスが設定されている場合、スペース区切り。
		 * @type {string}
		 * @private
		 * @alias Node.prototype._className
		 */
		'_className' : '', //

		/**
		 * 属性。
		 * @type {object}
		 * @private
		 * @alias Node.prototype._attrs
		 */
		'_attrs'     : null, // see X_Node_Attr
		
		/**
		 * まだコミットされていない属性。
		 * @type {object}
		 * @private
		 * @alias Node.prototype._newAttrs
		 */
		'_newAttrs'  : null,
		
		/**
		 * 属性を文字列にしたもの。 color="red" size="8"
		 * @type {object}
		 * @private
		 * @alias Node.prototype._attrText
		 */
		'_attrText'  : '',
		
		/**
		 * スタイル。
		 * @type {object}
		 * @private
		 * @alias Node.prototype._css
		 */
		'_css'       : null,
		
		/**
		 * cssText
		 * @type {string}
		 * @private
		 * @alias Node.prototype._cssText
		 */
		'_cssText'   : '',
		
		/**
		 * アニメーション用オブジェクト。
		 * @type {object}
		 * @private
		 * @alias Node.prototype._anime
		 */
		'_anime'     : null,

		'Constructor' : function( v ){
			// TODO uid = X_Node_CHASHE.indexOf( null ), uid === -1 ? X_Node_CHASHE.length : uid;
			var uid = X_Node_CHASHE.length,
				css, xnodes, xnode, parent;
			
			if( X_Node_newByTag || this.constructor !== X_Node ){
				X_Node_newByTag = false;
				this[ '_tag' ]  = v.toUpperCase();
				arguments[ 1 ] && this[ 'attr' ]( arguments[ 1 ] );
				css = arguments[ 2 ];
				css && ( X_Type_isString( css ) ? this[ 'cssText' ]( css ) : this[ 'css' ]( css ) );
			} else
			if( X_Node_newByText ){
				X_Node_newByText = false;
				this[ '_text' ]  = v;
			} else {
				if( 1 < arguments.length ) return new X_NodeList( arguments );
				if( X_Type_isArray( v ) && v.length ) return new X_NodeList( v );

				switch( X_Node_getType( v ) ){
					case X_NodeType_XNODE :
					case X_NodeType_XNODE_LIST :
						return v;

					case X_NodeType_RAW_HTML :
						if( xnode = X_Node_getXNode( v ) ) return xnode;
						// v.parentNode || v.parentElement : dom1 || dom0
						this.parent     = ( parent = v.parentNode || v.parentElement ) && parent.tagName /* ie7- */ && X_Node_getXNode( parent );
						this[ '_rawObject' ] = v;
						this[ '_tag' ]       = v.tagName.toUpperCase();
						this[ '_id' ]        = v.id;
						this[ '_className' ] = v.className;
						
						this[ 'cssText' ]( v.style.cssText );
						this[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY; // X_NodeFlags_DIRTY_CSS を落とす
						
						// TODO attr の回収は不可能、、、?
						if( X_UA_DOM.IE4 ){
							v.setAttribute( 'UID', '' + uid );
						} else {
							v[ 'UID' ] = uid;
						};
						// childNodes...
						break;

					case X_NodeType_RAW_TEXT :
						if( xnode = X_Node_getXNode( v ) ) return xnode;
						this.parent     = X_Node_getXNode( v.parentNode );
						this[ '_rawObject' ] = v;
						this[ '_text' ]      = v.data;
						v[ 'UID' ] = uid;
						break;

					case X_NodeType_HTML_STRING :
					case X_NodeType_STRING :
						if( xnodes = X_HtmlParser_parse( v, true ) && 1 < xnodes.length ) return new X_NodeList( xnodes );
						if( xnodes.length ) return xnodes[ 0 ];
						return X_Node_none;

					default :
						if( X_Node_none ) return X_Node_none;
						this.length = 0;
						return;
				};
			};
			
			if( this.parent && ( this.parent[ '_flags' ] & X_NodeFlags_IN_TREE ) ){
				this[ '_flags' ] |= X_NodeFlags_IN_TREE;
			};
			this[ '_flags' ] |= X_NodeFlags_EXIST;
			
			X_Node_CHASHE[ this[ '_uid' ] = uid ] =
				this[ 0 ] = /* for like array */
					this;
		},
		
		// TODO .mesure() -> X.Event.MESURED
		'width'          : X_Node_width,
		'height'         : X_Node_height,
		'clientWidth'    : X_Node_clientWidth,
		'clientHeight'   : X_Node_clientHeight,
		'scrollWidth'    : X_Node_scrollWidth,
		'scrollHeight'   : X_Node_scrollHeight,
		'scrollLeft'     : X_Node_scrollLeft,
		'scrollTop'      : X_Node_scrollTop,
		'x'              : X_Node_x,
		'y'              : X_Node_y,
		'offset'         : X_Node_offset,

		'attr'           : X_Node_attr,
		'css'            : X_Node_css,
		'cssText'        : X_Node_cssText,

		'find'           : X_Node_find,
		
		'animate'        : X_Node_animate,
		'stop'           : X_Node_stop,
		
		
		'create'         : X_Node_create,
		
		'createAt'       : X_Node_createAt,
		
		'createText'     : X_Node_createText,
		
		'createTextAt'   : X_Node_createTextAt,
		
		'clone'          : X_Node_clone,
		
		'append'         : X_Node_append,
		
		'appendAt'       : X_Node_appendAt,
		
		'appendTo'       : X_Node_appendTo,
		
		'prev'           : X_Node_prev,
		
		'next'           : X_Node_next,
		
		'swap'           : X_Node_swap,
		
		'remove'         : X_Node_remove,
		
		'empty'          : X_Node_empty,
		
		'contains'       : X_Node_contains,
		
		'getChildAt'     : X_Node_getChildAt,
		
		'numChildren'    : X_Node_numChildren,
		
		'firstChild'     : X_Node_firstChild,
		
		'lastChild'      : X_Node_lastChild,
		
		'getOrder'       : X_Node_getOrder,
		
		'className'      : X_Node_className,
		'addClass'       : X_Node_addClass,
		'removeClass'    : X_Node_removeClass,
		'toggleClass'    : X_Node_toggleClass,
		'hasClass'       : X_Node_hasClass,
		
		'html'           : X_Node__html,
		'text'           : X_Node_text,
		'call'           : X_Node_call, // get(), set(), exec()
		'each'           : X_Node_each
		
	}
);

if( X_USE_DOM_RANGE ){
    X_Node.prototype[ 'createRange' ] = X_Node_createRange;
};

var X_NodeType_XNODE       = 1,
	X_NodeType_RAW_HTML    = 2,
	X_NodeType_RAW_TEXT    = 3,
	X_NodeType_HTML_STRING = 4,
	X_NodeType_STRING      = 5,
		//DOC_FRAG    = 6,
	X_NodeType_XNODE_LIST  = 7,
	X_NodeType_WINDOW      = 8,
	X_NodeType_DOCUMENT    = 9,
	X_NodeType_IMAGE       = 10,
	
	X_Node_strictElmCreation    = !X_UA.Tasman && ( X_UA.Trident || X_UA.TridentMobile ) <= 8,
	
	X_Node_documentFragment     = document.createDocumentFragment && ( !( X_UA.Trident || X_UA.TridentMobile ) || 5.5 <= ( X_UA.Trident || X_UA.TridentMobile ) ) && document.createDocumentFragment(),
	
	// 子の生成後に リアル文書 tree に追加する
	X_Node_addTreeAfterChildren = !( ( X_UA.Trident || X_UA.TridentMobile ) < 9 ),
	
	X_Node_displayNoneFixForIE5 = !!X_NodeFlags_IE5_DISPLAY_NONE_FIX,
	
	X_Node_newByTag      = false,
	
	X_Node_newByText     = false,
	
	X_Node_outerXNode    = null,
	
	X_Node_updateTimerID = 0,

	// XMLかどうかを判別する
	X_Node_isXmlDocument =
		X_UA_DOM.IE4 ?
			X_emptyFunction :
			(function( root ){
				if( X_Type_isBoolean( root.isXML ) ) return root.isXML;
				return root.isXML = root[ '_rawObject' ].createElement( 'p' ).tagName !== root[ '_rawObject' ].createElement( 'P' ).tagName;
			}),
	X_Node_CHASHE     = [],
	X_Node_none       = X_Node_CHASHE[ 0 ] = X_Node(),
	X_Node_html, // = <html>
	X_Node_head, // = <head>
	X_Node_body, // = <body>
	X_Node_systemNode, // = X_Node_CHASHE[ ? ]
	X_Node_fontSizeNode,
/*
 * remove :
 *  X_Node_reserveRemoval = [] に追加。commitUpdate で remove
 * add :
 *  X_Node_reserveRemoval にいたら消す, new_parent[ '_xnodes' ] に挿入
 */
	X_Node_reserveRemoval = [];

function X_Node_getType( v ){
	if( v === '' ) return X_NodeType_STRING;
	if( !v ) return 0;
	if( v === window ) return X_NodeType_WINDOW;
	if( v === document ) return X_NodeType_DOCUMENT;
	if( v.constructor === X_Node ) return X_NodeType_XNODE;
	if( v.constructor === X_NodeList ) return X_NodeType_XNODE_LIST;
	if( X_Type_isHTMLElement( v ) ) return X_NodeType_RAW_HTML;
	if( v.nodeType === 3 ) return X_NodeType_RAW_TEXT;
	if( X_Type_isString( v ) ){
		return '<' === v.charAt( 0 ) && v.charAt( v.length - 1 ) === '>' ? X_NodeType_HTML_STRING : X_NodeType_STRING;
	};
	// Node サブクラスのインスタンス
	if( v[ 'instanceOf' ] && v[ 'instanceOf' ]( X_Node ) ) return X_NodeType_XNODE;
	return 0;
};
function X_Node_getXNode( v ){
	var uid, i, chashe, xnode;
	switch( X_Node_getType( v ) ){
		case X_NodeType_XNODE :
		case X_NodeType_XNODE_LIST :
			return v;
		case X_NodeType_RAW_HTML :
			// fake TextNode too.
			if( X_UA_DOM.IE4 ){
				uid = v.getAttribute( 'UID' );
				return uid && X_Node_CHASHE[ uid ];
			};
			return v[ 'UID' ] && X_Node_CHASHE[ v[ 'UID' ] ];
		case X_NodeType_WINDOW :
			return X_ViewPort;
		case X_NodeType_DOCUMENT :
			return X_ViewPort_document;
		case X_NodeType_RAW_TEXT :
			if( v[ 'UID' ] ) return X_Node_CHASHE[ v[ 'UID' ] ];
			for( chashe = X_Node_CHASHE, i = chashe.length; i; ){
				if( ( xnode = chashe[ --i ] ) && ( xnode[ '_rawObject' ] === v ) ) return xnode;
			};
	};
};

function X_Node_getRoot( xnode ){
	return X_ViewPort_document;
	//return X_Node_body[ '_rawObject' ].documentElement ? node : node.ownerDocument || node.document;
};


// TODO document.all[ uid ] -> document[ uid ] 
var X_Node__ie4getRawNode = X_UA_DOM.IE4 && function ( that ){
		return that[ '_rawObject' ] ||
			( that[ '_rawObject' ] = document.all[ 'ie4uid' + that[ '_uid' ] ] || that[ '_id' ] && document.all[ that[ '_id' ] ] );
	};


function X_Node_toggleInTreeFlag( xnodes, flag ){
	var i = xnodes.length, xnode;
	for( ; i; ){
		xnode = xnodes[ --i ];
		flag ? ( xnode[ '_flags' ] |= X_NodeFlags_IN_TREE | X_NodeFlags_DIRTY_POSITION ) : ( xnode[ '_flags' ] &= ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX );
		xnode[ '_xnodes' ] && X_Node_toggleInTreeFlag( xnode[ '_xnodes' ], flag );
	};
};

function X_Node_toggleInGPUFlag( gpuRoot, xnodes, flag ){
	var i = xnodes.length, xnode;

	if( flag ){
		for( ; i; ){
			xnode = xnodes[ --i ];
			if( !xnode[ '_gpuParent' ] ){
				xnode[ '_flags' ] |= X_NodeFlags_GPU_CHILD;
				xnode[ '_gpuParent' ] = gpuRoot;
				xnode[ '_xnodes' ] && X_Node_toggleInTreeFlag( gpuRoot, xnode[ '_xnodes' ], flag );	
			};
		};
	} else {
		for( ; i; ){
			xnode = xnodes[ --i ];
			if( xnode[ '_gpuParent' ] === gpuRoot ){
				xnode[ '_flags' ] &= ~X_NodeFlags_GPU_CHILD;
				delete xnode[ '_gpuParent' ];
				xnode[ '_xnodes' ] && X_Node_toggleInTreeFlag( gpuRoot, xnode[ '_xnodes' ], flag );
			};
		};
	};
};

/**
 * タグ名等を指定して新規に子ノードを作成し、現在のノードに追加する。
 * @alias Node.prototype.create
 * @param {string} [tag] タグ名
 * @param {object} [opt_attrs=] 属性
 * @param {object|string}　[opt_css=] css
 * @return {Node} 新規作成されたノード
 * @example var child = parent.create( 'div' );
 */
function X_Node_create( tag, opt_attrs, opt_css ){
	var xnode;

	if( !this[ '_tag' ] ) return;
	this[ 'append' ]( xnode = X_Doc_create( tag, opt_attrs, opt_css ) );
	return xnode;
};
/**
 * 挿入位置とタグ名等を指定して新規に子ノードを作成し、現在のノードに挿入する。
 * @alias Node.prototype.createAt
 * @param {number} [index] 挿入位置
 * @param {string} [tag] タグ名
 * @param {object} [opt_attrs=] 属性
 * @param {object|string}　[opt_css=] css
 * @return {Node} 新規作成されたノード
 * @example var child = parent.create( 2, 'div' );
 */
function X_Node_createAt( index, tag, opt_attrs, opt_css ){
	var xnode;
	if( !this[ '_tag' ] ) return;
	this[ 'appendAt' ]( index, xnode = X_Doc_create( tag, opt_attrs, opt_css ) );
	return xnode;
};

/**
 * テキストを指定して新規にテキストノードを作成し、現在のノードに挿入する。
 * @alias Node.prototype.createText
 * @param {string} [tag] テキスト
 * @return {Node} 新規作成されたノード
 */
function X_Node_createText( text ){
	var xnode;
	if( !this[ '_tag' ] ) return;
	this[ 'append' ]( xnode = X_Doc_createText( text ) );
	return xnode;
};
/**
 * 挿入位置とテキストを指定して新規に子ノードを作成し、現在のノードに挿入する。
 * @alias Node.prototype.createTextAt
 * @param {number} [index] 挿入位置
 * @param {string} [tag] テキスト
 * @return {Node} 新規作成されたノード
 */
function X_Node_createTextAt( index, text ){
	var xnode;
	if( !this[ '_tag' ] ) return;
	this[ 'appendAt' ]( index, xnode = X_Doc_createText( text ) );
	return xnode;
};

/**
 * 選択されたテキストへの参照やテキスト座標情報
 * @alias Node.prototype.createRange
 * @return {TextRange} 新規作成されたテキストレンジ
 */
function X_Node_createRange( a, b, c ){
	return X_TextRange( this, a, b, c );
};

/**
 * Node のクローンを作成し返す。id もクローンされる点に注意。イベントリスナはクローンされない。
 * http://d.hatena.ne.jp/think49/20110724/1311472811
 * http://d.hatena.ne.jp/uupaa/20100508/1273299874
 * @alias Node.prototype.clone
 * @param {boolean} [opt_clone_children] 子要素のクローンを行うか？
 * @return {Node}
 */
function X_Node_clone( opt_clone_children ){
	var xnode, xnodes, i, l;
	
	if( this[ '_tag' ] ){
		X_Node_newByTag = true;
		xnode = X_Node( this[ '_tag' ], X_Object_copy( this[ '_attrs' ] ), X_Object_copy( this[ '_css' ] ) )
			[ 'attr' ]( { 'id' : this[ '_id' ] } )
			[ 'className' ]( this[ '_className' ] );
		
		if( this[ '_flags' ] & X_NodeFlags_IS_SVG ){
			xnode[ '_flags' ] |= X_NodeFlags_IS_SVG;
		};
		if( this[ '_flags' ] & X_NodeFlags_IS_VML ){
			xnode[ '_flags' ] |= X_NodeFlags_IS_VML;
		};
		
		if( opt_clone_children && ( xnodes = this[ '_xnodes' ] ) && ( l = xnodes.length ) ){
			for( i = 0; i < l; ++i ){
				xnode[ 'append' ]( xnodes[ i ][ 'clone' ]( true ) );
			};
		};
		return xnode;
	};
	X_Node_newByText = true;
	return X_Node( this[ '_text' ] );
};

/**
 * ノードを子配列の最後に追加する。文字列が渡された場合、HTMLパーサーによって Node ツリーを作成して追加する。HtmlElement, TextNode の場合は内部使用専用。
 * @alias Node.prototype.append
 * @param {Node|string|HTMLElement|TextNode} [v] HTMLElement と TextNode は内部のみ。
 * @return {Node} 自身。チェインメソッド
 * @example //
 * myNode.append( node );
 * myNode.append( node, '&lt;span&gt;Hello,&lt;/span&gt;', 'world.' );
 */
function X_Node_append( v ){
	var i, l, xnodes, frg;
	if( !this[ '_tag' ] ) return;
	
	if( 1 < ( l = arguments.length ) ){
		for( i = 0; i < l; ++i ){
			this[ 'append' ]( arguments[ i ] );
		};
		return this;
	};
	
	if( !( xnodes = this[ '_xnodes' ] ) ) this[ '_xnodes' ] = xnodes = [];
	
	switch( X_Node_getType( v ) ){
		case X_NodeType_RAW_HTML :
		case X_NodeType_RAW_TEXT :
			v = X_Node( v );
			break;
		case X_NodeType_HTML_STRING :
		case X_NodeType_STRING :
			return X_Node_append.apply( this, X_HtmlParser_parse( v, true ) );
		case X_NodeType_XNODE :
			// 親の xnodes から v を消す
		if( v.parent === this && xnodes[ xnodes.length - 1 ] === v ) return this;
			v[ 'remove' ]();
			// IE4 でテキストノードの追加、FIXED 済でない場合、親に要素の追加を通知
			if( ( X_UA.Trident || X_UA.TridentMobile ) < 5 && !v[ '_tag' ] && ( ( this[ '_flags' ] & X_NodeFlags_IE4_FIXED ) === 0 ) ) this[ '_flags' ] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
			break;
		default :
			return this;
	};

	v.parent = this;
	xnodes[ xnodes.length ] = v;
	if( this[ '_flags' ] & X_NodeFlags_IN_TREE ){
		v[ '_flags' ] |= X_NodeFlags_IN_TREE;
		v[ '_xnodes' ] && X_Node_toggleInTreeFlag( v[ '_xnodes' ], true );
		X_Node_reserveUpdate();
	};
	if( this[ '_flags' ] & X_NodeFlags_IS_SVG ){
		v[ '_flags' ] |= X_NodeFlags_IS_SVG;
	};
	if( this[ '_flags' ] & X_NodeFlags_IS_VML ){
		v[ '_flags' ] |= X_NodeFlags_IS_VML;
	};
	return this;
};

/**
 * ノードを挿入位置に追加する。
 * @alias Node.prototype.appendAt
 * @param {number} index 挿入位置 0以上
 * @param {Node|string|HTMLElement|TextNode} [v] HTMLElement と TextNode は内部のみ。
 * @return {Node} 自身。チェインメソッド
 * @example myNode.appendAt( 1, node );
 */
function X_Node_appendAt( start, v ){
	var xnodes, l, i;
	
	if( !this[ '_tag' ] ) return this;
	
	l = arguments.length;
	if( !( xnodes = this[ '_xnodes' ] ) ) xnodes = this[ '_xnodes' ] = [];
	
	if( xnodes.length <= start ){
		if( l === 2 ) return this[ 'append' ]( v );
		for( i = 1; i < l; ++i ){
			this[ 'append' ]( arguments[ i ] );
		};
		return this;
	};
	if( start < 0 ) start = 0;
	if( 2 < l ){
		for( ; l; ){
			this[ 'appendAt' ]( start, arguments[ --l ] );
		};
		return this;
	};

	switch( X_Node_getType( v ) ){
		case X_NodeType_RAW_HTML :
		case X_NodeType_RAW_TEXT :
			v = X_Node( v );
			break;
		case X_NodeType_HTML_STRING :
		case X_NodeType_STRING :
			v = X_HtmlParser_parse( v, true );
			for( i = v.length; i; ){
				this[ 'appendAt' ]( start, v[ --i ] );
			};
			return this;
		case X_NodeType_XNODE :
			// 親の xnodes から v を消す
			if( v.parent ){
				if( v.parent === this ){
					i = v[ 'getOrder' ]();
					if( i === start ) return this;
					if( i < start ) --start;
				};
				v[ 'remove' ]();
			};
			// IE4 でテキストノードの追加、FIXED 済でない場合、親に要素の追加を通知
			if( ( X_UA.Trident || X_UA.TridentMobile ) < 5 && !v[ '_tag' ] && ( ( this[ '_flags' ] & X_NodeFlags_IE4_FIXED ) === 0 ) ) this[ '_flags' ] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
			break;
		default :
			return this;
	};

	v.parent = this;
	this[ '_xnodes' ].splice( start, 0, v );
	if( this[ '_flags' ] & X_NodeFlags_IN_TREE ){
		v[ '_flags' ] |= X_NodeFlags_IN_TREE;
		v[ '_xnodes' ] && X_Node_toggleInTreeFlag( v[ '_xnodes' ], true );
		X_Node_reserveUpdate();
	};
	if( this[ '_flags' ] & X_NodeFlags_IS_SVG ){
		v[ '_flags' ] |= X_NodeFlags_IS_SVG;
	};
	if( this[ '_flags' ] & X_NodeFlags_IS_VML ){
		v[ '_flags' ] |= X_NodeFlags_IS_VML;
	};
	return this;
};

/**
 * ノードを親に追加する。戻り値は子ノードなので、続けて操作が出来る。
 * @alias Node.prototype.appendTo
 * @param {Node|string|HTMLElement} [parent] HTMLElement は内部のみ。
 * @param {number} [opt_index=-1] 挿入位置。省略した場合は最後に追加する。
 * @return {Node} 自身。チェインメソッド
 * @example childNode.appendTo( parentNode, 1 );
 */
function X_Node_appendTo( parent, opt_index ){
	switch( X_Node_getType( parent ) ){
		case X_NodeType_RAW_HTML :
			parent = X_Node( parent );
			break;
		case X_NodeType_HTML_STRING :
			parent = X_HtmlParser_parse( parent, true );
			parent = parent[ 0 ] || parent;
		case X_NodeType_XNODE :
			break;
		default :
			return this;
	};
	X_Type_isFinite( opt_index ) ? parent[ 'appendAt' ]( opt_index, this ) : parent[ 'append' ]( this );
	return this;
};


/**
 * ノードの直前の要素を取得。または直前に挿入。挿入する要素が先にいる兄弟でも正しく動作する。
 * @alias Node.prototype.prev
 * @param {Node|string|HTMLElement|TextNode} [...v] HTMLElement と TextNode は内部のみ。
 * @return {Node} 自身。チェインメソッド
 * @example childNode.prev( prevNode );
 */
function X_Node_prev( v ){
	var parent = this.parent, xnodes, i, l;
	
	// getter
	if( v === undefined ){
		if( !parent ) return;
		xnodes = parent[ '_xnodes' ];
		i      = xnodes.indexOf( this );
		return 0 < i ? xnodes[ i - 1 ] : v;
	};
	
	if( !parent ) return this;
	
	l = arguments.length;
	if( 1 < l ){
		for( i = 0; l; ++i ){
			parent[ 'appendAt' ]( this[ 'getOrder' ]() - i, arguments[ --l ] );
		};
		return this;
	};
	parent[ 'appendAt' ]( this[ 'getOrder' ](), v );
	return this;
};

/**
 * ノードの直後の要素を取得。または直後に挿入。挿入する要素が先にいる兄弟でも正しく動作する。
 * @alias Node.prototype.next
 * @param {Node|string|HTMLElement|TextNode} [v] HTMLElement と TextNode は内部のみ。
 * @return {Node|undefined} getter の場合は Node か undefined が返る。setter の場合は自身。チェインメソッド。
 * @example childNode.next( prevNode );
 */
function X_Node_next( v ){
	var parent = this.parent, xnodes, i, l, start;
	
	// getter
	if( v === undefined ){
		if( !parent ) return;
		xnodes = parent[ '_xnodes' ];
		i      = xnodes.indexOf( this );
		return ++i < xnodes.length ? xnodes[ i ] : v;
	};
	
	if( !parent ) return this;
	
	l = arguments.length;
	start = this[ 'getOrder' ]() + 1;
	
	if( parent[ '_xnodes' ].length <= start ){
		for( i = 0; i < l; ++i ){
			parent[ 'append' ]( arguments[ i ] );
		};
	} else
	if( 1 < l ){
		for( ; l; ){
			parent[ 'appendAt' ]( this[ 'getOrder' ]() + 1, arguments[ --l ] );
		};
	} else {
		parent[ 'appendAt' ]( start, v );
	};
	return this;
};

/**
 * 要素の入れ替え。自身は remove() される。
 * @alias Node.prototype.swap
 * @param {Node|string|HTMLElement|TextNode} [v] HTMLElement と TextNode は内部のみ。
 * @return {Node} 自身。チェインメソッド
 * @example node.swap( newNode );
 */
function X_Node_swap( v ){
	if( !this.parent ) return this;
	return arguments.length === 1 ? this[ 'prev' ]( v )[ 'remove' ]() : X_Node_prev.apply( this, arguments )[ 'remove' ]();
};

/**
 * 要素を親要素から抜く。jQuery の　remove と異なり、インスタンスは破壊(kill)されず、再び別の親に挿入等できる
 * @alias Node.prototype.remove
 * @return {Node} 自身。チェインメソッド
 * @example node.remove();
 * parent.append( node ); 新しい親に追加できる
 */
function X_Node_remove(){
	var parent = this.parent,
		elm;
	
	if( !parent ) return this;

	// stop() ->
	if( this[ '_anime' ] && this[ '_anime' ].phase ){
		//console.log( 'Animation 中の REMOVE' );
		X_NodeAnime_stopNow( this );
	};
	// 子孫にアニメーション中の要素が要る
	// 先祖に GPU 化した要素が要る

	delete this.parent;
	parent[ '_xnodes' ].splice( parent[ '_xnodes' ].indexOf( this ), 1 );
	
	if( this[ '_flags' ] & X_NodeFlags_IN_TREE ){
		this[ '_flags' ] &= ~X_NodeFlags_IN_TREE & ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
		this[ '_xnodes' ] && X_Node_toggleInTreeFlag( this[ '_xnodes' ], false );

		if( X_UA_DOM.IE4 ){
			if( elm = this[ '_rawObject' ] || X_Node__ie4getRawNode( this ) ){
				X_Node_reserveRemoval[ X_Node_reserveRemoval.length ] = this;
				X_Node_reserveUpdate();
			} else
			if( !this[ '_tag' ] && ( ( parent[ '_flags' ] & X_NodeFlags_IE4_FIXED ) === 0 ) ){
				parent[ '_flags' ] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
			};
		} else {
			elm = this[ '_rawObject' ];
			if( elm && elm.parentNode && elm.parentNode.tagName ){
				X_Node_reserveRemoval[ X_Node_reserveRemoval.length ] = this;
				X_Node_reserveUpdate();			
			};
		};
	} else {
		if( !X_UA_DOM.IE4 ){
			elm = this[ '_rawObject' ];
			if( elm && elm.parentNode && elm.parentNode.tagName ){
				X_Node_reserveRemoval[ X_Node_reserveRemoval.length ] = this;
				X_Node_reserveUpdate();			
			};
		};
	};
	return this;
};

/**
 * 子要素を破棄する。子要素は kill() されます。
 * @alias Node.prototype.empty
 * @return {Node} 自身。チェインメソッド
 * @example node.empty();
 */
function X_Node_empty(){
	var xnodes = this[ '_xnodes' ], i;
	
	if( xnodes && ( i = xnodes.length ) ){
		delete this[ '_xnodes' ];
		for( ; i; ){
			xnodes[ --i ][ 'kill' ]();
		};
		xnodes.length = 0;
	};
	return this;
};

function X_Node_onKill( that ){
	var parent = that.parent,
		xnodes = that[ '_xnodes' ], i, elm;
	
	if( ( that[ '_flags' ] & X_NodeFlags_EXIST ) === 0 ) return;
	
	parent && parent[ '_xnodes' ] && parent[ '_xnodes' ].splice( parent[ '_xnodes' ].indexOf( that ), 1 );

	if( xnodes && ( i = xnodes.length ) ){
		delete that[ '_xnodes' ];
		for( ; i; ){
			xnodes[ --i ][ 'kill' ]();
		};
		xnodes.length = 0;
	};

	X_Node_CHASHE[ that[ '_uid' ] ] = null; // array に対して delete X_Node_CHASHE[ uid ]　はまずい!

	if( that[ '_anime' ] && that[ '_anime' ].phase ){
		//console.log( 'Animation 中の KILL' );
		X_NodeAnime_stopNow( that );
	};

// remove _xnodes
	if( X_UA_DOM.IE4 ){
        elm = that[ '_rawObject' ] || X_UA_DOM.IE4 && X_Node__ie4getRawNode( that );
		if( elm ){
			X_Node_reserveRemoval[ X_Node_reserveRemoval.length ] = elm;
			X_Node_reserveUpdate();			
		} else
		if( !that[ '_tag' ] && ( ( parent[ '_flags' ] & X_NodeFlags_IE4_FIXED ) === 0 ) ){
			parent[ '_flags' ] |= X_NodeFlags_IE4_DIRTY_CHILDREN;
		};
	} else {
        elm = that[ '_rawObject' ];
		if( elm && elm.parentNode && elm.parentNode.tagName ){
			X_Node_reserveRemoval[ X_Node_reserveRemoval.length ] = elm;
			X_Node_reserveUpdate();
		};
	};
};

/**
 * 要素を子以下に持つか？調べる。
 * @alias Node.prototype.contains
 * @param {Node|string|HTMLElement|TextNode} [v] HTMLElement と TextNode は内部のみ。
 * @return {boolean} 
 * @example node.contains( testNode );
 */
function X_Node_contains( v ){
	var xnodes;
	
	if( !v || !this[ '_tag' ] || this === v ) return false;

	xnodes = this[ '_xnodes' ];
	if( !xnodes || !xnodes.length ) return false;

	while( v = v[ 'parent' ] ){
		if( this === v ) return true;
	};
	return false;
};

/**
 * index の子要素を取得する。
 * @alias Node.prototype.getChildAt
 * @param {number} index 取得する子ノードの位置。0～
 * @return {Node} 子要素
 * @example child1 = parent.getChildAt(1);
 */
function X_Node_getChildAt( i ){
	var xnodes = this[ '_xnodes' ];
	return xnodes && 0 <= i && i < xnodes.length && xnodes[ i ];
};

/**
 * 子要素の数を取得する。
 * @alias Node.prototype.numChildren
 * @return {number} 子要素の数。
 * @example n = parent.numChildren();
 */
function X_Node_numChildren(){
	var xnodes = this[ '_xnodes' ];
	return xnodes ? xnodes.length : 0;
};

/**
 * 最初の子要素を取得する。
 * @alias Node.prototype.firstChild
 * @return {Node} 最初の子要素
 * @example child0 = parent.firstChild();
 */
function X_Node_firstChild(){
	return this[ '_xnodes' ] && this[ '_xnodes' ][ 0 ];
};

/**
 * 最後の子要素を取得する。
 * @alias Node.prototype.lastChild
 * @return {Node} 最後の子要素
 * @example lastChild = parent.lastChild();
 */
function X_Node_lastChild(){
	var xnodes = this[ '_xnodes' ];
	return xnodes && xnodes[ xnodes.length - 1 ];
};

/**
 * 要素の index 位置を取得する。
 * @alias Node.prototype.getOrder
 * @return {number} index -1　の場合、親を持たない。
 * @example index = node.getOrder();
 */
function X_Node_getOrder(){
	var parent = this.parent;
	return this === X_Node_html ?
				0 :
		   parent ?
				parent[ '_xnodes' ].indexOf( this ) :
				-1;
};

/**
 * className の取得と設定。
 * @alias Node.prototype.className
 * @return {string|Node} getter の場合 class 文字列、setter の場合自身。
 * @example // getter
 * className = node.className();
 * // setter
 * node.className( 'myClass myClass_new' );
 */
function X_Node_className( v ){
	var node, _, __;
	// getter
	if( v === undefined ) return this[ '_className' ];
	
	// setter
	if( this[ '_className' ] === v ) return this;
	if( !v || !X_Type_isString( v ) ){
		delete this[ '_className' ];
	} else {
		// cleanup
		_  = ' ';
		__ = '  ';
		while( v.indexOf( __ ) !== -1 ){ v = v.split( __ ).join( _ ); };
		v.charAt( 0 ) === _ && ( v = v.substr( 1 ) );
		v.lastIndexOf( _ ) === 0 && ( v = v.substr( 0, v.length - 1 ) );
		
		if( this[ '_className' ] === v ) return this;
		v ? ( this[ '_className' ] = v ) : delete this[ '_className' ];
	};
	this[ '_flags' ] |= X_NodeFlags_DIRTY_CLASSNAME;
	this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
	return this;
};

/**
 * className の追加。
 * @alias Node.prototype.addClass
 * @param {string} className スペース区切りで複数のクラスを追加できる。
 * @return {Node} 自身。
 * @example node.addClass( 'myClass myClass_new' );
 */
function X_Node_addClass( v ){
	var names  = v.split( ' ' ),
		i      = names.length,
		_class = this[ '_className' ],
		name;
	v = '';
	for( ; i; ){
		name = names[ --i ];
		if( !name ) continue;
		!this[ 'hasClass' ]( name ) && ( v += ( v ? ' ' : '' ) + name );
	};
	return v ? this[ 'className' ]( ( _class ? _class + ' ' : '' ) + v ) : this;
};

/**
 * className の削除。
 * @alias Node.prototype.removeClass
 * @param {string} className スペース区切りで複数のクラスを削除できる。
 * @return {Node} 自身。
 * @example node.removeClass( 'myClass myClass_new' );
 */
function X_Node_removeClass( v ){
	var _      = ' ',
		_class = this[ '_className' ],
		names  = v.split( _ ),
		classNames, i, f, j;

	if( !_class ) return this;
	for( classNames = _class.split( _ ), i = classNames.length; i; ){
		_class = classNames[ --i ];
		for( j = names.length; j; ){
			if( _class === names[ --j ] ){
				classNames.splice( i, 1 );
				names.splice( j, 1 );
				f = true;
				break;
			};
		};
	};
	return f ? this[ 'className' ]( classNames.join( _ ) ) : this;
};

/**
 * className の更新。
 * @alias Node.prototype.toggleClass
 * @param {string} className スペース区切りで複数のクラスを削除できる。
 * @param {boolean} [opt_toggle=] true はクラスの追加。false はクラスの削除。undefined はクラスのトグル。
 * @return {Node} 自身。
 * @example node.toggleClass( 'myClass myClass_new', !!n );
 */
function X_Node_toggleClass( v, opt_toggle ){
	var names, i, name;
	if( opt_toggle !== undefined ){
		return !opt_toggle ? this[ 'removeClass' ]( v ) : this[ 'addClass' ]( v );	
	};
	names = v.split( ' ' );
	for( i = names.length; i; ){
		name = names[ --i ];
		this[ 'hasClass' ]( name ) ? this[ 'removeClass' ]( name ) : this[ 'addClass' ]( name );
	};
	return this;
};

/**
 * className を持つか。
 * @alias Node.prototype.hasClass
 * @param {string} className スペース区切りで複数のクラスを削除できる。
 * @return {boolean} 
 * @example node.hasClass( 'myClass myClass_new' );
 */
function X_Node_hasClass( v ){
	var _ = ' ',
		_class = this[ '_className' ],
		i, name;
	if( _class === v ) return true;
	if( !_class ) return false;
	
	_class = _ + _class + _;
	if( _class.indexOf( _ + v + _ ) !== -1 ) return true; // lucky hit
	
	for( v = v.split( _ ), i = v.length; i; ){
		name = v[ --i ];
		if( name === '' ) continue;
		if( _class.indexOf( _ + name + _ ) === -1 ) return false;
	};
	return true;
};

/**
 * innerHTML 取得・設定。outerHTML が欲しい場合は、xnode.call('outerHTML') とできる。
 * @alias Node.prototype.html
 * @param {string|number|boolean|null} [html=] html文字列, String 以外に Number や false null なども許可
 * @return {string|Node} 
 * @example node.html( '<img>' );
 */
function X_Node__html( html ){
	var _ = '', q = '"', xnodes, n, i, l;
	// setter
	if( html !== undefined ){
		if( !this[ '_tag' ] ) return this[ 'text' ]( html );
		
		this[ 'empty' ]();
		if( html += '' ){
			X_Node_append.apply( this, X_HtmlParser_parse( html, true ) );
		};
		return this;
	};
	
	// getter
	if( !this[ '_tag' ] ){
		return this[ '_text' ];
	};
	
	this[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText( this );

	html = !X_Node_outerXNode ? [] : [
		'<', this[ '_tag' ],
		this[ '_id' ] ? ' id="' + this[ '_id' ] + q : _,
		this[ '_className' ] ? ' class="' + this[ '_className' ] + q : _,
		this[ '_flags' ] & X_NodeFlags_OLD_ATTRTEXT ? X_Node_Attr_objToAttrText( this ) : this[ '_attrText' ],
		this[ '_cssText' ] ? ' style="' + this[ '_cssText' ] + q : _,
	'>' ];
	
	n = html.length;
	if( ( xnodes = this[ '_xnodes' ] ) && ( l = xnodes.length ) ){
		if( !X_Node_outerXNode ) X_Node_outerXNode = this;
		for( i = 0; i < l; ++i ){
			html[ n ] = xnodes[ i ][ 'html' ]();
			++n;
		};
		if( X_Node_outerXNode === this ) X_Node_outerXNode = null;
	};
	!X_Node_outerXNode || X_Dom_DTD_EMPTY[ this[ '_tag' ] ] || ( html[ n ] = '<\/' + this[ '_tag' ] + '>' );
	return html.join( _ );
};

/*
 * null が来たら '', 数値等が来たら文字列化
 */
/**
 * textContent 取得・設定。null が来たら '', 数値等が来たら文字列化
 * @alias Node.prototype.text
 * @param {string|number|boolean|null} [content=] String 以外に Number や false null なども許可
 * @return {string|Node} 
 * @example node.text( 'Hello, world!' );
 */
function X_Node_text( content ){
	var str, xnodes, texts, i, l;
	// setter
	if( content !== undefined ){
		if( content === null ) content = '';
		str = content + '';
		
		if( !this[ '_tag' ] ){
			if( this[ '_text' ] !== str ){
				str ? ( this[ '_text' ] = str ) : delete this[ '_text' ];
				this[ '_flags' ] |= X_NodeFlags_DIRTY_CONTENT;				
				this[ '_flags' ] & X_NodeFlags_IN_TREE && X_Node_reserveUpdate();
			};
			return this;
		};
		if( ( xnodes = this[ '_xnodes' ] ) && xnodes.length === 1 && !xnodes[ 0 ][ '_tag' ] ){
			xnodes[ 0 ][ 'text' ]( str );
			return this;
		};
		// TODO 一つのtextnode を残すケース 完全に削除したい場合は empty()を使う
		if( !str ) return this[ 'empty' ]();		
		this[ 'empty' ]()[ 'createText' ]( str );
		return this;
	};
	// getter
	if( this[ '_tag' ] ){
		if( ( xnodes = this[ '_xnodes' ] ) && ( l = xnodes.length ) ){
			for( texts = [], i = 0; i < l; ++i ){
				texts[ i ] = xnodes[ i ][ 'text' ]();
			};
			return texts.join( '' );
		};
		return '';
	};
	return this[ '_text' ];
};

/**
 * HTML要素に対して name の関数を実行しその戻り値を返す。関数に渡す引数も任意に設定できる。
 * @alias Node.prototype.call
 * @param {string} [name] 要素の関数名
 * @return {*} 
 * @example node.call( 'focus' );
 */
function X_Node_call( name /*, opt_args... */ ){
	var args = arguments,
		l    = args.length - 1,
		v, raw, parent, body,
		child, childX, childY, childW, childH,
		parentW, parentH,
		parentSX, parentSY, parentSW, parentSH,
		visibleX, visibleY, visibleW, visibleH,
		visiblePartX, visiblePartY, func, args, params, i;

	switch( name ){
		case 'isSVG' :
			return !!( this[ '_flags' ] & X_NodeFlags_IS_SVG );
		case 'isVML' :
			return !!( this[ '_flags' ] & X_NodeFlags_IS_VML );
		case 'nodeType' :
			return this[ '_tag' ] ? 1 : 3;
		case 'outerHTML' :
			X_Node_outerXNode = X_Node_body; // == true ならなんでもよい。型を合わすために xbody にしている
			v = this[ 'html' ]();
			X_Node_outerXNode = null;
			return v;
		case 'treeIsDirty' :
			return !!X_Node_updateTimerID;
		case 'fontSize' :
			return ( this[ '_flags' ] & X_NodeFlags_IN_TREE ) ? X_Node_CSS_getCharSize( this ) : 0;
		case 'inGPU' :
			return !!( this[ '_flags' ] & ( X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED ) );
		case 'isGPUChild' :
			if( this[ '_flags' ] & X_NodeFlags_IN_TREE ){
				parent = this;
				while( parent = parent.parent ){
					if( parent[ '_flags' ] & ( X_NodeFlags_GPU_NOW | X_NodeFlags_GPU_RELEASE_RESERVED ) ) return true;
				};
			};
			return false;
		case 'containGPU' :
			
			return false;
		case 'canAnimateNow' :
			return ( this[ '_flags' ] & X_NodeFlags_IN_TREE ) && X_NodeAnime_detectWaitAnimation( this, true, true ) === 6;
		case 'animeState' :
			return this[ '_anime' ] ? this[ '_anime' ].phase : 0;
		case 'animeProgress' :
			return this[ '_anime' ] && this[ '_anime' ].phase === 7 ? this[ '_anime' ].progress : 0;
	};
	
	X_Node_updateTimerID && X_Node_startUpdate();
	
	raw  = this[ '_rawObject' ] || X_UA_DOM.IE4 && X_Node__ie4getRawNode( this );
	
	if( !raw ) return;
	
	if( name === 'scrollTo' ){
		raw.scrollLeft = args[ 1 ] || 0;
		raw.scrollTop  = args[ 2 ] || 0;
		return;
	};
	
	if( name === 'inView' ){
		if( !( this[ '_flags' ] & X_NodeFlags_IN_TREE ) ) return { 'isInView' : false };
		body   = X_elmBody;
		child  = raw;
		visibleX = visibleY = visibleW = visibleH = 0;
		while( child !== body ){
			parent   = child.parentNode || child.parentElement;
			parentH  = parent.clientHeight;
			parentW  = parent.clientWidth;
			parentSW = parent.scrollHeight;
			parentSH = parent.scrollWidth;
			// 親がスクロール領域を持つ
			if( parentH < parentSH || parentW < parentSW ){
				childX   = child.offsetLeft + visibleX;
				childY   = child.offsetTop  + visibleY;
				childW   = visibleW || child.offsetWidth;
				childH   = visibleH || child.offsetHeight;
				parentSX = parent.scrollLeft;
				parentSY = parent.scrollTop;
				// 子が表示領域内
				if( parentSY < childY   + childH &&
		            childY   < parentSY + parentH &&
		            parentSX < childX   + childW  &&
		            childX   < parentSX + parentW ){
		            	
		            // right:子の左側が見えている left:子の左側が見えている both:完全に見えている
					visiblePartX =
						childX < parentSX ? 'right' :
						( parentSX + parentW ) < ( childX + childW ) ? 'left' : 'both';
					visiblePartY = 
						childY < parentSY ? 'bottom' :
						( parentSY + parentH ) < ( childY + childH ) ? 'top' : 'both';

					// 子が見える領域
					visibleX = visiblePartX === 'right'  ? 0 : childX - parentSX;
					visibleY = visiblePartX === 'bottom' ? 0 : childY - parentSY;
					visibleW =
						visiblePartX === 'both'   ? childW :
						visiblePartX === 'right'  ? ( parentSX + parentW - childX ) : ( childX + childW - parentSX );
					visibleH =
						visiblePartY === 'both'   ? childH :
						visiblePartY === 'bottom' ? ( parentSY + parentH - childY ) : ( childY + childH - parentSY );        	
	            } else {
	            	return { 'isInView' : false };
	            };
			};
			child = parent;		
		};
		return { 'isInView' : true };
	};
	
	func = raw[ name ];
	if( X_Type_isFunction( func ) ){
		if( l ){
			args = X_Array_copy( args );
			args.shift();
			return func.apply( raw, args );
		};
		return raw[ name ]();		
	} else
	if( ( X_UA.Trident || X_UA.TridentMobile ) < 9 && ( X_Type_isUnknown( func ) || X_Type_isObject( func ) ) ){
		// typeof func === unknown に対策
		// http://la.ma.la/blog/diary_200509031529.htm		
		if( l ){
			args = X_Array_copy( args );
			args.shift();
			
	        params = [];
	        for( i = 0; i < l; ++i ){
	        	params[ i ] = '_' + i;
	        };
	        params = params.join( ',' );
	        return Function(
	        	params,
	            [ 'return this.', name, '(', params, ')' ].join( '' )
	        ).apply( raw, args );
		};
		return raw[ name ]();
	};
};

/*
 * xnode を this として関数を実行する。 NodeList.each と動作を合わせてあるため関数の戻り値は破棄される。
 * 関数に渡す引数も任意に設定できる。
 */
function X_Node_each( func /*, opt_args */ ){
	var args;
	if( 1 < arguments.length ){
		args = X_Array_copy( arguments );
		args[ 0 ] = 0;		
		func.apply( this, args );
	} else {
		func.call( this, 0 );
	};
	return this;
};


/* --------------------------------------
 *  Async commit update
 * 
 * TODO Timer や DOM イベントの呼び出しの最後に、まだ一度も commitUpdate していないなら commitUpdate してしまう。
 */
	
function X_Node_reserveUpdate(){
	if( !X_Node_updateTimerID ) X_Node_updateTimerID = X_Timer_requestFrame( X_Node_startUpdate );
};

var X_Node_updateReservedByReleaseGPU = false;

function X_Node_startUpdate( time ){
	var removal, i, xnodeOrElm, xnodesIEFilterFixAfter, xnode, active;
	
	if( !X_Node_updateTimerID || X_ViewPort_readyState < X_EVENT_INIT ){
		return;
	};

	X_Timer_cancelFrame( X_Node_updateTimerID );
	X_Node_updateTimerID = 0;

	if( time ){
		// X.Timer 経由でないと発火しない このイベントでサイズを取ると無限ループに
		X_System[ '_listeners' ] && X_System[ '_listeners' ][ X_EVENT_BEFORE_UPDATE ] && X_System[ 'dispatch' ]( X_EVENT_BEFORE_UPDATE );
	};

	removal = X_Node_reserveRemoval;

	if( i = removal.length ){
		for( ; i; ){
			xnodeOrElm = removal[ --i ];
			// TODO GPU レイヤーの子の場合、remove をスキップする。 非GPU レイヤーへ apppend される場合、clone する?
			// GPU レイヤーを削除する場合、cssText = '' して GPU レイヤーを解除する
			if( !xnodeOrElm[ 'instanceOf' ] ){
				if( X_UA_DOM.IE4 ){
					xnodeOrElm.removeAttribute( 'id' ); // ?
					xnodeOrElm.outerHTML = ''; // xnodeOrElm.remove() ?
				} else {
					if( !X_UA.Tasman ){
						// elm.parentNode.tagName for ie7
						xnodeOrElm.parentNode && xnodeOrElm.parentNode.tagName && xnodeOrElm.parentNode.removeChild( xnodeOrElm );
					} else {
						xnodeOrElm.parentNode && xnodeOrElm.parentNode.tagName && X_TEMP._fixed_remove( xnodeOrElm );
					};
				};
			} else {
				X_Node__actualRemove( xnodeOrElm );
			};
		};
		removal.length = 0;
	};
	
	// 強制的に再描画を起こす, 但し activeElement からフォーカスが外れるため復帰する
	// IE5mode win10 で 確認, 2020/4/7 Win10 IE11 IE5 mode では不要
	if( 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 5.5 && ( X_UA.Win32 !== 10 ) ){
		active = FocusUtility_getFocusedElement();
		X_elmBody.style.visibility = 'hidden';
	};

	if( X_Node_html[ '_flags' ] & X_Node_BitMask_IS_DIRTY ){
		X_Node__commitUpdate( X_Node_html, X_Node_html[ '_rawObject' ].parentNode, null, X_Node_html[ '_flags' ], 1, xnodesIEFilterFixAfter = [] );
	} else {
		X_Node__commitUpdate( X_Node_head, X_Node_head[ '_rawObject' ].parentNode, null, X_Node_head[ '_flags' ], 1, xnodesIEFilterFixAfter = [] );
		X_Node__commitUpdate( X_Node_body, X_Node_body[ '_rawObject' ].parentNode, null, X_Node_body[ '_flags' ], 1, xnodesIEFilterFixAfter = [] );
	};

	if( 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 5.5 && ( X_UA.Win32 !== 10 )  ){
		X_elmBody.style.visibility = '';
		active && active.parentNode && FocusUtility_setTemporarilyFocus( active );
	};
	
	if( X_Node_updateReservedByReleaseGPU ){
		X_Node_reserveUpdate();
		X_Node_updateReservedByReleaseGPU = false;
	};
	
	if( X_NodeFlags_IE_FILTER_FIX_AFTER && xnodesIEFilterFixAfter.length ){
		for( i = 0; xnode = xnodesIEFilterFixAfter[ i ]; ++i ){
			xnode[ '_flags' ] &= ~X_NodeFlags_IE_FILTER_FIX_AFTER;
			X_Node_CSS_onAfterUpdateIEFilterFix( xnode );
		};
	};

	// time を視て X.Timer 経由の場合、即座に発火する。
	// width() 等で強制的にツリーを構築している場合、UPDATE イベントのコールバックで要素を変更しサイズを取ると無限ループになる,これを防ぐため asyncDispatch とする
	X_System[ '_listeners' ] && X_System[ '_listeners' ][ X_EVENT_UPDATED ] && ( time ? X_System[ 'dispatch' ]( X_EVENT_UPDATED ) : X_System[ 'asyncDispatch' ]( X_EVENT_UPDATED ) );
	
	X_ViewPort[ '_listeners' ] && X_ViewPort[ '_listeners' ][ X_EVENT_AFTER_UPDATE ] && X_ViewPort[ 'asyncDispatch' ]( X_EVENT_AFTER_UPDATE );
};

/*
 * 1. GPU_NOW の場合、子の変更は行わない
 * 2. GPU解放予約 の場合//、この要素のみ変更を行う。rAF　後にさらに更新するためフラグを立てる。
 * 3. GPU予約 -> GPU
 * 4. style="display:none" の場合、これ以下の変更を行わない。
 * 5. ie5 非表示フラグが立っていて、親と自身の class・id によって非表示になっていて、親と自身に変更がない。accumulatedFlags を使用。
 *     -> TODO これ TREE の変更を検出できない。 remove したときに 子まで X_NodeFlags_IE5_DISPLAY_NONE_FIXを落とす。
 * 6. 要素の生成
 * 7. 要素の位置のズレを補正
 * 8. 更新の適用
 * 9. ie5 親及び自身へのクラス・id指定で display:none になるケースがありそれを検出。
 *   このままでは、生成と破棄が繰り返されてしまうので親と自身のクラス・idが変わった場合、ツリー位置の変化があった場合に再生する。
 */
var X_Node__commitUpdate =
	X_UA_DOM.W3C ?
		( function( that, parentElement, nextElement, accumulatedFlags, ie8AccumulatedOpcity, xnodesIEFilterFixAfter ){
			var elm = that[ '_rawObject' ],
				created, xnodes, l, next, currentOpcity;

			// 1. GPU 一切の更新をスキップ
			if( that[ '_flags' ] & X_NodeFlags_GPU_NOW ){
				//console.log( '更新のskip ' + that[ '_className' ] + !!( that[ '_flags' ] & X_Node_BitMask_IS_DIRTY ) );
				that[ '_flags' ] & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode( that, elm );
				return elm;
			};

			// 2. GPU解放予約
			if( that[ '_flags' ] & X_NodeFlags_GPU_RELEASE_RESERVED ){
				//console.log( 'GPU 解放 ' );
				//X_Node_updateReservedByReleaseGPU = true;
				that[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
				//return elm;// このタイミングで更新できるっぽい。
			};

			// 3. GPU予約 -> GPU
			if( that[ '_flags' ] & X_NodeFlags_GPU_RESERVED ){
				// TODO size 取得のための update の場合、GPU化をスキップ
				that[ '_flags' ] &= X_Node_BitMask_RESET_GPU;
				that[ '_flags' ] |= X_NodeFlags_GPU_NOW;
			};

			// 4. style="display:none" の場合
			if( that[ '_flags' ] & X_NodeFlags_STYLE_IS_DISPLAY_NONE ){
				if( X_Node_displayNoneFixForIE5 ){
					// filter の効いている要素を含む要素は display:none が無視される。
					// filter = '' で削除はできるが、再表示時に filter が消える。 -> filter な要素を削除してしまう。	
					// TODO filters[0].enabled = false なんてどう?					
					if( elm && elm.parentNode ){
						X_Node__actualRemove( that );
					};
					return nextElement;
				};
				elm && ( elm.style.display = 'none' );
				return ( elm && elm.nextSibling === nextElement ) ? elm : nextElement;
			};
			
			// 5. ie5 非表示fixフラグ
			accumulatedFlags |= that[ '_flags' ];
			
			if( that[ '_flags' ] & X_NodeFlags_IE5_DISPLAY_NONE_FIX ){
				if( ( accumulatedFlags & ( X_NodeFlags_DIRTY_POSITION | X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME ) ) === 0 ){
					return nextElement;
				};
			};
			
			// 6. 要素の生成
			if( !elm ){
				if( !that[ '_tag' ] ){
					that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
					if( ( X_UA.Trident || X_UA.TridentMobile ) < 8 ){
						// \n -> \r\n に変換しないと pre タグで改行されない  win10ie7(ie11 emu) で確認
						elm = document.createTextNode( X_String_chrReferanceTo( that[ '_text' ] ).split( '\n' ).join( X_String_CRLF ) );
					} else {
						elm = document.createTextNode( X_String_chrReferanceTo( that[ '_text' ] ) );
					};
					if( !( X_UA.Trident || X_UA.TridentMobile ) ){
						elm[ 'UID' ] = that[ '_uid' ];
					};
				} else
				if( X_Node_strictElmCreation ){
					that[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText( that, true ); // OLD_CSSTEXT ??
		
					elm =
						document.createElement( [
							'<', that[ '_tag' ],
								' UID="', that[ '_uid' ], '"',
								that[ '_id' ] ? ' id="' + that[ '_id' ] + '"' : '',
								that[ '_className' ] ? ' class="' + that[ '_className' ] + '"' : '',
								X_Node_Attr_objToAttrText( that, true ),
								that[ '_cssText' ] ? ' style="' + that[ '_cssText' ] + '"' : '',
							'>' ].join( '' ) );
				} else
				if( that[ '_flags' ] & X_NodeFlags_IS_SVG ){
					elm = document.createElementNS( 'http://www.w3.org/2000/svg', that[ '_tag' ].toLowerCase() );
					
					// TODO math http://www.w3.org/1998/Math/MathML
				} else {
					elm = document.createElement( that[ '_tag' ] );
				};
				
				that[ '_rawObject' ] = elm;
				
				// IE には要素追加のタイミングで起こるメモリリークがありここで追加
				if( !X_Node_addTreeAfterChildren ){
					nextElement ?
						parentElement.insertBefore( elm, nextElement ) :
						parentElement.appendChild( elm );
				};

				if( that[ '_tag' ] ){
					X_EventDispatcher_toggleAllEvents( that, true );// イベントの復帰				
					that[ '_flags' ] |= X_NodeFlags_ACTUAL_LISTENING;
					
					//if( X_Node_documentFragment ){
						//( frg = X_Node_documentFragment ).appendChild( elm );
						// 連続する要素の差し替えの場合に有効
					//};

					if( X_Node_strictElmCreation ){
						that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
						// ie の string から要素を作る場合、ネットワーク系属性は onload イベントなどを拾うために、要素生成->イベント復帰後に適用する
						that[ '_newAttrs' ] && ( that[ '_flags' ] |= X_NodeFlags_DIRTY_ATTR ); // _newAttrs には ネットワーク系属性が入っている。Network 系の属性は遅らせて設定
						that[ '_flags' ] |= X_NodeFlags_DIRTY_IE_FILTER;// doc 追加後に filter を指定しないと有効にならない。
					} else {
						elm[ 'UID' ] = that[ '_uid' ];
						that[ '_newAttrs' ] = that[ '_attrs' ];
						that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
						that[ '_flags' ] |= X_NodeFlags_DIRTY_ID | X_NodeFlags_DIRTY_CLASSNAME | X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_CSS | X_NodeFlags_DIRTY_IE_FILTER;
						
						// http://outcloud.blogspot.jp/2010/09/iframe.html
						// この問題は firefox3.6 で確認
						if( ( X_UA.Gecko || X_UA.Fennec ) ){
							if( that[ '_tag' ] === 'IFRAME' && ( !that[ '_attrs' ] || !that[ '_attrs' ][ 'src' ] ) ){
								//elm.contentWindow.location.replace = elm.src = 'about:blank';
								that[ 'attr' ]( 'src', 'about:blank' );
							};
						};
					};
				};
				
				created = true;
			} else
			// 7. 要素の位置のズレを補正
			if( elm.parentNode !== parentElement || ( nextElement && elm.nextSibling !== nextElement ) ){
				nextElement ?
					parentElement.insertBefore( elm, nextElement ) :
					parentElement.appendChild( elm );
			};
			
			if( that[ '_listeners' ] && ( ( that[ '_flags' ] & X_NodeFlags_ACTUAL_LISTENING ) === 0 ) ){
				X_EventDispatcher_toggleAllEvents( that, true );// イベントの退避
				that[ '_flags' ] |= X_NodeFlags_ACTUAL_LISTENING;
			};
			
			// ie8 では子要素に opacity が反映されないため、親要素の opacity を積算する
			currentOpcity = that[ '_css' ] && 0 <= that[ '_css' ].opacity && that[ '_css' ].opacity;
			ie8AccumulatedOpcity = ie8AccumulatedOpcity * ( currentOpcity || 1 );
			
			// 8. 更新の適用
			if( accumulatedFlags & X_Node_BitMask_IS_DIRTY ){
				delete that[ '_fontSize' ];
				X_Node__updateRawNode( that, elm, currentOpcity, ie8AccumulatedOpcity, accumulatedFlags );
			};

			// 9. ie5 only
			// 親及び自身へのクラス・id指定で display : none になるケースがありそれを検出
			// 親と自身の id, class が変わった場合だけ再生成。 accumulatedFlags & ( ID | CLASSNAME )
			// currentStyle を観ていたときはエラーで停止する、alert と挟むと正常に動いて支離滅裂
			if( X_Node_displayNoneFixForIE5 && that[ '_tag' ] ){
				if( elm.runtimeStyle.display === 'none' ){
					X_Node__actualRemove( that );
					that[ '_flags' ] |= X_NodeFlags_IE5_DISPLAY_NONE_FIX;
					return nextElement;					
				} else {
					that[ '_flags' ] &= ~X_NodeFlags_IE5_DISPLAY_NONE_FIX;
				};
			};
			
			if( that[ '_flags' ] & X_NodeFlags_IE_FILTER_FIX_AFTER ){
				xnodesIEFilterFixAfter[ xnodesIEFilterFixAfter.length ] = that;
			};
			
			// 10. 子要素の更新。
			if( ( xnodes = that[ '_xnodes' ] ) && ( l = xnodes.length ) ) {
				for( ; l; ){
					next = X_Node__commitUpdate( xnodes[ --l ], elm, next, accumulatedFlags, ie8AccumulatedOpcity, xnodesIEFilterFixAfter );
				};
			};

			if( created && X_Node_addTreeAfterChildren ){
				nextElement ?
					parentElement.insertBefore( elm, nextElement ) :
					parentElement.appendChild( elm );
				
				if( ( X_UA.Gecko || X_UA.Fennec ) && that[ '_tag' ] === 'IFRAME' && elm.contentWindow ){
					// tree に追加されるまで contentWindow は存在しない。
					elm.contentWindow.location.replace = elm.src;
				};
			};

/*
 * 			if( ( anime = that[ '_anime' ] ) && 6 <= anime.phase && anime.doScroll ){
				if( anime.phase === 6 ){
					v = anime.fromScrollX;
					if( v === v ){
						elm.scrollLeft = v;
					} else {
						anime.fromScrollX = elm.scrollLeft;
					};
					v = anime.fromScrollY;
					if( v === v ){
						elm.scrollTop = v;
					} else {
						anime.fromScrollY = elm.scrollTop;
					};
				} else {
					elm.scrollLeft = anime.scrollX;
					elm.scrollTop  = anime.scrollY;
				};
			};
 */

			return elm;
		}) :
	X_UA_DOM.IE4 ? 
		( function( that, parentElement, prevElement, accumulatedFlags ){
			var elm = that[ '_rawObject' ] || X_Node__ie4getRawNode( that ),
				xnodes, l, i, dirty, mix, html, text, prev, anime, v;

			if( !that[ '_tag' ] ){
				that[ '_flags' ] & X_NodeFlags_DIRTY_CONTENT && X_Node__updateRawNode( that, elm );
				return elm;
			};
			
			// 4. style="display:none" の場合
			if( that[ '_flags' ] & X_NodeFlags_STYLE_IS_DISPLAY_NONE ){
				if( elm ){
					elm.style.display = 'none';
					if( elm.style.display !== 'none' ){ // ie4 の style は currentStyle 相当らしい、、、? div 以外への display:none が効かないので remove する。
						X_Node__actualRemove( that );
						return prevElement;
					};
				};
				return elm || prevElement;
			};
			
			if( !elm ){
				prevElement ?
					prevElement.insertAdjacentHTML( 'AfterEnd', X_Node__actualCreate( that, false ) ) :
					parentElement.insertAdjacentHTML( 'AfterBegin', X_Node__actualCreate( that, false ) );
				X_Node__afterActualCreate( that );
				
				elm = that[ '_rawObject' ] || X_Node__ie4getRawNode( that );
			} else {
				accumulatedFlags |= that[ '_flags' ];
				
				xnodes = that[ '_xnodes' ];
				l      = xnodes ? xnodes.length : 0;
				dirty  = !!( that[ '_flags' ] & X_NodeFlags_IE4_DIRTY_CHILDREN );
				
				/*
				 * HTML の下に TextNode だけ 。MIX_FIXED　でない場合、削除、追加 を親に通知
				 * HTML の下に HTML だけ
				 * HTML の下は MIX -> TextNode, html の削除、変更、追加
				 * HTML の下は MIX_FIXED -> TextNode を <font> に置き換えてあるのでW3C DON 的に触ることができる
				 */
				if( dirty ){
					that[ '_flags' ] &= ~X_NodeFlags_IE4_DIRTY_CHILDREN;
					for( i = 0; i < l; ++i ){
						if( xnodes[ i ][ '_tag' ] ){
							that[ '_flags' ] |= X_NodeFlags_IE4_HAS_ELEMENT;
						} else {
							that[ '_flags' ] |= X_NodeFlags_IE4_HAS_TEXTNODE;
						};
						if( that[ '_flags' ] & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX ){
							mix = true;
							break;
						};
					};
				};
				
				if( that[ '_flags' ] & X_NodeFlags_IE4_FIXED || that[ '_flags' ] & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_ELEMENT ){
					for( i = 0; i < l; ++i ){
						prev = X_Node__commitUpdate( xnodes[ i ], elm, prev, accumulatedFlags );
					};
				} else
				if( mix ){
					html = [];
					for( i = 0; i < l; ++i ){
						html[ i ] = X_Node__actualCreate( xnodes[ i ], false );
					};
					elm.innerHTML = html.join( '' );
					for( i = 0; i < l; ++i ){
						X_Node__afterActualCreate( xnodes[ i ] );
					};
					that[ '_flags' ] |= X_NodeFlags_IE4_FIXED;
				} else
				if( that[ '_flags' ] & X_NodeFlags_IE4_HAS_TEXTNODE ){
					dirty = dirty || false;
					for( i = 0; i < l; ++i ){
						text = xnodes[ i ];
						if( text[ '_flags' ] & X_Node_BitMask_IS_DIRTY ){
							text[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
							dirty = true;
						};
					};
					if( dirty ) elm.innerHTML = that[ 'text' ]();
				};
				
				if( accumulatedFlags & X_Node_BitMask_IS_DIRTY ) delete that[ '_fontSize' ];
				
				that[ '_flags' ] &= ~X_NodeFlags_DIRTY_POSITION;
				that[ '_flags' ] & X_Node_BitMask_IS_DIRTY && X_Node__updateRawNode( that, elm );				
			};
			
			if( ( anime = that[ '_anime' ] ) && 6 <= anime.phase && anime.doScroll ){
				if( anime.phase === 6 ){
					v = anime.fromScrollX;
					if( v === v ){
						elm.scrollLeft = v;
					} else {
						anime.fromScrollX = elm.scrollLeft;
					};
					v = anime.fromScrollY;
					if( v === v ){
						elm.scrollTop = v;
					} else {
						anime.fromScrollY = elm.scrollTop;
					};
				} else {
					elm.scrollLeft = anime.scrollX;
					elm.scrollTop  = anime.scrollY;
				};
			};

			return elm;
		}) :
		(function(){});

/*
 * GPU レイヤーするブラウザは、子要素から変更を当てていく? <- とりあえず、親要素から。
 */
var X_Node__updateRawNode =
	X_UA_DOM.W3C ?
		( function( that, elm, currentOpcity, ie8AccumulatedOpcity, accumulatedFlags ){
			var // flags = that[ '_flags' ],
				attrs, rename, k, v, f;

			// textNode
			if( !that[ '_tag' ] ){
				if( ( X_UA.Trident || X_UA.TridentMobile ) < 8 ){
					// \n -> \r\n に変換しないと pre タグで改行されない  win10ie7(ie11 emu) で確認
					elm.data = X_String_chrReferanceTo( that[ '_text' ] ).split( '\n' ).join( X_String_CRLF );
				} else {
					elm.data = X_String_chrReferanceTo( that[ '_text' ] );
				};
				that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
				return;
			};
			
			// id
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_ID ){
				that[ '_id' ] ?
					( ( that[ '_flags' ] & X_NodeFlags_IS_SVG ) ?
						elm.setAttribute( 'id', that[ '_id' ] ) :
						( elm.id = that[ '_id' ] )
					) :
					( elm.id && elm.removeAttribute( 'id' ) );		
			};
			// className
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_CLASSNAME ){
				that[ '_className' ] ?
					( ( that[ '_flags' ] & X_NodeFlags_IS_SVG ) ?
						elm.setAttribute( 'class', that[ '_className' ] ) :
						( elm.className = that[ '_className' ] )
					) :
					( elm.className && elm.removeAttribute( ( X_UA.Trident || X_UA.TridentMobile ) < 8 ? 'className' : 'class' ) ); // className は ie7-		
			};
			
			// attr
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_ATTR && ( attrs = that[ '_newAttrs' ] || that[ '_attrs' ] ) ){
				rename = X_Node_Attr_renameForDOM;
						
				for( k in attrs ){
					v = attrs[ k ];
					
					switch( that[ '_tag' ] + k ){
						case 'TEXTAREAvalue' :
							// IETester 5.5 ではエラーが出なかった．MultipulIE5.5 ではエラーが出たので
							// MultipleIE6 でもここを通す。X_Script_ie6ExeComError の場合 MultipleIE6
							if( ( !X_UA.Tasman && 5 <= ( X_UA.Trident || X_UA.TridentMobile ) && ( X_UA.Trident || X_UA.TridentMobile ) < 5 ) || X_Script_ie6ExeComError ){
								elm.firstChild ?
									( elm.firstChild.data = v || '' ) :
									elm.appendChild( document.createTextNode( v || '' ) );
								continue;
							};
							break;
						
						case 'IFRAMEsrc' :
							// http://outcloud.blogspot.jp/2010/09/iframe.html
							// この問題は firefox3.6 で確認
							if( ( X_UA.Gecko || X_UA.Fennec ) && elm.contentWindow ){
								elm.contentWindow.location.replace = elm.src = v || '';
								continue;
							};
							break;
						
						case 'IFRAMEname' :
							// http://d.hatena.ne.jp/NeoCat/20080921/1221940658
							// こちらに名前をsetしないとtargetが動作しない
							// これってあとから name を変更できないバグでは? itozyun
							// if( ( X_UA.Trident || X_UA.TridentMobile ) ) elm.name = elm.contentWindow.name = v || '';
					};
					
					//if( X_EMPTY_OBJECT[ k ] ) continue;
					// TODO IE では input, なぜか button, object も type, name の変更が出来ない、同値で置き換えようとしても不可
					v === undefined ?
						elm.removeAttribute( rename[ k ] || k ) :
					( ( that[ '_flags' ] & X_NodeFlags_IS_SVG ) ?
						elm.setAttribute( k, v ) :
						( elm[ rename[ k ] || k ] = X_Node_Attr_noValue[ k ] ? k : v )
					);
				};
				delete that[ '_newAttrs' ];
			};
			
			if( accumulatedFlags & X_NodeFlags_IE8_OPACITY_FIX ){
				if( 0 <= currentOpcity ){
					f = true;
					that[ '_css' ].opacity = ie8AccumulatedOpcity;
					if( that[ '_flags' ] & X_NodeFlags_DIRTY_CSS ){
						that[ '_flags' ] |= X_NodeFlags_OLD_CSSTEXT;
					} else
					if( !( that[ '_flags' ] & X_NodeFlags_DIRTY_IE_FILTER ) ){
						that[ '_flags' ] |= X_NodeFlags_DIRTY_IE_FILTER;
					};
				};
			};
			
			// style
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_CSS ){
				if( that[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText( that ) : that[ '_cssText' ] ){
					( X_UA.Presto || X_UA.PrestoMobile ) < 9 || X_UA.Gecko < 1 ? // Opera7, 8, NN6
						elm.setAttribute( 'style', that[ '_cssText' ] ) :
						( elm.style.cssText = that[ '_cssText' ] );
				} else {
					if( ( X_UA.Trident || X_UA.TridentMobile ) < 6 || X_UA.WebKit < 528 ){  // IE5.5以下 Safari3.2 で必要
						elm.style.cssText = '';
					} else {
						elm.removeAttribute( 'style' );
					};
				};
			} else
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_IE_FILTER ){
				v = X_Node_CSS_objToIEFilterText( that );
				if( v ){
					elm.style.filter = v;
					that[ '_flags' ] |= X_NodeFlags_IE_FILTER_NOW;
				} else {
					elm.style.removeAttribute( 'filter' );
					that[ '_flags' ] &= ~X_NodeFlags_IE_FILTER_NOW;
				};
			};
			
			/*
			 * http://jsdo.it/esukei/imOL
			 * IE8でのfilter:alpha継承
			 * IE8でfilter:alphaの指定がposition:relative,position:absoluteの子要素に継承されない問題
			 */
			if( f ){
				that[ '_css' ].opacity = currentOpcity;
			};
			
			that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
		}) :
	X_UA_DOM.IE4 ? 
		( function( that, elm ){
			var attrs, rename, k, v;

			// fake textNode
			if( !that[ '_tag' ] ){
				elm.innerText = that[ '_text' ];
				that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
				return;
			};
			
		/*
		 * http://www.tohoho-web.com/js/element.htm
		 * title、className、id、lang、language には setAttribute でなく、element.id で直接読み書きできる
		 */	
			// id
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_ID ) elm.setAttribute( 'id', that[ '_id' ] || ( 'ie4uid' + that[ '_uid' ] ) );

			// className
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_CLASSNAME ){
				that[ '_className' ] ? ( elm.className = that[ '_className' ] ) : elm.removeAttribute( 'class' );
			};
			// style
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_CSS ){
				if( that[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT ? X_Node_CSS_objToCssText( that ) : that[ '_cssText' ] ){
					elm.style.cssText = that[ '_cssText' ];
				} else {
					elm.style.cssText = '';
					elm.removeAttribute( 'style' );
				};
			} else
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_IE_FILTER ){
				v = X_Node_CSS_objToIEFilterText( that );
				if( v ){
					elm.style.filter = v;
					that[ '_flags' ] |= X_NodeFlags_IE_FILTER_NOW;
				} else {
					elm.style.removeAttribute( 'filter' );
					that[ '_flags' ] &= ~X_NodeFlags_IE_FILTER_NOW;
				};
			};
			
			// attr
			if( that[ '_flags' ] & X_NodeFlags_DIRTY_ATTR && ( attrs = that[ '_newAttrs' ] || that[ '_attrs' ] ) ){
				rename = X_Node_Attr_renameForDOM;
				for( k in attrs ){
					//if( X_EMPTY_OBJECT[ k ] ) continue;
					( v = attrs[ k ] ) === undefined ?
						elm.removeAttribute( rename[ k ] || k ) :
						elm.setAttribute( rename[ k ] || k, X_Node_Attr_noValue[ k ] ? k : v );
				};
				delete that[ '_newAttrs' ];
			};

			that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
		}) :
		(function(){});

/* --------------------------------------
 *  Create
 * 
 * http://d.hatena.ne.jp/uupaa/20080718/1216362040
 * DOM Rangeが使える環境(Firefox2+,Opera9+,Safari3+)なら、innerHTMLいらずで、ガーって書けます。
 * return document.createRange().createContextualFragment("<div><select><option></option></select></div>");
 * insertAdjacentHTML
 * 
 * ie7 以下では iframe の frameborder や、input name は、createElement 後に setAttribute しても無視される
 * 
 * fragument がある場合 children も足して
 * Mozilla: 1.0+, IE: 5.5+, Netscape: 2.0+, Safari: 1.0+, Opera: 7.0+
 * ie6 大丈夫?fragment の場合リークしないか？チェックが必要
 * http://msdn.microsoft.com/ja-jp/library/bb250448%28v=vs.85%29.aspx
 * 
 * document.createElement of ie4 is only for OPTION & IMAGE.
 */
var X_Node__actualCreate =
	X_UA_DOM.IE4 && (function( that, isChild ){
		var uid = that[ '_uid' ],
			html, xnodes, n, i, l;
		
		if( !that[ '_tag' ] ){
			html = [ '<FONT id=ie4uid', uid, ' UID="', uid, '">', that[ '_text' ], '</FONT>' ];// fake textNode
			delete that[ '_rawObject' ];
		} else {
			if( !isChild ) X_Node__actualRemove( that, /* true */ false );
			
			that[ '_flags' ] & X_NodeFlags_OLD_CSSTEXT && X_Node_CSS_objToCssText( that, true );
			
			html = [
				'<', that[ '_tag' ], ' id=', ( that[ '_id' ] || ( 'ie4uid' + uid ) ), ' UID="', uid, '"',
				that[ '_className' ] ? ' class="' + that[ '_className' ] + '"' : '',
				X_Node_Attr_objToAttrText( that, true ),
				that[ '_cssText' ] ? ' style="' + that[ '_cssText' ] + '"' : '',
			'>' ];
			
			n = html.length;
			if( ( xnodes = that[ '_xnodes' ] ) && ( l = xnodes.length ) ){
				
				that[ '_flags' ] &= ~X_NodeFlags_IE4_DIRTY_CHILDREN;
				for( i = 0; i < l; ++i ){
					if( xnodes[ i ][ '_tag' ] ){
						that[ '_flags' ] |= X_NodeFlags_IE4_HAS_ELEMENT;
					} else {
						that[ '_flags' ] |= X_NodeFlags_IE4_HAS_TEXTNODE;
					};
					if( that[ '_flags' ] & X_Node_BitMask_IE4_IS_MIX === X_Node_BitMask_IE4_IS_MIX ){
						break;
					};
				};
				
				if( that[ '_flags' ] & X_Node_BitMask_IE4_IS_MIX === X_NodeFlags_IE4_HAS_TEXTNODE ){
					// only textnode
					html[ n ] = that[ 'text' ]();
					++n;
				} else {
					for( i = 0; i < l; ++i ){
						html[ n ] = X_Node__actualCreate( xnodes[ i ], true );
						++n;
					};
					that[ '_flags' ] |= X_NodeFlags_IE4_FIXED;
				};
			};
			X_Dom_DTD_EMPTY[ that[ '_tag' ] ] || ( html[ n ] = '<\/' + that[ '_tag' ] + '>' );
			
			that[ '_newAttrs' ] && ( that[ '_flags' ] |= X_NodeFlags_DIRTY_ATTR );
		};
		
		return html.join( '' );
	});

var X_Node__afterActualCreate =
	X_UA_DOM.IE4 && (function( that ){
		var xnodes, i;
		
		if( !that[ '_tag' ] ) return that;
		
		if( ( xnodes = that[ '_xnodes' ] ) && ( i = xnodes.length ) ){
			for( ; i; ){
				X_Node__afterActualCreate( xnodes[ --i ] );
			};
		};
		// ネットワーク系属性と filter は要素生成後に適用
		if( that[ '_flags' ] & ( X_NodeFlags_DIRTY_ATTR | X_NodeFlags_DIRTY_IE_FILTER ) ){
			X_Node__updateRawNode( that, that[ '_rawObject' ] || X_Node__ie4getRawNode( that ) );
		} else {
			that[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
		};
		X_EventDispatcher_toggleAllEvents( that, true );// イベントの復帰
	});

var X_Node__actualRemove =
	X_UA_DOM.W3C ?
		// GPUレイヤーにいるうちは remove しない。-> GPU解除してから remove する
		// Firefox34 では遭遇せず、Safari で何度かアニメーションしているうちに発生
		( function( that, isChild ){
			var xnodes = that[ '_xnodes' ],
				elm    = that[ '_rawObject' ],
				child, i, l;

			if( xnodes && ( l = xnodes.length ) ){
				for( i = 0; i < l; ++i ){
					child = xnodes[ i ];
					child[ '_tag' ] && X_Node__actualRemove( child, true );
				};
			};

			if( !elm ) return;
			
			if( that[ '_flags' ] & X_NodeFlags_ACTUAL_LISTENING ){
				that[ '_listeners' ] && X_EventDispatcher_toggleAllEvents( that, false );// イベントの退避
				that[ '_flags' ] &= ~X_NodeFlags_ACTUAL_LISTENING;
			};

			// ie5では filter の効いている要素をremove時に破棄して、再度append 時に新規生成する
			// ちなみに elm.filters に触ると ie8 でなぜかカラム落ちが発生、、、
			if( X_Node_displayNoneFixForIE5 ){
				if( elm.filters && elm.filters.length ){
					isChild = false;
					delete that[ '_rawObject' ];
					// 破棄前にインタラクティブな属性値を控える
					if( X_Node_Attr_HAS_VALUE[ that[ '_tag' ] ] && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'value', that[ '_newAttrs' ] ) ) ){
						if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
						that[ '_attrs' ].value = elm.value;
					};
					if( that[ '_tag' ] === 'OPTION' && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'selected', that[ '_newAttrs' ] ) ) ){
						if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
						that[ '_attrs' ].selected = elm.selected;
					};
					if( that[ '_tag' ] === 'SELECT' && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'selectedIndex', that[ '_newAttrs' ] ) ) ){
						if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
						that[ '_attrs' ].selectedIndex = elm.selectedIndex;
						that[ '_attrs' ].value = elm.value;
					};
					if( that[ '_tag' ] === 'INPUT' && that[ '_attrs' ] && ( that[ '_attrs' ].type === 'checkbox' || that[ '_attrs' ].type === 'radio' ) && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'checked', that[ '_newAttrs' ] ) ) ){
						if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
						that[ '_attrs' ].checked = elm.checked;
					};
					// 子要素への参照を外す
					elm.innerHTML = '';
				};
			};
			
			if( !X_UA.Tasman ){
				// elm.parentNode.tagName for ie7
				!isChild && elm.parentNode && elm.parentNode.tagName && elm.parentNode.removeChild( elm );
			} else {
				!isChild && elm.parentNode && elm.parentNode.tagName && X_TEMP._fixed_remove( elm );
			};
		}) :
	X_UA_DOM.IE4 ?
		( function( that, isChild ){
			var xnodes = that[ '_xnodes' ],
				elm    = that[ '_rawObject' ] || X_Node__ie4getRawNode( that ),
                i, l;

			if( xnodes && ( l = xnodes.length ) ){
				for( i = 0; i < l; ++i ){
					X_Node__actualRemove( xnodes[ i ], true );
				};
			};

			if( !elm ) return;
			that[ '_listeners' ] && X_EventDispatcher_toggleAllEvents( that, false );// イベントの退避
			
			// 破棄前にインタラクティブな属性値を控える
			if( X_Node_Attr_HAS_VALUE[ that[ '_tag' ] ] && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'value', that[ '_newAttrs' ] ) ) ){
				if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
				that[ '_attrs' ].value = elm.value;
			};
			if( that[ '_tag' ] === 'OPTION' && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'selected', that[ '_newAttrs' ] ) ) ){
				if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
				that[ '_attrs' ].selected = elm.selected;
			};
			if( that[ '_tag' ] === 'SELECT' && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'selectedIndex', that[ '_newAttrs' ] ) ) ){
				if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
				that[ '_attrs' ].selectedIndex = elm.selectedIndex;
				that[ '_attrs' ].value = elm.value;
			};
			if( that[ '_tag' ] === 'INPUT' && that[ '_attrs' ] && ( that[ '_attrs' ].type === 'checkbox' || that[ '_attrs' ].type === 'radio' ) && ( !that[ '_newAttrs' ] || !X_Object_inObject( 'checked', that[ '_newAttrs' ] ) ) ){
				if( !that[ '_attrs' ] ) that[ '_attrs' ] = {};
				that[ '_attrs' ].checked = elm.checked;
			};

			elm.removeAttribute( 'id' ); // ?
			//document.all[ that[ '_id' ] || ( 'ie4uid' + that[ '_uid' ] ) ] = null; // MacIE5 でエラー
			if( !isChild ) elm.outerHTML = ''; // elm.remove() ?
			delete that[ '_rawObject' ];
		}) :
		(function(){});

X_ViewPort[ 'listenOnce' ]( X_EVENT_UNLOAD, X_Node__actualRemove, [ X_Node_html, true ] );
