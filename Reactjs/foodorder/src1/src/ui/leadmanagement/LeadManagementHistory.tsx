import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/lmhistory.module.css';
import { ICONS } from '../../resources/icons/Icons';
import SortingDropDown from './components/SortingDropDown';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/pagination/Pagination';
import useMatchMedia from '../../hooks/useMatchMedia';
import { DateRange } from 'react-date-range';
import Papa from 'papaparse';
import {
  addMinutes,
  endOfWeek,
  format,
  parseISO,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import Select, { SingleValue } from 'react-select';
import useAuth from '../../hooks/useAuth';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import DataNotFound from '../components/loader/DataNotFound';
import MicroLoader from '../components/loader/MicroLoader';
import { MdDownloading } from 'react-icons/md';
import { LuImport } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { IoInformationOutline } from 'react-icons/io5';
import Profile from './Modals/ProfileInfo';
import useEscapeKey from '../../hooks/useEscape';

interface HistoryTableProp {
  first_name: string;
  last_name: string;
  phone_number: string;
  email_id: string;
  street_address: string;
  zipcode: string;
  deal_date: string;
  deal_status: string;
  leads_id: number;
  appointment_scheduled_date: string;
  appointment_accepted_date: string;
  appointment_declined_date: string;
  appointment_date: string | null;
  deal_won_date: string | null;
  deal_lost_date: string | null;
  proposal_sent_date: string | null;
  timeline: any;
}

export type DateRangeWithLabel = {
  label?: string;
  start: Date;
  end: Date;
};

const LeradManagementHistory = () => {
  const navigate = useNavigate();
  const [see, setSee] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [leadId, setLeadId] = useState(0);
  const [itemsPerPage, setItemPerPage] = useState(10);
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = page * itemsPerPage;
  const totalPage = Math.ceil(totalCount / itemsPerPage);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const dateRangeRef = useRef<HTMLDivElement>(null);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);
  const [expandedItemIds, setExpandedItemIds] = useState<number[]>([]);
  const [isAuthenticated, setAuthenticated] = useState(false);

  function getUserTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  // Function to get current date in the user's timezone
  function getCurrentDateInUserTimezone() {
    const now = new Date();
    const userTimezone = getUserTimezone();
    return addMinutes(now, now.getTimezoneOffset());
  }
  const today = new Date();

  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // assuming week starts on Monday, change to 0 if it starts on Sunday
  const startOfThisMonth = startOfMonth(today);
  const startOfThisYear = startOfYear(today);
  const startOfLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  const startOfThreeMonthsAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    1
  );
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

  // Calculate the start and end of last week
  const startOfLastWeek = startOfWeek(subDays(startOfThisWeek, 1), {
    weekStartsOn: 1,
  });
  const endOfLastWeek = endOfWeek(subDays(startOfThisWeek, 1), {
    weekStartsOn: 1,
  });

  const periodFilterOptions: DateRangeWithLabel[] = [
    {
      label: 'This Week',
      start: startOfThisWeek,
      end: today,
    },
    {
      label: 'Last Week',
      start: startOfLastWeek,
      end: endOfLastWeek,
    },
    {
      label: 'This Month',
      start: startOfThisMonth,
      end: today,
    },
    {
      label: 'Last Month',
      start: startOfLastMonth,
      end: endOfLastMonth,
    },
    {
      label: 'This Quarter',
      start: startOfThreeMonthsAgo,
      end: today,
    },
    {
      label: 'This Year',
      start: startOfThisYear,
      end: today,
    },
  ];

  // const [selectedPeriod, setSelectedPeriod] = useState<DateRangeWithLabel | null>(null);

  const [selectedPeriod, setSelectedPeriod] =
    useState<DateRangeWithLabel | null>(
      periodFilterOptions.find((option) => option.label === 'This Week') || null
    );

  const [selectedRanges, setSelectedRanges] = useState([
    
      { startDate: startOfThisWeek, endDate: today, key: 'selection' },
    
  ]);

  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: startOfThisWeek,
    endDate: today,
  });

  const handleRangeChange = (ranges: any) => {
    setSelectedRanges([ranges.selection]);
    // setSelectedPeriod(null);
  };

  const onReset = () => {
    const currentDate = new Date();
    setSelectedDates({ startDate: startOfThisWeek, endDate: today });
    setSelectedPeriod(
      periodFilterOptions.find((option) => option.label === 'This Week') || null
    );
    setSelectedRanges([
      {
        startDate: currentDate,
        endDate: currentDate,
        key: 'selection',
      },
    ]);
    setIsCalendarOpen(false);
  };

  const onApply = () => {
    const startDate = selectedRanges[0].startDate;
    const endDate = selectedRanges[0].endDate;
    setSelectedDates({ startDate, endDate });
    setSelectedPeriod(null);
    setIsCalendarOpen(false);
  };

  const handleCrossClick = () => {
    setSelectedItemIds([]);
    setCheckedCount(0);
  };

  const handleView = (itemId: number) => {
    console.log("RABINDRA ")
    setLeadId(itemId);
    setIsProfileOpen(true);

  };

  const handleCross = () => {
    navigate('/leadmng-dashboard');
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleCalendar = () => {
    setIsCalendarOpen((prevState) => !prevState);
  };

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItemIds((prevSelectedItemIds = []) => {
      if (prevSelectedItemIds.includes(itemId)) {
        setCheckedCount((prevCount) => prevCount - 1);
        return prevSelectedItemIds.filter((id) => id !== itemId);
      } else {
        setCheckedCount((prevCount) => prevCount + 1);
        return [...prevSelectedItemIds, itemId];
      }
    });
  };

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dateRangeRef.current &&
      !dateRangeRef.current.contains(event.target as Node) &&
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      setIsCalendarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [selectedValue, setSelectedValue] = useState<number>(-1);

  const handleSortingChange = (value: number) => {
    if (!value) {
      setSelectedValue(-1);
    } else {
      setSelectedValue(value);
    }
  };

  const { authData, saveAuthData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [historyTable, setHistoryTable] = useState<HistoryTableProp[]>([]);
  const [refresh, setRefresh] = useState(1);
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();

    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await postCaller(
            'leads_history',
            {
              leads_status: selectedValue,
              start_date: selectedDates.startDate
                ? `${format(selectedDates.startDate, 'dd-MM-yyy')}`
                : '',
              end_date: selectedDates.endDate
                ? `${format(selectedDates.endDate, 'dd-MM-yyy')}`
                : '',
              page_size: itemsPerPage,
              page_number: page,
            },
            true
          );

          if (response.status > 201) {
            toast.error(response.data.message);
            setIsLoading(false);
            return;
          }
          if (response.data?.leads_history_list) {
            setHistoryTable(
              response.data?.leads_history_list as HistoryTableProp[]
            );
            setTotalCount(response.dbRecCount);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [
    isAuthenticated,
    selectedDates,
    itemsPerPage,
    page,
    selectedValue,
    refresh,
  ]);

  useEffect(() => {
    setPage(1);
  }, [selectedValue, selectedDates])

  const handlePeriodChange = (selectedOption: SingleValue<DateRangeWithLabel>) => {
    if (selectedOption) {
      setSelectedDates({
        startDate: selectedOption.start,
        endDate: selectedOption.end,
      });
      setSelectedPeriod(selectedOption);
      setSelectedRanges([
        {
          startDate: selectedOption.start,
          endDate: selectedOption.end,
          key: 'selection',
        },
      ]);
    } else {
      setSelectedDates({ startDate: null, endDate: null });
      setSelectedPeriod(null);
    }
  };

  const deleteLeads = async () => {
    setRemove(true);
    try {
      const response = await postCaller(
        'delete_lead',
        {
          ids: selectedItemIds,
        },
        true
      );

      if (response.status === 200) {
        setRefresh((prev) => prev + 1);
        toast.success('Lead Record deleted successfully');
        setRemove(false);
        handleCrossClick();
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error('Error deleting leads:', error);
    }
    setRemove(false);
  };

  const handlePerPageChange = (selectedPerPage: number) => {
    setItemPerPage(selectedPerPage);
    setPage(1); // Reset to the first page when changing items per page
  };

  const [exporting, setIsExporting] = useState(false);

  const [showTooltip, setShowTooltip] = useState(true); // Controls tooltip visibility


  const exportCsv = async () => {
    setShowTooltip(false);
    setIsExporting(true);
    const headers = [
      'Leads ID',
      // 'Status ID',
      'First Name',
      'Last Name',
      'Phone Number',
      'Email ID',
      'Street Address',
      'Zipcode',
      'Deal Date',
      'Deal Status',
    ];

    try {
      const response = await postCaller(
        'leads_history',
        {
          leads_status: selectedValue,
          start_date: selectedDates.startDate
            ? `${format(selectedDates.startDate, 'dd-MM-yyy')}`
            : '',
          end_date: selectedDates.endDate
            ? `${format(selectedDates.endDate, 'dd-MM-yyy')}`
            : '',
          page_size: 0,
          page_number: 0,
        },
        true
      );

      if (response.status > 201) {
        toast.error(response.data.message);
        setIsExporting(false);
        return;
      }

      if (response.status === 200 && response.data?.leads_history_list?.length === 0) {
        toast.error('No Data Found');
        return;
      }

      const csvData = response.data?.leads_history_list?.map?.((item: any) => [
        `OWE${item.leads_id}`,
        // item.status_id,
        item.first_name,
        item.last_name,
        `'${item.phone_number}'`,
        item.email_id,
        item.street_address,
        `'${item.zipcode}'`,
        item.deal_date ? `${format(parseISO(item.deal_date), 'dd-MM-yyyy')}` : '',
        item.deal_status,
      ]);

      const csvRows = [headers, ...csvData];
      const csvString = Papa.unparse(csvRows);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads_records.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
      toast.error('No Data Found');
    } finally {
      setIsExporting(false);
    }
    setShowTooltip(true);
  };

  const calClose = () => {
    setIsCalendarOpen(false);
  }
  useEscapeKey(calClose);


  const isMobile = useMatchMedia('(max-width: 767px)');
  const isTablet = useMatchMedia('(max-width: 1024px)');

  const handleCloseProfileModal = () => {
    setIsProfileOpen(false);

  };

  useEffect(() => {
    setPage(1);
  }, [selectedValue, selectedDates])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [historyTable]);

  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const viewId = queryParams.get("view");
 
    if (viewId) {
      handleView(Number(viewId));
    }
  }, [location.search]);

  return (
    <>
      <Profile
        isOpen1={isProfileOpen}
        onClose1={handleCloseProfileModal}
        leadId={leadId}
      />
      <div ref={divRef} className={`flex justify-between mt-2 ${styles.h_screen}`}>
        <div className={styles.customer_wrapper_list}>

          <div className={styles.lm_history_header}>
            {checkedCount == 0 && <h1>Records</h1>}
            {checkedCount != 0 && (
              <div className={styles.hist_checkbox_count}>
                <img
                  src={ICONS.cross}
                  alt=""
                  height={28}
                  width={28}
                  style={{ cursor: 'pointer' }}
                  onClick={handleCrossClick}
                />
                <h1>{checkedCount} Selected</h1>
              </div>
            )}
            {checkedCount == 0 && (
              <>
                <div className={styles.top_filters}>
                  <div>
                    {isMobile &&
                      selectedDates.startDate &&
                      selectedDates.endDate ? (
                      <div className={styles.hist_date}>
                        <span>
                          {selectedDates.startDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                          }) +
                            ' ' +
                            selectedDates.startDate.toLocaleDateString('en-US', {
                              month: 'short',
                            }) +
                            ' ' +
                            selectedDates.startDate.getFullYear()}
                          {' - '}
                          {selectedDates.endDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                          }) +
                            ' ' +
                            selectedDates.endDate.toLocaleDateString('en-US', {
                              month: 'short',
                            }) +
                            ' ' +
                            selectedDates.endDate.getFullYear()}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className={styles.filters}>
                    <div className={styles.lead__datepicker_wrapper}>
                      {isCalendarOpen && (
                        <div
                          className={styles.lead__datepicker_content}
                          ref={dateRangeRef}
                        >
                          <DateRange
                            editableDateInputs={true}
                            onChange={handleRangeChange}
                            moveRangeOnFirstSelection={false}
                            ranges={selectedRanges}
                          />
                          <div className={styles.lead__datepicker_btns}>
                            <button className="reset-calender" onClick={onReset}>
                              Reset
                            </button>
                            <button className="apply-calender" onClick={onApply}>
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    {!isMobile &&
                      selectedDates.startDate &&
                      selectedDates.endDate ? (
                      <div className={styles.hist_date}>
                        <span>
                          {selectedDates.startDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                          }) +
                            ' ' +
                            selectedDates.startDate.toLocaleDateString('en-US', {
                              month: 'short',
                            }) +
                            ' ' +
                            selectedDates.startDate.getFullYear()}
                          {' - '}
                          {selectedDates.endDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                          }) +
                            ' ' +
                            selectedDates.endDate.toLocaleDateString('en-US', {
                              month: 'short',
                            }) +
                            ' ' +
                            selectedDates.endDate.getFullYear()}
                        </span>
                      </div>
                    ) : null}

                    <Select
                      value={selectedPeriod}
                      onChange={handlePeriodChange}
                      options={periodFilterOptions}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          marginTop: 'px',
                          borderRadius: '8px',
                          outline: 'none',
                          color: '#3E3E3E',
                          width: '140px',
                          height: '36px',
                          fontSize: '12px',
                          border: '1.4px solid black',
                          fontWeight: '500',
                          cursor: 'pointer',
                          alignContent: 'center',
                          backgroundColor: '#fffff',
                          boxShadow: 'none',
                          '@media only screen and (max-width: 767px)': {
                            // width: '80px',
                            width: 'fit-content',
                          },
                          '&:focus-within': {
                            borderColor: '#377CF6',
                            boxShadow: '0 0 0 1px #377CF6',
                            caretColor: '#3E3E3E',
                            '& .css-kofgz1-singleValue': {
                              color: '#377CF6',
                            },
                            '& .css-tj5bde-Svg': {
                              color: '#377CF6',
                            },
                          },
                          '&:hover': {
                            borderColor: '#377CF6',
                            boxShadow: '0 0 0 1px #377CF6',
                            '& .css-kofgz1-singleValue': {
                              color: '#377CF6',
                            },
                            '& .css-tj5bde-Svg': {
                              color: '#377CF6',
                            },
                          },
                        }),
                        placeholder: (baseStyles) => ({
                          ...baseStyles,
                          color: '#3E3E3E',
                        }),
                        indicatorSeparator: () => ({
                          display: 'none',
                        }),
                        dropdownIndicator: (baseStyles, state) => ({
                          ...baseStyles,
                          color: '#3E3E3E',
                          '&:hover': {
                            color: '#3E3E3E',
                          },
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          fontSize: '13px',
                          color: state.isSelected ? '#3E3E3E' : '#3E3E3E',
                          backgroundColor: state.isSelected ? '#fffff' : '#fffff',
                          '&:hover': {
                            backgroundColor: state.isSelected
                              ? '#ddebff'
                              : '#ddebff',
                          },
                          cursor: 'pointer',
                        }),
                        singleValue: (baseStyles, state) => ({
                          ...baseStyles,
                          color: '#3E3E3E',
                        }),
                        menu: (baseStyles) => ({
                          ...baseStyles,
                          width: '140px',
                          marginTop: '3px',
                          border: '1.4px solid black',
                        }),
                      }}
                    />

                    <div
                      className={styles.calender}
                      onClick={toggleCalendar}
                      ref={calendarRef}
                    >
                      <img src={ICONS.includes_icon} alt="" />
                    </div>
                    <div className={styles.sort_drop}>
                      <SortingDropDown onChange={handleSortingChange} />
                    </div>
                    
                    <div
                      className={styles.calender}
                      onClick={exportCsv}
                      data-tooltip-id={showTooltip ? "export" : undefined}
                      style={{
                        pointerEvents: exporting ? 'none' : 'auto',
                        opacity: exporting ? 0.6 : 1,
                        cursor: exporting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {exporting ? (
                        <MdDownloading
                          className="downloading-animation"
                          size={20}
                          color="white"
                        />
                      ) : (
                        <LuImport size={20} color="white" />
                      )}
                    </div>
                    {showTooltip && !isMobile && !isTablet &&
                      <Tooltip
                        style={{
                          zIndex: 20,
                          background: '#f7f7f7',
                          color: '#000',
                          fontSize: 12,
                          paddingBlock: 4,
                        }}
                        delayShow={600} // Delay in showing the tooltip (in milliseconds)
                        // delayHide={100}
                        offset={8}
                        id="export"
                        place="bottom"
                        content="Export"
                      />
                    }

                    <div className={styles.hist_ret} onClick={handleCross}>
                      <img src={ICONS.cross} alt="" height="26" width="26" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {checkedCount != 0 && (
              <div
                style={{
                  pointerEvents: remove ? 'none' : 'auto',
                  opacity: remove ? 0.6 : 1,
                  cursor: remove ? 'not-allowed' : 'pointer',
                }}
                onClick={deleteLeads}
                className={styles.lead_his_remove}
              >
                {remove ? 'Removing...' : 'Remove'}
              </div>
            )}
          </div>

          <div className={styles.history_list}>
            {isLoading ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MicroLoader />
              </div>
            ) : historyTable.length > 0 ? (
              historyTable.map((item) => (
                <div
                  style={
                    expandedItemIds.includes(item.leads_id)
                      ? {
                        width: '100%',
                        backgroundColor: '#EEF5FF',
                        borderTopLeftRadius: '8px',
                        borderTopRightRadius: '8px',
                      }
                      : {}
                  }
                  className={styles.history_lists}
                >
                  <div className={styles.history_list_inner}>
                    <div className={styles.hist_checkname}>

                      <label>
                        <input
                          type="checkbox"
                          checked={selectedItemIds.includes(item.leads_id)}
                          onChange={() => handleCheckboxChange(item.leads_id)}
                          style={{
                            width: '16.42px',
                            height: '16px',
                            gap: '0px',
                            borderRadius: '8pxpx',
                            border: '1px solid #797979',
                          }}
                        />
                      </label>
                      <div className={styles.user_name}
                        style={{
                          whiteSpace: 'pre-wrap',
                          overflowWrap: 'break-word',
                          width: '155px',
                          lineHeight: "16px"
                        }}
                      >
                        <h2>
                          {item.first_name} {item.last_name}
                        </h2>
                        <p
                          style={{
                            color:
                              item.deal_status === 'Deal Won'
                                ? '#52B650'
                                : item.deal_status === 'Deal Loss'
                                  ? '#F55B5B'
                                  : '#81a6e7',
                          }}
                        >
                          {item.deal_status ? item.deal_status : 'N/A'}:{' '}
                          {item.deal_date ? format((parseISO(item.deal_date)), 'dd MMM, yyyy') : ""}
                        </p>
                      </div>
                    </div>
                    {!isMobile && (
                      <>
                        {
                          <div className={styles.phone_number}>
                            {item.phone_number ? item.phone_number : 'N/A'}
                          </div>
                        }
                        <div

                          className={styles.email}>
                          <p
                            style={{
                              whiteSpace: 'pre-wrap',
                              overflowWrap: 'break-word',
                              width: '210px',
                              lineHeight: "16px"
                            }}
                          >{item.email_id ? item.email_id : 'N/A'}</p>
                        </div>

                        <div className={styles.address}
                          style={{
                            whiteSpace: 'pre-wrap',
                            overflowWrap: 'break-word',
                            width: '299px',
                            lineHeight: "16px"
                          }}
                        >
                          {item?.street_address
                            ? item.street_address.length > 49
                              ? `${item.street_address.slice(0, 49)}...`
                              : item.street_address
                            : 'N/A'}
                        </div>
                      </>
                    )}

                    <div
                      className={styles.see_moreHistory}
                      onClick={() => handleView(item.leads_id)}
                      data-tooltip-id="info"
                    >
                      <IoInformationOutline />
                    </div>
                    {!isMobile && !isTablet &&
                      <Tooltip
                        style={{
                          zIndex: 20,
                          background: '#f7f7f7',
                          color: '#000',
                          fontSize: 12,
                          paddingBlock: 4,
                        }}
                        offset={8}
                        id="info"
                        place="bottom"
                        content="Lead Info"
                        delayShow={800}
                      />
                    }
                  </div>
                 
               
                </div>
              ))
            ) : (
              <DataNotFound />
            )}
          </div>

          {!!totalCount && !isLoading && (
            <div className="page-heading-container">
              <p className="page-heading">
                {startIndex} - {endIndex > totalCount! ? totalCount : endIndex} of {totalCount} item
              </p>
              <div className={styles.PaginationFont}>
              <Pagination
                currentPage={page}
                totalPages={totalPage}
                paginate={(num) => setPage(num)}
                currentPageData={[]}
                goToNextPage={() => 0}
                goToPrevPage={() => 0}
                perPage={itemsPerPage}
                onPerPageChange={handlePerPageChange}
              />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LeradManagementHistory;