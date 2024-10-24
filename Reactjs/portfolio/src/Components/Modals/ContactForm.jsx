// ContactModal.jsx
import React, { useState } from 'react';
import styles from './contact.module.css';

const ContactModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        workEmail: '',
        firstName: '',
        lastName: '',
        isAgreed: false
    });

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <button onClick={handleOpen} className={styles.openButton}>
                Contact us
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.popupModel}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>

                        <div className={styles.popUpWindow}>
                            <h2 className={styles.h2tag}>Talk to us</h2>

                            <form onSubmit={handleSubmit}>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="email"
                                        id="workEmail"
                                        name="workEmail"
                                        placeholder=" "
                                        value={formData.workEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="workEmail">Work email*</label>
                                </div>

                                <div className={styles.nameFields}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder=" "
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="firstName">First name*</label>
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            placeholder=" "
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="lastName">Last name*</label>
                                    </div>
                                </div>

                                <div className={styles.checkboxContainer}>
                                    <input
                                        type="checkbox"
                                        id="isAgreed"
                                        name="isAgreed"
                                        checked={formData.isAgreed}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="isAgreed">
                                        I agree to flye's terms and conditions, and provide consent to
                                        send me communication.
                                    </label>
                                </div>

                                <div className={styles.contactBtn}>
                                    <button type="submit" className={styles.contactUsbtn}>
                                        Contact us
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ContactModal;