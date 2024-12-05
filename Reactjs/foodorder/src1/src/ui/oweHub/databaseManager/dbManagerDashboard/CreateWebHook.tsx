import React, { useEffect, useState } from 'react';
import '../../configure/configure.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { fetchDealer } from '../../../../redux/apiSlice/configSlice/config_get_slice/dealerSlice';
import { DealerModel } from '../../../../core/models/configuration/create/DealerModel';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import DataTableHeader from '../../../components/tableHeader/DataTableHeader';
import { FaArrowDown } from 'react-icons/fa6';

const CreateWebHook: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [filterOPen, setFilterOpen] = React.useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const dispatch = useAppDispatch();
  const dealerList = useAppSelector((state) => state.dealer.Dealers_list);
  const loading = useAppSelector((state) => state.dealer.loading);
  const error = useAppSelector((state) => state.dealer.error);
  const [editMode, setEditMode] = useState(false);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    const pageNumber = {
      page_number: 1,
      page_size: 10,
    };
    dispatch(fetchDealer(pageNumber));
  }, [dispatch]);
  const handleAddDealer = () => {
    setEditMode(false);
    // setEditDealer(null);
    handleOpen();
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
      uname: '1234567890',
      dbname: '345612',
      error: 'Invalid data',
      date: '10/04/2024  3:00AM',
    },
    {
      uname: '1234567890',
      dbname: '345612',
      error: 'Invalid data',
      date: '10/04/2024  3:00AM',
    },
    {
      uname: '1234567890',
      dbname: '345612',
      error: 'Invalid data',
      date: '10/04/2024  3:00AM',
    },
  ];

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
          showSelectIcon={true}
          showFilterIcon={true}
        />
        {/* {filterOPen && <FilterDealer handleClose={filterClose}
          columns={columns}
          page_number={1}
          page_size={5} />} */}

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
                    <FaArrowDown style={{ color: '#667085' }} />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Item Id</p> <FaArrowDown style={{ color: '#667085' }} />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Error</p> <FaArrowDown style={{ color: '#667085' }} />
                  </div>
                </th>
                <th>
                  <div className="table-header">
                    <p>Data & Time</p>{' '}
                    <FaArrowDown style={{ color: '#667085' }} />
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {dataDb?.length > 0
                ? dataDb?.map((el, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: '500', color: 'black' }}>
                        {el.uname}
                      </td>
                      <td>{el.dbname}</td>
                      <td>{el.error}</td>
                      <td>{el.date}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      {/* {
        dataDb?.length > 0 ? <Pagination
          currentPage={currentPage}
          totalPages={totalPages} // You need to calculate total pages
          paginate={paginate}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
        /> : null
      } */}
    </div>
  );
};

export default CreateWebHook;
