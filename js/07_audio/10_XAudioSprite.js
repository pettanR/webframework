
/*
 * http://uupaa.hatenablog.com/entry/2011/12/12/213233
 * Mobile Opera11 は Audio をサポートするがイベントが取れない
 * iframe 内で生成して、Audio Sprite の preset で再生できないか？
 */
var X_AudioSprite_shouldUse         = X_HTMLAudio && ( ( X_UA.SafariMobile || X_UA.iOSWebView ) || X_UA.AOSP || ( X_UA.PrestoMobile && X_UA.Android ) ), // Flash がない
	X_AudioSprite_useVideoForMulti  = //( 3.1 <= X_UA.AOSP < 4 ) || 
									  //( ( 4.2 <= X_UA.AOSP ),
									  // ドスパラパッドはビデオのインライン再生が不可
									  false,
	X_AudioSprite_disableMultiTrack = !X_WebAudio && ( ( X_UA.SafariMobile || X_UA.iOSWebView ) || 4 <= X_UA.AOSP || X_UA.ChromeWebView || ( X_UA.WindowsPhone === 7.5 ) ),
	X_AudioSprite_enableVolume      = X_HTMLAudio && !( X_UA.SafariMobile || X_UA.iOSWebView ) && !X_UA.AOSP && !( X_UA.PrestoMobile && X_UA.Android ) && !(X_UA.Fennec < 25 ), // TODO fennec は 25以上
	// http://tukumemo.com/html5-audio-sp/
	// iOS6、Android4.1から同時再生が可能になりました。
	X_AudioSprite_maxTracks        = X_AudioSprite_useVideoForMulti ? 2 : X_AudioSprite_disableMultiTrack ? 1 : 9,
	X_AudioSprite_lengthSilence    = 10000, // 一番最初の無音部分の長さ
	X_AudioSprite_lengthDistance   = 5000,  // 音間の無音の長さ
	X_AudioSprite_uid              = 0,
	X_AudioSprite_TEMP             = {
		presets     : {},
		BGMs        : {},
		tracks      : [],
		pauseTracks : [], // X_EVENT_DEACTIVATE によって pause した再生中のトラックたち。
		volume      : 1,
		bgmTrack    : null,
		bgmPosition : 0,
		bgmName     : '',
		bgmLooped   : false,
		bgmPlaying  : false,
		tmpEvent    : null
	},
	X_AudioSprite,
	X_AudioSprite_numTracks,
	X_AudioSprite_useVideo;

/**
 * {
 * 	 urls      : [ 'xx.ogg', 'xx.mp3' ],
 * 	 numTracks : 3,
 *   useVideo  : false,
 *   volume    : 1,
 * 	 BGM_01 : [ '15.00', '45.500', true, '17.666', '50.999' ],
 *   BGM_02 : [ '56.00', '1:15.230', true ]
 * }
 * 
 * X_EVENT_BACKEND_READY
 * X_EVENT_BACKEND_NONE
 * 
 * X_EVENT_READY
 * X_EVENT_MEDIA_LOOPED
 * X_EVENT_MEDIA_ENDED
 * 
 * @namespace X.AudioSprite
 * @alias X.AudioSprite
 */ 
X[ 'AudioSprite' ] = function( setting ){
	var tracks  = X_AudioSprite_TEMP.tracks,
		bgms    = X_AudioSprite_TEMP.BGMs,
		presets = X_AudioSprite_TEMP.presets,
		urls    = setting[ 'urls' ],
		video   = setting[ 'useVideo' ],
		n       = video ? 1 : setting[ 'numTracks' ] || 1,
		volume  = setting[ 'volume' ],
		k, i, v, track;
	

	if( X_AudioSprite ) X_AudioSprite[ 'kill' ]();

	X_AudioSprite = X_Class_override( X_EventDispatcher(), X_AudioSprite_members );
	X_ViewPort[ 'listen' ]( [ X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD ], X_AudioSprite_handleEvent );
	
	n = n <= X_AudioSprite_maxTracks ? n : X_AudioSprite_maxTracks;
	
	// TODO
	// Android4.x標準ブラウザ(Chrome系)でブラウザが隠れた場合に音が鳴り続ける問題、ビデオで解決できる？
	//if( X_AudioSprite_needTouchAndroid && n === 1 ){
	//	video = true;
	//};
	
	for( k in setting ){
		v = setting[ k ];
		if( X_Type_isArray( v ) && v !== urls ){
			v = X_Array_copy( v );
			for( i = v.length; i; ){
				--i;
				if( i !== 2 ) v[ i ] = X_Audio_timeStringToNumber( v[ i ] );
			};					
			if( v[ 2 ] ) bgms[ k ] = v;
			presets[ k ] = v;
		};
	};
	
	X_Audio_startDetectionBackend(
		X_Audio_BACKENDS[ 0 ],
		X_AudioSprite, // dispatcher として
		X_Array_copy( urls ),
		{
			volume    : 0 <= volume && volume <= 1 ? volume : 1,
			autoplay  : true,
			startTime : 0,
			endTime   : X_AudioSprite_lengthSilence,
			loop      : true
		});

	X_AudioSprite[ 'listenOnce' ]( [ X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE ], X_AudioSprite_backendHandler );
	X_AudioSprite[ 'listenOnce' ]( X_EVENT_KILL_INSTANCE, X_AudioSprite_handleEvent );
	
	X_AudioSprite_useVideo  = video;
	X_AudioSprite_numTracks = X_AudioSprite[ 'numTracks' ] = n;

	return X_AudioSprite;
};

X[ 'AudioSprite' ][ 'shouldUse'        ] = X_AudioSprite_shouldUse;
X[ 'AudioSprite' ][ 'enableMultiTrack' ] = !X_AudioSprite_disableMultiTrack;

// 再生が終わっているもの、終わりかけのものを探す
// TODO 終わりかけのもの、と一番古いもの、どちらを再利用するか？これ以上に細かい実装を望む場合は X.AudioSprite は使わず自力で実装
function X_AudioSprite_getTrackEnded(){
	var tracks  = X_AudioSprite_TEMP.tracks,
		l = X_AudioSprite_numTracks,
		i = 0, track, state, last = 1 / 0, _last, index;
	
	for( ; i < l; ++i ){
		track = tracks[ i ];
		state = track.getState();
		if( !state.playing ) return track;
		if( track === X_AudioSprite_TEMP.bgmTrack ) continue;
		if( state.currentTime <= X_AudioSprite_lengthSilence + X_AudioSprite_lengthDistance ) return track;
		_last = state.endTime - state.currentTime;
		if( _last < last ){
			last  = _last;
			index = i;
		};
	};
	return tracks[ index ];
};

var X_AudioSprite_members =
/** @lends X.AudioSprite.prototype */
{
		/**
		 * @type {number}
		 */
		'numTracks' : 0,
		
		/**
		 * 再生
		 * @param {string} name トラック名
		 * @return {number} uid
		 */
		'play' : function( name ){
			var bgm     = X_AudioSprite_TEMP.bgmTrack,
				tracks  = X_AudioSprite_TEMP.tracks,
				bgms    = X_AudioSprite_TEMP.BGMs,
				presets = X_AudioSprite_TEMP.presets,
				preset  = presets[ name ],
				track, i, k;
			
			if( preset ){
				if( bgms[ name ] ){
					if( name !== X_AudioSprite_TEMP.bgmName ){
						// bgm変更
						X_AudioSprite_TEMP.bgmName     = name;
						X_AudioSprite_TEMP.bgmPosition = preset[ 0 ];
						X_AudioSprite_TEMP.bgmLooped   = false;
					};
					
					X_AudioSprite_TEMP.bgmPlaying = true;
					
					if( bgm ){
						track = bgm;
					} else
					if( 1 < X_AudioSprite_numTracks ){
						track = X_AudioSprite_TEMP.bgmTrack = X_AudioSprite_getTrackEnded();
					} else {
						track = X_AudioSprite_TEMP.bgmTrack = tracks[ 0 ];
					};
					
					if( track[ 'listen' ]( [ X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP ], X_AudioSprite_handleEvent ).playing ){
						track.setState({
								loop          : true,
								looped        : X_AudioSprite_TEMP.bgmLooped,
								currentTime   : X_AudioSprite_TEMP.bgmPosition,
								startTime     : preset[ 0 ],
								endTime       : preset[ 1 ],
								loopStartTime : preset[ 3 ],
								loopEndTime   : preset[ 4 ]
							});
					} else {
						track.setState( { looped : X_AudioSprite_TEMP.bgmLooped } );
						track.play( preset[ 0 ], preset[ 1 ], true, preset[ 3 ], preset[ 4 ] );
						track.seek( X_AudioSprite_TEMP.bgmPosition );
					};
					
				} else {
					if( 1 < X_AudioSprite_numTracks ){
						track = X_AudioSprite_getTrackEnded( X_AudioSprite_TEMP.bgmPlaying );
						track
							[ 'listen' ]( [ X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP ], X_AudioSprite_handleEvent )
							.setState( { looped : false } );
						track.play( preset[ 0 ], preset[ 1 ], true, 0, X_AudioSprite_lengthSilence );
					} else {
						// single track, iOS
						if( bgm ){
							X_AudioSprite_TEMP.bgmPosition = bgm.currentTime();
							//console.log( 'bgm position : ' + X_AudioSprite_TEMP.bgmPosition + ' isPlay:' +  bgm.playing );
							X_AudioSprite_TEMP.bgmTrack    = null;
						};
						track = tracks[ 0 ];
					
						if( track[ 'listen' ]( [ X_EVENT_MEDIA_PLAYING, X_EVENT_MEDIA_WAITING, X_EVENT_MEDIA_SEEKING, X_EVENT_MEDIA_BEFORE_LOOP ], X_AudioSprite_handleEvent ).playing ){
							track.setState({
									loop          : true,
									looped        : false,
									currentTime   : preset[ 0 ],
									startTime     : preset[ 0 ],
									endTime       : preset[ 1 ],
									loopStartTime : 0,
									loopEndTime   : X_AudioSprite_lengthSilence
								});
						} else {
							track.play( preset[ 0 ], preset[ 1 ], true, 0, X_AudioSprite_lengthSilence );	
						};
					};
				};
				return tracks.indexOf( track );
			};
			return -1;
		},
		
		/**
		 * ポーズ, uid を指定しない、または '*' で呼び出した場合、全てのトラックを pause する。
		 * @param {number} uid=undefined トラックID, '*'
		 * @return {AudioSprite}
		 */
		'pause' : function( uid ){
			var tracks = X_AudioSprite_TEMP.tracks,
				i, l, track;
			
			if( uid === '*' || uid === undefined ){
				for( i = 0, l = X_AudioSprite_numTracks; i < l; ++i ){
					X_AudioSprite[ 'pause' ]( i );
				};
			} else
			if( track = tracks[ uid ] ){
				if( X_AudioSprite_TEMP.bgmTrack === track ){
					X_AudioSprite_TEMP.bgmPosition = track.currentTime();
					X_AudioSprite_TEMP.bgmPlaying  = false;
					X_AudioSprite_TEMP.bgmTrack    = null;
				};
				track.play( 0, X_AudioSprite_lengthSilence, true, 0, X_AudioSprite_lengthSilence );
				track.seek( 0 );
				X_AudioSprite[ 'asyncDispatch' ]( X_EVENT_MEDIA_PAUSED );				
			};
			return X_AudioSprite;
		},
		
		/**
		 * シーク, 現在のトラックの長さ内で相対指定する
		 * @param {number} uid トラックID
		 * @param {number} position ms
		 * @return {AudioSprite}
		 */
		'seek' : function( uid, position ){
			var track = X_AudioSprite_TEMP.tracks[ uid ],
				end, start;
			if( track ){
				delete track.seekTime;
				end   = X_Audio_getEndTime( track );
				start = X_Audio_getStartTime( track, end );
				0 <= position && position <= ( end - start ) && track.seek( start + position );
			};
			return X_AudioSprite;
		},
		
		/**
		 * ボリューム
		 * @param {number} uid トラックID
		 * @param {number} opt_volume= ボリューム
		 * @return {AudioSprite|number}
		 */
		'volume' : function( uid, opt_volume ){
			var track, i;
			// TODO uid = 0
			if( uid === 0 ){
				if( opt_volume === undefined ){
					return X_AudioSprite_TEMP.volume;
				};
				for( i = X_AudioSprite_numTracks; i; ){
					X_AudioSprite_TEMP.tracks[ --i ].volume( opt_volume );
				};
				return X_AudioSprite;
			};
			track = X_AudioSprite_TEMP.tracks[ uid ];
			if( opt_volume === undefined ){
				return track ? track.gain : -1;
			};
			track && track.volume( opt_volume );
			return X_AudioSprite;
		},
		
		/**
		 * 状態の取得・更新
		 * @param {number} uid トラックID
		 * @param {object} opt_obj= 上書きする状態を書き込んだオブジェクト
		 * @return {AudioSprite|object}
		 */
		'state' : function( uid, opt_obj ){
			var track = X_AudioSprite_TEMP.tracks[ uid ],
				state, start, end;
			// TODO uid = 0
			if( opt_obj === undefined ){
				// TODO pause
				if( track ){
					state = track.getState();
					start = state.startTime;
					return {
				    	currentTime : state.currentTime - start,
				        playing     : start <= state.currentTime && state.currentTime <= state.endTime,
				        duration    : state.endTime - start,
				        volume      : X_AudioSprite_TEMP.volume
					};
				};
				return { volume : X_AudioSprite_TEMP.volume, playing : false };
			};
			track && track.setState( opt_obj );
			return X_AudioSprite;
		}
};

function X_AudioSprite_backendHandler( e ){
	var i, backend, option, src, name, last, _e, track;
	
	switch( e.type ){
		case X_EVENT_BACKEND_READY :
		
			backend = X_Audio_BACKENDS[ e[ 'backendID' ] ];
			option  = e[ 'option' ];
			
			X_AudioSprite[ 'unlisten' ]( X_EVENT_BACKEND_NONE, X_AudioSprite_backendHandler );
			X_AudioSprite[ 'source' ]      = src = e[ 'source' ];
			X_AudioSprite[ 'backendName' ] = name = backend.backendName;
		
			//console.log( i + ' / ' + X_AudioSprite_numTracks );
		
			for( i = 0; i < X_AudioSprite_numTracks; ++i ){
				if( X_AudioSprite_useVideo || ( i === 1 && X_AudioSprite_useVideoForMulti ) ){
					option = X_Object_deepCopy( option );
					option[ 'useVideo' ] = true;
					console.log( 'use video' );
				};
				// Audiobackend の owner として null を渡すとAudioBackend 自身へ dispatch する
				X_AudioSprite_TEMP.tracks.push(
					last = backend.klass( null, e[ 'source' ], option )[ 'listen' ]( X_EVENT_DEBUG, X_AudioSprite_handleEvent ) );
			};

			_e = {
				'type'        : X_EVENT_BACKEND_READY,
				'source'      : src,
				'backendName' : name
			};
			
			// TODO 今は touch 可能で backend ready
			if(
				// WebAudio
				( e[ 'needTouchForPlay' ] && ( _e[ 'needTouchForPlay' ] = true ) ) ||
				// HTMLAudio
				( e[ 'needTouchForLoad' ] && ( _e[ 'needTouchForLoad' ] = true ) )
			){
				X_AudioSprite_TEMP.tmpEvent = _e;
				last[ 'listenOnce' ]( X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler );
			} else {
				X_AudioSprite[ 'asyncDispatch' ]( _e );
			};
			
			// TODO 全ての track の READY で!
			last[ 'listen' ]( X_EVENT_PROGRESS, X_AudioSprite_backendHandler )
				[ 'listenOnce' ]( X_EVENT_READY, X_AudioSprite_backendHandler );
			return X_CALLBACK_STOP_NOW;

		case X_EVENT_BACKEND_NONE :
			X_AudioSprite
				[ 'listen' ]( X_EVENT_BACKEND_NONE, X_AudioSprite_handleEvent ) // kill を呼ぶ
				[ 'asyncDispatch' ]( X_EVENT_BACKEND_NONE );
			return X_CALLBACK_STOP_NOW;
		
		case X_EVENT_MEDIA_WAIT_FOR_TOUCH :
			// TODO 全ての track の MEDIA_WAIT_FOR_TOUCH で!
			X_AudioSprite[ 'asyncDispatch' ]( X_AudioSprite_TEMP.tmpEvent );
			delete X_AudioSprite_TEMP.tmpEvent;
			break;
		
		case X_EVENT_PROGRESS :
			X_AudioSprite[ 'dispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : e[ 'percent' ] } );
			break;
		
		case X_EVENT_READY :
			console.log( 'X.AudioSprite - Ready!' );
			
			if( X_AudioSprite_TEMP.tmpEvent ){
				// このタイミングで tmpEvent が存在する場合は、タッチをスキップして Web Audio が再生可能になった
				// つまり他の Web Audio インスタンスでタッチによる再生が開始され、自身も再生可能になった
				
				_e = X_AudioSprite_TEMP.tmpEvent;
				_e[ 'needTouchForPlay' ] = false;
				
				X_AudioSprite
					[ 'unlisten' ]( X_EVENT_MEDIA_WAIT_FOR_TOUCH, X_AudioSprite_backendHandler )
					[ 'asyncDispatch' ]( _e );
				
				delete X_AudioSprite_TEMP.tmpEvent;
			};			
			
			for( i = 0; i < X_AudioSprite_numTracks; ++i ){
				track = X_AudioSprite_TEMP.tracks[ i ];
				( track.autoplay || track._playReserved ) && track.actualPlay();
				delete track._playReserved;
			};
			this[ 'listen' ]( X_EVENT_PROGRESS, X_AudioSprite_backendHandler );
			X_AudioSprite[ 'asyncDispatch' ]( X_EVENT_READY );
			break;
	};
};


function X_AudioSprite_handleEvent( e ){
	var track = e.target, i, tracks, _e, k;
	
	switch( e.type ){
		case X_EVENT_MEDIA_PLAYING :
		case X_EVENT_MEDIA_WAITING :
		case X_EVENT_MEDIA_SEEKING :
			( track === X_AudioSprite_TEMP.bgmTrack || !track.looped ) &&  X_AudioSprite[ 'asyncDispatch' ]( e.type );
			break;
		
		case X_EVENT_MEDIA_BEFORE_LOOP :
			if( track === X_AudioSprite_TEMP.bgmTrack ){
				// BGM
				X_AudioSprite_TEMP.bgmLooped = true;
				X_AudioSprite[ 'asyncDispatch' ]( X_EVENT_MEDIA_LOOPED ); // TODO uid
			} else {
				// SE
				if( !track.looped ){
					 X_AudioSprite[ 'asyncDispatch' ]( X_EVENT_MEDIA_ENDED ); // TODO uid
				};
				
				//console.log( '[AudioSprite] bgmPlaying:' + X_AudioSprite_TEMP.bgmPlaying + ' ' + !X_AudioSprite_TEMP.bgmTrack );
				
				// single track | iOS
				if( X_AudioSprite_TEMP.bgmPlaying && !X_AudioSprite_TEMP.bgmTrack ){
					X_AudioSprite_TEMP.bgmTrack = track;
					X_AudioSprite.play( X_AudioSprite_TEMP.bgmName );
					return X_CALLBACK_PREVENT_DEFAULT;
				};
			};
			break;
		
		
		case X_EVENT_DEBUG :
			i = X_AudioSprite_TEMP.tracks.indexOf( track );
			if( 0 <= i ){
				e[ 'trackID' ] = i;
				X_AudioSprite[ 'dispatch' ]( e );
			};
			break;
		
		// TODO Android Firefox で アクティブ検出できない！
		case X_EVENT_VIEW_ACTIVATE :
			console.log( '■ アクティブ' );
			// track.play(); or iOS need touch??
			tracks = X_AudioSprite_TEMP.pauseTracks;
			while( tracks.length ) tracks.pop().actualPlay();
			break;

		case X_EVENT_VIEW_DEACTIVATE :
			console.log( '■ デアクティブ' );
			// track.pause();
			tracks = X_AudioSprite_TEMP.tracks;
			i      = X_AudioSprite_numTracks;
			while( track = tracks[ --i ] ){
				track.playing && X_AudioSprite_TEMP.pauseTracks.push( track ) && track.pause();
			};
			break;
		
		case X_EVENT_BACKEND_NONE :
		case X_EVENT_UNLOAD :
			X_AudioSprite[ 'kill' ]();
			break;
		
		case X_EVENT_KILL_INSTANCE :
			X_AudioSprite_TEMP.pauseTracks.length = 0;
			
			while( X_AudioSprite_TEMP.tracks.length ){
				X_AudioSprite_TEMP.tracks.pop()[ 'kill' ]();
			};
			
			for( k in X_AudioSprite_TEMP.BGMs ){
				delete X_AudioSprite_TEMP.BGMs[ k ];
			};
			for( k in X_AudioSprite_TEMP.presets ){
				delete X_AudioSprite_TEMP.presets[ k ];
			};
			
			X_AudioSprite_TEMP.bgmTrack    = null;
			X_AudioSprite_TEMP.bgmPosition = 0;
			X_AudioSprite_TEMP.bgmName     = '';
			X_AudioSprite_TEMP.bgmLooped   = false;
			X_AudioSprite_TEMP.bgmPlaying  = false;
			
			X_ViewPort[ 'unlisten' ]( [ X_EVENT_VIEW_ACTIVATE, X_EVENT_VIEW_DEACTIVATE, X_EVENT_UNLOAD ], X_AudioSprite_handleEvent );
			X_AudioSprite = null;
			break;
	};
};
