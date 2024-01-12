const obj = [
  {
    name: "Rabindra",
    age: -10,
  },
  {
    name: "RaAz",
    age: 29,
  },
  {
    name: "Rabindra",
    age: 1,
  },
];

// const result = obj.map((x) => x.age);
// const resul = result.filter(function (x, y) {
//   return x > 0;
// });

// console.log(resul);
// let initialValue = 0;

// const res = result.reduce((acc, current) => acc + current);

// console.log(res);
// const val = result.reduce((acc, curr) => acc + curr);

// console.log(res);

// Reduce with FlatMap


// const ages = obj.reduce((acc, curr) => {
//   const { age } = curr;
//   const combinations = acc.flatMap((val) => [val + age, val]);
//   return combinations;
// }, [0]);

// console.log("All combinations of ages:");
// console.log(ages);

// Reduce with Old Methods

// const allAges = obj.reduce((acc, current) => {
//   const currentAges = acc.reduce((innerAcc, age) => {
//     innerAcc.push(age + current.age);
//     return innerAcc;
//   }, []);
  
//   return acc.concat(currentAges);
// }, [0]);

// console.log("All combinations of ages:");
// console.log(allAges);
