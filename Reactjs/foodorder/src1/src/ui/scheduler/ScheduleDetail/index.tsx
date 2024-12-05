import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles/index.module.css';
import SelectOption from '../../components/selectOption/SelectOption';
import { LuRefreshCcw } from 'react-icons/lu';
import { addDays, format, parse, isEqual, isValid } from 'date-fns';
import { generateTimeArray, timeDifference } from '../../../utiles';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { FaPlus, FaUser } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { RxCalendar } from 'react-icons/rx';
import { LuClock } from 'react-icons/lu';
import { MdOutlineEmail } from 'react-icons/md';
import { PiPhone } from 'react-icons/pi';
import Pagination from '../../components/pagination/Pagination';
import SuccessPopup from './components/Popup/SuccessPopup';
import { Link, useSearchParams } from 'react-router-dom';
import FilterDropDown from './components/FilterDropdown/FilterDropDown';
import { ICONS } from '../../../resources/icons/Icons';
import { FaCircleCheck } from 'react-icons/fa6';
import useMatchMedia from '../../../hooks/useMatchMedia';
const current = new Date();
interface IOptions {
  label: string;
  value: string;
}
const arr = [
  current,
  addDays(current, 1),
  addDays(current, 2),
  addDays(current, 3),
  addDays(current, 4),
  addDays(current, 5),
  addDays(current, 6),
];

const timeSlots = generateTimeArray('8:00 AM', '6:00 PM').map((item) => ({
  label: item,
  value: item,
}));

interface Isurvyors {
  id: number;
  name: string;
  busySlot: {
    startTime: string;
    endTime: string;
    id: string;
  }[];
  availableSlot: {
    startTime: string;
    endTime: string;
    id: string;
  }[];
  bookedSlot: {
    startTime: string;
    endTime: string;
    id: string;
  }[];
}

const mockedData: Isurvyors[] = [
  {
    id: 3,
    name: 'John Doe',
    busySlot: [
      { startTime: '8:00 AM', endTime: '12:00 PM', id: '!3331ff' },
      { startTime: '1:30 PM', endTime: '6:00 PM', id: '!3331ff' },
    ],
    availableSlot: [{ startTime: '12:00 PM', endTime: '1:30 PM', id: '!2444' }],
    bookedSlot: [],
  },
  {
    id: 5,
    name: 'Peter Doe',
    busySlot: [
      { startTime: '8:00 AM', endTime: '1:00 PM', id: '!32ff' },
      { startTime: '5:00 PM', endTime: '6:00 PM', id: '!3feeff' },
    ],
    availableSlot: [{ startTime: '1:00 PM', endTime: '5:00 PM', id: '!221' }],
    bookedSlot: [],
  },
  {
    id: 9,
    name: 'Sandra Doe',
    busySlot: [
      { startTime: '8:00 AM', endTime: '10:00 AM', id: '54638' },
      { startTime: '2:00 PM', endTime: '4:00 PM', id: '54f38' },
    ],
    availableSlot: [
      {
        startTime: '10:00 AM',
        endTime: '2:00 PM',
        id: '!21444',
      },
      { startTime: '4:00 PM', endTime: '6:00 PM', id: '54f38' },
    ],
    bookedSlot: [],
  },
];

const Index = () => {
  const [activeDate, setActiveDate] = useState(arr[0]);
  const [endTimeOptions, setEndTimeOptions] = useState([...timeSlots]);
  const [startTime, setStartTime] = useState<IOptions>(timeSlots[0]);
  const [dividerCords, setDividerCords] = useState({ start: 0, end: 0 });
  const [surveyorsList, setSurveyorsList] = useState(mockedData);
  const [endTime, setEndTime] = useState<IOptions | undefined>(
    timeSlots[timeSlots.length - 1]
  );
  const [scheduleBtnCord, setScheduleBtnCord] = useState<{
    start: { ind: 0; pos: string }[];
    end: { ind: 0; pos: string }[];
    parentId: string[];
  }>({ start: [], end: [], parentId: [] });
  const [infoCardCords, setInfoCardCors] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });
  const [submitFormCords, setSubmitFormCords] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });
  const [swapCords, setSwapCords] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });
  const [isSwapSucceeded, setIsSwapSucceeded] = useState(false);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const swapWrapper = useRef<HTMLDivElement>(null);
  const timeOutIds = useRef<NodeJS.Timeout[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();
  const isEditing = searchParams.get('isEditing');
  const isMobile = useMatchMedia('(max-width:450px)');

  const getCordsOnChange = (id: string, type: 'start' | 'end') => {
    const findElm = document.querySelectorAll(
      `[data-time-id="${id}"]`
    ) as NodeListOf<HTMLDivElement>;

    if (findElm) {
      const ids: string[] = [];
      let current: HTMLDivElement | null = null;
      let foundElm: HTMLDivElement | null = null;
      findElm.forEach((item) => {
        if (item.parentElement?.dataset.parentId) {
          foundElm = item;
          current = item;
        }
        if (type === 'end') {
          console.log(
            item.parentElement?.parentElement?.previousSibling,
            'parentNodes'
          );
        }
      });
      let totalOffset = 0;
      while (current && !current.classList.contains('survey_wrapper')) {
        totalOffset += current.offsetLeft;
        current = current.offsetParent as HTMLDivElement | null;
      }

      setDividerCords((prev) => ({ ...prev, [type]: totalOffset - 1 }));
      const cordIds: { ind: number; pos: string }[] = [];
      findElm.forEach((item, ind) => {
        if (
          item.parentElement?.dataset.parentId &&
          item.dataset?.timeAvailable
        ) {
          ids.push(item.parentElement.dataset.parentId);
          cordIds.push({
            ind: parseInt(item.id),
            pos: item.parentElement.dataset.cordId as string,
          });
        }
      });
      setScheduleBtnCord((prev) => ({
        ...prev,
        [type]: cordIds,
        parentId: ids,
      }));
    }
  };

  useEffect(() => {
    if (isEditing) {
      const surveyors = [...surveyorsList];
      surveyors[1].bookedSlot = surveyors[1].availableSlot;
      surveyors[1].availableSlot = [];
      setSurveyorsList([...surveyors]);
      getCordsOnChange('1:00 PM', 'start');
      getCordsOnChange('5:00 PM', 'end');
    }
    // clearing timeouts
    return () => {
      timeOutIds.current.forEach((id) => {
        clearTimeout(id);
      });
    };
  }, [timeOutIds, isEditing]);

  const isBetween = useCallback(
    (time: string) => {
      const current = parse(time, 'h:mm aa', new Date());
      const startRange = parse(startTime.value, 'h:mm aa', new Date());
      const endRange = parse(endTime?.value || '', 'h:mm aa', new Date());
      if (startTime.value === '8:00 AM' && endTime?.value === '6:00 PM') {
        return false;
      }
      if (isValid(current) && isValid(startRange) && isValid(endRange)) {
        if (startRange <= endRange) {
          return current >= startRange && current < endRange;
        } else {
          return current >= startRange || current < endRange;
        }
      }
      return false;
    },
    [startTime, endTime]
  );

  const handleTimeChange = (val: IOptions | null, type: 'start' | 'end') => {
    getCordsOnChange(val?.value!, type);
    if (type === 'start' && val) {
      setEndTimeOptions([
        ...timeSlots.filter((item) => item.value !== val?.value),
      ]);
      setStartTime({ ...val });
      setEndTime(undefined);
    } else {
      setEndTime(val!);
    }
  };
  const filteredTime = timeSlots.filter((item) => !item.value.includes(':30'));
  const getTimeIndex = useCallback((time: string) => {
    let init = -1;
    timeSlots.forEach((item, ind) => {
      if (
        isEqual(
          parse(item.value, 'h:mm aa', new Date()),
          parse(time, 'h:mm aa', new Date())
        )
      ) {
        init = ind;
        return;
      }
    });
    return init;
  }, []);

  const getScheduledInfo = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
    type: 'form' | 'schedule' | 'swap'
  ) => {
    const elm = e.currentTarget as HTMLDivElement | HTMLButtonElement;
    const infoCardObj =
      type === 'form'
        ? scheduleRef.current!
        : type === 'swap'
          ? swapWrapper.current!
          : infoCardRef.current!;
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
      if (type === 'form') {
        setSubmitFormCords({ left: offsetLeft, top: offsetTop, opacity: 1 });
        return;
      }
      if (type === 'swap') {
        setSwapCords({ left: offsetLeft, top: offsetTop, opacity: 1 });
        return;
      } else {
        setInfoCardCors({ left: offsetLeft, top: offsetTop, opacity: 1 });
        return;
      }
    }, 300);
    timeOutIds.current.push(id);
  };

  const handleSwap = async () => {
    setIsSwapSucceeded(true);
    const id = setTimeout(() => {
      setSwapCords((prev) => ({ ...prev, opacity: 0 }));
      const id = setTimeout(() => {
        setIsSwapSucceeded(false);
      }, 500);
      timeOutIds.current.push(id);
    }, 1000);
    timeOutIds.current.push(id);
  };

  return (
    <>
      <div className="flex items-end justify-between">
        <div className="">
          <h4 className={styles.detail_heading}>Schedule</h4>
          <div
            style={{ display: isMobile ? 'none' : 'block' }}
            className="flex items-center"
          >
            <Link
              to="/scheduler"
              style={{ fontSize: 12 }}
              className={styles.primary_heading}
            >
              Availability {`>`}{' '}
            </Link>
            <span className="ml1" style={{ fontSize: 12 }}>
              {' '}
              Schedule{' '}
            </span>
          </div>
        </div>

        {!isEditing && (
          <div className="flex " style={{ gap: isMobile ? 7 : 15, marginLeft:isMobile? 18:'',marginRight: isMobile?18:'' }}>
            <SelectOption
              dropdownIndicatorStyles={{ display: 'none' }}
              controlStyles={{
                marginTop: 0,
                minHeight: 'auto',
                width: isMobile ? '73px' : '157px', // Apply width here instead of style
                height: isMobile ? '28px' : 'auto',
                fontSize: isMobile ? '12px' : '',
                fontWeight: isMobile ? '500' : '',
              }}
              options={timeSlots}
              value={startTime}
              onChange={(e) => handleTimeChange(e, 'start')}
              optionStyles={{
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#377CF6',
                },
                background: '#fff',
                color: '#000',
              }}
              singleValueStyles={{ color: '#000000', fontWeight: 600 }}
            />

            <SelectOption
              dropdownIndicatorStyles={{ display: 'none' }}
              width="157px"
              options={endTimeOptions}
              value={endTime}
              onChange={(e) => handleTimeChange(e, 'end')}
              optionStyles={{
                '&:hover': {
                  backgroundColor: '#fff ',
                  color: '#377CF6',
                },
                background: '#fff',
                color: '#000',
              }}
              controlStyles={{
                marginTop: 0,
                minHeight: 'auto',

                width: isMobile ? '73px' : '157px',
                height: isMobile ? '28px' : 'auto',
                fontSize: isMobile ? '12px' : '',
                fontWeight: isMobile ? '500' : '',
              }}
              singleValueStyles={{ color: '#000000', fontWeight: 600 }}
            />

            <button className={styles.refresh_btn}>
              <LuRefreshCcw size={isMobile ? 17 : 22} color="#377CF6" />
            </button>

            <div
              className={` flex relative items-center  ${styles.available_slot_wrapper}`}
            >
              <span className={styles.top_overlay}>35%</span>
              <span className={` pl1 ${styles.top_overlay}`}>Available</span>
              <div className={styles.bg_available_progress} />
            </div>
          </div>
        )}
      </div>

      <div className="mt3" style={{ marginTop: isMobile ? '18px' : 'initial' }}>
      <div className={` flex flex-column ${styles.survery_users_container}`}>
          <div className={`${styles.suvery_grid_wrapper}`}>
            <div
              className={` flex items-end justify-center  ${styles.surver_filter}`}
            >
              <div
                className={`${isMobile ? styles.filter_flex : ''}flex items-center`}
              >
                <h5 className={styles.surveyor} style={{ color: '#377CF6' }}>
                  Surveyor
                </h5>

                <FilterDropDown />
              </div>
            </div>

            <div className={styles.date_wrapper}>
              <div
                className={`px2 items-center  ${styles.date_grid_container}`}
              >
                {arr.map((item, ind) => {
                  return (
                    <div className="date_container" key={ind}>
                      <div
                        style={{ width: 'fit-content', cursor: 'pointer' }}
                        className={`mx-auto cursor-pointer  ${item === activeDate ? styles.active_date : styles.inactive_date}`}
                        onClick={() => setActiveDate(item)}
                      >
                        <span
                          style={{
                            fontSize: isMobile ? 11 : 18,
                            fontWeight: 500,
                          }}
                        >
                          {' '}
                          {format(item, 'EEEE').slice(0, 3)}{' '}
                        </span>
                        <span
                          style={{
                            fontSize: isMobile ? 11 : 20,
                            fontWeight: isMobile ? 500 : 600,
                          }}
                          className="block text-center"
                        >
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
                  className={`py1 px2 ${styles.time_slot_wrapper}`}
                  style={{ background: '#F2F4F6' }}
                >
                  {filteredTime.map((time, ind) => {
                    return (
                      <div
                        key={ind}
                        style={{
                          fontSize: isMobile ? 10 : 14,
                          transform: ind > 0 ? 'translateX(-10px)' : '',
                        }}
                        className={` ${startTime.value === time.value || endTime?.value === time.value ? styles.text_primary : ''} ${ind === 0 ? 'left-align' : ''}   `}
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
          <div className="flex flex-column flex-auto justify-between">
            <div className="relative survey_wrapper">
              {(startTime.value !== '8:00 AM' ||
                endTime?.value !== '6:00 PM' ||
                isEditing) && (
                <>
                  {!!dividerCords.start && (
                    <div
                      className={styles.absolute_vertical_line}
                      style={{ left: dividerCords.start }}
                    />
                  )}
                  {!!dividerCords.end && (
                    <div
                      className={styles.absolute_vertical_line}
                      style={{ left: dividerCords.end }}
                    />
                  )}
                </>
              )}

              {surveyorsList.map((person, idx) => {
                return (
                  <div
                    key={person.id}
                    data-time-parent={person.id}
                    className={styles.survey_progress_container}
                  >
                    <div className={styles.surveyor_name}>{person.name}</div>
                    <div className={styles.progress_wrapper}>
                      <div className={styles.progress_bar}>
                        {person.availableSlot.map((avail, index) => {
                          const startPoint = getTimeIndex(avail.startTime);
                          const endPoint = getTimeIndex(avail.endTime);
                          const col = timeDifference(
                            avail.startTime,
                            avail.endTime
                          );
                          const halfhourSpans = generateTimeArray(
                            avail.startTime,
                            avail.endTime
                          );
                          const start = scheduleBtnCord.start.find(
                            (item) => item.ind === idx
                          )?.pos;
                          const end = scheduleBtnCord.end.find(
                            (item) => item.ind === idx
                          )?.pos;
                          return (
                            <div
                              key={avail.id}
                              style={{
                                gridColumn: `${startPoint + 1}/${endPoint + 1}`,
                                gridTemplateColumns: `repeat(${col * 2},1fr)`,
                              }}
                              className={` relative ${styles.bg_available_slot}`}
                            >
                              {halfhourSpans.map((item, ind) => {
                                const isInterecting = isBetween(item);
                                return (
                                  <div
                                    key={ind * index + 1}
                                    className={`relative ${styles.half_hour_span_wrapper}  ${isInterecting ? styles.masked_img : ''}`}
                                    data-cord-id={ind + 1}
                                    data-parent-id={avail.id}
                                  >
                                    <div
                                      data-time-id={item}
                                      data-time-available={true}
                                      id={idx.toString()}
                                      className={
                                        (ind + 1) % 2 === 0
                                          ? styles.half_hour_span
                                          : ind
                                            ? styles.full_hour_span
                                            : ''
                                      }
                                    />
                                  </div>
                                );
                              })}

                              {scheduleBtnCord.parentId.includes(avail.id) &&
                                start &&
                                (end ? end > start : true) && (
                                  <div
                                    style={{
                                      gridColumn: `${end && end > start ? start : 0}/${end && end > start ? end : 0}`,
                                    }}
                                    className={styles.schdule_btn_wrapper}
                                  >
                                    {isEditing ? (
                                      <button
                                        className={styles.swap_btn}
                                        onClick={(e) =>
                                          getScheduledInfo(e, 'swap')
                                        }
                                      >
                                        Change
                                      </button>
                                    ) : (
                                      <button
                                        onClick={(e) =>
                                          getScheduledInfo(e, 'form')
                                        }
                                        className={` ${styles.available_btn}`}
                                      >
                                        <FaPlus size={18} />
                                      </button>
                                    )}
                                  </div>
                                )}
                            </div>
                          );
                        })}
                        {person.busySlot.map((avail, ind) => {
                          const startPoint = getTimeIndex(avail.startTime);
                          const endPoint = getTimeIndex(avail.endTime);
                          const col = timeDifference(
                            avail.startTime,
                            avail.endTime
                          );
                          const halfhourSpans = generateTimeArray(
                            avail.startTime,
                            avail.endTime
                          );

                          return (
                            <div
                              key={avail.id}
                              style={{
                                gridColumn: `${startPoint + 1}/${endPoint + 1}`,
                                gridTemplateColumns: `repeat(${col * 2},1fr)`,
                                gridAutoFlow: 'column',
                              }}
                              className={styles.bg_busy_slot}
                            >
                              <div
                                role="button"
                                onClick={(e) => getScheduledInfo(e, 'schedule')}
                                className={styles.progress_btn}
                              >
                                <span>View</span>
                                <IoIosArrowRoundForward
                                  size={18}
                                  className="ml1"
                                />
                              </div>

                              {halfhourSpans.map((item, ind) => {
                                return (
                                  <div
                                    key={ind}
                                    className={` ${styles.half_hour_span_wrapper}`}
                                    data-parent-id={avail.id}
                                  >
                                    <div
                                      data-time-id={item}
                                      className={
                                        (ind + 1) % 2 === 0
                                          ? styles.half_hour_span
                                          : ind
                                            ? styles.full_hour_span
                                            : ''
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                        {person.bookedSlot.map((avail, ind) => {
                          const startPoint = getTimeIndex(avail.startTime);
                          const endPoint = getTimeIndex(avail.endTime);
                          const col = timeDifference(
                            avail.startTime,
                            avail.endTime
                          );
                          const halfhourSpans = generateTimeArray(
                            avail.startTime,
                            avail.endTime
                          );

                          return (
                            <div
                              key={avail.id}
                              style={{
                                gridColumn: `${startPoint + 1}/${endPoint + 1}`,
                                gridTemplateColumns: `repeat(${col * 2},1fr)`,
                                gridAutoFlow: 'column',
                              }}
                              className={styles.bg_booked_slot}
                            >
                              <div
                                role="button"
                                onClick={(e) => getScheduledInfo(e, 'schedule')}
                                className={styles.progress_btn}
                              >
                                <span>View</span>
                                <IoIosArrowRoundForward
                                  size={18}
                                  className="ml1"
                                />
                              </div>

                              {halfhourSpans.map((item, ind) => {
                                return (
                                  <div
                                    key={ind}
                                    className={` ${styles.half_hour_span_wrapper}`}
                                    data-parent-id={avail.id}
                                  >
                                    <div
                                      data-time-id={item}
                                      className={
                                        (ind + 1) % 2 === 0
                                          ? styles.half_hour_span
                                          : ind
                                            ? styles.full_hour_span
                                            : ''
                                      }
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="page-heading-container">
              <p className="page-heading">1 - 10 of 50 item</p>

              <Pagination
                currentPage={1}
                totalPages={12} // You need to calculate total pages
                paginate={(num) => num}
                currentPageData={[]}
                goToNextPage={() => 0}
                goToPrevPage={() => 0}
                perPage={10}
              />
            </div>
          </div>
          <div
            ref={infoCardRef}
            style={{
              top: infoCardCords.top,
              left: infoCardCords.left,
              opacity: infoCardCords.opacity,
              pointerEvents: infoCardCords.opacity ? 'all' : 'none',
            }}
            className={styles.scheduled_info_container}
          >
            <div
              className={styles.close_btn}
              onClick={() =>
                setInfoCardCors((prev) => ({ ...prev, opacity: 0 }))
              }
            >
              <IoCloseOutline color="#F3B7BE" size={20} />
            </div>
            <div className="px2">
              <h4 className={styles.info_card_heading}>Site survey</h4>
              <button className={styles.accepted_btn}>
                <div className={styles.circular_check}>
                  <FaCheck color="#fff" />
                </div>
                <span>Accepted</span>
              </button>

              <div style={{ color: '#fff', fontSize: 12 }} className=" mt2">
                <p>9:00 AM - 12:00 PM</p>
                <p>Monday, 29 July</p>
              </div>
              <div className={styles.customer_info_wrapper}>
                <h5 style={{ fontSize: 14, fontWeight: 500 }}>
                  Customer Details
                </h5>
                <p className="mt1">Jacob Simon</p>
                <p className="mt1">+01 9834432456</p>
                <p className="mt1">103 backstreet, churchline, arizona,12544</p>
              </div>
            </div>
          </div>

          <div
            style={{
              top: submitFormCords.top,
              left: submitFormCords.left,
              opacity: submitFormCords.opacity,
              pointerEvents: submitFormCords.opacity ? 'all' : 'none',
            }}
            ref={scheduleRef}
            className={styles.schedule_form_wrapper}
          >
            <h4 className={styles.form_schedule_heading}>Add Schedule</h4>
            <div className="mt1">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Event Title"
                  className={styles.schedule_input}
                />
              </div>
              <div style={{ marginTop: 14 }} className="flex  items-center">
                <div className="flex  items-center">
                  <RxCalendar size={16} color="rgb(48, 48, 48,0.4)" />
                  <p className={` ml2 ${styles.text_sm}`}>Friday, 29 July </p>
                </div>

                <div className="flex ml3 items-center">
                  <LuClock size={16} color="rgb(48, 48, 48,0.4)" />
                  <p className={` ml2 ${styles.text_sm}`}>
                    10:00 Am - 12:00 Pm{' '}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: 14 }} className="input-wrapper ">
                <input
                  type="text"
                  placeholder="+ Add description"
                  className={styles.schedule_input}
                />
              </div>
              <div
                style={{ marginTop: 12 }}
                className={`  ${styles.survey_detail_wrapper}`}
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
                      style={{ color: '#303030', fontSize: 12, marginLeft: 3 }}
                    >
                      Person 5
                    </p>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineEmail size={10} color="#303030" />
                    <p
                      style={{ color: '#303030', fontSize: 12, marginLeft: 3 }}
                    >
                      simonalone341@gmail.com
                    </p>
                  </div>
                  <div className="flex items-center">
                    <PiPhone size={10} color="#303030" />
                    <p
                      style={{ color: '#303030', fontSize: 12, marginLeft: 3 }}
                    >
                      +01 9834433456
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex mt2 justify-center items-center">
                <button
                  onClick={() =>
                    setSubmitFormCords((prev) => ({ ...prev, opacity: 0 }))
                  }
                  className={styles.secondary_schdeule_btn}
                >
                  Cancel
                </button>
                <button
                  className={styles.primary_schdeule_btn}
                  onClick={() => setIsSuccess(true)}
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>

          {isEditing && (
            <div
              style={{
                top: swapCords.top,
                left: swapCords.left,
                opacity: swapCords.opacity,
                pointerEvents: swapCords.opacity ? 'all' : 'none',
              }}
              ref={swapWrapper}
              className={styles.swap_wrapper}
            >
              {isSwapSucceeded ? (
                <FaCircleCheck size={46} className="mx-auto" color="#20963A" />
              ) : (
                <img width={144} src={ICONS.userSwap} alt="" />
              )}
              <p className="text-center mt2 px2">
                {isSwapSucceeded
                  ? `Surveyor changed
successfully`
                  : `Are you sure, you want to
              change surveyor ?`}
              </p>
              {!isSwapSucceeded && (
                <div className="flex mt2 items-center">
                  <button
                    onClick={handleSwap}
                    className={styles.swap_primary_btn}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() =>
                      setSwapCords((prev) => ({ ...prev, opacity: 0 }))
                    }
                    className={styles.swap_secondary_btn}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isSuccess && <SuccessPopup setIsOpen={setIsSuccess} />}
    </>
  );
};

export default Index;
