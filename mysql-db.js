const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todoApp',
    insecureAuth: true
});

function getTodos(fnHandleTodos) {
    conn.query('select id, todoText, isDone from todos;', (err, rows) => {
        if (err) {
            console.log(err);
            fnHandleTodos();
        } else {
            fnHandleTodos(rows);
        }
    });
}

function addTodo(todoObj, fnHandleNewTodo) {
    let isDone = false;
    conn.query('INSERT INTO todoApp.todos(todoText, isDone) VALUES(?, ?);', [todoObj.todoText, isDone], (error, result) => {
        if (error) {
            fnHandleNewTodo(error.sqlMessage);
        } else {
            let res = {
                id: result.insertId,
                todoText: todoObj.todoText,
                isDone: isDone
            }
            fnHandleNewTodo(undefined, res);
        }
    });
}

function deleteTodo(id, fnHandleDeletion) {
    conn.query('DELETE FROM todoApp.todos WHERE id = ? AND isDone = false', [id], (error, result) => {
        if (error) {
            console.log(error);
            fnHandleDeletion();
        } else {
            fnHandleDeletion(id);
        }
    });
}

function checkDone(id, fn) {
    getTodos((rows) => {
        if (rows && rows.filter(element => element.id == id && element.isDone == false)) {
            conn.query('update todoApp.todos set isDone = true where id = ?;', [id], (error) => {
                if (error) {
                    console.log(error);
                    fn();
                } else {
                    fn(id);
                }
            });
        }
    });
}

module.exports = {
    addTodo,
    getTodos,
    deleteTodo,
    checkDone
}