import React, { Dispatch, SetStateAction, useState } from 'react';
import '../userManagement/user.css';
import '../configure/configure.css';
import CheckBox from '../../components/chekbox/CheckBox';
import { useAppSelector } from '../../../redux/hooks';
import HelpDashboard from './HelpDashboard';
import { CommissionModel } from '../../../core/models/configuration/create/CommissionModel';
import ProjectBreakdown from './ProjectBreakdown';
import Pagination from '../../components/pagination/Pagination';
import { ICONS } from '../../../resources/icons/Icons';
import MicroLoader from '../../components/loader/MicroLoader';
import SortableHeader from '../../components/tableHeader/SortableHeader';
import dealerPayColumn from '../../../resources/static_data/configureHeaderData/dealerPayColumn';
import DataNotFound from '../../components/loader/DataNotFound';
import { toggleRowSelection } from '../../components/chekbox/checkHelper';
import { dateFormat } from '../../../utiles/formatDate';

const DashBoardTable = ({
  currentPage,
  setCurrentPage,
  data,
  count,
  loading
}: {
  data: any,
  count: number,
  loading: any,
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
  const [editedCommission] = useState<CommissionModel | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [openIcon, setOpenIcon] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>({});

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const handleIconOpen = () => setOpenIcon(true);
  const handleIconClose = () => setOpenIcon(false);
  const [editMode, setEditMode] = useState(false);
  const itemsPerPage = 25;
  const totalPages = Math.ceil(count / itemsPerPage);
  const currentPageData = data?.slice();
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;
  const isAnyRowSelected = selectedRows.size > 0;
  const isAllRowsSelected = selectedRows.size === currentPageData?.length;

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage: any = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSort = (key: any) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  if (sortKey) {
    currentPageData.sort((a: any, b: any) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        // Ensure numeric values for arithmetic operations
        const numericAValue =
          typeof aValue === 'number' ? aValue : parseFloat(aValue);
        const numericBValue =
          typeof bValue === 'number' ? bValue : parseFloat(bValue);
        return sortDirection === 'asc'
          ? numericAValue - numericBValue
          : numericBValue - numericAValue;
      }
    });
  }

  console.log(data, "currentpage")

  return (
    <>
      <div className="dashBoard-container">
        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',height:"100%" }}>
            <MicroLoader />
          </div> : (currentPageData.length === 0 && !loading) ? <div className="flex items-center justify-center" style={{height:"100%"}}>
            <DataNotFound />
          </div>

            : <table>
              <thead>
                <tr>
                  {dealerPayColumn?.map((item, key) => (
                    <SortableHeader
                      key={key}
                      isCheckbox={item.isCheckbox}
                      titleName={item.displayName}
                      data={data}
                      isAllRowsSelected={isAllRowsSelected}
                      isAnyRowSelected={isAnyRowSelected}
                      selectAllChecked={selectAllChecked}
                      setSelectAllChecked={setSelectAllChecked}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      sortKey={item.name}
                      sortDirection={
                        sortKey === item.name ? sortDirection : undefined
                      }
                      onClick={() => handleSort(item.name)}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  currentPageData?.map((el: any, index: any) => (
                    <tr key={index}>
                      <td style={{ fontWeight: '500' }}>
                        <div className="flex-check">
                          <CheckBox
                            checked={selectedRows.has(index)}
                            onChange={() => {
                              if (currentPageData?.length === 1) {
                                setSelectAllChecked(true);
                                setSelectedRows(new Set([0]));
                              } else {
                                toggleRowSelection(
                                  index,
                                  selectedRows,
                                  setSelectedRows,
                                  setSelectAllChecked
                                );
                              }
                            }}
                          />
                          <span
                            className="zoom-out-td"
                            onClick={() => {
                              setOpen(true);
                              setEditData(el);
                            }}
                          >
                            {el.unique_id || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td style={{ color: '#101828' }}>{el.home_owner || 'N/A'}</td>
                      <td>{el.current_status || 'N/A'}</td>
                      <td>{el.dealer_code || 'N/A'}</td>
                      <td>{el.sys_size || 'N/A'}</td>
                      <td>{el.contract || 'N/A'}</td>
                      <td>{el.other_adders || 'N/A'}</td>
                      <td>{el.rep1 || 'N/A'}</td>
                      <td>{el.rep2 || 'N/A'}</td>
                      <td>{el.setter || 'N/A'}</td>
                      <td>{el.st || 'N/A'}</td>
                      <td style={{ color: '#101828' }}>
                        {(el.contract_date && dateFormat(el.contract_date)) ||
                          'N/A'}
                      </td>
                      <td>{el.loan_fee || 'N/A'}</td>
                      <td>
                        {el.net_epc ? el.net_epc : 'N/A'}
                      </td>
                      <td style={{ color: '#15C31B', fontWeight: '500' }}>

                        {el.credit ? '$' + el.credit : '$0'}
                      </td>
                      <td>{el.draw_amt || '$0'}</td>
                      <td>{el.rl || 'N/A'}</td>
                      
                      <td>{dateFormat(el.today) || 'N/A'}</td>
                      <td style={{ color: '#63BC51', fontWeight: '500' }}>
                        ${el.amount ?? 'N/A'}
                      </td>
                      <td>{el.epc ? el.epc : 'N/A'}</td>
                      <td style={{ color: '#EB5CAE', fontWeight: '500' }}>
                        ${el.amt_paid ?? 'N/A'}
                      </td>
                      <td style={{ color: '#379DE3', fontWeight: '500' }}>
                        {el.balance ? '$' + el.balance : '$0'}
                      </td>
                      <td className="zoom-out-help">
                        <img
                          src={ICONS.online}
                          style={{
                            height: '18px',
                            width: '18px',
                            stroke: '0.2',
                          }}
                          alt=""
                          onClick={() => {
                            setEditData(el);
                            handleIconOpen();
                          }}
                        />
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          }
        </div>
        {currentPageData?.length > 0 ? (
          <div className="page-heading-container">
            <p className="page-heading">
              Showing {startIndex} - {endIndex > count ? count : endIndex} of{' '}
              {count} item
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages} // You need to calculate total pages
              paginate={paginate}
              currentPageData={currentPageData}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              perPage={itemsPerPage}
            />
          </div>
        ) : null}
      </div>
      {open && (
        <ProjectBreakdown
          commission={editedCommission}
          editMode={editMode}
          data={editData}
          handleClose={() => {
            setOpen(false);
          }}
        />
      )}
      {openIcon && (
        <HelpDashboard data={editData} handleClose={handleIconClose} />
      )}
    </>
  );
};

export default DashBoardTable;
