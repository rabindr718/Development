import React, { useEffect, useState } from 'react';

import '../../configure/configure.css';
import './hooktable.css';
import { FaArrowDown } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchCommissions } from '../../../../redux/apiSlice/configSlice/config_get_slice/commissionSlice';
import { setCurrentPage } from '../../../../redux/apiSlice/paginationslice/paginationSlice';
import { DealerModel } from '../../../../core/models/configuration/create/DealerModel';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import DataTableHeader from '../../../components/tableHeader/DataTableHeader';
import Pagination from '../../../components/pagination/Pagination';

const Webhook: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [filterOPen, setFilterOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const dealerList = useAppSelector((state) => state.dealer.Dealers_list);
  const loading = useAppSelector((state) => state.dealer.loading);
  const error = useAppSelector((state) => state.dealer.error);
  const [columns, setColumns] = useState<string[]>([]);
  const currentPage = useAppSelector(
    (state) => state.paginationType.currentPage
  );
  const itemsPerPage = 7;

  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: itemsPerPage,
    };
    dispatch(fetchCommissions(pageNumber));
  }, [dispatch, currentPage]);

  const paginate = (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  const goToNextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const goToPrevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };
  const getColumnNames = () => {
    if (dealerList.length > 0) {
      const keys = Object.keys(dealerList[0]);
      setColumns(keys);
    }
  };

  const filter = () => {
    setFilterOpen(true);
    getColumnNames();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const dataDb = [
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Invalid Data',
      col4: '20/03/2024  10:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Data not found',
      col4: '04/03/2024  12:00 PM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'NA',
      col4: '22/03/2024  1:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Invalid Data',
      col4: '20/03/2024  10:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Data not found',
      col4: '04/03/2024  12:00 PM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'NA',
      col4: '22/03/2024  1:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Invalid Data',
      col4: '20/03/2024  10:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Data not found',
      col4: '04/03/2024  12:00 PM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'NA',
      col4: '22/03/2024  1:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Invalid Data',
      col4: '20/03/2024  10:00 AM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'Data not found',
      col4: '04/03/2024  12:00 PM',
    },
    {
      col1: '1234567890',
      col2: '1234',
      col3: 'NA',
      col4: '22/03/2024  1:00 AM',
    },
  ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = dataDb.slice(startIndex, endIndex);
  const totalPages = Math.ceil(dataDb.length / itemsPerPage);

  return (
    <div className="comm">
      <Breadcrumb
        head="Created"
        linkPara="Database"
        route={''}
        linkparaSecond="Created"
      />
      <div className="commissionContainer">
        <DataTableHeader
          title="Failed Webhooks"
          onPressFilter={() => filter()}
          onPressImport={() => {}}
          showImportIcon={false}
          showSelectIcon={false}
          showFilterIcon={true}
        />

        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          <table>
            <thead>
              <tr>
                <th>
                  <div className="table-header">
                    <p>Webhook ID</p>{' '}
                    <FaArrowDown
                      style={{ color: '#667085', textAlign: 'left' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Item ID</p>{' '}
                    <FaArrowDown
                      style={{ color: '#667085', textAlign: 'left' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Error</p>{' '}
                    <FaArrowDown
                      style={{ color: '#667085', textAlign: 'left' }}
                    />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Date & Time</p>{' '}
                    <FaArrowDown
                      style={{ color: '#667085', textAlign: 'left' }}
                    />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPageData?.length > 0
                ? currentPageData?.map((el, i) => (
                    <tr key={i}>
                      <td
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          textAlign: 'left',
                        }}
                      >
                        {el.col1}
                      </td>
                      <td
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          textAlign: 'left',
                        }}
                      >
                        {el.col2}
                      </td>
                      <td
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          textAlign: 'left',
                        }}
                      >
                        {el.col3}
                      </td>
                      <td
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          textAlign: 'left',
                        }}
                      >
                        {el.col4}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>

        <div className="page-heading-container">
          <p className="page-heading">
            {currentPage} - {totalPages} of {currentPageData?.length} item
          </p>

          {dataDb?.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // You need to calculate total pages
              paginate={paginate}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              perPage={itemsPerPage}
              currentPageData={currentPageData}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Webhook;
