const {MongoClient,ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err,client) => {
    if (err) {
        return console.log('Unable to open connection');
    }

    const db = client.db('TodoApp');
    db.collection('Todos').findOneAndUpdate({
        text:"Something to do"
    }, { 
        $set:
        {
            text:"Something to doxxxxx"
        }
    }, {
        returnOriginal: false
    }
        ).then((result) => {
        console.log(result);
    }) ;

    client.close();

}) ;