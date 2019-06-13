
/*
 * Original code by Erik John Resig (ejohn.org)
 * http://ejohn.org/blog/pure-javascript-html-parser/
 *
 */

var X_HTMLParser_CHARS = (function(){
        var chars = 'abcdefghijklmnopqrstuvwxyz! \t\r\n\f\b',
            ret   = {}, i;

        for( i = 26; i; ){
            ret[ chars.charAt( --i ) ] = 2;
        };
        for( i = 27, chars = chars.toUpperCase(); i; ){
            ret[ chars.charAt( --i ) ] = 1;
        };
        for( i = 33; 27 < i; ){
            ret[ chars.charAt( --i ) ] = 16;
        };
        return ret;
    })(),

	// Empty Elements - HTML 4.01
	// X_Dom_DTD_EMPTY

	// Block Elements - HTML 4.01
	X_HTMLParser_block = {ADDRESS:true,APPLET:true,BLOCKQUOTE:true,BUTTON:true,CENTER:true,DD:true,DEL:true,DIR:true,DIV:true,DL:true,DT:true,FIELDSET:true,FORM:true,FRAMESET:true,HR:true,IFRAME:true,INS:true,
        ISINDEX:true,LI:true,MAP:true,MENU:true,NOFRAMES:true,NOSCRIPT:true,OBJECT:true,OL:true,P:true,PRE:true,SCRIPT:true,TABLE:true,TBODY:true,TD:true,TFOOT:true,TH:true,THEAD:true,TR:true,UL:true },
	// Inline Elements - HTML 4.01
	X_HTMLParser_inline = {/*A:true,*/ABBR:true,ACRONYM:true,APPLET:true,B:true,BASEFONT:true,BDO:true,BIG:true,BR:true,BUTTON:true,CITE:true,CODE:true,DEL:true,DFN:true,EM:true,FONT:true,I:true,IFRAME:true,IMG:true,
        INPUT:true,INS:true,KBD:true,LABEL:true,MAP:true,OBJECT:true,Q:true,S:true,SAMP:true,SCRIPT:true,SELECT:true,SMALL:true,SPAN:true,STRIKE:true,STRONG:true,SUB:true,SUP:true,TEXTAREA:true,TT:true,U:true,VAR:true},
	// Elements that you can,' intentionally,' leave open
	// (and which close themselves)
	X_HTMLParser_closeSelf = {OLGROUP:true,DD:true,DT:true,LI:true,OPTIONS:true,P:true,TBODY:true,TD:true,TFOOT:true,TH:true,THEAD:true,TR:true}, // add tbody

	X_HTMLParser_sisters = {
        TH : { TD : true },
        TD : { TH : true },
        DT : { DD : true },
        DD : { DT : true },
        COLGROUP : { CAPTION : true },
        THEAD    : { CAPTION : true, COLGROUP : true },
        TFOOT    : { CAPTION : true, COLGROUP : true, THEAD : true, TBODY : true },
        TBODY    : { CAPTION : true, COLGROUP : true, THEAD : true, TFOOT : true }
	},
	/*
	 * http://www.tohoho-web.com/html/tbody.htm
	 * HTML4.01では、ヘッダとフッタを先読みして表示するために、<tbody> よりも <tfoot> の方を先に記述しなくてはならないと定義されています。
	 * IE5.0 などでは HEAD → BODY → FOOT の順に表示するのですが、
	 * <tfoot> に未対応の古いブラウザでは、HEAD → FOOT → BODY の順に表示されてしまいます。
	 * また、HTML5 では、<tfoot> と <tbody> の順番はどちらでもよいことになりました。
	 */

	// Attributes that have their values filled in disabled="disabled"

	// Special Elements (can contain anything)
	X_HTMLParser_special = { SCRIPT : true, STYLE : true, PLAINTEXT : true, XMP : true, TEXTAREA : true },
	
	X_HTMLParser_skipFixNesting = false;
	
	function X_HTMLParser_exec( html, handler, async ){
		var special        = X_HTMLParser_special,
			//plainText      = X_HTMLParser_plainText,
			startTime      = async && X_Timer_now(),
			stack          = async ? async[ 1 ] : [],
			lastHtml       = html,
			chars, last, text, index;

		while( html ){
			chars = true;
			last  = stack[ stack.length - 1 ];
			
			// Make sure we're not in a script or style element
			if( last && special[ handler.isXML ? last.toUpperCase() : last ] === 1 ){
				if( 0 <= ( index = html.toUpperCase().indexOf( '</' + ( handler.isXML ? last.toUpperCase() : last ) ) ) ){
					handler.chars( html.substring( 0, index ) );
					if( index = X_HTMLParser__parseEndTag( stack, handler, html ) ){
						html = html.substring( index );
					} else {
						handler.chars( html );
						html = '';
					};
				} else {
					handler.chars( html );
					html = '';
				};
			} else {
				// Comment
				if( html.indexOf("<!--") === 0 ){
					if( 0 < ( index = html.indexOf("-->") ) ){
						handler.comment( html.substring( 4, index ) );
						html = html.substring( index + 3 );
						chars = false;
					};
	
				// end tag
				} else if( html.indexOf("</") === 0 ){
					if( 2 < ( index = X_HTMLParser__parseEndTag( stack, handler, html ) ) ){
						html = html.substring( index );
						chars = false;
					};
	
				// start tag
				} else if( html.indexOf("<") === 0 ){
					if( index = X_HTMLParser__parseStartTag( stack, last, handler, html ) ){
						html  = html.substring( index );
						chars = false;
					} else
					if( index === false ){
						return;
					};
				};

				if( chars ){
					index = html.indexOf("<");
					
					text = index < 0 ? html : html.substring( 0, index );
					html = index < 0 ? '' : html.substring( index );
					
					handler.chars( text );
				};

			};

			if( html === lastHtml ){
				handler.err( html );
				return;
			};
			
			if( async && startTime + X_Timer_INTERVAL_TIME <= X_Timer_now() && html ){
				handler.progress( 1 - html.length / async[ 0 ] );
				X_Timer_once( 0, X_HTMLParser_exec, [ html, handler, async ] );
				return;
			};
			
			lastHtml = html;
		};
		
		// Clean up any remaining tags
		X_HTMLParser_parseEndTag( stack, handler );
		
		async && handler.asyncComplete();
	};

	function X_HTMLParser__parseStartTag( stack, last, handler, html ){
		var alphabets = X_HTMLParser_CHARS,
			whiteSpace = X_HTMLParser_CHARS,
			saveAttr = X_HTMLParser_saveAttr,
			uri   = X_Dom_DTD_ATTR_VAL_IS_URI,
			phase = 0,
			l     = html.length,
			i     = 0,
			attrs = [],
			tagName, empty = false,
			chr, start, attrName, quot, escape, tagUpper;
		
		while( i < l && phase < 9 ){
			chr = html.charAt( i );
			switch( phase ){
				case 0 :
					chr === '<' && ( ++phase );
					break;
				case 1 : // タグ名の開始を待つ
					( alphabets[ chr ] & 3 ) && ( ++phase && ( start = i ) );
					break;
				case 2 : // タグ名の終わりの空白文字を待つ
					( whiteSpace[ chr ] & 16 ) ?
						( ++phase && ( tagName = html.substring( start, i ) ) ) :
					( chr === '>' || ( empty = html.substr( i, 2 ) === '/>' ) ) &&
						( ( tagName = html.substring( start, i ) ) && ( phase = 9 ) );
					break;
				case 3 : // 属性名の開始を待つ
					( alphabets[ chr ] & 3 ) ?
						( ++phase && ( start = i ) ) :
					( chr === '>' || ( empty = html.substr( i, 2 ) === '/>' ) ) &&
						( phase = 9 );
					break;
				case 4 : // 属性名の終わりを待つ
					chr === '=' ?
						( ( phase = 6 ) && ( attrName = html.substring( start, i ) ) ) :
					( whiteSpace[ chr ] & 16 ) ?
						( ( phase = 5 ) && ( attrName = html.substring( start, i ) ) ) :
					( chr === '>' || ( empty = html.substr( i, 2 ) === '/>' ) ) &&
						( ( phase = 9 ) && ( attrs[ attrs.length ] = html.substring( start, i ) ) );
					break;
				case 5 : // 属性の = または次の属性または htmlタグの閉じ
					!( whiteSpace[ chr ] & 16 ) &&// ie4 未対応の属性には cite = http:// となる
					//	1 :
					( alphabets[ chr ] & 3 ) ?
						( ( phase = 3 ) && ( attrs[ attrs.length ] = attrName ) && ( start = i ) ) : // <textarea readonly>
					chr === '=' ?
						( phase = 6 ) :
					( chr === '>' || ( empty = html.substr( i, 2 ) === '/>' ) ) &&
						( ( phase = 9 ) && ( attrs[ attrs.length ] = attrName ) );
					break;
				case 6 : // 属性値の開始 quot を待つ
					( chr === '"' || chr === "'" ) ?
						( ( phase = 7 ) && ( quot = chr ) && ( start = i + 1 ) ):
					!( whiteSpace[ chr ] & 16 ) &&
						( ( phase = 8 ) && ( start = i ) ); // no quot
					break;
				case 7 : //属性値の閉じ quot を待つ
					!escape && ( chr === quot ) && ( phase = 3 ) && saveAttr( attrs, attrName, html.substring( start, i ) );
					break;
				case 8 : //閉じ quot のない属性の値
					( whiteSpace[ chr ] & 16 ) ?
						( ( phase = 3 ) && saveAttr( attrs, attrName, html.substring( start, i ) ) ) :
					( chr === '>' ) ?
						( ( phase = 9 ) && saveAttr( attrs, attrName, html.substring( start, i ) ) ) :
					!escape && !uri[ attrName ] && ( empty = html.substr( i, 2 ) === '/>' ) && // attr の val が uri で / で終わりかつ、未対応属性の場合
						( ( phase = 9 ) && saveAttr( attrs, attrName, html.substring( start, i ) ) );
					break;
			};
			escape = chr === '\\' && !escape; // \\\\ is not escape for "
			++i;
		};
		if( phase === 9 ){
			if( empty ) ++i;
			//if( X_HTMLParser_parseStartTag( stack, last, handler, tagName, attrs, empty, i ) === false ) return false;
			
			tagUpper = tagName.toUpperCase();
			
			if( !X_HTMLParser_skipFixNesting && X_HTMLParser_block[ tagUpper ] === 1 ){
				while( last && X_HTMLParser_inline[ handler.isXML ? last.toUpperCase() : last ] === 1 ){
					X_HTMLParser_parseEndTag( stack, handler, last );
					last = stack[ stack.length - 1 ];
				};
			};
			last && X_HTMLParser_closeSelf[ tagUpper ] === 1 &&
				( last === tagName || ( X_HTMLParser_sisters[ tagUpper ] && X_HTMLParser_sisters[ tagUpper ][ handler.isXML ? last.toUpperCase() : last ] === 1 ) ) &&
					X_HTMLParser_parseEndTag( stack, handler, last );
			empty = empty || X_Dom_DTD_EMPTY[ tagUpper ];
			!empty && ( stack[ stack.length ] = handler.isXML ? tagName : tagUpper );
			
			if( handler.tagStart( handler.isXML ? tagName : tagUpper, attrs, empty, i ) === false ) return false;
			
			return i;
		};
		return 0; // error
	};

	function X_HTMLParser__parseEndTag( stack, handler, html ){
		var alphabets = X_HTMLParser_CHARS,
			whiteSpace = X_HTMLParser_CHARS,
			phase = 0,
			l     = html.length,
			i     = 0,
			tagName,
			chr, start;
		
		while( i < l && phase < 9 ){
			chr = html.charAt( i );
			switch( phase ){
				case 0 :
					html.substr( i, 2 ) === '</' && ( ++phase && ++i );
					break;
				case 1 : // タグ名の開始を待つ
					( alphabets[ chr ] & 3 ) && ( ++phase && ( start = i ) );
					break;
				case 2 : // タグ名の終わりの空白文字を待つ
					( whiteSpace[ chr ] & 16 ) && ( ++phase );
					( chr === '>' ) && ( phase = 9 );
					( phase !== 2 ) && ( tagName = html.substring( start, i ) );
					break;
				case 3 : // タグの終了を待つ
					chr === '>' && ( phase = 9 );
					break;
			};
			++i;
		};
		if( phase === 9 ){
			X_HTMLParser_parseEndTag( stack, handler, handler.isXML ? tagName : tagName.toUpperCase() );
			return i;
		};
		return 0; // error
	};

	function X_HTMLParser_saveAttr( attrs, name, value ){
		name  = name.toLowerCase();
		value = X_Node_Attr_noValue[ name ] === 1 ? name : value;
		attrs[ attrs.length ] = {
			attName   : name,
			// attrValue : value,
			escaped   :
				value.indexOf( '"' ) !== -1 ?
					value.split( '"' ).join( '\\"' ).split( '\\\\"' ).join( '\\"' ) :
					value
		};
	};

	function X_HTMLParser_parseEndTag( stack, handler, tagName ) {
		var pos = 0, i = stack.length;
		// If no tag name is provided, clean shop
		
		// Find the closest opened tag of the same type
		if ( tagName )
			for ( pos = i; 0 <= pos; )
				if ( stack[ --pos ] === tagName )
					break;
		
		if ( 0 <= pos ) {
			// Close all the open elements, up the stack
			for ( ; pos < i; )
				handler.tagEnd( stack[ --i ] );
			
			// Remove the open elements from the stack
			stack.length = pos;
		};
	};

var X_HTMLParser_htmlStringToXNode = {
	flat : null,
	nest : [],
	isXML : false,
	err : function( html ){
        X_HTMLParser_htmlStringToXNode.flat.length = 0;
        if( X_IS_DEV && !X_HTMLParser_htmlStringToXNode.ignoreError ){
            X_error( 'X.Node#X_HTMLParser() : parse error! html=' + html );
        };
	},
	tagStart : function( tagName, attrs, noChild, length ){
		var xnode,
			nest   = X_HTMLParser_htmlStringToXNode.nest,
			flat   = X_HTMLParser_htmlStringToXNode.flat,
			l      = nest.length,
			attr, name, i, _attrs; //, toIndex;
		if( l ){
			xnode = nest[ l - 1 ][ 'create' ]( tagName );
		} else {
			xnode = flat[ flat.length ] = X_Doc_create( tagName );
		};
		if( !noChild ) nest[ l ] = xnode;
		if( i = attrs.length ){
			_attrs = {};
			for( ; i; ){
				if( attr = attrs[ --i ] ){
					if( X_Type_isString( attr ) ){
						name = attr;
						_attrs[ name ] = true;
					} else {
						name = attr.attName;
						_attrs[ name ] = attr.escaped;
					};
				};
			};
			xnode[ 'attr' ]( _attrs );
		};
	},
	tagEnd : function(){
		0 < X_HTMLParser_htmlStringToXNode.nest.length && ( --X_HTMLParser_htmlStringToXNode.nest.length );
	},
	chars : function( text ){
		if( X_HTMLParser_htmlStringToXNode.nest.length ){
			X_HTMLParser_htmlStringToXNode.nest[ X_HTMLParser_htmlStringToXNode.nest.length - 1 ][ 'createText' ]( text );
		} else {
			X_HTMLParser_htmlStringToXNode.flat[ X_HTMLParser_htmlStringToXNode.flat.length ] = X_Doc_createText( text );
		};
	},
	comment : X_emptyFunction
};

function X_HtmlParser_parse( html, ignoreError ){
	var worker = X_HTMLParser_htmlStringToXNode, ret;
	worker.flat = [];
	worker.nest.length = 0;
	worker.ignoreError = ignoreError;
	X_HTMLParser_exec( html, worker );
	ret = worker.flat;
	delete worker.flat;
	return ret;
};

var X_HTMLParser_asyncHtmlStringToXNode = {
	isXML : false,
	err : function( html ){
		X_HTMLParser_htmlStringToXNode.err( html );
		this[ 'asyncDispatch' ]( X_EVENT_ERROR );
	},
	tagStart : X_HTMLParser_htmlStringToXNode.tagStart,
	tagEnd   : X_HTMLParser_htmlStringToXNode.tagEnd,
	chars    : X_HTMLParser_htmlStringToXNode.chars,
	comment  : X_emptyFunction,
	
	progress : function( pct ){
		this[ 'asyncDispatch' ]( { type : X_EVENT_PROGRESS, percent : pct } );
	},
	asyncComplete : function(){
		var ret = X_HTMLParser_htmlStringToXNode.flat;
		delete X_HTMLParser_htmlStringToXNode.flat;
		this[ 'asyncDispatch' ]( { type : X_EVENT_SUCCESS, xnodes : ret } );
	}
};

function X_HTMLParser_asyncParse( html, ignoreError ){
	var dispatcher = X_Class_override( X_EventDispatcher(), X_HTMLParser_asyncHtmlStringToXNode ),
		worker = X_HTMLParser_htmlStringToXNode;
	dispatcher[ 'listenOnce' ]( X_EVENT_SUCCESS, dispatcher, dispatcher[ 'kill' ] );
	worker.flat = [];
	worker.nest.length = 0;
	worker.ignoreError = ignoreError;
	X_HTMLParser_exec( html, dispatcher, [ html.length, [] ] );
	return dispatcher;
};
