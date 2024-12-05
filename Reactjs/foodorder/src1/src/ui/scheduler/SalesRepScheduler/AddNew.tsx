import React, { useState } from 'react';
import Input from '../../components/text_input/Input';
import { ActionButton } from '../../components/button/ActionButton';
import styles from './styles/addnew.module.css';
import 'react-phone-input-2/lib/style.css';
import SelectOption from '../../components/selectOption/SelectOption';
import CheckboxSlider from './components/Checkbox';
import { validateEmail } from '../../../utiles/Validation';
import { ICONS } from '../../../resources/icons/Icons';
import { useNavigate } from 'react-router-dom';
import SalesRepSchedulePage from './SuccessSales';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';
import Select from 'react-select';
import useEscapeKey from '../../../hooks/useEscape';

interface FormInput
  extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

const AddNew = () => {
  const [formData, setFormData] = useState({
    description: '',
    first_name: '',
    last_name: '',
    email_id: '',
    mobile_number: '',
    address: '',
    house: '',
    size: '',
    roof_type: '',
    battery_installed: false,
    stories_in_house: 0,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const options1 = [
    { value: 'SHINGLE', label: 'SHINGLE' },
    { value: 'FLAT', label: 'FLAT' },
    { value: 'FLAT ROOF', label: 'FLAT ROOF' },
    { value: 'METAL', label: 'METAL' },
    { value: 'TILE', label: 'TILE' },
    { value: 'COMP SHINGLE', label: 'COMP SHINGLE' },
    { value: 'TRAPEZOIDAL - METAL', label: 'TRAPEZOIDAL - METAL' },
    { value: 'FLAT ROLLED', label: 'FLAT ROLLED' },
    { value: 'FLAT FOAM', label: 'FLAT FOAM' },
    { value: 'FLAT -EPDM', label: 'FLAT -EPDM' },
    { value: 'FLAT TPO', label: 'FLAT TPO' },
    { value: 'METAL ROOF', label: 'METAL ROOOF' },
    { value: 'FLAT-TILE', label: 'FLAT-TILE' },
    { value: 'S-TILE', label: 'S-TILE' },
    { value: 'LOW SLOPE', label: 'LOW SLOPE' },
    { value: 'GROUND MOUNT', label: 'GROUND MOUNT' },
    { value: 'LOW SLOPE - ROLLED', label: 'LOW SLOPE - ROLLED' },
    { value: 'CORRUGATED - METAL', label: 'CORRUGATED - METAL' },
    { value: 'W-TILE', label: 'W-TILE' },
    { value: 'DIMENSIONAL SHINGLE', label: 'DIMENSIONAL SHINGLE' },
    { value: 'FLAT TAR & GRAVEL', label: 'FLAT TAR & GRAVEL' },
    { value: 'STANDING SEAM - METAL', label: 'STANDING SEAM - METAL' },
  ];

  // const handleIncrement = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     stories_in_house: prevData.stories_in_house + 1,
  //   }));
  // };

  // const handleDecrement = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     stories_in_house:
  //       prevData.stories_in_house > 0 ? prevData.stories_in_house - 1 : 0,
  //   }));
  // };

  const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: backspace, delete, tab, escape, enter
    if (
      [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A, Command+A
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)
    ) {
      return;
    }
    // Ensure that it is a number and stop the keypress if it's not
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e: FormInput) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === 'mobile_number') {
      // Remove non-digit characters and check length
      updatedValue = value.replace(/\D/g, '');
      if (updatedValue.length < 10) {
        setPhoneNumberError('Phone Number must be at least 10 digits');
      } else {
        setPhoneNumberError('');
      }
    } else if (name === 'house') {
      // Remove any non-digit characters
      updatedValue = value.replace(/\D/g, '');
      if (updatedValue.length > 20) {
        updatedValue = updatedValue.slice(0, 20);
      }
      setErrors((prev) => ({ ...prev, house: '' }));
    } else if (name === 'size') {
      // Remove any non-digit characters
      updatedValue = value.replace(/\D/g, '');
      if (updatedValue.length > 7) {
        updatedValue = updatedValue.slice(0, 7);
      }
      setErrors((prev) => ({ ...prev, size: '' }));
    } else if (name === 'email_id') {
      const isValidEmail = validateEmail(value.trim());
      setEmailError(
        !isValidEmail && value.length > 0
          ? 'Please enter a valid email address.'
          : ''
      );
    } else if (name === 'first_name' || name === 'last_name') {
      const lettersAndSpacesPattern = /^[A-Za-z\s]*$/;
      if (value === '' || lettersAndSpacesPattern.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: `${name === 'first_name' ? 'First' : 'Last'} Name can only contain letters`,
        }));
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
  };

  const handleSelectChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      roof_type: selectedOption.value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      battery_installed: checked,
    }));
  };

  const filterClose = () => setFilterOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (phoneNumberError || emailError) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      const requestData = {
        customer_first_name: formData.first_name,
        customer_last_name: formData.last_name,
        email: formData.email_id,
        phone: formData.mobile_number,
        address: formData.address,
        roof_type: formData.roof_type,
        is_battery_installed: formData.battery_installed,
        house_stories: Number(formData.stories_in_house),
        house_area_sqft: Number(formData.house) || 0,
        system_size: formData.size,
      };

      const response = await axios.post(
        'https://staging.owe-hub.com/api/owe-schedule-service/v1/create_sales_rep_proj',
        requestData
      );

      console.log('API response:', response.data);
      toast.success('Form submitted successfully!');

      setFormData({
        description: '',
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_number: '',
        address: '',
        house: '',
        size: '',
        roof_type: '',
        battery_installed: false,
        stories_in_house: 0,
      });

      filterClose();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error submitting form:', error.response.data);
        toast.error(
          error.response.data.message ||
            'Error submitting the form. Please try again.'
        );
      } else {
        console.error('Unexpected error:', error);
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // useEscapeKey(() => navigate(-1));

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    // Validate first name
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First Name is required';
      isValid = false;
    }

    // Validate last name
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last Name is required';
      isValid = false;
    }

    // Validate email
    if (!formData.email_id.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(formData.email_id.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Validate phone number
    if (!formData.mobile_number.trim()) {
      newErrors.mobile_number = 'Phone Number is required';
      isValid = false;
    } else if (formData.mobile_number.length < 10) {
      newErrors.mobile_number = 'Phone Number must be at least 10 digits';
      isValid = false;
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    // Validate roof type
    if (!formData.roof_type) {
      newErrors.roof_type = 'Roof Type is required';
      isValid = false;
    }

    // Validate house square foot
    if (!formData.house.trim()) {
      newErrors.house = "House's Square Foot is required";
      isValid = false;
    }

    // Validate system size
    if (!formData.size.toString().trim()) {
      newErrors.size = 'System Size is required';
      isValid = false;
    }

    setErrors(newErrors);
    console.log('formData', formData);
    return isValid;
  };

  return (
    <div className={styles.parent_div}>
      <SalesRepSchedulePage isOpen={filterOpen} handleClose={filterClose} />
      {/* <div className={styles.an_top}>Add New Project</div> */}
      <div className={` mt2 ${styles.h_screen}`}>
        <div className={styles.customer_wrapper_list}>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className={styles.an_head}>
              <div className={styles.an_top}>Add New Project</div>
                <span
                  className={styles.back_button}
                  onClick={handleBack}
                  style={{ cursor: 'pointer' }}
                >
                  <FaXmark className={styles.icon} />
                </span>
              </div>
              <div className={`scroll-user ${styles.scroll_user}`}>
                <div className={`createProfileInputView ${styles.inputView}`}>
                  <div className={`createProfileTextView ${styles.inputView}`}>
                    <div className={styles.salrep_input_container}>
                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="First Name"
                          value={formData.first_name}
                          placeholder="Enter First Name"
                          onChange={(e) => {
                            const { value } = e.target;
                            // Regex to allow only letters (a-z, A-Z) and a maximum of 30 characters
                            const regex = /^[A-Za-z\s]{0,30}$/;

                            if (regex.test(value)) {
                              handleInputChange(e);
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                first_name: '',
                              }));
                            } else if (value.trim() === '') {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                first_name: 'First Name is required',
                              }));
                            } else {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                first_name:
                                  'First Name can only contain letters',
                              }));
                            }
                          }}
                          name="first_name"
                          maxLength={20}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {errors.first_name && (
                          <span className="error">{errors.first_name}</span>
                        )}
                      </div>

                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="Last Name"
                          value={formData.last_name}
                          placeholder="Enter Last Name"
                          onChange={(e) => {
                            const { value } = e.target;
                            // Regex to allow only letters (a-z, A-Z) and a maximum of 30 characters
                            const regex = /^[A-Za-z\s]{0,30}$/;

                            if (regex.test(value)) {
                              handleInputChange(e);
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                last_name: '',
                              }));
                            } else if (value.trim() === '') {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                last_name: 'Last Name is required',
                              }));
                            } else {
                              setErrors((prevErrors) => ({
                                ...prevErrors,
                                last_name: 'Last Name can only contain letters',
                              }));
                            }
                          }}
                          name="last_name"
                          maxLength={20}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {errors.last_name && (
                          <span className="error">{errors.last_name}</span>
                        )}
                      </div>
                    </div>

                    <div className={styles.salrep_input_container}>
                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="Email"
                          value={formData.email_id}
                          placeholder="Enter Email"
                          onChange={handleInputChange}
                          name="email_id"
                          maxLength={50}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {emailError && (
                          <span className="error">{emailError}</span>
                        )}
                      </div>

                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="Phone Number"
                          value={formData.mobile_number}
                          placeholder="Enter phone number"
                          onChange={handleInputChange}
                          onKeyDown={handleNumericInput}
                          name="mobile_number"
                          maxLength={20}
                          className={styles.custom_Input}
                          // backgroundColor="#F3F3F3"
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {phoneNumberError && (
                          <p className="error-message">{phoneNumberError}</p>
                        )}
                      </div>
                    </div>

                    <div className={styles.salrep_input_container}>
                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="Address"
                          value={formData.address}
                          placeholder="Enter Address"
                          onChange={handleInputChange}
                          name="address"
                          maxLength={250}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {errors.address && (
                          <span className="error">{errors.address}</span>
                        )}
                      </div>

                      <div className={styles.srs_new_create}>
                        <label
                          className={`${styles.custom_label} inputLabel-select selected-fields-onboard`}
                        >
                          Roof Type
                          {/* {' '} */}
                        </label>

                        <Select
                          classNamePrefix="select"
                          options={options1}
                          value={
                            formData.roof_type
                              ? {
                                  value: formData.roof_type,
                                  label: formData.roof_type,
                                }
                              : null
                          }
                          onChange={handleSelectChange}
                          placeholder="Select Rooftype"
                          styles={{
                            control: (
                              baseStyles,
                              { isFocused, selectProps }
                            ) => ({
                              ...baseStyles,
                              // backgroundColor: '#F3F3F3',
                              border: `1px solid ${
                                isFocused || selectProps?.value
                                  ? '#377CF6'
                                  : '#292B2E'
                              }`, // Check if selected or focused to change border color
                              width: '85%',
                              minHeight: '36px',
                              borderRadius: '8px',
                              fontSize: '12px',
                              '@media only screen and (max-width: 600px)': {
                                width: '240%',
                              },
                              '@media only screen and (min-width: 600px) and (max-width: 820px)':
                                {
                                  width: '100%',
                                },
                              boxShadow: 'none',
                              cursor: 'pointer',
                              marginTop: '19px',
                              '&:hover': {
                                border: '1px solid #377CF6', // Change border color to blue on hover
                              },
                            }),
                            singleValue: (baseStyles) => ({
                              ...baseStyles,
                              color: '#292929',
                              fontWeight: '400',
                            }),
                            placeholder: (baseStyles) => ({
                              ...baseStyles,
                              color: '#292b2e',
                              fontSize: '12px',
                              padding: '5px',
                              transition: 'color 0.2s ease',
                              [`&:hover, .select__control:hover &`]: {
                                color: '#377CF6', // Change placeholder color on hover
                              },
                            }),
                            dropdownIndicator: (baseStyles, { isFocused, selectProps }) => ({
                              ...baseStyles,
                              transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'none', // Rotate indicator when menu is open
                              transition: 'transform 0.3s ease',
                              color: isFocused || selectProps.menuIsOpen ? '#377CF6' : '#777777',
                              '&:hover': {
                                color: '#377CF6',
                              },
                            }),
                            indicatorSeparator: () => ({
                              display: 'none',
                            }),
                            option: (baseStyles, state) => ({
                              ...baseStyles,
                              fontSize: '13px',
                              color: state.isSelected ? '#ffffff' : '#000000', // Text color based on selection
                              // backgroundColor: state.isSelected
                              //   ? '#377CF6'  
                              //   : '#ffffff', 
                              '&:hover': {
                                // Prevent hover effect on selected items
                                // backgroundColor: state.isSelected ? '#377CF6' : '#DDEBFF', 
                              },
                              cursor: 'pointer',
                            }),
                            menu: (baseStyles) => ({
                              ...baseStyles,
                              width: '85%',
                            }),
                            menuList: (base) => ({
                              ...base,
                              '&::-webkit-scrollbar': {
                                scrollbarWidth: 'thin',
                                scrollBehavior: 'smooth',
                                display: 'block',
                                scrollbarColor: 'rgb(173, 173, 173) #fff',
                                width: 8,
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: 'rgb(173, 173, 173)',
                                borderRadius: '30px',
                              },
                            }),
                          }}
                        />
                      </div>
                    </div>

                    <div className={styles.salrep_input_container}>
                      <div className={styles.srs_new_create}>
                        <label
                          className={`${styles.custom_label} inputLabel-select selected-fields-onboard`}
                        >
                          Stories in House
                        </label>
                        <input
                          className={styles.tenst_inp}
                          type="number"
                          min={0}
                          max={100}
                          value={formData.stories_in_house}
                          onChange={(e) => {
                            const value = Number(e.target.value);
                            if (value >= 0 && value <= 100) {
                              setFormData((prevData) => ({
                                ...prevData,
                                stories_in_house: value,
                              }));
                            } else if (value > 100) {
                              setFormData((prevData) => ({
                                ...prevData,
                                stories_in_house: 100,
                              }));
                            }
                          }}
                          style={{
                            borderColor:
                              formData.stories_in_house > 0
                                ? '#377CF6'
                                : '#292B2E',
                            borderWidth: '1px', // Ensure border is visible
                          //   color: formData.stories_in_house > 0
                          // ? ''
                          // : '#777777',
                          color:'#292b2e'
                          }}
                          
                        />
                        <div className={styles.tentaclesicons}>
                          <img
                            src={ICONS.UP}
                            alt="Increase"
                            onClick={() => {
                              setFormData((prevData) => ({
                                ...prevData,
                                stories_in_house: Math.min(
                                  prevData.stories_in_house + 1,
                                  100
                                ),
                              }));
                            }}
                          />
                          <img
                            src={ICONS.DOWN}
                            alt="Decrease"
                            onClick={() => {
                              setFormData((prevData) => ({
                                ...prevData,
                                stories_in_house: Math.max(
                                  prevData.stories_in_house - 1,
                                  0
                                ),
                              }));
                            }}
                          />
                        </div>
                      </div>

                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="House's Square Foot"
                          value={formData.house}
                          placeholder="Enter House's Square Foot"
                          onChange={handleInputChange}
                          onKeyDown={handleNumericInput}
                          name="house"
                          maxLength={7}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {/* {errors.house && (
                          <span className="error">{errors.house}</span>
                        )} */}
                      </div>
                    </div>

                    <div
                      className={` ${styles.reverse_col} ${styles.salrep_input_container}`}
                    >
                      <div className={styles.srs_new_create}>
                        <label
                          className={`${styles.custom_label} inputLabel-select selected-fields-onboard`}
                        >
                          Enable if there is battery installed
                        </label>
                        <span>
                          <CheckboxSlider
                            checked={formData.battery_installed}
                            onChange={handleCheckboxChange}
                          />
                        </span>
                      </div>

                      <div className={styles.srs_new_create}>
                        <Input
                          type="text"
                          label="System Size"
                          value={formData.size}
                          placeholder="Enter System Size"
                          onChange={handleInputChange}
                          onKeyDown={handleNumericInput}
                          name="size"
                          maxLength={7}
                          // backgroundColor="#F3F3F3"
                          className={styles.custom_Input}
                          labelClassName={styles.custom_label}
                          innerViewClassName={styles.innerView}
                        />
                        {/* {errors.house && (
                          <span className="error">{errors.house}</span>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.srActionButton}>
              <button type="submit" className={styles.submitbut}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNew;
