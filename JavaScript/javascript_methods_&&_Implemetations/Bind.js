let name = {
  firstname: "Rabindra",
  lastname: "Sharma",
};
let printName = function (hometown, state, country) {
  console.log(
    this.firstname + " " + this.lastname + " " + hometown + " " + state
  );
};
//Prebuilt bind method of javascript
let printMyName = printName.bind(name, "Siwan", "Bihar");
printMyName(" India");

// Implements Bind Method as Own method as Bind working called eveywhere
Function.prototype.mybind = function (...args) {
  let obj = this,
    params = args.slice(1);
  return function (...args2) {
    obj.apply(args[0], [...params, ...args2]);
  };
};
let printMyName2 = printName.mybind(name, "Delhi", " Bihar");
printMyName2("India");
