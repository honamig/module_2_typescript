const heading = document.querySelector("h1");

if (heading) {
    heading.textContent = "My TypeScript Task Planner";
}

console.log("TypeScript is connected");

// Task class
class Task {
    title: string;
    course: string;
    priority: number;
    completed: boolean;

    constructor(title: string, course: string, priority: number) {
        this.title = title;
        this.course = course;
        this.priority = priority;
        this.completed = false;
    }

    completeTask(): void {
        this.completed = true;
    }

    resetTask(): void {
        this.completed = false;
    }
}

// Store all tasks in an array
const tasks: Task[] = [];

// Get the HTML form
const taskForm = document.querySelector<HTMLFormElement>("#task-form");

if (taskForm) {
    taskForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault();

        const taskNameInput = document.querySelector<HTMLInputElement>("#task-name");
        const courseInput = document.querySelector<HTMLInputElement>("#course");
        const priorityInput = document.querySelector<HTMLSelectElement>("#priority");

        if (!taskNameInput || !courseInput || !priorityInput) {
            return;
        }

        const title: string = taskNameInput.value.trim();
        const course: string = courseInput.value.trim();
        const priority: number = Number(priorityInput.value);

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

// Display tasks on the webpage
function displayTasks(): void {
    const taskList = document.querySelector<HTMLUListElement>("#task-list");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    for (const task of tasks) {
        const listItem = document.createElement("li");

        listItem.textContent = `${task.title} - ${task.course} - Priority: ${task.priority}`;

        taskList.appendChild(listItem);
    }
}