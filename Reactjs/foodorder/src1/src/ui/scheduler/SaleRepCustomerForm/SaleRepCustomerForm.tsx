import React, { useState } from 'react';
import styles from './styles/index.module.css';
import Input from './component/Input/Input';
import DayPickerCalendar from '../components/ProgressCalendar/ProgressCalendar';
import shardeStyles from '../SalesRepScheduler/styles/customerlist.module.css';
import { IoIosInformationCircle } from 'react-icons/io';
import { format } from 'date-fns';
import { MdKeyboardBackspace } from 'react-icons/md';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const timeSlots = [
  { id: 1, time: '6:00 Am - 9:00 Am', uniqueId: 1 },
  { id: 7, time: '9:30 Am - 12:30 Pm', uniqueId: 2 },
  { id: 7, time: '1:00 Pm - 4:00 Pm', uniqueId: 3 },
  { id: 1, time: '4:30 Pm - 7:30 Pm', uniqueId: 4 },
  { id: 7, time: '8:00 Pm - 11:00 Pm', uniqueId: 5 },
];

const dayWithProgress = [
  { id: 1, date: new Date(2024, 8, 20), progress: 75 },
  { id: 2, date: new Date(2024, 8, 23), progress: 35 },
  { id: 3, date: new Date(2024, 8, 24), progress: 70 },
  { id: 4, date: new Date(2024, 8, 5), progress: 63 },
  { id: 5, date: new Date(2024, 8, 4), progress: 79 },
  { id: 6, date: new Date(2024, 8, 2), progress: 20 },
  { id: 7, date: new Date(2024, 9, 4), progress: 95 },
];
interface ITimeSlot {
  id: number;
  time: string;
  uniqueId: number;
}
const SaleRepCustomerForm = () => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availableSlots, setAvailableSlots] = useState<ITimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<ITimeSlot>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    prospectId: '',
    name: '',
    phoneNo: '',
    email: '',
    address: '',
    salesRep: '',
  });

  const isSmallScreen = useMatchMedia('(max-width:968px)');
  const isMobile = useMatchMedia('(max-width:450px)');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      className={`scrollbar ${styles.form_wrapper} ${step === 1 ? styles.no_inner_padding : ''} `}
    >
      <div
        className={`${styles.form_conatiner} ${step === 2 ? styles.bg_transparent : ''} `}
      >
        <div
          className={` flex items-center justify-center ${styles.form_header}`}
        >
          {step < 3 && (
            <>
              <div
                className="flex items-center"
                style={{
                  flexBasis: step === 2 && !isSmallScreen ? '40%' : undefined,
                }}
              >
                {step > 1 && (
                  <div className={`${styles.back_btn} curosr-pointer ml3`}>
                    <MdKeyboardBackspace
                      style={{ cursor: 'pointer' }}
                      onClick={() => setStep(1)}
                    />
                  </div>
                )}
                <div
                  className={
                    step === 1
                      ? 'flex flex-column items-center justify-center '
                      : styles.header_title
                  }
                  style={{
                    width:
                      step === 2 && !isSmallScreen ? 'fit-content' : undefined,
                  }}
                >
                  <h3>Site survey Scheduling Form</h3>
                  <p>Change the customer information if incorrect</p>
                </div>
              </div>

              {step === 2 && (
                <div
                  style={{ flexBasis: '60%' }}
                  className={styles.date_header_label}
                >
                  <div className={`${styles.calendar_h3}flex items-center justify-center`}>
                    <h3 className="text-white text-center">
                      Select Date & Time
                    </h3>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        {step === 3 && (
          <div
            className="flex items-center flex-column justify-center"
            style={{ width: '100%', height: '500px' }}
          >
            <h5
              className={` mb2  ${shardeStyles.selected_time}`}
              style={{ fontSize: 18, fontWeight: 300 }}
            >
              {selectedDate && format(selectedDate, 'EEEE, dd MMM')}{' '}
              {selectedTime?.time}{' '}
            </h5>
            <h3
              className={`${shardeStyles.survey_success_message} text-center mb2`}
            >
              Site survey appointment information submitted 👍
            </h3>
            <p style={{ fontSize: 14, textAlign: 'center', fontWeight: 300 }}>
              The team will review the information and schedule the survey.
              <br />
              You will be notified via email once the arrangements are made
            </p>

            <Link to="/login" className={styles.navigate_btn}>
              Go to dashboard
            </Link>
          </div>
        )}
        <div className="flex">
          {step <= 2 && (
            <div
              style={{
                flexBasis:
                  step === 1
                    ? isSmallScreen
                      ? '100%'
                      : '70%'
                    : isSmallScreen
                      ? undefined
                      : '40%',
              }}
              className={`${styles.form_content}  ${step === 2 ? styles.mobile_hidden : ''} py3 ${step === 2 ? 'px4' : ''} `}
            >
              <div
                onClick={handleBack}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: '10px',
                  cursor: 'pointer',
                }}
              >
                <FaXmark
                  style={{
                    height: '20px',
                    width: '20px',
                    color: '#000000',
                    fontWeight: '600',
                  }}
                />
              </div>
              <div className="mb2">
                <Input
                  label="Prospect ID"
                  name="prospectId"
                  value={formData.prospectId}
                  onChange={handleChange}
                  showIsEditing={false}
                  readOnly
                />
              </div>
              <div className="mb2">
                <Input
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  showIsEditing={formData.name !== ''}
                />
              </div>
              <div className="mb2">
                <Input
                  label="Phone No."
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  showIsEditing={formData.phoneNo !== ''}
                />
              </div>
              <div className="mb2">
                <Input
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  showIsEditing={formData.email !== ''}
                />
              </div>
              <div className="mb2">
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  showIsEditing={formData.address !== ''}
                />
              </div>
              <div>
                <Input
                  label="Sales Rep"
                  name="salesRep"
                  value={formData.salesRep}
                  onChange={handleChange}
                  showIsEditing={false}
                  readOnly
                />
              </div>
            </div>
          )}
          {step === 2 && (
            <div style={{ flex: '1' }} className={styles.date_time_container}>
              <div
                className={`  items-center justify-between  px2 ${styles.sm_date_close_header}`}
              >
                <h5 style={{ fontWeight: 500, fontSize: 16 }} className="">
                  Select Date & Time
                </h5>

                <button
                  onClick={() => {
                    setSelectedDate(undefined);
                    setSelectedTime(undefined);
                    setAvailableSlots([]);
                  }}
                  className={`${shardeStyles.calendar_close_btn_mobile} ml2`}
                >
                  <IoClose size={24} />
                </button>
              </div>
              <div
                className={`flex items-start mt3 ${shardeStyles.date_time_wrapper} ${selectedDate ? 'justify-between' : 'justify-center'}`}
              >
                <DayPickerCalendar
                  dayCellClassName={shardeStyles.day_cell}
                  circleSize={isMobile ? 44 : 50}
                  selectedDate={selectedDate}
                  onClick={(e) => {
                    setSelectedDate(e.date);

                    setSelectedTime(undefined);
                    setAvailableSlots([
                      ...timeSlots.filter((slot) => slot.id === e.event.id),
                    ]);
                  }}
                  dayWithProgress={dayWithProgress}
                />
                {selectedDate ? (
                  <div
                    className={`flex flex-column  justify-center ${styles.slot_wrapper}`}
                    style={{ width: '100%' }}
                  >
                    <h5
                      className={`mb2 ${shardeStyles.time_slot_label} `}
                      style={{ fontSize: 14, fontWeight: 500 }}
                    >
                      {' '}
                      Select time slot
                    </h5>
                    <div
                      className={` ${styles.sm_padding} ${shardeStyles.time_slot_pill_wrapper}`}
                    >
                      {!!availableSlots.length ? (
                        availableSlots.map((slot) => {
                          return (
                            <button
                              onClick={() => setSelectedTime(slot)}
                              key={slot.uniqueId}
                              className={`${shardeStyles.time_slot_pill} ${selectedTime?.uniqueId === slot.uniqueId ? shardeStyles.active_time_slot : shardeStyles.inactive_time_slot} `}
                            >
                              {slot.time}
                            </button>
                          );
                        })
                      ) : (
                        <h5>No Slot Available</h5>
                      )}
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>
              {selectedTime && selectedDate && (
                <div className={`mt2 ${styles.btn_wrapper}`}>
                  <div className="flex mb2 items-center justify-center">
                    <h5 className={shardeStyles.selected_time}>
                      {format(selectedDate, 'EEEE, dd MMM')} {selectedTime.time}{' '}
                    </h5>
                    <IoIosInformationCircle
                      className="ml1"
                      color="#1F2937"
                      size={17}
                    />
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    className={`mx-auto ${shardeStyles.calendar_schedule_btn}`}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {step === 1 && (
          <div className={`bg-white mt3  ${styles.sm_padding}`}>
            <p style={{ fontSize: 12 }} className="text-center mb2">
              Make sure all the information is correct before confirming
            </p>
            <button
              onClick={() => setStep(2)}
              className={` mx-auto  ${styles.submit_btn}`}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleRepCustomerForm;
