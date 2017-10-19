
X_TEMP.X_Dom_useBuilder = true;

X_TEMP._isCleanupTarget = function( elm ){
	var cname = ' ' + elm.className + ' ',
		tag   = ( elm.tagName || '' ).toUpperCase();
	return cname.indexOf( ' skip-cleanup ' ) === -1 &&
		( X_Dom_DTD_CLEANUP_TAGS[ tag ] || cname.indexOf( ' cleanup-target ' ) !== -1 );
};

if( X_UA[ 'MacIE' ] ){

	X_TEMP._fixed_remove = function( node, xnode ){
		var parent   = node.parentNode, l;

		node.nodeType !== 3 && alert( node.nodeType + '\n' + ( node.outerHTML || node.data ) );
		if( node.nodeType === 1 ){
			//node.outerHTML = '';
			parent && parent.removeChild( node );
		} else
		if( node.nodeType === 3 ){
			//node.data = '';
			l = X_TEMP._removalTextNodes.length;
			if( parent ){
				/*
				!l && X_Timer_once( 0, X_TEMP._timerRemove );
				X_TEMP._removalTextNodes[ l ] = node;
				var str=[],p;
				for( p in node ){
					str[str.length] = p;
				};
				alert( str.join( ',' ) + parent.innerHTML );
				node.nodeValue = '';
				parent.replaceChild( document.createElement( 'span' ), node );
				var e;
				var f = document.createDocumentFragment();
				f.appendChild( e = document.createElement( 'span' ) );
				f.replaceChild( node, e );
				e.appendChild( f );
				parent.appendChild( e = document.createElement( 'span' ) );
				e.appendChild( node );
				parent.removeChild( e );
				node.parentNode = null;
				X_elmBody.appendChild( node );
				parent.replaceChild( document.createComment( '' ), node ); */
				X_elmBody.appendChild( node );
				return;
				/*
				if( parent.parentNode !== X_elmBody ){
					var clone = parent.cloneNode( true );
					for( var i = 0, l = parent.childNodes.length; i < l; ++i ){
						if( parent.childNodes[ i ] !== node ){
							clone.removeChild( clone.childNodes[ i ] );
						};
					};					
					//parent.parentNode.insertBefore( clone, parent );
					//parent.parentNode.removeChild( parent );
					parent.parentNode.insertBefore( clone, parent );
					parent.style.display = 'none';
					if( xnode ){
						xnode.parent.parent[ '_rawObject' ] = clone;
					};
				} else {
					// ignore
				}; */

			};
			//if( !node.ownerDocument ) alert( 'no owner' );
		} else {
			//node.data = '';
		};
	};
	
	X_TEMP._removalTextNodes = [];
	
	X_TEMP._timerRemove = function(){
		var nodes = X_TEMP._removalTextNodes,
			i = 0, node;
		while( i < 5 && nodes.length ){
			node = nodes.shift();
			if( node.parentNode ){
				//node.parentNode.removeChild( node );
				++i;
			};
		};
		
		//nodes.length && X_Timer_once( 1000, X_TEMP._timerRemove );
	};
	
} else
if( X_UA[ 'Opera' ] < 8 ){

	X_TEMP._fixed_remove = function( node ){
		if( node.nodeType === 1 || node.nodeType === 3 ){
			node.parentNode && node.parentNode.removeChild( node );
		//} else {
			//node.data = '';
		};
	};
};

/* --------------------------------------
 *  通常のwebページに対して使用する場合、dom ready で dom tree を写し取るために使う．
 *  完全にワンページアプリで<body/>が空な場合、このコードはビルドに含める必要はない
 * 
 * TODO (注4) IE6 の空白に関する“癖”について
 * http://kojs.sukobuto.com/docs/visible-binding
 * IE6 には、「空の span エレメントに続く空白は無視される」という謎な癖があります。 
 */

X_TEMP._onPreInit =
	X_UA_DOM.W3C ?
(function(){
	var r    = X_Node_body,
		body = X_elmBody,
		copy, i, l, node, html,
		elmProgress;
	
	if( !X_TEMP.X_Dom_useBuilder ) return;
	
	X_HTMLParser_skipFixNesting = true;
	
	// TODO
	// textarea の内容を控えて、消す。xnode tree 構築後に復帰。でないと、html パースでこける
	//X_UA[ 'MacIE' ] && alert( body.innerHTML );
	// cleanup tree	
	function cleanUpTree( elm, skip ){
		var nodes      = X_Array_copy( elm.childNodes ),
			i          = 0,
			l          = nodes.length,
			node, tag, textNode, content;
		for( ; i < l; ++i ){
			node = nodes[ i ];
			switch( node.nodeType ){
				case 1 :
					tag = node.tagName.toUpperCase();
					if( X_Dom_DTD_MOVE_TO_HEAD[ tag ] ){
						X_elmHead.appendChild( node );
						continue;
					} else
					if( X_TEMP._isCleanupTarget( node ) ){
						elm.removeChild( node );
						continue;
					} else {
						// pre タグ以下はスペースの置換は行わない
						node.childNodes && node.childNodes.length && cleanUpTree( node, skip || X_Dom_DTD_SKIP_CLEANUP_TAGS[ tag ] );
					};
					textNode = null;
					break;
				case 3 :
					content = skip ? node.data : X_String_cleanupWhiteSpace( node.data );
					//console.log( 'Delete space ' + node.data.length + ' => ' + content.length );				
					if( !textNode && content !== ' ' && content.length ){
						node.data = content;
						textNode  = node;
						break;
					} else
					if( textNode ){
						textNode.data += content; // 直前が TextNode の場合 一本化して削除
					};
					// ブロック要素直下のスペースだけは削除？？
				default :
					//console.log( 'Remove type: ' + node.nodeType + ' value: ' + node.nodeValue );
					if( !( X_UA[ 'Opera' ] < 8 ) /*&& !X_UA[ 'MacIE' ] */ ){
						elm.removeChild( node );
					} else {
						X_TEMP._fixed_remove( node );
					};
					//++count;
			};
		};
	};

	cleanUpTree( X_UA[ 'MacIE' ] ? ( copy = body.cloneNode( true ) ) : body );

	if( X_UA[ 'MacIE' ] ){
		document.write( html = copy.innerHTML );
	} else {
		// body の属性値の取得
		if( X_UA[ 'IE' ] <= 8 ){
			html = body.innerHTML.split( X_String_CRLF ).join( '' ); // 不要な改行が入る
		} else {
			html = body.innerHTML;
		};
		
		// Nokia s60 Safari
		if( html === 'fastinnerhtml!' ){
			html = '';
			for( i = 0, l = body.childNodes.length; i < l; ++i ){
				node = body.childNodes[ i ];
				html += ( node.outerHTML || node.data );
			};
		};		
	};
	
	body.appendChild( X_TEMP.elmProgress = elmProgress = document.createElement( 'div' ) );
	elmProgress.style.cssText = 'position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;';
	elmProgress.setAttribute( 'style', 'position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;' );
	
	X_HTMLParser_asyncParse( html, true )
		[ 'listen' ]( X_EVENT_PROGRESS, X_TEMP._handleEvent )
		[ 'listenOnce' ]( X_EVENT_SUCCESS, X_TEMP._handleEvent );

}) :
// X_UA_DOM.IE4 ?
(function(){
	var r    = X_Node_body,
		body = r[ '_rawObject' ],
		elmProgress = '_xdom_builder_progress',
		html;

	if( !X_TEMP.X_Dom_useBuilder ) return;
	
	/*
	 * http://support.microsoft.com/kb/812417/ja
	 * PRB: outerHTML の HTML 要素のプロパティは、既定の属性は表示されません。
	 * 
	 * body.innerHTML でなく、 body.outerHTML にはできなかった、、、
	 */
	html = body.innerHTML;
	body.insertAdjacentHTML( 'BeforeEnd', '<div id="' + elmProgress + '" style="position:absolute;top:0;left:0;z-index:9999;width:0;height:0.5em;background:#00f;overflow:hidden;"></div>' );
	X_TEMP.elmProgress = document.all[ elmProgress ];
	
	X_HTMLParser_asyncParse( html, true )
		[ 'listen' ]( X_EVENT_PROGRESS, X_TEMP._handleEvent )
		[ 'listenOnce' ]( X_EVENT_SUCCESS, X_TEMP._handleEvent );
});

X_ViewPort[ 'listenOnce' ]( X_EVENT_PRE_INIT, X_TEMP._onPreInit );

X_TEMP._handleEvent = function( e ){
	var elmProgress = X_TEMP.elmProgress, xnodes;
	
	switch( e.type ){
		case X_EVENT_PROGRESS :
			elmProgress.style.width = ( e.percent * 100 | 0 ) + '%';
			break;
			
		case X_EVENT_SUCCESS :
			xnodes = X_Node_body[ '_xnodes' ] = [];
			
			xnodes.push.apply( xnodes, e.xnodes );
			elmProgress.style.width = '100%';
			
			X_TEMP.asyncCreateTree( X_Node_body, X_elmBody.childNodes || X_elmBody.children, elmProgress );
			
			delete X_TEMP._onPreInit;
			delete X_TEMP.elmProgress;
			break;
	};
};

X_TEMP.asyncCreateTree = function( parent, elems, elmProgress, async ){
	var xnodes      = async ? 0           : X_Array_copy( parent[ '_xnodes' ] ),
		l           = async ? 0           : xnodes.length,
		stack       = async ? async.stack : [],
		done        = async ? async.done  : 0,
		startTime   = X_Timer_now(),		
		current     = async ? async.current : {
			me     : parent,
			xnodes : xnodes,
			l      : l,
			i      : 0,
			elems  : X_Array_copy( elems ),
			j      : 0,
			xtext  : null,
			flag   : 0
		},
		xnode, i, dive;
	//alert( 'X_TEMP.asyncCreateTree' );
	while( current || ( current = stack.pop() ) ){
		i = current.i;
		l = current.l;
		if( i < l ){
			parent = current.me;
			xnodes = current.xnodes;
			while( xnode = xnodes[ i ] ){			
				//
				dive = X_TEMP.bindElementToXnode( parent, xnode, current );
				
				++i;
				++done;
				if( dive ){
					current.i = i;
					stack[ stack.length ] = current;
					
					current = dive;
					i       = 0;
					l       = dive.l;
					parent  = xnode;
					xnodes  = dive.xnodes;
					continue;
				};
				
				if( startTime + X_Timer_INTERVAL_TIME <= X_Timer_now() ){
					current.i = i;
					if( async ){
						async.current = i < l && current;
						async.done    = done;
					};
					//alert( 'koko?' );
					X_Timer_once( 0, X_TEMP.asyncCreateTree, [ null, null, elmProgress, async || { stack : stack, current : i < l && current, done : done } ] );
					// progress
					elmProgress.style.width = ( ( 1 - done / X_Node_CHASHE.length ) * 100 | 0 ) + '%';
					return;
				};
			};			
		};
		current = null;
	};
	// complete
	console.log( 'xtree 作成完了' );
	X_ViewPort[ 'asyncDispatch' ]( X_EVENT_XTREE_READY );
	
	if( X_UA[ 'IE' ] < 6 ){
		// IE5.01 でビルド時間が短い時に　removeChild を通るとエラー!
		elmProgress.outerHTML = '';
	} else {
		elmProgress.parentNode.removeChild( elmProgress );
	};
	
	delete X_TEMP.asyncCreateTree;
	delete X_TEMP.bindElementToXnode;
	delete X_TEMP.X_Dom_useBuilder;
	delete X_TEMP._isCleanupTarget;
	
	X_HTMLParser_skipFixNesting = false;
};

X_TEMP.bindElementToXnode =
	X_UA_DOM.W3C ?
		(function( parent, xnode, current ){
			var elems = current.elems,
				//j     = current.j,
				m     = elems.length,
				xtext = current.xtext,
				skipCleanup = current.skipCleanup,
				inPreTag    = current.inPreTag,
				elm, tag, text;
		
			xnode.parent = parent;
		
			for( ; current.j < m; ++current.j ){
				elm = elems[ current.j ];
				tag = elm.tagName && elm.tagName.toUpperCase();
				if( ( elm.nodeType !== 1 && elm.nodeType !== 3 ) || tag === '!' || ( tag && tag.charAt( 0 ) === '/' ) ){
					if( !( X_UA[ 'Opera' ] < 8 ) && !X_UA[ 'MacIE' ] ){
						elm.parentNode.removeChild( elm );
					} else {
						X_TEMP._fixed_remove( elm );
					};
					continue;
				};
		
				if( xnode[ '_tag' ] ){
					if( elm.nodeType === 3 ){
						if( !( text = elm.data ) || ( text = X_String_cleanupWhiteSpace( text ) ) === ' ' ){
							if( !( X_UA[ 'Opera' ] < 8 ) && !X_UA[ 'MacIE' ] ){
								elm.parentNode.removeChild( elm );
							} else {
								X_TEMP._fixed_remove( elm );
							};
							continue;
						};
						alert( '1:[' +parent[ '_tag' ] + '>' +xnode[ '_tag' ] + '] !== ' + elm.nodeType + '\n' + ( elm.data ) );
					} else
					if( X_Dom_DTD_MOVE_TO_HEAD[ tag ] ){
						alert( tag );
						continue;
					} else
					if( xnode[ '_tag' ] !== tag ){
						alert( '2:[' +parent[ '_tag' ] + '>' +xnode[ '_tag' ] + ' len:' + (xnode[ '_xnodes' ] ? xnode[ '_xnodes' ].length : '' ) + '] !== ' + tag + ' ' + (elm.childNodes ? elm.childNodes.length : '' ) + '\n' + elm.outerHTML );
					} else {
						xnode[ '_rawObject' ] = elm;
						//if( ( doc = elm.ownerDocument || elm.document ) && ( doc.createElement( 'p' ).tagName === doc.createElement( 'P' ).tagName ) ){
							if( tag.charAt( 0 ) === '/' ) tag = tag.slice( 1 );
							xnode[ '_tag' ] = tag;
						//};
						xnode[ '_flags' ] |= X_NodeFlags_IN_TREE;
						xnode[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
						elm[ 'UID' ]       = xnode[ '_uid' ];
						current.xtext = null;
						
						if( tag === 'TEXTAREA' ){
							xnode[ 'attr' ]( 'value', xnode[ 'html' ]() )[ 'empty' ]();
							
						} else
						if( elm.childNodes && elm.childNodes.length ){
							//alert( '[' +parent[ '_tag' ] + '>' + xnode[ '_tag' ] + ' ' + (xnode[ '_xnodes' ] ? xnode[ '_xnodes' ].length : '' ) + '] === ' + tag + ' ' + (elm.childNodes ? elm.childNodes.length : '' ) + ' Hit\n' + elm.outerHTML );
							//current.xtext = null;
							++current.j;
							
							return {
								me     : xnode,
								xnodes : X_Array_copy( xnode[ '_xnodes' ] ),
								xtext  : null,
								flag   : 0,
								i      : 0,
								l      : xnode[ '_xnodes' ].length,
								elems  : X_Array_copy( elm.childNodes ),
								j      : 0,
								skipCleanup : skipCleanup || X_Dom_DTD_SKIP_CLEANUP_TAGS[ tag ]
							};
						};
						// nochild
						//current.xtext = null;
					};
					++current.j;
					break;
				};
				
				if( elm.nodeType !== 3 ){
					if( !( text = xnode[ '_text' ] ) || ( text = X_String_cleanupWhiteSpace( text ) ) === ' ' ){
						console.log( '[' +parent[ '_tag' ] + '> UID:' + xnode[ '_uid' ] + ' len:' + xnode[ '_text' ].length + ' code : ' + xnode[ '_text' ].charCodeAt( 0 ) + ',' + xnode[ '_text' ].charCodeAt( 1 ) + '] destroyed.' );
						xnode[ 'kill' ]();
						break;
					};
					alert(  parent[ '_tag' ] + ' > ' + '"' + xnode[ '_text' ] + '" !== ' + tag + '\n' +
						'prev : ' + ( xnode[ 'prev' ]() && xnode[ 'prev' ]()[ 'html' ]() ) + '\n' +
						'next : ' + ( xnode[ 'next' ]() && xnode[ 'next' ]()[ 'html' ]() ) + '\n' +
						'html : ' + elm.outerHTML );
					break;
				};
				
				++current.j;
				xnode[ '_rawObject' ] = elm;
				xnode[ '_flags' ]    |= X_NodeFlags_IN_TREE;
				xnode[ '_flags' ]    &= X_Node_BitMask_RESET_DIRTY;
				xnode[ '_text' ]      = elm.data; // 正確
				
				if( !skipCleanup ){
					if( !( text = xnode[ '_text' ] ) || ( text = X_String_cleanupWhiteSpace( text ) ) === ' ' ){
						console.log( '[' +parent[ '_tag' ] + '>' + xnode[ '_uid' ] + '] destroy ... ' );
						xnode[ 'kill' ]();
					};
					if( xtext ){
						xtext[ 'text' ]( xtext[ '_text' ] + text );
						console.log( '[' +parent[ '_tag' ] + '>' + xnode[ '_uid' ] + '] xtext,destroy ... ' );
						xnode[ 'kill' ]();
					} else {
						//alert( parent[ '_tag' ] + '>' + '"' + text + '"\n' + elm.data );
						xnode[ 'text' ]( text );
					};
				} else
				if( xtext ){
					xtext[ 'text' ]( xtext[ '_text' ] + xnode[ '_text' ] );
					console.log( '[' +parent[ '_tag' ] + '>' + xnode[ '_uid' ] + '] xtext,destroy ... ' );
					xnode[ 'kill' ]();
				};
				current.xtext = xtext || xnode;
				break;
			};
		}) :
		(function ( parent, xnode, current ){
			var elems = current.elems,
				j     = current.j,
				m     = elems.length,
				xtext = current.xtext,
				skipCleanup = current.skipCleanup,
				elm, tag, text;
		
			xnode.parent = parent;
			
			if( !xnode[ '_tag' ] ){
				xnode[ '_flags' ] |= X_NodeFlags_IN_TREE;
				xnode[ '_flags' ] &= X_Node_BitMask_RESET_DIRTY;
				//alert( X_String_cleanupWhiteSpace( xnode[ '_text' ] ) );
				if( !skipCleanup ){
					if( !( text = xnode[ '_text' ] ) || ( text = X_String_cleanupWhiteSpace( text ) ) === ' ' ){
						xnode[ 'kill' ]();
						xnode = null;
					} else
					if( xtext ){
						//alert( 'xtext ' + text.charCodeAt( 0 ) + ' : ' + text.length );
						xtext[ 'text' ]( xtext[ '_text' ] + text );
						xnode[ 'kill' ]();
					} else {
						//alert( 'xnode ' + text.charCodeAt( 0 ) + ' : ' + text.length );
						xnode[ 'text' ]( text );
					};
				} else {
					if( xtext ){
						//alert( 'skip ' + text.charCodeAt( 0 ) + ' : ' + text.length );
						xtext[ 'text' ]( xtext[ '_text' ] + xnode[ '_text' ] );
						xnode[ 'kill' ]();
					};
				};
				current.xtext = xtext || xnode;
				parent[ '_flags' ] |= X_NodeFlags_IE4_HAS_TEXTNODE;
				return;
			};
			
			for( ; j < m; ++j, ++current.j ){
				elm = elems[ j ];
				tag = elm.tagName;
				/*
				 * 未知のタグについては、閉じタグも含めてタグ名扱いになる
				 */
				if( tag === '!' || tag.charAt( 0 ) === '/' ){
					//alert( '## ' + tag );
					continue;
				} else
				if( xnode[ '_tag' ] !== tag ){
					alert( xnode[ '_tag' ] + ' ' + ' !== ' + tag + '\nxnode.html():' + xnode.attr('cite') + '\nelm.outerHTML:' +  elm.outerHTML );
				} else {
					++current.j;
					
					xnode[ '_rawObject' ] = elm;
					xnode[ '_flags' ]    |= X_NodeFlags_IN_TREE;
					xnode[ '_flags' ]    &= X_Node_BitMask_RESET_DIRTY;
					//xnode[ '_tag' ]     = X_Dom_DTD_TAG_FIX[ tag ] || tag;
					if( X_TEMP._isCleanupTarget( elm ) ){ //!xnode[ 'hasClass' ]( 'skip-cleanup' ) && ( X_Dom_DTD_CLEANUP_TAGS[ tag ] || xnode[ 'hasClass' ]( 'cleanup-target' ) ) ){
						xnode[ 'kill' ]();
						break;
					};
					
					!xnode[ '_id' ] && elm.setAttribute( 'id', 'ie4uid' + xnode[ '_uid' ] );
					elm.setAttribute( 'UID', xnode[ '_uid' ] );
					
					tag === 'INPUT' && (
						!xnode[ '_attrs' ] ?
							( xnode[ '_attrs' ] = { type : 'text' } ) :
							xnode[ '_attrs' ].type || ( xnode[ '_attrs' ].type = 'text' )
					);
					parent[ '_flags' ] |= X_NodeFlags_IE4_HAS_ELEMENT;
					current.xtext = null;
					
					if( tag === 'TEXTAREA' ){
						xnode[ 'attr' ]( 'value', xnode[ 'html' ]() )[ 'empty' ]();
					} else
					if( xnode[ '_xnodes' ] && xnode[ '_xnodes' ].length ){
						return {
							me     : xnode,
							xnodes : X_Array_copy( xnode[ '_xnodes' ] ),
							xtext  : null,
							flag   : 0,
							i      : 0,
							l      : xnode[ '_xnodes' ].length,
							elems  : X_Array_copy( elm.children ),
							j      : 0,
							skipCleanup : skipCleanup || X_Dom_DTD_SKIP_CLEANUP_TAGS[ tag ]
						};
					};
					break;
				};
			};
			// for
			if( !xnode[ '_rawObject' ] ){
				alert( xnode[ '_tag' ] + ' ' + xnode[ '_id' ] + ' !== none...' );
			};
		});

console.log( 'X.Dom.Builder' );
console.log( 'bootTime : ' + ( X_Timer_now() - X.bootTime ) );