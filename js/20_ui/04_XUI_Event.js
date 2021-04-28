
var XUI_Event = X[ 'UI' ][ 'Event' ] = {

    INIT              : ++X_Event_last,
    ADDED             : ++X_Event_last,
    CREATION_COMPLETE : ++X_Event_last,
    REMOVED           : ++X_Event_last,

    LAYOUT_BEFORE     : ++X_Event_last,
    LAYOUT_COMPLETE   : ++X_Event_last,

    // http://d.hatena.ne.jp/edvakf/20100205/1265338487
    // http://d.hatena.ne.jp/uupaa/20100401/1270097629
    VIEW_IN           : ++X_Event_last, // 要素が視界に入った
    VIEW_OUT          : ++X_Event_last,

    POINTER_OUT       : ++X_Event_last,
    POINTER_IN        : ++X_Event_last,

    // FOCUS
    // DISABLED
    // ENABLED
    // BASE_FONT_SIZE_CHANGE

/* -- Pointing Device Event -- */
    _START_POINTER    : X_Event_last + 0.5,
    
    CONTEXT_MENU      : ++X_Event_last, // rightclick or longtouch or menukey or ctrl + click

/* -- ここよりあとはノード上をバブルアップ -- */
    _START_BUBLEUP    : X_Event_last + 0.5,

    // raw pointing device event
    _POINTER_DOWN     : ++X_Event_last,
    _POINTER_MOVE     : ++X_Event_last,
    _POINTER_UP       : ++X_Event_last,
    _POINTER_CANCEL   : ++X_Event_last,

    FILE_DRAG         : ++X_Event_last,
    FILE_DRAG_START   : ++X_Event_last,
    FILE_DRAG_END     : ++X_Event_last,
    FILE_HOLD         : ++X_Event_last,
    FILE_HOLD_END     : ++X_Event_last,
    FILE_DROP_BEFORE  : ++X_Event_last,
    FILE_DROP         : ++X_Event_last,
    FILE_DROP_CANCEL  : ++X_Event_last,

/* -- ここより後は X.UI 用のイベント -- */
    _START_XUI_EVENT  : X_Event_last + 0.5,

/* -- Mouse & Floating touch(Xperia sola)?? -- */
    HOVER_MOVE        : ++X_Event_last,
    HOVER_STAY        : ++X_Event_last,
    HOVER_STAY_END    : ++X_Event_last,
    WHEEL             : ++X_Event_last,

/* -- Gesuture Event -- */
    HOLD              : ++X_Event_last,
    HOLD_END          : ++X_Event_last,
    TAP               : ++X_Event_last,
    DOUBLE_TAP        : ++X_Event_last,
    DRAG              : ++X_Event_last,
    DRAG_START        : ++X_Event_last,
    DRAG_END          : ++X_Event_last,
    DRAG_UP           : ++X_Event_last,
    DRAG_RIGHT        : ++X_Event_last,
    DRAG_LEFT         : ++X_Event_last,
    DRAG_DOWN         : ++X_Event_last,
    SWIP              : ++X_Event_last,
    SWIP_UP           : ++X_Event_last,
    SWIP_RIGHT        : ++X_Event_last,
    SWIP_LEFT         : ++X_Event_last,
    SWIP_DOWN         : ++X_Event_last,
    TRANSFORM         : ++X_Event_last,
    TRANSFORM_START   : ++X_Event_last,
    TRANSFORM_END     : ++X_Event_last,
    PINCH             : ++X_Event_last,
    PINCH_IN          : ++X_Event_last,
    PINCH_OUT         : ++X_Event_last,
    ROTATE            : ++X_Event_last,

    _END_XUI_EVENT    : X_Event_last + 0.5,

    _END_POINTER      : X_Event_last + 0.5,
/* -- Pointing Device Event -- */

    KEY_DOWN          : ++X_Event_last,
    KEY_UP            : ++X_Event_last,
    KEY_HOLD          : ++X_Event_last,
    KEY_CANCEL        : ++X_Event_last,

    SCROLL_BEFORE_START : ++X_Event_last, // cancelable
    SCROLL_START        : ++X_Event_last,
    SCROLL_BEFORE_MOVE  : ++X_Event_last,
    SCROLL_MOVE         : ++X_Event_last,
    SCROLL_END          : ++X_Event_last,
    SCROLL_REFRESH      : ++X_Event_last,

    ANIME_BEFORE_START  : ++X_Event_last,
    ANIME_START         : ++X_Event_last,
    ANIME               : ++X_Event_last,
    ANIME_END           : ++X_Event_last,
    ANIME_BEFORE_STOP   : ++X_Event_last, // before cancel
    ANIME_STOP          : ++X_Event_last,

    PAGE_SHOW_BEFORE    : ++X_Event_last,
    PAGE_SHOW           : ++X_Event_last,
    PAGE_SHOW_AFTER     : ++X_Event_last,
    PAGE_HIDE_BEFORE    : ++X_Event_last,
    PAGE_HIDE           : ++X_Event_last,
    PAGE_HIDE_AFTER     : ++X_Event_last,

    // X.UI.Form
    CHANGE              : ++X_Event_last,
    SUBMIT              : ++X_Event_last,
    SELECT              : ++X_Event_last, // click or tap or enterkey
    
    ITEMDATA_CHANGED    : ++X_Event_last,
    
    IdToName : {},
    NameToID : {}
};

    XUI_Event.IdToName[ XUI_Event._POINTER_DOWN   ] = 'pointerdown';
    XUI_Event.IdToName[ XUI_Event._POINTER_UP     ] = 'pointerup';
    XUI_Event.IdToName[ XUI_Event._POINTER_MOVE   ] = 'pointermove';
    XUI_Event.IdToName[ XUI_Event._POINTER_CANCEL ] = 'pointercancel';



( function( IdToName, NameToID, p ){
    for( p in IdToName ){
        // if( X_EMPTY_OBJECT[ p ] ) continue;
        NameToID[ IdToName[ p ] ] = parseFloat( p );
    };
})( XUI_Event.IdToName, XUI_Event.NameToID );

