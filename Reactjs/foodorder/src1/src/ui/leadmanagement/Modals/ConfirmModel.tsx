import React, { useEffect, useState } from 'react';
import classes from '../styles/confirmmodal.module.css';
import ConfirmationICON from './Modalimages/ConfirmationICON.svg';
import ThumbsSucess from './Modalimages//Thumbs.svg';
import SignatureICON from './Modalimages/CorrectSign.png';
import QuestionMarks from './Modalimages/SignOfIntrogation.png';
import failledLogo from './Modalimages/FAILLED.png';
import DoneLogo from './Modalimages/DoneLogo.png';
import FileAttach from './Modalimages/FileAttach.png';
import EditModal from './EditModal';
import { ICONS } from '../../../resources/icons/Icons';
import AppointmentScheduler from './AppointmentScheduler';
import CrossIcon from '../Modals/Modalimages/crossIcon.png';
import Pen from '../Modals/Modalimages/Vector.png';
import { toast } from 'react-toastify';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { format, parseISO } from 'date-fns';
import CreateProposal from './CreateProposal'; // Import the new component
import axios from 'axios';
import {
  getLeadById,
  getLeads,
} from '../../../redux/apiActions/leadManagement/LeadManagementAction';
import { useDispatch } from 'react-redux';
import useAuth from '../../../hooks/useAuth';
import MicroLoader from '../../components/loader/MicroLoader';
import DataNotFound from '../../components/loader/DataNotFound';
import Input from '../../scheduler/SaleRepCustomerForm/component/Input/Input';
import useMatchMedia from '../../../hooks/useMatchMedia';
import { current } from '@reduxjs/toolkit';
import colorConfig from '../../../config/colorConfig';

interface EditModalProps {
  isOpen1: boolean;
  onClose1: () => void;
  leadId?: number;
  refresh: number;
  setRefresh: (value: number | ((prevValue: number) => number)) => void;
  reschedule?: boolean;
  action?: boolean;
  setReschedule: React.Dispatch<React.SetStateAction<boolean>>;
  finish?: boolean;
  setFinish: React.Dispatch<React.SetStateAction<boolean>>;

  won?: boolean;
  setWon: React.Dispatch<React.SetStateAction<boolean>>;

  qc?: boolean;
  setQc: React.Dispatch<React.SetStateAction<boolean>>;
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
}
interface LeadData {
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  street_address: string;
  status_id: number;
  created_at: string;
  appointment_date: string;
  appointment_scheduled_date: string;
  appointment_accepted_date: string;
}
const ConfirmaModel: React.FC<EditModalProps> = ({
  isOpen1,
  onClose1,
  leadId,
  reschedule,
  action,
  setRefresh,
  refresh,
  setReschedule,
  won,
  setWon,
  finish,
  setFinish,
  currentFilter,
  qc,
  setQc,
  setCurrentFilter
}) => {
  const [visibleDiv, setVisibleDiv] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOpen, setModalClose] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [load, setLoad] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  const [loadingProposal, setLoadingProposal] = useState(false);
  const [error, setError] = useState('');
  const [proposalLink, setProposalLink] = useState<string | null>(null);
  const [iframeSrc, setIframeSrc] = useState<string | null>(null); // State for iframe source
  const isMobile = useMatchMedia('(max-width: 600px)');

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };
  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };
  const HandleModal = () => {
    setModalClose(false);
    onClose1();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [success, setSuccess] = useState('');
  const handleSendAppointment = async () => {
    setLoad(true);
    try {
      const date = selectedDate ? new Date(selectedDate) : new Date();
      const time = selectedTime ? new Date(selectedTime) : new Date();

      date.setHours(time.getHours());
      date.setMinutes(time.getMinutes());
      date.setSeconds(time.getSeconds());
      const formattedDateTime = date.toISOString();

      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          status_id: 1,
          "appointment_date_time": formattedDateTime
        },
        true
      );

      if (response.status === 200) {
        toast.success('Appointment Sent Successfully');
        setReschedule(false);
        setRefresh((val) => val + 1)
        setVisibleDiv(1);
        setSelectedTime('');
        setSelectedDate(null);
        setSuccess(response.data?.appointment_date_time)
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error submitting form:', error);
    }
  };

  const [isAuthenticated, setAuthenticated] = useState(false);
  const { authData, saveAuthData } = useAuth();

  const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();
    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  useEffect(() => {
    if (isAuthenticated && isOpen1) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await postCaller(
            'get_lead_info',
            {
              leads_id: leadId,
            },
            true
          );

          if (response.status === 200) {
            setLeadData(response.data);
            if (reschedule === true) {
              setVisibleDiv(0);
            } else if (action == true) {
              setVisibleDiv(67);
            } else {
              setVisibleDiv(response.data?.status_id);
            }
          } else if (response.status >= 201) {
            toast.warn(response.data.message);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, leadId, isOpen1, refresh]);

  useEffect(() => {
    const handleEscapeKey = (event: any) => {
      if (event.key === 'Escape') {
        onClose1();
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);



  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'reason') {
      const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ');
      if (sanitizedValue.trim() !== '') {
        setReason(sanitizedValue);
        setReasonError(''); // Clear any previous error message
      } else {
        setReason('');
        setReasonError('Reason cannot be empty'); // Set an error message
      }
    }
  };

  const handleCloseLost = async () => {
    if (reason.trim() === '') {
      setReasonError('Reason cannot be empty');
      return;
    }

    setLoad(true);
    try {
      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          status_id: 6,
          reason: reason,
        },
        true
      );

      if (response.status === 200) {
        toast.success('Status Updated Successfully');
        HandleModal();
        setReason('');
        setRefresh((val) => val + 1)
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error submitting form:', error);
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const date = new Date(dateString);
    return date.toLocaleString('en-US', options);
  };

  const calculateRemainingDays = (appointmentDate: string): string => {
    const currentDate = new Date();
    const appointmentDateTime = new Date(appointmentDate);
    const timeDiff = appointmentDateTime.getTime() - currentDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 1) {
      return '1 Day Left';
    } else if (daysDiff > 1) {
      return `${daysDiff} Days Left`;
    } else {
      return 'Appointment Date Passed';
    }
  };


  const [loadWon, setLoadWon] = useState(false);
  const handleCloseWon = async () => {
    setLoadWon(true);
    try {
      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          status_id: 5,
        },
        true
      );
      if (response.status === 200) {
        toast.success('Status Updated Successfully');
        setRefresh((prev) => prev + 1);
        setLoadWon(false);
        HandleModal();
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoadWon(false);
    } catch (error) {
      setLoadWon(false);
      console.error('Error submitting form:', error);
    }
  };
  const [loadCom, setLoadCom] = useState(false);
  const handleCloseComplete = async () => {
    setLoadCom(true);
    try {
      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          status_id: 5,
          is_manual_win: true
        },
        true
      );
      if (response.status === 200) {
        toast.success('Status Updated Successfully');
        setRefresh((prev) => prev + 1);
        setLoadCom(false);
        HandleModal();
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoadCom(false);
      console.error('Error submitting form:', error);
    }
  };


  const [qcComp, setQcComp] = useState(false);
  const handleQCComplete = async () => {
    setQcComp(true);
    try {
      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          qc: true
        },
        true
      );
      if (response.status === 200) {
        toast.success('Status Updated Successfully');
        setRefresh((prev) => prev + 1);
        setQcComp(false);
        HandleModal();
      } else if (response.status >= 201) {
        toast.warn(response.message);
        setQcComp(false);
      }
      setLoad(false);
    } catch (error) {
      setQcComp(false);
      console.error('Error submitting form:', error);
    }
  };

  const MarkedConfirm = () => {
    setVisibleDiv(14);
  };


  useEffect(() => {
    if (reschedule === true) {
      setVisibleDiv(0);
    } else if (action === true) {
      setVisibleDiv(67);
    } else if (won === true) {
      setVisibleDiv(5);
    } else if (finish === true) {
      MarkedConfirm();
    } else if (qc === true) {
      setVisibleDiv(88);
    } else if (leadData) {
      setVisibleDiv(leadData.status_id);
    }
  }, [reschedule, action, leadData]);

  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      };
      const formattedDateTime = new Date().toLocaleString('en-US', options);
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();

    const timer = setInterval(updateDateTime, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clean up the timer on component unmount
    };
  }, []);


  return (
    <div>
      {isOpen1 && (
        <div className="transparent-model">
          <div className={classes.customer_wrapper_list} style={{ backgroundColor: visibleDiv === 5 ? "#EDFFF0" : "#fff" }}>
            <div className={classes.DetailsMcontainer}>
              <div className={classes.parentSpanBtn} onClick={HandleModal}>
                <img
                  className={classes.crossBtn}
                  src={ICONS.cross}
                  onClick={HandleModal}
                />
              </div>
              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <MicroLoader />
                </div>
              ) : leadData ? (
                <div className={classes.pers_det_top}>
                  <div className={classes.Column1Details}>
                    <div className={classes.main_name}>
                      {`${leadData?.first_name} ${leadData?.last_name}`.length > 25
                        ? `${`${leadData?.first_name} ${leadData?.last_name}`.slice(0, 25)}...`
                        : `${leadData?.first_name} ${leadData?.last_name}`}{' '}
                      <img
                        onClick={HandleModal}
                        className={classes.crossIconImg}
                        src={CrossIcon}
                      />
                    </div>
                    <span className={classes.mobileNumber}>
                      {leadData?.phone_number}
                    </span>
                  </div>
                  <div className={classes.Column2Details}>
                    <span className={classes.addresshead}>
                      {leadData?.street_address
                        ? leadData.street_address.length > 20
                          ? `${leadData.street_address.slice(0, 30)}...`
                          : leadData.street_address
                        : 'N/A'}
                    </span>
                    <span className={isMobile ? classes.emailStyleForMObile : classes.emailStyle}>
                      {isMobile && leadData?.email_id.length > 39
                        ? `${leadData.email_id.slice(0, 27)}...`
                        : leadData.email_id}
                    </span>

                    {(visibleDiv === 0 || visibleDiv === 11) && (
                      <div
                        className={classes.edit_modal_open}
                        onClick={handleOpenModal}
                      >
                        <span className={classes.edit_modal_button}>
                          <img
                            className={classes.editPenStyle}
                            src={Pen}
                            alt="Edit Pen"
                          />{' '}
                          Edit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  "No Data Found"
                </div>
              )}
            </div>
            <EditModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              leadData={leadData}
              refresh={refresh}
              setRefresh={setRefresh}
            />

            {visibleDiv === -1 && (
              <>
                {' '}
                  <div className={classes.loadModalDefault}>
                    <MicroLoader />
                  </div>
              </>
            )}

            {visibleDiv === 0 && (
              <AppointmentScheduler
                setVisibleDiv={setVisibleDiv}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
              />
            )}
            {visibleDiv === 11 && (
              <>
                {' '}
                <div>
                  <div className={classes.success_not}>
                    <div>
                      <img
                        height="111px"
                        width="111px"
                        src={ConfirmationICON}
                      />{' '}
                    </div>
                    <h2>Please confirm customer details </h2>
                    <p>
                      Ensure the email address and phone number are correct
                      before sending the appointment
                    </p>
                  </div>
                  <div className={classes.survey_button}>
                    <button
                      className={classes.self}
                      style={{
                        color: '#fff',
                        border: 'none',
                        cursor: load ? 'not-allowed' : 'pointer',
                      }}
                      onClick={handleSendAppointment}
                      disabled={load}
                    >
                      {load ? 'Sending...' : 'CONFIRM, SENT APPOINTMENT'}
                    </button>
                    <button
                      id="otherButtonId"
                      className={classes.other}
                      onClick={handleOpenModal}
                    >
                      Edit customer details
                    </button>
                  </div>
                </div>
              </>
            )}
            {visibleDiv === 1 && (
              <>
                <div className={classes.success_not}>
                  <div>
                    <img
                      className={classes.thumbsImg}
                      // onClick={() => setVisibleDiv(3)}
                      height="111px"
                      width="111px"
                      src={ThumbsSucess}
                    />{' '}
                  </div>
                  <span className={classes.ApptSentConfirm}>
                    Appointment sent successfully{' '}
                  </span>
                  <span className={classes.ApptSentDate}>
                    {success ? (
                      <>
                        {format(parseISO(success), 'dd MMM, yyyy')}
                        {' '}
                        {format(parseISO(success), 'hh:mm a')}
                      </>
                    ) : (
                      ''
                    )}
                  </span>
                </div>
                <div className={classes.survey_button}>
                  {leadData?.appointment_scheduled_date ? (
                    <span className={classes.AppSentDate2}>
                      Appointment sent on {format(new Date(leadData?.appointment_scheduled_date), 'dd MMM, yyyy')}
                    </span>
                  ) : (
                    <span className={classes.AppSentDate2}>
                      Appointment sent on {format(new Date(), 'dd MMM, yyyy')}
                    </span>
                  )}
                  <span className={classes.AppSentDate2}>
                    Waiting for confirmation
                  </span>
                </div>
              </>
            )}
            {visibleDiv === 2 && (
              <>
                <div className={classes.success_not}>
                  <div>
                    <img
                      className={classes.thumbsImg}
                      // onClick={() => setVisibleDiv(4)}
                      height="140px"
                      width="140px"
                      src={SignatureICON}
                    />{' '}
                  </div>
                  <span className={classes.ApptSentSuccess}>
                    Appointment Accepted{' '}
                  </span>
                  <span className={classes.ApptSentDate}>
                    {leadData?.appointment_accepted_date
                      ? formatDate(leadData?.appointment_accepted_date)
                      : ''}
                  </span>
                  <span className={classes.remaningDate}>
                    {leadData?.appointment_accepted_date
                      ? calculateRemainingDays(
                        leadData.appointment_accepted_date
                      )
                      : ''}
                  </span>
                </div>

                <div className={classes.AfterAppointment}>
                  <span className={classes.getConfirmation}>
                    You will receive a reminder{' '}
                    <span className={classes.hoursBefore}>24 hrs</span> before
                  </span>
                  <span className={classes.getDate}>
                    scheduled appointment date.
                  </span>
                </div>
              </>
            )}

            {visibleDiv === 67 && (
              <>
                <div className={classes.customer_wrapper_list_Edited2}>
                  <div className={classes.success_not_Edited4Model}>
                    <div>
                      <img
                        className={classes.Questmarks}
                        height="160px"
                        width="160px"
                        src={failledLogo}
                      />{' '}
                    </div>
                    <span className={classes.ohNo}>Oh No!</span>
                    <span className={classes.deniedCust}>Customer denied</span>
                  </div>
                  <div className={classes.whydeniedDiv}>
                    <span className={classes.whydenied}>
                      Why did customer denied?
                    </span>
                  </div>
                  {/* className={classes.dropdownContainerModal} */}
                  <div className={classes.dropdownContainerModal}>
                    <input
                      type="text"
                      value={reason}
                      placeholder="Please Enter Reason"
                      onChange={handleInputChange}
                      name="reason"
                      maxLength={100}
                      autoComplete="off"
                    />
                    {reasonError && <p className="error">{reasonError}</p>}
                  </div>

                  <div className={classes.survey_button}>
                    <button
                      className={classes.self}
                      style={{
                        backgroundColor: '#377CF6',
                        color: '#FFFFFF',
                        border: 'none',
                        pointerEvents: load ? 'none' : 'auto',
                        opacity: load ? 0.6 : 1,
                        cursor: load ? 'not-allowed' : 'pointer',
                      }}
                      onClick={handleCloseLost}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </>
            )}

            {visibleDiv === 5 && (
              <>
                <div className={classes.customer_wrapper_list_Edited}>
                  <div className={classes.success_not_Edited4Model}>
                    <div>
                      <img
                        className={classes.HandShakeLogo}
                        height="154px"
                        width="154px"
                        src={DoneLogo}
                      />{' '}
                    </div>
                  </div>
                  <div className={classes.congratulationLetter}>
                    <span className={classes.congratulations}>
                      Congratulations!
                    </span>
                  </div>
                  <br />
                  <div className={classes.ctmracquiredDiv}>
                    <span className={classes.ctmracquired}>
                      Lead marked as Deal Won!
                    </span>
                    <span className={classes.ctmracquired} style={{ fontWeight: "500" }}>
                      {currentDateTime}
                    </span>
                  </div>
                  <div className={classes.suceesButtonAfterProposal}>
                    <button
                      className={classes.self}
                      style={{
                        backgroundColor: `${loadingProposal ? '#FFFFFF' : '#3AC759'}`,
                        color: '#FFFFFF',
                        border: 'none',
                        pointerEvents: (loadWon || !leadId) ? 'none' : 'auto',
                        opacity: (loadWon || !leadId) ? 0.6 : 1,
                        cursor: (loadWon || !leadId) ? 'not-allowed' : 'pointer',
                      }}
                      onClick={handleCloseWon}
                    >
                      {loadWon ? "Wait..." : "Confirm"}
                    </button>

                    <span style={{ color: "#393D42" }} className={classes.customTextStyle}>
                      You have 48hrs to complete this lead as Won.
                    </span>
                  </div>

                </div>
                <span className={classes.ctmracquiredBotton}>
                  {currentFilter && currentFilter === "In Progress" ? "" : (
                    <span className={classes.customTextStyle}>
                      Moving to In Progress <span className={classes.forwardTick}>&gt;&gt;</span>
                    </span>
                  )}
                </span>

              </>
            )}
            {/* HERE QC AUDIT MODAL STARTED */}
            {visibleDiv === 88 && (
              <>
                <div className={classes.customer_wrapper_list_EditeQC}>
                  <div className={classes.success_not_Edited4Model}>
                    <div>
                      <img
                        className={classes.HandShakeLogo}
                        height="145px"
                        width="145px"
                        src={ICONS.QCAudit}
                      />{' '}
                    </div>
                  </div>
                  <div className={classes.congratulationLetter}>
                    <span className={classes.congratulationsQC}>
                      QC Audit Complete
                    </span>
                  </div>
                  <br />
                  <div className={classes.ctmracquiredDiv}>
                    <span className={classes.ctmracquiredQC}>
                      {format(new Date(), 'dd MMM, yyyy')}
                    </span>
                    <span className={classes.ctmracquired} style={{
                      fontWeight: "500",
                      maxWidth: "42em",
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      textAlign: 'center'
                    }}>
                      Lead moved to recorded as Deal Won
                      with a contract date.
                    </span>
                  </div>
                  <div className={classes.suceesButtonAfterProposal}>
                    <button
                      className={classes.self}
                      style={{
                        backgroundColor: `${loadingProposal ? '#377C49' : '#377CF6'}`,
                        color: 'white',
                        border: 'none',
                        pointerEvents: (qcComp || !leadId) ? 'none' : 'auto',
                        opacity: (qcComp || !leadId) ? 0.6 : 1,
                        cursor: (qcComp || !leadId) ? 'not-allowed' : 'pointer',
                      }}
                      onClick={handleQCComplete}
                    >
                      {qcComp ? "Wait..." : "Confirm"}
                    </button>


                  </div>

                </div>


              </>
            )}
            {/* HERE QC AUDIT MODAL ENDED */}

            {visibleDiv === 14 && (
              <>
                <div className={classes.customer_wrapper_list_EditedCConfirmation}>
                  <div className={classes.success_not_Edited4Model}>
                    <div>
                      <img
                        className={classes.HandShakeLogo}
                        height="154px"
                        width="154px"
                        src={ICONS.SignModelConfirmation}
                      />{' '}
                    </div>
                  </div>
                  <div className={classes.confirmationLetter}>
                    <span className={classes.ConfirmationLastModel}>
                      Confirm Deal Complete as Won
                    </span>
                  </div>
                  <br />
                  <div className={classes.ctmracquiredDivLast}>
                    <span className={classes.ctmracquiredLastModel}>

                      <span>This lead will be recorded as Deal Won </span>
                      <span style={{ color: "#FA2217" }}>without a contract date.</span>
                    </span>

                  </div>
                  <div className={classes.suceesButtonAfterProposal}>
                    <button
                      className={classes.self}
                      style={{
                        backgroundColor: `${loadingProposal ? '#FFFFFF' : '#377cf6'}`,
                        color: '#FFFFFF',
                        border: 'none',
                        pointerEvents: (loadCom || !leadId) ? 'none' : 'auto',
                        opacity: (loadCom || !leadId) ? 0.6 : 1,
                        cursor: (loadCom || !leadId) ? 'not-allowed' : 'pointer',
                      }}

                      onClick={handleCloseComplete}

                    >
                      {loadCom ? "Wait..." : "Confirm"}
                    </button>
                  </div>

                </div>
              </>)

            }

            {iframeSrc && (
              <iframe
                src={iframeSrc}
                style={{ width: '100%', height: '600px', border: 'none' }}
                title="Proposal"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmaModel;
