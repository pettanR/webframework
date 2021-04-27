/**
 * @namespace X.Logger
 * @alias X.Logger
 */
X.Logger = {
	_$LogArea : null,
	debug : function( msg ){
		X.Logger._output( msg, 0 );
	},
	info : function( msg ){
		X.Logger._output( msg, 1 );
	},
	warn : function( msg ){
		X.Logger._output( msg, 2 );
	},
	critical : function( msg ){
		X.Logger._output( msg, 3 );
	},
	_output : function( msg, level ){
		var body, $Area;
		if( X_EVENT_XDOM_READY <= X_ViewPort_readyState ){
			if( $Area = X.Logger._$LogArea ){
				$Area[ 'remove' ]();
				delete X.Logger._$LogArea;
			};
			
			
		} else
		if( X_EVENT_XDOM_READY <= X_ViewPort_readyState ){
			if( !( $Area = X.Logger._$LogArea ) ){
				$Area = X.Logger._$LogArea = X_Node( 'div' ).addToRoot( 0 );
			};
			$Area.add( '<p>' + msg + '</p>' );
		} else		
		if( console ){
			level === 0 ? console.debug( msg ) :
			level === 1 ? console.info( msg ) :
			level === 2 ? console.warn( msg ) :
			level === 3 ? console.warn( msg ) : console.warn( msg );
		} else {
			1 < level && alert( msg );
		};
	}
};
/*DEBUG、INFO、WARN、CRITICAL
emerg	サーバが稼動できないほどの重大なエラー
alert	critよりも重大なエラー
crit	重大なエラー
error	エラー
warn	警告
notice	通知メッセージ
info	サーバ情報
debug	デバック用の情報
*/

//console.log( 'X.Core.Log' );
