import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getDocument } from "../../../../redux/apiActions/leadManagement/LeadManagementAction";
import MicroLoader from "../../../components/loader/MicroLoader";
import { MdArrowBack } from "react-icons/md"; // Import back icon
import classes from "./signDocument.module.css";

interface LeadData {
  leads_id: number;
  status_id: number;
  first_name: string;
  last_name: string;
  email_id: string;
  phone_number: string;
  street_address: string;
  docusign_label: string;
  docusign_date: string;
  appointment_status_label: string;
  proposal_id: string;
  proposal_status: string;
  proposal_link: string;
  proposal_updated_at: string;
  proposal_pdf_link: string;
  zipcode: string;
  finance_company?: string;
}

interface DocumentStatus {
  status: 'signed' | 'viewed' | 'pending' |'accepted' | null;
  message: string;
}

const SignDocument: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [documentStatus, setDocumentStatus] = useState<DocumentStatus>({
    status: null,
    message: ''
  });

  useEffect(() => {
    const storedLeadData = localStorage.getItem('selectedLead');
    if (storedLeadData) {
      setLeadData(JSON.parse(storedLeadData));
    }

    const params = new URLSearchParams(location.search);
    const event = params.get('event');

    if (event === 'signing_complete') {
      setDocumentStatus({
        status: 'signed',
        message: 'Document has been successfully signed! 📝✅'
      });
      toast.success('Document has been successfully signed! 📝✅');
      // checkDocumentStatus();
    } else if (event === 'viewing_complete') {
      setDocumentStatus({
        status: 'viewed',
        message: 'Document has been viewed'
      });
      toast.info('Document has been viewed');
    }
  }, [location.search]);

  const checkDocumentStatus = async () => {
    if (!leadData?.leads_id) return;

    try {
      const response = await dispatch(getDocument({
        leads_id: leadData.leads_id,
        base_url: "https://demo.docusign.net"
      }) as any);

      // console.log("Document status:", response);
      setDocumentStatus({ status: response.status, message: response.message });
    } catch (error) {
      console.error("Error checking document status:", error);
      toast.error("Error checking document status");
    }
  };

  const initiateDocuSignSigning = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("leads_id", leadData?.leads_id.toString() || "");
      params.append("return_url", "http://localhost:3000/digital-signature-portal");

      const eventSourceUrl = `https://staging.owe-hub.com/api/owe-leads-service/v1/docusign_get_signing_url?${params.toString()}`;
      const eventSource = new EventSource(eventSourceUrl);

      eventSource.onmessage = (event) => {
        const payload = JSON.parse(event.data);

        if (payload.is_done) {
          setIsLoading(false);
          if (payload.error === null) {
            window.open(payload.data.url, '_blank');
          } else {
            console.error(`Error during DocuSign URL generation: ${payload.error}`);
            setDocumentStatus({
              status: 'pending',
              message: 'Error generating signing URL. Please try again.'
            });
            toast.error('Error generating signing URL. Please try again.');
          }
          eventSource.close();
        }
      };

      eventSource.onerror = (error) => {
        console.error('Error with SSE connection', error);
        setIsLoading(false);
        setDocumentStatus({
          status: 'pending',
          message: 'Connection error. Please try again.'
        });
        toast.error('Connection error. Please try again.');
        eventSource.close();
      };
    } catch (error) {
      console.error("Error initiating DocuSign signing:", error);
      setIsLoading(false);
      setDocumentStatus({
        status: 'pending',
        message: 'Error initiating signing process. Please try again.'
      });
      toast.error('Error initiating signing process. Please try again.');
    }
  };
// console.log(leadData)
  if (!leadData) {
    return <div>No lead data available.</div>;
  }

  return (
    <div className={classes.signDocumentPage}>
       {/* Back Button with Icon */}
      <button 
        onClick={() => navigate('/leadmng-dashboard')} 
        className={classes.backButton} // Add styling as needed
      >
        <MdArrowBack />
      </button>
      <h2 className={classes.title}>Digital Signature Portal</h2>

      {isLoading ? (
        <div className={classes.loaderContainer}>
          <MicroLoader />
        </div>
      ) : (
        <>
          <div className={classes.topSection}>
            {/* Personal Information - Left 50% */}
            <div className={classes.halfSection}>
              <h3 className={classes.sectionTitle}>Personal Information</h3>
              <div className={classes.infoGrid}>
                <p><strong>First Name:</strong> {leadData.first_name || 'N/A'}</p>
                <p><strong>Last Name:</strong> {leadData.last_name || 'N/A'}</p>
                <p><strong>Email:</strong> {leadData.email_id || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {leadData.phone_number || 'N/A'}</p>
                <p className={classes.StreetAddressSign}><strong>Street Address:</strong> {leadData.street_address || 'N/A'}</p>
                <p><strong>Zip Code:</strong> {leadData.zipcode || 'N/A'}</p>
              </div>
            </div>

            {/* Proposal Details - Right 50% */}
            <div className={classes.halfSection}>
              <h3 className={classes.sectionTitle}>Proposal Details</h3>
              <div className={classes.proposalGrid}>
                <p><strong>Proposal ID:</strong> {leadData.proposal_id || 'N/A'}</p>
                <p><strong>Status:</strong> {leadData.proposal_status || 'N/A'}</p>
                <p><strong>Updated At:</strong> {new Date(leadData.proposal_updated_at).toLocaleDateString() || 'N/A'}</p>
                {/* <p>
                  <strong>Proposal Link:</strong>{" "}
                  <a href={leadData.proposal_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}>
                    View Proposal
                  </a>
                </p> */}
                <p>
                  <strong>Download PDF:</strong>{" "}
                  <a href={leadData.proposal_pdf_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}>
                    Download Proposal
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* DocuSign Information - Full Width */}
          {(leadData.docusign_label || leadData.docusign_date || documentStatus.message) && (
          <div className={classes.fullSection}>
            <h3 className={classes.sectionTitle}>DocuSign Information</h3>
            <div className={classes.docuSignGrid}>
              {documentStatus.status != 'signed' ?
               leadData.docusign_label &&
                <p><strong>DocuSign Status:</strong> {leadData.docusign_label || 'N/A'}</p>
                :''
              }
            {leadData.docusign_date &&
              <p><strong>DocuSign Date:</strong> {leadData.docusign_date ? new Date(leadData.docusign_date).toLocaleString() : 'N/A'}</p>
            }
              {documentStatus.message && (
                <p>
                  <strong>Document Status:</strong> {documentStatus.message}
                </p>
              )}
            </div>
          </div>
          )}

          <div className={classes.buttonContainer}>
            <button
              onClick={initiateDocuSignSigning}
              disabled={isLoading}
              className={classes.signButton}
            >
              {documentStatus.status === 'viewed'
                ? 'View Document'
                : (documentStatus.status === 'signed' || documentStatus.status === 'accepted' || leadData.docusign_label == "Accepted")
                  ? 'Document Signed ✓ - Click to View Document'
                  : 'Start Document Signing Process'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SignDocument;
