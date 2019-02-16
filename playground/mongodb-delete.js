const {MongoClient,ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err,client) => {
    if (err) {
        console.log('Unable to open connection');
    }

    const db = client.db('TodoApp');
    db.collection('Todos').deleteOne({text:"Something to do"}).then((result) => {
        console.log(result);
    }) ;

}) ;