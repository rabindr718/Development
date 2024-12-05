import React, { useEffect, useState } from 'react';
import '../../configure/configure.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { FaArrowDown } from 'react-icons/fa6';
import { fetchDBManagerUserActivity } from '../../../../redux/apiActions/DBManagerAction/DBManagerAction';
import { getCurrentDateFormatted } from '../../../../utiles/formatDate';
import { DBManagerUserActivityModel } from '../../../../core/models/api_models/DBManagerModel';
import DataNotFound from '../../../components/loader/DataNotFound';
import Pagination from '../../../components/pagination/Pagination';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import './Useractivity.css';
import MicroLoader from '../../../components/loader/MicroLoader';
import { FaArrowUp } from 'react-icons/fa';

const UserActivity: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, userActivityList, totalCount } = useAppSelector(
    (state) => state.dbManager
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 10;
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [slicedData, setSlicedData] = useState<DBManagerUserActivityModel[]>(
    []
  );
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openTooltipIndex !== null &&
        !(event.target as HTMLElement).closest(
          `[data-tooltip-id="tooltip-${openTooltipIndex}"]`
        )
      ) {
        setOpenTooltipIndex(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openTooltipIndex]);

  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: itemsPerPage,
      start_date: '2024-05-01', //TODO: Need to change in future
      end_date: getCurrentDateFormatted(), // current date
    };
    dispatch(fetchDBManagerUserActivity(pageNumber));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (userActivityList) {
      setSlicedData(userActivityList);
    }
  }, [userActivityList]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filter = () => {};

  const countWords = (str: string): number => {
    return str.trim().split(/\s+/).length;
  };
  console.log(
    [...slicedData].sort((a, b) =>
      a.query_details.trim().localeCompare(b.query_details.trim())
    ),
    'sorted'
  );

  const sortRows = (key: string) => {
    setSortKey((prev) => (prev === key ? '' : key));
    const sorted = [...slicedData]?.sort((a, b) => {
      if (sortOrder === 'asc') {
        setSortOrder('desc');
        if (key === 'query_details') {
          return a.query_details.trim().localeCompare(b.query_details.trim());
        }
        return b[key as keyof DBManagerUserActivityModel] <
          a[key as keyof DBManagerUserActivityModel]
          ? -1
          : 1;
      } else {
        setSortOrder('asc');
        if (key === 'query_details') {
          return b.query_details.trim().localeCompare(a.query_details.trim());
        }
        return a[key as keyof DBManagerUserActivityModel] >
          b[key as keyof DBManagerUserActivityModel]
          ? 1
          : -1;
      }
    });
    setSlicedData(sorted);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;

  return (
    <div className="comm">
      <Breadcrumb
        head="User Activity"
        linkPara="Database Manager"
        route={''}
        linkparaSecond="User Activity"
      />
      <div className="commissionContainer">
        <div className="commissionSection" style={{ marginLeft: '15px' }}>
          <h3>Activity List</h3>
        </div>
        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          <table>
            <thead>
              <tr>
                <th style={{ paddingLeft: '30px' }}>
                  <div
                    className="table-header"
                    onClick={() => sortRows('username')}
                  >
                    <p>User Name</p>{' '}
                    {sortKey === 'username' ? (
                      <FaArrowUp style={{ color: '#667085' }} />
                    ) : (
                      <FaArrowDown style={{ color: '#667085' }} />
                    )}
                  </div>
                </th>
                <th>
                  <div
                    className="table-header"
                    onClick={() => sortRows('db_name')}
                  >
                    <p>DB Name</p>{' '}
                    {sortKey === 'db_name' ? (
                      <FaArrowUp style={{ color: '#667085' }} />
                    ) : (
                      <FaArrowDown style={{ color: '#667085' }} />
                    )}
                  </div>
                </th>
                <th>
                  <div
                    className="table-header"
                    onClick={() => sortRows('time_date')}
                  >
                    <p>Time & Date</p>{' '}
                    {sortKey === 'time_date' ? (
                      <FaArrowUp style={{ color: '#667085' }} />
                    ) : (
                      <FaArrowDown style={{ color: '#667085' }} />
                    )}
                  </div>
                </th>
                <th>
                  <div
                    className="table-header"
                    onClick={() => sortRows('query_details')}
                  >
                    <p>Query Details</p>{' '}
                    {sortKey === 'query_details' ? (
                      <FaArrowUp style={{ color: '#667085' }} />
                    ) : (
                      <FaArrowDown style={{ color: '#667085' }} />
                    )}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : slicedData && slicedData?.length > 0 ? (
                slicedData?.map(
                  (el: DBManagerUserActivityModel, index: number) => {
                    const tooltipId = `tooltip-${index}`;
                    const truncatedQueryDetails =
                      el.query_details.slice(0, 50) + '...';
                    const wordCount = countWords(el.query_details);

                    return (
                      <tr key={index}>
                        <td
                          style={{
                            fontWeight: '500',
                            color: 'black',
                            paddingLeft: '30px',
                            textAlign: 'left',
                          }}
                        >
                          {el.username}
                        </td>
                        <td style={{ textAlign: 'left' }}>{el.db_name}</td>
                        <td style={{ textAlign: 'left' }}>{el.time_date}</td>

                        <td style={{ textAlign: 'left' }}>
                          {el.query_details.length > 50 ? (
                            <>
                              <span
                                style={{
                                  maxWidth: '250px',
                                  marginBottom: '-5px',
                                  display: 'inline-block',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {el.query_details}
                              </span>
                              <button
                                onClick={() =>
                                  setOpenTooltipIndex(
                                    openTooltipIndex === index ? null : index
                                  )
                                }
                                data-tooltip-id={tooltipId}
                                data-tooltip-content={el.query_details}
                                data-tooltip-place="bottom"
                                style={{
                                  marginLeft: '5px',
                                  border: 'none',
                                  background: 'none',
                                  color:
                                    openTooltipIndex === index
                                      ? '#F82C2C'
                                      : '#3083e5',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                }}
                              >
                                {openTooltipIndex === index
                                  ? 'Show less'
                                  : 'Show more'}
                              </button>
                              <ReactTooltip
                                id={tooltipId}
                                className="custom-tooltip"
                                isOpen={openTooltipIndex === index}
                              />
                            </>
                          ) : (
                            el.query_details
                          )}
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={10}>
                    <DataNotFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="page-heading-container">
          <p className="page-heading">
            {startIndex} - {endIndex > totalCount ? totalCount : endIndex} of{' '}
            {totalCount} item
          </p>

          {slicedData && slicedData?.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // You need to calculate total pages
              paginate={paginate}
              currentPageData={slicedData.slice(startIndex, endIndex)}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              perPage={itemsPerPage}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserActivity;
