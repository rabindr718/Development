import React, { useEffect, useRef, useState } from 'react'
import styles from './leadTable.module.css';
import { LeadColumn } from '../../../../resources/static_data/leadData/leadTable';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import ChangeStatus from './Dropdowns/ChangeStatus';
import { IoChevronForward, IoInformationOutline } from 'react-icons/io5';
import { useAppSelector } from '../../../../redux/hooks';
import MicroLoader from '../../../components/loader/MicroLoader';
import DataNotFound from '../../../components/loader/DataNotFound';
import DropDownLeadTable from './Dropdowns/CustomDrop';
import ConfirmaModel from '../../Modals/ConfirmModel';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import Profile from '../../Modals/ProfileInfo';
import { ICONS } from "../../../../resources/icons/Icons"
import { format, parseISO } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import useMatchMedia from '../../../../hooks/useMatchMedia';
import Pagination from '../../../components/pagination/Pagination';
import { createDocuSignRecipientView, createEnvelope, getDocument, getDocuSignUrl } from '../../../../redux/apiActions/leadManagement/LeadManagementAction';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../../../scheduler/SaleRepCustomerForm/component/Input/Input';
import EditProfileData from './EditProfileData';

type ProposalStatus = "In Progress" | "Send Docs" | "Created" | "Clear selection" | "Completed" | "Documents Sent";
type DocuStatus = "Completed" | "Sent" | "Voided" | "Declined";
interface VisibilityState {
  [key: string]: boolean;
}

interface LeadSelectionProps {
  selectedLeads: number[];
  setSelectedLeads: React.Dispatch<React.SetStateAction<number[]>>;
  refresh: number;
  setRefresh: (value: number | ((prevValue: number) => number)) => void;
  onCreateProposal: (leadId: number) => void;
  retrieveWebProposal: (leadId: number) => void;
  generateWebProposal: (leadId: number) => void;
  side: "left" | "right";
  setSide: React.Dispatch<React.SetStateAction<"left" | "right">>;
  currentFilter: string;
  setCurrentFilter: React.Dispatch<React.SetStateAction<string>>;
}

type SSEPayload =
  | {
    is_done: false;
    data: {
      current_step: number;
      total_steps: number;
    };
  }
  | {
    is_done: true;
    data: {
      current_step: number;
      total_steps: number;
      url: string;
    };
    error: null;
  }
  | {
    is_done: true;
    error: string;
    data: null;
  };


const LeadTable = ({ selectedLeads, currentFilter, setCurrentFilter, setSelectedLeads, refresh, setRefresh, onCreateProposal, retrieveWebProposal, generateWebProposal, side, setSide }: LeadSelectionProps) => {

  const dispatch = useDispatch();
  const [editModel, setEditTrue] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const state = queryParams.get('state');

    if (code) {
      handleCodeExchange(code); // Call the function to exchange the code for a token
    }
  }, [location]);

  const handleCodeExchange = async (code: string) => {

    const params = {
      action: "gettoken" as const,
      authorization_code: code,
      redirect_uri: "http://localhost:3000/leadmng-dashboard",
    };

    try {
      const response = await dispatch(getDocuSignUrl(params) as any);
      // console.log('Full response from getDocuSignUrl:', response);

      // Check if payload is defined in the response
      const payload = response.payload;
      if (!payload) {
        console.error('No payload found in response.');
        return;
      }

      // Check if the access token is present in payload
      const accessToken = payload.access_token; // Access token inside response.payload
      if (accessToken) {
        await fetchUserInfo(accessToken); // Call the fetchUserInfo function with the token
      } else {
        console.error('Access token not found in payload.');
      }

    } catch (error) {
      console.error("Error exchanging authorization code:", error);
    }
  };


  const fetchUserInfo = async (accessToken: string) => {

    const params = {
      action: "getuserinfo" as const,
      authorization_code: accessToken, // Include the access token in the params if required by your backend
    };

    try {
      const response = await dispatch(getDocuSignUrl(params) as any);

      // Check if the response is successful
      if (response.error) {
        console.error('Failed to retrieve user info:', response.error);
        return;
      }

      // Process the user info data
      const userInfo = response.data; // Adjust based on your response structure

      // Store user info in your state or context as needed
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };



  const [selectedType, setSelectedType] = useState('');
  const [leadIdEdit, setLeadIdEdit] = useState(0);
  const [selected, setSelected] = useState(-1)
  const isMobile = useMatchMedia('(max-width: 767px)');
  const isMobileXR = useMatchMedia('(max-width: 600px)');
  const [activeSection, setActiveSection] = useState<
    'Deal Won' | 'Deal Loss' | 'Appointment Not Required' | null
  >('Deal Won');
  const tableRef = useRef<HTMLTableElement>(null);
  const loaderRef = useRef<HTMLTableRowElement>(null);

  const [leadId, setLeadId] = useState(0);
  const [leadProposalLink, setLeadPropsalLink] = useState('');
  const [proposalPdfLink, setProposalPdfLink] = useState('');
  const [downloadingLeadId, setDownloadingLeadId] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number>(0); // Track download percentage
  const scrollWrapper = useRef<HTMLDivElement>(null);

  const { isLoading, leadsData, totalcount } = useAppSelector(
    (state) => state.leadManagmentSlice
  );

  const handleLeadSelection = (leadId: number) => {
    setSelectedLeads((prev) =>
      prev.includes(leadId)
        ? prev.filter((id) => id !== leadId)
        : [...prev, leadId]
    );
  };
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [action, setAction] = useState(false);
  const [finish, setFinish] = useState(false);
  const [qc, setQc] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const downloadProposalWithSSE = (leadId: number) => {
    setDownloadingLeadId(leadId); // Set downloading state for this row
    setDownloadProgress(0); // Reset the progress initially

    const eventSource = new EventSource(
      `https://staging.owe-hub.com/api/owe-leads-service/v1/aurora_generate_pdf?leads_id=${leadId}`
    );

    eventSource.onmessage = (event) => {
      const payload: SSEPayload = JSON.parse(event.data);

      if (!payload.is_done) {
        const progressPercentage = (payload.data.current_step / payload.data.total_steps) * 100;
        setDownloadProgress(progressPercentage); // Update the progress state
        // console.log(`PDF generation in progress: Step ${payload.data.current_step} of ${payload.data.total_steps}`);
      } else if (payload.is_done) {
        setDownloadingLeadId(null); // Reset downloading state once done
        setDownloadProgress(0); // Reset progress

        if (payload.error === null) {
          // PDF generation successful, trigger download
          const pdfUrl = payload.data.url;
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = 'Proposal.pdf';
          link.target = '_blank';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          // Handle generation error
          console.error(`Error during PDF generation: ${payload.error}`);
        }

        eventSource.close(); // Close the connection once the PDF is ready or an error occurs
      }
    };

    eventSource.onerror = (error) => {
      console.error('Error with SSE connection', error);
      setDownloadingLeadId(null); // Reset downloading state on error
      setDownloadProgress(0); // Reset progress on error
      eventSource.close();
    };
  };
  const [won, setWon] = useState(false);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false);

  useEffect(() => {
    if (isLoading || isLoadingDocument) {
      // Scroll to the MicroLoader row if loading
      loaderRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [isLoading, isLoadingDocument]);

  interface DocuSignResponse {
    url?: string; // Make it optional if it might not be present
    // Add other properties if needed
  }

  useEffect(() => {
    if (selectedType === 'app_sched') {
      handleOpenModal();
      setAction(false);
      setWon(false);
      setFinish(false);
      setQc(false);
      setReschedule(true);
      setSelectedType('');
    } else if (selectedType === 'Deal Loss') {
      handleOpenModal();
      setReschedule(false);
      setFinish(false);
      setQc(false);
      setWon(false);
      setAction(true);
      setSelectedType('');
    } else if (selectedType === 'Deal Won') {
      // handleCloseWon();
      handleOpenModal();
      setAction(false);
      setQc(false);
      setReschedule(false);
      setFinish(false);
      setWon(true);
      setSelectedType('');
    } else if (selectedType === 'Complete as Won') {
      // handleCloseWon();
      handleOpenModal();
      setAction(false);
      setQc(false);
      setReschedule(false);
      setWon(false);
      setFinish(true);
      setSelectedType('');
    } else if (selectedType === 'Mark QC Complete') {
      // handleCloseWon();
      handleOpenModal();
      setAction(false);
      setReschedule(false);
      setWon(false);
      setFinish(false);
      setQc(true);
      setSelectedType('');
    } else if (selectedType === 'new_proposal') {
      onCreateProposal(leadId)
      setSelectedType('');
    } else if (selectedType === 'viewProposal') {
      retrieveWebProposal(leadId)
      setSelectedType('');
      // if (proposalPdfLink) {
      //   window.open(proposalPdfLink, '_blank'); 
      // }
    } else if (selectedType === 'editProposal') {
      if (leadProposalLink) {
        window.open(leadProposalLink, '_blank');
      }
      setSelectedType('');
    } else if (selectedType === 'renew_proposal') {
      generateWebProposal(leadId)
      setSelectedType('');
    } else if (selectedType === 'download') {
      downloadProposalWithSSE(leadId);
      setSelectedType('');
    } else if (selectedType === 'signature') {
      OpenSignDocument();
      setSelectedType('');
    }
    else if (selectedType === 'Appointment Not Required') {
      handleAppNotReq();
      setSelectedType('');
    }
  }, [selectedType])

  // Dynamically get the base URL using window.location.origin
  const BASE_URL = window.location.origin;

  const OpenSignDocument = async () => {
    setIsLoadingDocument(true);
    try {
      const params = new URLSearchParams();
      params.append("leads_id", leadId.toString() || "");
      params.append("return_url", `${BASE_URL}/leadmng-dashboard`);

      const eventSourceUrl = `${process.env.REACT_APP_LEADS_URL}/docusign_get_signing_url?${params.toString()}`;
      const eventSource = new EventSource(eventSourceUrl);

      eventSource.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.is_done) {
          setIsLoadingDocument(false);
          if (payload.error === null) {
            if (payload.data?.url) {
              // window.open(payload.data.url, '_blank');
            } else {
              toast.success('The document has been successfully sent for signing.');
              setRefresh((prev) => prev + 1);
            }
          } else {
            const errorMessage = payload.error || 'An unexpected error occurred while completing the signing process.';
            console.error(`Error during DocuSign process: ${errorMessage}`);
            toast.error(`Error: ${errorMessage}`);
          }
          eventSource.close();
        }
      };

      eventSource.onerror = (error) => {
        console.error('Error with SSE connection', error);
        setIsLoadingDocument(false);
        toast.error('Connection error. Please try again.');
        eventSource.close();
      };
    } catch (error) {
      console.error("Error initiating DocuSign signing:", error);
      setIsLoadingDocument(false);

      toast.error('Error initiating signing process. Please try again.');
    }
  };

  const [isEditProfileOpen, setEditIsProfileOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const handleCloseWon = async () => {
    setLoad(true);
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
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error submitting form:', error);
    }
  };

  const handleAppNotReq = async () => {
    setLoad(true);
    try {
      const response = await postCaller(
        'update_lead_status',
        {
          leads_id: leadId,
          is_appointment_required: false
        },
        true
      );
      if (response.status === 200) {
        toast.success('Status Updated Successfully');
        setRefresh((prev) => prev + 1);
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error submitting form:', error);
    }
  };
  
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const viewId = queryParams.get("view");

    if (viewId) {
      handleOpenProfileModal(Number(viewId));
    }
  }, [location.search]);

  const handleOpenProfileModal = (leadsId: number) => {
    setIsProfileOpen(true);
    setLeadId(leadsId);
  };

  const handleCloseProfileModal = () => {
    setIsProfileOpen(false);
  };
  const EditModelHandler = (leadsId: number) => {
    setEditIsProfileOpen(true)
    // leadIdEdit(leadsId)
  };
  const handleCloseProfileEditModal = () => {
    setEditIsProfileOpen(false)
  };



  const handleReschedule = () => {
    setSelectedType("app_sched");
  }



  const handleMoreClick = () => {
    const elm = scrollWrapper.current
    if (!elm) return;
    if (side == 'left') {
      elm.scroll({ left: elm.scrollWidth, behavior: "smooth" })
      setSide('right');
    } else if (side == 'right') {
      elm.scroll({ left: 0, behavior: "smooth" })
      setSide('left');
    }
  };

  const statusStyles = {
    "In Progress": {
      backgroundColor: "#B459FC",
      color: "#fff"
    },
    "Completed": {
      backgroundColor: "#21BC27",
      color: "#fff"
    },
    "Send Docs": {
      backgroundColor: "#21BC27",
      color: "#fff"
    },
    "Documents Sent": {
      backgroundColor: "#21BC27",
      color: "#fff"
    },
    "Created": {
      backgroundColor: "#EC9311",
      color: "#fff"
    },
    "Clear selection": {
      backgroundColor: "#808080",
      color: "#fff"
    }
  };


  const docusignStyles = {
    "Completed": {
      backgroundColor: "#21BC27",
      color: "#fff"
    },
    "Sent": {
      backgroundColor: "#EC9311",
      color: "#fff"
    },
    "Voided": {
      backgroundColor: "#4999E3",
      color: "#fff"
    },
    "Declined": {
      backgroundColor: "#D91515",
      color: "#fff"
    }
  };

  //GET LEADS AS FUNCTIONS AS USE AS ASSIGNE
  const getLeadOptions = (lead: any) => {
    if (
      (lead?.appointment_status_label === "Appointment Sent" && lead.proposal_id === '') ||
      (lead.appointment_status_label === 'Appointment Date Passed' && lead.proposal_id === '')
    ) {
      return [
        { label: 'Reschedule Appointment', value: 'app_sched' },
        { label: 'Create Proposal', value: 'new_proposal' },
      ];
    }

    if (lead && (lead.proposal_status === 'Completed' || lead.proposal_status === 'Send Docs' || lead.proposal_status === 'Documents Sent') && lead.proposal_id !== '') {
      return [
        { label: 'View Proposal', value: 'viewProposal' },
        ...(lead.docusign_label !== 'Completed' ? [{ label: 'Edit Proposal', value: 'editProposal' }] : []),
        { label: 'Download Proposal', value: 'download' },
        ...(lead.proposal_id && (lead.docusign_label !== 'Completed' || lead.docusign_label === 'Sent' || lead.docusign_label === '') ? [{ label: lead.docusign_label === 'Sent' ? "Resend for Sign Document" : 'Sign Document', value: 'signature' }] : []),
        { label: 'Reschedule Appointment', value: 'app_sched' },
        { label: 'Refresh Url', value: 'renew_proposal' },
      ];
    }

    if (lead && lead.proposal_id !== '' && lead.proposal_status !== 'Completed') {
      return [
        { label: 'View Proposal', value: 'viewProposal' },
        { label: 'Edit Proposal', value: 'editProposal' },
        { label: 'Refresh Url', value: 'renew_proposal' },
      ];
    }

    return [
      { label: 'Create Proposal', value: 'new_proposal' },
      { label: 'Schedule Appointment', value: 'app_sched' },
    ];
  };
  
  return (
    <>
      <ConfirmaModel
        isOpen1={isModalOpen}
        onClose1={handleCloseModal}
        leadId={leadId}
        refresh={refresh}
        setRefresh={setRefresh}
        reschedule={reschedule}
        action={action}
        setReschedule={setReschedule}
        won={won}
        setWon={setWon}
        finish={finish}
        setFinish={setFinish}
        qc={qc}
        setQc={setQc}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <Profile
        isOpen1={isProfileOpen}
        onClose1={handleCloseProfileModal}
        leadId={leadId}
      />
      {/* {editModel && <EditProfileData editModel={editModel/>} */}
      <EditProfileData
      isOpen1={isEditProfileOpen}
      onClose1={handleCloseProfileEditModal} 
      leadId={leadId}
      />


      <div className={styles.dashTabTop}>

        <div className={styles.TableContainer1} ref={scrollWrapper} >
          <div
            // style={{ overflowX: 'auto', whiteSpace: 'nowrap', minHeight: "400px" }}
            // ref={tableContainerRef}
            style={{ width: '100%', whiteSpace: 'nowrap', minHeight: "400px", scrollBehavior: 'smooth' }}
            className={styles.scrolly}
          >
            {isLoading ? (
              <td style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: "150px" }} colSpan={10}>
                <MicroLoader />
              </td>

            ) : leadsData.length > 0 ? (
              <table>
                <thead
                >
                  <tr>
                    {LeadColumn.map((item) => (
                      <th key={item.id}>
                        <div className="flex-check">
                          <div className="table-header">
                            <p>{item.displayName}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                    {selectedLeads.length === 0 &&
                      <th
                        onClick={handleMoreClick}
                        style={{
                          fontWeight: '500',
                          color: 'black',
                          background: isMobile ? 'linear-gradient(to right, #CADCFA 40%, #d5e4ff 100%)' : 'linear-gradient(to right, #CADCFA 40%, #d5e4ff 40%)',

                          cursor: 'pointer',
                          minWidth: isMobile ? '65px' : "200px",
                          zIndex: "102",

                        }}
                        className={styles.FixedColumn}

                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          width: "100%"
                        }}>
                          <div className={styles.slidebutton}>
                            {side === 'left' ? (
                              <>
                                More
                                <FaAngleRight />
                              </>
                            ) : side === 'right' ? (
                              <>
                                <FaAngleLeft />
                                More
                              </>
                            ) : null}
                          </div>
                        </div>
                      </th>
                    }
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isLoadingDocument ? (
                    <tr>
                      <td colSpan={30}>
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <MicroLoader />
                        </div>
                      </td>
                    </tr>
                  ) : leadsData.length > 0 ? (
                    leadsData.map((lead: any, index: number) => (
                      <tr>

                        <td style={{ fontWeight: '500', color: 'black', display: 'flex', flexDirection: 'row', gap: '10px', alignItems: "center", margin: '7px' }}>
                          <label style={{ marginBottom: "19px" }}>
                            <input
                              type="checkbox"
                              checked={selectedLeads.includes(lead['leads_id'])}
                              onChange={() =>
                                handleLeadSelection(lead['leads_id'])
                              }
                            />
                          </label>
                          <div>
                            <div
                              style={{
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word',
                                width: '155px',
                                lineHeight: "16px"
                              }}
                              className={styles.name}>{lead.first_name} {lead.last_name}</div>

                            <div className={styles.ids}>OWE{lead.leads_id}</div>
                            <div className={styles.qcbuttoncont}>
                              <p>QC :</p>
                              <div className={styles.qcstaus}>
                                {lead.docusign_label !== "Completed" ?
                                  <img src={ICONS.Pendingqc} alt="img" />
                                  :
                                  <div className={styles.qcactstatus}><img src={ICONS.QcLineLead} alt="" /></div>
                                }
                              </div>
                            </div>
                          </div>



                        </td>
                        <td >
                          <div className={styles.info}>{lead.email_id}</div>
                          <div className={styles.info}>{lead.phone_number}</div>
                        </td>
                        <td>
                          <div className={styles.info}>{lead?.street_address
                            ? lead.street_address.length >= 100
                              ? `${lead.street_address.slice(0, 100)}...`
                              : lead.street_address
                            : 'N/A'}</div>
                        </td>
                        <td>
                          <div className={styles.topdived}>
                            <p>{lead.sales_rep_name || '__________'}</p>
                          </div>
                        </td>
                        <td>
                          {lead.lead_source ? (
                            <>
                              <div
                                className={styles.topdived}
                              >

                                <p>{lead.lead_source}</p>
                              </div>

                            </>
                          ) : (
                            <div>______</div>
                          )}
                        </td>




                        <td>
                          <div className={styles.topofinfo}>
                            {lead.appointment_status_label ? (
                              <>
                                <div
                                  style={{
                                    backgroundColor: lead.appointment_status_label === 'Not Required'
                                      ? '#B459FC'
                                      : lead.appointment_status_label === 'Appointment Accepted'
                                        ? '#21BC27'
                                        : lead.appointment_status_label === 'No Response'
                                          ? '#777777'
                                          : lead.appointment_status_label === 'Appointment Sent'
                                            ? '#EC9311'
                                            : lead.appointment_status_label === 'Appointment Declined'
                                              ? '#D91515'
                                              : lead.appointment_status_label === 'Appointment Date Passed'
                                                ? '#3B70A1'
                                                : 'inherit',
                                  }}
                                  className={styles.appointment_status}
                                >
                                  {lead.appointment_status_label}
                                </div>
                                <div style={{ marginTop: "4px" }} className={styles.date}>
                                  {lead.appointment_status_date ? format((parseISO(lead.appointment_status_date)), 'dd-MM-yyyy') : ""}
                                </div>
                                {(((lead.appointment_status_label === 'No Response' || lead.appointment_status_label === 'Appointment Date Passed') && lead.proposal_status !== '') || ((lead.appointment_status_label === 'No Response' || lead.appointment_status_label === 'Appointment Date Passed') && lead.won_lost_label !== '')) &&
                                  <div style={{ color: "#D91515" }} className={styles.date}>
                                    Update Status!
                                  </div>}
                              </>
                            ) : (
                              <div>____</div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className={styles.topofinfo}>
                            {lead.won_lost_label ? (
                              <>
                                <div
                                  style={{ backgroundColor: '#21BC27' }}
                                  className={styles.appointment_status}
                                >
                                  {lead.won_lost_label}
                                </div>
                                {lead.won_lost_date && (
                                  <div className={styles.date}>
                                    {lead.won_lost_date ? format((parseISO(lead.won_lost_date)), 'dd-MM-yyyy') : ""}

                                  </div>
                                )}
                                {(lead.can_manually_win) &&
                                  <div style={{ color: "#D91515" }} className={styles.date}>
                                    48hrs passed
                                  </div>}
                              </>
                            ) : (
                              <div>______</div>
                            )}
                          </div>
                        </td>


                        <td>
                          <div
                            style={lead.proposal_status in statusStyles
                              ? statusStyles[lead.proposal_status as ProposalStatus]
                              : { backgroundColor: lead.proposal_status ? "#808080" : "", color: lead.proposal_status ? "#fff" : "black" }}
                            className={styles.appointment_status}
                          >
                            {lead.proposal_status ? (
                              (lead.proposal_status)
                            ) : (
                              <span style={{ color: "black" }}>_____</span>
                            )}
                          </div>
                        </td>

                        <td>
                          <div className={styles.topofinfo}>
                            <div
                              style={lead.docusign_label in docusignStyles
                                ? docusignStyles[lead.docusign_label as DocuStatus]
                                : { backgroundColor: "inherit", color: "black" }}
                              className={styles.appointment_status}
                            >
                              {lead.docusign_label ? (
                                (lead.docusign_label)
                              ) : (
                                <span style={{ color: "black" }}>_____</span>
                              )}
                            </div>
                            <div className={styles.date}>
                              {lead.docusign_date ? format((parseISO(lead.docusign_date)), 'dd-MM-yyyy') : ""}
                            </div>
                          </div>
                          {/* style={{ marginLeft: '29px', marginTop: "4px" }} */}
                        </td>



                        {/* <td>
                      <div className={styles.topofinfo}>
                        {lead.finance_company ? lead.finance_company : "_____"}
                      </div>
                    </td>
                    <td><div className={styles.topofinfo}>{lead.finance_type ? lead.finance_type : "_____"}</div></td>
                    <td><div className={styles.topofinfo}>{lead.qc_audit ? lead.qc_audit : "_____"}</div></td> */}
                        {(selectedLeads.length === 0 && isMobile) &&
                          <td className={styles.FixedColumnMobile} style={{ backgroundColor: "#fff", zIndex: selected === index ? 101 : 0 }} >
                            <div className={styles.RowMobile}
                              onClick={() => {
                                (setLeadId(lead.leads_id));
                                setLeadPropsalLink(lead.proposal_link);
                                setProposalPdfLink(lead.proposal_pdf_link)
                              }}>
                              {(lead?.appointment_status_label === "No Response" && lead.proposal_id === "") || (lead.appointment_status_label === "Appointment Declined" && lead.proposal_id === "") ? (
                                <button className={styles.create_proposal} onClick={handleReschedule}>Reschedule</button>
                              ) :
                                ((lead.appointment_status_label === "Not Required" && lead.proposal_id === "") || (lead.proposal_id === "" && lead.appointment_status_label !== "")) ? (
                                  <button className={styles.create_proposal} onClick={() => (onCreateProposal(lead.leads_id))}>Create Proposal</button>
                                ) : (
                                  <>
                                    {downloadingLeadId === lead.leads_id ? (
                                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <MicroLoader />
                                        <span style={{ marginLeft: 8 }}>{Math.round(downloadProgress)}%</span>
                                      </div>
                                    ) : (
                                      <DropDownLeadTable
                                        selectedType={selectedType}
                                        onSelectType={(type: string) => {
                                          setSelectedType(type);
                                          setActiveSection(activeSection);
                                        }}
                                        cb={() => {
                                          setSelected(index);
                                        }}
                                        options={getLeadOptions(lead)}
                                      />
                                    )}
                                  </>
                                )}
                            </div>
                            <div className={styles.RowMobileTwo}>
                              <div className={styles.RowMobileColumns} onClick={() => (setLeadId(lead.leads_id))}>
                                <ChangeStatus
                                  selectedType={selectedType}
                                  onSelectType={(type: string) => {
                                    setSelectedType(type);
                                    setActiveSection(activeSection);
                                  }}
                                  cb={() => {
                                    setSelected(index)
                                  }}
                                  disabledOptions={
                                    (lead.appointment_status_label !== '' && lead.appointment_status_label !== 'No Response' && lead.appointment_status_label !== 'Appointment Declined')
                                      ? lead.won_lost_label !== ''
                                        ? lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Deal Won']
                                            : ['Appointment Not Required', 'Deal Won', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Deal Won', 'Complete as Won']
                                            : ['Appointment Not Required', 'Deal Won', 'Complete as Won', 'Mark QC Complete']
                                        : lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required']
                                            : ['Appointment Not Required', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Complete as Won']
                                            : ['Appointment Not Required', 'Complete as Won', 'Mark QC Complete']
                                      : lead.won_lost_label !== ''
                                        ? lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Deal Won']
                                            : ['Deal Won', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Deal Won', 'Complete as Won']
                                            : ['Deal Won', 'Complete as Won', 'Mark QC Complete']
                                        : lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? []
                                            : ['Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Complete as Won']
                                            : ['Complete as Won', 'Mark QC Complete']
                                  }
                                />

                              </div>
                              <div><div className={styles.EditOpenBtn}>
                                <img src={ICONS.ImageEditOpenwith} />
                              </div></div>
                              <div className={`${styles.RowMobileColumns} ${styles.infoIcon}`} onClick={() => handleOpenProfileModal(lead.leads_id)} data-tooltip-id="info">
                                <IoInformationOutline />
                              </div>
                              <Tooltip
                                style={{
                                  zIndex: 20,
                                  background: '#f7f7f7',
                                  color: '#000',
                                  fontSize: 12,
                                  paddingBlock: 4,

                                }}
                                delayShow={800}
                                offset={8}
                                id="info"
                                place="top"
                                content="Lead Info"
                              />
                            </div>
                          </td>
                        }
                        {(selectedLeads.length === 0 && !isMobile) &&

                          <td className={styles.FixedColumn} style={{ backgroundColor: "#fff", zIndex: selected === index ? 101 : 0 }}>
                            {/* FIRST ROW FIRST COLUMNS STARTED*/}
                            <div style={{
                              display: 'flex',
                              gap: ".5rem",
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: "100%"
                            }}>
                              <div onClick={() => {
                                (setLeadId(lead.leads_id));
                                setLeadPropsalLink(lead.proposal_link);
                                setProposalPdfLink(lead.proposal_pdf_link)
                              }}>
                                {(lead?.appointment_status_label === "No Response" && lead.proposal_id === "") || (lead.appointment_status_label === "Appointment Declined" && lead.proposal_id === "") ? (
                                  <button className={styles.create_proposal} onClick={handleReschedule}>Reschedule</button>
                                ) :
                                  ((lead.appointment_status_label === "Not Required" && lead.proposal_id === "") || (lead.appointment_status_label !== 'Appointment Date Passed' && lead.proposal_id === "" && lead.appointment_status_label !== "")) ? (
                                    <button className={styles.create_proposal} onClick={() => (onCreateProposal(lead.leads_id))}>Create Proposal</button>
                                  ) : (
                                    <>
                                      {downloadingLeadId === lead.leads_id ? (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'scale(0.7)' }}>
                                          <MicroLoader />
                                          <span style={{ marginLeft: 8 }}>{Math.round(downloadProgress)}%</span>
                                        </div>
                                      ) : (
                                        <DropDownLeadTable
                                          selectedType={selectedType}
                                          onSelectType={(type: string) => {
                                            setSelectedType(type);
                                            setActiveSection(activeSection);
                                          }}
                                          cb={() => {
                                            setSelected(index);
                                          }}
                                          options={getLeadOptions(lead)}
                                        />
                                      )}
                                    </>
                                  )}
                              </div>

                              <div onClick={() => (setLeadId(lead.leads_id))}>
                                <ChangeStatus
                                  selectedType={selectedType}
                                  onSelectType={(type: string) => {
                                    setSelectedType(type);
                                    setActiveSection(activeSection);
                                  }}
                                  cb={() => {
                                    setSelected(index)
                                  }}
                                  disabledOptions={
                                    (lead.appointment_status_label !== '' && lead.appointment_status_label !== 'No Response' && lead.appointment_status_label !== 'Appointment Declined')
                                      ? lead.won_lost_label !== ''
                                        ? lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Deal Won']
                                            : ['Appointment Not Required', 'Deal Won', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Deal Won', 'Complete as Won']
                                            : ['Appointment Not Required', 'Deal Won', 'Complete as Won', 'Mark QC Complete']
                                        : lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required']
                                            : ['Appointment Not Required', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Appointment Not Required', 'Complete as Won']
                                            : ['Appointment Not Required', 'Complete as Won', 'Mark QC Complete']
                                      : lead.won_lost_label !== ''
                                        ? lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? ['Deal Won']
                                            : ['Deal Won', 'Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Deal Won', 'Complete as Won']
                                            : ['Deal Won', 'Complete as Won', 'Mark QC Complete']
                                        : lead.can_manually_win
                                          ? lead.docusign_label === "Completed"
                                            ? []
                                            : ['Mark QC Complete']
                                          : lead.docusign_label === "Completed"
                                            ? ['Complete as Won']
                                            : ['Complete as Won', 'Mark QC Complete']
                                  }
                                />

                              </div>
                              <div>
                                <div className={styles.EditOpenBtn} onClick={()=>EditModelHandler(lead.leads_id)}>

                                  <img src={ICONS.ImageEditOpenwith} />
                                </div>
                              </div>
                              {/* SECOND ROW SECOND COLUMNS STARTED */}
                              <div className={styles.infoIcon} onClick={() => handleOpenProfileModal(lead.leads_id)} data-tooltip-id="info">
                                <IoInformationOutline />
                              </div>
                            </div>
                            {/* SECOND ROW SECOND COLUMNS ENDED */}
                            <Tooltip
                              style={{
                                zIndex: 20,
                                background: '#f7f7f7',
                                color: '#000',
                                fontSize: 12,
                                paddingBlock: 4,

                              }}
                              delayShow={800}
                              offset={8}
                              id="info"
                              place="top"
                              content="Lead Info"
                            />
                          </td>
                        }

                      </tr>
                    ))
                  ) : (
                    <tr style={{ border: 0 }}>

                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <td style={{ display: "flex", alignItems: "center", justifyContent: "center" }} colSpan={10}>
                <DataNotFound />
              </td>
            )}

          </div>

        </div>

      </div >
    </>
  )
}

export default LeadTable