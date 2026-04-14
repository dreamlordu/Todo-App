// ====================== SEÇİCİLER ======================
const form = document.querySelector("#form");
const addInput = document.querySelector("#todoadd");
const todoList = document.querySelector("#todo-list");
const firstCardBody = document.querySelector("#cardbody");
const secondCardBody = document.querySelector("#secondcardbody");
const clearButton = document.querySelector("#clearbutton");
const filterInput = document.querySelector("#filter");

let todos = [];

// ====================== EVENTLER ======================
runEvents();

function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEverywhere);
  filterInput.addEventListener("keyup", filter);
}

// ====================== SAYFA YÜKLENİNCE ======================
function pageLoaded() {
  checkTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}

// ====================== FILTER ======================
function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll("li");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  } else {
    showAlert("warning", "Filtreleme yapmak için en az bir todo olmalıdır!");
  }
}

// ====================== TÜMÜNÜ SİL ======================
function allTodosEverywhere() {
  const todoListesi = document.querySelectorAll("li");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      todo.remove();
    });

    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));

    showAlert("success", "Başarılı bir şekilde silindi");
  } else {
    showAlert("warning", "Silmek için en az bir todo olmalıdır");
  }
}

// ====================== DELETE ======================
function removeTodoToUI(e) {
  if (e.target.classList.contains("delete-item")) {
    const todo = e.target.parentElement;
    const text = todo.querySelector("span").textContent;

    todo.remove();
    removeTodoToStorage(text);

    showAlert("success", "Todo başarıyla silindi.");
  }
}

// ====================== STORAGE ======================
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// ====================== ADD TODO ======================
function addTodo(e) {
  const inputText = addInput.value.trim();

  if (inputText === "") {
    showAlert("warning", "Lütfen boş bırakmayınız!");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);

    showAlert("success", "Todo Eklendi.");
  }

  e.preventDefault();
}

// ====================== UI ======================
function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between p-3 bg-base-200 rounded-lg group mb-2";

  const span = document.createElement("span");
  span.textContent = newTodo;

  const a = document.createElement("a");
  a.href = "#";
  a.className = "delete-item btn btn-error btn-sm btn-square text-white";
  a.textContent = "×";

  li.appendChild(span);
  li.appendChild(a);

  todoList.appendChild(li);

  addInput.value = "";
}

// ====================== STORAGE ADD ======================
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// ====================== STORAGE CHECK ======================
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}

// ====================== ALERT ======================
function showAlert(type, message) {
  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  const span = document.createElement("span");
  span.textContent = message;

  firstCardBody.appendChild(div);
  div.appendChild(span);
  setTimeout(function () {
    div.remove();
  }, 2500);
}
