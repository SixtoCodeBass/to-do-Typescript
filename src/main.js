var TodoList = /** @class */ (function () {
    function TodoList() {
        this.todos = [];
    }
    TodoList.prototype.addTodo = function (todo) {
        this.todos.push(todo);
    };
    TodoList.prototype.removeTodoById = function (id) {
        this.todos = this.todos.filter(function (todo) { return todo.id !== id; });
    };
    TodoList.prototype.getTodos = function () {
        return this.todos;
    };
    return TodoList;
}());
var UI = /** @class */ (function () {
    function UI(todoList) {
        this.todoList = todoList;
    }
    UI.prototype.displayTodos = function () {
        var todoListElement = document.getElementById("todo-list");
        todoListElement.innerHTML = "";
        this.todoList.getTodos().forEach(function (todo) {
            var todoElement = document.createElement("li");
            todoElement.innerHTML = "\n                <input type=\"checkbox\" ".concat(todo.completed ? "checked" : "", ">\n                <span>").concat(todo.text, "</span>\n                <button class=\"remove-todo\" data-id=\"").concat(todo.id, "\">Remove</button>\n            ");
            todoListElement.appendChild(todoElement);
        });
    };
    UI.prototype.addTodo = function () {
        var newTodoInput = document.getElementById("new-todo");
        var newTodoText = newTodoInput.value.trim();
        if (newTodoText) {
            var newTodo = {
                id: Date.now(),
                text: newTodoText,
                completed: false
            };
            this.todoList.addTodo(newTodo);
            this.displayTodos();
            newTodoInput.value = "";
        }
    };
    UI.prototype.removeTodoById = function (id) {
        this.todoList.removeTodoById(id);
        this.displayTodos();
    };
    UI.prototype.bindEvents = function () {
        var _this = this;
        document
            .getElementById("add-todo")
            .addEventListener("click", function () { return _this.addTodo(); });
        document.addEventListener("click", function (event) {
            var target = event.target;
            if (target.matches(".remove-todo")) {
                var id = parseInt(target.getAttribute("data-id"));
                _this.removeTodoById(id);
            }
        });
    };
    return UI;
}());
//  Putting it all together:
//  Finally, we will create an instance of the TodoList and UI classes,
//  and call the bindEvents method to bind event listeners to the UI. 
//  Add the following code to app.ts:
var todoList = new TodoList();
var ui = new UI(todoList);
ui.displayTodos();
ui.bindEvents();
