const numbers = [5, 2, 9, 1, 5, 6];

numbers.sort(function (a, b) {
  // Compare in descending order
  return b - a;
});
// Output: [9, 6, 5, 5, 2, 1]
console.log(numbers);
