# ぺったんRの JSONDB API

indexedDB をベースに、WebSQL, localStorage 等でフォールバックする

indexedDB のサブセットで、Date や Blob 等は使えない。undefined は null で扱う。

X_DEFINE_JSONDB_LEVEL 指定で段階的に使える API や引数が増える。プロジェクトに最良の機能のインポートに留めることが出来る。

level:1 は非同期化した localStorage 相当とする。殆どのアプリケーションはこれで十分でコードを最小に出来る。

ブラウザのアップデートによる localStorage -> indexedDB 等の DB の移行はどうする？

## indexedDB について

indexedDB は localStorage を非同期化した上で、値に Blob 等を認め、検索用の API をいくつか追加した DB です。

~~~js
X.JSONDB.exist( 'user-settings' )
        .listen( X.Event.COMPLETE, function( e ){
            if( e.error ){

            } else {
                e.result;
            };
        } );
~~~

~~~js
var jsonDB = X.JSONDB(
        'kb-settings', // JSONDB 名
        1, // version
        'desc', // description WebSQL でだけ使用
        64, // db size, WebSQL でだけ使用
        { // 各JSONオブジェクトストアの定義
            'settings' : { // store 名
                keyPath       : 'uid',
                autoIncrement : true,
                indexes       : [
                    {
                        indexName  : 'custmer',
                        keyPath    : '' || [ '', '' ],
                        unique     : Boolean,
                        multiEntry : Boolean
                    }
                ]
            }
        }
    ).listen( X.Event.NEED_UPGRADE, function( e ){
        jsonDB || e.target;
        if( e.oldVersion === 1 ){
            jsonDB.deleteJsonStore( 'old' );
            jsonDB.createIndexOf( 'settings', 'custmer' );
            jsonDB.deleteIndexOf( 'settings', 'custmer' );
            jsonDB.createJsonStore( 'settings' );
        };
    } ).listen( X.Event.READY, function( e ){
        // opened.
    } );

jsonDB.drop()
      .listen( X.Event.COMPLETE, function( e ){
          if( e.error ){

          } else {

          };
      } );


var tr = jsonDB.createTransaction( 'settings' )
      .$get( key1, options1 )
      .$get( key2, options2 )
      .listen( X.Event.SUCCESS, function( e ){ // Action 毎に呼び出される. そのアクションに対する SUCCESS かは
          e.transactionIndex; // : 0 || 1;
          e.result;           // : {}, [], String, Number, Boolean, null. key が存在しない場合は result メンバーが居ない、つまり e.result === undefined
          tr.$abort(); // e.target.$abort();
      } );

jsonDB.createTransaction( [ 'settings', 'other' ] ) // JSONオブジェクトストア名、複数ストアを指定できる
      .$add( 'settings' || 0, value, opt_key, options )   // readonly or readwrite は transaction 側で判断する。
      .$add( 'other'    || 1, value, opt_key, options )   // 現在のコールスタック内でだけアクションを追加できる。これ以降に追加の場合はエラーになる -> DEV 版のみ
      .listen( X.Event.COMPLETE );

jsonDB.createTransaction( 'custmer_table' )
    .cursorByIndex( 'custmerNameAndAge', [ '山本', 29 ] )
    .listen( X.Event.SUCCESS, function(){
        //最初カーソルができたときもadvanceでカーソルが進んだときも呼ばれるイベントハンドラ
        if(req.result==null){
        //IDBRequestのresultがnullのときは、もうデータがない
        console.log("終了しました。");
        }else{
        //IDBRequestのresultはIDBCursorWithValueである
        var cursor = req.result;
        console.log(cursor.value);	//そのレコードを表示
        //次のレコードに進む
        cursor.advance(1);
        }
    } )
    .listen( X.Event.COMPLETE, );
~~~

## indexedDB バックエンドの未実装

* [MDN IndexedDB API基本的な概念](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB#gloss_outofline_key) 注記: この定義は直近の仕様書で説明されており、最新のブラウザーのみ実装しています。古いブラウザーは非推奨かつ削除済みの `IDBDatabase.setVersion()` メソッドを実装しています。

## 参考

* [localForge](https://github.com/localForage/localForage/tree/master/src)
* [JavaScript初級者から中級者になろう 十四章第五回　Indexed Database 4](https://uhyohyo.net/javascript/14_5.html)
* [Progressive Web App のオフライン ストレージ](https://developers.google.com/web/fundamentals/instant-and-offline/web-storage/offline-for-pwa?hl=ja)
* [w3.org](https://www.w3.org/TR/IndexedDB/#dom-idbobjectstore-openkeycursor)
* [w3.org WebSQL](https://www.w3.org/TR/webdatabase/)
* [caniuse WebSQL](https://caniuse.com/?/#search=websql)
* [モダンブラウザのストレージ容量まとめ](https://www.html5rocks.com/ja/tutorials/offline/quota-research/)
* [Practical Guide to Take Your TODO List Offline](https://www.html5rocks.com/en/tutorials/offline/takingappoffline/)
* [WMCache.js](https://github.com/uupaa/WMCache.js/blob/master/lib/WMFileSystemStorage.js)
* [HTML5 Web Storage-- な機能を uupaa.js に実装してみた](https://uupaa.hatenadiary.org/entry/20100104/1262597427)
* [僕の考えた最強のService Workerキャッシュ戦略で爆速サービスを作った](https://qiita.com/tiwu_official/items/47e8a7c3e6f2d57816d7)
* [Service Worker のライフサイクル](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ja)
* [Firefox about:serviceworkers](about:serviceworkers)

[How to delete a database in WebSQL programmatically?](https://stackoverflow.com/questions/7183049/how-to-delete-a-database-in-websql-programmatically)
~~~js
/* This will fetch all tables from sqlite_master
 * except some few we can't delete.
 * It will then drop (delete) all tables.
 * as a final touch, it is going to change the database
 * version to "", which is the same thing you would get if
 * you would check if it the database were just created
 *
 * @param name [string] - the database to delete
 * @param cb [function] - the callback when it's done
 */
function dropDatabase(name, cb){
    // empty string means: I do not care what version, desc, size the db is
    var db = openDatabase(name, "", "", "");

    function error(tx, err){
        console.log(err);
    }

    db.transaction(ts => {
        // query all tabels from sqlite_master that we have created and can modify
        var query = "SELECT * FROM sqlite_master WHERE name NOT LIKE 'sqlite\\_%' escape '\\' AND name NOT LIKE '\\_%' escape '\\'";
        var args = [];
        var success = (tx, result) => {
            var rows, i, n, name;

            rows = result.rows;
            n = i = rows.length;

            // invokes cb once it’s called n times
            function after(){
                if (--n < 0) {
                    // Change the database version back to empty string
                    // (same as when we compear new database creations)
                    db.changeVersion(db.version, "", function(){}, error, cb);
                }
            }

            while(i--){
                // drop all tabels and calls after() each time
                name = JSON.stringify(rows.item(i).name);
                tx.executeSql('DROP TABLE ' + name, [], after, error);
            }

            // call it just 1 more extra time incase we didn't get any tabels
            after();
        };

        ts.executeSql(query, args, success, error);
    });
}
~~~

[IndexedDBShim](https://github.com/axemclion/IndexedDBShim/blob/master/src/IDBFactory.js)
