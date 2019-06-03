

var FocusUtility_lastElmFocused;
var FocusUtility_docActiveElmSupport = X_UA[ 'IE' ] || document.activeElement !== undefined;
var FocusUtility_fixActiveElm;

// http://www.codingforums.com/javascript-programming/19503-determining-focus-ns6-ie6-context-sensitive-help.html
// https://developer.mozilla.org/ja/docs/Web/API/Document/activeElement
// IE 4+, Chrome 2+, Safari 4+, Firefox 3+ Opera 9.6+

function FocusUtility_getFocusedElement(){
	return FocusUtility_fixActiveElm ||
		(
			X_Script_gte15 ?
				X_Script_try( X_Object_find, [ document, 'activeElement' ] ) :
				// ieは iframe 内で focus がない場合に activeElement に触ると エラーになる
				// VBS 経由で activeElement に触り安全確認する
				( window[ 'vbs_testAE' ]() && document.activeElement )
		);
};

/*
 * 通常の focus は xnode.call('focus') を使う.
 * フレームワーク内部で API の実行のために一時的に focus を当てたい場合に使う.focus の復帰は自動で行われる
 */
function FocusUtility_setTemporarilyFocus( elm ){
	var elmActive = FocusUtility_getFocusedElement();
	
	if( elmActive !== elm ){
		X_EventDispatcher_ignoreActualEvent = true; // ignoreAllEvent focus, blur
		elm.focus();
		X_EventDispatcher_ignoreActualEvent = false;
		if( !FocusUtility_lastElmFocused ){
			FocusUtility_lastElmFocused = elmActive;
			// ie5(IE11のエミュレーション) でしばしば空なんですけど...
			elmActive && ExecuteAtEnd_add( FocusUtility_restoreFocus );
		};
	};
};

// こっそり復帰
function FocusUtility_restoreFocus(){
	var elmActive = FocusUtility_getFocusedElement(),
		elm = FocusUtility_lastElmFocused;

	if( elmActive !== elm ){
		X_EventDispatcher_ignoreActualEvent = true;
		elm.focus();
		X_EventDispatcher_ignoreActualEvent = false;
	};
	FocusUtility_lastElmFocused = null;
};
