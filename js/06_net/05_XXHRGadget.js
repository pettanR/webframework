//{+xhrgadget"OpenSocialガジェット通信プロキシ"(クロスドメインは元よりクロスプロトコルな擬似xhr通信を可能にする)[+xhr]

/*
 * gadgets.io.makeRequest
 * 
 * 1. gadget-iframe を作る。指示を # で渡す。 元文書は frame 内の images の監視を開始する。
 *  1. 通信用 img の src
 *
 * 2. gadget-iframe が 通信用 img を作る。#ready
 * 
 * 3. 元文書が #ready を受け取ったら、iframe の # を書き換えて指示を送る。指示が長い場合、分割して送る。
 * 
 * 4. gadget-iframe は 通信用 img の # に結果を書く。コンテンツが長い場合、分割する。
 * 
 * 5. 元文書は結果を受け取ったことを gadget-iframe の # に書いて伝える。
 * 
 * 
 */

var X_GadgetXHR_canUse         = 5.5 <= X_UA[ 'IE' ] || !X_UA[ 'IE' ],
	
	X_GadgetXHR_iframeName     = 'gadgetProxy_' + ( Math.random() * 100000 | 0 ),
	
	X_GadgetXHR_GADGET_XML_URL = 'http://googledrive.com/host/0B4Y86MXyTfuoVUkwTE54T3V1V1U',
	
	// https://kldleov8fp2dl82hphfmor8riij82tof-a-sites-opensocial.googleusercontent.com/gadgets/ifr
	X_GadgetXHR_GADGET_URL     = 'http://www.ig.gmodules.com/gadgets/ifr?url=' + encodeURIComponent( X_GadgetXHR_GADGET_XML_URL ) + '&nocache=1',
	
	X_GadgetXHR_IMAGE_URL      = 'img/opacity0.gif',
	
	// https://code.google.com/p/xssinterface/source/browse/trunk/js/xssinterface.js
	X_GadgetXHR_maxQueryLength = X_UA[ 'IE' ] ? 2000 : 6000,
	
	X_GadgetXHR_requestBatches,
	
	X_GadgetXHR_requestOriginal,
	
	X_GadgetXHR_timerID,
	
	X_GadgetXHR_phase = 0,
	
	X_GadgetXHR_lastHashString,
	
	X_GadgetXHR_isReceiveBatches, X_GadgetXHR_receivedString = '';


function X_GadgetXHR_detectImageOverIframe(){
	var raw = X_GadgetXHR[ '_rawObject' ],
		iwin, frames, i, ret, n;
	
	if( raw ){
		iwin = raw.contentWindow || ( raw.contentDocument && raw.contentDocument.parentWindow ) || window.frames[ X_GadgetXHR_iframeName ];
		
		if( iwin && ( frames = iwin.frames ) && ( i = frames.length ) ){
			for( ; i; ){
				if( ret = X_Script_try( X_Object_find, [ frames[ --i ], 'location>hash' ] ) ) break;
			};
			if( ret && ret !== X_GadgetXHR_lastHashString ){
				X_GadgetXHR_lastHashString = ret;
				//console.log( ret.length );
				//console.log( '' + ret );
				
				switch( X_GadgetXHR_phase ){
					case 0 : // makeRequest
						iwin.location.href = X_GadgetXHR_GADGET_URL + '#' + X_GadgetXHR_requestBatches.shift();
						if( X_GadgetXHR_requestBatches.length ) return; //TODO boost
						break;
						
					case 1 : // after makeRequest > :ok 待ち
						iwin.location.href = X_GadgetXHR_GADGET_URL + '#_waiting_';
						break;

					case 2 : // _waiting_ 通信結果待ち
						// 分割受信モードか?
						ret = ret.substr( 1 );
						n   = parseFloat( ret );
						
						if( X_GadgetXHR_isReceiveBatches ){
							X_GadgetXHR_receivedString += X_GadgetXHR_decodeLocationHash( ret );						
							if( --X_GadgetXHR_isReceiveBatches ){
								iwin.location.href = X_GadgetXHR_GADGET_URL + '#_recived_' + X_GadgetXHR_isReceiveBatches;
								return;
							};
						} else
						if( 1 < n ){
							ret = ret.substr( ( n + ':' ).length );
							X_GadgetXHR_receivedString   = X_GadgetXHR_decodeLocationHash( ret );
							X_GadgetXHR_isReceiveBatches = --n;
							iwin.location.href = X_GadgetXHR_GADGET_URL + '#_recived_' + X_GadgetXHR_isReceiveBatches;
							// speedup
							X_GadgetXHR_timerID = X_Timer_add( 16, 0, X_GadgetXHR_detectImageOverIframe );
							return X_CALLBACK_UN_LISTEN;
						} else {
							X_GadgetXHR_receivedString = X_GadgetXHR_decodeLocationHash( ret );
						};

						X_GadgetXHR[ 'asyncDispatch' ]( X_JSON_parseTrustableString( X_GadgetXHR_receivedString ) );
						X_GadgetXHR_receivedString = '';
						//console.dir( e );

						X_GadgetXHR._busy = false;
						X_GadgetXHR_timerID = X_GadgetXHR_phase = 0;

						X_GadgetXHR_lastHashString = '';
						iwin.location.href = X_GadgetXHR_GADGET_URL + '#_recived_';
						
						return X_CALLBACK_UN_LISTEN;
				};
				++X_GadgetXHR_phase;
			};
		};
	};
};

// http://outcloud.blogspot.jp/2015/06/gecko-location-hash.html
function X_GadgetXHR_decodeLocationHash( str ){
	return X_UA[ 'Gecko' ] ? unescape( str ) : decodeURIComponent( str );
};

X_TEMP.X_GadgetXHR_init = function(){
	X_GadgetXHR = X_Class_override(
			X_Node_systemNode
				.create( 'iframe', {
					className         : 'hidden-iframe',
					name              : X_GadgetXHR_iframeName,
					id                : X_GadgetXHR_iframeName,
					src               : X_GadgetXHR_GADGET_URL + '#' + encodeURIComponent(
							X_JSON_stringify( {
								'img'  : X_URL_toAbsolutePath( X_GadgetXHR_IMAGE_URL ),
								'len'  : X_GadgetXHR_maxQueryLength,
								'itv'  : 333,
								'gck'  : X_UA[ 'Gecko' ] ? 1 : 0,
								'err'  : X_EVENT_ERROR,
								'suc'  : X_EVENT_SUCCESS
							} )
						),
					scrolling         : 'no',
					allowtransparency : 'no',					
					frameborder       : 0,
					tabindex          : -1
					} ),
			X_TEMP.X_GadgetXHR_props );
	
	delete X_TEMP.X_GadgetXHR_init;
	delete X_TEMP.X_GadgetXHR_props;	
	
	X_GadgetXHR_requestBatches = [];
	
	return X_GadgetXHR;
};

X_TEMP.X_GadgetXHR_props = {

		_busy         : false,
		_canceled     : false,
		_onloadCount  : 0,
		
		load : function( obj ){
			var req = {},
				k, max, sendStr, l, str;
			//createURL

			X_GadgetXHR_requestOriginal = obj;
			
			for( k in obj ){
				switch( k ){
					case 'url' :
					case 'postdata' :
					case 'method' :
					case 'dataType' :
					case 'headers' :
					case 'cashe' :
						req[ k ] = obj[ k ];
						break;
				};
			};
			
			max = X_GadgetXHR_maxQueryLength - X_GadgetXHR_GADGET_URL.length - 5;
			
			sendStr = /* X_JSON_stringify */X[ 'JSON' ].stringify( req );
			
			while( sendStr.length ){
				l   = max;
				str = encodeURIComponent( sendStr.substr( 0, l ) );
				while( max < str.length ){
					l   = l * ( 2 + l / str.length ) / 3 | 0;
					str = encodeURIComponent( sendStr.substr( 0, l ) );
					//console.log( l );
				};
				X_GadgetXHR_requestBatches.push( str );
				sendStr = sendStr.substr( l );
				str = '';
			};
			
			sendStr = '';
			
			if( 1 < X_GadgetXHR_requestBatches.length ){
				X_GadgetXHR_requestBatches[ 0 ] = X_GadgetXHR_requestBatches.length + ':' + X_GadgetXHR_requestBatches[ 0 ];	
			};
			
			X_GadgetXHR_timerID = X_Timer_add( 333, 0, X_GadgetXHR_detectImageOverIframe );
			
			X_GadgetXHR._busy = true;
		},
		
		cancel : function(){
			X_GadgetXHR._canceled = true;
		},
		
		reset : function(){
			X_GadgetXHR._busy = X_GadgetXHR._canceled = false;
			X_GadgetXHR._onloadCount = 0;
		}
	};

//}+xhrgadget