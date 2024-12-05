import React, { useEffect, useState } from 'react';
import classes from '../styles/LeadManagementSucess.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import useAuth from '../../../hooks/useAuth';
import MicroLoader from '../../components/loader/MicroLoader';

interface EditModalProps {
  isArcOpen: boolean;
  onArcClose: () => void;
  leadId?: number;
  activeIndex: number;
  setActiveIndex: (value: number | ((prev: number) => number)) => void;
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

const LeadManamentSucessModel: React.FC<EditModalProps> = ({
  isArcOpen,
  onArcClose,
  leadId,
  activeIndex,
  setActiveIndex,
}) => {
  const NoDeleteData = () => {
    onArcClose();
  };

  const [load, setLoad] = useState(false);

  const handleArchiveSelected = async () => {
    setLoad(true);
    try {
      const response = await postCaller(
        'toggle_archive',
        {
          ids: [leadId],
          is_archived: true,
        },
        true
      );
      if (response.status === 200) {
        toast.success('Leads Archieved successfully');
        setActiveIndex((prev) => prev + 1);
        onArcClose();
      } else {
        toast.warn(response.message);
      }
    } catch (error) {
      console.error('Error deleting leads:', error);
    }
    setLoad(false);
  };

  const [isAuthenticated, setAuthenticated] = useState(false);
  const { authData, saveAuthData } = useAuth();
  const [loading, setIsLoading] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  useEffect(() => {
    const isPasswordChangeRequired =
      authData?.isPasswordChangeRequired?.toString();
    setAuthenticated(isPasswordChangeRequired === 'false');
  }, [authData]);

  useEffect(() => {
    if (isAuthenticated && isArcOpen) {
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
  }, [isAuthenticated, leadId, isArcOpen]);

  return (
    <div>
      {isArcOpen && (
        <div className="transparent-model">
          <div className={classes.customer_wrapper_list}>
            {loading ? (
              <div
                style={{
                  marginTop: '30px',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <MicroLoader />
              </div>
            ) : leadData ? (
              <div className={classes.DetailsMcontainer}>
                <div className={classes.Column1Details}>
                  <span className={classes.main_name}>
                    {' '}
                    {leadData?.first_name} {leadData?.last_name}{' '}
                  </span>
                  <span className={classes.mobileNumber}>
                    {leadData?.phone_number}
                  </span>
                </div>
                <div className={classes.Column2Details}>
                  <span className={classes.addresshead}>
                    {leadData?.street_address
                      ? leadData.street_address.length > 20
                        ? `${leadData.street_address.slice(0, 20)}...`
                        : leadData.street_address
                      : 'N/A'}
                  </span>
                  <span className={classes.emailStyle}>
                    {leadData?.email_id}{' '}
                   
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                "No Data Found"
              </div>
            )}

            <>
              {' '}
              <div className={classes.success_not}>
                <div className={classes.succicon}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.70247 31.9919C2.01419 31.9919 1.32591 31.7301 0.802979 31.2033C-0.246826 30.1534 -0.246826 28.4515 0.802979 27.4016L27.409 0.795658C28.4594 -0.254803 30.1614 -0.254803 31.2112 0.795658C32.261 1.84546 32.261 3.54746 31.2112 4.59726L4.60458 31.2033C4.07443 31.7301 3.38681 31.9919 2.70247 31.9919Z"
                        fill="white"
                      />
                    </svg>
                    <path
                      d="M29.3005 31.9919C28.6129 31.9919 27.9246 31.7301 27.4016 31.2033L0.795658 4.59726C-0.254803 3.54746 -0.254803 1.84546 0.795658 0.795658C1.84546 -0.254803 3.54746 -0.254803 4.59726 0.795658L31.2033 27.4016C32.2537 28.4515 32.2537 30.1534 31.2033 31.2033C30.677 31.7301 29.9888 31.9919 29.3005 31.9919Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h2>Are You Sure? </h2>
                <p>Do you really want to archived this lead</p>
              </div>
              <div className={classes.survey_button}>
                <button
                  className={classes.self}
                  style={{
                    color: '#fff',
                    border: 'none',
                    pointerEvents: load ? 'none' : 'auto',
                    opacity: load ? 0.6 : 1,
                    cursor: load ? 'not-allowed' : 'pointer',
                  }}
                  onClick={handleArchiveSelected}
                >
                  {load ? 'Archiving...' : 'Yes'}
                </button>
                <button
                  id="otherButtonId"
                  className={classes.other}
                  onClick={NoDeleteData}
                >
                  No
                </button>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManamentSucessModel;
