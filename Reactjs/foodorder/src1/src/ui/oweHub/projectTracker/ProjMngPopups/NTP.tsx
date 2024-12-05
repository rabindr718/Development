import React, { useEffect, useRef, useState } from 'react';
import '../Dropdown.css';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import { ICONS } from '../../../../resources/icons/Icons';

interface TableProps {
  handleClose: () => void;
  isOpen?: boolean;
  projectDetail: any;
  ntpValue:string;
}

// Filter component
const NtpPopUp: React.FC<TableProps> = ({
  projectDetail,
  handleClose,
  isOpen = false,
  ntpValue,
}) => {
  const handleCloseModal = () => {
    handleClose();
  };

  const renderNTPContent = (title: string, status: string) => {
    let backgroundColor = '';
    let icon = '';
    let statusText = '';
    let statusClass = '';

    switch (status) {
      case 'Completed':
        backgroundColor = '#2EAF71';
        icon = ICONS.QCTICK;
        statusText = 'Completed';
        statusClass = 'completed';
        break;
      case 'Pending':
        backgroundColor = '#EBA900';
        icon = ICONS.QCLine;
        statusText = 'Pending';
        statusClass = 'pending';
        break;
      case 'Pending (Action Required)':
        backgroundColor = '#E14514';
        icon = ICONS.QCLine;
        statusText = 'Pending (Action Required)';
        statusClass = 'action';
        break;
      default:
        backgroundColor = '#EBA900';
        icon = ICONS.QCLine;
        statusText = 'Pending';
        statusClass = 'pending';
    }

    return (
      <div className="qc-content">
        <span>{title}</span>
        <div className="qc-stat-comp">
          <div className="qc-status" style={{ backgroundColor }}>
            <img src={icon} alt={statusText} />
          </div>
          <span className={`status ${statusClass}`}>{statusText}</span>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const formatTitle = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const ntpData = projectDetail;

  return (
    <div className={`filter-modal ${isOpen ? 'modal-open' : 'modal-close'} `}>
      <div className="transparent-model">
        <div className="ntp-modal">
          <div className="qchead-section">
           <div style={{display:"flex", gap:"30px", alignItems:"center"}}>
           <h3 className="createProfileText" style={{ margin: 0 }}>
              NTP
            </h3>
            <p style={{fontSize:'12px', fontWeight:'500', color:'#EBA900'}}>{ntpValue==='0 day pending' ? "" : ntpValue}</p>
           </div>
            <div
              className="createUserCrossButton"
              onClick={handleCloseModal}
              style={{ marginTop: '-6px' }}
            >
              <CROSS_BUTTON />
            </div>
          </div>
          <div className="qc-modal-body">
            <div className="createQualCust">
              {ntpData && (
                <>
                  {Object.entries(ntpData)
                    .filter(
                      ([key, value]) => key !== 'action_required_count' && value
                    ) // Filter out empty values
                    .map(([key, value]) => (
                      <div key={key}>
                        {renderNTPContent(formatTitle(key), value as string)}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NtpPopUp;
