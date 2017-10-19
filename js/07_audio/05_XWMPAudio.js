// https://msdn.microsoft.com/ja-jp/library/cc410695.aspx
// Windows Media Player コントロール Version 6.4

// http://www.tohoho-web.com/wwwmmd2.htm

// http://devedge.primedirective.net/viewsource/2003/windows-media-in-netscape/index.html

var X_WMPAudio;

if( X_Plugin_WMP_VERSION ){ // IETester で 6.x は不可
	X_WMPAudio = X_AudioBase[ 'inherits' ](
		'X.WMPAudio',
		X_Class.POOL_OBJECT,
		{
    		xnodeObject     : null,
    		wmp             : null,
    		_wmp            : null,
    		// 0 : no <object>
    		// 1 : loading
    		// 2 : loaded
    		_readyState     : 0,
    		_seekDirection  : 0,
			_timerID        : 0,
			
			'Constructor' : function( dispatcher, source, option ){
				this.dispatcher   = dispatcher || this;
				this._source     = source;
				
				if( 7 <= X_Plugin_WMP_VERSION ){
	    			this.xnodeObject = X_Node_systemNode[ 'create' ]( 'object', {
		    					'classID' : 'CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6',
		    					width     : 1,
		    					height    : 1
	    					})[ 'html' ](
	    						X_UA[ 'IE' ] === 5.5 ? '' : '<param name="uiMode" value="none">'
	    						//+ '<param name="URL" value="' + source + '">'
	    						//+ '<param name="AutoStart" value="' + option.autoplay + '">'
	    					);
				} else {
	    			this.xnodeObject = X_Node_systemNode[ 'create' ]( 'object', {
		    					classID  : 'CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95',
		    					width    : 0,
		    					height   : 0
	    					})[ 'html' ](
	    						X_UA[ 'IE' ] === 5.5 ? '' : '<param name="ShowControls" value="false">'
	    						//+ '<param name="FileName" value="' + source + '">'
	    						//+ '<param name="AutoStart" value="' + option.autoplay + '">'
	    					);
				};
				// TODO embed

				this.setState( option );

				X_ViewPort[ 'listenOnce' ]( X_EVENT_AFTER_UPDATE, this );
				this[ 'listenOnce' ]( X_EVENT_KILL_INSTANCE );
			},
			
			handleEvent : function( e ){
				switch( e.type ){
					case X_EVENT_AFTER_UPDATE :
						this._readyState = 1;
						if( 7 <= X_Plugin_WMP_VERSION ){
							this._wmp          = this.xnodeObject[ '_rawObject' ];
							this._wmp[ 'URL' ] = this._source;
							this.wmp           = this._wmp[ 'controls' ];
						} else {
							this.wmp = this.xnodeObject[ '_rawObject' ];
							this.wmp[ 'FileName' ] = this._source;
						};
						this._timerID = X_Timer_add( 100, 0, this, this._onTimer );
						break;

					case X_EVENT_KILL_INSTANCE :
						this.playing && this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
						this.playing && this.actualPause();
					    this.wmp.stop();
						this.xnodeObject[ 'kill' ]();
						break;
				};
			},
			
			// WMPAudio.play
			actualPlay : function(){
				var begin, offset, end;

				if( this._readyState < 2 ){
					this._playReserved = true;
					return;
				};
				
				end   = X_Audio_getEndTime( this );
				begin = this._beginTime = X_Audio_getStartTime( this, end, true ) | 0;

			    console.log( '[play] ' + begin + ' -> ' + end );
			    
			    if( !this.playing ){
					this.setVolume();
					this.wmp.play();
					
		            this.playing = true;
			    } else {
			    	this._seekDirection = this.getActualCurrentTime() < begin ? 1 : -1;
			    };
			    
				// 1 秒以下は指定できないため四捨五入
				//begin = ( begin / 1000 | 0 ) * 1000 + ( 500 < begin % 1000 ? 1000 : 0 );
			    this.wmp[ 'CurrentPosition' ] = begin / 1000;
				
				if( !this._timerID ) this._timerID = X_Timer_add( 100, 0, this, this._onTimer );
			},
				
				_onTimer : function(){
					var progress, time;
					
					// load 中の場合
					if( this._readyState === 1 ){
						if( 7 <= X_Plugin_WMP_VERSION ){
					    	progress = this._wmp[ 'network' ][ 'downloadProgress' ];
						} else {
					    	progress = this.wmp[ 'BufferingProgress' ];
						};
						if( progress < 100 ){
							this.dispatcher[ 'dispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : progress } );
						} else {
							this._readyState = 2;
							if( 7 <= X_Plugin_WMP_VERSION ){
						    	this.duration = this._wmp[ 'currentMedia' ].duration * 1000 | 0;
							} else {
						    	this.duration = this.wmp[ 'Duration' ] * 1000 | 0;
							};
							this.dispatcher[ 'dispatch' ]( X_EVENT_READY );
						};
					} else
					// ended の判定
		            if( this.playing ){
		            	time = this.getActualCurrentTime();
		            	
		            	// waiting
		            	if( this._seekDirection ){
		            		if( this._seekDirection === 1 ? ( time < this._beginTime ) : ( this._lastCurrentTime <= time ) ){
		            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_SEEKING );
		            			return;
		            		};
		            		delete this._seekDirection;
		            	};
		            	if( time === this._lastCurrentTime ){
	            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_WAITING );
	            			return;
		            	};       	
		            	this._lastCurrentTime = time;
		            	
		            	// ended ではない
		            	if( time - X_Audio_getEndTime( this ) < -50 ){
	            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_PLAYING );
	            			return;
		            	};
		            	
		            	// ended
		            	if( this.autoLoop ){
		            		if( !( this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_BEFORE_LOOP ) & X_CALLBACK_PREVENT_DEFAULT ) ){
		            			this.looped = true;
		            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_LOOPED );
		            			this.actualPlay();
			            	};
		            	} else {
		            		this.actualPause();
		            		this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
		            		delete this._timerID;
							return X_CALLBACK_UN_LISTEN;
		            	};
		            };
				},
			
			// WMPAudio.pause
			actualPause : function(){
				this.playing  = false;
				this._timerID && X_Timer_remove( this._timerID );
				delete this._timerID;
				
			    this.wmp.pause();
			},

			setVolume : function(){
				if( 7 <= X_Plugin_WMP_VERSION ){
			    	this._wmp[ 'settings' ][ 'Volume' ] = this.gain * 100;
				} else {
			    	this.wmp[ 'Volume' ] = ( 1 - this.gain ) * 10000;
				};				
			},

			getActualCurrentTime : function(){
			    return this.wmp[ 'CurrentPosition' ] * 1000 | 0;
			},
			
			afterUpdateState : function( result ){
				if( result & 3 ){ // seek
	            	this.actualPlay();
				} else
				if( result & 4 ){
					this.setVolume();
				};			
			}

		}
	);

	X_Audio_BACKENDS.push( {
		backendID   : 16,
		
		backendName : 'WMP' + X_Plugin_WMP_VERSION,

		canPlay : {
			'mp3'  : true,
			'm4a'  : true,
			'wma'  : true,
			'wav'  : true,
			'mid'  : true,
			'midi' : true,
			'snd'  : true,
			'au'   : true,
			'aif'  : true,
			'aiff' : true,
			'aicf' : true
		},

		detect : function( proxy, ext /* hash */ ){
			proxy[ 'asyncDispatch' ]( { type : X_EVENT_COMPLETE, canPlay : 0 <= 'mp3 m4a wma wav midi snd au aiff aicf'.indexOf( ext ) } );				
		},
		
		klass : X_WMPAudio
		
	} );

};