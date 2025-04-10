// To open popup to add task
const addTaskButton = document.getElementById("add-btn");
addTaskButton.addEventListener("click", function () {
  const popupOveray = document.getElementById("taskPopup");
  popupOveray.classList.add("active");
});

// To close the popup
const cancelPopupButton = document.getElementById("popup-btn-cancel");
cancelPopupButton.addEventListener("click", function () {
  const popupOveray = document.getElementById("taskPopup");
  popupOveray.classList.remove("active");
});

// To add task to do column
const popAddTaskBtn = document.getElementById("popup-btn-add");
popAddTaskBtn.addEventListener("click", function () {
  let titleNewTask = document.getElementById("taskTitle").value;
  let newTaskDescription = document.getElementById("taskDescription").value;
  const priority = document.querySelector(".priority-radio:checked").id;
  const todoColumn = document.getElementById("todo-column");

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.id = "task";

  const taskTitleIdDiv = document.createElement("div");
  taskTitleIdDiv.classList.add("task-title-id");

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("task-title");
  taskTitleDiv.textContent = titleNewTask;

  const deleteButtonDiv = document.createElement("div");
  const deleteButton = document.createElement("button");

  deleteButtonDiv.classList.add("delete-button-div");
  deleteButton.classList.add("delete-button");
  deleteButton.id = "delete-task";
  deleteButton.innerHTML = "<strong>X</strong>";

  const taskDescDiv = document.createElement("div");
  taskDescDiv.classList.add("task-desc");
  taskDescDiv.textContent = newTaskDescription;

  const taskFooterDiv = document.createElement("div");
  const divSpanPriority = document.createElement("div");
  const colorSpan = document.createElement("span");

  if (priority === "priorityLow") {
    divSpanPriority.appendChild(colorSpan);
    colorSpan.classList.add("priority", "low");
    divSpanPriority.appendChild(document.createTextNode("Priority Low"));
  }
  if (priority === "priorityMedium") {
    divSpanPriority.appendChild(colorSpan);
    colorSpan.classList.add("priority", "medium");
    divSpanPriority.appendChild(document.createTextNode("Priority Medium"));
  }
  if (priority === "priorityHigh") {
    divSpanPriority.appendChild(colorSpan);
    colorSpan.classList.add("priority", "high");
    divSpanPriority.appendChild(document.createTextNode("Priority High"));
  }

  taskFooterDiv.classList.add("task-footer");

  taskFooterDiv.appendChild(divSpanPriority);
  deleteButtonDiv.appendChild(deleteButton);
  taskTitleIdDiv.appendChild(taskTitleDiv);
  taskTitleIdDiv.appendChild(deleteButtonDiv);
  newTask.appendChild(taskTitleIdDiv);
  newTask.appendChild(taskDescDiv);
  newTask.appendChild(taskFooterDiv);
  todoColumn.appendChild(newTask);

  // Once the task added close the popup
  const popupOveray = document.getElementById("taskPopup");
  popupOveray.classList.remove("active");
  popupOveray.classList.add("none");

  defaultPopup();
  countActiveTabs();
});

// Set to defaut the popup title / description
function defaultPopup() {
  let taskTitleInput = document.getElementById("taskTitle");
  let taskDescInput = document.getElementById("taskDescription");

  taskTitleInput.value = "";
  taskDescInput.value = "";
}

// To delete a task by clicking on the delete button
const todoColumn = document.getElementById("todo-column");
todoColumn.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("delete-button")) {
    e.target.closest(".task").remove();
    countActiveTabs();
  }
});

// Count active task in the column
function countActiveTabs() {
  const badgeNumber = document.getElementById("badge");
  const todoColumn = document.getElementById("todo-column");
  const activeTask = todoColumn.querySelectorAll(".task");
  badgeNumber.textContent = activeTask.length;
  badgeNumber.style.fontWeight = "bold";
}
