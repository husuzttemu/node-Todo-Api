const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done)=> {
    Todo.remove({}).then(()=> {
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

            Todo.find().then((todos) => {
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
                expect(todos.length).toBe(0);
                done();
            }).catch((err) => {
                done(err);
            })
        })

    });
});
