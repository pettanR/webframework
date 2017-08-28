/*
 * init_only,
 * always,
 * 
 * uinode によって指定可能な attr は異なる
 * + 直接 xnode.css() に渡す値
 * + uinode 内で加工してから xnode.css() に渡す値
 *    ChromeBox での css3 の fallback
 * + layoutManager で使う値
 *    x, y, gap, childW, childH など
 * + uinode で使う値
 *    mouseDisabled など
 */

X.UI = {
	
	currentRootData : null
};
