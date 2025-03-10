class TodoList {
  constructor() {
    this.taskInput = document.getElementById("taskInput");
    this.taskList = document.getElementById("taskList");

    document.getElementById("addTaskBtn").onclick = () => this.addTask();
    this.taskInput.onkeyup = (e) => e.key === "Enter" && this.addTask();

    JSON.parse(localStorage.getItem("todoTasks") || "[]").forEach((t) =>
      this.addTaskToDOM(t)
    );
  }

  addTask() {
    const text = this.taskInput.value.trim();
    if (!text) return this.showError("Task cannot be empty");

    this.addTaskToDOM(text);
    this.save();
    this.taskInput.value = "";
  }

  addTaskToDOM(text) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const span = document.createElement("span");
    span.className = "listitem";
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => {
      li.remove();
      this.save();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);

    this.taskList.appendChild(li);
  }

  save() {
    localStorage.setItem(
      "todoTasks",
      JSON.stringify(
        [...this.taskList.children].map((li) => li.firstChild.textContent)
      )
    );
  }

  showError(msg) {
    document.querySelector(".error-message")?.remove();
    const err = document.createElement("div");
    err.className = "error-message";
    err.textContent = msg;
    err.style.color = "red";
    this.taskInput.parentNode.insertBefore(err, this.taskInput);
    // setTimeout(() => err.remove(), 3000);
  }
}
const style = document.createElement("style");
style.textContent = `
    .task-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 10px 20px;
    }

    .listitem {
        flex: 1;
        color: #333;
        font-size: 16px;
    }

    .delete-btn {
        background-color: #ff4d4d;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 5px 10px;
        cursor: pointer;
    }
`;
document.head.appendChild(style);
document.addEventListener("DOMContentLoaded", () => new TodoList());
