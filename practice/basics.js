"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let studentName = "Honami";
let age = 25;
let isStudent = true;
console.log(studentName);
console.log(age);
console.log(isStudent);
// Javascript ↓
// function greet(name) {
//     return "Hello " + name;
// }
function greet(name) {
    return "Hello " + name;
}
console.log(greet("Honami"));
function createTask(taskName, priority) {
    return `${taskName} - Priority: ${priority}`;
}
console.log(createTask("Finish CSE 310", 3));
let courses = ["CSE 310", "WDD 360", "ART 235", "ART 235L"];
console.log(courses);
console.log(courses[0]);
for (let course of courses) {
    console.log(course);
}
let food = ["Sushi", "Okonomiyaki", "Yakiniku"];
console.log(food);
console.log(food[2]);
//# sourceMappingURL=basics.js.map