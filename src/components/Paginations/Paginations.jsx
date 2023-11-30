import React from "react";
import Pagination from "react-bootstrap/Pagination";
const Paginations = ({
  handlePrevious,
  handleNext,
  page,
  pageCount,
  setPage,
}) => {
  return (
    <div className="pagination_div  d-flex justify-content-end mx-5 ">
      {pageCount > 0 ? (
        <Pagination>
          <Pagination.Prev onClick={() => handlePrevious()} />
          {Array(pageCount)
            .fill(null)
            .map((element, index) => {
              return (
                <>
                  <Pagination.Item
                    active={page === index + 1 ? true : false}
                    onClick={() => setPage(index + 1)}
                    cursor="pointer"
                  >
                    {index + 1}
                  </Pagination.Item>
                </>
              );
            })}

          <Pagination.Next onClick={() => handleNext()} />
        </Pagination>
      ) : (
        ""
      )}
    </div>
  );
};

export default Paginations;
