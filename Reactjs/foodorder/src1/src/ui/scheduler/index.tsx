import React, { useState } from 'react';
import styles from './styles/index.module.css';
import CustomersList from './components/CustomersList';
import PendingReview from './components/PendingReview';
import Pagination from '../components/pagination/Pagination';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import useMatchMedia from '../../hooks/useMatchMedia';

const Index = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false); // State lifted to parent

  const startIndex = (page - 1) * 10 + 1;
  const endIndex = page * 10;
  const totalPage = Math.ceil(totalCount / 10);
  const isMobile = useMatchMedia('(max-width:450px)');

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <div className={styles.firstDiv} style={{ marginLeft: '6px', marginTop: '6px', paddingRight: isMobile && !isClicked ? '23px': '' , paddingBottom: isMobile && !isClicked ? '0px': ''}}>
        <Breadcrumb
          head=""
          linkPara="Schedule"
          route={''}
          linkparaSecond=""
          marginLeftMobile="12px"
        />
        {isMobile && !isClicked ? (
          <div style={{ backgroundColor: !isClicked ? '#f5f5f5' : '' }} className={styles.pending_review_wrapper}>
            <PendingReview isClicked={isClicked} onToggleClick={handleClick} />
          </div>
        ) : ''}
      </div>
      {isClicked ? (<PendingReview isClicked={isClicked} onToggleClick={handleClick} />): ''}
       {/* <PendingReview isClicked={isClicked} onToggleClick={handleClick} /> */}

      <div className={`flex justify-between mt2 items-start`}>
        <div className={styles.customer_wrapper_list}>
          <CustomersList
            setTotalCount={setTotalCount}
            setPage={setPage}
            page={page}
          />

          {!!totalCount && (
            <div className="page-heading-container px0">
              <p className="page-heading">
                {startIndex} - {endIndex} of {totalCount} item
              </p>

              <Pagination
                currentPage={page}
                totalPages={totalPage} // You need to calculate total pages
                paginate={(num) => setPage(num)}
                currentPageData={[]}
                goToNextPage={() => 0}
                goToPrevPage={() => 0}
                perPage={10}
              />
            </div>
          )}
        </div>
        {!isMobile ? (
          <div className={styles.pending_review_wrapper}>
            <PendingReview isClicked={isClicked} onToggleClick={handleClick} />
          </div>
        ) : ''}
      </div>
    </>
  );
};

export default Index;
