import React, { useEffect } from 'react';
import styles from './styles/success.module.css';
import { ICONS } from '../../../resources/icons/Icons';
import { useNavigate } from 'react-router-dom';

interface TableProps {
  handleClose: () => void;
  isOpen?: boolean;
}

const SalesRepSchedulePage: React.FC<TableProps> = ({
  handleClose,
  isOpen = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/salesrep-schedule');
    handleClose();
  };
  const handleSchedule = () => {
    navigate('/schedule-sales-rep');
    handleClose();
  };

  useEffect(() => {
    const handleEscKey = (event: any) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, handleClose]);

  return (
    <div className={`filter-modal ${isOpen ? 'modal-open' : 'modal-close'} `}>
      <div className="transparent-model">
        <div className={styles.customer_wrapper_list}>
          <div className={styles.createUserCrossButton} onClick={handleClose}>
            <img src={ICONS.crossIconUser} />
          </div>
          <div className={styles.success_not}>
            <div className={styles.succicon}>
              <img src={ICONS.QCTICK} alt="img" />
            </div>
            <h2>Project Added Successfully</h2>
            <p>
              New project is successfully added in the queue, You can directly
              schedule this project from below.
            </p>
          </div>

          <div className={styles.survey_button}>
            <button className={styles.self} onClick={handleSchedule}>
              Self schedule this survey
            </button>
            <button className={styles.other} onClick={handleClick}>
              Schedule this survey for me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRepSchedulePage;
