
X( function(){
	with( X.UI ){
		Page(
			'ホーム',
			'home',
			List(
				[
					{
						label   : 'ぺったんR',
						summary : X.VERSION + ( X.buildTimeStamp ? ' ' + X.buildTimeStamp : '' )
					},
					{ label   : 'ツール' },
					{ label   : 'テスト' , next : 'test' },
					{ label   : '情報' , next : 'info' },
					{ label   : 'ローカルストレージ' },
					{ label   : '外部API接続' }
				],
				AndroidItem()
			)
		).show();

		Page(
			'テスト目次',
			'test',
			List(
				[
					{ label : '戻る', back : true },
					{ label : 'インタラクション・ジェスチャー' },
					{ label : 'Ajax' },
					{ label : 'マルチメディア' }
				],
				AndroidItem()
			)
		);

		Page(
			'情報',
			'info',
			List(
				[
					{ label : '戻る', back : true },
					{ label : 'システムスコア'   , next : 'spec' },
					{ label : 'OS・ブラウザ'     , next : 'ua' },
					{ label : 'プラグインとアドオン', next : 'plugin' },
					{ label : 'ストレージ' },
					{ label : 'HID' },
					{ label : 'pettanR ビルド情報' }
				],
				AndroidItem()
			)
		);

		Page(
			'システムスコア',
			'spec',
			List(
				[
					{ label : '戻る', back : true },
					{
						label   : '起動時間',
						summary : X.bootSpeed + 'ms'
					}
				],
				AndroidItem()
			)
		);

		Page(
			'OS・ブラウザ',
			'ua',
			List(
				[
					{ label : '戻る', back : true },
					{
						label   : 'ブラウザエンジン',
						summary : X.UA.ENGINE + ' ' + ( X.UA.ENGINE_VERSION || '' )
					},
					{
						label   : 'ブランド',
						summary : X.UA.BRAND + ' ' + ( X.UA.BRAND_VERSION || '' )
                    },
					{
						label   : 'プラットフォーム',
						summary : X.UA.PLATFORM + ' ' + ( X.UA.PLATFORM_VERSION || '' )
					},
					{
						label   : 'SVG',
						summary : X.Doc.SVG ? 'o' : '-'
					},
					{
						label   : 'VML',
						summary : X.Doc.VML || '-'
					},
					{
						label   : 'XHR',
						summary :
							X.XHR.XDR ? ( X.XHR.MSXML ? 'W3C+XDR+MSXML' + X.XHR.MSXML : 'W3C+XDR' ) :
							X.XHR.W3C ? ( X.XHR.CORS ? 'W3C Lv2' : 'W3C' ) :
							X.XHR.MSXML ? 'MSXML' + X.XHR.MSXML :
							X.XHR.FLASH ? 'Flash' + X.XHR.FLASH : ''
					},
					{
						label   : 'ユーザーエージェント文字列',
						summary : navigator.userAgent
					},
					{
						label   : 'プラットフォーム',
						summary : 'navigator.platform=' + navigator.platform
					},
					{
						label   : 'アプリ名',
						summary : 'navigator.appName=' + navigator.appName
					},
					{
						label   : 'アプリコード名',
						summary : 'navigator.appCodeName=' + navigator.appCodeName
					},
					{
						label   : 'アプリバージョン',
						summary : 'navigator.appVersion=' + navigator.appVersion
					}
				],
				AndroidItem()
			)
		);

		Page(
			'プラグインとアドオン',
			'plugin',
			List(
				[
					{ label : '戻る', back : true },
					{
						label   : 'Adobe FlashPlayer',
						summary : X.Plugin.Flash || '-'
					},
					{
						label   : 'Silverlight',
						summary : X.Plugin.Silverlight || '-'
					},
					{
						label   : 'Unity Web Player',
						summary : X.Plugin.Unity || '-'
					},
					{
						label   : 'Google Gears',
						summary : X.Plugin.Gears ? 'o' : '-'
					},
					{
						label   : 'Windows Media Player',
						summary : X.Plugin.WMP || '-'
					}
				],
				AndroidItem()
			)
		);
		
	};
} );


var AndroidItem = X.UI.Box.inherits(
	'AndroidItem',
	X.Class.NONE,
	{
		next : '',
		back : false,		
		
		Constructor : function(){
			this.Super( {
				sizing      : 'border',
				bgColor     : 0x34383B,
				borderColor : 0x252527,
				borderStyle : 'solid',
				borderWidth : [ 0, 0, 0.15 ],
				height      : 4,
				left        : 0,
				right       : 0
			} )
			.listen( X.UI.Event.TAP )
			.listen( X.UI.Event.ITEMDATA_CHANGED );
		},

		handleEvent : function( e ){
			var txt;
			
			switch( e.type ){
				case X.UI.Event.ITEMDATA_CHANGED :
					if( e.itemData.summary ){
						this.add( X.UI.Text( e.itemData.label, {
							fontColor   : 0xAAAAAA,
							fontBold    : true,
							top         : 0.7,
							left        : 1
						} ) )
						.add( X.UI.Text( e.itemData.summary, {
							fontColor   : 0x777777,
							fontSize    : 0.8,
							top         : 3.1,
							left        : 1.27
						} ) );
					} else {
						this.add( X.UI.Text( e.itemData.label, {
							fontColor   : 0xAAAAAA,
							fontBold    : true,
							top         : 1.35,
							left        : 1
						} ) );
					};
					
					if( e.itemData.next ){
						this.add( X.UI.Text( String.fromCharCode( 9654 ), {
							fontColor   : 0xAAAAAA,
							fontBold    : true,
							top         : 1.35,
							width       : 1,
							right       : 1
						} ) );
						
						this.next = e.itemData.next;
					} else
					if( e.itemData.back ){
						this.back = true;
					};
					break;
				
				case X.UI.Event.TAP :
					txt = this.getNodeAt( 0 );
					txt.content( txt.content() + '+' );
					
					if( this.next ){
						X.UI.Page.move( this.next );
					} else
					if( this.back ){
						X.UI.Page.back();
					};
					
			};
		}	
	}	
);



