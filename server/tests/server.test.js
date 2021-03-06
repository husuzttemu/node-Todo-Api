const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID,
    text: 'First test todo'
},
{
    _id: new ObjectID,
    text: 'Second test todo'
}];

beforeEach((done)=> {
    Todo.remove({}).then(()=> {
        Todo.insertMany(todos);
        //done();
    }).then(() =>{
        done();
    })
})

describe('POST/todos',() => {
    test('shoudl create a new todo',(done)=> {
        var text = 'test todo text1';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
            if (err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((err) => {
                done(err);
            })
        })
    });

    test('is shouldnt create todo with invalid body data',(done)=> {
        var text = "";

        request(app)
        .post('/todos')
        .send({text})
        .expect(400)
        .end((err,res)=> {
            if (err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((err) => {
                done(err);
            })
        })

    });
});

describe('GET todos',()=> {
    test('should get all todos',(done)=> {

        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
})


describe('GET todos /:id',()=> {
    test('should get return todo doc',(done)=> {

        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    test('it should return 404 if todo not found',(done)=> {
        var id = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    test('it should return 404 if for non-object ids',(done)=> {

        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });


})

