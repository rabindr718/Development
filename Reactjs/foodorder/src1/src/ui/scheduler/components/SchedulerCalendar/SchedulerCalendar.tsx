import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from '../SchedulerCalendar/schedulerCalendar.module.css';

const SchedulerCalendar: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Current date
  const [selectedTime, setSelectedTime] = useState(
    new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  ); // Current time in 12-hour format

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  const timeSlots = [
    '6:00 AM',
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  return (
    <div className={styles.appointmentSchedulerContainer}>
      {/* <div className="selectorButtons">
        <button
          className={`selectorButton ${isDatePickerOpen ? 'active' : ''}`}
          onClick={() => setIsDatePickerOpen(true)}
        >
          Date
        </button>
        <button
          className={`selectorButton ${!isDatePickerOpen ? 'active' : ''}`}
          onClick={() => setIsDatePickerOpen(false)}
        >
          Time
        </button>
      </div> */}

      {isDatePickerOpen ? (
        <div className={styles.calendarContainer}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className={styles.custom_header}>
                {/* <button className='prev-month' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                  {"<"}
                </button> */}
                <span className={styles.custom_header_text}>
                  {date.toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                {/* <button className='next-month' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                  {">"}
                </button> */}
              </div>
            )}
          />
        </div>
      ) : (
        <div className={styles.timeSlotContainer}>
          {timeSlots.map((time) => (
            <button
              key={time}
              className={`timeSlot ${selectedTime === time ? 'active' : ''}`}
              onClick={() => handleTimeChange(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      <div className={styles.selectedDateDisplay}>
        {selectedDate
          .toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
          .toUpperCase()}
        , {selectedTime}
      </div>

      {/* <div className={styles.sendAppointmentBtn}>
        <button onClick={() => alert('Appointment Sent')}>
          SEND APPOINTMENT
        </button>
      </div> */}
    </div>
  );
};

export default SchedulerCalendar;
