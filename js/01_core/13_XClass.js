
// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //
var
	/**
	 * 全てのクラスのスーパークラスのようなもの。(ライブラリ内にカプセル化されているため、ユーザが触ることはありません)<br>
	 * X.Class.create() で定義されたクラスのインスタンスが共通で備えるメソッド を確認してください。
	 * @class __ClassBase__
	 * @private
	 * @abstract
	 */
	__ClassBase__ = {
			/**
			 * クラス名
			 * @type {string}
			 */
			NAME         : ''
		},

	X_Class_CLASS_LIST         = [],
	X_Class_DEF_LIST           = [],
	X_Class_SUPER_CALLER       = [],
	X_Class_SUPER_STACKS       = [],
	X_Class_traits             = null,
	X_Class_useObjectCreate    = false, // !!Object.create, http://jsperf.com/prototype-vs-object-create-perf
	// Opera Mobile 12.10 Android11 IS01 でクラスのメンバが欠落する問題に遭遇。__proto__ を辞めると動作,,,
	X_Class_use_proto_         = !( X_UA.PrestoMobile && X_UA.Android ) &&
								// Android で原因不明のエラーに遭遇しているのは、この辺りが怪しい... 2016.3.9
								 !X_UA.AOSP && !X_UA.ChromeWebView &&
									!!X_emptyFunction.prototype.__proto__,
	X_Class_constructorFix     = X_UA.AOSP < 3 || ( X_UA.SafariMobile || X_UA.iOSWebView ) < 5, // WebKit < 533 が怪しい…
	X_Class_SEAL_KILLING       = [],

X_Class_CommonMethods =
/** @lends __ClassBase__.prototype */
{
	/**
	 * 全ての動的メンバを削除して、インスタンスを破棄する。<br>
	 * インスタンスが X.EventDispatcher とそのサブクラスの場合、次の動作をする。
	 * <ol>
	 * <li>X.Event.BEFORE_KILL_INSTANCE を発火する。戻り値のビットフラグに X.Callback.PREVENT_DEFAULT が立つ場合、破棄をキャンセルし X.Event.KILL_INSTANCE_CANCELED を発火する。この間に kill() が呼ばれても無視される。
	 * <li>破棄に進む場合は、X.Event.KILL_INSTANCE を発火する。
	 * <li>dispatch 中は、インスタンスの全ての dispatch が終了するまで実際の破棄を待つ。
	 * <li>実際の破棄では、インスタンスのメンバの削除に加えて全てのイベントリスナを解除する。
	 */
	// TODO kill したインスタンスのイベントが残っていないか？これは開発用のみ
	'kill' : function(){
		var listeners, flag, p, i, list, timers, def;
		
		// TODO 破棄済のインスタンスへの kill
		
		if( this[ 'instanceOf' ]( X_EventDispatcher ) ){

			listeners = this[ '_listeners' ];

			// SEAL のタイミングは、イベント中なので listeners が存在する
			if( listeners && X_Class_SEAL_KILLING.length && X_Class_SEAL_KILLING.indexOf( this ) !== -1 ) return;

			// listeners がない場合、イベントの登録がないため、BEFORE_KILL_INSTANCE は呼ばれない。
			// KILL_RESERVED　== true　の場合、BEFORE_KILL_INSTANCE は呼ばれない。
			if( listeners && !listeners[ X_LISTENERS_KILL_RESERVED ] && listeners[ X_EVENT_BEFORE_KILL_INSTANCE ] ){
				X_Class_SEAL_KILLING[ i = X_Class_SEAL_KILLING.length ] = this;
				
				if( this[ 'dispatch' ]( X_EVENT_BEFORE_KILL_INSTANCE ) & X_CALLBACK_PREVENT_DEFAULT ){
					this[ 'dispatch' ]( X_EVENT_KILL_INSTANCE_CANCELED );
					// BEFORE_KILL_INSTANCE, KILL_INSTANCE_CANCELED 内で kill() しても PREVENT_DEFAULT の場合はこれを無視する。
					flag = true;
				};
				
				X_Class_SEAL_KILLING.length === 1 ?
					( X_Class_SEAL_KILLING.length = 0 ) :
					X_Class_SEAL_KILLING.splice( X_Class_SEAL_KILLING[ i ] === this ? i : X_Class_SEAL_KILLING.indexOf( this ), 1 );

				if( flag ) return;
			};

			if( listeners = this[ '_listeners' ] ){// unlisten 等で listeners が破棄されている場合があるので取り直し。
				if( listeners[ X_LISTENERS_DISPATCHING ] ){
					listeners[ X_LISTENERS_KILL_RESERVED ] = true;
					return;
				};
				
				if( listeners[ X_EVENT_KILL_INSTANCE ] ){
					X_Class_SEAL_KILLING[ i = X_Class_SEAL_KILLING.length ] = this;

					listeners[ X_LISTENERS_KILL_RESERVED ] = false;					
					this[ 'dispatch' ]( X_EVENT_KILL_INSTANCE );
					
					X_Class_SEAL_KILLING.length === 1 ?
						( X_Class_SEAL_KILLING.length = 0 ) :
						X_Class_SEAL_KILLING.splice( X_Class_SEAL_KILLING[ i ] === this ? i : X_Class_SEAL_KILLING.indexOf( this ), 1 );
				};

				if( !( listeners = this[ '_listeners' ] ) ){
					for( p in listeners ){
						//if( X_EMPTY_OBJECT[ opt_type ] ) continue;
						if( p <= X_LISTENERS_KILL_RESERVED ) continue;
						list = listeners[ p ];
						for( i = list.length; i; ){
							this[ 'unlisten' ]( p, list[ --i ] );
						};
					};					
				};
			};

			if( this[ 'instanceOf' ]( X_Node ) ){
				// console.log( 'KILL : ' + this.call( 'outerHTML' ) );
				X_Node_onKill( this );
			};

			timers = X_EventDispatcher_LAZY_TIMERS;

			// asyncDispatch の削除
			for( p in timers ){
				if( timers[ p ] === this ){
					 // delete X_EventDispatcher_LAZY_TIMERS[ p ];　コレ不要
					X_Timer_remove( p );
				};
			};
		};
		
		X_Object_clear( this );
		
		def = X_Class_getClassDef( this );
		
		if( def.pool ){
			def.live.splice( def.live.indexOf( this ), 1 );
			def.pool[ def.pool.length ] = this;
		};
	},
	
	/**
	 * 関数は Constructor 内で使用します。クラス定義を辿ってスーパークラスのコンストラクタを呼び出します。<br>
	 * 内部的には、呼び出したコンストラクタは配列に控え(X_Class_CALLING_SUPER)、呼び出したコンストラクタ内でさらに Super が呼ばれた場合、配列を元にさらにスーパーなコンストラクタを辿ります。
	 * @example Constructor : function( arg1, arg2 ){
	 * 	this.Super( aeg1, arg2 );
	 * }
	 * @param var_args {...?} 親コンストラクタを呼ぶ際に渡す任意の数の引数
	 * @return {*}
	 */
	// TODO 現在 new しているインスタンスを保持してチェックする
	'Super' : function( var_args ){
		var me     = this,
			sClass = me.constructor,
			i      = X_Class_SUPER_CALLER.indexOf( me ),
			stack, t, def, ret;
	
		if( i === -1 ){
			X_Class_SUPER_CALLER[ i = X_Class_SUPER_CALLER.length ] = me;
			t = stack = X_Class_SUPER_STACKS[ i ] = 0;
		} else {
			t = stack = X_Class_SUPER_STACKS[ i ];
			
	        while( t ){
	        	sClass = X_Class_getClassDef( sClass ).SuperClass;
	            --t;
	        };			
		};

		while( sClass ){
			++t;
			sClass = X_Class_getClassDef( sClass ).SuperClass;
			if( !sClass ) break;
			def    = X_Class_getClassDef( sClass );
			
			if( def.Constructor ){
				X_Class_SUPER_STACKS[ i ] += t;
				ret = def.Constructor.apply( me, arguments );
				break;
			};
		};
		
		// index が替わっている可能性があるので取り直し
		if( X_Class_SUPER_CALLER[ i ] !== me ) i = X_Class_SUPER_CALLER.indexOf( me );
		
		if( X_Class_SUPER_STACKS[ i ] === stack ){
			//console.log( 'スーパークラス、またはスーパークラスのコンストラクタは存在しません' );
		};
		
		if( stack === 0 ){
			X_Class_SUPER_CALLER.splice( i, 1 );
			X_Class_SUPER_STACKS.splice( i, 1 );
		} else {
			X_Class_SUPER_STACKS[ i ] = stack;
		};
		return ret || me;
	},

	/**
	 * myFunc について、スーパークラスで設定されている同名の関数を呼び出す。<br>
	 * 低速な関数なので多用されるべきではありません！<br>
	 * 第一引数に自身の(自身から参照できる)関数を指定します。内部では関数名を調べた上で prototype チェーンをゴリゴリ辿る、特別なことはしていません。<br>
	 * superCall と Super がネストする場合も現在のクラス階層を X_Class_SUPER_CALLER, X_Class_SUPER_STACKS を使って控えているので、意図した親関数が呼ばれます。<br>
	 * 次の理由によって、関数名で辿ることは非推奨です。
	 * <ol>
	 * <li>closur compiler でメソッド名が変更される
	 * </ol>
	 * 次の場合、意図した動作が得られません。
	 * <ol>
	 * <li>2つ以上の異なる名前で同じ関数がメンバーがいた場合
	 * <li>サブクラスの prototype にスーパークラスと同じ関数をコピーしている
	 * <li>非関数でメンバーを上書きしている
	 * <li>superCall 以外の手段で親関数を呼び、そのなかで superCall を呼んだ
	 * </ol>
	 * 通常の X.Class.create の書き方ではこのような状況は起きませんが、js はなんでもいろいろ出来てしまいますから…<br>
	 * 参考:<a href="http://qiita.com/no22@github/items/d3bead2acbb7ff1fb86b" target="_blank">ES5なJavascriptでモダンなクラス的継承＆スーパー呼び出し</a><br>
	 * original:<a href="http://javascript.crockford.com/inheritance.html" target="_blank">Classical Inheritance in JavaScript</a>
	 * @param myFunc {Function|string} オーバーライド済の自身の(自身から参照できる)関数。
	 * @param var_args {...*} オーバーライド元関数に渡す任意の数の引数
	 * @example return this.superCall( this.myFunc, param0, param1, ... );
	 * @return {*} オーバーライド元の関数を呼び出した戻り値。
	 */
	'superCall' : function( myFunc, var_args ){
		var me     = this,
			sClass = me.constructor,
			proto  = sClass.prototype,
			i      = X_Class_SUPER_CALLER.indexOf( me ),
			args   = arguments,
			p, name, stack, t, sFunc, ret;

		if( X_Type_isFunction( myFunc ) ){
			for( p in proto ){
				if( proto[ p ] === myFunc ){
					name = p;
					break;
				};
			};
			if( !name ) return;
		} else
		if( X_Type_isString( myFunc ) && X_Type_isFunction( me[ myFunc ] ) ){
			name = myFunc;
		} else {
			return;
		};
			
		if( i === -1 ){
			X_Class_SUPER_CALLER[ i = X_Class_SUPER_CALLER.length ] = me;
			t = stack = X_Class_SUPER_STACKS[ i ] = 0;
		} else {
			t = stack = X_Class_SUPER_STACKS[ i ];
			
	        while( t ){
	        	sClass = X_Class_getClassDef( sClass ).SuperClass;
	            --t;
	        };			
		};

        if( sClass ){
        	myFunc = sClass.prototype[ name ];

			while( sClass ){
				++t;
				sClass = X_Class_getClassDef( sClass ).SuperClass;	
				sFunc  = sClass.prototype[ name ];
				
				if( sFunc !== myFunc /* X_Object_own( name, sClass.prototype ) */ ){
					if( X_Type_isFunction( sFunc ) ){
						X_Class_SUPER_STACKS[ i ] += t;
						switch( args.length ){
							case 1 :
								ret = sFunc.call( me );
								break;
							case 2 :
								ret = sFunc.call( me, args[ 1 ] );
								break;
							case 3 :
								ret = sFunc.call( me, args[ 1 ], args[ 2 ] );
								break;
							case 4 :
								ret = sFunc.call( me, args[ 1 ], args[ 2 ], args[ 3 ] );
								break;
							default :
								args = X_Array_copy( args );
								args.shift();
								ret = sFunc.apply( me, args );
								break;							
						};
					};
					break;
				};
			};
		};

		// index が替わっている可能性があるので取り直し
		if( X_Class_SUPER_CALLER[ i ] !== me ) i = X_Class_SUPER_CALLER.indexOf( me );

		if( stack === 0 ){
			X_Class_SUPER_CALLER.splice( i, 1 );
			X_Class_SUPER_STACKS.splice( i, 1 );
		} else {
			X_Class_SUPER_STACKS[ i ] = stack;
		};
		return ret;
	},
	
	/**
	 * インスタンスのクラスか？またはスーパークラスか？調べる。<br>
	 * instanceof 構文をサポートしない環境(IE5以下)を想定する場合、必ずこのメソッドを使用すること。<br>
	 * クラスのインスタンスか？だけ調べたい場合は this.constructor === klass が高速。
	 * @param klass {__ClassBase__} クラス定義
	 * @return {boolean}
	 */
	// TODO instanceof に対応したブラウザはそちらを使用
	'instanceOf' : function( klass ){
		var Super = this;

		if( this.constructor === klass ) return true;
		while( Super = X_Class_getClassDef( Super ).SuperClass ){
			if( Super === klass ) return true;
		};
		return false;
	}
};

// ------------------------------------------------------------------------- //
// --- interface ----------------------------------------------------------- //
// ------------------------------------------------------------------------- //

/*
 * @enum {number}
 * @const
 */
var X_Class = {
	NONE         :  0,
	POOL_OBJECT  :  1,
	ABSTRACT     :  2,
	FINAL        :  4,
	SINGLETON    :  8
};

/**
 * <p>Class を定義し システムの管理下に置く。
 * <p>prototype 継承のブラウザ毎の差異も吸収し、 以下から最適な方法をしてくれる。
 * 
 * <ol>
 * <li>Object.create はパフォーマンスが悪そうなので現在は使っていない。
 * <li>SubClass.prototype.__proto__ = SuperClass.prototype;
 * <li>SubClass.prototype = new SuperClass;
 * </ol>
 * 
 * <ol>
 * <li>X.Class.create( opt_settings, opt_name, opt_props ) でクラスを登録．
 * <li>コンストラクタ となるメソッドは、opt_props 内の Constructor : function( arg ){ ... }, に書く．
 * <li>通常通り new で インスタンス生成
 * <li>kill() でオブジェクトをクリーンして削除、pool が有効の場合は pool される．
 * <li>pool が有効の場合、new で pool されたインスタンスが返される．
 * </ol>
 * @namespace X.Class
 * @alias X.Class
 */ 
X[ 'Class' ] = /** @lends X.Class */ {

    /**
     * 設定なし。
     * @const
     */	
	'NONE'         : X_Class.NONE,
	
	// TODO この指定、フレームワーク内だけ！
    /**
     * インスタンスは破棄時(this.kill())に回収され、次回の new MyClass() 時に再利用されます。
     * @const
     */
	'POOL_OBJECT'  :  X_Class.POOL_OBJECT,
	
	/**
	 * 定義するクラスは抽象クラスになります。new AbstractClass() とするとエラーになります。
	 * @const
	 */
	'ABSTRACT'     :  X_Class.ABSTRACT,

	/**
	 * クラスの継承を禁止する。
	 * @const
	 */
	'FINAL'        :  X_Class.FINAL,

	/**
	 * 未実装。でも目印になるので付けておきましょう。
	 * @const
	 */
	'SINGLETON'    : X_Class.SINGLETON,

	'create'       : X_Class_create
	
	// TODO collect
};



// ------------------------------------------------------------------------- //
// --- implements ---------------------------------------------------------- //
// ------------------------------------------------------------------------- //
	/**
	 * クラスを定義する。<br>
	 * X.Class.create() によるクラス定義は必ずしもコンストラクタ('Constructor')を必要としません。クラス定義時にコンストラクタが未設定の場合、スーパークラスがあればそのコンストラクタを使用します。
	 * @alias X.Class.create
	 * @param {string} [displayName] クラスの名前
	 * @param {number} [classSetting=0] X_Class.POOL_OBJECT | X_Class.FINAL など
	 * @param {object} [props={}] このクラスのメンバと関数。コンストラクタは Constructor と書くこと
	 * @return {__ClassBase__}
	 * @example var myClass = X.Class.create(
	 * 	'myClass',
	 *  X.Class.FINAL,
	 *  {
	 * 	 name : '',
	 * 	 Constructor : function( obj ){
	 * 	  this.name = obj.name;
	 * 	 },
	 * 	 getName : function(){
	 * 	  return this.name;
	 * 	 },
	 * 	 setName : function(v){
	 * 	  this.name = v;
	 * 	 }
	 *  }
	 * );
	 */
	function X_Class_create( /* displayName, classSetting, privateClass, props */ ){
		var args        = X_Array_copy( arguments ),
			displayName = args[ 0 ],
			classSetting,
			opt_pool, opt_abstract, opt_final,
			privateDef,
			props,
			klass,
			classDef = {},
			cbHash = { proxy : X_Class_actualConstructor, classDef : classDef };

		if( X_Type_isString( displayName ) ){
			classDef.displayName = displayName;
			args.shift();
		};
		
		// クラス設定
		classDef.setting = classSetting = args[ 0 ];
		if( X_Type_isNumber( classSetting ) ){
			opt_pool     = !!( classSetting & X_Class.POOL_OBJECT  );
			opt_abstract = !!( classSetting & X_Class.ABSTRACT     );
            opt_final    = !!( classSetting & X_Class.FINAL        );
            if( X_IS_DEV ){
                if( opt_final && opt_abstract ){
                    X_error( 'X.Class : final & Abstract!' );
                    return;
                };
            };
			args.shift();
		} else {
			classDef.setting = 0;
		};
		
		// インスタンスのメンバー
		props = args[ 0 ];
		if( !X_Type_isObject( props ) ){
			// クラスメンバ用オブジェクトが無しでもクラスは作成可能
			props = {};
		} else
		if( props[ 'Constructor' ] ){
			if( X_IS_DEV ){
                if( !X_Type_isFunction( props[ 'Constructor' ] ) ){
                    X_error( 'X.Class : "Constructor" is not function. displayName=' + classDef.displayName );
                    return;
                };
            };
			classDef.Constructor = props[ 'Constructor' ];
		};

		klass  = X_Closure_actualClosure( cbHash ); // TODO callbackHash を class定義の置き場所にしてしまう！なるほど…
		cbHash.klass = klass;
		klass[ 'superClassOf' ] = X_Class_superClassOf;
		klass[ 'subClassOf' ]   = X_Class_subClassOf;
		
		if( X_Class_useObjectCreate ){
			klass.prototype = X_Class_override( X_Class_override( X_Class_traits || klass.prototype, props, true ), X_Class_CommonMethods, false );
			klass.prototype.constructor = klass;
		} else
		if( X_Class_use_proto_ ){
			X_Class_override( klass.prototype, props, true );
			if( X_Class_traits ){
				klass.prototype.__proto__ = X_Class_traits;
			} else {
				X_Class_override( klass.prototype, X_Class_CommonMethods, false );
			};
		} else {
			klass.prototype = X_Class_override( X_Class_override( X_Class_traits || klass.prototype, props, true ), X_Class_CommonMethods, false );
			klass.prototype.constructor = klass;
		};
		
		klass[ 'NAME' ] = displayName;
		
		if( opt_abstract ){
			classDef.isAbstract = true;
		} else
		if( opt_pool ){
			classDef.pool = [];
			classDef.live = [];
		};			
		if( opt_final ){
			classDef.Final = true;
		} else {
			klass[ 'inherits' ] = X_Class_inherits;
		};			
		
		X_Class_CLASS_LIST.push( klass );
		X_Class_DEF_LIST.push( classDef );				

		return klass;
	};



function X_Class_getClass( instance ){
	var cList = X_Class_CLASS_LIST, i;
	
	if( ( i = cList.indexOf( instance.constructor ) ) !== -1 ) return cList[ i ];
	if( cList.indexOf( instance ) !== -1 ) return instance;
};

// TODO def = klass( X_Closure_COMMAND_BACK )
function X_Class_getClassDef( KlassOrInstance ){
	var i = X_Class_CLASS_LIST.indexOf( KlassOrInstance );
	if( i === -1 ) i = X_Class_CLASS_LIST.indexOf( X_Class_getClass( KlassOrInstance ) );
	if( i !== -1 ) return X_Class_DEF_LIST[ i ];
	
	if( X_Class_DEF_LIST.indexOf( KlassOrInstance ) !== -1 ) return KlassOrInstance;
};

/* src のプロパティを target にコピーする．ただし target の プロパティが優先, force で解除 */
function X_Class_override( target, src, force ){
	var p;
	for( p in src ){
        if( p === 'Constructor' ) continue;
        if( X_IS_DEV ){
            if( p === '__proto__' || p === 'prototype' || p === 'constructor' ){
                X_error( 'X.Class.override : ' + p + ' is reserved!' );
                return;
            };
        };
		if( force || target[ p ] === undefined ){
			target[ p ] = src[ p ];
		};
	};
	return target;
};

/**
 * スーパークラスか？調べます。
 * @alias __ClassBase__.superClassOf
 * @param klass {__ClassBase__}
 * @return {boolean}
 */
function X_Class_superClassOf( klass ){
	var myDef      = X_Class_getClassDef( this ),
		targetDef  = X_Class_getClassDef( klass ),
		SuperClass = klass;

	if( !myDef || !targetDef || this === klass ) return false;
	
	while( SuperClass = X_Class_getClassDef( SuperClass ).SuperClass ){
		if( SuperClass === this ) return true;
	};
	
	return false;
};

/**
 * サブクラスか？調べます。
 * @alias __ClassBase__.subClassOf
 * @type {Function}
 * @param klass {__ClassBase__}
 * @return {boolean}
 */
function X_Class_subClassOf( klass ){
	return klass && X_Class_superClassOf.call( klass, this );
};
			
/**
 * サブクラスを作ります。与える引数は X_Class.create と同じです。http://d.hatena.ne.jp/m-hiyama/20051018/1129605002
 * @alias __ClassBase__.inherits
 * @example var SubClass = SuperClass.inherits( 'Sub', X_Class.FINAL, { ... } );
 * @param {string} [displayName] クラスの名前
 * @param {number} [classSetting=0] X_Class.POOL_OBJECT | X_Class.FINAL など
 * @param {object} [props={}] このクラスのメンバと関数。コンストラクタは Constructor と書くこと
 * @return {__ClassBase__}
 */
function X_Class_inherits( /* displayName, classSetting, props */ ){
	var args        = X_Array_copy( arguments ),
		params      = [],
		Super       = this,
		superDef    = X_Class_getClassDef( Super ),
		displayName = args[ 0 ],
		classSetting,
		//opt_super,
        klass, def;
    
    if( X_IS_DEV && superDef.Final ){
        return X_error( 'X.Class inherits, Class is final!' );
    };
	
	// サブクラス名
	if( X_Type_isString( displayName ) ){
		args.shift();
	} else {
		displayName = 'SubClass of ' + superDef.displayName;
	};
	params.push( displayName );
	
	// サブクラス設定
	classSetting = args[ 0 ];
	if( X_Type_isNumber( classSetting ) ){
		args.shift();
	} else {
		// クラス設定がない場合、親からコピーして、Abstract flag は落とす??
		classSetting = superDef.setting;// &= ~X_Class.ABSTRACT;
	};

	params.push( classSetting );

	// サブクラスのシャドウ
	if( args[ 0 ] && X_Class_getClass( args[ 0 ] ) ){
		params.push( args.shift() );
	};
	
	/* props 未定義でも可 */
	params.push( args[ 0 ] );
	
	// 継承クラスの作成
	if( X_Class_useObjectCreate ){
		X_Class_traits = Object.create( Super.prototype );
	} else
	if( X_Class_use_proto_ ){
		X_Class_traits = Super.prototype;
	} else {
		X_Class_traits = new Super( X_Closure_COMMAND_DROP );
	};
	klass  = X_Class_create.apply( X.Class, params );
	X_Class_traits = null;
	
	def    = X_Class_getClassDef( klass );
	// 継承用プロパティを控える
	def.SuperClass       = Super;
	//def.SuperProto       = Super.prototype;
	//def.SuperConstructor = superDef.Constructor || superDef.SuperConstructor;
	
	return klass;
};
	
/*
 * new の実体．コンストラクタの機能は instance.Constructor に書く．
 * これにより pool された オブジェクト（破棄されたインスタンス） を再利用できる
 */
function X_Class_actualConstructor( f, args ){
	var klass    = f.klass,
		def      = f.classDef,
		instance, obj;

	if( X_IS_DEV && def.isAbstract ){
		X_error( 'AbstractClass!' );
		return;
	};
	
	instance = def.pool && def.pool.length ?
					def.pool.pop() :
				X_Class_useObjectCreate ?
					Object.create( klass.prototype ) :
					new klass( X_Closure_COMMAND_DROP );

	def.live && def.live.push( instance );

	if( X_Class_constructorFix && instance.constructor !== klass ){
        if( X_IS_DEV ){
            console.log( '------- constructor の不一致!' ); // Android2.3.7
        };
		instance.constructor = klass;
	};

	obj = def.Constructor ?
			def.Constructor.apply( instance, args ) :
			def.SuperClass && instance[ 'Super' ].apply( instance, args );

	if( obj !== instance && ( X_Type_isObject( obj ) || X_Type_isFunction( obj ) ) ){ // Class
		instance[ 'kill' ]();
		return obj;
	};
	
	return instance;
};
