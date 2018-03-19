
/*
    WebAudio    : 1,
    HTMLAudio   : 2,
    Flash       : 3,
    Silverlight : 4,
    Unity       : 5,
    WMP         : 6,
    RealPlayer  : 7,
    QuickTime   : 8,
 */

var X_Audio_BACKENDS     = []; // Array.<Hash>

X_TEMP.onSystemReady.push(
    function(){
        var canPlay = X[ 'Audio' ][ 'canPlay' ] = {},
            i = X_Audio_BACKENDS.length,
            be;
        for( ; i; ){
            be = X_Audio_BACKENDS[ --i ];
            X_Object_override( canPlay, be.canPlay );
            X[ 'Audio' ][ be.backendName ] = be.backendID;
        };
    });

/**
 * <p>複数のオーディオ・バックエンドから、与えられた音声を再生可能なものを見つけ、音声を再生します。
 * <p>HTMLAudio の動作・機能がブラウザ毎にバラバラなのに業を煮やし、メソッドやイベントは独自に定義しています。
 * <h4>バックエンドの種類</h4>
 * <p>HTMLAudio, WebAudio, Silverlight, WMP
 * <h4>イベント</h4>
 * <dl>
 * <dt>X.Event.BACKEND_READY   <dd>音声(src リスト)を再生可能なバックエンドが見つかった。
 * <dt>X.Event.BACKEND_NONE    <dd>音声を再生可能なバックエンドが見つからなかった。Audio は kill されます。
 * <dt>X.Event.MEDIA_CAN_TOUCH <dd>モバイル端末の制約で音声の再生またはロードに、タッチを必要とする場合、タッチイベント内で play を呼び出す準備が出来たことを通知する。
 * <dt>X.Event.READY           <dd>再生可能、実際の状態は canplay から loadeddata まで様々、、、モバイル端末の場合、タッチして再生が開始された場合に
 * <dt>X.Event.ERROR           <dd><ul>
 *   <li> 1 : ユーザーによってメディアの取得が中断された
 *   <li> 2 : ネットワークエラー
 *   <li> 3 : メディアのデコードエラー
 *   <li> 4 : メディアがサポートされていない
 * </ul>
 * <dt>X.Event.MEDIA_PLAYING   <dd>再生中に1秒以下のタイミングで発生．currentTime が取れる?
 * <dt>X.Event.MEDIA_LOOP      <dd>ループ直前に発生、ｷｬﾝｾﾙ可能
 * <dt>X.Event.MEDIA_LOOPED    <dd>ループ時に発生
 * <dt>X.Event.MEDIA_ENDED     <dd>再生位置の(音声の)最後についた
 * <dt>X.Event.MEDIA_PAUSED    <dd>ポーズした
 * <dt>X.Event.MEDIA_WAITING   <dd>再生中に音声が待機状態に。
 * <dt>X.Event.MEDIA_SEEKING   <dd>シーク中に音声が待機状態に。
 * </dl>
 * <h4>ソースリストに与える url 文字列</h4>
 * <p>ハッシュフラグメント以下にデータを書くことで、各オーディオバックエンドが再生可能性の判断にあたって参考にするデータを渡すことができます。
 * <dl>
 * <dt>CBR=1<dd>audio が固定ビットレートであることを示す。Android 用 Opera12- は可変ビットレートの mp3 を正しくシークできない。
 * [ 'snd.mp3', 'snd.mp3#CBR=1' ] と指定すると、Android 用 Opera12- では CBR な mp3 が、他の環境ではよりファイルサイズの小さい VBR な mp3 が使用される。(未実装)
 * <dt>ext=mp3<dd>パスに拡張子が含まれない場合、または上書き指定したい場合に指定する
 * 
 * @alias X.Audio
 * @class 各種オーディオ機能をラップしインターフェイスを共通化する。
 * @constructs Audio
 * @extends {EventDispatcher}
 * @param {array|string} sourceList
 * @param {object=} opt_option
 * @example //
 * var audio = X.Audio( [ 'etc/special.mp3', 'etc/special.ogg', 'etc/special.wav' ] ).listenOnce( X.Event.READY, onReady );
 */
X[ 'Audio' ] = X_EventDispatcher[ 'inherits' ](
    'X.Audio',
    X_Class.NONE,
    {
        /**
         * 音声の url。X.Event.BACKEND_READY で設定される。
         * @alias Audio.prototype.source
         * @type {string}
         */
        'source'      : '',
        
        /**
         * 音声再生バックエンドの名前。X.Event.BACKEND_READY で設定される。
         * @alias Audio.prototype.backendName
         * @type {string}
         */
        'backendName' : '',

        'Constructor' : function( sourceList, opt_option ){
            X_Audio_startDetectionBackend(
                X_Audio_BACKENDS[ 0 ], this,
                X_Type_isArray( sourceList ) ? X_Array_copy( sourceList ) : [ sourceList ],
                opt_option || {} );
            this[ 'listenOnce' ]( [ X_EVENT_BACKEND_READY, X_EVENT_BACKEND_NONE, X_EVENT_KILL_INSTANCE ], X_Audio_handleEvent );
            X_ViewPort[ 'listenOnce' ]( X_EVENT_UNLOAD, this, X_Audio_handleEvent );
        },
        
        /**
         * 再生。開始位置・終了位置、ループの有無、ループ以降の開始位置、ループ以降の終了位置
         * @alias Audio.prototype.play
         * @param {number=} startTime 開始時間を ms で
         * @param {number=} endTime 終了時間を ms で
         * @param {boolean=} loop endTimeに達した際に曲をループさせるか
         * @param {number=} loopStartTime ループ以後の開始時間を ms で
         * @param {number=} loopEndTime ループ以後の終了時間を ms で
         * @return {Audio} メソッドチェーン
         */
        'play' : function( startTime, endTime, loop, loopStartTime, loopEndTime ){
            var pair = X_Pair_get( this );
            pair && pair.play( startTime, endTime, loop, loopStartTime, loopEndTime );
            return this;
        },
        /**
         * シーク、再生中で無い場合は次回再生開始位置の指定のみ
         * @alias Audio.prototype.seek
         * @param {number} seekTime シーク位置を ms で
         * @return {Audio} メソッドチェーン
         */
        'seek' : function( seekTime ){
            var pair = X_Pair_get( this );
            pair && pair.seek( seekTime );
            return this;
        },
        /**
         * ポーズ
         * @alias Audio.prototype.pause
         * @return {Audio} メソッドチェーン
         */
        'pause' : function(){
            var pair = X_Pair_get( this );
            pair && pair.pause();
            return this;
        },
        /**
         * 状態の getter と setter
         * @alias Audio.prototype.state
         * @param {object=} obj setter の場合、上書きする値を格納したobject
         * @return {Audio|object}
         * @example
audio.setState(
 {
    'startTime'     : 0,
    'endTime'       : 80000,
    'loopStartTime' : 120000,
    'loopEndTime'   : 200000,
    'currentTime'   : 0,
    'loop'          : true,
    'looded'        : false,
    'volume'        : 1,
    'autoplay'      : true
});
         */
        'state' : function( obj ){
            var pair = X_Pair_get( this );
            if( obj === undefined ){
                return pair ? pair.getState() :
                    {
                        'startTime'     : -1,
                        'endTime'       : -1,
                        'loopStartTime' : -1,
                        'loopEndTime'   : -1,
                        'currentTime'   : -1,
                        'loop'          : false,
                        'looded'        : false,
                        'error'         : 0,
                        'autoplay'      : false,
                        'playing'       : false,
                        'source'        : this[ 'source' ],
                        'duration'      : 0,
                        'volume'        : 0.5
                    };
            };
            pair && pair.setState( obj );
            return this;
        },        
        /**
         * ループの setter
         * @alias Audio.prototype.loop
         * @param {boolean} v 
         * @return {Audio}
         */
        'loop' : function( v ){
            var pair = X_Pair_get( this );
            pair && pair.loop( v );
            return this;
        },
        /**
         * ボリュームの setter 実装不十分！
         * @alias Audio.prototype.volume
         * @param {number} v 0～1
         * @return {Audio}
         */
        'volume' : function( v ){
            var pair = X_Pair_get( this );
            pair && pair.volume( v );
            return this;
        },
        /**
         * 再生位置のsetter。
         * @alias Audio.prototype.currentTime
         * @param {number} v msで
         * @return {Audio}
         */
        'currentTime' : function( v ){
            var pair = X_Pair_get( this );
            pair && pair.currentTime( v );
            return this;
        },
        /**
         * 再生中か？
         * @alias Audio.prototype.isPlaying
         * @return {boolean}
         */
        'isPlaying' : function(){
            var pair = X_Pair_get( this );
            return pair && pair.playing;
        }
        
    }
);

function X_Audio_handleEvent( e ){
    var backend, src, pair;
    
    switch( e.type ){
        case X_EVENT_BACKEND_READY :
            backend = X_Audio_BACKENDS[ e[ 'backendID' ] ];
        
            this[ 'unlisten' ]( X_EVENT_BACKEND_NONE, X_Audio_handleEvent );
            this[ 'source' ]      = e[ 'source' ];
            this[ 'backendName' ] = backend.backendName;
            
            X_Pair_create( this, backend.klass( this, e[ 'source' ], e[ 'option' ] ) );
            this[ 'listenOnce' ]( X_EVENT_READY, X_Audio_handleEvent );
            break;
        
        case X_EVENT_READY : // TODO AudioBase 側へ行かない?
            pair = X_Pair_get( this );
            ( pair.autoplay || pair._playReserved ) && pair.actualPlay();
            delete pair._playReserved;
            break;
        
        case X_EVENT_BACKEND_NONE :
        case X_EVENT_UNLOAD :
            this[ 'kill' ]();
            break;
        
        case X_EVENT_KILL_INSTANCE :
            X_ViewPort[ 'unlisten' ]( X_EVENT_UNLOAD, this, X_Audio_handleEvent );
            if( backend = X_Pair_get( this ) ){
                backend[ 'kill' ]();
                X_Pair_release( this, backend );
            };
            break;
    };
};


/*
 * TODO preplayerror play してみたら error が出た、backend の変更。
 */

function X_Audio_startDetectionBackend( backend, xaudio, sourceList, option ){
    var source = sourceList[ 0 ] || '',
        hash   = X_URL_paramToObj( X_URL_getHash( source ) ),
        ext    = hash[ 'ext' ] || X_URL_getEXT( source ),
        sup;
    
    if( source && backend ){
        sup      = [ xaudio, sourceList, option, source, ext ];
        sup[ 5 ] = sup;
        
        xaudio[ 'listenOnce' ]( X_EVENT_COMPLETE, backend, X_Audio_onEndedDetection, sup );
        backend.detect( xaudio, ext, hash );
    } else {
        xaudio[ 'asyncDispatch' ]( X_EVENT_BACKEND_NONE );
    };
};

function X_Audio_onEndedDetection( e, xaudio, sourceList, option, source, ext, sup ){
    var i = X_Audio_BACKENDS.indexOf( this ), _e, hash, backend;
    
    if( e.canPlay ){
        _e = {
            type          : X_EVENT_BACKEND_READY,
            'option'      : option,
            'source'      : source,
            'backendName' : this.backendName,
            'backendID'   : i
        };
        // WebAudio
        if( this.backendID === 1 ) _e[ 'needTouchForPlay' ] = /* X_WebAudio_need1stTouch && */ X_WebAudio_isNoTouch;
        // HTMLAudio
        if( this.backendID === 2 ) _e[ 'needTouchForLoad' ] = X_HTMLAudio_need1stTouch;

        xaudio[ 'asyncDispatch' ]( _e );            
    } else {
        console.log( 'No ' + source + ' ' + this.backendName );
        if( sup[ 3 ] = source = sourceList[ sourceList.indexOf( source ) + 1 ] ){
            hash     = X_URL_paramToObj( X_URL_getHash( source ) );
            sup[ 4 ] = ext    = hash[ 'ext' ] || X_URL_getEXT( source );
            xaudio[ 'listenOnce' ]( X_EVENT_COMPLETE, this, X_Audio_onEndedDetection, sup );
            this.detect( xaudio, ext, hash );
        } else
        if( backend = X_Audio_BACKENDS[ i + 1 ] ){
            X_Audio_startDetectionBackend( backend, xaudio, sourceList, option );
        } else {
            xaudio[ 'asyncDispatch' ]( X_EVENT_BACKEND_NONE );
        };                
    };
};



var X_AudioBase = X_EventDispatcher[ 'inherits' ](
    'X.AudioBase',
    X_Class.ABSTRACT,
    {
        dispatcher    : null,
        
        startTime     : 0,    // state_startTime
        endTime       : -1,   // state_startTime
        loopStartTime : -1,
        loopEndTime   : -1,
        seekTime      : -1,
        duration      : 0,    //

        playing       : false,
        error         : 0,    //        
        autoLoop      : false,
        looped        : false,
        autoplay      : false,//
        gain          : 0.5,
        
        _playReserved : false,
        
        play : function( startTime, endTime, loop, loopStartTime, loopEndTime ){
            if( 0 <= startTime ){
                this.setState( {
                    'currentTime'   : startTime,
                    'startTime'     : startTime,
                    'endTime'       : endTime,
                    'loop'          : loop,
                    'looped'        : false,
                    'loopStartTime' : loopStartTime,
                    'loopEndTime'   : loopEndTime
                } );
            };
            // canPlay() : autoplay = true
            this.actualPlay();
        },
        
        seek : function( seekTime ){
            if( seekTime < X_Audio_getEndTime( this ) ){
                this.setState( { 'currentTime' : seekTime } );
            };
        },
        
        pause : function(){
            this.seekTime = this.getActualCurrentTime();
            this.playing && this.actualPause();
            // delete this.autoplay
            // delete this.playing
        },        
        
        loop : function( v ){
            if( v === undefined ){
                return this.autoLoop;
            };
            this.setState( { 'loop' : v } );
        },

        volume : function( v ){
            if( v === undefined ){
                return this.gain;
            };
            this.setState( { 'volume' : v } );
        },

        currentTime : function( v ){
            if( v === undefined ){
                return this.playing ? this.getActualCurrentTime() : this.seekTime;
            };
            this.setState( { 'currentTime' : v } );
        },
        
        getState : function(){
            
            return {
                'startTime'     : this.startTime,
                'endTime'       : this.endTime < 0 ? this.duration : this.endTime,
                'loopStartTime' : this.loopStartTime < 0 ? this.startTime : this.loopStartTime,
                'loopEndTime'   : this.loopEndTime < 0 ? ( this.endTime || this.duration ) : this.loopEndTime,
                'loop'          : this.autoLoop,
                'looped'        : this.looped,
                'volume'        : this.gain,
                'playing'       : this.playing,                    
                'duration'      : this.duration,
                'autoplay'      : this.autoplay,
                
                'currentTime'  : this.playing ? this.getActualCurrentTime() : this.seekTime,
                'error'        : this.getActualError ? this.getActualError() : this.error
            };
        },
        
        setState : function( obj ){
            var playing = this.playing,
                k, v,
                end = 0, seek = 0, volume = 0;
            
            for( k in obj ){
                v = obj[ k ];
                switch( k ){
                    case 'currentTime'   :
                        v = X_Audio_timeStringToNumber( v );
                        if( X_Type_isNumber( v ) ){
                            if( playing ){
                                if( this.getActualCurrentTime() !== v ){
                                    seek = 2;
                                    this.seekTime = v;
                                };                                
                            } else {
                                this.seekTime = v;
                            };
                        } else {
                            continue;
                        };
                        break;
                            
                    case 'startTime'     :
                        v = X_Audio_timeStringToNumber( v );
                        if( v || v === 0 ){
                            if( this.startTime !== v ){
                                this.startTime = v;                    
                            };
                        } else {
                            delete this.startTime;
                        };
                        break;
                    
                    case 'endTime'       :
                        v = X_Audio_timeStringToNumber( v );
                        if( v || v === 0 ){
                            if( this.endTime !== v ){
                                this.endTime = v;
                                if( playing ) end = 1;                        
                            };
                        } else {
                            delete this.endTime;
                            if( playing ) end = 1;
                        };
                        break;
                        
                    case 'loopStartTime' :
                        v = X_Audio_timeStringToNumber( v );
                        if( v || v === 0 ){
                            if( this.loopStartTime !== v ){
                                this.loopStartTime = v;                    
                            };
                        } else {
                            delete this.loopStartTime;
                        };
                        break;
                        
                    case 'loopEndTime'   :
                        v = X_Audio_timeStringToNumber( v );
                        if( v || v === 0 ){
                            if( this.loopEndTime !== v ){
                                this.loopEndTime = v;
                                if( playing ) end = 1;                        
                            };
                        } else {
                            delete this.loopEndTime;
                            if( playing ) end = 1;
                        };
                        break;
        
                    case 'looped' :
                        if( X_Type_isBoolean( v ) && this.looped !== v ){
                            this.looped = v;
                            if( playing ) seek = 2;
                        };
                        break;
                        
                    case 'loop' :
                        if( X_Type_isBoolean( v ) && this.autoLoop !== v ){
                            this.autoLoop = v;
                        };
                        break;
                        
                    case 'autoplay' :
                        if( X_Type_isBoolean( v ) && this.autoplay !== v ){
                            this.autoplay = v;
                        };
                        break;
        
                    case 'volume' :
                        if( X_Type_isNumber( v ) ){
                            v = v < 0 ? 0 : 1 < v ? 1 : v;
                            if( this.gain !== v ){
                                this.gain = v;
                                // if playing -> update
                                if( playing ) volume = 4;
                            };
                        };
                        break;
                    case 'useVideo' :
                        break;
                    default :
                        alert( 'bad arg! ' + k );
                };
            };
            
            if( this.endTime < this.startTime ||
                ( this.loopEndTime < 0 ? this.endTime : this.loopEndTime ) < ( this.loopStartTime < 0 ? this.startTime : this.loopStartTime ) ||
                X_Audio_getEndTime( this ) < this.seekTime// ||
                //this.duration < this.endTime
            ){
                console.log( 'setState 0:' + this.startTime + ' -> ' + this.endTime + ' looped:' + this.looped + ' 1:' + this.loopStartTime + ' -> ' + this.loopEndTime );
                return;
            };
            
            v = end + seek + volume;
            return v && this.playing && this.afterUpdateState( v );
        }
        
    }
);


function X_Audio_timeStringToNumber( time ){
    var ary, ms, s = 0, m = 0, h = 0;

    if( X_Type_isNumber( time ) ) return time;
    if( !X_Type_isString( time ) || !time.length ) return;

    ary = time.split( '.' );
    ms  = parseFloat( ( ary[ 1 ] + '000' ).substr( 0, 3 ) ) || 0;
    
    ary = ary[ 0 ].split( ':' );
    if( 3 < ary.length ) return;
    
    switch( ary.length ){
        case 0 :
            break;
        case 1 :
            s = parseFloat( ary[ 0 ] ) || 0;
            break;
        case 2 :
            m = parseFloat( ary[ 0 ] ) || 0;
            s = parseFloat( ary[ 1 ] ) || 0;
            if( 60 <= s ) alert( 'invalid time string ' + time );
            break;
        case 3 :
            h = parseFloat( ary[ 0 ] ) || 0;
            m = parseFloat( ary[ 1 ] ) || 0;
            s = parseFloat( ary[ 2 ] ) || 0;
            if( 60 <= s ) alert( 'invalid time string ' + time );
            if( 60 <= m ) alert( 'invalid time string ' + time );
            break;
        default :
            alert( 'invalid time string ' + time );
    };
    ms = ( h * 3600 + m * 60 + s ) * 1000 + ms;
    return ms < 0 ? 0 : ms;
};

function X_Audio_getStartTime( audioBase, endTime, delSeekTime ){
    var seek = audioBase.seekTime;
    
    if( delSeekTime ) delete audioBase.seekTime;
    
    if( 0 <= seek ){
        if( audioBase.duration <= seek || endTime < seek ) return 0;
        return seek;
    };
    
    if( audioBase.looped && 0 <= audioBase.loopStartTime ){
        if( audioBase.duration <= audioBase.loopStartTime || endTime < audioBase.loopStartTime ) return 0;
        return audioBase.loopStartTime;
    };
    
    if( audioBase.startTime < 0 || audioBase.duration <= audioBase.startTime ) return 0;
    return audioBase.startTime;
};

function X_Audio_getEndTime( audioBase ){
    var duration = audioBase.duration;
    
    if( audioBase.looped && 0 <= audioBase.loopEndTime ){
        if( duration <= audioBase.loopEndTime ) return duration;
        return audioBase.loopEndTime;
    };
    
    if( audioBase.endTime < 0 || duration <= audioBase.endTime ) return duration;
    return audioBase.endTime;
};

