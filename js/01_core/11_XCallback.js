
// ------------------------------------------------------------------------- //
// ------------ local variables -------------------------------------------- //
// ------------------------------------------------------------------------- //

var X_CALLBACK_NONE             =  0,
	X_CALLBACK_UN_LISTEN        =  1,
	X_CALLBACK_STOP_PROPAGATION =  2,
	X_CALLBACK_STOP_NOW         =  4 | 2,
	X_CALLBACK_PREVENT_DEFAULT  =  8,
	X_CALLBACK_CAPTURE_POINTER  = 16,
	X_CALLBACK_RELEASE_POINTER  = 32,
	X_CALLBACK_SYS_CANCEL       = 64 | 4 | 2;

/**
 * X.Timer と X.EventDispaｔcher からのコールバックの返り値を定義。
 * @namespace X.Callback
 */
X[ 'Callback' ] = {
	/**
	 * このコールバックでは返り値による操作は無い。
	 * @alias X.Callback.NONE
	 */
	'NONE'             : X_CALLBACK_NONE,
	/**
	 * X.Timer, X.EventDispaｔcher のコールバックでタイマーやイベントリスナの解除に使用。
	 * @alias X.Callback.UN_LISTEN
	 */
	'UN_LISTEN'        : X_CALLBACK_UN_LISTEN,
	/**
	 * 上位階層へのイベント伝播のキャンセル。DOM イベントのコールバックの戻り値に指定すると e.stopPropagation() が呼ばれる。
	 * @alias X.Callback.STOP_PROPAGATION
	 */
	'STOP_PROPAGATION' : X_CALLBACK_STOP_PROPAGATION,
	/**
	 * 以降のイベントのディスパッチを中断する。STOP_PROPAGATION との違いは、次に控えているコールバックもキャンセルされる点。但し system によって追加されたイベントはキャンセルされない。
	 * @alias X.Callback.STOP_NOW
	 */
	'STOP_NOW'         : X_CALLBACK_STOP_NOW,
	/**
	 * DOM イベントのコールバックの戻り値に指定すると e.preventDefault() が呼ばれる。
	 * またフレームワーク内で定義されたデフォルト動作の回避にも使用される。
	 * @alias X.Callback.PREVENT_DEFAULT
	 */
	'PREVENT_DEFAULT'  : X_CALLBACK_PREVENT_DEFAULT,
	/**
	 * X.UI の uinode でポインターイベントの戻り値に指定すると、以降のポインターベントを独占する。
	 * @alias X.Callback.CAPTURE_POINTER
	 */
	'CAPTURE_POINTER'  : X_CALLBACK_CAPTURE_POINTER,
	/**
	 * X.UI の uinode でポインターイベントの戻り値に指定すると、以降のポインターベントを独占を解除する。
	 * @alias X.Callback.RELEASE_POINTER
	 */
	'RELEASE_POINTER'  : X_CALLBACK_RELEASE_POINTER
};

console.log( 'X.Core.Callback' );

