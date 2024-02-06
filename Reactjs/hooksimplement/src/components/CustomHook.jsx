import React, { useState } from "react";

function CustomHook() {
  const [count, setCount] = useState(0);
  const Increment = () => {
    setCount(count + 1);
  };
  const Decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      CustomHook
      <p>{count}</p>
      <button onClick={Increment}>Increase</button>
      <button onClick={Decrement}>Decrease</button>
    </div>
  );
}

export default CustomHook;
