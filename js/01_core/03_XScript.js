var X_Script_VBS_ENABLED = ( X_UA.Win16 || X_UA.Win32 || X_UA.Win64 ) && ( X_UA.Trident ) < 11 && ( X_UA.IEHost !== 11 ), // IE11 emu では不可
	// 構文のサポート instanceof, in(for-in ではない), try-catch. JS version 1.5以上
    X_Script_gte15       = !( ( X_UA.Trident || X_UA.TridentMobile ) < 5.5 ) && ( new Function( 'f,a', 'try{return f.apply({},a)}catch(e){}' ) ),
    X_Script_ie6ExeComError;

/**
 * js バージョン間の差異を可能な限り吸収する
 * @namespace X.Script
 * @alias X.Script
 * @type {object}
 */
X[ 'Script' ] = {

	'tryIfSafe' : X_Script_try,
	
	/**
	 * Visual Basic Script が使えるか?
	 * @alias X.Script.VBS
	 * @type {boolean}
	 */
	'VBS'       : X_Script_VBS_ENABLED
	// git, strict mode, asm.js, 
};

if( X_Script_VBS_ENABLED ){
	
	X_Script_gte15 || document.write( '<script type=text/vbscript>' +
		[
			'Function vbs_testAXO(v)',
				'On Error Resume Next',
				'Set ax = CreateObject(v)',
				'If Err.Number Then',
					'ax = 1',
				'End If',
				'Err.Clear',
				'vbs_testAXO = ax',
			'End Function' /*,
			
			'Function vbs_try(jsFunc,a1,a2,a3,a4)',
				'On Error Resume Next',
				'Set rs = jsFunc(a1,a2,a3,a4)',
				'If Err.Number != 0 Then',
					'rs = 0',
				'End If',
				'Err.Clear',
				'vbs_try = rs',
			'End Function'
			
			// elementID .SRC = v
			'Function vbs_setValue(id,k,v)',
				'On Error Resume Next',
				'Set rs = 1',
				'Document.all[id][k]=v',
				'If Err.Number != 0 Then',
					'rs = 0',
				'End If',
				'Err.Clear',
				'vbs_try = rs',
			'End Function'

			* 
			* 
			* */
		].join( '\n' ) + '</script>' );

	// http://space.geocities.jp/nequomame/others/excelvba/excelvba_01_03.html
	// Document.ActiveElement に安全に触れるか？確認
	// そういえば error は iframe 内で起きていた
	// http://stackoverflow.com/questions/14378224/document-activeelement-in-iframe-shows-unspecified-error-in-ie-standards-mode
	// document.activeElement in iframe shows unspecified error in IE standards mode
	X_Script_gte15 || document.write( '<script type=text/vbscript>' +
		[
			'Function vbs_testAE()',
				'On Error Resume Next',
				'Set ae = Document.ActiveElement',
				'If Err.Number Then',
					'ae = 1',
				'End If',
				'Err.Clear',
				'vbs_testAE = ae',
			'End Function'
		].join( '\n' ) + '</script>' );

	// TODO Object のメンバを辿る vba
	// byte Array を扱う vba
};

/**
 * try-catch 構文が使えて安全に実行できるなら、コードを実行する
 * @alias X.Script.tryIfSafe
 * @param {funciton} func
 * @param {array=} 引数の入った配列
 */
function X_Script_try( func, args ){
	if( !X_Script_gte15 ){
		//return func.apply( {}, args );
		// window.onerror = return true を設定
		// vbs 側から呼び出し?
		return;
	};
	return X_Script_gte15( func, args || [] );
};

function X_Script_createActiveXObjectSafty( name ){
	if( !X_Script_gte15 ){
		if( X_Script_VBS_ENABLED ){
			// console.log( window[ 'vbs_testAXO' ]( name ) + ' ' + name );
			return !vbs_testAXO( name ) && X_Script_createActiveXObject( name );
		};
		return X_Script_createActiveXObject( name );
	};
	
	return X_Script_try( X_Script_createActiveXObject, [ name ] );
};

// TODO GeckoActiveX
function X_Script_createActiveXObject( name ){
	return new ActiveXObject( name );
};

/*
 * http://archiva.jp/web/html-css/ie6_background_flickr.html
 * hover時の背景画像ちらつきに対処する
 * この問題はIE6固有の問題であり、他のモダンブラウザやIE5等では発現しない。
 */
if( ( X_UA.Trident || X_UA.TridentMobile ) === 6 && // error @ NN7.2
	!X_Script_try( function(){ document.execCommand( 'BackgroundImageCache', false, true ); return 1; } ) ){
		/*
		 * ie6 のみで実行する document.execCommand( 'BackgroundImageCache', false, true ) の失敗。
		 * bonus: hotfix for IE6 SP1 (bug KB823727)
		 * multipleIEs IE6 standalone 版では不可, IE5.5 は可,,,
		 */
		X_Script_ie6ExeComError = true;
};


