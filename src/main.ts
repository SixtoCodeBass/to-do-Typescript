export {};

interface Task {
  id: number;
  text: string;
  completed: boolean;
}


class TodoList {
  private Tasks: Task[] = [];

// This method takes a parameter of type Task and adds it to the Tasks array in the class. 
// The Tasks array is declared as a private property of the class, 
// which means it can only be accessed from within the class.
  addTask(todo: Task) {
    this.Tasks.push(todo);
  }

//   This method takes a parameter of type number, which represents the id of the task to be removed
  removeTaskById(id: number) {
    this.Tasks = this.Tasks.filter((todo) => todo.id !== id);
  }
//   returns the Tasks array.
  getTask() {
    return this.Tasks;
  }
}



class TodoListUI {
  private todoList: TodoList;

  constructor(todoList: TodoList) {
    this.todoList = todoList;
  }

  // updates the user interface to display the list of tasks in the todoList object
  displayTasks() {
    const todoListElement = document.getElementById("todo-list")!;
    todoListElement.innerHTML = "";

    this.todoList.getTask().forEach((todo) => {
      const todoElement = document.createElement("li");
      todoElement.innerHTML = `
                <input type="checkbox" ${todo.completed ? "checked" : ""}>
                <span>${todo.text}</span>
                <button class="remove-todo" data-id="${todo.id}">Remove</button>
            `;
      todoListElement.appendChild(todoElement);
    });
  }

  // this method adds a new task to the todoList object and updates the user interface to display the new task.
  addTodo() {
    const newTodoInput = document.getElementById(
      "new-todo"
    ) as HTMLInputElement;
    const newTodoText = newTodoInput.value.trim();

    if (newTodoText) {
      const newTodo: Task = {
        id: Date.now(),
        text: newTodoText,
        completed: false,
      };

      this.todoList.addTask(newTodo);
      this.displayTasks();
      newTodoInput.value = "";
    }
  }

  //this method removes a task with a specific id from the todoList object and updates the user interface to reflect the change.
  removeTodoById(id: number) {
    this.todoList.removeTaskById(id);
    this.displayTasks();
  }


  //event listeners to the HTML elements in the user interface to respond to user interactions.
  bindEvents() {
    document
      .getElementById("add-todo")!
      .addEventListener("click", () => this.addTodo());
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches(".remove-todo")) {
        const id = parseInt(target.getAttribute("data-id")!);
        this.removeTodoById(id);
      }
    });
  }
}


//  Putting it all together:
//  Finally, we will create an instance of the TodoList and TodoListUI classes,
//  and call the bindEvents method to bind event listeners to the UI. 
//  Add the following code to app.ts:


const todoList = new TodoList();
const ui = new TodoListUI(todoList);

ui.displayTasks();
ui.bindEvents();



  
