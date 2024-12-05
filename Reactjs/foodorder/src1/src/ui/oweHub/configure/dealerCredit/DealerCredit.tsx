import React, { useEffect, useState } from 'react';
import '../configure.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { CSVLink } from 'react-csv';
import { ICONS } from '../../../../resources/icons/Icons';
import TableHeader from '../../../components/tableHeader/TableHeader';
import { getDealerCredit } from '../../../../redux/apiActions/config/dealerCreditAction';
import CheckBox from '../../../components/chekbox/CheckBox';
import { toggleRowSelection } from '../../../components/chekbox/checkHelper';
import Pagination from '../../../components/pagination/Pagination';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import CreateDealerCredit from './CreateDealerCredit';
import { ROUTES } from '../../../../routes/routes';
import { DealerCreditColumn } from '../../../../resources/static_data/configureHeaderData/dealerCreditColumn';
import SortableHeader from '../../../components/tableHeader/SortableHeader';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { showAlert, successSwal } from '../../../components/alert/ShowAlert';
import DataNotFound from '../../../components/loader/DataNotFound';
import MicroLoader from '../../../components/loader/MicroLoader';
import FilterHoc from '../../../components/FilterModal/FilterHoc';
import { FilterModel } from '../../../../core/models/data_models/FilterSelectModel';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { HTTP_STATUS } from '../../../../core/models/api_models/RequestModel';
import { dateFormat } from '../../../../utiles/formatDate';
import { CommissionModel } from '../../../../core/models/configuration/create/CommissionModel';
import { configPostCaller } from '../../../../infrastructure/web_api/services/apiUrl';

const DealerCredit: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [filterOPen, setFilterOpen] = React.useState<boolean>(false);
  const [exportOPen, setExportOpen] = React.useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleExportOpen = () => {
    exportCsv();
  }
  const filterClose = () => setFilterOpen(false);
  const dispatch = useAppDispatch();
  const { data, dbCount, isLoading } = useAppSelector(
    (state) => state.dealerCredit
  );
  const { isSuccess } = useAppSelector((state) => state.dealerCredit);
  const error = useAppSelector((state) => state.comm.error);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState<CommissionModel | null>(null);
  const itemsPerPage = 10;
  const [isExportingData, setIsExporting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [refresh, setRefresh] = useState(1);
  const [viewArchived, setViewArchived] = useState<boolean>(false);
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<FilterModel[]>([]);
  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: itemsPerPage,
      archived: viewArchived,
      filters,
    };
    dispatch(getDealerCredit(pageNumber));
  }, [dispatch, currentPage, viewArchived, filters, isSuccess, refresh]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const filter = () => {
    setFilterOpen(true);
  };

  const totalPages = Math.ceil(dbCount / itemsPerPage);


  
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = currentPage * itemsPerPage;
  const handleAddCommission = () => {
    setEditMode(false);
    setEditData(null);
    handleOpen();
  };

  const handleEditDealer = (dealerData: any) => {
    setEditMode(true);
    setEditData(dealerData);
    handleOpen();
  };

  const currentPageData = data?.slice();
  const isAnyRowSelected = selectedRows.size > 0;
  const isAllRowsSelected = selectedRows.size === data.length;
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

  //   useEffect(() => {

  //     (async () => {
  //       setLoading(true);
  //       try {
  //         const data = await configPostCaller('get_dealercredit', {
  //           page_number: currentPage,
  //           page_size: itemsPerPage,
  //         });

  //         if (data.status > 201) {
  //           toast.error(data.message);
  //           setLoading(false);
  //           return;
  //         }

  //         console.log(data, "data");

  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //       }
  //     })();

  // }, [
  //   currentPage, viewArchived, filters
  // ]);

  const fetchFunction = (req: any) => {
    setCurrentPage(1);
    setFilters(req.filters);
  };
  const handleArchiveAllClick = async () => {
    const confirmed = await showAlert(
      'Are Your Sure',
      'This Action will archive your data',
      'Yes',
      'No'
    );
    if (confirmed) {
      const archivedRows = Array.from(selectedRows).map(
        (index) => currentPageData[index].record_id
      );
      if (archivedRows.length > 0) {
        const newValue = {
          record_id: archivedRows,
          is_archived: true,
        };

        const pageNumber = {
          page_number: currentPage,
          page_size: itemsPerPage,
          filters,
        };

        const res = await postCaller('update_dealercredit_archive', newValue);
        if (res.status === HTTP_STATUS.OK) {
          setSelectedRows(new Set());
          setSelectAllChecked(false);
          // If API call is successful, refetch commissions
          setRefresh((prev) => prev + 1);

          setSelectAllChecked(false);
          setSelectedRows(new Set());
          await successSwal('Archived', 'The data has been archived ');
        } else {
          await successSwal('Archived', 'The data has been archived ');
        }
      }
    }
  };
  const handleArchiveClick = async (record_id: any) => {
    const confirmed = await showAlert(
      'Are Your Sure',
      'This Action will archive your data',
      'Yes',
      'No'
    );
    if (confirmed) {
      const archived: number[] = [record_id];
      let newValue = {
        record_id: archived,
        is_archived: true,
      };
      const pageNumber = {
        page_number: currentPage,
        page_size: itemsPerPage,
        filters,
      };
      const res = await postCaller('update_dealercredit_archive', newValue);
      if (res.status === HTTP_STATUS.OK) {
        setSelectedRows(new Set());
        setSelectAllChecked(false);
        setRefresh((prev) => prev + 1);

        await successSwal('Archived', 'The data has been archived ');
      } else {
        await successSwal('Archived', 'The data has been archived ');
      }
    }
  };

  const handleViewArchiveToggle = () => {
    setViewArchived(!viewArchived);
    // When toggling, reset the selected rows
    setSelectedRows(new Set());
    setSelectAllChecked(false);
  };
  const notAllowed = selectedRows.size > 1;
console.log(exportOPen)


const exportCsv = async () => {
  // Define the headers for the CSV
// Function to remove HTML tags from strings
const removeHtmlTags = (str:any) => {
  if (!str) return '';
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};
setIsExporting(true);
const exportData = await configPostCaller('get_dealercredit', {
  page_number: 1,
  page_size: dbCount,
});
if (exportData.status > 201) {
  toast.error(exportData.message);
  return;
}

  
  const headers = [
    'Unique ID',
    'Customer',
    'Credit Amt',
    'Credit Date',
    'Approved By',
    'Notes',
  ];

 
   
  const csvData = exportData?.data?.DealerCreditsData?.map?.((item: any) => [
    item.unique_id,
    item.customer,
    item.credit_amount,
    item.credit_date,
    "",
    removeHtmlTags(item.notes),
    
  ]);

  const csvRows = [headers, ...csvData];

  const csvString = Papa.unparse(csvRows);

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'dealercredit.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setIsExporting(false);
 
};
  
  return (
    <div className="comm">
      <div className="commissionContainer">
        <TableHeader
          title="Dealer Credit"
          onPressViewArchive={() => {
            handleViewArchiveToggle();
            setCurrentPage(1);
            setSelectAllChecked(false);
            setSelectedRows(new Set());
          }}
          onPressArchive={() => handleArchiveAllClick()}
          checked={isAllRowsSelected}
          isAnyRowSelected={isAnyRowSelected}
          onPressFilter={() => filter()}
          onPressImport={() => {}}
          viewArchive={viewArchived}
          onpressExport={() => handleExportOpen()}
          onpressAddNew={() => handleAddCommission()}
          isExportingData={isExportingData}
        />
        {exportOPen && (
          <div className="export-modal">
            <CSVLink
              style={{ color: '#04a5e8' }}
              data={currentPageData}
              filename={'table.csv'}
            >
              Export CSV
            </CSVLink>
          </div>
        )}
        {/* {filterOPen && <FilterCommission handleClose={filterClose}  
            columns={columns} 
             page_number = {currentPage}
             page_size = {itemsPerPage}

             />} */}
        {open && (
          <CreateDealerCredit
            editMode={editMode}
            setViewArchived={setViewArchived}
            editData={editData}
            handleClose={handleClose}
            page_number={currentPage}
            page_size={itemsPerPage}
          />
        )}

        <FilterHoc
          isOpen={filterOPen}
          resetOnChange={viewArchived}
          handleClose={filterClose}
          columns={DealerCreditColumn}
          page_number={currentPage}
          fetchFunction={fetchFunction}
          page_size={itemsPerPage}
        />

        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: "65vh" }}
        >
          <table>
            <thead>
              <tr>
                {DealerCreditColumn.map((item, key) => (
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
                {/* <th>
                  <div className="action-header">
                    <p>Action</p>
                  </div>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={DealerCreditColumn.length}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : currentPageData?.length > 0 ? (
                currentPageData?.map((el: any, i: any) => (
                  <tr key={i} className={selectedRows.has(i) ? 'selected' : ''}>
                    <td style={{ fontWeight: '500', color: 'black' }}>
                      <div className="flex-check">
                        {/* <CheckBox
                          checked={selectedRows.has(i)}
                          onChange={() =>
                            toggleRowSelection(
                              i,
                              selectedRows,
                              setSelectedRows,
                              setSelectAllChecked
                            )
                          }
                        /> */}
                        {el.unique_id}
                      </div>
                    </td>

                    
                    <td>{el.customer || 'N/A'}</td>
                    <td>{el.credit_amount || 'N/A'}</td>
                    <td>{dateFormat(el.credit_date) || 'N/A'}</td>
                    <td>{el.approved_by || 'N/A'}</td>
                    <td>
                      {el.notes
                        ? el.notes.replace(/<\/?[^>]+(>|$)/g, '')
                        : 'N/A'}
                    </td>
                    {/* <td>
                      {el.podio_link ? (
                        <p
                          onClick={() => window.open(el.podio_link, '_blank')}
                          className="view-button pointer"
                        >
                          View
                        </p>
                      ) : (
                        'N/A'
                      )}
                    </td> */}

                     
                  </tr>
                ))
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
        {currentPageData?.length > 0 ? (
          <div className="page-heading-container">
            <p className="page-heading">
              Showing {startIndex} - {endIndex > dbCount ? dbCount : endIndex}{' '}
              of {dbCount} item
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
    </div>
  );
};

export default DealerCredit;
