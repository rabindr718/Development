import React, { useEffect, useRef, useState } from 'react';
import '../Dropdown.css';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import { ICONS } from '../../../../resources/icons/Icons';

interface TableProps {
  handleClose: () => void;
  isOpen?: boolean;
  projectDetail: any;
}

// Filter component
const QCPopUp: React.FC<TableProps> = ({
  projectDetail,
  handleClose,
  isOpen = false,
}) => {
  const handleCloseModal = () => {
    handleClose();
  };

  console.log(projectDetail, 'data showing for Pipeline');

  const renderQCContent = (title: string, status: string) => {
    const isCompleted = status === 'Completed';
    const backgroundColor = isCompleted ? '#2EAF71' : '#EBA900';
    const icon = isCompleted ? ICONS.QCTICK : ICONS.QCLine;
    const statusText = isCompleted ? 'Completed' : 'Pending';

    return (
      <div className="qc-content">
        <span>{title}</span>
        <div className="qc-stat-comp">
          <div className="qc-status" style={{ backgroundColor }}>
            <img src={icon} alt={statusText} />
          </div>
          <span className={`status ${statusText.toLowerCase()}`}>
            {statusText}
          </span>
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

  const qcData = projectDetail;

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
              {qcData && (
                <>
                  {Object.entries(qcData)
                    .filter(
                      ([key, value]) =>
                        key !== 'qc_action_required_count' && value
                    ) // Filter out empty values
                    .map(([key, value]) => (
                      <div key={key}>
                        {renderQCContent(formatTitle(key), value as string)}
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
export default QCPopUp;
