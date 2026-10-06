let studentName: string = "Honami";
let age: number = 25;
let isStudent: boolean = true;

console.log(studentName);
console.log(age);
console.log(isStudent);

// Javascript ↓
// function greet(name) {
//     return "Hello " + name;
// }

function greet(name: string): string { //: string is return type
    return "Hello " + name;
}

console.log(greet("Honami"));

function createTask(taskName: string, priority: number): string {
    return `${taskName} - Priority: ${priority}`;
}

console.log(createTask("Finish CSE 310", 3));

let courses: string[] = ["CSE 310", "WDD 360", "ART 235", "ART 235L"];

console.log(courses);
console.log(courses[0]);

for (let course of courses) {
    console.log(course);
}

let food: string[] = ["Sushi", "Okonomiyaki", "Yakiniku"];

console.log(food);
console.log(food[2]);


let taskInfo: [string, number, boolean] = [
    "CSE 310 Project",
    3,
    false
 ];

 console.log(taskInfo);
 console.log(taskInfo[0]);
 console.log(taskInfo[1]);
 console.log(taskInfo[2]);

 let student: [string, number, boolean] = [
    "BYUI",
    24,
    true
 ]