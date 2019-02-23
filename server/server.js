var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');

var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


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

app.listen(3000,()=> {
    console.log('started on port 3000');
})