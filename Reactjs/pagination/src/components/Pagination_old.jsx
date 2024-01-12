import { useEffect, useState } from "react";

const Pagination = ({ showPagination, onPageWindowChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const valueofPageShow = showPagination * counter;
    console.log("Rabindra", valueofPageShow);
    onPageWindowChange(valueofPageShow - showPagination, valueofPageShow);
  }, [counter]);

  const onPaginationClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPagination) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <button
        className="btn btn-primary"
        onClick={() => {
          onPaginationClick("prev");
        }}
      >
        Prev{" "}
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          onPaginationClick("next");
        }}
      >
        {" "}
        Next
      </button>
    </div>
  );
};
export default Pagination;
