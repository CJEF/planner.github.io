let addMessage = document.querySelector(".message"),
  addButton = document.querySelector(".add"),
  todo = document.querySelector(".todo");

let todoList = []; /* massive */

if (localStorage.getItem("todo")) {
  todoList = JSON.parse(
    localStorage.getItem("todo")
  ); /* 4 действие вывод данных из  localStorage  (наш список)*/
  displayMessages(); /* показать этот список в браузере */
}

addButton.addEventListener("click", function() {
  /* 1 действие */
  /* console.log(addMessage.value); прослушывать значение addMessage и выводить его при нажатии на addButton*/
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
  };

  todoList.push(newTodo); /* push object in massive */
  displayMessages(); /* функция вывода данных */
  localStorage.setItem(
    "todo",
    JSON.stringify(todoList)
  ); /* 3 действие сохранение данных в  localStorage*/
  addMessage.value = "";
});

function displayMessages() {
  /* 2 действие вывод массива данных на экран в виде html */
  let displayMessages = "";
  if (todoList.length === 0)
    todo.innerHTML = ""; /* удаление первого элемента в списке */
  todoList.forEach(function(item, i) {
    /* forEach для перебора принятых значений(callback fun), он принимает 3 параметра  item, index, array*/
    displayMessages += `
            <li>
                <input type="checkbox" id="item_${i}" ${
      item.checked ? "checked" : ""
    }>
                <label for="item_${i}" class="${
      item.important ? "important" : ""
    }">${item.todo}</label>
            </li>
            `;
    todo.innerHTML = displayMessages;
  });
}

todo.addEventListener("change", function(event) {
  /* console.log(event.target.getAttribute('id')); в консоли выводится в каком элементе по id произошло изменение*/
  let idInput = event.target.getAttribute("id");
  let forLabel = todo.querySelector("[for=" + idInput + "]");
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function(item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});

todo.addEventListener("contextmenu", function(e) {
  event.preventDefault();
  todoList.forEach(function(item, i) {
    if (item.todo === event.target.innerHTML) {
      if (event.ctrlKey || event.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  });
});