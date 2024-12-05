import React from 'react';
import './CalendarSidebar.css';
import { FaArrowRight } from 'react-icons/fa6';

interface CalendarSidebarProps {
  onClose?: () => void;
  selectedDate: Date | null;
  selectedEvents: any;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  onClose,
  selectedDate,
  selectedEvents,
}) => {
  const formatDate = (date: Date | null) => {
    if (!date) return 'No date selected';
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('en-GB', options);
    return formatter.format(date).replace(',', '');
  };

  const formattedDate = formatDate(selectedDate);

  const calendarData = [
    {
      id: 'OUR8636',
      name: 'David Miller',
      status: 'scheduled',
      title: 'Survey',
      color: '#57B3F1',
    },
    {
      id: 'OUR8634',
      name: 'Bratt Mark',
      status: 'completed',
      title: 'Install PV',
      color: '#C470C7',
    },
    {
      id: 'OUR6454',
      name: 'David Miller',
      status: 'scheduled',
      title: 'Survey',
      color: '#57B3F1',
    },
    {
      id: 'OUR7453',
      name: 'Bratt Mark',
      status: 'scheduled',
      title: 'Install PV',
      color: '#C470C7',
    },
    {
      id: 'OUR7454',
      name: 'David Miller',
      status: 'completed',
      title: 'Survey',
      color: '#57B3F1',
    },
    {
      id: 'OUR5432',
      name: 'Bratt Mark',
      status: 'scheduled',
      title: 'Install PV',
      color: '#C470C7',
    },
    {
      id: 'OUR6343',
      name: 'David Miller',
      status: 'scheduled',
      title: 'Survey',
      color: '#57B3F1',
    },
    {
      id: 'OUR3453',
      name: 'Bratt Mark',
      status: 'completed',
      title: 'Install PV',
      color: '#C470C7',
    },
  ];

  return (
    <div className="main-sidebar">
      <div className="sidebar-wrapper">
        <div className="user-sidebar scrollbar">
          <div className="upper-section">
            <div className="close-icon" onClick={onClose}>
              <FaArrowRight />
            </div>
            <p>{formattedDate}</p>
          </div>
          <div className="upper-section-status">
            <div style={{ background: '#57B3F1' }}>
              <span style={{ color: '#57B3F1' }}>3</span>Survey Date
            </div>
            <div style={{ background: '#C470C7' }}>
              <span style={{ color: '#C470C7' }}>3</span>Install PV Date
            </div>
          </div>
          <div className="main-section">
            <div className="sidebar-cards">
              {selectedEvents.map((data: any) => (
                <div className="card">
                  <p className="card-title" style={{ color: data.color }}>
                    <span style={{ background: data.color }}></span>
                    {data.title}
                  </p>
                  <div
                    className="flex items-center justify-between"
                    style={{ width: '100%' }}
                  >
                    <p className="card-name">{data.home_owner}</p>
                    <p className="our-id">{data.unique_id}</p>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-address"
                  >
                    {data.address}
                    <span className="tooltip">{data.address}</span>
                  </a>
                  <button
                    className="card-status"
                    style={{
                      backgroundColor:
                        data.status === 'Completed' ? '#63ACA3' : '#3C7AF1',
                    }}
                  >
                    {data.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarSidebar;
