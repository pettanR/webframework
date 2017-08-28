/*
 * JavaScript : Opera と Firefox でのキーイベントの違い
 * http://blog.livedoor.jp/tzifa/archives/50776590.html
 *  keydown について。Firefox では押している間中リスナの関数が実行される
 *  デフォルトイベントの制御・抑止 (opera)keypress を用いる。
 * 
 * 
 * keydown をトリガーにイベントを発火するもの
 *  1. テンキーの 0～9 keyCode:96-105
 *  2. ScrollLock:145, Ins:45, PuaseBreak:19, HOME:36, PageUp:33, del:46, END:35, PageDown:34,
 *     ←↑→↓:37-40, tab:9, capsLock:240or208, Shift+capslock:20, shift:16, ctrl:17, LWIN:91, BS:8,
 *　　　　
 *  3. RWIN:92!(Opera<9.5), alt:18, [F1]-[F12]:112-123
 * 
 */

var X_KB_SPECIALS = eval( // IE5- 対策
		"({'8':'BS','9':'TAB'," +
		"'13':'ENTER','16':'SHIFT','17':'CTRL','18':'ALT','19':'PAUSE_BREAK','20':'SHIFT+CAPS_LOCK'," +
		"'27':'ESC','28':'trans','29':'notrans'," +
		"'33':'PAGE_UP','34':'PAGE_DOWN','35':'END','36':'HOME','37':'CSR_L','38':'CSR_U','39':'CSR_R','40':'CSR_D'," +
		"'44':'PRT_SCRN','45':'INS','46':'DEL'," +
		"'91':'LWIN','92':'RWIN','93':'APP'," +
		"'96':48,'97':49,'98':50,'99':51,'100':52,'101':53,'102':54,'103':55,'104':56,'105':57,'106':42,'107':43,'109':45,'110':46,'111':47," +
		"'112':'F1','113':'F2','114':'F3','115':'F4','116':'F5','117':'F6','118':'F7','119':'F8','120':'F9','121':'F10','122':'F11','123':'F12'," +
		"'144':'NUM_LOCK','145':'SCROLL_LOCK','208':'CAPS_LOCK','240':'CAPS_LOCK','242':'K/H','243':'H/Z','244':'H/Z'})" ),
	X_KB_DOWN_KEYS   = {},
	X_KB_CANCELED    = {},
	X_KB_lastIs10Key = false,
	X_KB_lastKeyCode = 0, 
	X_KB_TRANSFOEM   = {},
	
	// TODO keyevent のためには input 等にフォーカスが必要 -> iOS
	
	X_kbManager    =
		X_Class_override(
			X_EventDispatcher(),
			{	
				handleEvent : function( e ){
					var keyCode = e.keyCode,  // keyCode says something about the actual keyboard key the user pressed
						chrCode = e.charCode, // while charCode gives the ASCII value of the resulting character
						cb      = X_CALLBACK_NONE,
						special;
					
					// console.log( e.type + ' > keyCode:' + keyCode + ' chrCode:' + chrCode );
					
					switch( e.type ){
						case 'keydown' :
							if( X_KB_DOWN_KEYS[ keyCode ] ){
								// 既に押されている、メタキー[shift,ctrl,alt]の変化はある？
								console.log( ' doen -- ' );
								
								return X_KB_CANCELED[ keyCode ] ? X_CALLBACK_PREVENT_DEFAULT : cb;
							} else
							if( special = X_KB_SPECIALS[ keyCode ] ){
								
								if( X_Type_isNumber( special ) ){
									// テンキーの [0]～[9]
									//chrCode = special;
									X_KB_lastKeyCode = keyCode;
									X_KB_lastIs10Key = true;
									return cb;
								} else {
									X_KB_DOWN_KEYS[ keyCode ] = true;
									chrCode = 0;
								};
								
								cb = this[ 'dispatch' ]( {
									type      : 'keydown',
									keyCode   : keyCode,
									charCode  : chrCode,
									'keyName' : X_Type_isString( special ) ? special : '',
									'is10key' : !!X_KB_lastIs10Key,
									shiftKey  : !!X_KB_DOWN_KEYS[ 16 ],
									ctrlKey   : !!X_KB_DOWN_KEYS[ 17 ],
									altKey    : !!X_KB_DOWN_KEYS[ 18 ],
									metaKey   : !!X_KB_DOWN_KEYS[ 224 ]
								} );
								
								if( cb & X_CALLBACK_PREVENT_DEFAULT ){
									X_KB_CANCELED[ keyCode ] = true;
								};
								/*
								if( special === 'APP' ){
									X_ViewPort_active = false;
									X_ViewPort[ 'dispatch' ]( X_EVENT_VIEW_DEACTIVATE );
								}; */
							} else {
								X_KB_lastKeyCode = keyCode;
								
								if( e.ctrlKey || e.altKey || e.metaKey ){
									cb = this[ 'dispatch' ]( {
										type      : 'keydown',
										keyCode   : 0,
										charCode  : chrCode,
										'keyName' : '',
										'is10key' : false,
										shiftKey  : !!X_KB_DOWN_KEYS[ 16 ],
										ctrlKey   : !!X_KB_DOWN_KEYS[ 17 ],
										altKey    : !!X_KB_DOWN_KEYS[ 18 ],
										metaKey   : !!X_KB_DOWN_KEYS[ 224 ]
									} );
									
									if( cb & X_CALLBACK_PREVENT_DEFAULT ){
										X_KB_CANCELED[ keyCode ] = true;
									};
								};
								console.log( ' keydown[' + keyCode + ']' + String.fromCharCode( chrCode ) + chrCode );
							};
							return cb;
							
						case 'keypress' :
							// keydown 側で発火しているものは再び発火しない
							if( X_KB_DOWN_KEYS[ chrCode ] ){
								// TODO keypress
								return X_KB_CANCELED[ chrCode ] ? X_CALLBACK_PREVENT_DEFAULT : cb;
							} else
							if( keyCode === 32 ){
								chrCode = 32;
							};

							if( 32 <= chrCode && chrCode <= 126 ){
								X_KB_TRANSFOEM[ X_KB_lastKeyCode ] = chrCode;
								
								cb = this[ 'dispatch' ]( {
									type      : 'keydown',
									keyCode   : X_KB_lastIs10Key ? X_KB_lastKeyCode : 0,
									charCode  : chrCode,
									'is10key' : X_KB_lastIs10Key,
									shiftKey  : !!X_KB_DOWN_KEYS[ 16 ],
									ctrlKey   : !!X_KB_DOWN_KEYS[ 17 ],
									altKey    : !!X_KB_DOWN_KEYS[ 18 ],
									metaKey   : !!X_KB_DOWN_KEYS[ 224 ]
								} );
								
								X_KB_lastIs10Key = false;
								
								console.log( X_KB_lastKeyCode + 'keypress : chrCode:' + chrCode + ' down:' + X_KB_DOWN_KEYS[ chrCode ] + ( X_KB_CANCELED[ chrCode ] ? ' Cancel!' : '' ) );
							} else {
								console.log( '>> keypress : chrCode:' + chrCode + ' down:' + X_KB_DOWN_KEYS[ chrCode ] + ( X_KB_CANCELED[ chrCode ] ? ' Cancel!' : '' ) );
							};
							return cb;
							
						case 'keyup' :
							if( X_KB_CANCELED[ keyCode ] ){
								cb = X_CALLBACK_PREVENT_DEFAULT;
							};
						
							if( ( special = X_KB_SPECIALS[ keyCode ] ) && ( !X_KB_DOWN_KEYS[ keyCode ] && !X_KB_DOWN_KEYS[ special ] ) ){
								cb |= this[ 'dispatch' ]( {
									type        : 'keydown',
									keyCode     : keyCode,
									charCode    : 0,
									'keyName'   : special,
									'is10key'   : false,
									'isVirtual' : true,
									shiftKey    : !!X_KB_DOWN_KEYS[ 16 ],
									ctrlKey     : !!X_KB_DOWN_KEYS[ 17 ],
									altKey      : !!X_KB_DOWN_KEYS[ 18 ],
									metaKey     : !!X_KB_DOWN_KEYS[ 224 ]
								} );
							};
						
							if( X_KB_DOWN_KEYS[ keyCode ] ) delete X_KB_DOWN_KEYS[ keyCode ];
							if( X_KB_CANCELED[ keyCode ]  ) delete X_KB_CANCELED[ keyCode ];
							
							
							if( !special ){
								// keyCode から charCode を復帰する
								chrCode = X_KB_TRANSFOEM[ keyCode ];
								if( !chrCode ) return cb;
								delete X_KB_TRANSFOEM[ keyCode ];
							} else
							if( 42 <= special ){
								chrCode = special; // ie8で必要... Firefox でもテンキーの+-*/ で必要...
							} else {
								chrCode = 0;
							};
							
							//console.log( keyCode + ' keyup ' + chrCode );
							
							cb |= this[ 'dispatch' ]( {
								type      : 'keyup',
								keyCode   : keyCode,
								charCode  : chrCode,
								'keyName' : X_Type_isString( special ) ? special : '',
								shiftKey  : X_KB_DOWN_KEYS[ 16 ],
								ctrlKey   : X_KB_DOWN_KEYS[ 17 ],
								altKey    : X_KB_DOWN_KEYS[ 18 ],
								metaKey   : X_KB_DOWN_KEYS[ 224 ]
							} );
							
							return cb;
						
						case X_EVENT_VIEW_ACTIVATE :
							//
							break;
						case X_EVENT_VIEW_DEACTIVATE :
							//
							break;	
					};
				}
			}
		),

/**
 * キーボードイベント情報を提供するオブジェクト。
 * @namespace X.KB
 * @alias X.KB
 */
	X_KB = X[ 'KB' ] = {
		/**
		 * 
		 * @alias X.KB.listen
		 */
		'listen' : function( type, arg1, arg2, arg3 ){
			type && arg1 && X_kbManager[ 'listen' ]( type, arg1, arg2, arg3 );
			return X_KB;
		},
		
		/**
		 * 
		 * @alias X.KB.listenOnce
		 */
		'listenOnce' : function( type, arg1, arg2, arg3 ){
			type && arg1 && X_kbManager[ 'listenOnce' ]( type, arg1, arg2, arg3 );
			return X_KB;
		},
		
		/**
		 * 
		 * @alias X.KB.unlisten
		 */
		'unlisten' : function( type, arg1, arg2, arg3 ){
			type && arg1 && X_kbManager[ 'unlisten' ]( type, arg1, arg2, arg3 );
			return X_KB;
		},
		
		/**
		 * 
		 * @alias X.KB.listening
		 */
		'listening' : function( type, arg1, arg2, arg3 ){
			return X_kbManager[ 'listening' ]( type, arg1, arg2, arg3 );
		}
	};

X_ViewPort[ 'listen' ]( [ X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE ], X_kbManager );

if( X_UA[ 'IE' ] < 9 ){
	X_ViewPort_document[ 'listen' ]( [ 'keyup', 'keydown', 'keypress' ], X_kbManager );
} else {
	X_ViewPort[ 'listen' ]( [ 'keyup', 'keydown', 'keypress' ], X_kbManager );
};
