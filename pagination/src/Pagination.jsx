export const Pagination = ({ pageNo, setPageNo }) => {
  const previousThree = Array.from({ length: 3 }, (_, i) => pageNo - i - 1)
    .filter((item) => item > 0)
    .reverse();

  const nextFour = Array.from({ length: 4 }, (_, i) => pageNo + i);
  const paginationArr = [...previousThree, ...nextFour];

  return (
    <div className='pagination-container'>
      {pageNo > 1 && (
        <div className='page-btn' onClick={() => setPageNo(pageNo - 1)}>
          &lt;
        </div>
      )}
      {paginationArr.map((item) => (
        <div
          className={`page-btn ${item === pageNo ? 'active' : ''}`}
          key={item}
          onClick={() => setPageNo(item)}
        >
          {item}
        </div>
      ))}
      <div className='page-btn' onClick={() => setPageNo(pageNo + 1)}>
        &gt;
      </div>
    </div>
  );
};
