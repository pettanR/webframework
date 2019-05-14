
/*
 * original : uupaa-js HTML5Audio.js
 * https://code.google.com/p/uupaa-js/source/browse/trunk/0.8/src/Audio/HTML5Audio.js?r=568
 * 
 * Windows 版 Safari は QuickTime のインストールが必要
 * 
 * 1. iOS4(iPod 2G) で ended に達すると音が鳴らなくなる fix で解決
 * 2. iOS6(iPod 4G) で ended に達すると音が鳴らなくなる fix で頻度が改善 emded イベントは発しないので、timeupdate 時に currentTime で判断する
 * 3. WP7(IS12T) で最後の方にある音が鳴らない? mp3 cbr を使えばいい? 裏に回っても音が鳴り続ける
 * 4. AOSP 2.x で ended に達すると音が鳴らなくなる -> リロード(audio.src='';audio.src=src;audio.load())でで解決
 * 5. AOSP 3.x で ended に達すると音が鳴らなくなる -> リロード(audio.src='';audio.sr=src)で解決、但し 2.x 4.x より遅延が大きく 1 秒弱程度ある
 * 6. AOSP 4.4.2- は ended に達した際に currentTime が変更できなくなり、リロードが必要になる, 4.0, 4.1, 4.2, 4.3 で確認, play() で頻度低下
 * 7. Android 4.4.4 Chrome WebView は ended に達した際に play() が必要
 * 8. BlinkOpera32 Win8 は HTMLAudio が壊れている、WebAudio は mp3 がデコードに失敗、ogg が動作
 * 
 * memo
 * 1. AOSP4.1 iframe 内の Audio は親に focus が移っても再生を継続する
 * 2. AOSP oggはシークが乱れる m4a, mp3 は優秀
 * 
 * http://unolabo.boo.jp/archives/2011/06/13-iphone%E3%81%AEaudio%E5%91%A8%E3%82%8A%E3%81%AE%E3%83%A1%E3%83%A2.html
 * 【JS】iPhoneのAudio周りのメモ iOS4.0 と 4.2 の違い
 */
    /*
     * durationFix
     *  duration が取得できるタイミングが遅くそれまでは infinity(PC Opera12), NaN(WP9), 0(Android 標準ブラウザ ChromeWebView) が入っている
     * 
     *   1. touch が不要の場合、自動で再生を開始して duration を取得するまで再生する
     *      -> 取得後に pause or 通常再生
     *   2. touch が必要な場合、タッチイベント内の audio.play() で duration 取得
     * 
     *  PC Opera12
     *   1. loadeddata 等では duration が infinity で、再生後の durationchange 時に duration が判明する
     *   2. duration 判明後には currentTime によるシークと、現在時間の取得が可能になる。
     *   3. Opera12.17 Win32(XP) portable apps は勝手に再生が始まる、、、Win8+Opera では発生しない
     *      -> その際には timeupdate が発行されない、、、 iframe+image+audio で使わないときは破棄する、とか。
     *      -> opera11、10.54 WinXP はまとも、、、 portable が怪しい??
     */

var
    X_HTMLAudio,
    // iOS7.1, 8.3 で確認.seeking -> seeked の間の currentTime の値が全くあてにならないので無視する。
    X_HTMLAudio_seekingFixIOS   = 7 <= X_UA[ 'iOS' ],
    // ended が発生しない timeupdate 内で play() を呼ぶ (未検証) 不具合確認は iOS4,6 iOS7.1,8.3ではpause->ended起きてる 但し iOS7.1 でも 6 と同じ症状になることがある
    X_HTMLAudio_endedFixIOS     = X_UA[ 'iOS' ] < 7,
    // Android 2.3.5 で ended 時に audio.src='';audio.src=src;audio.load() を実施。 2.3.4 でも問題なし。
    X_HTMLAudio_endedFixAOSP2   = X_UA[ 'AOSP' ] < 3,
    // Android 3.1 で ended 時に src='';src=src を実施。
    X_HTMLAudio_endedFixAOSP3   = !X_HTMLAudio_endedFixAOSP2 && X_UA[ 'AOSP' ] < 4,
    // ended 時に play() を実施, currentTime が duration に張り付き更新されなければ  src='';src=src を実施。
    X_HTMLAudio_endedFixAOSP4   = 4 <= X_UA[ 'AOSP' ],
    // ended 時に play() を実施
    X_HTMLAudio_endedFixCWV     = X_UA[ 'ChromeWV' ] || ( X_UA[ 'Blink' ] && X_UA[ 'Android' ] ),
    
    // Opera Mobile 12 は 2回目以降の currentTime へのセットで currentTime が更新されなくなるため、タイマーを使用する
    X_HTMLAudio_currentTimeFix  = ( X_UA[ 'Prsto' ] && X_UA[ 'Android' ] ),
    // Firefox44.0.2 で音声の再生開始に難あり... 49 でも確認, あるいはCGIで動的に生成しているmp3自体に問題があるのかも
    X_HTMLAudio_playStartFix    = X_UA[ 'Windows' ] && 44 <= X_UA[ 'Gecko' ],

    X_HTMLAudio_volumeFix       = X_UA[ 'Chrome' ],
    /*
     * win opera12 volume, mute の変更が2度目以降できない
     */
    X_HTMLAudio_volumeEnabled   = X_UA[ 'WinPhone' ] !== 7.5 && !X_UA[ 'Prsto' ],
    // Gecko PC + Android でseek時に再生がしばしば止まる問題の修正、iOS8でも確認
    X_HTMLAudio_needPlayForSeek = X_UA[ 'iOS' ] || X_UA[ 'Gecko' ],
    // 
    X_HTMLAudio_pauseFix        = 12 <= X_UA[ 'Prsto' ] && 0 < ' XP XPSP2 2003|XP64'.indexOf( X_UA[ 'Windows' ] ), // XP + Opera12 のみ?

    X_HTMLAudio_need1stTouch    = X_UA[ 'iOS' ] || 4.2 <= X_UA[ 'AOSP' ] || X_UA[ 'ChromeWV' ] || X_UA[ 'WinPhone' ] || ( X_UA[ 'Blink' ] && X_UA[ 'Android' ] ),

    X_HTMLAudio_playTrigger     = ( X_UA[ 'WinPhone' ] === 7.5 ) ? 'canplay' :
                                    X_UA[ 'iOS' ] < 8 ? 'suspend' :    // iOS7.x以下
                                    X_UA[ 'iOS' ] ? 'loadedmetadata' : // iOS8以上は
                                    X_UA[ 'Blink' ] < 32 ? 'stalled' : 'canplaythrough',

    X_HTMLAudio_durationFix     = // iOS8.1(シュミレータでは不要)
                                  X_UA[ 'iOS' ] < 8 || X_UA[ 'ChromeWV' ] || X_UA[ 'WinPhone' ] === 7.5 ||
                                  ( X_UA[ 'Windows' ] && 12 <= X_UA[ 'Prsto' ] ) || ( X_UA[ 'Blink' ] < 36 && X_UA[ 'Android' ] ),

    X_HTMLAudio_shortPlayFix    = X_UA[ 'AOSP' ],
    
    X_HTMLAudio_progressEnabled = !( X_UA[ 'Prsto' ] && X_UA[ 'Android' ] ) && X_UA[ 'WinPhone' ] !== 7.5; // Android 4.1.1 でも遭遇

if( X_Audio_constructor ){
    
    X_HTMLAudio = X_AudioBase[ 'inherits' ](
        'X.HTMLAudio',
        X_Class.POOL_OBJECT,
        {
            // 1: canplaythrought|timeupdateに達している、またはdurationFixが終了している
            // 2: READY イベント発火済
            // 3: 1, 2 が済
            _readyState       : 0,
            _src              : '',
            
            // 0:ok
            // 1:touch 要求済
            // 2:touch による play 済
            _touchState       : X_HTMLAudio_need1stTouch ? 1 : 0,
            
            _currentFixStart  : 0,
            _currentFixBegin  : 0,

            // 0:durationFix不要 または 完了
            // 1:durationFix未着手(touchState=1なら play() に入れる)
            // 2:canplay イベント発生 -> play()
            // 4:play() 実施済
            // 8:duration 取得済
            //  :timeupdate イベントで durationFixは完了
            _durationFixPhase : X_HTMLAudio_durationFix ? 1 : 0,
            _lastCurrentTime  : 0, // ms

            _shortPlayFixON   : false,
            _shortPlayFixTime : 0,
            
            _endedFixON       : false,
            
            _seekingFixON     : false,
            
            'Constructor' : function( dispatcher, source, option ){
                var raw;
                
                this.dispatcher = dispatcher || this;
                this._src       = source;
                
                if( X_HTMLAudio_shortPlayFix ){
                    this._shortPlayFixON = X_URL_getEXT( source ) === 'm4a';
                };
                
                this.setState( option );

                if( option[ 'useVideo' ] ){
                    raw = document.createElement( 'video' );
                    raw.preload           = 'none'; // auto, metadata, none
                    raw.autoplay          = false, // no-auto
                    raw.loop              = false;
                    raw.muted             = false;
                    raw.crossorigin       = option[ 'crossorigin' ] || ''; //crossorigin: "anonymous", X.URL.isSameDomain() で切り替え
                    raw.style.cssText     = 'position:absolute;bottom:0;left:-50px;width:100px;height:100px;opacity:0;';
                    raw.controls          = false;
                    raw.WebKitPlaysInline = true;
                    X_elmBody.appendChild( raw );
                } else {
                    raw = X_TEMP.rawAudio || new X_Audio_constructor( '' );
                    
                    if( X_TEMP.rawAudio ) delete X_TEMP.rawAudio;
                };
                
                this[ '_rawObject' ] = raw;
                
                this[ 'listen' ]( [
                        X_EVENT_KILL_INSTANCE,
                        X_HTMLAudio_playTrigger,
                        //'loadstart', 'load',
                        'progress', //'error',
                        // 'suspend', 'abort', 'emptied', 'stalled',
                        // 'play', 'pause', 'ratechange', 'volumechange',
                        'seeked',
                        'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough',
                        'playing', 'waiting', 'seeking',
                        'durationchange', 'timeupdate', 'ended' ] );

                this[ 'listen' ]( [
                        'loadstart', 'load',
                        'progress', 'error',
                        'suspend', 'abort', 'emptied', 'stalled',
                        'play', 'pause', 'seeked', 'ratechange', 'volumechange',
                        'loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough',
                        'playing', 'waiting', 'seeking',
                        'durationchange', 'timeupdate', 'ended' ], this.onDebug );

                if( X_HTMLAudio_endedFixAOSP2 || X_HTMLAudio_endedFixAOSP4 ){
                    raw.loop = true; // loop を使えば ended で止まること回避できる 但し ended イベントが起きなくなる
                };

                if( X_HTMLAudio_need1stTouch ){
                    raw.src = source;
                } else {
                    if( this.autoplay ){
                        raw.preload  = 'auto';
                        raw.autoplay = true; // Android 4.0-4.1.x で必要
                        //raw.autobuffer = true;
                    };
                    raw.src = source;
                    raw.load(); // Android4.1.1 HTL21 では必要!
                };
            },
            
            onDebug : function( e ){
                this.dispatcher[ 'dispatch' ]( {
                    type       : X_EVENT_DEBUG,
                    'rawEvent' : e.type,
                    'current'  : this[ '_rawObject' ].currentTime,
                    duration   : this[ '_rawObject' ].duration } );
            },
            
            handleEvent : function( e ){
                var raw         = this[ '_rawObject' ],
                    actualEnded = e.type === 'ended',
                    ended       = actualEnded,
                    i, l, buf, time,
                    ready,
                    eventType, duration, end, now;
                
                if( !raw ) return;

                // e.type !== 'timeupdate' && console.log( ' > ' + e.type );
                    
                switch( e.type ){

                    case X_EVENT_KILL_INSTANCE :
                        this.playing && this.actualPause();
                        
                        // 【javascript】モバイル向けブラウザでも音を鳴らしたい【WebAudio】
                        // http://ingaouhou.com/archives/3633
                        // ・使い終わったインスタンスはload()しておくとやや安定
                        raw.src = '';
                        raw.load();
                        
                        // removeChild for video
                        break;

                    //case 'loadstart' :      //     ブラウザがコンテンツの検索を開始した場合に発生
                        //break;
                    case 'progress' :       //     ブラウザがコンテンツの取得を実行した場合に発生
                        // console.log( e.loaded + ' ' + e.total * 100 + '%' );
                        // iem9 で常に0 raw.networkState;
                        // opera Android 12 で buffered.end() へのアクセスはエラー try catch も無効、iem9 は常に end(0) = 0
                        if( X_HTMLAudio_progressEnabled && this.duration && this._readyState < 3 ){
                            buf = raw.buffered;
                            for( i = time = 0, l = buf && buf.length; i < l; ++i ){
                                time += buf[ 'end' ]( i ) - buf[ 'start' ]( i );
                            };
                            this.dispatcher[ 'dispatch' ]( { type : X_EVENT_PROGRESS, 'percent' : time * 1000 / this.duration * 100 } );
                        };
                        break;
                    
                    case 'loadeddata' :     //     コンテンツの表示を現在の再生位置で初めて行えるようになった場合に発生
                    case 'canplaythrough' : //     今すぐに再生を開始してもバッファリングで停止することなく最後まで表示できると予測している場合に発生
                        if( !this._endedFixON && !X_HTMLAudio_durationFix && !X_HTMLAudio_need1stTouch ){
                            this._readyState |= 1;
                        };
                    case 'canplay' :        //     今すぐに再生を再開できるが、バッファリングが不十分でコンテンツを最後まで表示できないと予測している場合に発生
                        if( this._durationFixPhase === 1 && !X_HTMLAudio_need1stTouch ){ // PC Opera12 用 durationFix
                            this._durationFixPhase = 2;
                            this.actualPlay();
                            raw.currentTime = 0; // Win8 + Opera12 で必要
                        };
                        if( this._endedFixON ){
                            console.log( '▽ onEndedFix の終了 @' + e.type  );
                            this._endedFixON = false;
                            this.actualPlay();
                        };
                    case 'loadedmetadata' : //     ブラウザがメディアリソースの長さと寸法を判定した場合に発生
                    case 'durationchange' : //  duration属性が更新された場合に発生
                        if( !this.duration || this.duration !== raw.duration * 1000 ){ // Blink28 duration が変わる
                            duration = raw.duration;
                        };
                        break;
    
                    // TODO firefox で 短い音声でtimeupdate, ended が発火しない <- 最後の音に無音部分を追加する
                    case 'timeupdate' :     //     通常の再生が行われ現在の再生位置の変化が起こった場合に発生
                        if( this._seekingFixON ){
                            eventType = X_EVENT_MEDIA_SEEKING;
                        } else
                        if( this._durationFixPhase === 8 ){
                            this._durationFixPhase = 0;
                            this._readyState |= 1;
                        } else
                        if( this._durationFixPhase === 4 ){ // 1 or 2
                            duration = raw.duration;
                            eventType = X_EVENT_MEDIA_WAITING;
                        } else
                        if( this._touchState === 3 && !X_HTMLAudio_durationFix ){
                            this._touchState  = 0;
                            this._readyState |= 1;
                        } else
                        if( ( now = this.getActualCurrentTime() ) === this._lastCurrentTime ){
                            eventType = X_EVENT_MEDIA_WAITING;
                        } else
                        if( X_HTMLAudio_playStartFix && ( now < this._lastCurrentTime ) ){
                            eventType = X_EVENT_MEDIA_WAITING;
                            //console.log( '@Firefox44.0.2 !! ' + now + ' / ' + this._lastCurrentTime );
                            // Firefox44.0.2 で音声の再生開始に難あり...
                            // 20回程度 currentTime の更新に失敗する....
                            this.actualPlay();
                        } else
                        if( this.playing ){
                            end = X_Audio_getEndTime( this ) + this._shortPlayFixTime;

                            //console.log( '@ ' + now + ' / ' + this._lastCurrentTime + ' / ' + end );// Firefox44.0.2 で音声の再生開始に難あり...

                            if( ( 0 + end <= 0 + now ) || // 0+ なぜか iem9 で必要,,,
                                ( now < this._lastCurrentTime && now < 2000 ) ){
                                //( ( X_HTMLAudio_endedFixAOSP2 || X_HTMLAudio_endedFixAOSP4 ) && ( now < this._lastCurrentTime && now < 1000 ) ) ){
                                    // loop して0付近に戻った場合
                                    // iOS8.4 ではこのタイミングで now が last より 0.1秒後退している場合がある
                                    // iOS7.1 ではもっと小さい場合がある,,,
                                if( this.autoLoop ){
                                    console.log( '☆★☆ 曲の最後に到達 @timeupdate now-end:' + ( now - end ) + ' now:' + now + ' last:' + this._lastCurrentTime );
                                    ended = true;
                                    //if( X_HTMLAudio_endedFixIOS ) actualEnded = true;
                                } else {
                                    this.actualPause();
                                    eventType = X_EVENT_MEDIA_ENDED;
                                };
                            } else {
                                eventType = X_EVENT_MEDIA_PLAYING;
                            };
                            this._lastCurrentTime = now;
                        };
                        break;
    
                    //case 'stalled' :        //     ブラウザがコンテンツの取得を試みたが、データがまだ用意されていない場合に発生
                        // Android2 で ready 扱い?
                    //case 'suspend' :        //     ブラウザが意図的にコンテンツの取得を現在行っていない場合に発生（ダウンロードは未完了）
                        // iOS で ready 扱い
                    //case 'emptied' :        //     読み込み中に致命的なエラーが発生したか、実行状態ででload()メソッドが実行された場合に発生
                    //case 'abort' :          //     ダウンロードの完了前にコンテンツの取得を停止した場合に発生（この停止はエラーによるものではない）
                    //    break;
                        
                    //case 'error' :          //     コンテンツの取得実行中にエラーが発生した場合に発生
                        // Opera12 src = '' で error が発生、無視する
                        // eventType = X_EVENT_ERROR;
                        //break;
                        
                    case 'playing' :        //     再生が開始された場合に発生
                        if( X_HTMLAudio_volumeFix ){
                            raw.volume = this.gain;
                        };
                        //if( X_HTMLAudio_currentTimeFix && !this._currentFixStart ){
                            //this._currentFixStart = X_Timer_now(); // 正確な再生開始時間に補正
                        //};
                        eventType = !this._durationFixPhase && !this._endedFixON ? X_EVENT_MEDIA_PLAYING : X_EVENT_MEDIA_WAITING;
                    //case 'play' :           //     再生が開始された。play()メソッドからの復帰後に発生する場合に発生
                    //case 'pause' :          //     再生が一時停止された。pauseメソッドからの復帰後に発生する場合に発生
                    //case 'ratechange' :     // defaultPlaybackRate属性とplaybackRate属性のどちらかが更新された場合に発生
                    //case 'volumechange' :   // volume属性とmuted属性のどちらかが変化した場合に発生
                        break;

                    case 'seeking' :        //     シークがtrueに変化し、イベントを発生させるのに十分な時間がシーク操作にかかっている場合に発生
                        eventType = X_EVENT_MEDIA_SEEKING;
                        if( X_HTMLAudio_seekingFixIOS ) this._seekingFixON = true;
                        break;                    
                    case 'seeked' :
                        if( X_HTMLAudio_seekingFixIOS ) this._seekingFixON = false;
                        break;
                    
                    case 'waiting' :        //     次のフレームが利用不可のため再生を停止したが、そのフレームがやがて利用可能になると想定している場合に発生
                        eventType = X_EVENT_MEDIA_WAITING;
                        break;
                };
                
                // duration は Infinity, NaN, 0 の場合があるため、これを除外する
                // chrome18 for Android は duration = 100 の間はシークができない? 28 は可能
                if( 0 < duration && X_Type_isFinite( duration ) && duration !== 100 ){
                    this.duration = duration * 1000;

                    if( this._durationFixPhase === 4 ){
                        console.log( '▼ DurationFix の終了 @' + e.type );
                        this._durationFixPhase = 8;
                        
                        if( this.autoplay || this._playReserved ){
                            console.log( '☆ 再生 <- DurationFix の終了' );
                            this.actualPlay();
                        } else
                        if( X_HTMLAudio_pauseFix ){
                            console.log( '☆ PAUSE <- DurationFix の終了' );
                            this.actualPause();
                        };
                    } else
                    if( this._durationFixPhase & 3 ){ // === 1 | 2
                        this._durationFixPhase = 8;
                    };
                };

                //
                if( this._touchState === 1 ){
                    if( e.type === X_HTMLAudio_playTrigger ){
                        this._touchState = 2;
                        this.dispatcher[ 'asyncDispatch' ]( X_EVENT_MEDIA_WAIT_FOR_TOUCH );
                    };
                } else
                if( ended ){
                    if( this.autoLoop ){
                        if( !( this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_BEFORE_LOOP ) & X_CALLBACK_PREVENT_DEFAULT ) ){
                            this.looped = true;
                            this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_LOOPED );
                            this.actualPlay( X_HTMLAudio_endedFixCWV && actualEnded, X_HTMLAudio_endedFixAOSP3 && actualEnded );
                        };
                    } else {
                        this.seekTime = 0;
                        delete this.playing;
                        this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_ENDED );
                    };
                } else
                if( this._readyState === 1 && this.duration ){
                    this._readyState |= 2;
                    this.dispatcher[ 'asyncDispatch' ]( X_EVENT_READY );
                    
                    // TODO 勝手に play する環境があるので pause() を実施
                    /*
                    if( !this.playing && !this.autoplay && !this._playReserved && !X_HTMLAudio_pauseFix ){
                        this.actualPause();
                    }; */
                    
                    console.log( '> Audio Loaded!! ' + e.type + ' d:' + ( this.duration | 0 ) );
                } else
                if( eventType ){
                    this.dispatcher[ 'dispatch' ]( eventType );
                };
            },

            actualPlay : function( forcePlay, forceReload ){
                var raw = this[ '_rawObject' ],
                    begin, end;

                if( !raw ) return;
                
                this._playReserved = true;
                
                if( X_HTMLAudio_pauseFix ){
                    if( !raw.src ){ // X_HTMLAudio_pauseFix によって src が空になっている
                        console.log( '○ 削除された audio.src の復帰' );
                        raw.src = this._src;
                        return;
                    };
                    if( this._durationFixPhase < 2 ){
                        return;
                    };        
                };

                if( this._touchState === 2 ){
                    //@dev{
                    var e = X_EventDispatcher_CURRENT_EVENTS[ X_EventDispatcher_CURRENT_EVENTS.length - 1 ];
                    if( !e || !e[ 'pointerType' ] ){
                        alert( 'タッチイベント以外での play! ' + ( e ? e.type : '' ) );
                        return;
                    };
                    //@}
                    this._touchState = 3;
                } else
                if( this._readyState !== 3 && this._durationFixPhase < 2 ){
                    return;
                };
                
                delete this._playReserved;
                
                if( this._durationFixPhase & 3 ){ // 1 or 2
                    console.log( '▲ DurationFix の開始' );
                    this._durationFixPhase = 4;
                };

                end   = X_Audio_getEndTime( this );
                begin = X_Audio_getStartTime( this, end, true );

                this._lastCurrentTime = begin;

                if( this._shortPlayFixON ){
                    this._shortPlayFixTime = ( 1000 < end - begin ) ? 200 : 400;
                    if( this.duration < end + this._shortPlayFixTime ){
                        this._shortPlayFixTime = this.duration - end;
                    };
                };

                if( this._endedFixON ){
                    console.log( '☆ audio.play をスキップ ' + begin + ' -> ' + end + ' crt:' + ( raw.currentTime | 0 ) );
                } else {
                    if( !this.playing ){
                        if( X_HTMLAudio_volumeFix ){
                            raw.volume = 0;
                        } else {
                            raw.volume = X_HTMLAudio_volumeEnabled ? this.gain : 1;
                        };
                        raw.play();
                        this.playing = true;
                    } else
                    if( X_HTMLAudio_needPlayForSeek || forcePlay ){
                        raw.play();
                    };
                    
                    //http://himaxoff.blog111.fc2.com/blog-entry-97.html
                    //Firefox3.6では一度も play() していない状態で currentTime = 0 を実行するとエラーになる。
                    //また、GoogleChrome7 では currentTime = 0 直後に play() すると、pause()した位置前後の音が混ざることがある。(少なくとも自分の環境では)

                    // iOS で duration が 0 の時に触ると error
                    // 0 or 8
                    if( !( this._durationFixPhase % 8 ) && this.duration ) raw.currentTime = this._lastCurrentTime / 1000;

                    console.log( '[HTMLAudio] play ' + begin + ' -> ' + end + ' crt:' + ( raw.currentTime | 0 ) + ' last:' + this._lastCurrentTime );

                    if( forceReload ){
                        this.playing     = false;
                        this._endedFixON = true;
                        raw.src = this._src;
                        console.log( '△ onEndedFix の開始' );
                        this.dispatcher[ 'dispatch' ]( X_EVENT_MEDIA_WAITING );
                    };
                };

                if( X_HTMLAudio_currentTimeFix ){
                    this._currentFixBegin = begin;
                    this._currentFixStart = X_Timer_now();
                };
            },
            
            actualPause : function(){
                var raw = this[ '_rawObject' ];
                
                console.log( '[HTMLAudio] pause' );

                delete this._currentFixStart;

                !raw.error && raw.pause();
                
                if( X_HTMLAudio_pauseFix ){
                    raw.src = '';
                    if( X_HTMLAudio_durationFix ){
                        delete this._durationFixPhase;
                    };
                };
                delete this.playing;
            },
            
            getActualCurrentTime : function(){
                return ( X_HTMLAudio_currentTimeFix ?
                            X_Timer_now() - this._currentFixStart + this._currentFixBegin :
                            this._seekingFixON ? this._lastCurrentTime :
                            this[ '_rawObject' ].currentTime * 1000 | 0 );
            },
        /*
        http://www.w3schools.com/tags/av_prop_error.asp
        1 = MEDIA_ERR_ABORTED - fetching process aborted by user
        2 = MEDIA_ERR_NETWORK - error occurred when downloading
        3 = MEDIA_ERR_DECODE - error occurred when decoding
        4 = MEDIA_ERR_SRC_NOT_SUPPORTED - audio/video not supported
        */            
            getActualError : function(){
                return this[ '_rawObject' ].error || 0;
            },
            
            afterUpdateState : function( result ){
                if( result & 3 ){ // seek
                    this.actualPlay();
                } else
                if( ( result & 4 ) && X_HTMLAudio_volumeEnabled ){
                   this[ '_rawObject' ].volume = this.gain;
                };                
            }
    
        }
    );
    
    X_HTMLAudio && X_Audio_BACKENDS.push(
        {
            backendID   : 2,
            
            backendName : 'HTMLAudio',
            
            canPlay : X_Audio_codecs,
        /*
         * HTML5 の audio 要素と video 要素でサポートされているメディアフォーマット
         * https://developer.mozilla.org/ja/docs/Web/HTML/Supported_media_formats
         * 
         * 主要ブラウザのHTML5 audioタグで使えるファイル形式の再生対応状況を調べてみた
         * http://sothis.blog.so-net.ne.jp/2010-10-27
         * ダメ元で仕様に含まれていない SHOUTcast もテストしてみました。
         * 
         * IE9 の HTML5 Audio について
         * http://kentablog.cluscore.com/2011/05/ie9-html5-audio.html
         * 1.Audioオブジェクトを作ることができないので、Audioタグを使う
         * 2.クロスドメインアクセスには、「clientaccesspolicy.xml」か「crossdomain.xml」が必要
         * 3.wav が不可
         * 
         * IE9でHTML5 autio タグが無効になる
         * http://bbs.wankuma.com/index.cgi?mode=al2&namber=64886&KLOG=109
         *  IEのバージョン9.0.8112.16421では、Audioオブジェクトのnewも対応してました。
         *  createElement等で動的生成すると、よろしくない
         * 
         * media-can-play-wav-audio.html
         * https://github.com/adobe/webkit/blob/master/LayoutTests/media/media-can-play-wav-audio.html
         * testExpected("audio.canPlayType('audio/wav; codecs=1')", "probably");
         * 
         * HTML5 audioタグ ブラウザ間の違い
         * http://wiki.bit-hive.com/tomizoo/pg/HTML5%20audio%A5%BF%A5%B0%20%A5%D6%A5%E9%A5%A6%A5%B6%B4%D6%A4%CE%B0%E3%A4%A4
         *  - volume, muted iPhone(iOS4-6)、Android(2.3.6)では動作せず。
         *  - FireFox3.6, Android 2.3.6については、src変更後、load()を呼び出さないと切り替わらなかった。iPhoneはload()が不要。
         */    
            detect : function( proxy, ext, hash ){
            // TODO hash.CBR
            // 得意度で返す
                proxy[ 'asyncDispatch' ]( { type : X_EVENT_COMPLETE, canPlay : X_Audio_codecs[ ext ] } );
            },
            
            klass : X_HTMLAudio
            
        } );

/*
 * 
 * howler.js
 *     codecs = {
      mp3: !!audioTest.canPlayType('audio/mpeg;').replace(/^no$/, ''),
      opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ''),
      ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ''),
      wav: !!audioTest.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ''),
      aac: !!audioTest.canPlayType('audio/aac;').replace(/^no$/, ''),
      m4a: !!(audioTest.canPlayType('audio/x-m4a;') || audioTest.canPlayType('audio/m4a;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      mp4: !!(audioTest.canPlayType('audio/x-mp4;') || audioTest.canPlayType('audio/mp4;') || audioTest.canPlayType('audio/aac;')).replace(/^no$/, ''),
      weba: !!audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, '')
    };
 */
    
};





