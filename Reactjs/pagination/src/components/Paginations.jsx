import { useEffect, useState } from "react";

const Pagination = ({ showPagination }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const valueofPageShow = showPagination * counter;
    console.log("Rabindra", valueofPageShow);
  }, [counter]);
  const onPageWindowChange = (start, end) => {
    console.log(start, end);
  };
  return (
    <div className="d-flex justify-content-between">
      <button
        className="btn btn-primary"
        onClick={() => {
          setCounter(counter - 1);
        }}
      >
        Prev{" "}
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        {" "}
        Next
      </button>
    </div>
  );
};
export default Pagination;
