

//const MongoClient = require('mongodb').MongoClient;
//const ObjectId = require('mongodb').ObjectID;
const {MongoClient,ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err,client) => {
    if (err)
    {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');

    const dbName = 'TodoApp';
    const db = client.db('TodoApp');

    db.collection('Todos').find({ 
        "_id": ObjectId("5c64882a613c29238402b2ad")
    }).toArray().then( (docs)  => {
        console.log(docs);
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    } , (err) => {
        console.log('Unable to fecth records from [Todos...]',err);
    });

    db.collection('Users').find({name: 'Huseyin'}).toArray().then( (docs)=>
    {
        console.log('Users');
        console.log(JSON.stringify(docs,undefined,2));

    } ,(err) => {
        console.log('Unable to fecth records from [Users...] ',err);
    })
    

    client.close();
});

