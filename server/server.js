var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
const {ObjectID} = require('mongodb');


/*
var newTodo = new Todo({
    text: ' Making some test '
});


newTodo.save().then((doc)=> {
    mongoose.disconnect();
    return console.log('saved todo :',doc)
}, (e) => {
    return console.log('unable to save:',e)
}); //save returns promise. Save at the database
*/
/*
var newTodo1 = new Todo({
    text: 'Read some books',
    completed: true,
    completedAt: 155
});

newTodo1.save().then((doc) => {
    return console.log('saved todo1 :',doc)
},(err) => {
    return console.log('unable to save:',e)
});*/

/*

var newUser = new User({
    email: '  husuzttemu@gmail.com  '
});

newUser.save().then((doc)=> {
    mongoose.disconnect();
    return console.log('saved newUser :',doc)
}, (err)=> {
    return console.log('unable to save newUser:',err)
});
*/

var app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res) =>{
    //console.log(req.body);
    var todo = new Todo({
        text : req.body.text
    });

    todo.save().then((doc)=> {
        res.status(200).send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
})

app.get('/todos',(req,res)=> {
    Todo.find().then((todos) => {
        res.send({
            todos})
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos/:id',(req,res)=> {
    //res.send(req.params)
    var id = req.params.id;

    if (!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo){
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.listen(3000,()=> {
    console.log('started on port 3000');
})

module.exports = {
    app
}