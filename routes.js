const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./mysql-db');

app.use(bodyParser.json());
app.use(express.static('frontend'));

app.post('/todo', (req, res) => {
    db.addTodo(req.body, (dbErr, newEntry) => {
        if (newEntry) {
            res.status(200).send(newEntry);
        } else {
            console.log(dbErr);
            res.status(400).send({
                message: 'Bad request'
            });
        }
    });
});

app.get('/todos', (req, res) => {
    db.getTodos((dbRows) => {
        if (dbRows) {
            res.send(dbRows);
        } else {
            res.status(500).send({
                message: 'Cannot read from database'
            });
        }
    });
});

app.delete('/todo/:id', (req, res) => {
    db.deleteTodo(req.params.id, (id) => {
        if (id) {
            res.status(200).send(id);
        } else {
            res.status(500).send({
                message: 'Cannot delete from database'
            });
        }
    });
});

app.put('/todo/:id', (req, res) => {
    db.checkDone(req.params.id, (id) => {
        if (id) {
            res.status(200).send(id);
        } else {
            res.status(500).send({
                message: 'Cannot change status to done'
            });
        }
    })
})

module.exports = app;