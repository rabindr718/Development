import React, { useRef, useState } from 'react';
import './index.css';

interface LeadCalendarProps {
  onDateSelect: (date: Date | null) => void;
  setIsCalendarOpen: (isOpen: boolean) => void;
}

const LeadCalender = ({
  onDateSelect,
  setIsCalendarOpen,
}: LeadCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const calendarRef = useRef<HTMLDivElement>(null);

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

  const handleApply = () => {
    const selectedDateObj = new Date(selectedYear, selectedMonth);
    setSelectedDate(selectedDateObj);
    onDateSelect(selectedDateObj);
    setIsCalendarOpen(false);
  };

  const handleReset = () => {
    setSelectedDate(null);
    setSelectedMonth(new Date().getMonth());
    setSelectedYear(new Date().getFullYear());
    onDateSelect(null);
    setIsCalendarOpen(false);
  };

  return (
    <div>
      <div className="lead-cal-content">
        <div className="lead-calc-container">
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
        <div className="lead-cal-btns">
          <button className="lead-reset-calender" onClick={handleApply}>
            Apply
          </button>
          <button className="lead-apply-calender" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCalender;
