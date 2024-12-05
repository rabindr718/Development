import React, { useCallback, useRef, useState } from 'react';
import styles from '../styles/schedule.module.css';
import Pagination from '../../../components/pagination/Pagination';
import sharedStyles from '../../ScheduleDetail/styles/index.module.css';
import { format, addDays, isEqual, parse } from 'date-fns';
import { generateTimeArray, timeDifference } from '../../../../utiles';
import { PiPhone } from 'react-icons/pi';
import { MdOutlineEmail } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { LuClock } from 'react-icons/lu';
import { RxCalendar } from 'react-icons/rx';
import useMatchMedia from '../../../../hooks/useMatchMedia';
const current = new Date();
const timeRange = [
  {
    label: '6:00 AM - 9:00 AM',
    startTime: '6:00 AM',
    endTime: '9:00 AM',
    id: 1,
  },
  {
    label: '9:00 AM - 12:00 PM',
    startTime: '9:00 AM',
    endTime: '12:00 PM',
    id: 2,
  },
  {
    label: '12:00 PM - 3:00 PM',
    startTime: '12:00 PM',
    endTime: '3:00 PM',
    id: 3,
  },
  {
    label: '3:00 PM - 6:00 PM',
    startTime: '3:00 PM',
    endTime: '6:00 PM',
    id: 4,
  },
];

const mockedData = [
  {
    id: 3,
    name: 'John Doe',
    availableSlot: [{ startTime: '6:00 AM', endTime: '9:00 AM', id: '!2444' }],
  },
  {
    id: 5,
    name: 'Peter Doe',

    availableSlot: [{ startTime: '9:00 AM', endTime: '12:00 PM', id: '!221' }],
  },
  {
    id: 9,
    name: 'Sandra Doe',
    availableSlot: [
      { startTime: '12:00 PM', endTime: '3:00 PM', id: '24383' },
      { startTime: '3:00 PM', endTime: '6:00 PM', id: '28383' },
    ],
  },
];
const arr = [
  current,
  addDays(current, 1),
  addDays(current, 2),
  addDays(current, 3),
  addDays(current, 4),
  addDays(current, 5),
  addDays(current, 6),
];
const timeSlots = generateTimeArray('6:00 AM', '6:00 PM').map((item) => ({
  label: item,
  value: item,
}));
const SchedulerBar = () => {
  const [selectedRange, setSelectedRange] = useState<
    { start: string; end: string } | 'all'
  >('all');
  const [activeDate, setActiveDate] = useState(arr[0]);
  const [submitFormCords, setSubmitFormCords] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const timeOutIds = useRef<NodeJS.Timeout[]>([]);
  const filteredTime = timeSlots.filter((item) => !item.value.includes(':30'));
  const isMobile = useMatchMedia('(max-width:450px)');
  const getTimeIndex = useCallback((time: string) => {
    let init = 0;
    filteredTime.forEach((item, ind) => {
      if (
        isEqual(
          parse(item.value, 'h:mm aa', new Date()),
          parse(time, 'h:mm aa', new Date())
        )
      ) {
        console.log(ind, time, item.value, 'filteredTime', filteredTime);

        init = ind;
        return;
      }
    });
    return init;
  }, []);

  const getScheduledInfo = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) => {
    const elm = e.currentTarget as HTMLDivElement | HTMLButtonElement;
    const infoCardObj = scheduleRef.current!;
    infoCardObj.style.opacity = '0';
    const { left, top, height } = elm.getBoundingClientRect();
    const cardWidth = infoCardObj.clientWidth || 0;
    const cardHeight = infoCardObj.clientHeight || 0;
    let offsetTop = top + height + 5;
    let offsetLeft = 0;
    const windowHeight = window.innerHeight;
    if (left + 60 + cardWidth < window.innerWidth) {
      offsetLeft = left + 60;
    } else {
      offsetLeft = left - cardWidth;
    }

    if (top + cardHeight + 30 > windowHeight) {
      offsetTop = top - cardHeight;
    }
    const id = setTimeout(() => {
      infoCardObj.style.opacity = '1';
      setSubmitFormCords({ left: offsetLeft, top: offsetTop, opacity: 1 });
    }, 300);
    timeOutIds.current.push(id);
  };
  const handleSchudule = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsSuccess(true);
    const id = setTimeout(() => {
      setSubmitFormCords((prev) => ({ ...prev, opacity: 0 }));
      setIsSuccess(false);
    }, 2000);
    timeOutIds.current.push(id);
  };

  return (
    <div>
      <div className={styles.top_sec}>
        <div>
          <h1 className={styles.schedule_detail}>Schedule</h1>
          <div className="flex items-center">
            <h5 style={{ fontSize: 12 }} className={styles.primary_heading}>
              Availablity {`>`}{' '}
            </h5>
            <span className="ml1" style={{ fontSize: 12 }}>
              {' '}
              Schedule{' '}
            </span>
          </div>
        </div>

        <div className={styles.avail}>
          <button
            className={`${styles.time_range} ${selectedRange === 'all' ? styles.selected : ''}`}
            onClick={() => setSelectedRange('all')}
          >
            All time slots
          </button>

          {timeRange.map((time) => {
            return (
              <button
                key={time.id}
                onClick={() =>
                  setSelectedRange({ start: time.startTime, end: time.endTime })
                }
                className={`${styles.time_range} ${typeof selectedRange !== 'string' && selectedRange.start === time.startTime && selectedRange.end === time.endTime ? styles.selected : ''}`}
              >
                {time.label}
              </button>
            );
          })}

          <div className={styles.percent_status}>
            <span>45%</span>
            <p>Available</p>
          </div>
        </div>
      </div>

      <div className={`flex justify-between mt2 `}>
        <div className={styles.customer_wrapper_list}>
          <div>
            <div className={`${sharedStyles.suvery_grid_wrapper}`}>
              <div
                className={` flex items-end justify-center  ${sharedStyles.surver_filter}`}
              >
                <div className="flex items-center">
                  <h5 style={{ color: '#377CF6' }}>Surveyor</h5>
                </div>
              </div>

              <div className={sharedStyles.date_wrapper}>
                <div
                  className={`px2 items-center   ${sharedStyles.date_grid_container}`}
                >
                  {arr.map((item, ind) => {
                    return (
                      <div className="date_container" key={ind}>
                        <div
                          style={{ width: 'fit-content', cursor: 'pointer' }}
                          className={`mx-auto cursor-pointer  ${item === activeDate ? sharedStyles.active_date : sharedStyles.inactive_date}`}
                          onClick={() => setActiveDate(item)}
                        >
                          <span style={{ fontSize: 18, fontWeight: 500 }}>


                          {/* <span className={sharedStyles.span_day}> */}
                          {/* <span style={{ fontSize: isMobile ? 11 : 18, fontWeight: 500 }}> */}
                          

                            {' '}
                            {format(item, 'EEEE').slice(0, 3)}{' '}
                          </span>
                          <span style={{ fontSize: 20, fontWeight: 600 }} className="block text-center" > 

                            
                          {/* <span className={`${sharedStyles.span_date} block text-center`}> */}
                             {/* <span style={{ fontSize: isMobile ? 11 : 20, fontWeight: isMobile ? 500 : 600 }} className="block text-center"> */}

                            {' '}
                            {format(item, 'dd')}{' '}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="px1 mt2">
                  <div
                    className={`py1 px2 ${styles.grid_spans} ${styles.time_slot_wrapper}`}
                    style={{ background: '#F2F4F6' }}
                  >
                    {filteredTime.map((time, ind) => {
                      return (
                        <div
                          key={ind}
                          style={{
                            fontSize: 14,
                            transform: ind > 0 ? 'translateX(-10px)' : '',
                          }}
                          className={` ${typeof selectedRange !== 'string' && (selectedRange.start === time.value || selectedRange.end === time.value) ? sharedStyles.text_primary : ''} `}
                        >
                          {' '}
                          {time.value.replaceAll(':00', '')}{' '}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {mockedData.map((person, idx) => {
              return (
                <div
                  key={person.id}
                  data-time-parent={person.id}
                  className={sharedStyles.survey_progress_container}
                >
                  <div className={sharedStyles.surveyor_name}>
                    {person.name}
                  </div>
                  <div className={sharedStyles.progress_wrapper}>
                    <div className={styles.progress_bar}>
                      {person.availableSlot.map((avail, index) => {
                        const startPoint = getTimeIndex(avail.startTime);
                        const endPoint = getTimeIndex(avail.endTime);

                        return (
                          <div
                            key={avail.id}
                            style={{
                              gridColumn: `${startPoint + 1}/${endPoint + 1}`,
                              // gridTemplateColumns: `repeat(${col * 2},1fr)`,
                            }}
                            className={` relative ${sharedStyles.bg_available_slot}`}
                          >
                            <div className={styles.schdule_btn_wrapper}>
                              <button
                                onClick={getScheduledInfo}
                                className={` ${styles.sales_rep_book_btn} ${sharedStyles.swap_btn}`}
                              >
                                Book Schedule
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              style={{
                top: submitFormCords.top,
                left: submitFormCords.left,
                opacity: submitFormCords.opacity,
                pointerEvents: submitFormCords.opacity ? 'all' : 'none',
              }}
              ref={scheduleRef}
              className={sharedStyles.schedule_form_wrapper}
            >
              <h4 className={sharedStyles.form_schedule_heading}>
                Add Schedule
              </h4>
              <div className="mt1">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Event Title"
                    className={sharedStyles.schedule_input}
                  />
                </div>
                <div style={{ marginTop: 14 }} className="flex  items-center">
                  <div className="flex  items-center">
                    <RxCalendar size={16} color="rgb(48, 48, 48,0.4)" />
                    <p className={` ml2 ${sharedStyles.text_sm}`}>
                      Friday, 29 July{' '}
                    </p>
                  </div>

                  <div className="flex ml3 items-center">
                    <LuClock size={16} color="rgb(48, 48, 48,0.4)" />
                    <p className={` ml2 ${sharedStyles.text_sm}`}>
                      10:00 Am - 12:00 Pm{' '}
                    </p>
                  </div>
                </div>

                <div style={{ marginTop: 14 }} className="input-wrapper ">
                  <input
                    type="text"
                    placeholder="+ Add description"
                    className={sharedStyles.schedule_input}
                  />
                </div>
                <div
                  style={{ marginTop: 12 }}
                  className={`  ${sharedStyles.survey_detail_wrapper}`}
                >
                  <h4
                    style={{
                      color: 'rgb(48, 48, 48,)',
                      fontSize: 14,
                      fontWeight: 500,
                      marginBottom: 10,
                    }}
                  >
                    Surveyor Details
                  </h4>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaUser size={10} color="#303030" />
                      <p
                        style={{
                          color: '#303030',
                          fontSize: 12,
                          marginLeft: 3,
                        }}
                      >
                        Person 5
                      </p>
                    </div>
                    <div className="flex items-center">
                      <MdOutlineEmail size={10} color="#303030" />
                      <p
                        style={{
                          color: '#303030',
                          fontSize: 12,
                          marginLeft: 3,
                        }}
                      >
                        simonalone341@gmail.com
                      </p>
                    </div>
                    <div className="flex items-center">
                      <PiPhone size={10} color="#303030" />
                      <p
                        style={{
                          color: '#303030',
                          fontSize: 12,
                          marginLeft: 3,
                        }}
                      >
                        +01 9834433456
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex mt2 justify-center items-center">
                  {!isSuccess && (
                    <button
                      onClick={() =>
                        setSubmitFormCords((prev) => ({ ...prev, opacity: 0 }))
                      }
                      className={sharedStyles.secondary_schdeule_btn}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    style={{
                      width: isSuccess ? '100%' : undefined,
                    }}
                    className={sharedStyles.primary_schdeule_btn}
                    onClick={handleSchudule}
                  >
                    {isSuccess ? 'Submit Successfully' : 'Schedule'}
                  </button>
                </div>
              </div>
            </div>

            <div className="page-heading-container">
              <p className="page-heading">1 - 10 of 50 item</p>
              <Pagination
                currentPage={1}
                totalPages={12}
                paginate={(num) => num}
                currentPageData={[]}
                goToNextPage={() => 0}
                goToPrevPage={() => 0}
                perPage={10}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerBar;
