var X_TextRange_w3cSelection      = window.getSelection && getSelection(),
    X_TextRange_w3cRange          = document.createRange && document.createRange,
    X_TextRange_ieSelection       = document.selection,
    X_TextRange_ieRange           = !!X_TextRange_ieSelection,

    X_TextRange_canGetCursorPosition,
    X_TextRange_lazySelectTimerID,

    RangeFromSelection,
    RangeFromPoint,
    RangeFromIndex,
    LineRangeFromIndex,
    LineRangeFromPoint,
    LineRangeFromLast;