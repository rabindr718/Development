import classes from "../../styles/EditProfiledata.module.css"
import { ICONS } from '../../../../resources/icons/Icons';
import Input from "../../../components/text_input/Input";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import Select, { SingleValue, ActionMeta } from 'react-select';
import { FormInput } from "../../../../core/models/data_models/typesModel";
import { validateEmail, validateZipCode } from "../../../../utiles/Validation";
interface EditModalProps {
    isOpen1: boolean;
    onClose1: () => void;
    leadId: number
}
interface SaleData {
    id: number;
    name: string;
    role: string;
}

const EditProfileData: React.FC<EditModalProps> = ({ isOpen1,
    onClose1,
}) => {
    const CloseModalhandler = () => {
        onClose1();
    }
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email_id: '',
        mobile_number: '',
        address: '',
        zip_code: '',
        notes: '',
        sales_rep: '',
        lead_source: '',
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Added for validation errors // Added for validation error message
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [zip_codeError, setZip_codeError] = useState('');
    const [load, setLoad] = useState(false);
    const [saleData, setSaleData] = useState<SaleData[]>([]);
    const [selectedSale, setSelectedSale] = useState<SaleData | null>(null);

    const handleInputChange = (e: FormInput) => {
        const { name, value } = e.target;
        const allowedPattern = /^[A-Za-z\s]+$/;

        if (name === 'first_name' || name === 'last_name') {
            // Only allow letters, spaces, $ and _
            const sanitizedValue = value.replace(/[^A-Za-z\s$_]/g, '');

            if (sanitizedValue === value) { // Only update if no characters were stripped
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                const err = { ...errors };
                delete err[name];
                setErrors(err);
            }
        } else if (name === 'email_id') {
            const isValidEmail = validateEmail(value.trim());

            if (!isValidEmail) {
                setEmailError('Please enter a valid email address.');
            } else {
                setEmailError('');
            }
            const trimmedValue = value.replace(/\s/g, '');
            setFormData((prevData) => ({
                ...prevData,
                [name]: trimmedValue,
            }));


        } else if (name === 'zip_code') {
            const trimmedValueC = value.trim();
            const isValidZipCode = validateZipCode(trimmedValueC);

            if (trimmedValueC.length > 10) {
                setZip_codeError('Zip code should not exceed 10 characters');
            } else if (!isValidZipCode) {
                setZip_codeError('Please enter a valid ZipCode');
            } else {
                setZip_codeError('');
            }
            const CorrectValue = value.replace(/\s/g, '');
            setFormData((prevData) => ({
                ...prevData,
                [name]: CorrectValue,
            }));
        } else if (name === 'lead_source') {
            if (value === '' || allowedPattern.test(value)) {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
                const err = { ...errors };
                delete err[name];
                setErrors(err);
            }
        } else if (name === 'notes') {
            const sanitizedValue = value.replace(/\s+/g, ' ');
            setFormData((prevData) => ({
                ...prevData,
                [name]: sanitizedValue,
            }));
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

    const handleSaleChange = (selectedOption: SaleData | null) => {
        setSelectedSale(selectedOption);
        errors.sales_rep = '';
    };

    console.log(selectedSale, "sdaghfgfhdsa")


    return <>
        {isOpen1 &&
            <div className="transparent-model">
                <div className={classes.customer_wrapper_list_mob_inner}>
                    <div className={classes.customer_wrapper_list}>
                        <div className={classes.btnContainer}>
                            <span className={classes.XR} >Lead Info</span>
                            <span className={classes.crossIconImg} onClick={CloseModalhandler} > <img src={ICONS.cross} /></span></div>

                        <div className={classes.createProfileInputView}>
                            <div className={classes.createProfileTextView}>
                                <div className={classes.salrep_input_container}>
                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="text"
                                            label="First Name"
                                            value={formData.first_name}
                                            placeholder="Enter First Name"
                                            onChange={handleInputChange}
                                            name="first_name"
                                            maxLength={18}
                                        />
                                        {errors.first_name && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                }}
                                                className="error"
                                            >
                                                {errors.first_name}
                                            </span>
                                        )}
                                    </div>

                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="text"
                                            label="Last Name"
                                            value={formData.last_name}
                                            placeholder="Enter Last name"
                                            onChange={handleInputChange}
                                            name="last_name"
                                            maxLength={17}
                                        />
                                        {errors.last_name && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                }}
                                                className="error"
                                            >
                                                {errors.last_name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.salrep_input_container}>
                                    <div className={classes.srs_new_create}>
                                        <label className="inputLabel">Phone Number</label>
                                        <PhoneInput
                                            countryCodeEditable={false}
                                            country={'us'}
                                            disableCountryGuess={true}
                                            enableSearch
                                            placeholder="+91 8739273728"
                                            value={formData.mobile_number}
                                            onChange={(value: any) => {
                                                const phoneNumber = value.toString();
                                                const numberLength = value.toString();
                                                const numberWithoutCountryCode = phoneNumber.replace(/^\+?\d{1,3}/, "");
                                                if (/^0{8}/.test(numberWithoutCountryCode)) {
                                                    setPhoneNumberError("Invalid number, number cannot consist of consecutive zeros.");
                                                }
                                                else if (numberLength.length > 0 && numberLength.length < 11) {
                                                    setPhoneNumberError("Please enter at least 10 digits.");
                                                } else {
                                                    setPhoneNumberError("");
                                                }
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    mobile_number: phoneNumber,
                                                }));
                                                if (phoneNumber.trim() !== '') {
                                                    setErrors((prevErrors) => ({
                                                        ...prevErrors,
                                                        mobile_number: '',
                                                    }));
                                                }
                                            }}
                                        />
                                        {(phoneNumberError || errors.mobile_number) && (
                                            <p className="error">
                                                {phoneNumberError || errors.mobile_number}
                                            </p>
                                        )}
                                    </div>
                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="email"
                                            label="Email"
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
                                            <div className="error">
                                                {emailError || errors.email_id}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.salrep_input_container}>
                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="text"
                                            label="Address"
                                            value={formData.address}
                                            placeholder="Enter Address"
                                            onChange={handleInputChange}
                                            name="address"
                                            maxLength={80}
                                        />
                                        {errors.address && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                }}
                                                className="error"
                                            >
                                                {errors.address}
                                            </span>
                                        )}
                                    </div>
                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="number"
                                            label="Zip Code"
                                            value={formData.zip_code}
                                            placeholder="Enter Zip Code"
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                if (value.length <= 10) {
                                                    handleInputChange(e);

                                                    if (value.trim() === '') {
                                                        setErrors((prevErrors) => ({
                                                            ...prevErrors,
                                                            zip_code: 'Zip Code is required',
                                                        }));
                                                    } else if (/^0+$/.test(value)) {
                                                        setErrors((prevErrors) => ({
                                                            ...prevErrors,
                                                            zip_code: 'Invalid ZIP Code, cannot consist of only zeros.',
                                                        }));
                                                    } else {
                                                        setErrors((prevErrors) => ({
                                                            ...prevErrors,
                                                            zip_code: '',
                                                        }));
                                                    }
                                                }
                                            }}
                                            name="zip_code"
                                        />

                                        {(zip_codeError || errors.zip_code) && (
                                            <div className="error">
                                                {zip_codeError || errors.zip_code}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.salrep_input_container}>

                                    <div className={classes.srs_new_create}>
                                        <Input
                                            type="text"
                                            label="Lead Source"
                                            value={formData.lead_source}
                                            placeholder="Enter About Lead Source"
                                            onChange={handleInputChange}
                                            name="lead_source"
                                            maxLength={30}
                                        />
                                        {errors.lead_source && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                }}
                                                className="error"
                                            >
                                                {errors.lead_source}
                                            </span>
                                        )}
                                    </div>
                                    <div className={classes.srs_new_create} style={{ gap: "6px" }}>
                                        <div className={classes.custom_label_newlead}>Sales Rep</div>
                                        <Select
                                            value={selectedSale}
                                            onChange={handleSaleChange}
                                            getOptionLabel={(option) => option.name}
                                            getOptionValue={(option) => option.id.toString()}
                                            placeholder={"Select Sales Rep"}
                                            options={saleData}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    marginTop: 'px',
                                                    borderRadius: '8px',
                                                    outline: 'none',
                                                    color: '#3E3E3E',
                                                    width: '300px',
                                                    height: '36px',
                                                    fontSize: '12px',
                                                    border: '1px solid #000000',
                                                    fontWeight: '500',
                                                    cursor: 'pointer',
                                                    alignContent: 'center',
                                                    backgroundColor: '#fffff',
                                                    boxShadow: 'none',
                                                    '@media only screen and (max-width: 767px)': {
                                                        width: '300px',
                                                        // width: 'fit-content',
                                                    },
                                                    '&:focus-within': {
                                                        borderColor: '#377CF6',
                                                        boxShadow: '0 0 0 0.3px #377CF6',
                                                        caretColor: '#3E3E3E',
                                                        '& .css-kofgz1-singleValue': {
                                                            color: '#377CF6',
                                                        },
                                                        '& .css-tj5bde-Svg': {
                                                            color: '#377CF6',
                                                        },
                                                    },
                                                    '&:hover': {
                                                        borderColor: '#377CF6',
                                                        boxShadow: '0 0 0 0.3px #377CF6',
                                                        '& .css-kofgz1-singleValue': {
                                                            color: '#377CF6',
                                                        },
                                                        '& .css-tj5bde-Svg': {
                                                            color: '#377CF6',
                                                        },
                                                    },
                                                }),
                                                placeholder: (baseStyles) => ({
                                                    ...baseStyles,
                                                    color: '#3E3E3E',
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: 'none',
                                                }),
                                                dropdownIndicator: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    transform: state.isFocused ? 'rotate(180deg)' : 'none',
                                                    transition: 'transform 0.3s ease',
                                                    color: '#3E3E3E',
                                                    '&:hover': {
                                                        color: '#3E3E3E',
                                                    },
                                                }),
                                                option: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    background: state.isSelected ? '#377CF6' : '#fff',
                                                    color: baseStyles.color,
                                                    '&:hover': {
                                                        background: state.isSelected ? '#377CF6' : '#DDEBFF',
                                                    },

                                                }),
                                                singleValue: (baseStyles, state) => ({
                                                    ...baseStyles,
                                                    color: '#3E3E3E',
                                                }),
                                                menu: (baseStyles) => ({
                                                    ...baseStyles,
                                                    width: '300px',
                                                    marginTop: '3px',
                                                    border: '1px solid #000000',

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
                                        {errors.sales_rep && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                }}
                                                className="error"
                                            >
                                                {errors.sales_rep}
                                            </span>
                                        )}
                                    </div>


                                    <div className={classes.create_input_field_note}>
                                        <label htmlFor="" className="inputLabel">
                                            Notes
                                        </label>{' '}
                                        <br />
                                        <textarea
                                            name="notes"
                                            id=""
                                            rows={3}
                                            maxLength={300}
                                            value={formData.notes}
                                            //   onChange={(e) => handleInputChange(e)}
                                            placeholder="Write"
                                        ></textarea>
                                        <p
                                            className={`character-count ${formData.notes.trim().length >= 300
                                                ? 'exceeded'
                                                : ''
                                                }`}
                                        >
                                            {formData.notes.trim().length}/300 characters
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
    </>
}

export default EditProfileData;