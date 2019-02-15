const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

/*
var user = {name: 'Meral' , age: 39};
var {name} = user;
var {age} = user;


console.log(name,age);
*/

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true },(err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB Server');
    }
    console.log('Connected to MongoDB Server');
    const dbName = 'TodoApp';
    const db = client.db('TodoApp');
    
    
    db.collection('Todos').insertOne({
        text: 'Something to Huhu',
        completed: true
    }, (err,result) => {
        if (err) {
            return console.log('Unable to insert todo', err);
        }

        console.log(JSON.stringify(result.ops,undefined,2));
    });
    
    db.collection('Users').insertOne({
        name: 'Meral',
        age: 39,
        location: 'Tillo'
    }, (err,result) => {
        if (err) {
            return console.log('Unable to insert record.',err);
        }
        console.log(JSON.stringify(result.ops,undefined,2));
    });
    

    
    client.close();
}) ;


/*
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'TodoApp';

(async function() {
  const client = new MongoClient(url,{ useNewUrlParser: true });

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);

    // Insert a single document
    let r = await db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
        });
    assert.equal(1, r.insertedCount);

  } catch (err) {
    console.log(err.stack);
  }

  // Close connection
  client.close();
})();
*/