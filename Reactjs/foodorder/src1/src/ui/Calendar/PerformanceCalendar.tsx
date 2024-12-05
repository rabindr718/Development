import React, { useState, useEffect, useRef } from 'react';
import {
  format,
  addDays,
  startOfWeek,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import './PerformanceCalendar.css';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CalendarSidebar from './CalendarSidebar';
import { postCaller } from '../../infrastructure/web_api/services/apiUrl';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { FaUpload } from 'react-icons/fa';

interface Event {
  id: number;
  date: Date;
  color: string;
  title: string;
  idColor: any;
  address: string;
  unique_id: string;
  status: string;
  home_owner: string;
}

const PerformanceCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>('');
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isExportingData, setIsExporting] = useState(false);
  const [selectedRanges, setSelectedRanges] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const calendarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const ExportCsv = async () => {
    if(data.calender_data_list){
    setIsExporting(true);
    
    try {
      const headers = [
        'UniqueId',
        'Homeowner Name',
        'Homeowner Contact Info',
        'Address',
        'State',
        'Contract Total$',
        'Sys Size',
        'Sale Date',
      ];

      const getAllData = await postCaller('get_calender_csv_download', {
        start_date: '',
        end_date: '',
      });

      if (getAllData.status > 201) {
        toast.error(getAllData.message);
        setIsExporting(false);
        return;
      }

      const csvData = getAllData?.data?.map?.((item: any) => [
        item.unique_id,
        item.home_owner,
        item.customer_phone_number,
        item.address,
        item.state,
        item.contract_total,
        item.system_size,
        item.contract_date,
      ]);

      const csvRows = [headers, ...csvData];
      const csvString = Papa.unparse(csvRows);

      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'SalesRepCalendar.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
    console.log(error);
    } finally {
      setIsExporting(false);
    }
  } else {
  toast.error('Data Not Available')
  }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (sidebarVisible) {
          setShowCalendar(false);
          closeSidebar();
        } else {
          navigate(-1);
          console.log('-1');
        }
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        calendarRef.current &&
        !calendarRef.current.contains(target) &&
        (!backdropRef.current || !backdropRef.current.contains(target))
      ) {
        setShowCalendar(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarVisible]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const startOfCurrentMonth = format(
          startOfMonth(currentMonth),
          'yyyy-MM-dd'
        );
        const endOfCurrentMonth = format(
          endOfMonth(currentMonth),
          'yyyy-MM-dd'
        );

        const calendardata = await postCaller('get_calender_data', {
          start_date: startOfCurrentMonth,
          end_date: endOfCurrentMonth,
        });

        if (calendardata.status > 201) {
          toast.error(calendardata.message);
          return;
        }

        setData(calendardata.data);

        const newEvents: Event[] = [];

        calendardata.data.calender_data_list.forEach(
          (item: any, index: number) => {
            if (item.survey_date) {
              newEvents.push({
                id: index * 2 + 1,
                date: new Date(item.survey_date),
                color: '#57B3F1',
                title: 'Survey',
                idColor: '#57B3F1',
                address: item.address,
                unique_id: item.unique_id,
                status: item.survey_status,
                home_owner: item.home_owner,
              });
            }

            if (item.install_date) {
              newEvents.push({
                id: index * 2 + 2,
                date: new Date(item.install_date),
                color: '#C470C7',
                title: 'Install PV',
                idColor: '#C470C7',
                address: item.address,
                unique_id: item.unique_id,
                status: item.install_status,
                home_owner: item.home_owner,
              });
            }
          }
        );

        setEvents(newEvents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentMonth]);

  console.log(data, 'newdata');

  const hasEvent = (day: Date): boolean => {
    return events.some((event) => isSameDay(event.date, day));
  };

  const handleDateClick = (day: Date): void => {
    setSelectedDate(day);
    setSelectedEvents(events.filter((event) => isSameDay(event.date, day)));

    if (hasEvent(day)) {
      setSidebarVisible(true);
    } else {
      setSidebarVisible(false);
    }
  };

  const handleCalcClose = () => {
    navigate(-1);
    closeSidebar();
  };

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const yearRange = 75;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: yearRange * 2 + 1 },
    (_, i) => currentYear - yearRange + i
  );

  const handleReset = () => {
    setSelectedRanges([
      { startDate: new Date(), endDate: new Date(), key: 'selection' },
    ]);
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
  };

  const [displayedDate, setDisplayedDate] = useState<string>(
    format(currentMonth, 'MMMM yyyy')
  );
  const [isDefaultDate, setIsDefaultDate] = useState<boolean>(true);

  const handleApply = () => {
    const newDate = new Date(selectedYear, selectedMonth);
    setCurrentMonth(newDate);
    setDisplayedDate(format(newDate, 'MMMM yyyy'));
    setIsDefaultDate(false);
    setShowCalendar(false);
  };

  const handleNextMonth = (): void => {
    const newDate = addMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
    setDisplayedDate(format(newDate, 'MMMM yyyy'));
  };

  const handlePrevMonth = (): void => {
    const newDate = subMonths(currentMonth, 1);
    setCurrentMonth(newDate);
    setSelectedMonth(newDate.getMonth());
    setSelectedYear(newDate.getFullYear());
    setDisplayedDate(format(newDate, 'MMMM yyyy'));
  };

  const renderHeader = () => {
    const isCurrentMonth = isSameMonth(currentMonth, new Date());
    const dateFormat = isCurrentMonth ? 'd MMMM yyyy' : 'MMMM yyyy';
    return (
      <div className="header">
        <div
          className="flex items-center justify-between sales-calendar"
          style={{ width: '99%' }}
        >
          <div className="calendar-date flex items-center">
            <div className="prev-icon" onClick={handlePrevMonth}>
              <div className="icon">
                <FiChevronLeft />
              </div>
            </div>
            <div
              className="date-format"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              <span
                style={{
                  display: 'block',
                  width: '180px',
                  textAlign: 'center',
                  color: "##292b2e"
                }}
              >
                {isDefaultDate
                  ? format(currentMonth, dateFormat)
                  : displayedDate}
              </span>
            </div>
            <div className="next-icon" onClick={handleNextMonth}>
              <div className="icon">
                <FiChevronRight />
              </div>
            </div>
          </div>
          <div className="calendar-btn-close">
            <div className="perf-export-btn">
              <button
                disabled={isExportingData}
                onClick={ExportCsv}
                className={`performance-exportbtn calendar-head-btn ${isExportingData ? 'cursor-not-allowed opacity-50' : ''}`}
                style={{ marginTop: 'unset', padding: '8px 12px' }}
              >
                <FaUpload size={12} className="mr1" />
                <span>{isExportingData ? ' Downloading... ' : ' Export '}</span>
              </button>
            </div>
            <div onClick={handleCalcClose} style={{ height: '26px' }}>
              <IoClose className="calendar-close" />
            </div>
          </div>
        </div>
        {showCalendar && (
          <div className="performance-cal-content" ref={calendarRef}>
            <div className="dropdown-calc-container">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="performance-cal-btns">
              <button className="reset-calender" onClick={handleReset}>
                Reset
              </button>
              <button className="apply-calender" onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EEEE';
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      const dayOfWeek = addDays(startDate, i);
      const isToday = isSameDay(dayOfWeek, new Date());
      days.push(
        <div className={`col col-center ${isToday ? 'todayDate' : ''}`} key={i}>
          {format(addDays(startDate, i), dateFormat).substring(0, 3)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = addDays(startOfWeek(monthEnd), 6);

    const rows: JSX.Element[] = [];
    let days: JSX.Element[] = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        const dayEvents = events.filter((event) => isSameDay(day, event.date));

        const eventCounts = dayEvents.reduce(
          (acc, event) => {
            if (acc[event.title]) {
              acc[event.title].count += 1;
            } else {
              acc[event.title] = { color: event.color, count: 1 };
            }
            return acc;
          },
          {} as Record<string, { color: string; count: number }>
        );

        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? 'non-month'
                : isSameDay(day, selectedDate as Date)
                  ? 'selected active'
                  : ''
            }`}
            key={day.toString()}
            onClick={() => handleDateClick(cloneDay)}
          >
            <span className="number">{formattedDate}</span>

            <div className="cell-dots">
              {Object.entries(eventCounts).map(
                ([title, { color, count }], index) => (
                  <div
                    key={index}
                    className={`event-box event-${color}`}
                    style={{ background: color }}
                  >
                    <span className="event-icon" style={{ color: color }}>
                      {count}
                    </span>
                    <span className="event-text">{title}</span>
                  </div>
                )
              )}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return (
      <div className="body">
        {rows}
        <div className="mobile-calendar-text">
          <div className="mob-cal-txt">
            <span style={{ background: '#57B3F1' }}></span>Survey
          </div>
          <div className="mob-cal-txt">
            <span style={{ background: '#C470C7' }}></span>Install PV{' '}
          </div>
        </div>
      </div>
    );
  };

  const nextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (): void => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <>
      <div className="calendar">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      {sidebarVisible && selectedDate && selectedEvents.length > 0 && (
        <CalendarSidebar
          onClose={closeSidebar}
          selectedDate={selectedDate}
          selectedEvents={selectedEvents}
        />
      )}
    </>
  );
};

export default PerformanceCalendar;
