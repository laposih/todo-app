# Todo app

1. Add new todo
2. Delete existing todo
3. Done items

Checkboxes before items.
If checked, item should be moved to done items, checkbox freezed and delete button removed.
Delete button deletes item from database (only if it is not done yet).

## `GET /`
- The main page should be rendered

## `GET /todos`
- It should respond with the stored entries in the following JSON format
    ```json
    {
      "id": 0,
      "todoText": "sthg",
      "isDone": "false"
    }
    ``` 

## `POST /todo`
- Creates new todo object

## `DELETE /todo/{id}`
- Deletes todo item that matches the id

## Bonus: `PUT /todo/{id}`
- Changes todoText