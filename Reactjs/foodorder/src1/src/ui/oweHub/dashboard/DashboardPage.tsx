import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  ChangeEvent,
  useCallback,
} from 'react';
import './dasboard.css';
import Select from 'react-select';
import DashboardTotal from './DashboardTotal';
import { ICONS } from '../../../resources/icons/Icons';
import DashBoardTable from './DashBoardTable';
import DashBoardChart from './DashBoardChart';
import { comissionValueData } from '../../../resources/static_data/StaticData';
import FilterModal from '../../components/FilterModal/FilterModal';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Calendar } from 'react-date-range';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { configPostCaller } from '../../../infrastructure/web_api/services/apiUrl';
import moment from 'moment';
import { getDealerPay } from '../../../redux/apiActions/dealerPayAction';
import FilterHoc from '../../components/FilterModal/FilterHoc';
import dealerPayColumn from '../../../resources/static_data/configureHeaderData/dealerPayColumn';
import { FilterModel } from '../../../core/models/data_models/FilterSelectModel';
import { useLocation } from 'react-router-dom';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { format } from 'date-fns';
import { FaUpload } from 'react-icons/fa';
import DropdownCheckbox from '../../components/DropdownCheckBox';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { MdDownloading, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import '../../oweHub/reppay/reppaydashboard/repdasboard.css';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { debounce } from '../../../utiles/debounce';
import { dateFormat } from '../../../utiles/formatDate';
import { LuImport } from 'react-icons/lu';

interface Option {
  value: string;
  label: string;
}

export const DashboardPage: React.FC = () => {
  const [selectionRange, setSelectionRange] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dispatch = useAppDispatch();

  const handleSelect = (ranges: Date) => {
    setSelectionRange(ranges);
  };

  const handleResetDates = () => {
    setSelectionRange(new Date());
  };

  const itemsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = React.useState<number>(0);
  const [filterModal, setFilterModal] = React.useState<boolean>(false);
  const [filters, setFilters] = useState<FilterModel[]>([]);
  const [dealer, setDealer] = useState<{ label: string; value: string }>({
    label: 'All',
    value: 'ALL',
  });
  const [dealers, setDealers] = useState<string[]>([]);
  const [appliedDate, setAppliedDate] = useState<Date | null>(null);
  const [selectedDealer, setSelectedDealer] = useState<Option[]>([]);
  const [dealerOption, setDealerOption] = useState<Option[]>([]);
  const [tileData, setTileData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  const [isExportingData, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [count, setTotalCount] = useState<number>(0);
  const [selectedOption2, setSelectedOption2] = useState<string>(
    comissionValueData[comissionValueData.length - 1].value
  );
  const { isActive } = useAppSelector((state) => state.filterSlice);
  const [prefferedType, setPrefferedType] = useState<string>('');
  const { pathname } = useLocation();
  const [isOptionsFetched, setIsOptionsFetched] = useState(false);
  const handleSelectChange2 = (
    selectedOption2: { value: string; label: string } | null
  ) => {
    setSelectedOption2(selectedOption2 ? selectedOption2.value : '');
    setCurrentPage(1);
  };
  const filterClose = () => {
    setFilterModal(false);
  };
  const handleToggleDatePicker = () => {
    setAppliedDate(selectionRange);
    setShowDatePicker(!showDatePicker);
  };
  const [isFetched, setIsFetched] = useState(false);

  const datePickerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selectedDealer || selectedDealer.length === 0) return; // Exit early if selectedDealer is empty

    (async () => {
      setLoading(true); // Start loading before the request

      const date = appliedDate ? new Date(appliedDate) : new Date();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Use local month
      const day = String(date.getDate()).padStart(2, '0'); // Use local day
      const year = date.getFullYear(); // Use local year
      const customFormattedDate = `${day}-${month}-${year}`; // Output: "DD-MM-YYYY"

      try {
        const partnerNames = selectedDealer.map((dealer) => dealer.value); // Extract all values

        const resp = await configPostCaller('get_dealerpaycommissions', {
          page_number: currentPage,
          page_size: itemsPerPage,
          paginate: true,
          partner_name: partnerNames, // Send all values
          search_input: searchQuery,
          filters,
          payrole_date: appliedDate ? customFormattedDate : undefined,
        });

        if (resp.status > 201) {
          toast.error(resp.message);
          setData([]);
          setTileData('');
          setLoading(false);
          return;
        }

        setData(resp.data.DealerPayComm);
        setTotalCount(resp.dbRecCount);
        setTileData(resp.data);
      } catch (error) {
        console.error(error);
        setData([]);
        toast.error('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    })();
  }, [
    currentPage,
    selectedOption2,
    appliedDate,
    filters,
    dealer,
    prefferedType,
    selectedDealer,
    searchQuery,
  ]);

  const handleSearchChange = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    }, 800),
    []
  );

  // useEffect(() => {

  //     dispatch(
  //       getDealerPay({
  //         page_number: currentPage,
  //         page_size: itemsPerPage,
  //         partner_name: selectedDealer,
  //         filters
  //       })
  //     );

  // }, [
  //   currentPage,
  //   selectedOption2,
  //   appliedDate,
  //   filters,
  //   dealer,
  //   prefferedType,
  // ]);

  const leaderDealer = (newFormData: any): { value: string; label: string }[] =>
    newFormData?.dealer_name?.map((value: string) => ({
      value,
      label: value,
    }));

  const getNewFormData = async () => {
    const tableData = {
      tableNames: ['dealer_name'],
    };
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    if (res.status > 200) {
      return;
    }
    if (res.data?.dealer_name) {
      setSelectedDealer(leaderDealer(res.data));
      setDealerOption(leaderDealer(res.data));
    }
    setIsFetched(true);
  };

  console.log(selectionRange, 'selectrange');

  const handleEscapeKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showDatePicker) {
      setShowDatePicker(false);
    }
  };

  // Add event listener for Escape key
  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);

    // Clean up the event listener
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showDatePicker]);

  useEffect(() => {
    getNewFormData();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     const tableData = {
  //       tableNames: ['dealer'],
  //     };
  //     const res = await postCaller(EndPoints.get_newFormData, tableData);
  //     if (res.status > 201) {
  //       return;
  //     }
  //     setDealers([...res.data.dealer]);
  //     setDealer({ label: 'All', value: 'ALL' });
  //     setIsOptionsFetched(true);
  //   })();
  // }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const fetchFunction = (req: any) => {
    setCurrentPage(1);
    setFilters(req.filters);
  };

  const handleExportOpen = () => {
    exportCsv();
  };

  const exportCsv = async () => {
    // Define the headers for the CSV
    // Function to remove HTML tags from strings
    const removeHtmlTags = (str: any) => {
      if (!str) return '';
      return str.replace(/<\/?[^>]+(>|$)/g, '');
    };
    setIsExporting(true);
    const exportData = await configPostCaller('get_dealerpaycommissions', {
      page_number: 1,
      paginate: false
    });
    if (exportData.status > 201) {
      toast.error(exportData.message);
      return;
    }

    const headers = [
      'Unique Id',
      'Home Owner',
      'Current Status',
      'Dealer Code',
      'Sys Size',
      'Contract $$',
      'Other Adders',
      'Rep 1',
      'Rep 2',
      'Setter',
      'ST',
      'Contract Date',
      'Loan Fee',
      'NET EPC',
      'Credit',
      'Draw Amt',
      'RL',
      'Type',
      'Toady',
      'Amount',
      'EPC',
      'Amount Paid',
      'Balance',
      'Help',
    ];

    const csvData = exportData?.data.DealerPayComm?.map?.((item: any) => [
      item.unique_id,
      item.home_owner,
      item.current_status,
      item.dealer_code,
      item.sys_size,
      item.contract,
      item.address,
      item.rep1,
      item.rep2,
      item.setter,
      item.st,
      item.contract_date ? format(new Date(item.contract_date), "dd-MM-yyyy") : "",
      item.loan_fee,
      item.net_epc,
      item.credit,
      item.draw_amt,
      item.rl,
      item.type,
      item.today ? format(new Date(item.today), "dd-MM-yyyy") : "",
      item.amount,
      item.epc,
      item.amt_paid,
      item.balance,
    ]);

    const csvRows = [headers, ...csvData];

    const csvString = Papa.unparse(csvRows);

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'dealerpay.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsExporting(false);
  };

  return (
    <>
      <div className="Dashboard-section-container">
        <div className="white-back">
          <div className="DashboardPage-container">
            <div className="rep-manage-user">
              <DropdownCheckbox
                label={selectedDealer.length === 1 ? 'Partner' : 'Partners'}
                placeholder={'Search partners'}
                selectedOptions={selectedDealer}
                options={dealerOption}
                onChange={(val) => {
                  setSelectedDealer(val);
                }}
              />
              <div ref={datePickerRef} style={{ position: 'relative' }}>
                <label
                  className={`date-button flex items-center ${showDatePicker ? 'active' : ''}`}
                  onClick={handleToggleDatePicker}
                  style={{
                    color: '#292B2E',
                    border: '1px solid #292B2E',
                    padding: '8px 12px',
                    gap: '1rem',
                    height: "36px"
                  }}
                >
                  <span
                    className="dealer-date-text"
                    style={{ transition: 'all 100ms ease' }}
                  >
                    {appliedDate
                      ? format(appliedDate, 'dd-MM-yyyy')
                      : 'Payroll Date'}
                  </span>
                  <MdOutlineKeyboardArrowDown
                    className="dealer-date-svg"
                    style={{
                      width: '1.2rem',
                      height: '1.2rem',
                      transform: showDatePicker
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                      transition: 'transform 550ms',
                    }}
                  />
                </label>

                {showDatePicker && (
                  <div
                    className="calender-container dealer-calendar"
                    style={{ marginLeft: 0 }}
                  >
                    <Calendar
                   maxDate={new Date()}
                      date={selectionRange || new Date()}
                      onChange={handleSelect}
                    />
                    <div className="calender-btn-wrapper">
                      <button
                        className="reset-calender"
                        onClick={handleResetDates}
                      >
                        Reset
                      </button>
                      <button
                        className="apply-calender"
                        onClick={handleToggleDatePicker}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="dashboard-payroll">
              <div className="line-graph">
                <input
                  type="text"
                  className="dealer-pay-search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[a-zA-Z0-9\s]*$/; // Allow only alphanumeric and spaces

                    // Check if input contains valid characters and length is <= 50
                    if (regex.test(input) && input.length <= 50) {
                      setSearch(input);
                      handleSearchChange(e);
                    }
                  }}
                />
                <div
                  className={`filter-line ${active === 0 ? 'active-filter-line' : ''
                    }`}
                  onClick={() => setActive(0)}
                >
                  {active === 0 ? (
                    <img src={ICONS.dashActive} alt="" />
                  ) : (
                    <img src={ICONS.dashActive} alt="" />
                  )}
                </div>
                <div
                  className={`filter-disable ${active === 1 ? 'active-filter-line' : ''
                    }`}
                  style={{ backgroundColor: '#377CF6' }}
                >
                  {active === 1 ? (
                    <img src={ICONS.viewActive} alt="" />
                  ) : (
                    <img src={ICONS.viewActive} alt="" />
                  )}
                </div>
                <div
                  className="filter-line relative"
                  onClick={() => setFilterModal(true)}
                  style={{ backgroundColor: '#377CF6' }}
                >
                  {isActive[pathname] && (
                    <span
                      className="absolute"
                      style={{
                        border: '1px solid #fff',
                        borderRadius: '50%',
                        backgroundColor: '#2DC74F',
                        width: 8,
                        height: 8,
                        top: 0,
                        right: -2,
                      }}
                    ></span>
                  )}
                  <img
                    src={ICONS.fil_white}
                    alt=""
                    style={{ height: '15px', width: '15px' }}
                  />
                </div>
                <button
                  className={`performance-exportbtn  mt0 `}
                  style={{ height: '36px', padding: '8px 12px' }}
                  onClick={handleExportOpen}
                >
                  {isExportingData ? (
                    <div className="dealer-export">
                      <MdDownloading
                        className="downloading-animation dealer-mob-download"
                        size={20}
                      />
                      <span className="dealer-export-mob">Export</span>
                    </div>
                  ) : (
                    <div className="dealer-export">
                      <FaUpload size={12} className="dealer-mob-upload" />
                      <span className="dealer-export-mob">Export</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <DashboardTotal
              setPrefferedType={setPrefferedType}
              tileData={tileData}
              loading={loading}
            />
            {/* <DonutChart /> */}
          </div>
        </div>

        <FilterHoc
          isOpen={filterModal}
          handleClose={filterClose}
          resetOnChange={false}
          columns={dealerPayColumn.filter((col) => col.name !== 'help')}
          page_number={currentPage}
          page_size={10}
          fetchFunction={fetchFunction}
        />

        <div className="dealer-pay-table">
          {active === 0 && (
            <DashBoardTable
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={data}
              count={count}
              loading={loading}
            />
          )}
          {active === 1 && <DashBoardChart />}
        </div>
      </div>
    </>
  );
};
