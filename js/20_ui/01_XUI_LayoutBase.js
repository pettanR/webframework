var

XUI_State = {
        DEFAULT     : 0,
        HOVER       : 1,
        FOCUSED     : 2,
        DISABLED    : 4,
        CHECKED     : 8,
        FIRST_CHILD : 16,
        LAST_CHILD  : 32
},
    
XUI_Dirty = {
        CLEAN   : 0,
        PAINT   : 1, // 再描画のみ必要
        LAYOUT  : 2, // レイアウト（ボックスサイズ)の再計算が必要
        FONT    : 3, // フォントサイズが変更された
        CONTENT : 4  // コンテンツが変更された
},
    
XUI_LayoutBase = X_Class_create(
        'X.UI.Layout.Base',
        {
            overrideAttrsForSelf  : null,
            overrideAttrsForChild : null,
            calculate             : X_emptyFunction //function( data, isNeedsDetection, x, y, w, h )
        }
    );

X[ 'UI' ][ 'Layout' ] = {
    'create' : XUI_createLayout
};

function XUI_createLayout( props ){
    return X_Class_override( XUI_LayoutBase(), props, true );
}
