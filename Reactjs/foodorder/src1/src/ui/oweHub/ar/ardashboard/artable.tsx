import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import CheckBox from '../../../components/chekbox/CheckBox';
import { toggleRowSelection } from '../../../components/chekbox/checkHelper';
import Pagination from '../../../components/pagination/Pagination';
import SortableHeader from '../../../components/tableHeader/SortableHeader';
import '../../configure/configure.css';
import { BiSupport } from 'react-icons/bi';
import { getAR } from '../../../../redux/apiActions/config/arAction';
import ArHelp from './ArHelp';
import DataNotFound from '../../../components/loader/DataNotFound';
import MicroLoader from '../../../components/loader/MicroLoader';
import { FilterModel } from '../../../../core/models/data_models/FilterSelectModel';

export const Commissioncolumns = [
  {
    name: 'unique_id',
    displayName: 'UID',
    type: 'string',
    isCheckbox: true,
  },
  {
    name: 'partner',
    displayName: 'Partner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'installer',
    displayName: 'Installer',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'type',
    displayName: 'Type',
    type: 'string',
    isCheckbox: false,
  },

  {
    name: 'home_owner',
    displayName: 'Home Owner',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'street_address',
    displayName: 'Strt Add',
    type: 'string',
    isCheckbox: false,
  },
  { name: 'city', displayName: 'City', type: 'string', isCheckbox: false },
  { name: 'st', displayName: 'State', type: 'string', isCheckbox: false },
  { name: 'zip', displayName: 'Zip', type: 'number', isCheckbox: false },
  {
    name: 'sys_size',
    displayName: 'Sys Size',
    type: 'number',
    isCheckbox: false,
  },
  { name: 'wc', displayName: 'WC', type: 'date', isCheckbox: false },
  {
    name: 'inst_sys',
    displayName: 'Inst Sys',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'status',
    displayName: 'Status',
    type: 'string',
    isCheckbox: false,
  },
  {
    name: 'status_date',
    displayName: 'Status Date',
    type: 'date',
    isCheckbox: false,
  },
  {
    name: 'contract_calc',
    displayName: 'Contract Calc',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'owe_ar',
    displayName: 'Owe Ar',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'total_paid',
    displayName: 'Total Paid',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'current_due',
    displayName: 'Current Due',
    type: 'number',
    isCheckbox: false,
  },
  {
    name: 'balance',
    displayName: 'Balance',
    type: 'number',
    isCheckbox: false,
  },
];
const ArDashBoardTable = ({
  setCurrentPage,
  currentPage,
  additionalFilter,
  includedFilter,
}: {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  additionalFilter: FilterModel[];
  includedFilter: string[];
}) => {
  const [pageSize1, setPageSize1] = useState(10);
  const [openIcon, setOpenIcon] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { data, count, filters, isLoading } = useAppSelector(
    (state) => state.ardata
  );
  const error = useAppSelector((state) => state.comm.error);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [editedCommission, setEditedCommission] = useState<{
    [key: string]: any;
  }>({});
  const itemsPerPage = 10;
  const [viewArchived, setViewArchived] = useState<boolean>(false);

  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: pageSize1,
      archived: viewArchived ? true : undefined,
      report_type: filters.report_type,
      sale_partner: filters.sale_partner,
      sort_by: filters.sort_by,
      shaky: includedFilter.includes('Shaky'),
      cancel: includedFilter.includes('Cancel'),
      sold: includedFilter.includes('SOLD'),
      permits: includedFilter.includes('QC/Permit/NTP'),
      ntp: includedFilter.includes('QC/Permit/NTP'),
      install: includedFilter.includes('Install'),
      pto: includedFilter.includes('PTO'),
      filters: additionalFilter,
    };
    dispatch(getAR(pageNumber));
  }, [
    dispatch,
    currentPage,
    pageSize1,
    viewArchived,
    filters,
    additionalFilter,
    includedFilter,
  ]);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(count / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;

  const currentPageData = data?.slice();

  const isAnyRowSelected = selectedRows?.size > 0;
  const isAllRowsSelected = selectedRows?.size === data?.length;

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
  if (error) {
    return <div>{error}</div>;
  }

  const handleIconOpen = () => setOpenIcon(true);
  const handleIconClose = () => setOpenIcon(false);

  return (
    <div className="comm">
      <div className="commissionContainer">
        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
        >
          <table>
            {!!currentPageData?.length && (
              <thead>
                <tr>
                  {Commissioncolumns?.map((item, key) => (
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
                  {viewArchived === true ? null : (
                    <th>
                      <div className="action-header">
                        <p>Help</p>
                      </div>
                    </th>
                  )}
                </tr>
              </thead>
            )}

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : currentPageData?.length > 0 ? (
                currentPageData?.map(
                  (el: (typeof currentPageData)[0], i: any) => (
                    <tr
                      key={i}
                      className={selectedRows.has(i) ? 'selected' : ''}
                    >
                      <td style={{ fontWeight: '500', color: 'black' }}>
                        <div className="flex-check">
                          <CheckBox
                            checked={selectedRows.has(i)}
                            onChange={() => {
                              // If there's only one row of data and the user clicks its checkbox, select all rows
                              if (currentPageData?.length === 1) {
                                setSelectAllChecked(true);
                                setSelectedRows(new Set([0]));
                              } else {
                                toggleRowSelection(
                                  i,
                                  selectedRows,
                                  setSelectedRows,
                                  setSelectAllChecked
                                );
                              }
                            }}
                          />
                          {el.unique_id}
                        </div>
                      </td>
                      <td>{el.partner || 'N/A'}</td>
                      <td>{el.installer || 'N/A'}</td>

                      <td>{el.type || 'N/A'}</td>
                      <td>{el.home_owner || 'N/A'}</td>
                      <td>{el.street_address || 'N/A'}</td>
                      <td>{el.city || 'N/A'}</td>
                      <td>{el.st || 'N/A'}</td>
                      <td>{el.zip || 'N/A'}</td>
                      <td>{el.sys_size || 'N/A'}</td>
                      <td>{el.wc || 'N/A'}</td>
                      <td>{el.inst_sys || 'N/A'}</td>
                      <td>{el.status || 'N/A'}</td>
                      <td>{el.status_date || 'N/A'}</td>
                      <td>{el.contract_calc || 'N/A'}</td>
                      <td>{el.owe_ar || 'N/A'}</td>
                      <td>{el?.total_paid}</td>
                      <td>{el?.current_due}</td>
                      <td>{el.balance || 'N/A'}</td>
                      <td
                        style={{
                          height: '14px',
                          width: '14px',
                          stroke: '0.2',
                          cursor: 'pointer',
                        }}
                        className="support-icon"
                      >
                        <BiSupport
                          onClick={() => {
                            setEditedCommission(el);
                            handleIconOpen();
                          }}
                        />
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={12}>
                    <DataNotFound />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="page-heading-container">
          {!!currentPageData.length && (
            <>
              <p className="page-heading">
                {startIndex} - {endIndex > count ? count : endIndex} of {count}{' '}
                item
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
            </>
          )}
          {openIcon && (
            <ArHelp
              data={{
                id: editedCommission.unique_id,
                name: editedCommission.partner,
                home_owner: editedCommission.home_owner,
                state: editedCommission.st,
                sys_size: editedCommission.sys_size,
                contract_calc: editedCommission.contract_calc,
                current_due: editedCommission.current_due,
                balance: editedCommission.balance,
              }}
              handleClose={handleIconClose}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArDashBoardTable;
