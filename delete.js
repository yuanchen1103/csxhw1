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

    //刪除錯誤資料
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
            var deleteDocs = [];
            for (var i = 0; i < docs.length; i++) {
                var startTimeHour = parseInt(docs[i].time[0] + docs[i].time[1]);
                var endTimeHour = parseInt(docs[i].time[6] + docs[i].time[7]);
                var startTimeMinute = parseInt(docs[i].time[3] + docs[i].time[4]);
                var endTimeMinute = parseInt(docs[i].time[9] + docs[i].time[10]);

                // 1. 結束hour < 開始hour 2. 結束hour - 開始hour > 4 3. 若結束hour = 開始hour，結束minute < 開始minute 4.結束hour - 開始hour = 4， 開始minute < 結束minute
                if (endTimeHour < startTimeHour || endTimeHour - startTimeHour > 4 || (endTimeHour == startTimeHour && endTimeMinute < startTimeMinute) || (endTimeHour - startTimeHour == 4 && startTimeMinute < endTimeMinute)) {
                    deleteDocs.push(i);
                }
            }
            for (var j = 0; j < deleteDocs.length; j++) {
                collection.deleteOne({ "index": { $eq: parseInt(deleteDocs[j]) } });
            }
            client.close();
        })
    })
});