import React, { useEffect, useState, useRef, useCallback } from 'react';
import classes from '../styles/confirmmodal.module.css';
import Input from '../../components/text_input/Input';
import { validateEmail } from '../../../utiles/Validation';
import { ICONS } from '../../../resources/icons/Icons';
import { RiArrowDropDownLine } from 'react-icons/ri';
import useAuth from '../../../hooks/useAuth';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';
import MicroLoader from '../../components/loader/MicroLoader';

interface FormInput
  extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> { }

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  leadData: any;
  refresh: number;
  setRefresh: (value: number | ((prevValue: number) => number)) => void;
}

const EditModal: React.FC<EditModalProps> = ({ refresh, setRefresh, isOpen, onClose, leadData }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [emailError, setEmailError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState('');


  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    email_id: '',
    mobile_number: '',
    address: '',
  });

  useEffect(() => {
    if (leadData) {
      setFormData({
        email_id: leadData.email_id || '',
        mobile_number: leadData.phone_number || '',
        address: leadData.street_address || '',
      });
    }
    errors.email_id = '',
      errors.mobile_number = '',
      setEmailError(''),
      errors.address = ''
  }, [leadData, onClose]);

  const handleInputChange = (e: FormInput) => {
    const { name, value } = e.target;
    if (name === 'email_id') {
      const isOnlyNumbers = /^\d+$/.test(value.trim());
      const isValidEmail = validateEmail(value.trim());
      if (isOnlyNumbers) {
        setEmailError('Email cannot consist of only numbers.');
        setErrors((prevErrors) => ({
          ...prevErrors,
          email_id: 'Email cannot consist of only numbers.',
        }));
      }
      else if (!isValidEmail) {
        setEmailError('Please enter a valid email address.');
        setErrors((prevErrors) => ({
          ...prevErrors,
          email_id: 'Please enter a valid email address.',
        }));
      }
      else {
        setEmailError('');
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors.email_id;
          return newErrors;
        });
      }

      const trimmedValue = value.replace(/\s/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: trimmedValue,
      }));
    } else if (name === 'mobile_number') {
      if (value.length <= 16) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      const err = { ...errors };
      delete err[name];
      setErrors(err);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);



  const validateForm = (formData: any) => {
    const errors: { [key: string]: string } = {};
    if (formData.email_id.trim() === '') {
      errors.email_id = 'Email is required';
    }
    if (formData.mobile_number.trim() === '') {
      errors.mobile_number = 'Phone number is required';
    }
    if (formData.address.trim() === '') {
      errors.address = 'Address is required';
    }
    return errors;
  };

  // **********************************************EDITING IS PROHIBITED ********************************************************************
  const handleConfrm = async (e: any) => {
    setLoad(true);
    e.preventDefault();

    const errors = validateForm(formData);
    setErrors(errors);

    const isEmailValid = validateEmail(formData.email_id);
    const mobileNumberError = formData.mobile_number.trim() === '' || formData.mobile_number.length < 10;
    const emailError = formData.email_id.trim() === '' || !isEmailValid;
    const addressError = formData.address.trim() === ''; // Address is only checked for being empty

    if (
      Object.keys(errors).length > 0 ||
      emailError ||
      mobileNumberError ||
      addressError
    ) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        if (mobileNumberError) {
          newErrors.mobile_number = 'Please enter a valid number, at least 10 digits.';
         
        } else {
          delete newErrors.mobile_number;
        }
        if (formData.email_id.trim() === '') {
          newErrors.email_id = 'Email cannot be empty';
        
        } else if (!isEmailValid) {
          newErrors.email_id = 'Please enter a valid email address.';
        } else {
          delete newErrors.email_id;
        }
        if (formData.address.trim() === '') {
          newErrors.address = 'Address cannot be empty';
       
        } else {
          delete newErrors.address;
        }

        return newErrors;
      });

      setLoad(false);
      return;
    }

    try {
      const response = await postCaller(
        'edit_leads',
        {
          leads_id: leadData?.leads_id,
          email_id: formData.email_id,
          phone_number: formData.mobile_number,
          street_address: formData.address,
        },
        true
      );

      if (response.status === 200) {
        toast.success('Lead Updated Successfully');
        setRefresh((prev) => prev + 1);
        onClose();
      } else if (response.status >= 201) {
        toast.warn(response.message);
      }
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error('Error submitting form:', error);
    }
    setLoad(false);
  };

  // **********************************************TILL HERE BY RABINDR718 ********************************************************************

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfrm(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
 
  return (

    <>
      {(isOpen || isVisible) && (
        <div
          className={`${classes.editmodal_transparent_model} ${isOpen ? classes.open : classes.close}`}
        >

          <div className={classes.customer_wrapper_list_edit}>
            <div className={classes.Edit_DetailsMcontainer}>
              <div className={classes.edit_closeicon} onClick={onClose}>
                <RiArrowDropDownLine
                  style={{ height: '34px', width: '34px', fontWeight: '400' }}
                />
              </div>


              <div className={classes.notEditable}>
                <div className={classes.Column1DetailsEdited_Mode}>
                  <span className={classes.main_name}>
                    {`${leadData?.first_name} ${leadData?.last_name}`.length > 15
                      ? `${`${leadData?.first_name} ${leadData?.last_name}`.slice(0, 15)}...`
                      : `${leadData?.first_name} ${leadData?.last_name}`}{' '}
                  </span>
                  <span className={classes.mobileNumber}>
                    {leadData?.phone_number}
                  </span>
                </div>
                <div className={classes.Column2Details_Edited_Mode}>
                  <span className={classes.addresshead}>
                    {leadData?.street_address
                      ? leadData.street_address.length > 20
                        ? `${leadData.street_address.slice(0, 30)}...`
                        : leadData.street_address
                      : 'N/A'}
                  </span>
                  <span className={classes.emailStyle}>
                    {leadData?.email_id}{' '}
                    {/* ///VERIFIED TICK Comment REMOVED */}
                  </span>
                </div>
              </div>

              <div className={classes.inputFields}>
                <div>

{/* NUMBER VALIDATION ADDED */}
                  <Input
                    type="number"
                    value={formData.mobile_number}
                    placeholder="+91 8127577509"
                    onChange={(e) => {
                      const { value } = e.target;
                      const phoneNumber = value.toString();
                      const numberWithoutCountryCode = phoneNumber.replace(/^\+?\d{1,3}/, "");

                      if (phoneNumber.length > 15) {
                        return;
                      }

                      const leadingZeros = numberWithoutCountryCode.match(/^0+/);
                      if (leadingZeros && leadingZeros[0].length > 6) {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          mobile_number: 'Invalid number, number cannot consist of consecutive zeros.',
                        }));
                      } else if (value.length > 0 && value.length < 10) {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          mobile_number: 'Please enter at least 10 digits.',
                        }));
                      } else {
                        setErrors((prevErrors) => {
                          const newErrors = { ...prevErrors };
                          delete newErrors.mobile_number;
                          return newErrors;
                        });
                      }

                      setFormData((prevData) => ({
                        ...prevData,
                        mobile_number: value,
                      }));

                      handleInputChange(e);
                    }}
                    name="mobile_number"
                    maxLength={15}
                  />

                  {errors.mobile_number && (
                    <p className="error-message">{errors.mobile_number}</p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    value={formData.email_id}
                    placeholder={'email@mymail.com'}
                    maxLength={40}
                    onChange={(e) => {
                      const { value } = e.target;
                      handleInputChange(e);
                      if (value.trim() !== '') {
                        setErrors((prevErrors) => ({
                          ...prevErrors,
                          email_id: '',
                        }));
                      }
                    }}
                    name={'email_id'}
                  />

                  {(emailError || errors.email_id) && (
                    <div className="error-message">
                      {emailError || errors.email_id}
                    </div>
                  )}
                </div>
                <div> <Input
                  type="text"
                  value={formData.address}
                  placeholder="Address"
                  onChange={handleInputChange}
                  name="address"
                  maxLength={80}
                />
                  {errors.address && (
                    <span
                      style={{
                        display: 'block',
                      }}
                      className="error-message"
                    >
                      {errors.address}
                    </span>
                  )}</div>
              </div>

              <div
                className={classes.survey_button}
                style={{ paddingBottom: '18px' }}
              >
                <button
                  id='EnterKeys'
                  className={classes.self}
                  style={{
                    color: '#fff',
                    border: 'none',
                    fontWeight: '500',
                    fontSize: '14px',
                    pointerEvents: load ? 'none' : 'auto',
                    opacity: load ? 0.6 : 1,
                    cursor: load ? 'not-allowed' : 'pointer',
                  }}
                  onClick={handleConfrm}
                  tabIndex={0}
                >
                  {load ? 'Updating....' : 'CONFIRM'}
                </button>
              </div>
            </div>
          </div>
        </div>

      )}
    </>
  );
};

export default EditModal;
