import React, { useState, useEffect } from 'react';
import styles from './styles/customerlist.module.css';
import SortingDropDown from '../components/SortingDropdown/SortingDropDown';
import { ICONS } from '../../../resources/icons/Icons';
import { CiMail } from 'react-icons/ci';
import { BiPhone } from 'react-icons/bi';
import { TbChevronDown } from 'react-icons/tb';
import { CSSObjectWithLabel } from 'react-select';
import { IoLocationOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import DayPickerCalendar from '../components/ProgressCalendar/ProgressCalendar';
import { IoIosInformationCircle } from 'react-icons/io';
import { format } from 'date-fns';
import SelectOption from '../../components/selectOption/SelectOption';
import { CalendarIcon } from './components/Icons';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { parseISO } from 'date-fns';
import ScheduledActivity from '../components/ScheduledActivity/ScheduledActivity';
import { MdOutlineAdd } from 'react-icons/md';
import Select from './components/Select';
import { HiSortDescending } from 'react-icons/hi';
import Sort from './components/Sort';
import useEscapeKey from '../../../hooks/useEscape';
import Pagination from '../../components/pagination/Pagination';
import { Tooltip } from 'react-tooltip';


interface ITimeSlot {
  id: number;
  time: string;
  uniqueId: number;
}
const Marker = ({
  text,
  lat,
  lng,
}: {
  text: string;
  lat: number;
  lng: number;
}) => <div>{text}</div>;

interface propTypes {
  mapStyles?: CSSObjectWithLabel;
}

export interface ICustomer {
  roof_type: string;
  home_owner: string;
  customer_email: string;
  customer_phone_number: string;
  system_size: string;
  address: string;
}

interface IApiResponse {
  status: number;
  message: string;
  dbRecCount: number;
  data: {
    customer_email: string;
    details: {
      date: string;
      colorcode: string;
      progress: number;
    }[];
  };
}

interface ISalesRepResponse {
  status: number;
  message: string;
  dbRecCount: number;
  data: {
    sale_rep_project: ISalesRepProject[];
  };
}

interface ISalesRepProject {
  prospect_id: string;
  customer_first_name: string;
  customer_last_name: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  zipcode: number;
  roof_type: string;
  system_size: string;
  latitude: number;
  longitude: number;
  is_battery_installed: boolean;
  is_appointment_approved: boolean;
  is_appointment_self_scheduled: boolean;
  self_scheduled_date: string;
  self_scheduled_start_time: string;
  self_scheduled_end_time: string;
  customer_created_by: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

interface DayWithProgress {
  id: number;
  date: Date;
  progress: number;
  colorCode: string; // Change from colorcode to colorCode
}

// const customers = [
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jacob Martin',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jacob Martin',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jacob Martin',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jacob Martin',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jacob Martin',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
//   {
//     roof_type: 'XYZ Rooftype',
//     home_owner: 'Jon Jones',
//     customer_email: 'Alexsimon322@gmail.com',
//     customer_phone_number: '(831) 544-1235',
//     system_size: '450 KW',
//     address: '2443 Sierra Nevada Road, Mammoth Lakes CA 93546',
//   },
// ];
const CustomersList = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<ISalesRepProject[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState(-1);
  const [collapse, setCollapse] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const PAGE_SIZE = 10; // Fixed page size
  const startIndex = (currentPage - 1) * PAGE_SIZE + 1;  // Correct start index for pagination.
  const endIndex = currentPage * PAGE_SIZE; // End index before capping it.
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState<number>(0); // Store total number of records (dbRecCount)
  const [isClosing, setIsClosing] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<ITimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<ITimeSlot>();
  const [isSurveyScheduled, setIsSurveyScheduled] = useState(false);
  const [selectedSort, setSelectedSort] = useState('newToOld'); // Manage selected sort option here
  const isSmallScreen = useMatchMedia('(max-width:968px)');
  const isMobile = useMatchMedia('(max-width:450px)');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTimeSlotsOpen, setIsTimeSlotsOpen] = useState(false);
  const [calendarData, setCalendarData] = useState<
    IApiResponse['data']['details']
  >([]);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // const getCustomers = async () => {
  //   try {
  //     setIsPending(true);
  //     const data = await postCaller('scheduling_home', {
  //       page_number: page,
  //       page_size: 10,
  //       queue: 'priority',
  //       order: 'asc',
  //     });
  //     if (data.status > 201) {
  //       setIsPending(false);
  //       toast.error((data as Error).message as string);
  //       return;
  //     }
  //     setCustomers(data?.data?.scheduling_list || customers);
  //     setIsPending(false);
  //   } catch (error) {
  //     setIsPending(false);
  //     toast.error((error as Error).message as string);
  //   }
  // };

  const handleAddClick = () => {
    navigate('/add-new-salesrep-schedule');
  };

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  // const timeSlots = [
  //   { id: 1, time: '6:00 Am - 9:00 Am', uniqueId: 1 },
  //   { id: 7, time: '9:30 Am - 12:30 Pm', uniqueId: 2 },
  //   { id: 7, time: '1:00 Pm - 4:00 Pm', uniqueId: 3 },
  //   { id: 1, time: '4:30 Pm - 7:30 Pm', uniqueId: 4 },
  //   { id: 7, time: '8:00 Pm - 11:00 Pm', uniqueId: 5 },
  // ];

  // const dayWithProgress = [
  //   { id: 1, date: new Date(2024, 8, 20), progress: 75 },
  //   { id: 2, date: new Date(2024, 8, 23), progress: 35 },
  //   { id: 3, date: new Date(2024, 8, 24), progress: 70 },
  //   { id: 4, date: new Date(2024, 8, 25), progress: 63 },
  //   { id: 5, date: new Date(2024, 8, 26), progress: 79 },
  //   { id: 6, date: new Date(2024, 8, 27), progress: 20 },
  //   { id: 7, date: new Date(2024, 9, 1), progress: 95 },
  // ];
  const sortOptions = [
    { label: 'New to Old', value: 'newToOld' },
    { label: 'Old to New', value: 'oldToNew' },
  ];

  const getCustomers = async (pageNumber: number = 1) => {
    try {
      setIsPending(true);
      const response = await axios.post('https://staging.owe-hub.com/api/owe-schedule-service/v1/get_sales_rep', {
        sort_order: selectedSort === 'newToOld' ? 'new_to_old' : 'old_to_new',
        page_number: pageNumber,
        page_size: PAGE_SIZE,
      });
  
      if (response.data.status === 200) {
        setCustomers(response.data.data.sale_rep_project || []); // Default to empty array if null
        const totalRecords = response.data.dbRecCount;
        setTotalRecords(totalRecords);
        setTotalPages(Math.ceil(totalRecords / PAGE_SIZE));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch customers');
      setCustomers([]); // Ensure customers is always an array, even on error
    } finally {
      setIsPending(false);
    }
  };


  useEffect(() => {
    getCustomers(currentPage);
  }, [currentPage, selectedSort]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setPerPage(newPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };


const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      setIsClosing(false);
    }, 400);
  };

  useEffect(() => {
    fetchCalendarData();
  }, []);

  const fetchCalendarData = async () => {
    try {
      const response = await axios.post<IApiResponse>(
        'https://staging.owe-hub.com/api/owe-schedule-service/v1/get_sales_rep_calendar'
      );
      if (response.data.status === 200) {
        // toast.success('Calendar data fetched successfully');
        const details = response.data.data.details;
        setCalendarData(details);

        if (details.length > 0) {
          // setSelectedDate(parseISO(details[0].date));
        }
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching calendar data:', error);
      toast.error('Failed to fetch calendar data');
    }
  };

  useEffect(() => {
    console.log('Updated calendarData:', calendarData);
  }, [calendarData]);

  useEffect(() => {
    console.log('Updated CustomersList:', customers);
  }, [customers]);

  const transformedCalendarData: DayWithProgress[] = calendarData.map(
    (item, index) => ({
      id: index,
      date: new Date(item.date),
      progress: item.progress,
      colorCode: item.colorcode || '#fff',
    })
  );

  useEffect(() => {
    if (selectedDate) {
      const selectedDateData = calendarData.find(
        (item) =>
          format(parseISO(item.date), 'yyyy-MM-dd') ===
          format(selectedDate, 'yyyy-MM-dd')
      );

      if (selectedDateData) {
        // setAvailableSlots(timeSlots.filter((slot) => slot.id === 1));
      } else {
        setAvailableSlots([]);
      }

      setSelectedTime(undefined);
    }
  }, [selectedDate, calendarData]);

  const handleScheduleRepeat = () => {
    setIsDrawerOpen(true);
  };

  const handleSortChange = (sortOrder: string) => {
    setSelectedSort(sortOrder);
    console.log('Selected sort order:', sortOrder);
  };

  // useEscapeKey(() => setIsDrawerOpen(false));
  useEscapeKey(() => setCollapse(-1));

  return (
    <div className={`${styles.schedule_page_wrapper}`}>
      <div
        className={`flex items-center justify-end ${styles.schedule_header} ${isDrawerOpen ? styles.blurred : ''}`}
      >
     {isSmallScreen && (
          <div className={styles.filtericon} onClick={toggleCalendar}>
            <CalendarIcon size={19} />
          </div>
        )}
      </div>

      <div
        className={`flex justify-between ${isDrawerOpen ? styles.blurred : ''} `}
      >
        <div
          className={`${
            selectedCustomer === -1 && !isCalendarOpen
              ? styles.show_mobile
              : styles.hide_mobile
          } ${styles.customer_wrapper_list}`}
        >
          <div className={styles.sr_top}>
            <div className={styles.pending}>
              <>
                <div className={styles.notification}>
                  <span>{totalRecords}</span>
                </div>
                <h3>Pending Schedule</h3>
              </>
            </div>

            <div className={styles.filter}>
              <Sort
                options={sortOptions}
                selectedValue={selectedSort}
                onChange={handleSortChange}
              />
              
              <div className={styles.filtericon} onClick={handleScheduleRepeat} data-tooltip-id="Scheduled Activity">
                <img src={ICONS.ScheduleRepeat} alt="" />
              </div>
              <Tooltip
        style={{
          zIndex: 20,
          background: '#f7f7f7',
          color: '#000',
          fontSize: 12,
          paddingBlock: 4,
          fontWeight: "400"
        }}
        className={styles.tooltip}
        offset={5}
        delayShow={300}
        id="Scheduled Activity"
        place="bottom"
        content="Scheduled Activity"
      />
              <div data-tooltip-id="Add New" className={styles.filtericon} onClick={handleAddClick} >
                <MdOutlineAdd size={23} />
              </div>
              <Tooltip
        style={{
          zIndex: 20,
          background: '#f7f7f7',
          color: '#000',
          fontSize: 12,
          paddingBlock: 4,
          fontWeight: "400"
        }}
        offset={5}
        delayShow={300}
        id="Add New"
        place="bottom"
        content="Add New"
      />
            </div>
          </div>

          <div className={` ${styles.cust_det_list}`}>
            {isPending ? (
              <div className="flex items-center justify-center">
                <MicroLoader />
              </div>
            ) : !Boolean(customers.length) || !customers ? (
              <div className="flex items-center justify-center">
                <DataNotFound />
              </div>
            ) : (
              customers.map((customer, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCustomer(index);
                    if (collapse !== selectedCustomer) {
                      setCollapse(-1);
                    }
                  }}
                  className={`${selectedCustomer === index ? `${styles.customer_details_selected} ${styles.open}` : styles.customer_details}  ${(isSmallScreen ? collapse === index : selectedCustomer === index) ? styles.selected_active_customer : ''} `}
                >
                  <div className={styles.cust_det_top}>
                    <div className={styles.cust_name}>
                      <div className={styles.name}>
                        <div
                          style={{ backgroundColor: '#FFEAEA' }}
                          className={styles.name_icon}
                        >
                          <span>
                            {`${customer.customer_first_name[0]}${customer.customer_last_name[0]}`.toUpperCase()}
                          </span>
                        </div>
                        {`${customer.customer_first_name} ${customer.customer_last_name}`}
                      </div>
                      <button
                        className={styles.accordian_btn}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCollapse((prev) => (prev === index ? -1 : index));
                          if (selectedCustomer !== index && !isSmallScreen) {
                            setSelectedCustomer(index);
                          }
                        }}
                      >
                        <TbChevronDown
                          size={22}
                          style={{
                            transform:
                              (isSmallScreen || selectedCustomer === index) &&
                              collapse === index
                                ? 'rotate(180deg)'
                                : undefined,
                            transition: 'all 500ms',
                          }}
                        />
                      </button>
                    </div>
                    <div className={styles.parent_icon_and_content}>
                      {/* icon and content */}
                      <div
                        className={`${styles.cust_name} ${styles.icon_and_content}`}
                      >
                        <div className={styles.head_det}>
                          <div
                            // style={{
                            //   backgroundColor: '#E8FFE7',
                            //   color: '#8BC48A',
                            // }}
                            className={styles.name_icon}
                          >
                            <CiMail size={15} />
                          </div>
                          <span>{customer.email}</span>
                        </div>
                      </div>

                      <div
                        className={`${styles.cust_name} ${styles.icon_and_content}`}
                      >
                        <div className={styles.head_det}>
                          <div className={styles.name_icon}>
                            <BiPhone
                              size={15}
                              style={{ transform: 'translateX(10px)' }}
                            />
                          </div>
                          <span>{customer.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {(isSmallScreen || selectedCustomer === index) &&
                    collapse === index && (
                      <div className={styles.cust_det_bot}>
                        {/* kilo Watt */}
                        <div
                          className={`${styles.grid_items} ${styles.grid_items}`}
                        >
                          <div className={styles.name_icon}>
                            <img
                              width={13}
                              src={ICONS.scheduleDoor}
                              alt="img"
                            />
                          </div>
                          <div className={styles.head_det}>
                            <span> {customer.system_size} </span>
                          </div>
                        </div>

                        {/* rooftype */}
                        <div
                          className={`${styles.grid_items} ${styles.rooftype_align}`}
                        >
                          <div className={styles.name_icon}>
                            <img
                              style={{ filter: 'brightness(10)' }}
                              src={ICONS.RoofType}
                              width={15}
                              alt="img"
                            />
                          </div>
                          <div className={styles.head_det}>
                            <span> {customer.roof_type} </span>
                          </div>
                        </div>

                        {/* address */}

                        <div className={`${styles.grid_items}`}>
                          <div className={styles.name_icon}>
                            <IoLocationOutline />
                          </div>
                          <div className={styles.head_det}>
                            <span>{customer.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ))
            )}
          </div>
          {customers && customers.length > 0 && !isPending ? (
  <div className="page-heading-container">
    <p className="page-heading">
      Showing {startIndex} - {Math.min(endIndex, totalRecords)} of {totalRecords} items
    </p>
    <Pagination
      currentPage={currentPage}
      currentPageData={customers}
      totalPages={totalPages}
      paginate={(pageNumber) => setCurrentPage(pageNumber)}
      goToNextPage={goToNextPage}
      goToPrevPage={goToPrevPage}
      perPage={PAGE_SIZE}
    />
  </div>
) : null}

        </div>

        <div
          className={`${
            selectedCustomer > -1 || isCalendarOpen
              ? styles.show_mobile
              : styles.hide_mobile
          } bg-white ${styles.calendar_wrapper}`}
        >
          {!isSurveyScheduled ? (
  <>
    <div className="flex items-center justify-between mb3">
      <h5
        style={{ color: "#292B2E", fontWeight: 600, fontSize: 16, marginLeft: '20px', paddingTop:'7px', cursor:'default' }}
        className="ml2"
      >
        Select Date & Time
      </h5>

      <button
        onClick={() => {
          setSelectedDate(undefined);
          setSelectedTime(undefined);
          setAvailableSlots([]);
          setSelectedCustomer(-1);
          setIsCalendarOpen(false);
          setIsTimeSlotsOpen(false); // Reset time slot visibility
        }}
        className={`${styles.calendar_close_btn_mobile} ml2`}
      >
        <IoClose size={24} />
      </button>
    </div>
    <div
      className={`flex items-start ${styles.date_time_wrapper} ${selectedDate ? 'justify-between' : 'justify-center'}`}
    >
      <DayPickerCalendar
        dayCellClassName={styles.day_cell}
        circleSize={isMobile ? 44 : 50}
        selectedDate={selectedDate}
        onClick={(e) => {
          if (selectedDate && selectedDate.getTime() === e.date.getTime()) {
            // Toggle the time slot container visibility and reset selected date if closing
            setIsTimeSlotsOpen(prev => {
              if (prev) {
                setSelectedDate(undefined); // Reset selected date
                return false; // Close the time slots
              }
              return true; // Open the time slots if not already open
            });
          } else {
            setSelectedDate(e.date);
            setIsTimeSlotsOpen(true); // Open time slots on new date
          }
        }}
        dayWithProgress={transformedCalendarData}
      />
      {selectedDate && isTimeSlotsOpen && (
        <div className={`${styles.slotContainer}`} style={{ width: '100%', cursor:'default' }}>
          <h5 className={`mb2 ${styles.time_slot_label}`}>
            Select time slot
          </h5>
          <div className={styles.time_slot_pill_wrapper}>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  onClick={() => setSelectedTime(slot)}
                  key={slot.uniqueId}
                  className={`${styles.time_slot_pill} ${selectedTime?.uniqueId === slot.uniqueId ? styles.active_time_slot : styles.inactive_time_slot}`}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <h5 style={{display:'flex', alignItems:'center', justifyContent:'center', fontWeight: 600, color: "#292B2E"}}>No Slot Available</h5>
            )}
          </div>
        </div>
      )}
    </div>
    {selectedTime && selectedDate && (
      <div className={styles.schedule_confirmation_wrapper}>
        <div className="flex mb2 items-center justify-center">
          <h5 className={styles.selected_time}>
            {format(selectedDate, 'EEEE, dd MMM')} {selectedTime.time}{' '}
          </h5>
          <IoIosInformationCircle className="ml1" color="#1F2937" size={17} />
        </div>
        <button
          onClick={() => setIsSurveyScheduled(true)}
          className={`mx-auto ${styles.calendar_schedule_btn}`}
        >
          Submit
        </button>
      </div>
    )}
  </>
) : (
  <div
    className="flex items-center flex-column justify-center"
    style={{ height: 'calc(100vh - 200px)' }}
  >
    <h3 className={styles.survey_success_message}>
      Site survey scheduled 👍
    </h3>
    <h5 className={styles.selected_time}>
      {selectedDate && format(selectedDate, 'EEEE, dd MMM')}{' '}
      {selectedTime?.time}{' '}
    </h5>
  </div>
)}

        </div>
      </div>
      {isDrawerOpen && (
        <div
          className={`${styles.drawer_overlay} ${isClosing ? styles.overlay_closing : ''}`}
          onClick={handleClose}
        >
          <div
            className={`${styles.drawer_content} ${isSmallScreen ? styles.fullscreen : ''} ${
              isClosing ? styles.drawer_closing : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <ScheduledActivity 
              onClose={handleClose} 
              isOpen={isDrawerOpen} 
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default CustomersList;
