let todo = document.getElementById('new-todo');
let submitButton = document.getElementById('submit-button');
let todoList = document.getElementById('todos');
let doneItems = document.getElementById('done-items');

function freezeCheckbox(id) {
    let itemToDone = document.getElementById(id);
    let checkboxToFreeze = document.getElementById('checkbox-' + id);
    checkboxToFreeze.setAttribute('disabled', 'disabled');
    checkboxToFreeze.setAttribute('checked', 'checked');
    itemToDone.removeChild(itemToDone.lastChild);
    doneItems.appendChild(itemToDone);
}

function createTodoEntry(res) {
    let newEntry = document.createElement('div');
    newEntry.setAttribute('id', res.id);
    newEntry.innerHTML = `
        <input type = "checkbox" id="checkbox-${res.id}">
        <label for="todos">${res.todoText}</label>
        <button type="button" id="delete-button-${res.id}">Delete</button>`
    if (res.isDone == 0) {
        todoList.appendChild(newEntry);
    } else {
        doneItems.appendChild(newEntry);
        freezeCheckbox(res.id);
    }

    let checkbox = document.getElementById('checkbox-' + res.id);
    checkbox.addEventListener('click', () => {
        fetch('http://localhost:3000/todo/' + res.id, {
            method: 'PUT'
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                }
            })
            .then((res) => {
                console.log(res);
                freezeCheckbox(res);
            })
    })

    let deleteButton = document.getElementById('delete-button-' + res.id);
    if (res.isDone == false) {
        deleteButton.addEventListener('click', () => {
            fetch('http://localhost:3000/todo/' + res.id, {
                method: 'DELETE'
            })
                .then((res) => {
                    if (res.status == 200) {
                        return res.json()
                    }
                })
                .then((res) => {
                    let itemToDelete = document.getElementById(res);
                    itemToDelete.remove();
                })
        });
    }
}

fetch('http://localhost:3000/todos')
    .then(res => res.json())
    .then(res => {
        for (const element of res) {
            createTodoEntry(element);
        }
    });

submitButton.addEventListener('click', () => {
    if (todo.value != '') {
        fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todoText: todo.value
            })
        })
            .then((res) => {
                console.log(res);
                if (res.status == 200) {
                    return res.json()
                }
            })
            .then((res) => {
                createTodoEntry(res);
            })
    }
});
