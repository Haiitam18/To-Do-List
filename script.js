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

let taskIdCounter = 1;
// To add task to do column
const popAddTaskBtn = document.getElementById("popup-btn-add");
popAddTaskBtn.addEventListener("click", function () {
  let titleNewTask = document.getElementById("taskTitle").value;
  let newTaskDescription = document.getElementById("taskDescription").value;
  const priority = document.querySelector(".priority-radio:checked").id;
  const todoColumn = document.getElementById("todo-column");

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.id = "task" + taskIdCounter;
  taskIdCounter++;
  newTask.setAttribute("draggable", "true");

  const taskTitleIdDiv = document.createElement("div");
  taskTitleIdDiv.classList.add("task-title-id");

  const taskTitleDiv = document.createElement("div");
  taskTitleDiv.classList.add("task-title");
  taskTitleDiv.textContent = titleNewTask;

  const deleteButtonDiv = document.createElement("div");
  const deleteButton = document.createElement("button");

  deleteButtonDiv.classList.add("delete-button-div");
  deleteButton.classList.add("delete-button");
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
  newTask.addEventListener("dragstart", dragstartHandler);
});

// Set to defaut the popup title / description
function defaultPopup() {
  let taskTitleInput = document.getElementById("taskTitle");
  let taskDescInput = document.getElementById("taskDescription");

  taskTitleInput.value = "";
  taskDescInput.value = "";
}

// To delete a task by clicking on the delete button
document.addEventListener("click", function (e) {
  if (e.target && e.target.closest(".delete-button")) {
    e.target.closest(".task").remove();
    countActiveTabs();
  }
});

// Count active task in the column
function countActiveTabs() {
  const badge1 = document.getElementById("badge1");
  const badge2 = document.getElementById("badge2");
  const badge3 = document.getElementById("badge3");

  // Count active task to do column
  const todoColumn = document.getElementById("todo-column");
  const todoTask = todoColumn.querySelectorAll(".task");
  badge1.textContent = todoTask.length;
  badge1.style.fontWeight = "bold";

  // Count active task in progress column

  const progressColumn = document.getElementById("column-in-progress");
  const progressTask = progressColumn.querySelectorAll(".task");
  badge2.textContent = progressTask.length;
  badge2.style.fontWeight = "bold";

  // Count active task done column
  const doneColumn = document.getElementById("column-done");
  const doneTask = doneColumn.querySelectorAll(".task");
  badge3.textContent = doneTask.length;
  badge3.style.fontWeight = "bold";
}

// Drag & drop section
function dragstartHandler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
}
function dragoverHandler(ev) {
  ev.preventDefault();
  ev.dataTransfer.dropEffect = "move";
}

function dropHandler(ev) {
  ev.preventDefault();

  const taskId = ev.dataTransfer.getData("text/plain");

  const taskElement = document.getElementById(taskId);
  const dropTargetColumn = ev.target.closest(".column");

  dropTargetColumn.appendChild(taskElement);

  countActiveTabs();
}
