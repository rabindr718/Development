import React, { useEffect, useState } from 'react';
import './totalcount.css';
import TotalCard from './totalCard';
import Papa from 'papaparse';
import SelectOption from '../components/selectOption/SelectOption';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from 'recharts';
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subDays,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  subYears,
  format,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { toast } from 'react-toastify';
import ReportsSelectOption from '../components/selectOption/ReportsSelectOption';
import { availableStates } from '../../core/models/data_models/SelectDataModel';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../infrastructure/web_api/api_client/EndPoints';
import DropdownCheckBox from '../components/DropdownCheckBox';
import { MdDownloading } from 'react-icons/md';
import { LuImport } from 'react-icons/lu';
import MicroLoader from '../components/loader/MicroLoader';
import DataNotFound from '../components/loader/DataNotFound';
import { Tooltip as ReactTooltip } from 'react-tooltip';

// Define types for data and graph properties
interface DataPoint {
  name: string;
  pv: number;
}

interface GraphProps {
  title: string;
  stopColor: string;
  borderColor: string;
  data: DataPoint[];
}
interface Option {
  value: string;
  label: string;
}

interface DateRangeWithLabel {
  label?: string;
  start: Date;
  end: Date;
}

// Custom tooltip component
const CustomTooltip: React.FC<{
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip_stats">
        <p>{label}</p>
        <p>{`Count: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const TotalCount: React.FC = () => {
  //   const graphs: GraphProps[] = [
  //     {
  //       title: 'Sales',
  //       stopColor: '#0096D3',
  //       borderColor: '#0096D3',
  //       data: [
  //         { name: 'Mon', pv: 2400 },
  //         { name: 'Tue', pv: 1398 },
  //         { name: 'Wed', pv: 9800 },
  //         { name: 'Thu', pv: 3908 },
  //         { name: 'Fri', pv: 4800 },
  //         { name: 'Sat', pv: 3800 },
  //       ],
  //     },
  //     {
  //       title: 'NTP',
  //       stopColor: '#A6CE50',
  //       borderColor: '#A6CE50',
  //       data: [
  //         { name: 'Mon', pv: 2000 },
  //         { name: 'Tue', pv: 3000 },
  //         { name: 'Wed', pv: 4000 },
  //         { name: 'Thu', pv: 2500 },
  //         { name: 'Fri', pv: 2800 },
  //         { name: 'Sat', pv: 4500 },
  //       ],
  //     },
  //     {
  //       title: 'Installs',
  //       stopColor: '#377CF6',
  //       borderColor: '#377CF6',
  //       data: [
  //         { name: 'Mon', pv: 500 },
  //         { name: 'Tue', pv: 800 },
  //         { name: 'Wed', pv: 1200 },
  //         { name: 'Thu', pv: 1500 },
  //         { name: 'Fri', pv: 1700 },
  //         { name: 'Sat', pv: 2100 },
  //       ],
  //     },
  //   ];
  const [newFormData, setNewFormData] = useState({});
  const [dealerOption, setDealerOption] = useState<Option[]>([]);
  const [selectedDealer, setSelectedDealer] = useState<Option[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [isExportingData, setIsExporting] = useState(false);
  const [graphs, setGraphs] = useState<GraphProps[]>([
    { title: 'Sales', stopColor: '#0096D3', borderColor: '#0096D3', data: [] },
    { title: 'NTP', stopColor: '#A6CE50', borderColor: '#A6CE50', data: [] },
    {
      title: 'Installs',
      stopColor: '#377CF6',
      borderColor: '#377CF6',
      data: [],
    },
  ]);

  const [selectedOption, setSelectedOption] = useState<Option>({
    label: 'Daily',
    value: 'day',
  });
  const [selectedStateOption, setSelectedStateOption] = useState<Option>({
    label: 'All State',
    value: 'All',
  });

  const leaderDealer = (newFormData: any): { value: string; label: string }[] =>
    newFormData?.dealer_name?.map((value: string) => ({
      value,
      label: value,
    }));

  const tableData = {
    tableNames: ['available_states', 'dealer_name'],
  };

  const exportCsv = async () => {
    try {
      const selectedDate = selectedReportOption.value.split(' - ');
      const start_date = selectedDate[0];
      const end_date = selectedDate[1];
      const headers = [
        'Unique ID',
        'Customer Name',
        'Install Date',
        'NTP Date',
        'Sale Date',
      ];
      setIsExporting(true);
      
      const data = await postCaller('get_milestone_data_csv_download', {
        dealer_names: selectedDealer.map((dealer) => dealer.value),
        start_date,
        end_date,
        state:
        selectedStateOption.value === 'All'
          ? ''
          : selectedStateOption.value === ''
            ? ''
            : selectedStateOption.value,
      });
      if (data.status > 200) {
        toast.error(data.message);
        setIsExporting(false);
        return;
      }
      setIsExporting(false);
      const csvData = Object.entries(
        data?.data as Record<
          string,
          {
            install_date?: string;
            ntp_date?: string;
            sale_date?: string;
            customer_name: string;
          }
        >
      ).map(([key, value]) => {
        const installDate = value.install_date
          ? format(new Date(value.install_date), 'dd-MM-yyyy')
          : '';
        const ntpDate = value.ntp_date
          ? format(new Date(value.ntp_date), 'dd-MM-yyyy')
          : '';
        const saleDate = value.sale_date
          ? format(new Date(value.sale_date), 'dd-MM-yyyy')
          : '';
        return [key, value.customer_name, installDate, ntpDate, saleDate];
      });
      const csvRows = [headers, ...csvData];
      const csvString = Papa.unparse(csvRows);
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reports.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error((error as Error).message as string);
    }
  };
  const getNewFormData = async () => {
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    if (res.status > 200) {
      return;
    }
    setNewFormData((prev) => ({ ...prev, ...res.data }));
    if (res.data?.dealer_name) {
      setSelectedDealer(leaderDealer(res.data));
      setDealerOption(leaderDealer(res.data));
    }
  };

  useEffect(() => {
    getNewFormData();
  }, []);

  const handleReportOptionChange = (newValue: Option | null) => {
    if (newValue) {
      setSelectedReportOption(newValue);
      console.log('Selected Report Option:', newValue);
    } else {
      console.log('Report option was cleared or set to null');
    }
  };

  const handleWeeklyOption = (newValue: Option | null) => {
    if (newValue) {
      setSelectedOption(newValue);
      const newMappedOptions = periodFilterOptions
        .filter((period) => {
          const label = period.label ?? '';
          if (newValue.value === 'day') {
            return [
              'This Week',
              'Last Week',
              'This Month',
              'Last Month',
            ].includes(label);
          }
          if (newValue.value === 'week') {
            return [
              'Current Week',
              'Current Month',
              'Last Month',
              'This Quarter',
              'Last Quarter',
            ].includes(label);
          }
          if (newValue.value === 'month') {
            return [
              'This Month',
              'This Quarter',
              'Last Quarter',
              'This Year',
              'Last Year',
            ].includes(label);
          }
          if (newValue.value === 'year') {
            return [
              'This Year',
              'Last 3 Years',
              'Last 5 Years',
              'Last 10 Years',
            ].includes(label);
          }
          return false;
        })
        .map((period) => ({
          label: period.label ?? 'Unknown',
          value: `${format(period.start, 'dd-MM-yyyy')} - ${format(period.end, 'dd-MM-yyyy')}`,
        }));

      setSelectedReportOption(newMappedOptions[0] || newMappedOptions[0]);
    } else {
      console.log('Report option was cleared or set to null');
    }
  };

  const handleStateOptionChange = (newValue: Option | null) => {
    if (newValue) {
      setSelectedStateOption(newValue);
      console.log('Selected State Option:', newValue);
    } else {
      console.log('State option was cleared or set to null');
    }
  };

  const handleChange = (newValue: any) => {
    console.log('jnknhb');
  };

  // Helper function to map data for daily, weekly, monthly, or yearly formats
  const mapDataToGraph = (data: Record<string, number>) => {
    return Object.entries(data).map(([date, value]) => {
      let displayName;
      if (selectedOption.value === 'week') {
        displayName = `${date.split('-')[1]}`;
      } else if (selectedOption.value === 'month') {
        const [year, month] = date.split('-');
        displayName = format(
          new Date(Number(year), Number(month) - 1),
          'MMM yyyy'
        );
      } else if (selectedOption.value === 'year') {
        displayName = date; // Display the year as is
      } else {
        displayName = format(new Date(date), 'MMM dd');
      }

      return { name: displayName, pv: value };
    });
  };

  // Date utility functions
  const today = toZonedTime(
    new Date(),
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const periodFilterOptions: DateRangeWithLabel[] = [
    {
      label: 'This Week',
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: today,
    },
    {
      label: 'Last Week',
      start: startOfWeek(subDays(today, 7), { weekStartsOn: 1 }),
      end: endOfWeek(subDays(today, 7), { weekStartsOn: 1 }),
    },
    {
      label: 'This Month',
      start: startOfMonth(today),
      end: today,
    },
    {
      label: 'Last Month',
      start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      end: endOfMonth(new Date(today.getFullYear(), today.getMonth() - 1)),
    },

    {
      label: 'Current Week',
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: today,
    },
    {
      label: 'Current Month',
      start: startOfMonth(today),
      end: endOfMonth(today),
    },
    {
      label: 'This Quarter',
      start: startOfQuarter(today),
      end: endOfQuarter(today),
    },
    {
      label: 'Last Quarter',
      start: startOfQuarter(subDays(today, 90)),
      end: endOfQuarter(subDays(today, 90)),
    },

    {
      label: 'This Year',
      start: startOfYear(today),
      end: today,
    },
    {
      label: 'Last Year',
      start: startOfYear(new Date(today.getFullYear() - 1, 0, 1)),
      end: endOfYear(new Date(today.getFullYear() - 1, 11, 31)),
    },

    {
      label: 'Last 3 Years',
      start: startOfYear(subYears(today, 3)),
      end: endOfYear(today),
    },
    {
      label: 'Last 5 Years',
      start: startOfYear(subYears(today, 5)),
      end: endOfYear(today),
    },
    {
      label: 'Last 10 Years',
      start: startOfYear(subYears(today, 10)),
      end: endOfYear(today),
    },
  ];

  const mappedPeriodOptions: Option[] = periodFilterOptions
    .filter((period) => {
      const label = period.label ?? '';

      if (selectedOption.value === 'day') {
        return ['This Week', 'Last Week', 'This Month', 'Last Month'].includes(
          label
        );
      }
      if (selectedOption.value === 'week') {
        return [
          'Current Week',
          'Current Month',
          'Last Month',
          'This Quarter',
          'Last Quarter',
        ].includes(label);
      }
      if (selectedOption.value === 'month') {
        return [
          'This Month',
          'This Quarter',
          'Last Quarter',
          'This Year',
          'Last Year',
        ].includes(label);
      }
      if (selectedOption.value === 'year') {
        return [
          'This Year',
          'Last 3 Years',
          'Last 5 Years',
          'Last 10 Years',
        ].includes(label);
      }
      return false; // Exclude options that don’t match the selected period
    })
    .map((period) => ({
      label: period.label ?? 'Unknown', // Fallback to "Unknown" if label is undefined
      value: `${format(period.start, 'dd-MM-yyyy')} - ${format(period.end, 'dd-MM-yyyy')}`,
    }));

  // Set the initial value for selectedReportOption to "This Week"
  const initialReportOption = periodFilterOptions.find(
    (option) => option.label === 'Last Week'
  );

  const defaultPeriodOptions = periodFilterOptions.filter((period) =>
    ['This Week', 'Last Week', 'This Month', 'Last Month'].includes(
      period.label ?? ''
    )
  );

  const [selectedReportOption, setSelectedReportOption] = useState<Option>({
    label: defaultPeriodOptions[0]?.label || 'This Week', // 'Last Week' as default
    value: `${format(defaultPeriodOptions[0]?.start, 'dd-MM-yyyy')} - ${format(defaultPeriodOptions[0]?.end, 'dd-MM-yyyy')}`,
  });

  useEffect(() => {
    // Clear previous graph data to reset the state for fresh data
    setGraphs([
      {
        title: 'Sales',
        stopColor: '#0096D3',
        borderColor: '#0096D3',
        data: [],
      },
      { title: 'NTP', stopColor: '#A6CE50', borderColor: '#A6CE50', data: [] },
      {
        title: 'Installs',
        stopColor: '#377CF6',
        borderColor: '#377CF6',
        data: [],
      },
    ]);

    const partnerNames = selectedDealer.map((dealer) => dealer.value);

    if (
      
      selectedReportOption?.value &&
      selectedOption.value
    ) {
      (async () => {
        try {
          setIsLoading(true);

          const formatDate = (dateString: string): string => {
            if (!dateString) return '';
            const [day, month, year] = dateString.split('-');
            return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
          };

          // Split and validate dates
          const dateRange = selectedReportOption.value.split(' - ');
          if (dateRange.length !== 2) {
            console.error(
              'Invalid date range format:',
              selectedReportOption.value
            );
            return;
          }

          const [start_date, end_date] = dateRange.map(formatDate);
          console.log(start_date, end_date, 'start_Date');

          const response = await postCaller('get_milestone_data', {
            dealer_names: partnerNames,
            start_date,
            end_date,
            date_by: selectedOption.value,
            state:
              selectedStateOption.value === 'All'
                ? ''
                : selectedStateOption.value === ''
                  ? ''
                  : selectedStateOption.value,
          });

          if (response.status > 201) {
            toast.error(response.message);
            setData(''); // Clear data if error
            setGraphs([]); // Clear graphs if error
            return;
          }

          setData(response.data);
          const { ntp_data, sale_data, install_data } = response.data;

          setGraphs([
            {
              title: 'Sales',
              stopColor: '#0096D3',
              borderColor: '#0096D3',
              data: mapDataToGraph(sale_data),
            },
            {
              title: 'NTP',
              stopColor: '#A6CE50',
              borderColor: '#A6CE50',
              data: mapDataToGraph(ntp_data),
            },
            {
              title: 'Installs',
              stopColor: '#377CF6',
              borderColor: '#377CF6',
              data: mapDataToGraph(install_data),
            },
          ]);
        } catch (error) {
          console.error('Error fetching milestone data:', error);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [
    selectedOption,
    selectedStateOption,
    selectedReportOption,
    selectedDealer,
  ]);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update `isMobile` when the window is resized
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const stylesGraph = {
    width: isMobile ? 'auto' : '100%',
    height: '236px',
  };

  console.log(mappedPeriodOptions, 'optionssss');
  console.log(selectedReportOption, 'dateeeee');
  console.log(selectedOption, 'day month');
  return (
    <div className="total-main-container">
      <div className="headingcount flex justify-between items-center">
        <h4 className="reports-title">Reports</h4>
        <div className="report-header-dropdown flex-wrap">
          <div>
            <SelectOption
              options={[
                { label: 'Daily', value: 'day' },
                { label: 'Weekly', value: 'week' },
                { label: 'Monthly', value: 'month' },
                { label: 'Yearly', value: 'year' },
              ]}
              onChange={handleWeeklyOption}
              controlStyles={{ marginTop: 0, minHeight: 30 }}
              value={selectedOption}
              menuListStyles={{
                fontWeight: 400,
              }}
              singleValueStyles={{
                fontWeight: 400,
              }}
            />
          </div>
          <div>
            <SelectOption
              options={mappedPeriodOptions}
              onChange={handleReportOptionChange}
              value={selectedReportOption}
              controlStyles={{ marginTop: 0, minHeight: 30 }}
              // menuStyles={{
              //   minWidth: 150
              // }}
              menuListStyles={{
                fontWeight: 400,
              }}
              singleValueStyles={{
                fontWeight: 400,
              }}
            />
          </div>

          <div className="order-mob-2  flex">
            <SelectOption
              options={[
                { label: 'All State', value: 'All' }, // Default "All State" option
                ...(availableStates(newFormData) || []), // Other states
              ]}
              controlStyles={{
                marginTop: 0,
                minHeight: 30,
                '@media (min-width: 768px)': {
                  flex: 1,
                },
              }}
              onChange={handleStateOptionChange}
              value={selectedStateOption}
              menuStyles={{
                minWidth: 135,
                flexBasis: 115,
                '@media (min-width: 768px)': {
                  flex: 1,
                },
              }}
              menuListStyles={{
                fontWeight: 400,
              }}
              singleValueStyles={{
                fontWeight: 400,
              }}
              width="130px"
            />
          </div>

          <div className="order-mob-3">
            <DropdownCheckBox
              label={selectedDealer.length === 1 ? 'Partner' : 'Partners'}
              placeholder={'Search Partners'}
              selectedOptions={selectedDealer}
              options={dealerOption}
              onChange={(val) => {
                setSelectedDealer(val);
              }}
            />
          </div>

          <div className="perf-export-btn order-mob-1 relative pipline-export-btn ">
            <button
              data-tooltip-id="export-tooltip" // Match with ReactTooltip's id
              data-tooltip-content="Export" // Add content directly here
              onClick={exportCsv}
              disabled={isExportingData}
              className={`performance-exportbtn flex items-center justify-center totalcount-export ${isExportingData ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {isExportingData ? (
                <MdDownloading className="downloading-animation" size={20} />
              ) : (
                <LuImport size={20} />
              )}
            </button>
            <ReactTooltip
              id="export-tooltip" // Make sure this id matches the button's data-tooltip-id
              place="bottom"
              style={{
                zIndex: 20,
                background: '#f7f7f7',
                color: '#000',
                fontSize: 12,
                paddingBlock: 4,
              }}
              offset={8}
            />
          </div>
        </div>
      </div>
      <div>
        <TotalCard
          data={data}
          isLoading={isLoading}
          selectOption={selectedOption}
        />
      </div>
      <div className="report-graphs">
        {graphs.map((graph, index) => (
          <div key={index} className="report-graph">
            <h5 className="graph-title">{graph.title}</h5>

            {isLoading ? (
              <div
                className="flex items-center"
                style={{ justifyContent: 'center' }}
              >
                {' '}
                <MicroLoader />{' '}
              </div>
            ) : (
              <div className="main-graph" style={stylesGraph}>
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  className={'graph-container'}
                >
                  <AreaChart data={graph.data}>
                    <defs>
                      <linearGradient
                        id={`colorPv-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="12%"
                          stopColor={graph.stopColor}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="88%"
                          stopColor={graph.stopColor}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fontWeight: 500, fill: '#818181' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fontWeight: 500, fill: '#818181' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke={graph.stopColor}
                      strokeWidth={3}
                      fill={`url(#colorPv-${index})`}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalCount;
