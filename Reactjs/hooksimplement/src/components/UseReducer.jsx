import React, { useReducer } from "react";

const intialstate = 0;
const reducer = (state, action) => {
  switch (action) {
    case "Increment":
      return state + 1;
    case "Decrement":
      return state - 1;
    default:
      return state;
  }
};
function First() {
  const [count, dispatch] = useReducer(reducer, intialstate);
  return (
    <div>
      <p>count={count}</p>
      <button onClick={() => dispatch("Increment")}>Increment</button>
      <button onClick={() => dispatch("Decrement")}>Decrement</button>
    </div>
  );
}

export default First;
