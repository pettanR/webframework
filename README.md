# pettanR/webframework

## バージョン履歴

### [0.6.200](https://github.com/pettanR/webframework/releases/tag/0.6.200)

バージョン `0.7.0` から、ブラウザ判定部分が [what-browser-am-i](https://github.com/itozyun/what-browser-am-i) に変わる為、`X.UA` オブジェクトのプロパティ名が変化しています。`0.7.0` を利用する場合、メインコード内で `X.UA` オブジェクトを使っている部分の変更が必要になります。大きな変更になるので初めてタグをつけました (^-^;)

~~~js
// Web browser is Internet Exproler 6 for desctop
X.UA.IE = 6;      // ~0.6.200
X.UA.Trident = 6; // 0.7.0+

// Web browser is Presto Opera 9 for desctop
X.UA.Opera = 9;  // ~0.6.200
X.UA.Presto = 9; // 0.7.0+
~~~

## Lisence

This code is released under the 3-clause BSD license.

このコードは、修正BSDライセンス(三条項BSDライセンス)でリリースされています．

---

Copyright (c) 2011~, [Team PettanR](https://github.com/pettanR)
