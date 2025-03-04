// Task Management Module
class TodoList {
  constructor() {
    this.taskInput = document.getElementById("taskInput");
    this.addTaskBtn = document.getElementById("addTaskBtn");
    this.taskList = document.getElementById("taskList");

    // Bind event listeners
    this.addTaskBtn.addEventListener("click", () => this.addTask());
    this.taskInput.addEventListener("keypress", (e) => this.handleKeyPress(e));

    // Load existing tasks from local storage
    this.loadTasks();
  }

  // Add a new task
  addTask() {
    const taskText = this.taskInput.value.trim();

    if (taskText === "") {
      this.showValidationError("Task cannot be empty");
      return;
    }

    this.createTaskElement(taskText);
    this.saveTasks();
    this.taskInput.value = "";
  }

  // Create task element
  createTaskElement(taskText) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => this.deleteTask(li));

    li.appendChild(taskSpan);
    li.appendChild(deleteBtn);
    this.taskList.appendChild(li);
  }

  // Delete a task
  deleteTask(taskElement) {
    this.taskList.removeChild(taskElement);
    this.saveTasks();
  }

  // Handle enter key press
  handleKeyPress(e) {
    if (e.key === "Enter") {
      this.addTask();
    }
  }

  // Save tasks to local storage
  saveTasks() {
    const tasks = Array.from(this.taskList.children).map(
      (taskItem) => taskItem.querySelector("span").textContent
    );
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }

  // Load tasks from local storage
  loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");
    savedTasks.forEach((taskText) => this.createTaskElement(taskText));
  }

  // Show validation error (optional enhancement)
  showValidationError(message) {
    const errorContainer = document.createElement("div");
    errorContainer.textContent = message;
    errorContainer.style.color = "red";
    errorContainer.style.marginBottom = "10px";

    // Remove any existing error messages
    const existingError = document.querySelector(".error-message");
    if (existingError) {
      existingError.remove();
    }

    errorContainer.classList.add("error-message");
    this.taskInput.parentNode.insertBefore(errorContainer, this.taskInput);

    // Remove error after 3 seconds
    setTimeout(() => {
      errorContainer.remove();
    }, 3000);
  }
}

// Initialize the todo list when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new TodoList();
});
