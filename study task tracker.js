const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const progress = document.getElementById("progress");

let completedTasks = 0;
let totalTasks = 0;

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = taskInput.value.trim();

  if (taskName === "") {
    alert("Please enter a study task.");
    return;
  }

  const listItem = document.createElement("li");
  const taskText = document.createElement("span");
  const taskActions = document.createElement("div");
  const completeButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  taskText.textContent = taskName;
  taskText.classList.add("task-text");

  taskActions.classList.add("task-actions");

  completeButton.textContent = "Complete";
  completeButton.classList.add("complete-btn");

  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");

  completeButton.addEventListener("click", function () {
    const isCompleted = listItem.classList.toggle("completed");

    if (isCompleted) {
      completedTasks++;
      completeButton.textContent = "Undo";
    } else {
      completedTasks--;
      completeButton.textContent = "Complete";
    }

    updateProgress();
  });

  deleteButton.addEventListener("click", function () {
    if (listItem.classList.contains("completed")) {
      completedTasks--;
    }

    totalTasks--;
    listItem.remove();
    updateProgress();
  });

  taskActions.append(completeButton, deleteButton);
  listItem.append(taskText, taskActions);
  taskList.appendChild(listItem);

  totalTasks++;
  taskInput.value = "";

  updateProgress();
});

function updateProgress() {
  progress.textContent =
    `Tasks completed: ${completedTasks} / ${totalTasks}`;
}