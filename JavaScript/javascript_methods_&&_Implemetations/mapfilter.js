console.log("Hello Rabindra");

// const name = (document.getElementById("name").innerHTML = "The Rabindra");
// name.style.color = "red";
const array = [5, 10, 3, 6];

// Map
// Return as Multiple
const result = array.map((x) => {
  return x * 2;
});

const binary = array.map((x) => x.toString(2));
console.log(result);
// console.log(index);
console.log(binary);
console.log(array);

//Reduce
function findAdd(iterator) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum = sum + array[i];
  }
  return sum;
}
console.log(findAdd(array));

const output = array.reduce((iterator, index) => {
  iterator = iterator + index;
  return iterator;
}, 0);

console.log(output);
