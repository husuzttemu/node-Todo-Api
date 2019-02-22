var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

var Todo = mongoose.model('Todo',{
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

var newTodo = new Todo({
    text: 'Cook dinner',
    completed: true,
    completedAt: 123
});


newTodo.save().then((doc)=> {
    return console.log('saved todo :',doc)
}, (e) => {
    return console.log('unable to save:',e)
}); //save returns promise. Save at the database

var newTodo1 = new Todo({
    text: 'Read some books',
    completed: true,
    completedAt: 155
});

newTodo1.save().then((doc) => {
    return console.log('saved todo1 :',doc)
},(err) => {
    return console.log('unable to save:',e)
});