// function x() {
//   const a = 7;
//   function y() {
//     console.log(a);
//   }
//   console.log(a);

//   return y;
// }
// var z = x();
// console.log(z);
// x();

// console.log("Start");
// setTimeout(function cb() {
//   console.log("Running");
// }, 5000);
// let count = 0;
// document.getElementById("clickMe").addEventListener("click", function zyx() {
//   console.log("Button Click Time", ++count);
// });

// setTimeout(function cbT() {
//   console.log("CB Timeout");
// }, 5000);
// fetch("https://api.netflix.com").then(function cbF() {
//   console.log("CB Netflix");
// });
// console.log("The End");

// const radius = [3, 4, 6, 1];

// const area = function (radius) {
//   return Math.PI * radius * radius;
// };

// const circumfrence = function (radius) {
//   return 2 * Math.PI * radius;
// };

// const diameter = function (radius) {
//   return 2 * radius;
// };

// const calculate = function (radius, Logicfunction) {
//   const result = [];
//   for (let i = 0; i < radius.length; i++) {
//     result.push(Logicfunction(radius[i]));
//   }
//   return result;
// };
// const calculate = function (radius, logic) {
//   const output = [];
//   for (let i = 0; i < radius.length; i++) {
//     output.push(logic(radius[i]));
//   }
//   return output;
// };

// console.log("Circumfrence of Circle", radius.map(circumfrence));
// console.log("Area of Circle", calculate(radius, area));
// console.log("Circumfrence of Circle", calculate(radius, circumfrence));
// console.log("Diameter of Circle", calculate(radius, diameter));

// const arr = [3, 2, 1, 5, 7, 8, 9];

// const output = arr.map(function binary(x) {
//   return x.toString(2);
// });

//With Arrow Function
// const output = arr.map((x) => x.toString(2));

// const output1 = arr.filter((x) => x % 2);
// console.log(output1);
// console.log(output);

// for (let i = 0; i < arr.length; i++) {
//   let sum = 0;
//   // if(arr[i]>arr){
//   sum = sum + arr[i];
//   // }
//   console.log(sum);
// }

const users = [
  { firstname: "Rabindra", lastname: "Sharma", age: 23 },
  { firstname: "Mahendra Singh", lastname: "Dhoni", age: 43 },
  { firstname: "Virat", lastname: "Kohli", age: 34 },
  { firstname: "Sheyas", lastname: "Iyer", age: 29 },
  { firstname: "Ravindra", lastname: "Jadeja", age: 34 },
];

// This is Acess The keys
// const key = Object.keys(users[0]);
// console.log(key);

//This is Acess The values
// console.log(users[1].firstname);
// console.log(users[1].lastname);
// console.log(users[1].age);
// ALL VALUES ARE ACCESSED
// for (let i = 0; i < users.length; i++) {
//   console.log(users[i].firstname, "", users[i].lastname, "", users[i].age);
// }

// Cobined Use Map and Filter
// const output = users.filter((x) => x.age > 25).map((x) => x.firstname + " "+ x);
// console.log(output);

//Here we have Use Reduce

const output = users.reduce((acc, curr) => {
  if (curr.age < 35) {
    acc.push(curr.firstname);
  }
  return acc;
}, []);

console.log(output);
