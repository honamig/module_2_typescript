"use strict";
const heading = document.querySelector("h1");
if (heading) {
    heading.textContent = "My TypeScript Task Planner";
}
console.log("TypeScript is connected");
// Task class
class Task {
    constructor(title, course, priority) {
        this.title = title;
        this.course = course;
        this.priority = priority;
        this.completed = false;
    }
    completeTask() {
        this.completed = true;
    }
    resetTask() {
        this.completed = false;
    }
}
// Store all tasks in an array
const tasks = [];
// Get the HTML form
const taskForm = document.querySelector("#task-form");
if (taskForm) {
    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const taskNameInput = document.querySelector("#task-name");
        const courseInput = document.querySelector("#course");
        const priorityInput = document.querySelector("#priority");
        if (!taskNameInput || !courseInput || !priorityInput) {
            return;
        }
        const title = taskNameInput.value.trim();
        const course = courseInput.value.trim();
        const priority = Number(priorityInput.value);
        if (title === "" || course === "") {
            return;
        }
        const newTask = new Task(title, course, priority);
        tasks.push(newTask);
        console.log("Task added:", newTask);
        console.log("All tasks:", tasks);
        taskForm.reset();
    });
}
