import React, { useEffect, useState } from 'react';
import '../configure.css';
import CreateSalesPartner from './createSalesPartner';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

import { ICONS } from '../../../../resources/icons/Icons';
import TableHeader from '../../../components/tableHeader/TableHeader';
import { fetchDealer } from '../../../../redux/apiSlice/configSlice/config_get_slice/dealerSlice';
import CheckBox from '../../../components/chekbox/CheckBox';
import { toggleRowSelection } from '../../../components/chekbox/checkHelper';
import { DealerModel } from '../../../../core/models/configuration/create/DealerModel';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { toast } from 'react-toastify';
import Pagination from '../../../components/pagination/Pagination';
import { PartnerPayScheduleColumn } from '../../../../resources/static_data/configureHeaderData/partnerPayScheduleColumn';
import SortableHeader from '../../../components/tableHeader/SortableHeader';
import DataNotFound from '../../../components/loader/DataNotFound';
import Loading from '../../../components/loader/Loading';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { HTTP_STATUS } from '../../../../core/models/api_models/RequestModel';
import { configPostCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { ROUTES } from '../../../../routes/routes';
import { showAlert, successSwal } from '../../../components/alert/ShowAlert';
import FilterHoc from '../../../components/FilterModal/FilterHoc';
import MicroLoader from '../../../components/loader/MicroLoader';
import { FilterModel } from '../../../../core/models/data_models/FilterSelectModel';
import { dateFormat } from '../../../../utiles/formatDate';
import { checkLastPage } from '../../../../utiles';
import Papa from 'papaparse';

const SalesPartnerSchedule: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [filterOPen, setFilterOpen] = React.useState<boolean>(false);
  const [viewArchived, setViewArchived] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const filterClose = () => setFilterOpen(false);
  const dispatch = useAppDispatch();
  const dealerList = useAppSelector((state) => state.dealer.Dealers_list);

  const error = useAppSelector((state) => state.dealer.error);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [selectAllChecked, setSelectAllChecked] = useState<boolean>(false);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [data, setData] = useState<any>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExportingData, setIsExporting] = useState(false);
  const itemsPerPage = 25;
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [editedDealer, setEditDealer] = useState<DealerModel | null>(null);
  const [filters, setFilters] = useState<FilterModel[]>([]);
  const [dealer, setDealer] = useState<{ [key: string]: any }>({});
  useEffect(() => {
    const pageNumber = {
      page_number: currentPage,
      page_size: itemsPerPage,
      archived: viewArchived ? true : undefined,
      filters,
    };
    dispatch(fetchDealer(pageNumber));
  }, [dispatch, currentPage, viewArchived, filters]);

  const getnewformData = async () => {
    const tableData = {
      tableNames: ['sub_dealer', 'dealer', 'states'],
    };
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    setDealer((prev) => ({ ...prev, ...res.data }));
  };

  useEffect(() => {
    getnewformData();
  }, []);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleAddDealer = () => {
    setEditMode(false);
    setEditDealer(null);
    handleOpen();
  };

  const filter = () => {
    setFilterOpen(true);
  };
  const handleEditDealer = (dealerData: DealerModel) => {
    setEditMode(true);
    setEditDealer(dealerData);
    handleOpen();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await configPostCaller('get_partnerpayschedule', {
          page_number: currentPage,
          page_size: itemsPerPage,
          filters,
        });

        if (data.status > 201) {
          toast.error(data.message);
          setLoading(false);
          return;
        }
        setData(data?.data?.PartnerPayScheduleData);
        setTotalCount(data?.dbRecCount);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
      }
    })();
  }, [currentPage, viewArchived, filters]);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentPageData = data?.slice();
  const isAnyRowSelected = selectedRows.size > 0;
  const isAllRowsSelected = selectedRows.size === data?.length;
  const startIndex = (currentPage - 1) * itemsPerPage + 1;

  const endIndex = currentPage * itemsPerPage;
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
  const handleArchiveAllClick = async () => {
    const confirmed = await showAlert(
      'Are Your Sure',
      'This Action will archive your data',
      'Yes',
      'No'
    );
    if (confirmed) {
      const archivedRows = Array.from(selectedRows).map(
        (index) => dealerList[index].record_id
      );
      if (archivedRows.length > 0) {
        const newValue = {
          record_id: archivedRows,
          is_archived: true,
        };

        const pageNumber = {
          page_number: currentPage,
          page_size: itemsPerPage,
        };

        const res = await postCaller(EndPoints.update_dealer_archive, newValue);
        if (res.status === HTTP_STATUS.OK) {
          // If API call is successful, refetch commissions
          setSelectAllChecked(false);
          setSelectedRows(new Set());

          dispatch(fetchDealer(pageNumber));
          checkLastPage(
            currentPage,
            totalPages,
            setCurrentPage,
            selectedRows.size,
            currentPageData.length
          );

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
      };
      const res = await postCaller(EndPoints.update_dealer_archive, newValue);
      if (res.status === HTTP_STATUS.OK) {
        dispatch(fetchDealer(pageNumber));
        setSelectAllChecked(false);
        setSelectedRows(new Set());
        checkLastPage(
          currentPage,
          totalPages,
          setCurrentPage,
          selectedRows.size,
          currentPageData.length
        );
        await successSwal('Archived', 'The data has been archived ');
      } else {
        await successSwal('Archived', 'The data has been archived ');
      }
    }
  };

  const handleExportOpen = () => {
    exportCsv();
  };
  const handleViewArchiveToggle = () => {
    setViewArchived(!viewArchived);
    // When toggling, reset the selected rows
    setSelectedRows(new Set());
    setSelectAllChecked(false);
  };
  const fetchFunction = (req: any) => {
    setCurrentPage(1);
    setFilters(req.filters);
  };
  if (error) {
    return (
      <div className="loader-container">
        <Loading />
      </div>
    );
  }
  const notAllowed = selectedRows.size > 1;

  const exportCsv = async () => {
    // Define the headers for the CSV
    // Function to remove HTML tags from strings
    const removeHtmlTags = (str: any) => {
      if (!str) return '';
      return str.replace(/<\/?[^>]+(>|$)/g, '');
    };
    setIsExporting(true);
    const exportData = await configPostCaller('get_partnerpayschedule', {
      page_number: 1,
      page_size: totalCount,
    });
    if (exportData.status > 201) {
      toast.error(exportData.message);
      return;
    }

    const headers = [
      'Sales Partner',
      'Finance Partner',
      'Spps Ref',
      'State',
      'Sug',
      'Rep Pay',
      'Red Line',
      'Sales Partner Draw %',
      'Sales Partner Not_to_exceed',
      'Sales Rep Draw%',
      'Sales Rep Not_to_exceed',
      'Active Start Date',
      'Active End Date',
    ];

    const csvData = exportData?.data?.PartnerPayScheduleData?.map?.(
      (item: any) => [
        item.sales_partner,
        item.finance_partner,
        item.spps_ref,
        item.state,
        item.sug,
        item.rep_pay,
        item.redline,
        item.m1_sales_partner_draw_percentage,
        item.m1_sales_partner_not_to_exceed,
        item.m1_sales_rep_draw_percentage,
        item.m1_sales_rep_not_to_exceed,
        dateFormat(item.active_date_start),
        dateFormat(item.active_date_end),
      ]
    );

    const csvRows = [headers, ...csvData];

    const csvString = Papa.unparse(csvRows);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'salespartnerschedule.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
  };
  return (
    <div className="comm">
      <div className="commissionContainer">
        <TableHeader
          title="Sales Partner Pay Schedule"
          onPressViewArchive={() => {
            handleViewArchiveToggle();
            setCurrentPage(1);
            setSelectAllChecked(false);
            setSelectedRows(new Set());
          }}
          onPressArchive={() => handleArchiveAllClick()}
          onPressFilter={() => filter()}
          onPressImport={() => {}}
          viewArchive={viewArchived}
          onpressExport={() => handleExportOpen()}
          checked={isAllRowsSelected}
          isAnyRowSelected={isAnyRowSelected}
          onpressAddNew={() => handleAddDealer()}
          isExportingData={isExportingData}
        />

        <FilterHoc
          resetOnChange={viewArchived}
          isOpen={filterOPen}
          handleClose={filterClose}
          columns={PartnerPayScheduleColumn}
          fetchFunction={fetchFunction}
          page_number={currentPage}
          page_size={itemsPerPage}
        />

        {open && (
          <CreateSalesPartner
            handleClose={handleClose}
            dealerData={editedDealer}
            editMode={editMode}
            page_number={currentPage}
            dealer={dealer}
            page_size={itemsPerPage}
          />
        )}
        <div
          className="TableContainer"
          style={{ overflowX: 'auto', whiteSpace: 'nowrap', height: '65vh' }}
        >
          {!loading && currentPageData?.length === 0 ? (
            <div
              style={{ height: '100%' }}
              className="flex items-center justify-center"
            >
              <DataNotFound />
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  {PartnerPayScheduleColumn.map((item, key) => (
                    <SortableHeader
                      key={key}
                      isCheckbox={item.isCheckbox}
                      titleName={item.displayName}
                      data={dealerList}
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
                {loading ? (
                  <tr>
                    <td colSpan={PartnerPayScheduleColumn.length}>
                      <div
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        <MicroLoader />
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentPageData?.map((el: any, i: any) => (
                    <tr
                      key={i}
                      className={selectedRows.has(i) ? 'selected' : ''}
                    >
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
                          {el.sales_partner || 'N/A'}
                        </div>
                      </td>
                      <td>{el.finance_partner || 'N/A'}</td>
                      <td>{el.spps_ref || 'N/A'}</td>
                      <td>{el.state?.trim?.() || 'N/A'}</td>
                      <td>{el.sug || 'N/A'}</td>
                      <td>{el.rep_pay || 'N/A'}</td>
                      <td>{el.redline || 'N/A'}</td>
                      <td>{el.m1_sales_partner_draw_percentage || 'N/A'}</td>
                      <td>{el.m1_sales_partner_not_to_exceed || 'N/A'}</td>
                      <td>{el.m1_sales_rep_draw_percentage || 'N/A'}</td>
                      <td>{el.m1_sales_rep_not_to_exceed || 'N/A'}</td>
                      <td>
                        {!el.active_date_start ||
                        new Date(el.active_date_start).getFullYear() === 1
                          ? 'N/A'
                          : dateFormat(el.active_date_start)}
                      </td>

                      <td>
                        {!el.active_date_end ||
                        new Date(el.active_date_end).getFullYear() === 1
                          ? 'N/A'
                          : dateFormat(el.active_date_end)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {data?.length > 0 ? (
          <div className="page-heading-container">
            <p className="page-heading">
              Showing {startIndex} -{' '}
              {endIndex > totalCount ? totalCount : endIndex} of {totalCount}{' '}
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
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SalesPartnerSchedule;
