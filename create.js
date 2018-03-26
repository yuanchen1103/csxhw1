//讀json
var fs = require('fs');
var file = "movie.json";
var doc = JSON.parse(fs.readFileSync(file, 'utf8'));

var MongoClient = require('mongodb').MongoClient;


var url = 'mongodb://140.112.28.194/';
var dbName = 'Movie';

// Connect to the db
MongoClient.connect(url, function(error, client) {
    if (error) {
        console.log('資料庫連接失敗');
        return
    }
    console.log('資料庫連接成功');

    // use dbName
    var db = client.db(dbName);

    //插入資料
    db.collection('b04104036', function(error, collection) {
        if (error) {
            console.log('資料內無 b04104036 的collection');
            return
        }

        collection.insertMany(doc, function(error, result) {
            if (error) {
                console.log(error);
                console.log('插入資料至 b04104036 失敗');
                return
            }
            console.log('插入 ' + result.insertedCount + ' 筆資料成功');
        })


        collection.find().toArray(function(error, docs) {
            if (error) {
                console.log('查詢 b04104036 資料失敗');
                return
            }
            // 將查詢的資料印出來
            for (let i = 0; i < docs.length; i++) {
                console.log(docs[i]);
            }
            // 確定資料讀取完畢再關掉 client
            client.close();
        });
    })
});