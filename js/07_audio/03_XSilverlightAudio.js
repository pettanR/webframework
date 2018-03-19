
/*
 * original : uupaa-js SilverlightAudio.js
 * https://code.google.com/p/uupaa-js/source/browse/trunk/0.8/src/Audio/SilverlightAudio.js?r=568
 *
 * Silverlight 4 → 5における不具合の状況
 * http://www.slideshare.net/wakabayashiy/silverlight-4-5 
 * 
 * IE10以降でSilverlightでF5押したらフリーズする不具合と対処
 * http://katsuyuzu.hatenablog.jp/entry/2014/01/11/003550
 * 
 * SilverlLight5 ie6&7(ietester,winxp), ie8(winxp) で動作確認。firefox32 では動作しない。(4以下の方がよい？)
 */

var X_SLAudio,
	X_SLAudio_uid = 0;

if( X_Plugin_SILVER_LIGHT_VERSION ){
	
	X_TEMP.slaudioInit = function(){
		//
		// http://blog.yuhiisk.com/archive/2014/12/20/dynamic-loading-and-complete-processing-of-script.html
		var s;
		
		if( X_UA[ 'IE' ] < 9 ){
			s = document.createElement( '<script id="silverlightaudio" type="text/xaml"></script>' );
		} else {
			s = document.createElement( 'script' );
			s.id   = 'silverlightaudio';
			s.type = 'text/xaml';
		};
		
		X_elmHead.appendChild( s );
		s.text = '<Canvas xmlns="http://schemas.microsoft.com/client/2007" xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"></Canvas>';
		
		delete X_TEMP.slaudioInit;
	};
	
	// X.Node.inherits はできない。_rawObject は <object> でなく silverlight
	X_SLAudio = X_AudioBase[ 'inherits' ](
		'X.SilverlightAudio',
		X_Class.POOL_OBJECT,
		{
			'_rawType'      : X_EventDispatcher_EVENT_TARGET_SILVER_LIGHT,

    		_onload         : '',
    		_callback       : null,    		
    		xnodeObject     : null,
			_source         : '',
			_ended          : true,
			_paused         : false,
			_lastUserAction : '',
			_lastState      : '',
			_interval       : 0, // setInterval timer id
			
			'Constructor' : function( dispatcher, source, option ){
				!X_SLAudio_uid && X_TEMP.slaudioInit();
				
				/*
				 * ［Silverlight 2］JavaScriptコードからSilverlightのオブジェクトを利用するには？［C#、VB］
				 * http://www.atmarkit.co.jp/fdotnet/dotnettips/902slobjcallfromjs/slobjcallfromjs.html
				 * このページのサンプルは sl5+firefox32 環境で動いている。xaml を js から利用する形ではなく、.xap を sl4 以下で作るのがよさそう.
				 */
				this.dispatcher   = dispatcher || this;
				this._source     = source;
				// X.Audio._slOnload_ は不可
    			this._onload     = 'XAudioSilverlightOnLoad' + ( ++X_SLAudio_uid );
				this._callback   = window[ this._onload ] = X_Closure_create( this, this.onSLReady );
				
				// TODO embed
    			this.xnodeObject = X_Node_body
    				[ 'create' ]( 'object', {
	    					type   : 'application/x-silverlight-2',
	    					data   : 'data:application/x-silverlight-2,',
	    					width  : 1,
	    					height : 1
    					})
		    			[ 'html' ](
				            '<param name="background" value="#00000000">' +      // transparent
				            '<param name="windowless" value="true">' +
				            '<param name="source" value="#silverlightaudio">' +  // XAML ID
				            '<param name="onload" value="' + this._onload + '">' // + // bond to global
				            //'<param value="2.0.31005.0" name="minRuntimeVersion">' +
				            //'<param value="true" name="autoUpgrade">' +
				            //'<param name="onerror" value="slerror">' // bond to global
		    			);
				this.setState( option );
	
				this[ 'listenOnce' ]( X_EVENT_KILL_INSTANCE );
			},
			
				onSLReady : function( sender ){
					if( !this._onload ) return;
					
					window[ this._onload ] = null;
					delete this._onload;
					X_Closure_correct( this._callback );
					delete this._callback;
	
					sender[ 'children' ][ 'add' ](
						sender[ 'GetHost' ]()[ 'content' ][ 'CreateFromXaml' ](
						'<Canvas xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">' +
							'<MediaElement x:Name="media" Source="' + this._source + '" Volume="' + this.gain + '" AutoPlay="false" />' +
						'</Canvas>'));
			
					this[ '_rawObject' ] = sender[ 'findName' ]( 'media' ); // x:Name='media'
	
					this[ 'listen' ]( [ 'MediaFailed', 'MediaOpened', 'MediaEnded', 'CurrentStateChanged' ] );
				},
			
			handleEvent : function( e ){
				var lastState, currentState;
				
				console.log( e.type );
				switch( e.type ){
					
					case 'MediaFailed' :
						this.error   = 4;
						this.playing = false;
						this._ended  = true;
						this._paused = false;
						if( this.playing ){
							//X_Timer_once( 16, this, this.actualPlay );
						} else {
							this.dispatcher[ 'dispatch' ]( X_EVENT_ERROR ); // open failed
							this[ 'kill' ]();							
						};
						break;

					case 'MediaOpened' :
						// http://msdn.microsoft.com/ja-jp/library/bb979710(VS.95).aspx
						this.duration = this[ '_rawObject' ][ 'NaturalDuration' ][ 'Seconds' ] * 1000;
		                this.dispatcher[ 'asyncDispatch' ]( X_EVENT_READY );
						break;

					case 'MediaEnded' :
						//console.log( ' > ' +  this.autoLoop + ' error:' + this.error );
						//this.autoLoop && /* this.playing && */ this.actualPlay();
						this._ended   = true;
						break;

					case 'CurrentStateChanged' :
						lastState	 = this._lastState,
						currentState = this[ '_rawObject' ][ 'CurrentState' ];
				
						// ignore consecutive events or 'Closed' == 'Error'
						if( lastState === currentState
							|| ( (lastState === 'Closed' || lastState === 'Error') && ( currentState === 'Closed' || currentState === 'Error') ) ){
							return;
						};
						this._lastState = currentState; // update last state
				
						console.log( ' > ' + currentState + ' - ' + this._lastUserAction );
				
						switch( currentState ){
							case 'Buffering' :
							case 'Opening' :
								switch( this._lastUserAction ){
									case 'play' :
										this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_WAITING );
										break;
									case 'seek' :
										this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_SEEKING );
										break;
									case 'pause' :
										break;
								};
								break;

							// media.play(none supported file) -> 'Error'
							// media.play(file not found)	  -> 'Closed'
							// media.load -> 'Error'
							case 'Error':
								this.error   = 4;
							case 'Closed':
								this.error   = this.error || 2;
								this.playing = false;
								this._ended  = true;
								this._paused = false;
								this.dispatcher[ 'dispatch' ]( X_EVENT_ERROR );
								this[ 'kill' ]();
								break;

							// userAction.pause()		   -> MediaState('Paused') -> x
							// userAction.stop()			-> MediaState('Paused') -> x
							// userAction.play() + file end -> MediaState('Paused') -> uueventfire('ended')
							case 'Paused':
							
								this.playing && X_Timer_once( 16, this, this.actualPlay );
								//this.playing = false;
								
								switch( this._lastUserAction ){
									case 'play': // play() -> file end -> event('ended')
									case 'seek':
										//this.seekTime = 0;
										this._ended  = true;
										this._paused = false;
										//this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
										//this.setCurrentTime( this.startTime );
										break;
									case 'pause':
										this._ended  = false;
										this._paused = true;
										break;
									case 'stop':
										this._ended  = true;
										this._paused = false;
								};
								break;

							// media.play -> 'Playing'
							case 'Playing':
								this.error   = 0;
								//this.playing = true;
								this._ended  = false;
								this._paused = false;
								this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_PLAYING );
								break;

							// stop()
							case 'Stopped':
								this.playing && X_Timer_once( 16, this, this.actualPlay );
								
								//this.playing = false;
								//this._ended  = true;
								//this._paused = false;
								//this.setCurrentTime( this.startTime );
								break;
						};
						break;

					case X_EVENT_KILL_INSTANCE :
						this.playing && this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
						this.playing && this.actualPause();
					
						if( this._onload ){
							// window への delete に ie5 は対応しないが、そもそも ie5 は Silverlight に非対応
							window[ this._onload ] = null;
							delete this._onload;
							X_Closure_correct( this._callback );
						};
						this.xnodeObject[ 'kill' ]();
						break;
				};
			},
			
			// SilverlightAudio.play
			actualPlay : function(){
				var begin, offset, end;

				// もし kill 後に autoplayTimer で呼ばれても、_closed==true なので平気
				if( this.error ) return;
				if( !this.duration ){
					this._playReserved = true;
					return;
				};
				
				this._lastUserAction = 0 <= this.seekTime ? 'seek' : 'play';
				
				end   = X_Audio_getEndTime( this );
				begin = X_Audio_getStartTime( this, end, true ) | 0;

				// 1 秒以下は指定できないため四捨五入
				begin = ( begin / 1000 | 0 ) * 1000 + ( 500 < begin % 1000 ? 1000 : 0 ); 

			    this[ '_rawObject' ][ 'Volume' ] = this.gain;
			    
			    this.setCurrentTime( this._beginTime = begin );
			    
			    console.log( '[play] ' + begin + ' -> ' + end );
			    
			    /*
			    if( offset = begin - this.getActualCurrentTime() ){
			    	this.setCurrentTime( begin + offset );
			    	console.log( ' [差補正] ' + offset + ' ct:' + this.getActualCurrentTime() + ' begin:' + begin  );
			    	this._beginTime = begin = this.getActualCurrentTime();
			    };*/
			    
			    if( !this.playing || this._ended ){
			    	console.log( '[play] play()' + begin + ' -> ' + end );
				    this[ '_rawObject' ].play();
		            this.playing = true;
		            this._ended  = false;
			    };
	            
	            this._timerID && X_Timer_remove( this._timerID );
	            
                this._timerID = X_Timer_once( end - begin, this, this._onEnded );
                
				if( !this._interval ){
					this._interval = X_Timer_add( 1000, 0, this, this._onInterval );
				};
			},
				
				_onInterval : function(){
					if( !this.playing ){
						delete this._interval;
						return X_CALLBACK_UN_LISTEN;
					};
					this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_PLAYING );
				},
				
				_onEnded : function(){
					var time, end;
					delete this._timerID;
					
		            if( this.playing ){
		            	//console.log( '> end ' + X_Audio_getEndTime( this ) + ' current:' + ( this.getActualCurrentTime() ) );
		            	time = this.getActualCurrentTime();
		            	
		            	if( time < this._beginTime ){
		            		console.log( '== waiting ' + time + ' < begin:' + this._beginTime );
		            		this.setCurrentTime( this._beginTime );
		            		time = this.getActualCurrentTime();
		            		console.log( '    > ' + time );
		            		this._ended && this[ '_rawObject' ].play();
		            		this._ended = false;
		            		this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_WAITING );
		            		this._timerID = X_Timer_once( X_Audio_getEndTime( this ) - time, this, this._onEnded );
		            		return;
		            	};
		            	
		            	time -= X_Audio_getEndTime( this );
		            	if( time < -50 ){
	            			console.log( ' > まだ終わらない ' + time );
	            			this._ended && this[ '_rawObject' ].play();
	            			this._ended = false;
	            			this._timerID = X_Timer_once( -time, this, this._onEnded );
	            			return;
		            	};
		            	
		            	if( this.autoLoop ){
		            		console.log( '========= loop?' );
		            		if( !( this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_BEFORE_LOOP ) & X_CALLBACK_PREVENT_DEFAULT ) ){
		            			console.log( '========== loopした' );
		            			this.looped = true;
		            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_LOOPED );
		            			this.actualPlay();
			            	};
		            	} else {
		            		console.log( '========= pause' );
		            		this.actualPause();
		            		this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
		            	};
		            };
				},
			
			// SilverlightAudio.pause
			actualPause : function(){
				if( this.error ) return;
				
				this._lastUserAction = 'pause';
				this.playing  = false;
				this._paused  = true;
				this._ended   = false;
				
				this[ '_rawObject' ].pause();
			},

			getActualCurrentTime : function(){
				return this[ '_rawObject' ][ 'Position' ][ 'Seconds' ] * 1000 | 0;
			},
			
			afterUpdateState : function( result ){
				var end, halfway;
				
				if( result & 3 ){ // seek
	            	this.actualPlay();
				} else
				if( result & 1 ){
					end     = X_Audio_getEndTime( this );
					halfway = end < this.duration;
					this._timerID && X_Timer_remove( this._timerID );
					
					if( halfway ){
						this._timerID = X_Timer_once( end - this.getActualCurrentTime(), this, this._onEnded );
					} else {
						delete this._timerID;
					};
				} else
				if( result & 4 ){
	               this[ '_rawObject' ][ 'Volume' ] = this.gain;
				};			
			},
			
				// SilverlightAudio.currentTime
				setCurrentTime : function( time ){ // @param Number: time
					var position = this[ '_rawObject' ][ 'Position' ]; // [!] create instance
	
					position[ 'Seconds' ] = time / 1000 | 0; // set current time
				
					this[ '_rawObject' ][ 'Position' ] = position; // [!] reattach instance
				}

		}
	);

	/*
	function slerror(){
		alert( 'slerror' );
	}; */

	X_Audio_BACKENDS.push( {
		backendID   : 8,
		
		backendName : 'Silverlight',

		canPlay : {
			'mp3' : true,
			'm4a' : true,
			'wma' : true,
			'wav' : true
		},

		detect : function( proxy, ext, hash ){
			proxy[ 'asyncDispatch' ]( { type : X_EVENT_COMPLETE, canPlay : ext === 'mp3' || ext === 'm4a' || ext === 'wma' || ext === 'wav' } );				
		},
		
		klass : X_SLAudio
		
	} );

};