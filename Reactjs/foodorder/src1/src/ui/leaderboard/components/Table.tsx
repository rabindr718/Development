import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DateRange } from 'react-date-range';

import {
  endOfMonth,
  subDays,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  startOfYear,
  format,
} from 'date-fns';
import { FaUpload } from 'react-icons/fa';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import award from '../../../resources/assets/award_icon.png';
import DataNotFound from '../../components/loader/DataNotFound';
import MicroLoader from '../../components/loader/MicroLoader';
import Pagination from '../../components/pagination/Pagination';
import Papa from 'papaparse';
import { DateRangeWithLabel } from '../index';
import {
  Calendar,
  FirstAwardIcon,
  SecondAwardIcon,
  ThirdAwardIcon,
} from './Icons';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import useAuth, { AuthData } from '../../../hooks/useAuth';
import { toZonedTime } from 'date-fns-tz';
import { MdDownloading } from 'react-icons/md';
import {  monthDateFormat } from '../../../utiles/formatDate';

// import 'jspdf-autotable';
interface ILeaderBordUser {
  rank: number;
  dealer: string;
  rep_name: string;
  sale: number;
  install: number;
  ntp: number;
  cancel: number;
  hightlight: boolean;
}

interface IDealer {
  dealer?: string;
  rep_name?: string;
  start_date?: string;
  end_date?: string;
  leader_type?: string;
  name: string;
  rank: number;
  sale: number;
  ntp: number;
  install: number;
}

const rankByOptions = [
  { label: 'Sale', value: 'sale' },
  { label: 'NTP', value: 'ntp' },
  { label: 'Install', value: 'install' },
  { label: 'Cancel', value: 'cancel' },
];

const groupByOptionss = [
  { label: 'Sale Rep', value: 'primary_sales_rep' },
  { label: 'Team', value: 'team' },
  { label: 'State', value: 'state' },
  { label: 'Region', value: 'region' },
  { label: 'Setter', value: 'setter' },
];

const groupByOptions = [
  { label: 'Partner', value: 'dealer' },
  { label: 'Sale Rep', value: 'primary_sales_rep' },
  { label: 'Team', value: 'team' },
  { label: 'State', value: 'state' },
  { label: 'Region', value: 'region' },
  { label: 'Setter', value: 'setter' },
];

export const RankColumn = ({ rank }: { rank: number }) => {
  if (rank === 1) return <FirstAwardIcon />;
  if (rank === 2) return <SecondAwardIcon />;
  if (rank === 3) return <ThirdAwardIcon />;
  return <span className="ml1">{rank}</span>;
};

//
// PERIOD FILTER
//

function getUserTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Function to get current date in the user's timezone
function getCurrentDateInUserTimezone() {
  const now = new Date();
  const userTimezone = getUserTimezone();
  return toZonedTime(now, userTimezone);
}
const today = getCurrentDateInUserTimezone();
const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // assuming week starts on Monday, change to 0 if it starts on Sunday
const startOfThisMonth = startOfMonth(today);
const startOfThisYear = startOfYear(today);
const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
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

const PeriodFilter = ({
  period,
  setPeriod,
  resetPage,
  disabled,
}: {
  period: DateRangeWithLabel | null;
  setPeriod: (newVal: DateRangeWithLabel) => void;
  resetPage: () => void;
  disabled?: boolean;
}) => {
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
      end: new Date(),
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

  return (
    <ul className="leaderboard-data__btn-group">
      {periodFilterOptions.map((item) => (
        <li key={item.label}>
          <button
            onClick={() => {
              setPeriod(item);
              resetPage();
            }}
            disabled={disabled}
            className={
              'leaderboard-data__btn' +
              (period?.label === item.label
                ? ' leaderboard-data__btn--active'
                : '')
            }
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
};

//
// SELECTABLE FILTER (rank by & group by)
//
const SelectableFilter = ({
  label,
  options,
  selected,
  setSelected,
  resetPage,
  resetDealer,
  disabled,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string;
  setSelected: (newVal: string) => void;
  resetPage: () => void;
  resetDealer: (value: string) => void;
  disabled?: boolean;
}) => {
  return (
    <>
      <div className="leaderboard-data__select-filter">
        <label>{label}</label>
        <ul className="leaderboard-data__btn-group">
          {options.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => {
                  setSelected(item.value);
                  resetPage();
                  if (label === 'Group by:') {
                    resetDealer(item.value);
                  }
                }}
                disabled={disabled}
                className={
                  'leaderboard-data__btn' +
                  (item.value === selected
                    ? ' leaderboard-data__btn--active'
                    : '')
                }
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="leaderboard-data__select-filter--mobile">
        <label>{label}</label>
        <Select
          options={options}
          isDisabled={disabled}
          value={options.find((option) => option.value === selected)}
          onChange={(newVal) => {
            setSelected(newVal?.value ?? '');
            resetPage();
            if (newVal?.value && label === 'Group by:') {
              resetDealer(newVal.value);
            }
          }}
          isSearchable={false}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              fontSize: '12px',
              fontWeight: '500',
              border: 'none',
              outline: 'none',
              width: '92px',
              alignContent: 'center',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              boxShadow: 'none',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: '#ee824d',
              marginLeft: '-8px',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '12px',
              backgroundColor: state.isSelected ? '#ee824d' : '#fff',
              '&:hover': {
                backgroundColor: state.isSelected ? '#ee824d' : '#ffebe2',
                color: state.isSelected ? '#fff' : '#ee824d',
              },
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              fontSize: '12px',
              color: selected ? '#ee824d' : '#222',
              width: 'fit-content',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              marginTop: '1px',
              width: '92px',
              zIndex: 10,
            }),
          }}
        />
      </div>
    </>
  );
};

//
// DATE FILTER
//
const DateFilter = ({
  selected,
  setSelected,
  resetPage,
  disabled,
}: {
  selected: DateRangeWithLabel;
  setSelected: (newVal: DateRangeWithLabel) => void;
  resetPage: () => void;
  disabled: boolean;
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState(
    selected
      ? [
        {
          startDate: selected.start,
          endDate: selected.end,
          key: 'selection',
        },
      ]
      : []
  );

  const onApply = () => {
    const range = selectedRanges[0];
    if (!range) return;
    setSelected({
      start: range.startDate,
      end: range.endDate,
      label: 'Custom',
    });
    setShowCalendar(false);
    resetPage();
  };

  const onReset = () => {
    const defaultOption = periodFilterOptions[0];
    setSelected(periodFilterOptions[0]);
    setSelectedRanges([
      {
        startDate: defaultOption.start,
        endDate: defaultOption.end,
        key: 'selection',
      },
    ]);
    setShowCalendar(false);
    resetPage();
  };

  // update datepicker if "selected" updated externally
  useEffect(() => {
    setSelectedRanges([
      {
        startDate: selected.start,
        endDate: selected.end,
        key: 'selection',
      },
    ]);
  }, [selected]);

  // close on click outside anywhere
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event);
      const remain = window.innerWidth - event.clientX;
      if (
        wrapperRef.current &&
        !event.composedPath().includes(wrapperRef.current) &&
        remain > 15
      )
        setShowCalendar(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
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
      end: new Date(),
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

  return (
    <div className="flex items-center justify-end">
      <div className="leaderborder_filter-slect-wrapper mr1">
        <Select
          options={periodFilterOptions}
          value={selected}
          isDisabled={disabled}
          // placeholder={selected?"Custom"}
          isSearchable={false}
          onChange={(value) => value && setSelected(value)}
          styles={{
            control: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '11px',
              fontWeight: '500',
              borderRadius: '4px',
              outline: 'none',
              width: 'fit-content',
              minWidth: '92px',
              height: '28px',
              alignContent: 'center',
              cursor: 'pointer',
              boxShadow: 'none',
              border: '1px solid #EE824D',
              minHeight: 30,
            }),
            valueContainer: (provided, state) => ({
              ...provided,
              height: '30px',
              padding: '0 6px',
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: '#EE824D',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            dropdownIndicator: (baseStyles, state) => ({
              ...baseStyles,
              svg: {
                fill: '#EE824D',
              },
              marginLeft: '-18px',
            }),

            option: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '12px',
              color: '#fff',
              transition: 'all 500ms',
              '&:hover': {
                transform: 'scale(1.1)',
                background: 'none',
                transition: 'all 500ms',
              },
              background: '#EE824D',
              transform: state.isSelected ? 'scale(1.1)' : 'scale(1)',
            }),

            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              color: '#EE824D',
              fontSize: 11,
              padding: '0 8px',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              width: '109px',
              zIndex: 999,
              color: '#FFFFFF',
            }),
            menuList: (base) => ({
              ...base,
              background: '#EE824D',
            }),
            input: (base) => ({ ...base, margin: 0 }),
          }}
        />
      </div>
      <div ref={wrapperRef} className="leaderboard-data__datepicker-wrapper">
        <span
          role="button"
          onClick={() => setShowCalendar((prev) => !prev)}
          style={{ lineHeight: 0 }}
        >
          <Calendar disabled={disabled} />
        </span>
        {showCalendar && !disabled && (
          <div className="leaderboard-data__datepicker-content">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const startDate = item.selection?.startDate;
                const endDate = item.selection?.endDate;
                if (startDate && endDate) {
                  setSelectedRanges([{ startDate, endDate, key: 'selection' }]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={selectedRanges}
            />
            <div className="leaderboard-data__datepicker-btns">
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
    </div>
  );
};

const Table = ({
  setIsOpen,
  setDealer,
  setPage,
  page,
  active,
  setActive,
  setGroupBy,
  groupBy,
  activeHead,
  setActiveHead,
  setSelectedRangeDate,
  selectedRangeDate,
  selectDealer,
  exportPdf,
  isExporting,
  count,
  resetDealer,
  isFetched,
  tableData,
  setIsLoading,
  isLoading,
}: {
  setIsOpen: Dispatch<SetStateAction<number>>;
  setDealer: Dispatch<SetStateAction<IDealer>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isLoading: any;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  active: string;
  tableData: any;
  groupBy: string;
  setActive: Dispatch<SetStateAction<string>>;
  setGroupBy: Dispatch<SetStateAction<string>>;
  activeHead: string;
  setActiveHead: Dispatch<SetStateAction<string>>;
  setSelectedRangeDate: Dispatch<DateRangeWithLabel>;
  selectedRangeDate: DateRangeWithLabel;
  selectDealer: { label: string; value: string }[];
  exportPdf: () => void;
  isExporting: boolean;
  count: number;
  resetDealer: (value: string) => void;
  isFetched: boolean;
}) => {
  const [leaderTable, setLeaderTable] = useState<any>([]);

  const [totalCount, setTotalCount] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const [exportShow, setExportShow] = useState<boolean>(false);
  const [isExportingData, setIsExporting] = useState(false);
  const toggleExportShow = () => {
    setExportShow((prev) => !prev);
  };
  const { authData, saveAuthData } = useAuth();

  const [totalStats, setTotalStats] = useState<{ [key: string]: number }>({});
  const itemsPerPage = 25;
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();

    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  console.log(tableData, 'tableData');

  useEffect(() => {
    if (tableData) {
      // setLeaderTable(tableData.data.leader_board_list
      // );
      setLeaderTable(tableData?.data?.leader_board_list);
      setTotalCount(tableData?.dbRecCount);
      setTotalStats(tableData?.data);
    }
  }, [
    activeHead,
    active,
    selectedRangeDate,
    itemsPerPage,
    page,
    selectDealer,
    groupBy,
    isAuthenticated,
    isFetched,
    tableData,
  ]);

  // useEffect(() => {
  //   if (isAuthenticated && isFetched) {
  //     (async () => {
  //       try {
  //         setIsLoading(true);
  //         const data = await postCaller('get_perfomance_leaderboard', {
  //           type: activeHead,
  //           dealer: selectDealer.map((item) => item.value),
  //           page_size: itemsPerPage,
  //           page_number: page,
  //           start_date: format(selectedRangeDate.start, 'dd-MM-yyyy'),
  //           end_date: format(selectedRangeDate.end, 'dd-MM-yyyy'),
  //           sort_by: active,
  //           group_by: groupBy,
  //         });
  //         if (data.status > 201) {
  //           setIsLoading(false);
  //           toast.error(data.message);
  //           return;
  //         }
  //         if (data.data?.ap_ded_list) {
  //           setLeaderTable(data.data?.ap_ded_list as ILeaderBordUser[]);
  //           setTotalCount(data?.dbRecCount);
  //           setTotalStats(data.data);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     })();
  //   }
  // }, [
  //   activeHead,
  //   active,
  //   selectedRangeDate,
  //   itemsPerPage,
  //   page,
  //   selectDealer,
  //   groupBy,
  //   isAuthenticated,
  //   isFetched,
  // ]);
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage + 1;
  const endIndex = page * itemsPerPage;

  const paginate = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const resetPage = () => {
    setPage(1);
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPrevPage = () => {
    setPage(page - 1);
  };

  const sortedPage = leaderTable?.slice().sort((a: any, b: any) => {
    if (a.hightlight && !b.hightlight) return -1;
    if (!a.hightlight && b.hightlight) return 1;
    return 0;
  });

  function formatSaleValue(value: any) {
    if (value === null || value === undefined) return ''; // Handle null or undefined values
    const sale = parseFloat(value);
    if (sale === 0) return '0';
    if (sale % 1 === 0) return sale.toString(); // If the number is an integer, return it as a string without .00
    return sale.toFixed(2); // Otherwise, format it to 2 decimal places
  }
  const role = authData?.role;
  const getTotal = (column: keyof ILeaderBordUser): number => {
    return sortedPage.reduce((sum: any, item: any) => {
      const value = item[column];
      // Ensure value is a number
      return sum + (typeof value === 'number' ? value : 0);
    }, 0);
  };
  const wrapperReff = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperReff.current &&
      !wrapperReff.current.contains(event.target as Node)
    ) {
      setExportShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showPartner = useMemo(() => {
    if (groupBy === 'region' || groupBy === 'state') {
      return false;
    }
    if (
      (role === TYPE_OF_USER.ADMIN ||
        role === TYPE_OF_USER.DEALER_OWNER ||
        role === TYPE_OF_USER.FINANCE_ADMIN ||
        role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
        role === TYPE_OF_USER.ACCOUNT_MANAGER) &&
      groupBy !== 'dealer'
    ) {
      return true;
    }
    if (
      role !== TYPE_OF_USER.ADMIN &&
      role !== TYPE_OF_USER.DEALER_OWNER &&
      role !== TYPE_OF_USER.FINANCE_ADMIN &&
      role !== TYPE_OF_USER.ACCOUNT_EXCUTIVE &&
      role !== TYPE_OF_USER.ACCOUNT_MANAGER
    ) {
      return true;
    } else {
      return false;
    }
  }, [groupBy, role, authData]);

  const exportCsv = async () => {
    // Define the headers for the CSV
    // Function to remove HTML tags from strings
    const removeHtmlTags = (str: any) => {
      if (!str) return '';
      return str.replace(/<\/?[^>]+(>|$)/g, '');
    };

    setIsExporting(true);
    const headers = [
      'UniqueID',
      'Homeowner Name',
      'Homeowner Email',
      'Homeowner Phone',
      'Address',
      'State',
      'Contract $',
      'Sys Size',
      'Sale Date',
      'NTP Date',
      'Install Date',
      'Pto Date',
      'Cancel Date',
      'Primary Sales Rep',
      'Secondary Sales Rep',
    ];

    const getAllLeaders = await postCaller('get_leaderboardcsvdownload', {
      dealer_names: selectDealer.map((item) => item.value),
      start_date: format(selectedRangeDate.start, 'dd-MM-yyyy'),
      end_date: format(selectedRangeDate.end, 'dd-MM-yyyy'),
      group_by: groupBy,
      sort_by: active,
    });
    if (getAllLeaders.status > 201) {
      toast.error(getAllLeaders.message);
      return;
    }
    const csvData = getAllLeaders?.data?.map?.((item: any) => [
      item.unique_id,
      item.home_owner,
      item.email_address,
      item.phone_number,
      item.address,
      item.state,
      removeHtmlTags(item.contract_total),
      item.contracted_system_size_parent,
      monthDateFormat(item.sale_date),
      monthDateFormat(item.ntp_complete_date),
      monthDateFormat(item.pv_completion_date),
      monthDateFormat(item.pto_date),
      monthDateFormat(item.cancelled_date),
      item.primary_sales_rep,
      item.secondary_sales_rep,
    ]);

    const csvRows = [headers, ...csvData];

    const csvString = Papa.unparse(csvRows);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leaderboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
    setExportShow(false);
  };
  console.log(groupBy, 'groupBy');
  const getName = useMemo(() => {
    if (groupBy === 'primary_sales_rep') {
      return 'Sale Rep Name';
    }
    if (groupBy === 'dealer') {
      if (role === TYPE_OF_USER.DEALER_OWNER) {
        return 'Code Name';
      } else {
        return 'Partner Name';
      }
    }
    if (groupBy === 'region') {
      return 'Region Name';
    }
    if (groupBy === 'state') {
      return 'State Name';
    }
    if (groupBy === 'team') {
      return 'Team Name';
    }
    if (groupBy === 'setter') {
      return 'Setter Name';
    } else {
      return 'Partner Name';
    }
  }, [role, authData, groupBy]);

  return (
    <div className="leaderboard-data" style={{ borderRadius: 12 }}>
      {/* <button onClick={handleGeneratePdf}>export json pdf</button> */}
      { groupBy === 'dealer' ? null :
      <div className="relative exportt" ref={wrapperReff}>
        <div className="leaderboard-data__title">
          <img src={award} alt="" />
          <h2 style={{fontSize: "18px", fontWeight: 600, color: "#292B2E" }}>
            Leaderboard
          </h2>
        </div>
        <div
          className="export-trigger overflow-hidden"
          onClick={() => !isExporting && !isExportingData && toggleExportShow()}
        >
          {isExporting || isExportingData ? (
            <MdDownloading className="downloading-animation" size={20} />
          ) : (
            <FaUpload size={12} />
          )}
          <span>
            {' '}
            {isExporting || isExportingData ? 'Exporting...' : 'Export'}{' '}
          </span>
        </div>
      
       
            {exportShow && (
              <div className="export-opt">
                <button
                  className="export-btn"
                  disabled={isExporting || isExportingData}
                  onClick={() => {
                    exportPdf();
                    setExportShow(false);
                  }}
                >
                  <span>Pdf</span>
                </button>
                <button
                  disabled={isExportingData}
                  className="export-btn export-btnn"
                  onClick={() => {
                    exportCsv();
                    setExportShow(false);
                  }}
                >
                  <span>Csv</span>
                </button>
              </div>
            )}
        
      
      </div>
        }
      {/* <div className="leaderboard-data__export">
        <Select
          options={exportOptions}
          value={exportOption}
          onChange={(selectedOption) => {
            setExportOption(selectedOption);
            // handleExport(selectedOption.value);
          }}
          isSearchable={false}
          placeholder="Export Options"
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              fontSize: '12px',
              fontWeight: '500',
              border: 'none',
              outline: 'none',
              width: '120px',
              alignContent: 'center',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              boxShadow: 'none',
            }),
            indicatorSeparator: () => ({
              display: 'none',
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              color: '#ee824d',
            }),
            option: (baseStyles, state) => ({
              ...baseStyles,
              fontSize: '12px',
              backgroundColor: state.isSelected ? '#ee824d' : '#fff',
              '&:hover': {
                backgroundColor: state.isSelected ? '#ee824d' : '#ffebe2',
                color: state.isSelected ? '#fff' : '#ee824d',
              },
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              fontSize: '12px',
              color: exportOption ? '#ee824d' : '#222',
              width: 'fit-content',
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              marginTop: '-4px',
            }),
          }}
        />
      </div> */}

      <div>
        <div className="leaderboard-data__filter-row">
          <SelectableFilter
            label="Rank by:"
            options={rankByOptions}
            resetPage={resetPage}
            selected={active}
            disabled={isLoading}
            resetDealer={resetDealer}
            setSelected={setActive}
          />
          <div>
            <div className="leaderboard-data__selected-dates">
              {format(selectedRangeDate.start, 'dd MMM yyyy')} -{' '}
              {format(selectedRangeDate.end, 'dd MMM yyyy')}
            </div>
            <div className="flex items-center justify-end">
              <PeriodFilter
                disabled={isLoading}
                resetPage={resetPage}
                period={selectedRangeDate}
                setPeriod={setSelectedRangeDate}
              />
              <DateFilter
                disabled={isLoading}
                selected={selectedRangeDate}
                resetPage={resetPage}
                setSelected={setSelectedRangeDate}
              />
            </div>
          </div>
        </div>
        <div className="leaderboard-data__filter-row">
          <SelectableFilter
            label="Group by:"
            disabled={isLoading}
            options={
              role === 'Admin' ||
                role === TYPE_OF_USER.DEALER_OWNER ||
                role === TYPE_OF_USER.FINANCE_ADMIN ||
                role === TYPE_OF_USER.ACCOUNT_EXCUTIVE ||
                role === TYPE_OF_USER.ACCOUNT_MANAGER
                ? groupByOptions
                : groupByOptionss
            }
            resetDealer={resetDealer}
            selected={groupBy}
            resetPage={resetPage}
            setSelected={setGroupBy}
          />

          <div className="leaderbord-tab-container">
            <div
              onClick={() => !isLoading && setActiveHead('kw')}
              className={`tab  ${isLoading ? 'disabled-tab' : ''} ${activeHead === 'kw' ? 'activehead' : ''}`}
            >
              KW
            </div>
            <div
              onClick={() => !isLoading && setActiveHead('count')}
              className={`tab ${isLoading ? 'disabled-tab' : ''} ${activeHead === 'count' ? 'activehead' : ''}`}
            >
              Count
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-card-wrapper mt2">
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <MicroLoader />
          </div>
        ) : sortedPage?.length ? (
          <>
            {sortedPage?.map((item: any) => {
              return (
                <div
                  key={item.rank}
                  onClick={() => {
                    setIsOpen(item.rank);
                    setDealer((prev) => ({
                      ...prev,
                      data_type:
                        groupBy === 'primary_sales_rep' ? 'sale_rep' : groupBy,
                      dealer:
                        groupBy === 'primary_sales_rep' ? item.dealer : '',
                      name: item.rep_name,
                      rank: item.rank,
                      sale: item.sale,
                      ntp: item.ntp,
                      install: item.install,
                    }));
                  }}
                  className="mobile-rank-card"
                  style={{
                    marginBottom: 17,
                    border: item.hightlight ? '1px solid #D7E6FE' : undefined,
                  }}
                >
                  <div
                    className="rank-standing"
                    style={{ flexBasis: '40px', flexShrink: 0 }}
                  >
                    <RankColumn rank={item.rank} />
                  </div>
                  <div className="flex-auto rank-card-body">
                    <h4 className="card-rep-name">{item.rep_name || 'N/A'} </h4>
                    {showPartner && (
                      <p className="rank-sm-text"> {item.dealer} </p>
                    )}
                    <div className="flex items-center rank-card-stats">
                      <div>
                        <span className="rank-stats-num">
                          {formatSaleValue(item?.sale)}
                        </span>
                        <p className="rank-sm-text">Sales</p>
                      </div>

                      <div>
                        <span className="rank-stats-num">
                          {formatSaleValue(item?.install)}{' '}
                        </span>
                        <p className="rank-sm-text">Installs</p>
                      </div>
                      <div>
                        <span className="rank-stats-num">
                          {formatSaleValue(item?.ntp)}{' '}
                        </span>
                        <p className="rank-sm-text">NTP</p>
                      </div>
                      <div>
                        <span className="rank-stats-num">
                          {formatSaleValue(item.cancel)}{' '}
                        </span>
                        <p className="rank-sm-text">Cancel</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mobile-rank-card" style={{ marginBottom: 17 }}>
              <div
                className="rank-standing"
                style={{ flexBasis: '40px', flexShrink: 0 }}
              ></div>
              <div className="flex-auto rank-card-body">
                <h4 className="card-rep-name">Total</h4>
                <div className="flex items-center rank-card-statss">
                  <div>
                    <span className="rank-stats-num">
                      {formatSaleValue(totalStats?.total_sale || 0)}
                    </span>
                    <p className="rank-sm-text">Sales</p>
                  </div>
                  <div>
                    <span className="rank-stats-num">
                      {formatSaleValue(totalStats?.total_ntp || 0)}
                    </span>
                    <p className="rank-sm-text">NTP</p>
                  </div>
                  <div>
                    <span className="rank-stats-num">
                      {formatSaleValue(totalStats?.total_install || 0)}
                    </span>
                    <p className="rank-sm-text">Install</p>
                  </div>
                  <div>
                    <span className="rank-stats-num">
                      {formatSaleValue(totalStats?.total_cancel || 0)}
                    </span>
                    <p className="rank-sm-text">Cancel</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">No Data Found</div>
        )}
      </div>
      <div className="leaderboard-table-wrapper">
        <div className="leaderboard-table-container">
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>

                <th>{getName}</th>

                {showPartner && <th>Partner</th>}
                <th>
                  Sale
                  <span className="block" style={{ fontSize: 12 }}>
                    ({formatSaleValue(totalStats?.total_sale || 0)})
                  </span>
                </th>
                <th>
                  NTP
                  <span className="block" style={{ fontSize: 12 }}>
                    ({formatSaleValue(totalStats?.total_ntp || 0)})
                  </span>
                </th>
                <th>
                  Install
                  <span className="block" style={{ fontSize: 12 }}>
                    ({formatSaleValue(totalStats?.total_install || 0)})
                  </span>
                </th>
                <th>
                  Cancel
                  <span className="block" style={{ fontSize: 12 }}>
                    ({formatSaleValue(totalStats?.total_cancel || 0)})
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '8rem 0',
                      }}
                    >
                      <MicroLoader />
                    </div>
                  </td>
                </tr>
              ) : sortedPage?.length ? (
                sortedPage?.map((item: any) => {
                  return (
                    <tr
                      className="pointer"
                      key={item.rank}
                      style={{
                        background: item.hightlight ? '#D7E6FE' : undefined,
                      }}
                      onClick={() => {
                        setIsOpen(item.rank);
                        setDealer((prev) => ({
                          ...prev,
                          data_type:
                            groupBy === 'primary_sales_rep'
                              ? 'sale_rep'
                              : groupBy,
                          dealer:
                            groupBy === 'primary_sales_rep' ? item.dealer : '',
                          name: item.rep_name,
                          rank: item.rank,
                          sale: item.sale,
                          ntp: item.ntp,
                          install: item.install,
                        }));
                      }}
                    >
                      <td>
                        <div className="flex items-center">
                          <RankColumn rank={item.rank} />
                        </div>
                      </td>
                      <td>
                        <span>{item.rep_name || 'N/A'}</span>
                      </td>
                      {showPartner && <td> {item.dealer} </td>}

                      <td>{formatSaleValue(item?.sale)} </td>
                      <td>{formatSaleValue(item?.ntp)}</td>
                      <td>{formatSaleValue(item?.install)}</td>

                      <td>{formatSaleValue(item.cancel)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr style={{ border: 0 }}>
                  <td colSpan={7}>
                    <DataNotFound />
                  </td>
                </tr>
              )}
            </tbody>
            {!isLoading && !!leaderTable?.length && (
              <tfoot>
                <tr>
                  <td></td>
                  {showPartner && <td></td>}
                  <td className="bold-text">Total </td>
                  <td className="bold-text">
                    {formatSaleValue(getTotal('sale'))}
                  </td>

                  <td className="bold-text">
                    {formatSaleValue(getTotal('ntp'))}
                  </td>
                  <td className="bold-text">
                    {formatSaleValue(getTotal('install'))}
                  </td>
                  <td className="bold-text">
                    {formatSaleValue(getTotal('cancel'))}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      <div className="page-heading-container">
        {leaderTable?.length > 0 && !isLoading ? (
          <>
            <p className="page-heading">
              {startIndex} - {endIndex > totalCount ? totalCount : endIndex} of{' '}
              {totalCount} item
            </p>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              paginate={paginate}
              currentPageData={leaderTable}
              goToNextPage={goToNextPage}
              goToPrevPage={goToPrevPage}
              perPage={itemsPerPage}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Table;
