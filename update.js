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

    //更新資料
    db.collection('b04104036', function(error, collection) {
        if (error) {
            console.log('資料內無 b04104036 的collection');
            return
        }
        collection.find().toArray(function(error, docs) {
            if (error) {
                console.log('查詢 b04104036 collection 失敗');
                return
            }
            collection.updateMany({ "state": { $eq: false } }, { $set: { "state": true } })
            client.close();
        })
    })
});