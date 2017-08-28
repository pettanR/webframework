//{+netimage"画像の読み込み監視"(Imageの読み込みを監視し画像表示のコントロールを行う)[+net,+utilimage]
/* 
 * original
 *  LICENSE: MIT?
 *  URL: http://d.hatena.ne.jp/uupaa/20080413/1208067631
 *  AUTHOR: uupaa.js@gmail.com
 * 
 */
var X_ImgLoader_image     = window[ 'Image' ] && new Image(), // ここで無用なアクセスをIEがしているかも
	// IE では厳密には HTMLImageElement ではなく、appendChild してもサイズが取れず、removeChild に失敗する
	X_ImgLoader_isElement = !( X_UA[ 'IE' ] < 9 ) && X_Type_isHTMLElement( X_ImgLoader_image ),
	// http://uupaa.hatenablog.com/entry/2013/12/17/171809
	// お手軽に画像の読み込みをハンドリングする、今どきな方法
	X_ImgLoader_0forError = !X_UA[ 'IE' ] || X_UA[ 'IE' ] === 11 || X_UA[ 'IEHost' ] === 11;

/*
 * TODO
 * new Image() のときに Image オブジェクトを作るもの(IE8-)と、HTMLImageElement を作るものがある。
 * Image は、X.EventDispatcher で、<img> は X.Node で。 
 */

X_TEMP.X_ImgLoader_init = function(){
	X_ImgLoader = X_Class_override(
		X_ImgLoader_isElement ? Node( X_ImgLoader_image ) : X_EventDispatcher( X_ImgLoader_image ),
		X_TEMP.X_ImgLoader_params
	);
	
	X_ImgLoader[ 'listen' ]( [ 'load', 'error' /*, 'abort'*/ ], X_ImgLoader_handleEvent );
	
	delete X_TEMP.X_ImgLoader_init;
	delete X_TEMP.X_ImgLoader_params;
	
	return X_ImgLoader;
};

X_TEMP.X_ImgLoader_params = {
		tick       : 0,
		timerID    : 0,
		finish     : false,
		abspath    : '',
		delay      : 0,
		timeout    : 0,
		
		load : function( data ){
			this.abspath = X_URL_toAbsolutePath( data[ 'url' ] );
			this.delay   = data[ 'delay'   ] || 100;
			this.timeout = data[ 'timeout' ] || 5000;

			this[ '_rawObject' ].src = this.abspath;

			if( X_UA[ 'Opera7' ] && this[ '_rawObject' ].complete ){
				this[ 'asyncDispatch' ]( 'load' );
			} else {
				this.timerID = X_Timer_add( this.delay, 0, this, X_ImgLoader_detect );
			};
		},
		
		cancel : function(){
			var raw = this[ '_rawObject' ];
			// abort がある?
			raw && raw.abort && raw.abort();
			// this[ '_rawObject' ].src = '';
			this.finish = true;
		},
		
		reset : function(){
			//console.log( '/ X.Net.Image:reset ' + this.abspath + ' timerID:' + this.timerID );
			
			this.timerID && X_Timer_remove( this.timerID );
			this.timerID = this.tick = 0;
			
			this.finish  = false;
			this.abspath = '';			
			//X_ImgLoader_isElement ? this[ '_rawObject' ].removeAttribute( 'src' ) : ( this[ '_rawObject' ].src = '' );
			this[ '_rawObject' ].src = '';
			
			//console.log( '\ X.Net.Image:reset ----------- *' );
		}
	};

function X_ImgLoader_detect(){
	var raw = this[ '_rawObject' ];
	
	if( this.finish ) return;
	
	if( raw && raw.complete ){
		this.finish = true;
		//console.log( 'X.Net.Image:detect ' + raw.width );
		if( raw.width ) return;
		X_Timer_remove( this.timerID );
		//console.log( '* X.Net.Image:ERROR @detect(1) ' + this.abspath );
		this.timerID = this[ 'asyncDispatch' ]( X_EVENT_ERROR );
	} else
	if( this.timeout < ( this.tick += this.delay ) ){
		this.finish = true;
		X_Timer_remove( this.timerID );
		//console.log( '* X.Net.Image:ERROR @detect(2) ' + this.abspath );
		this.timerID = this[ 'asyncDispatch' ]( { type : X_EVENT_ERROR, 'timeout' : true } );
	};
};

function X_ImgLoader_handleEvent( e ){
	var raw = this[ '_rawObject' ], size;
	
	// IE11 reset() 時にここに入ってくる...
	if( !this.abspath ) return;
	//console.log( 'X.Net.Image:handleEvent ' + e.type );
	
	switch( e.type ){
		case 'error' :
			// ie11(10,9 開発モード)で mineType 不正の場合、画像取得に成功してもエラーイベントが起こるのを無視する。
			if( X_ImgLoader_0forError && raw.width ) return;
			if( this.finish ) return;
			this.finish = true;
			this.timerID && X_Timer_remove( this.timerID );
			//console.log( '* X.Net.Image:ERROR @handle ' + this.abspath + X.Timer.now() );
			//console.dir( raw );
			this.timerID = this[ 'asyncDispatch' ]( this.timeout, X_EVENT_ERROR );
			break;

		case 'load' :
		// if( finish === true ) return; // これがあると firefox3.6 で駄目、、、
		// if( timer ) return; // これがあると safari3.2 で駄目、、、
			this.finish = true;
			this.timerID && X_Timer_remove( this.timerID );
			if( X_UA[ 'Opera' ] && !raw.complete ){
				this.timerID = this[ 'asyncDispatch' ]( X_EVENT_ERROR );
				return;
			};

			//console.log( '* X.Net.Image:LOAD @handle ' + this.abspath + X.Timer.now() );
			//console.dir( raw );
			
			size = X_Util_Image_getActualDimension( !X_ImgLoader_isElement ? this.abspath : this );
			this.timerID = this[ 'asyncDispatch' ]( {
				'type' : X_EVENT_SUCCESS,
				'src'  : this.abspath,
				'w'    : size[ 0 ],
				'h'    : size[ 1 ]
				// TODO feedback net speed
				// time , this[ '_rawObject' ].fileSize
			} );
			break;
	};
};


// X_ImgLoader_isElement && X_ImgLoader[ 'appendAt' ]( X_Node_systemNode );
