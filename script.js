document.addEventListener("DOMContentLoaded", setup); 

function setup() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const highlightTasksButton = document.getElementById("highlightTasksButton");
    const removeCompletedButton = document.getElementById("removeCompletedButton");


    addTaskButton.onclick = handleAddTask;
    taskList.onclick = toggleCompleted;
    //highlightTasksButton.onclick = highlightTasks;
    removeCompletedButton.onclick = removeCompletedTasks;


    function handleAddTask() {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const li = document.createElement("li");
            li.textContent = taskText;
            li.className = "task";
            taskList.appendChild(li);
            taskInput.value = "";
        } else {
            console.log("No task entered.");
        }
    }

    function toggleCompleted(event) {
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("completed");
        }
    }

    // function highlightTasks() {
    //     const tasks = document.getElementsByClassName("task");
    //     for (let i = 0; i < tasks.length; i++) {
    //         tasks[i].style.backgroundColor = "Aqua";
    //     }
    // }

    function removeCompletedTasks() {
        const completedTasks = document.querySelectorAll(".completed");
        for (let i = completedTasks.length - 1; i >= 0; i--) {
            completedTasks[i].remove();
        }
    }

    function highlightTasks() {
        const tasks = document.getElementsByClassName("task");
        const highlightColor = "yellow"; // Change to your desired highlight color
        const defaultColor = ""; // Default background color
    
        for (let task of tasks) {
            // Toggle the background color between highlightColor and defaultColor
            task.style.backgroundColor = task.style.backgroundColor === highlightColor ? defaultColor : highlightColor;
        }
    }
    
    document.getElementById("highlightTasksButton").onclick = highlightTasks;
    
}