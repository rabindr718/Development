import React, { useEffect, useState } from 'react';
import '../../configure/configure.css';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import DataTableHeaderr from '../../../components/tableHeader/DataTableHeaderr';
import Pagination from '../../../components/pagination/Pagination';
import { getAnyTableData } from '../../../../redux/apiActions/dataTableAction';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import DataNotFound from '../../../components/loader/DataNotFound';
import MicroLoader from '../../../components/loader/MicroLoader';

interface RowData {
  [key: string]: string | number | null; // Define possible data types for table cells
}

const DataTablle: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<any>('');
  const dispatch = useAppDispatch();
  const data: RowData[] = useAppSelector(
    (state) => state.dataTableSlice.tableData
  );
  const { dbCount, option, isLoading } = useAppSelector(
    (state) => state.dataTableSlice
  );
  const loading = useAppSelector((state) => state.dealer.loading);
  const error = useAppSelector((state) => state.dealer.error);

  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
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

  const countWords = (str: string): number => {
    return str.trim().split(/\s+/).length;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = currentPage * itemsPerPage;
  console.log(currentPage * itemsPerPage, '', itemsPerPage);

  useEffect(() => {
    if (selectedTable.value) {
      const pageNumber = {
        page_number: currentPage,
        page_size: itemsPerPage,
        filters: [
          {
            Column: 'table_name',
            Operation: '=',
            Data: selectedTable.value,
          },
        ],
      };
      dispatch(getAnyTableData(pageNumber));
    }
  }, [dispatch, currentPage, selectedTable]);

  useEffect(() => {
    setSelectedTable({
      label: option?.[0]?.table_name,
      value: option?.[0]?.table_name,
    });
  }, [option]);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  const propertyNames: string[] = data?.length > 0 ? Object.keys(data[0]) : [];
  const orderedColumns: string[] = propertyNames.reverse();

  const replaceEmptyOrNull = (value: string | number | null) => {
    return value === null || value === '' ? 'N/A' : value;
  };

  const totalPages = Math.ceil(dbCount / itemsPerPage);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds} ${milliseconds}`;
  };

  console.log(data, 'show data');
  return (
    <div className="commissionContainer" style={{ overflow: 'visible' }}>
      <DataTableHeaderr
        title={selectedTable.value?.replaceAll('_', ' ')}
        onPressFilter={() => {}}
        onPressImport={() => {}}
        showImportIcon={false}
        showSelectIcon={true}
        showFilterIcon={false}
        setCurrentPage={setCurrentPage}
        selectMarginLeft="-10px"
        selectMarginLeft1="-20px"
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        menuWidth="219px"
      />
      {isLoading || loading ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MicroLoader />
        </div>
      ) : data && data.length > 0 ? (
        <>
          <div
            className="TableContainer"
            style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}
          >
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  {orderedColumns?.map?.((columnName, index) => (
                    <th style={{ textTransform: 'capitalize' }} key={index}>
                      {columnName?.replaceAll?.('_', ' ')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data?.map?.((item, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>{startIndex + rowIndex + 1}</td>
                    {orderedColumns.map((columnName, colIndex) => (
                      <td key={colIndex}>
                        {[
                          'fin_pv_redlined_date',
                          'contract_date',
                          'install_eta',
                          'mpu_reschedule_count',
                          'site_survey_scheduled_date',
                        ].includes(columnName) ? (
                          formatDate(item[columnName] as string | undefined)
                        ) : columnName === 'status' ? (
                          item[columnName] === 'Active' ? (
                            <span style={{ color: '#15C31B' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: '#15C31B',
                                  marginRight: '5px',
                                }}
                              ></span>
                              Active
                            </span>
                          ) : (
                            <span style={{ color: '#F82C2C' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  backgroundColor: '#F82C2C',
                                  marginRight: '5px',
                                }}
                              ></span>
                              Inactive
                            </span>
                          )
                        ) : columnName === 'details' ? (
                          <>
                            {item.details ? (
                              typeof item.details === 'string' ? (
                                <>
                                  {item.details.length > 5 ? (
                                    <>
                                      {item.details
                                        .replace(/<\/?p>/g, '')
                                        .slice(0, 5)}
                                      ...
                                      <button
                                        onClick={() =>
                                          setOpenTooltipIndex(
                                            openTooltipIndex === rowIndex
                                              ? null
                                              : rowIndex
                                          )
                                        }
                                        data-tooltip-id={`tooltip-${rowIndex}`}
                                        data-tooltip-content={item.details.replace(
                                          /<\/?p>/g,
                                          ''
                                        )}
                                        data-tooltip-place="bottom"
                                        style={{
                                          marginLeft: '5px',
                                          border: 'none',
                                          background: 'none',
                                          color:
                                            openTooltipIndex === rowIndex
                                              ? '#F82C2C'
                                              : '#3083e5',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        {openTooltipIndex === rowIndex
                                          ? 'Show less'
                                          : 'Show more'}
                                      </button>
                                      <ReactTooltip
                                        id={`tooltip-${rowIndex}`}
                                        className="custom-tooltip"
                                        isOpen={openTooltipIndex === rowIndex}
                                      />
                                    </>
                                  ) : (
                                    item.details.replace(/<\/?p>/g, '')
                                  )}
                                </>
                              ) : (
                                item.details.toString().replace(/<\/?p>/g, '')
                              )
                            ) : (
                              replaceEmptyOrNull(item[columnName])
                            )}
                          </>
                        ) : (
                          replaceEmptyOrNull(item[columnName])
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="page-heading-container">
            <p className="page-heading">
              {start} - {end > dbCount ? dbCount : end} of {dbCount} item
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              currentPageData={data}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              perPage={itemsPerPage}
            />
          </div>
        </>
      ) : (
        <div>
          <DataNotFound title="You don't have any table permissions." />
          <br />
        </div>
      )}
    </div>
  );
};

export default DataTablle;
