import React, { useEffect, useRef, useState } from 'react';
import './Dropdown.css';
import { ReactComponent as CROSS_BUTTON } from '../../.././resources/assets/cross_button.svg';
import { ICONS } from '../../../resources/icons/Icons';

interface TableProps {
  handleClose: () => void;
  isOpen?: boolean;
  projectDetail: any;
}

// Filter component
const QCModal: React.FC<TableProps> = ({
  projectDetail,
  handleClose,
  isOpen = false,
}) => {
  const handleCloseModal = () => {
    handleClose();
  };

  console.log(projectDetail, 'data to show');

  const renderQCContent = (title: string, status: string) => {
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

  const formatTitle = (key: string) => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const qcData = projectDetail?.qc;

  return (
    <div className={`filter-modal ${isOpen ? 'modal-open' : 'modal-close'} `}>
      <div className="transparent-model">
        <div className="qc-modal">
          <div className="qchead-section">
            <h3 className="createQCText" style={{ margin: 0 }}>
              Qualified Customers
            </h3>

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
              {/* {qcData && (
                <>
                  {renderQCContent('PowerClerk Sent(AZ)', qcData.powerclerk_sent)}
                  {renderQCContent(
                    'ACH Waiver (Sent and Signed) (Cash Only)',
                    qcData['ACH_waiver(sent_and_signed)(cash_only)']
                  )}
                  {renderQCContent('Green Area (NM Only)', qcData['green_area(nm_only)'])}
                  {renderQCContent(
                    'Finance Credit Approval (Loan or Lease)',
                    qcData['finance_credit_approval(loan_or_lease)']
                  )}
                  {renderQCContent(
                    'Finance Agreement Completed (Loan or Lease)',
                    qcData['finance_agreement_completed(loan_or_lease)']
                  )}
                  {renderQCContent('OWE Documents Completed', qcData.OWE_documents_completed)}
                </>
              )} */}

              {qcData &&
                Object.entries(qcData)
                  .filter(
                    ([key, value]) =>
                      key !== 'qc_action_required_count' && value
                  ) // Filter out empty values
                  .map(([key, value]) => (
                    <div key={key}>
                      {renderQCContent(formatTitle(key), value as string)}
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QCModal;
