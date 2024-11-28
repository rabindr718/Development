// ContactModal.jsx
import React, { useState } from 'react';
import styles from './contact.module.css';

const ContactModal = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [IsEmailFocused, setIsEmailFocused] = useState(false);
    const [IsNumberFocused, setIsNumberFocused] = useState(false);
    const [IsMessageFocused, setIsMessageFocused] = useState(false);


    const [formData, setFormData] = useState({
        workEmail: '',
        mobilenumber: '',
        firstName: '',
        lastName: '',
        messages: '',
        checkbox: false
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === "checkbox") {
            setIsChecked(checked);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isChecked) {
            console.log("Form submitted:", formData);
            setFormData({
                workEmail: '',
                mobilenumber: '',
                firstName: '',
                lastName: '',
                messages: '',
                checkbox: false
            });
            setIsChecked(false);
        } else {
            alert("Please agree to the terms and conditions to submit the form.");
        }
    };




    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <button onClick={handleOpen} className={styles.openButton}>
                Contact us 🎯
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <div className={styles.popupModel}>
                        <span className={styles.close} onClick={handleClose}>&times;</span>

                        <div className={styles.popUpWindow}>
                            <h2 className={styles.h2tag}>Talk to me</h2>

                            <form onSubmit={handleSubmit}>


                                <div className={styles.nameFields}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            placeholder=" "
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            onFocus={() => setIsFirstNameFocused(true)}
                                            onBlur={() => setIsFirstNameFocused(false)}
                                            required
                                        />
                                        <label htmlFor="firstName">
                                            First name{!isFirstNameFocused && "*"}
                                        </label>
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            placeholder=" "
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            onFocus={() => setIsLastNameFocused(true)}
                                            onBlur={() => setIsLastNameFocused(false)}
                                            required
                                        />
                                        <label htmlFor="lastName">
                                            Last name{!isLastNameFocused && "*"}
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.nameFields}>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="email"
                                            id="workEmail"
                                            name="workEmail"
                                            placeholder=" "
                                            value={formData.workEmail}
                                            onChange={handleChange}
                                            onFocus={() => setIsEmailFocused(true)}
                                            onBlur={() => setIsEmailFocused(false)}
                                            required
                                        />
                                        <label htmlFor="workEmail">
                                            {/* Work email{!isEmailFocused && '*'}  */}
                                            Work email{!IsEmailFocused && "*"}
                                        </label>
                                    </div>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="number"
                                            id="mobilenumber"
                                            name="mobilenumber"
                                            placeholder=" "
                                            value={formData.mobilenumber}
                                            onChange={handleChange}
                                            onFocus={() => setIsNumberFocused(true)}
                                            onBlur={() => setIsNumberFocused(false)}
                                            required
                                        />
                                        <label htmlFor="mobilenumber">
                                            {/* Work email{!isEmailFocused && '*'}  */}
                                            Mobile number{!IsNumberFocused && "*"}
                                        </label>
                                    </div>
                                </div>
                                <div className={styles.inputContainer}>
                                    <input
                                        type="text"
                                        id="messages"
                                        name="messages"
                                        placeholder=" "
                                        value={formData.messages}
                                        onChange={handleChange}
                                        onFocus={() => setIsMessageFocused(true)}
                                        onBlur={() => setIsMessageFocused(false)}
                                        required
                                    />
                                    <label htmlFor="messages">
                                        {/* Work email{!isEmailFocused && '*'}  */}
                                        Messages{!IsMessageFocused && "*"}
                                    </label>
                                </div>
                                <div className={styles.checkboxContainer}>

                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        id="cb1"
                                        checked={formData.checkbox}
                                        onChange={handleChange}
                                        className={styles.checkboxInput}
                                    />
                                    {/* <label
                                        htmlFor="cb1"
                                        className={`${styles.checkboxLabel} ${isChecked ? styles.checkedLabel : ""}`}
                                    >
                                        I agree to Flye's terms and conditions and provide consent to receive communication.
                                    </label> */}
                                    <label htmlFor="cb1" className={styles.checkboxLabel}>
                                        I agree to communication.
                                    </label>
                                </div>
                                {/* <div className={styles.contactBtn}> */}

                                <div className={styles.contactBtn}>
                                    <button type="submit" className={isChecked ? styles.contactUsbtnChecked : styles.contactUsbtn}>
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
