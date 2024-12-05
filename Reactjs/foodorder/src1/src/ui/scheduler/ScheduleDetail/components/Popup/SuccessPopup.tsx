import React, { SetStateAction, useEffect } from 'react';
import styles from './styles/index.module.css';
import email from '../../../../../resources/assets/sucess_email.png';
const SuccessPopup = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    const handleEscKey = (event: any) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <div className={styles.popup_background}>
      <div className={styles.popup_card_wrapper}>
        <img width={395} src={email} className="block mx-auto" alt="" />
        <div className="mt3">
          <h2 className={`text-center ${styles.popup_title}`}>
            Email Confirmation
          </h2>
          <p style={{ maxWidth: 548 }} className="mx-auto text-center mt2">
            Appointment successfully scheduled for site survey with
            <span className="ml1" style={{ color: '#4372E9' }}>
              Alex Simon
            </span>{' '}
            . We have sent email to aronchiban2345@gmail.com to confirm their
            availability.
          </p>

          <button
            className={styles.success_btn}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            Great
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
