"use strict";
/**
 * Task Planner (TypeScript)
 *
 * A simple task manager. Users add tasks with a name, a course,
 * and a priority. They can edit, mark as completed, or delete tasks.
 *
 * TypeScript features used in this file:
 *   - Variables with types   e.g. const tasks: Task[]
 *   - Functions with types   e.g. validateTaskInput(...): void
 *   - Classes                Task
 *   - Arrays                 tasks: Task[]
 *   - Tuples                 PriorityInfo = [string, number]
 *   - Exception handling     throw / try / catch (stretch challenge)
 */
const heading = document.querySelector("h1");
if (heading) {
    heading.textContent = "My TypeScript Task Planner";
}
console.log("TypeScript is connected");
// Return the label and level for a priority number (1, 2, or 3)
function getPriorityInfo(priority) {
    if (priority === 3) {
        return ["High", 3];
    }
    if (priority === 2) {
        return ["Medium", 2];
    }
    return ["Low", 1];
}
// Task class: holds the data for one task
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
    // Replace the editable fields with new values
    updateTask(title, course, priority) {
        this.title = title;
        this.course = course;
        this.priority = priority;
    }
}
// Store all tasks in an array
const tasks = [];
// Index of the task being edited, or null when no task is in edit mode
let editingIndex = null;
// Get the HTML form and the error message area
const taskForm = document.querySelector("#task-form");
const errorMessage = document.querySelector("#error-message");
// Show an error message on the page (an empty string clears it)
function showError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
    }
}
// Check the input. If something is wrong, throw an Error to stop the process
function validateTaskInput(title, course, priority) {
    if (title === "") {
        throw new Error("Please enter a task name.");
    }
    if (course === "") {
        throw new Error("Please enter a course name.");
    }
    if (priority !== 1 && priority !== 2 && priority !== 3) {
        throw new Error("Priority must be 1, 2, or 3.");
    }
}
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
        try {
            validateTaskInput(title, course, priority);
            const newTask = new Task(title, course, priority);
            tasks.push(newTask);
            console.log("Task added:", newTask);
            console.log("All tasks:", tasks);
            showError("");
            displayTasks();
            taskForm.reset();
        }
        catch (error) {
            if (error instanceof Error) {
                showError(error.message);
            }
            else {
                showError("An unexpected error occurred.");
            }
            console.error(error);
        }
    });
}
// Build the input fields used while editing one task
function createEditControls(task) {
    const container = document.createElement("div");
    container.classList.add("edit-controls");
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = task.title;
    nameInput.setAttribute("aria-label", "Task name");
    const courseInput = document.createElement("input");
    courseInput.type = "text";
    courseInput.value = task.course;
    courseInput.setAttribute("aria-label", "Course");
    // Build the priority options from the same tuple helper used for labels
    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("aria-label", "Priority");
    for (const level of [1, 2, 3]) {
        const [label] = getPriorityInfo(level);
        const option = document.createElement("option");
        option.value = String(level);
        option.textContent = label;
        option.selected = level === task.priority;
        prioritySelect.appendChild(option);
    }
    // Save: check the new values, then update the task
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("text-button");
    saveButton.addEventListener("click", () => {
        const title = nameInput.value.trim();
        const course = courseInput.value.trim();
        const priority = Number(prioritySelect.value);
        try {
            // If the check fails, the update below is skipped and catch runs
            validateTaskInput(title, course, priority);
            task.updateTask(title, course, priority);
            editingIndex = null;
            showError("");
            displayTasks();
        }
        catch (error) {
            // Stay in edit mode so the user can fix the input
            if (error instanceof Error) {
                showError(error.message);
            }
            else {
                showError("An unexpected error occurred.");
            }
            console.error(error);
        }
    });
    // Cancel: leave edit mode without saving
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.classList.add("text-button");
    cancelButton.addEventListener("click", () => {
        editingIndex = null;
        showError("");
        displayTasks();
    });
    container.appendChild(nameInput);
    container.appendChild(courseInput);
    container.appendChild(prioritySelect);
    container.appendChild(saveButton);
    container.appendChild(cancelButton);
    return container;
}
// Display tasks on the webpage
function displayTasks() {
    const taskList = document.querySelector("#task-list");
    if (!taskList) {
        return;
    }
    taskList.innerHTML = "";
    // forEach gives each task (Task) and its position (number) in the array
    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        if (task.completed) {
            listItem.classList.add("completed");
        }
        // Checkbox: checking it marks the task as completed
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                task.completeTask();
            }
            else {
                task.resetTask();
            }
            displayTasks();
        });
        listItem.appendChild(checkbox);
        if (editingIndex === index) {
            // Edit mode: show input fields instead of the text
            listItem.appendChild(createEditControls(task));
        }
        else {
            // Normal mode: show the text, priority label, and buttons
            const text = document.createElement("span");
            text.textContent = `${task.title} - ${task.course}`;
            // Priority label: the tuple gives us the label and the level (text only, no color)
            const [label, level] = getPriorityInfo(task.priority);
            const badge = document.createElement("span");
            badge.textContent = label;
            badge.dataset.level = String(level);
            badge.classList.add("priority-label");
            // Edit button: switches this row into edit mode
            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("text-button");
            editButton.addEventListener("click", () => {
                editingIndex = index;
                showError("");
                displayTasks();
            });
            // Delete button: removes this task from the array
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                // Keep editingIndex pointing at the same task after the removal
                if (editingIndex === index) {
                    editingIndex = null;
                }
                else if (editingIndex !== null && editingIndex > index) {
                    editingIndex -= 1;
                }
                displayTasks();
            });
            listItem.appendChild(text);
            listItem.appendChild(badge);
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
        }
        taskList.appendChild(listItem);
    });
}
displayTasks();
