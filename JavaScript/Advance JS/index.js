// function x() {
//   for (var i = 1; i <= 5; i++) {
//     function close(x) {
//       setTimeout(function () {
//         console.log(x);
//       }, x * 1000);
//     }
//     close(i);
//   }
//   console.log("Jay Dwarkadhish");
// }
// x();
// enDED************************************************************
// function x() {
//   var i = 1;
//   setTimeout(function () {
//     console.log(i);
//   }, 3000);
//   console.log("X-Man");
// }
// x();
// enDED************************************************************
// function x() {
//   for (let i = 1; i <= 5; i++) {
//     setTimeout(function () {
//       console.log(i);
//     }, i * 1000);
//   }
//   console.log("X-Man");
// }
// x();
// enDED************************************************************
// function x() {
//   for (let i = 1; i <= 5; i++) {
//     function end() {
//       setTimeout(function () {
//         console.log(i);
//       }, i * 1000);
//     }
//     end();
//   }
//   console.log("X-Man");
// }
// x();
// ABOVE TWO sECTION ARE SAME
// enDED************************************************************
// function x() {
//   var i = 15;
//   function y() {
//     setTimeout(() => {
//       console.log(i);
//     }, 3000);
//   }
//   console.log("X-Master");

//   y();
//   console.log("X-Man");
// }
// x();

// enDED*****Now  CLOSURE     *******************************************************
function x() {
  var i = 15;
  return function y() {
    console.log(i);
  };
  console.log("X-Master");
  //   return y;
}
var z = x();
console.log(z);
z();
// Function along with lexical scope bundled togethor forms closure
