// Add Slectors Here

const todoList = document.querySelector(".todo-list");
const todoInput = document.querySelector(".input");
const todoButton = document.querySelector(".submit");
const filterOption = document.querySelector(".filter-todo");

// Test if we grabbed the right element
// console.log(todoList);
// console.log(todoInput);
// console.log(todoButton);

// Event Listerner

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// Functions

function addTodo(event) {
  // prevent page from submitting/ reloading
  event.preventDefault();
  // Create TODO DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //   Create List Item = Tdod
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  //   Append new todo into todo div
  todoDiv.appendChild(newTodo);
  // later with local storage
  saveLocalTodos(todoInput.value);
  //   Add a completed button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //   Add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-minus-square"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);
  //   APPEND TO LIST
  todoList.appendChild(todoDiv);
  //   Clear Input Value
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;
  if (item.classList[0] === "delete-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// LOCAL STORAGE

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Create TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //   Create List Item = todo
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    //   Append new todo into todo div
    todoDiv.appendChild(newTodo);
    //   Add a completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //   Add a delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-minus-square"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);
    //   APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}
