var X_Audio_constructor = 525 <= X_UA.WebKit && X_UA.WebKit < 528 ? // 3.1 <= Safari < 4
								function( s, a ){
									a = document.createElement( 'audio' );
									a.src = s;
									a.load();
									return a;
								} :
						// Android1.6 + MobileOpera12 HTMLAudio はいるが呼ぶとクラッシュする
						  !( X_UA.Android < 2 ) ?
								window[ 'Audio' ] || window.HTMLAudioElement : null,
	
	// Blink5 Opera32 Win8 は HTMLAudio が壊れている、WebAudio は mp3 がデコードに失敗、ogg が動作 -> mp3 に問題がある可能性…
	X_Audio_blinkOperaFix = X_UA.Opera && X_UA.Chromium && ( X_UA.Win32 || X_UA.Win64 ),

	X_Audio_codecs;

// WebAudioAPIを使っているはずなのに、マナーモードで音が出る！？
// http://qiita.com/gonshi_com/items/e41dbb80f5eb4c176108
// HTML Audio、もしくはHTML Videoをページ内で1つでも使用していた場合、そのページでは WebAudioAPI の音がマナーモード時にも鳴ってしまう

if( X_Audio_constructor ){
	//http://himaxoff.blog111.fc2.com/blog-entry-97.html
	//引数なしで new Audio() とすると、Operaでエラーになるそうなので注意。
	X_TEMP.rawAudio = new X_Audio_constructor( '' );
	
	// https://html5experts.jp/miyuki-baba/3766/
	// TODO Chrome for Android31 で HE-AAC が低速再生されるバグ
	// TODO Android4 標準ブラウザで ogg のシークが正しくない！
	if( X_TEMP.rawAudio.canPlayType ){
		X_Audio_codecs = {
		  'mp3'  : X_TEMP.rawAudio.canPlayType('audio/mpeg'),
		  'opus' : X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="opus"'),
		  'ogg'  : X_TEMP.rawAudio.canPlayType('audio/ogg; codecs="vorbis"'),
		  'wav'  : X_TEMP.rawAudio.canPlayType('audio/wav; codecs="1"'),
		  'aac'  : X_TEMP.rawAudio.canPlayType('audio/aac'),
		  'm4a'  : X_TEMP.rawAudio.canPlayType('audio/x-m4a') + X_TEMP.rawAudio.canPlayType('audio/m4a') + X_TEMP.rawAudio.canPlayType('audio/aac'),
		  'mp4'  : X_TEMP.rawAudio.canPlayType('audio/x-mp4') + X_TEMP.rawAudio.canPlayType('audio/mp4') + X_TEMP.rawAudio.canPlayType('audio/aac'),
		  'weba' : X_TEMP.rawAudio.canPlayType('audio/webm; codecs="vorbis"')
		};
		(function( X_Audio_codecs, k, v ){
			for( k in X_Audio_codecs ){
				//if( X_EMPTY_OBJECT[ k ] ) continue;
				v = X_Audio_codecs[ k ];
				v = v && !!( v.split( 'no' ).join( '' ) );
				if( v ){
					console.log( k + ' ' + X_Audio_codecs[ k ] );
					X_Audio_codecs[ k ] = true;
				} else {
					delete X_Audio_codecs[ k ];
				};
			};
			if( X_Audio_blinkOperaFix ) delete X_Audio_codecs[ 'mp3' ];
		})( X_Audio_codecs );
	} else {
		// iOS3.2.3
		X_Audio_codecs = {
		  'mp3'  : ( X_UA.Trident || X_UA.TridentMobile ) || ( X_UA.Chromium || X_UA.ChromiumMobile ) || ( ( X_UA.Win32 || X_UA.Win64 ) && X_UA.WebKit  ),
		  'ogg'  : 5 <= ( X_UA.Gecko || X_UA.Fennec ) || ( X_UA.Chromium || X_UA.ChromiumMobile ) || ( X_UA.Presto || X_UA.PrestoMobile ),
		  'wav'  : ( X_UA.Gecko || X_UA.Fennec ) || ( X_UA.Presto || X_UA.PrestoMobile ) || ( ( X_UA.Win32 || X_UA.Win64 ) && X_UA.WebKit  ),
		  'aac'  : ( X_UA.Trident || X_UA.TridentMobile ) || X_UA.WebKit,
		  'm4a'  : ( X_UA.Trident || X_UA.TridentMobile ) || X_UA.WebKit,
		  'mp4'  : ( X_UA.Trident || X_UA.TridentMobile ) || X_UA.WebKit,
		  'weba' : 2 <= ( X_UA.Gecko || X_UA.Fennec ) || 10.6 <= ( X_UA.Presto || X_UA.PrestoMobile ) // firefox4+(Gecko2+)
		};
		(function( X_Audio_codecs, k ){
			for( k in X_Audio_codecs ){
				//if( X_EMPTY_OBJECT[ k ] ) continue;
				if( X_Audio_codecs[ k ] ){
					console.log( k + ' ' + X_Audio_codecs[ k ] );
					X_Audio_codecs[ k ] = true;
				} else {
					delete X_Audio_codecs[ k ];
				};
			};
		})( X_Audio_codecs );
	};
	
	if( X_Audio_blinkOperaFix ){
		X_Audio_constructor = null;
		delete X_TEMP.rawAudio;
	};
};


var X_WebAudio_Context      = (
                                  !( X_UA.SafariMobile || X_UA.iOSWebView ) ||     // iOSではない、または
                                  (
                                      ( !X_UA.iPhone || 6 <= X_UA.iPhone.min ) &&  // iPhone 4s 以下ではない
                                      ( !X_UA.iPad   || 3 <= X_UA.iPad.min   ) &&  // iPad 2G または iPad mini 1G 以下ではない
                                      ( !X_UA.iPod   || 5 <= X_UA.iPod.min   )     // iPod touch 4G 以下ではない                                        
                                  )
                              ) &&
								// Android2 + Gecko で WebAudio が極めて不安定
								!( X_UA.Fennec && !( 4 <= X_UA.Android ) ) &&
								// AOSP でも WebAudio を不完全に実装するものがある, touch の有無も不明のため一律に切ってしまう
								!X_UA.AOSP && !( X_UA.ChromeWebView < 5 ) &&
								( window[ 'AudioContext' ] || window[ 'webkitAudioContext' ] || window[ 'mozAudioContext' ] ),		
	X_WebAudio_context,
	X_WebAudio_BUFFER_LIST  = [],
	X_WebAudio_need1stTouch	= ( X_UA.SafariMobile || X_UA.iOSWebView ),
	X_WebAudio_isNoTouch    = X_WebAudio_need1stTouch,
	X_WebAudio_needRateFix  = X_WebAudio_need1stTouch,
	X_WebAudio,
	X_WebAudio_BufferLoader,
	X_WebAudio_fpsFix;

/*
 * iPhone 4s 以下、iPad2以下、iPad mini 1以下, iPod touch 4G 以下は不可
 */
if( X_WebAudio_Context ){
	
	X_WebAudio_context = new X_WebAudio_Context;
	
	// http://lilting.ch/3323.html
	// 【間に合わせ】iOS9系でのWebAudioの音割れ対処について
	/*
	if( X_WebAudio_needRateFix ){
		X_WebAudio_context.close();
		X_WebAudio_context = new X_WebAudio_Context;
	}; */

	/*
	 * TODO X_TEMP へ
	 * http://qiita.com/simiraaaa/items/79a9ac972cc76fb58d93
	 * [WebAudio API] iOS9で音が歪む、遅い、低い、割れる等の回避方法
	 */
	if( X_WebAudio_needRateFix ){
		X_TEMP.webAudioSampleRateFix = function( sampleRate ){
		    X_TEMP.webAudioDummyPlay( sampleRate );

			if( true || X_WebAudio_context[ 'sampleRate' ] !== sampleRate ){
				// alert( '[debug]iOSで音割れを検知、修復コードを実施 ctxSR:' + X_WebAudio_context[ 'sampleRate' ] + ' abfSR:' + sampleRate );
				
				X_WebAudio_context.close && X_WebAudio_context.close();
				X_WebAudio_context = new X_WebAudio_Context;
				
				X_TEMP.webAudioDummyPlay( sampleRate );
			};
			
			delete X_TEMP.webAudioSampleRateFix;
			delete X_TEMP.webAudioDummyPlay;
		};
		X_TEMP.webAudioDummyPlay = function( sampleRate, source ){
		    source = X_WebAudio_context[ 'createBufferSource' ]();
		    source.buffer = X_WebAudio_context[ 'createBuffer' ]( 1, 1, sampleRate );
		    source[ 'connect' ]( X_WebAudio_context[ 'destination' ] );
		    source.start ? source.start( 0 ) : source[ 'noteOn' ] ? source[ 'noteOn' ]( 0 ) : source[ 'noteGrainOn' ]( 0 );
		};
	};
	
	X_WebAudio_BufferLoader = X_EventDispatcher[ 'inherits' ](
		'X.WebAudio.BufferLoader',
		X_Class.POOL_OBJECT,
		{
			audioUrl        : '',
            xhr             : null,
            onDecodeSuccess : null,
            onDecodeError   : null,
            
            audioBuffer     : null,
            errorState      : 0,
            webAudioList    : null,
            
			'Constructor' : function( webAudio, url ){
				this.webAudioList = [ webAudio ];
				this.audioUrl     = url;
				this.xhr = X[ 'Net' ]( { 'xhr' : url, 'dataType' : 'arraybuffer' } )
									[ 'listen' ]( X_EVENT_PROGRESS, this )
									[ 'listenOnce' ]( [ X_EVENT_SUCCESS, X_EVENT_COMPLETE ], this );
				X_WebAudio_BUFFER_LIST.push( this );
			},
			
			handleEvent : function( e ){
				var i, l;
				
				switch( e.type ){
					case X_EVENT_PROGRESS :
						for( i = 0, l = this.webAudioList.length; i < l; ++i ){
							this.webAudioList[ i ][ 'dispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : e[ 'percent' ] } );
						};
						return;
					
					case X_EVENT_SUCCESS :
					// TODO 旧api
					// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Porting_webkitAudioContext_code_to_standards_based_AudioContext
					
					// http://qiita.com/sou/items/5688d4e7d3a37b4e2ff1
					// iOS 7.1 で decodeAudioData に処理が入った瞬間にスクリーンを長押しする（スクロールを繰り返す）と
					// decoeAudioData の処理がキャンセルされることがある（エラーやコールバックの発火もなく、ただ処理が消滅する）。
					// ただし iOS 8.1.2 では エラーになる
						if( ( X_UA.SafariMobile || X_UA.iOSWebView ) < 8 || !X_WebAudio_context[ 'decodeAudioData' ] ){
							this._onDecodeSuccess( X_WebAudio_context[ 'createBuffer' ]( e.response, false ) );
						} else
						if( X_WebAudio_context[ 'decodeAudioData' ] ){
							X_WebAudio_context[ 'decodeAudioData' ]( e.response,
								this.onDecodeSuccess = X_Closure_create( this, this._onDecodeSuccess ),
								this.onDecodeError   = X_Closure_create( this, this._onDecodeError ) );
						};
						break;

					case X_EVENT_COMPLETE :
						this.errorState = 1;				
						this[ 'asyncDispatch' ]( X_EVENT_COMPLETE );
						break;
				};
				this.xhr[ 'unlisten' ]( [ X_EVENT_PROGRESS, X_EVENT_SUCCESS, X_EVENT_COMPLETE ], this );
				delete this.xhr;
			},
			
				_onDecodeSuccess : function( buffer ){
					this.onDecodeSuccess && this._onDecodeComplete();
					
	                if( !buffer ){
	                	this.errorState = 2;
	                    this[ 'asyncDispatch' ]( X_EVENT_COMPLETE );
	                    return;
	                };
	                
	                console.log( 'WebAudio decode success!' );
	
	                this.audioBuffer = buffer;

					this[ 'asyncDispatch' ]( X_EVENT_COMPLETE );

	                console.log( 'WebAudio decoded!' );
				},
				
				_onDecodeError : function(){
					console.log( 'WebAudio decode error!' );
					this._onDecodeComplete();
					this.errorState = 2;
					this[ 'asyncDispatch' ]( X_EVENT_COMPLETE );
				},
				
				_onDecodeComplete : function(){
					X_Closure_correct( this.onDecodeSuccess );
					delete this.onDecodeSuccess;
					X_Closure_correct( this.onDecodeError );
					delete this.onDecodeError;
				},
			
			unregister : function( webAudio ){
				var list = this.webAudioList,
					i    = list.indexOf( webAudio );

				if( 0 < i ){
					list.splice( i, 1 );
					if( !list.length ){
						this.xhr && this.xhr[ 'kill' ]();
						this[ 'kill' ]();
					};
				};
			}
			
		}
	);

	X_WebAudio = X_AudioBase[ 'inherits' ](
		'X.WebAudio',
		X_Class.POOL_OBJECT,
		{
			
			loader          : null,
						
			_startPos       : 0,
			_endPosition    : 0,
			_startTime      : 0,
            //_timerID        : 0,
            _interval       : 0,
          	audioBuffer     : null,
          	bufferSource    : null,
            gainNode        : null,
            
            bufferPlay      : '',
            bufferStop      : '',
            //_onended        : null,
            
			'Constructor' : function( dispatcher, url, option ){				
				var i = 0,
					l = X_WebAudio_BUFFER_LIST.length,
					loader;

				/*
				 * http://qiita.com/sou/items/5688d4e7d3a37b4e2ff1
				 * L-01F 等の一部端末で Web Audio API の再生結果に特定条件下でノイズが混ざることがある。
				 * 描画レート（描画 FPS）が下がるとノイズが混ざり始め、レートを上げると再生結果が正常になるというもので、オーディオ処理が描画スレッドに巻き込まれているような動作を見せる。
				 */
				if( X_UA.Android && ( X_UA.ChromiumMobile || X_UA.ChromeWebView ) && !X_WebAudio_fpsFix ){
					X_Node_systemNode.create( 'div', { id : 'fps-slowdown-make-sound-noisy' } );
					X_WebAudio_fpsFix = true;
				};

				for( ; i < l; ++i ){
					loader = X_WebAudio_BUFFER_LIST[ i ];
					if( loader.audioUrl === url ){
						this.loader = loader;
						loader.webAudioList.push( this );
						break;
					};
				};
				
				if( !this.loader ){
					this.loader = loader = X_WebAudio_BufferLoader( this, url );
				};
				
				this.dispatcher = dispatcher || this;
				this.setState( option );
				
				this[ 'listenOnce' ]( X_EVENT_KILL_INSTANCE, this.onKill );
				
				if( loader.audioBuffer || loader.errorState ){
					this._onLoadBufferComplete();
				} else {
					loader[ 'listenOnce' ]( X_EVENT_COMPLETE, this, this._onLoadBufferComplete );
				};
				
				if( X_WebAudio_isNoTouch ){
					X_TEMP.xWebAudioInstances = X_TEMP.xWebAudioInstances || [];
					X_TEMP.xWebAudioInstances.push( this );
				};
			},
			
			onKill : function(){
				this.loader[ 'unlisten' ]( X_EVENT_COMPLETE, this, this._onLoadBufferComplete )
					.unregister( this );

				delete this.audioBuffer;
				
				this.playing      && this.actualPause();
	            this.bufferSource && this._sourceDispose();
	
	            //this._onended     && X_Closure_correct( this._onended );	
	
	            this.gainNode     && this.gainNode.disconnect();
	            
				if( X_WebAudio_isNoTouch ){
					X_TEMP.xWebAudioInstances.splice( X_TEMP.xWebAudioInstances.indexOf( this ), 1 );
				};
			},
				_onLoadBufferComplete : function( e ){
					var loader = this.loader,
						buffer = loader.audioBuffer;
					
					e && loader[ 'unlisten' ]( X_EVENT_COMPLETE, this, this._onLoadBufferComplete );
					
	                if ( !buffer ) {
	                	this.error = loader.errorState;
	                    this.dispatcher[ 'dispatch' ]({
								type    : X_EVENT_ERROR,
								error   : loader.errorState,
								message : loader.errorState === 1 ?
											'load buffer network error' :
											'buffer decode error'
							});
						this[ 'kill' ]();
	                    return;
	                };
	
	                this.audioBuffer = buffer;
	                this.duration    = buffer.duration * 1000;

					this.dispatcher[ 'asyncDispatch' ]( X_WebAudio_isNoTouch ? X_EVENT_MEDIA_WAIT_FOR_TOUCH : X_EVENT_READY );
				},
			
			actualPlay : function(){
				var xWebAudio, begin, end;
				
				console.log( '[WebAudio] play abuf:' + !!this.audioBuffer );
				
	            if( !this.audioBuffer ){
	            	this._playReserved = true;
	            	return;
	            };

				if( X_WebAudio_isNoTouch ){
					//@dev{
					var e = X_EventDispatcher_CURRENT_EVENTS[ X_EventDispatcher_CURRENT_EVENTS.length - 1 ];
					if( !e || !e[ 'pointerType' ] ){
						// alert( 'タッチイベント以外での play! ' + ( e ? e.type : '' ) );
						return;
					};
					//@}
					
					// http://qiita.com/uupaa/items/e5856e3cb2a9fc8c5507
					// iOS9 + touchstart で呼んでいた場合、 X_ViewPort['listenOnce']('pointerup',this,this.actualPlay())
					this.dispatcher[ 'asyncDispatch' ]( X_EVENT_READY );
					
					// Web Audio インスタンスが複数生成された場合、一つの Web Audio に対してタッチによる play が開始されたら、
					//  1. 同時に生成された他の X.Audio インスタンスに対して READY イベントを発する
					//  2. 以降の X.Audio インスタンス生成時に needTouchForPlay フラグは false
					// ちなみに HTML Audio インスタンスは各々にタッチが必要	
					//X_WebAudio_isNoTouch = false;
					
					while( xWebAudio = X_TEMP.xWebAudioInstances.pop() ){
						xWebAudio !== this && xWebAudio[ 'asyncDispatch' ]( X_EVENT_READY );
					};
					delete X_TEMP.xWebAudioInstances;

					X_WebAudio_isNoTouch = false;

					X_TEMP.webAudioSampleRateFix && X_TEMP.webAudioSampleRateFix( this.audioBuffer[ 'sampleRate' ] );
				};
				
				end   = X_Audio_getEndTime( this );
				begin = X_Audio_getStartTime( this, end, true );
				
				console.log( '[WebAudio] play ' + begin + ' -> ' + end + ' loop: ' + this.autoLoop + ' :' + this.loopStartTime + ' -> ' + this.loopEndTime );
				this._createTree( begin, end );
	            
	            /* win8.1 Firefox45, win8.1 Chrome48 で動かなくなる...
	            if( this.bufferSource[ 'loop' ] = this.autoLoop ){
	            	this.bufferSource[ 'loopStart' ] = 0 <= this.loopStartTime ? this.loopStartTime / 1000 : begin / 1000;
	            	this.bufferSource[ 'loopEnd'   ] = 0 <= this.loopEndTime   ? this.loopEndTime   / 1000 : end   / 1000;
	            }; */

	            // おかしい、stop 前に外していても呼ばれる、、、@Firefox33.1
	            // 破棄された X.Callback が呼ばれて、obj.proxy() でエラーになる。Firefox では、onended は使わない
	            // 多くのブラウザで onended は timer を使ったカウントより遅いので使わない
                //if( this.bufferSource.onended !== undefined ){
                	//console.log( '> use onended' );
                	//this.bufferSource.onended = this._onended || ( this._onended = X_Closure_create( this, this._onEnded ) );
                //} else {
                	//this._timerID && X_Timer_remove( this._timerID );
					//this._timerID = X_Timer_once( end - begin, this, this._onEnded );
                //};

	            this.playing      = true;
	            this._startPos    = begin;
	            this._endPosition = end;
	            this._startTime   = X_WebAudio_context.currentTime * 1000;
	            this._interval    = this._interval || X_Timer_add( 100, 0, this, this._onInterval );
			},
			
				_createTree : function( begin, end ){
					if( this.bufferSource ) this._sourceDispose();
					
					if( !this.gainNode ){
						this.gainNode = X_WebAudio_context[ 'createGain' ] ? X_WebAudio_context[ 'createGain' ]() : X_WebAudio_context[ 'createGainNode' ]();
						this.gainNode[ 'connect' ]( X_WebAudio_context[ 'destination' ] );
					};
					
		            this.bufferSource        = X_WebAudio_context[ 'createBufferSource' ]();
		            this.bufferSource.buffer = this.audioBuffer;
		            this.bufferSource[ 'connect' ]( this.gainNode );
		            
		            this.gainNode[ 'gain' ].value = this.gain;
		            
		            if( !this.bufferPlay ){
		            	this.bufferPlay = this.bufferSource.start ? 'start' : this.bufferSource[ 'noteOn'  ] ? 'noteOn'  : 'noteGrainOn';
		            	this.bufferStop = this.bufferSource.stop  ? 'stop'  : 'noteOff';
		            };
					// https://developer.mozilla.org/ja/docs/Web/API/AudioBufferSourceNode
					// AudioBufferSourceNode.start()の呼び出しは一度しかできません。
		            this.bufferSource[ this.bufferPlay ]( 0, begin / 1000, ( end - begin ) / 1000 );
				},
			
				_sourceDispose : function(){
		            this.bufferSource.disconnect();
		            //delete this.bufferSource.onended;
		            delete this.bufferSource;
		        },
					
				_onInterval : function(){
					var time;
					
		            if( this.playing ){
		            	// TODO 再生中に終了時間だけ変えた場合!
		            	time = X_WebAudio_context.currentTime * 1000 - this._startTime - this._endPosition + this._startPos | 0;
		            	//console.log( '> onEnd ' + ( this.playing && ( X_WebAudio_context.currentTime * 1000 - this._startTime ) ) + ' < ' + ( this._endPosition - this._startPos ) );

	            		if( time < 0 ){
	            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_PLAYING );
	            			return;
	            		};
		            	
		            	if( this.autoLoop ){
		            		if( !( this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_BEFORE_LOOP ) & X_CALLBACK_PREVENT_DEFAULT ) ){
		            			this.looped = true;
		            			this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_LOOPED );
		            			this.actualPlay();
			            	} else {
								delete this._interval;
								return X_CALLBACK_UN_LISTEN;
			            	};
		            	} else {
		            		this.actualPause();
		            		this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
		            	};
		            };
				},
			
			actualPause : function(){
				console.log( '[WebAudio] pause' );
				
				this._interval && X_Timer_remove( this._interval );
				delete this._interval;
				delete this.playing;

	            if( this.bufferSource ){
	                this.bufferSource[ this.bufferStop ]( 0 );
	            };
			},
			
			getActualCurrentTime : function(){
				return X_WebAudio_context.currentTime * 1000 - this._startTime + this._startPos | 0;
			},
			
			afterUpdateState : function( result ){
				if( result & 2 || result & 1 ){ // seek
	            	this.actualPlay();
				} else
				if( result & 4 ){
	               this.gainNode[ 'gain' ].value = this.gain;
				};
			}

		}
	);

	X_Audio_BACKENDS.push(
		{
			backendID   : 1,
			
			backendName : 'WebAudio',

			canPlay     : X_Audio_codecs,

			detect      : function( proxy, ext /* hash */ ){
				proxy[ 'asyncDispatch' ]( { type : X_EVENT_COMPLETE, canPlay : X_Audio_codecs[ ext ] } );
			},
			
			klass : X_WebAudio
		}
	);
};
