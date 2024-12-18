document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("taskInput");
    var dueDateInput = document.getElementById("dueDateInput");
    var addTaskButton = document.getElementById("addTaskButton");
    var taskList = document.getElementById("taskList");
    var highlightTasksButton = document.getElementById("highlightTasksButton");
    var removeCompletedButton = document.getElementById("removeCompletedButton");
    var searchInput = document.getElementById("searchInput");

    // Load tasks from localStorage
    loadTasks();
    highlightOverdueTasks();

    // Add Task
    addTaskButton.onclick = function() {
        var taskText = `${taskInput.value} (Due: ${dueDateInput.value})`;
        var existingTasks = Array.from(document.querySelectorAll(".task")).map(task => task.textContent.replace("Delete", "").trim());
        if (taskInput.value.trim() !== "" && !existingTasks.includes(taskText)) {
            var li = document.createElement("li");
            li.className = "task";
            li.textContent = taskText;

            // Add delete button
            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                if (confirm("Are you sure you want to delete this task?")) {
                    li.remove();
                    saveTasks();
                }
            };
            li.appendChild(deleteButton);

            taskList.appendChild(li);
            taskInput.value = "";
            dueDateInput.value = "";
            saveTasks();
            highlightOverdueTasks();
        }
    };

    // Mark as Completed
    taskList.onclick = function(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("completed");
            saveTasks();
        }
    };

    // Highlight Tasks
    highlightTasksButton.onclick = function() {
        var tasks = document.getElementsByClassName("task");
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].classList.toggle("highlighted");
        }
    };

    // Remove Completed Tasks
    removeCompletedButton.onclick = function() {
        var completedTasks = document.querySelectorAll(".completed");
        for (var i = 0; i < completedTasks.length; i++) {
            completedTasks[i].remove();
        }
        saveTasks();
    };

    // Search Tasks
    searchInput.oninput = function() {
        var filter = searchInput.value.toLowerCase();
        var tasks = document.getElementsByClassName("task");
        for (var i = 0; i < tasks.length; i++) {
            var taskText = tasks[i].textContent.toLowerCase();
            tasks[i].style.display = taskText.includes(filter) ? "" : "none";
        }
    };

    // Save tasks to localStorage
    function saveTasks() {
        var tasks = [];
        var taskElements = document.querySelectorAll(".task");
        taskElements.forEach(function(task) {
            tasks.push({
                text: task.textContent.replace("Delete", "").trim(),
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            var li = document.createElement("li");
            li.className = "task";
            li.textContent = task.text;

            if (task.completed) {
                li.classList.add("completed");
            }

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = function() {
                li.remove();
                saveTasks();
            };
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    }

    // Highlight overdue tasks
    function highlightOverdueTasks() {
        var tasks = document.querySelectorAll(".task");
        var today = new Date().toISOString().split('T')[0];
        tasks.forEach(function(task) {
            var dueDate = task.textContent.match(/\(Due: (.*?)\)/)[1];
            if (dueDate < today) {
                task.classList.add("overdue");
            }
        });
    }
});
