/*
 * tr = X.Doc.createRange('selection')
 *      X.Doc.createRange({from : num, to : num})
 * tr = xnode.createRange( from, to ),
 * 	　　　( 'selection' ) docment の slection のうち xnode の配下のもの, textarea, input, iframe[desineMode] の場合、選択範囲またはカーソル位置
 *     ( 'select', from[, to] ) 選択する
 *     ( 'char', from[, to] )
 *     ( 'lineAt', index ),
 * 	   ( 'line', x, y ), | ( 'line', pointerEvent )
 *     ( 'point', x, y ) | ( 'point', pointerEvent )
 * tr.move( from, to )
 * tr.select( true | false )
 * tr.getRect() { width, height, x, y } -> tr.mesure()
 * tr.getOffset() { from, to } 
 * tr.text()
 * 
 * naming は mozilla　に寄せる
 */

var X_TextRange_range,
	X_TextRange_selection,
	X_TextRange_isW3C = !document.selection || 9 <= X_UA[ 'IE' ] || X_UA[ 'Edge' ];

/**
 * ユーザーによって選択されたテキストへの参照や文字の座標の取得
 * @alias X.TextRange
 * @class TextRange テキストレンジ
 * @extends {__ClassBase__}
 */
var X_TextRange = X_Class_create(
	'X.TextRange',
	
	// TODO コールバックの最後に破棄されるクラス 1刻みの間存在するクラス. X.XML も
	
	/** @lends X.TextRange.prototype */
	{
		'xnode' : null,
		'by'    : '',
		'v1'    : 0,
		'v2'    : 0,
		
		'Constructor' : function( xnode, arg2, arg3, arg4 ){
			if( !X_TextRange_range ){
				X_TextRange_range = X_TextRange_isW3C ? document.createRange() : X_elmBody.createTextRange();
			};
			
			this.xnode = xnode;
			
			switch( arg2 ){
				case 'selection' :
					if( !X_TextRange_selection ){
						X_TextRange_selection = X_TextRange_isW3C ? window.getSelection() : document.selection.createRange;
					};
				case 'point' :
				case 'char' :
					this[ 'by' ] = arg2;
					break;
				default :
					arg4 = arg3;
					arg3 = arg2;
			};
			
			if( arg2 !== 'selection' ){
				this[ 'v1' ] = arg3 || 0;
				this[ 'v2' ] = arg4 || 0;
			} else {
				this[ 'getOffset' ]();
			};
		},
		
		'move'      : X_TextRange_move,
		
		'select'    : X_TextRange_select,
		
		'getRect'   : X_TextRange_getRect,
		
		'getOffset' : X_TextRange_getOffset,
		
		'text'      : X_TextRange_text
	}
);

// TextNode を探して flat な配列に格納する
function X_TextRange_collectTextNodes( elm, ary ){
	var kids = elm.childNodes,
		i, e;
	
	if( !kids || !kids.length ) return;
	
	for( i = 0; e = kids[ i ]; ++i ){
		switch( e.nodeType ){
			case 1 :
				X_TextRange_collectTextNodes( e, ary );
				break;
			case 3 :
				ary[ ary.length ] = e;
				break;
		};
	};
};

function X_TextRange_getRawRange( tr ){
	var xnode = tr.xnode,
				//
		range = //10 <= X_UA[ 'IE' ] /* || X_UA[ 'iOS' ] */ ? document.createRange() :
				//8 <= X_UA[ 'IE' ] ? X_elmBody.createTextRange() :
				X_TextRange_range,
		selection = X_TextRange_selection, 
		elm, isPoint,
		texts, i, offset, text, j, l, x, y, rect, top, btm, left;
	
	if( xnode[ '_flags' ] & X_NodeFlags_IN_TREE ){
		
		X_Node_updateTimerID && X_Node_startUpdate();
		
		elm = xnode[ '_rawObject' ];
		
		switch( tr[ 'by' ] ){
			case 'selection' :
				if( X_TextRange_isW3C ){
					//selection = window.getSelection();
					
		            if( selection.getRangeAt ){
		            	return selection.rangeCount && selection.getRangeAt( 0 );
		            };
		            // http://d.hatena.ne.jp/dayflower/20080423/1208941641
		            // for Safari 1.3
		            //range = document.createRange();
		            range.setStart( selection.anchorNode, selection.anchorOffset );
		            range.setEnd( selection.focusNode, selection.focusOffset );
					return range;
				} else {
					switch( document.selection.type ){
						case 'text' :
							return selection();
						case 'Control' :
							// TODO
						case 'none' :
					};
				};
				break;

			case 'point' :
				if( X_TextRange_isW3C ){
					// textarea で異なる
					// TextNode をフラットな配列に回収
					X_TextRange_collectTextNodes( elm, texts = [] );						
					
					x = tr[ 'v1' ];
					y = tr[ 'v2' ];
					
					for( i = offset = 0; text = texts[ i ]; ++i ){
						range.selectNodeContents( text ); // selectNodeContents は TextNode のみ?? Firefox
						l = text.data.length;

				        for( j = 0; j < l; ++j ){
				            if( X_UA[ 'IE' ] || X_UA[ 'Edge' ] ){
				            	// 改行の直前の文字を選択すると rect が巨大になってしまう
					        	range.setEnd( text, j );
					            range.setStart( text, j );
					            rect = range.getBoundingClientRect();
					            top  = rect.top;
					            btm  = rect.bottom;
					            left = rect.left;
				            	range.setEnd( text, j + 1 );
				            	rect = range.getBoundingClientRect();
				            	
				            	if( rect.left < left ){
				            		//console.log( '= ', text.data.charAt( j ), ' x:', x, ' y:', y, ' top:', top | 0, ' left:', left | 0, ' bottom:', btm | 0, ' right:', rect.right | 0 );
						            if( left <= x && x <= rect.right && top <= y && y <= btm ){
						            	return {
						            		'hitRange' : range, // TODO startContainer, endContainer
						            		'rect'     : rect,
						            		'offset'   : offset,
						            		'text'     : text // TODO xtext じゃないの?
						            	};
						            };
						            continue;
				            	};
				            } else {
					        	range.setEnd( text, j + 1 );
					            range.setStart( text, j );
					            rect = range.getBoundingClientRect();
				            };
				            
				        	//console.log( text.data.charAt( j ), ' x:', x, ' y:', y, ' top:', rect.top | 0, ' left:', rect.left | 0, ' bottom:', rect.bottom | 0, ' right:', rect.right | 0 );
				            if( rect.left <= x && x <= rect.right && rect.top <= y && y <= rect.bottom ){
				            	return {
				            		'hitRange' : range, // TODO startContainer, endContainer
				            		'rect'     : rect,
				            		'offset'   : offset,
				            		'text'     : text // TODO xtext じゃないの?
				            	};
				            };
				        };
				        offset += l;
					};
					range = null;
				} else {
					// ie11 の ie10モード で moveToPoint がないといわれる. よって isW3C:false で動作するのは　ie9 以下
					// 行の最後の文字の端をクリックすると次の行の文字が選択されてしまう ie8, ie7
					// 選択を移動して補正する　https://msdn.microsoft.com/ja-jp/library/ms535872(v=vs.85).aspx
					range.moveToPoint( x = tr[ 'v1' ], y = tr[ 'v2' ] );
					
					// if( range.parentElement() !== elm　 || elm.contains( range.parentElement() ) ){
					
					if( range.expand( 'character' ) ){
						left = range.boundingLeft;
						top  = range.boundingTop;
						if( x < left || left + range.boundingWidth  < x || y < top || top  + range.boundingHeight < y ){
							range.moveStart( 'character', -1 );
							range.moveEnd( 'character', -1 );
							left = range.boundingLeft;
							top  = range.boundingTop;
							if( x < left || left + range.boundingWidth  < x || y < top || top  + range.boundingHeight < y ){
								range = null;
							};
						};
					} else {
						range = null;
					};
				};
				return range;

			case 'char' :
				if( X_TextRange_isW3C ){
					// 未チェック！
					range.setEnd( elm, l < tr[ 'v2' ] ? l : tr[ 'v2' ] );
		            range.setStart( elm, tr[ 'v1' ] );
		            return { 'hitRange' : range };
				} else {
					range.moveToElementText( elm );
					//range.collapse( true );						
					range.moveEnd( 'character', l < tr[ 'v2' ] ? l : tr[ 'v2' ] );
					range.moveStart( 'character', tr[ 'v1' ] );
				};
				return range;
		};
	};
};

function X_TextRange_getRect(){
	var result = X_TextRange_getRawRange( this ),
		rect, ret;
	
	if( result ){
		if( X_TextRange_isW3C ){
			if( result.hitRange ){
				rect = result.hitRange.getBoundingClientRect();
				ret = {
					'x'      : rect.left,
					'y'      : rect.top,
					'width'  : rect.width,
					'height' : rect.height
				};
				//range.detach && range.detach();
			};
		} else {
			ret = {
				'x'      : result.boundingLeft,
				'y'      : result.boundingTop,
				'width'  : result.boundingWidth,
				'height' : result.boundingHeight // ie は right, bottom を持たない...
			};
		};
	};
	return ret || { 'x' : 0, 'y' : 0, 'width' : 0, 'height' : 0 };
};

// X.Text を探して flat な配列に格納する
function X_TextRange_collectXTexts( xnode, ary ){
	var kids = xnode[ '_xnodes' ],
		i;
	
	if( !kids || !kids.length ) return;
	
	for( i = -1; xnode = kids[ ++i ]; ){
		if( xnode[ '_tag' ] ){
			X_TextRange_collectXTexts( xnode, ary );
		} else {
			ary[ ary.length ] = xnode;
		};
	};
};

function X_TextRange_getOffset(){
	var xnode = this.xnode,
		elm, result, range,
		ret, from, xtexts, n, i, l, xtext;
	
	if( xnode[ '_tag' ] === 'TEXTAREA' ){
		elm = xnode[ '_rawObject' ];
		
		if( elm && xnode[ '_flags' ] & X_NodeFlags_IN_TREE ){
			if( X_UA[ 'IE' ] < 9 ){
				

				return cursorPosition.call( this, elm );

			} else if( elm.setSelectionRange ){
				if( X_UA[ 'IE' ] < 12 ){
					l = elm.value.length;
					ret = {
						'from' : this[ 'v1' ] = elm.selectionStart < l ? elm.selectionStart : l,
						'to'   : this[ 'v2' ] = elm.selectionEnd   < l ? elm.selectionEnd   : l
					};
				} else {
					ret = {
						'from' : this[ 'v1' ] = elm.selectionStart,
						'to'   : this[ 'v2' ] = elm.selectionEnd
					};	
				};
			};
		};
	} else
	if( result = X_TextRange_getRawRange( this ) ){
		if( X_TextRange_isW3C ){
			range = result.hitRange;
			ret = {
				'offset' : result.offset,
				'from'   : this[ 'v1' ] = range.startOffset,
				'to'     : this[ 'v2' ] = range.endOffset,
				'text'   : X_Node_getXNode( result.text )
			};
			// range.detach && range.detach();		
		} else {
			// http://www.studio-freesky.net/programming/javascript/3/
			
			range = X_TextRange_range.duplicate();
			range.moveToElementText( xnode[ '_rawObject' ] );
			range.setEndPoint( 'EndToStart', result );
			//range.text && range.moveEnd( 'character', -1 );
			from  = range.text.length;
			
			X_TextRange_collectXTexts( xnode, xtexts = [] );
			
			if( xtexts.length ){
				for( n = 0, i = -1; xtext = xtexts[ ++i ]; ){
					l = xtext[ '_rawObject' ].data.length;
					if( from < n + l ){
						break;
					};
					n += l;
				};

				ret = {
					'offset' : n, // elm の何個目の node か?
					'from'   : this[ 'v1' ] = from - n,
					'to'     : this[ 'v2' ] = from - n + result.text.length,
					'text'   : xtext
				};				
			};
		};
	};
	
	return ret || { 'from' : -1, 'to' : -1 };
};

function X_TextRange_text( v ){
	var xnode = this.xnode, elm, val, offset, from, to, range;
	
	if( v === undefined ){
		
	} else {
		if( xnode[ '_tag' ] === 'TEXTAREA' ){
			elm = xnode[ '_rawObject' ];
			val = X_UA[ 'IE' ] < 9 ? X_Node_Attr_getValueForIE( elm ) : elm.value;
			
			if( this[ 'by' ] === 'char' ){
				xnode.attr( {
					'value' : val.substr( 0, this[ 'v1' ] ) + v + val.substr( this[ 'v2' ] )
				} );
			} else {
				offset = this[ 'getOffset' ]();
				
				from   = offset[ 'from' ];
				to     = offset[ 'to' ];

				if( X_UA[ 'IE' ] < 9 ){
					range = X_TextRange_selection();
					// TODO check textarea
					range.text = v;
					// ここには range.text がいない https://msdn.microsoft.com/ja-jp/library/cc427934.aspx
				} else {
					val = val.substr( 0, from ) + v + val.substr( to );
					elm.value = val;
				};
					
				if( to !== from ){
					// カーソル位置を挿入した文字列の最後へ
					to = from + v.length;
				} else {
					// カーソル位置を挿入した文字列の後ろへ
					to += v.length;
				};
				this.move( to, to );
			};
		};
	};
};

function X_TextRange_move( from, to ){
	var xnode  = this.xnode,
		elm    = xnode[ '_rawObject' ],
		len, range;

	if( 0 <= from ){
		this[ 'v1' ] = from;
	} else {
		this[ 'v1' ] = this[ 'v1' ] + from;
		this[ 'v1' ] < 0 && ( this[ 'v1' ] = 0 );
	};

	if( X_Type_isNumber( to ) ){
		if( 0 <= to ){
			this[ 'v2' ] = to;
		} else {
			this[ 'v2' ] = this[ 'v2' ] + to;
			this[ 'v2' ] < this[ 'v1' ] && ( this[ 'v2' ] = this[ 'v1' ] );
		};
	};
	
	if( xnode[ '_tag' ] === 'TEXTAREA' ){
		// http://blog.enjoyxstudy.com/entry/20060305/p1
		
		if( X_UA[ 'IE' ] < 9 || X_UA[ 'Prsto' ] ){
			len = ( X_UA[ 'IE' ] < 9 ? X_Node_Attr_getValueForIE( elm ) : elm.value ).length;
			
			if( X_UA[ 'Prsto' ] ){
				FocusUtility_setTemporarilyFocus( elm );
			};

			range = elm.createTextRange();

			if( this[ 'v1' ] === this[ 'v2' ] && this[ 'v1' ] === 0 ){
				range.collapse( true ); // 先頭に移動
			} else {
				if( this[ 'v1' ] !== this[ 'v2' ] || this[ 'v1' ] < len ){
					range.collapse(); // おまじない?

					if( this[ 'v1' ] === this[ 'v2' ] ){
						range.move( 'character', this[ 'v1' ] );
					} else {
						range.moveEnd( 'character', this[ 'v2' ] );
						range.moveStart( 'character', this[ 'v1' ] );
					};
				} else {
					range.collapse( false ); // 末美に移動
				};
			};
			range.select();

		} else if( elm.setSelectionRange ){
			elm.setSelectionRange( this[ 'v1' ], this[ 'v2' ] );
		};
	};
};

function X_TextRange_select( v ){
	
};

// http://www.studio-freesky.net/programming/javascript/3/
// それは、IEのTextRangeオブジェクトで取得した範囲にもしラストに改行コード￥ｒ￥ｎがあった場合それが含まれないのです。（視覚的な選択範囲には含まれています）

// https://web.archive.org/web/20090904134938/http://www.dedestruct.com/2008/03/22/howto-cross-browser-cursor-position-in-textareas/
					// https://web.archive.org/web/20090904183807/http://www.dedestruct.com/cursorPosition.html
					function cursorPosition( textarea ){

						var selection_range = X_TextRange_selection().duplicate();
						

						if (selection_range.parentElement() !== textarea) {
							// TODO 正しくはカーソル位置・選択範囲の復帰
							
							FocusUtility_setTemporarilyFocus( textarea );
								
							// BODY要素のテキスト範囲を作成する
							selection_range = X_elmBody.createTextRange();
						
							// BODY要素のテキスト範囲をeのテキスト範囲に移動する
							// これはe.createTextRange()とほぼ同等
							selection_range.moveToElementText( textarea );
							
							selection_range.collapse( true ); // 末美に移動
							selection_range.select();
						};

						//if (selection_range.parentElement() == textarea) {// Check that the selection is actually in our textarea
							// Create three ranges, one containing all the text before the selection,
							// one containing all the text in the selection (this already exists), and one containing all
							// the text after the selection.
							var before_range = X_elmBody.createTextRange();
							before_range.moveToElementText(textarea);
							// Selects all the text
							before_range.setEndPoint('EndToStart', selection_range);
							// Moves the end where we need it
						
							var after_range = X_elmBody.createTextRange();
							after_range.moveToElementText(textarea);
							// Selects all the text
							after_range.setEndPoint('StartToEnd', selection_range);
							// Moves the start where we need it
						
							var before_finished = false, selection_finished = false, after_finished = false;
							var before_text, untrimmed_before_text, selection_text, untrimmed_selection_text, after_text, untrimmed_after_text;
						
							// Load the text values we need to compare
							before_text = untrimmed_before_text = before_range.text;
							selection_text = untrimmed_selection_text = selection_range.text;
							after_text = untrimmed_after_text = after_range.text;
						
							// Check each range for trimmed newlines by shrinking the range by 1 character and seeing
							// if the text property has changed.  If it has not changed then we know that IE has trimmed
							// a \r\n from the end.
							do {
								if (!before_finished) {
									if (before_range.compareEndPoints('StartToEnd', before_range) == 0) {
										before_finished = true;
									} else {
										before_range.moveEnd('character', -1);
										if (before_range.text == before_text) {
											untrimmed_before_text += '\r\n';
										} else {
											before_finished = true;
										}
									}
								}
								if (!selection_finished) {
									if (selection_range.compareEndPoints('StartToEnd', selection_range) == 0) {
										selection_finished = true;
									} else {
										selection_range.moveEnd('character', -1);
										if (selection_range.text == selection_text) {
											untrimmed_selection_text += '\r\n';
										} else {
											selection_finished = true;
										}
									}
								}
								if (!after_finished) {
									if (after_range.compareEndPoints('StartToEnd', after_range) == 0) {
										after_finished = true;
									} else {
										after_range.moveEnd('character', -1);
										if (after_range.text == after_text) {
											untrimmed_after_text += '\r\n';
										} else {
											after_finished = true;
										}
									}
								}
						
							} while ((!before_finished || !selection_finished || !after_finished));
						
							// Untrimmed success test to make sure our results match what is actually in the textarea
							// This can be removed once you're confident it's working correctly
							/*
							var untrimmed_text = untrimmed_before_text + untrimmed_selection_text + untrimmed_after_text;
							var untrimmed_successful = false;
							if (textarea.value == untrimmed_text) {
								untrimmed_successful = true;
							} */
							// ** END Untrimmed success test
						
							var startPoint = untrimmed_before_text.split( '\r' ).join( '' ).length;
							// alert(startPoint);
							return {
								'from'   : this[ 'v1' ] = startPoint,
								'to'     : this[ 'v2' ] = startPoint + untrimmed_selection_text.split( '\r' ).join( '' ).length
							};
						//}
					}
					
