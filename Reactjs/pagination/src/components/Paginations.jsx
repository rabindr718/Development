import { useEffect, useState } from "react";

const Pagination = ({ showPagination, onPageWindowChange, total }) => {
  const [counter, setCounter] = useState(1);
  const [numberofButtons, setNumberOfButtons] = useState(
    Math.ceil(total / showPagination)
  );

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
      if (numberofButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                onPaginationClick("prev");
              }}
            >
              Previous
            </a>
          </li>

          {new Array(numberofButtons).fill("").map((el, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === counter ? "active" : null}`}
            >
              <a
                className="page-link"
                onClick={() => setCounter(index + 1)}
                href="!#"
              >
                {index + 1}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                onPaginationClick("next");
              }}
              href="!#"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Pagination;
