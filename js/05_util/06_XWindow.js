/**
 * 別窓(別タブ)の操作
 * <ol>
 * <li>ポップアップブロックされないように、pointer event, click event 内でインスタンスを作る
 * <li>win.kill() で別窓を閉じる
 * <li>win.kill() 以外で閉じられた場合、ユーザーの[x]ボタン操作や、他のscriptによって閉じられた場合、X.Event.UNLOAD イベントを発して自身を kill する。
 * </ol>
 * イベント
 * <dl>
 * <dt>X.Event.UNLOAD<dd>win.kill() 以外で閉じられた場合に通知、自身はkillする
 * <dt>X.Event.ERROR<dd>他ドメインに遷移した等の理由で win.write() による書き換えに失敗した場合
 * </dl>
 * 
 * @example // 別ページの表示
 * win = X.Util.Window( { url : 'other.html' } );
 * // コンテンツの書き込み
 * win = X.Util.Window( { html : '&lt;p&gt;Hello,world!&lt;/p&gt;' } );
 * // 閉じる
 * win.kill();
 * 
 * @alias X.Util.Window
 * @class Window 別窓(別タブ)
 * @extends {EventDispatcher}
 */
var X_Window = X[ 'Util' ][ 'Window' ] = X_EventDispatcher[ 'inherits' ](
	'X.Window',
	
	/** @lends X.Util.Window.prototype */
	{		
		'Constructor' : function( options ){
			var url  = options[ 'url' ],
				page = window.open( url || ''/* 'about:blank' */, options[ 'name' ] || '', options[ 'params' ] || '' ),
				html = options[ 'html' ];

			X_ViewPort[ 'listenOnce' ]( X_EVENT_UNLOAD, this, X_Util_Window_handleEvent );
			this[ 'listenOnce' ]( [ X_EVENT_UNLOAD, X_EVENT_KILL_INSTANCE ], X_Util_Window_handleEvent );
			
			X_Pair_create( this, {
				page    : page,
				timerID : X_Timer_add( options[ 'interval' ] || 500, 0, this, X_Util_Window_onTimer )
			} );

			if( !url && html ){
				this[ 'write' ]( html );
			};
		},
		
		/**
		 * 別窓が閉じられたか?
		 * <ol>
		 * <li>ユーザーの[x]クリック操作等
		 * <li>別窓内の script, または他の script
		 * </ol>
		 * @return {boolean}
		 */
		'closed' : function(){
			var pair = X_Pair_get( this );
			
			return pair ? X_Script_try( X_Object_find, [ pair.page, 'closed' ] ) : true;
		},

		/**
		 * 別窓の url を書き換える
		 * @param {string} url
		 * @return {Window} チェーンメソッド
		 */
		'url' : function( url ){
			var pair = X_Pair_get( this );
			
			pair && ( pair.page.location.href = url );
			return this;
		},

		/**
		 * 別窓の内容を書き換える
		 * @param {string=} opt_html html文字列
		 * @return {Window} チェーンメソッド
		 */
		'write' : function( opt_html ){
			var pair = X_Pair_get( this ),
				doc  = pair && X_Script_try( X_Object_find, [ pair.page, 'document' ] );

			if( doc ){
				doc.open();
				doc.write( opt_html || '' ); // TODO 無毒化
				doc.close();
			} else {
				this[ 'asyncDispatch' ]( X_EVENT_ERROR );
			};
			
			return this;
		},

		/**
		 * 別窓の値にアクセスする, X.Object.find 参照
		 * @param {string} selector 'navigator>mineTypes>hoge'
		 * @return {*}
		 */
		'find' : function( selector ){
			var pair = X_Pair_get( this );
			
			if( pair ) return X_Script_try( X_Object_find, [ pair.page, selector ] );
		},
		
		/**
		 * 別窓にfocusする ..firefox で不可 -> [?] a:link とかを作ってfocus する?
		 * @return {Window} チェーンメソッド
		 */
		'focus' : function(){
			var pair = X_Pair_get( this );
			
			pair && pair.page[ 'focus' ]();
			return this;
		}
	}
);

function X_Util_Window_onTimer( e ){
	var pair = X_Pair_get( this );

	if( this[ 'closed' ]() ){
		this[ 'asyncDispatch' ]( X_EVENT_UNLOAD );
		delete pair.timerID;
		return X_CALLBACK_UN_LISTEN;
	};
};

function X_Util_Window_handleEvent( e ){
	var pair = X_Pair_get( this ),
		page = pair && pair.page;

	switch( e.type ){
		case X_EVENT_UNLOAD :
			this[ 'kill' ]();
			break;
		
		case X_EVENT_KILL_INSTANCE :
			if( page && !this[ 'closed' ]() ){
				if( 9 < X_UA.IEHost ){
					page.close();
				} else {
					page.open( 'about:blank', '_self' ).close();
				};
				X_Pair_release( this, page );				
			};
			pair.timerID && X_Timer_remove( pair.timerID );
			X_ViewPort[ 'unlisten' ]( X_EVENT_UNLOAD, this, X_Util_Window_handleEvent );
			break;
	};
};

