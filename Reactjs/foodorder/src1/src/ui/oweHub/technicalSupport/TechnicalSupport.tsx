import React, { useEffect, useRef, useState } from 'react';
import Input from '../../components/text_input/Input';
import { ICONS } from '../../../resources/icons/Icons';
import './support.css';
import SelectOption from '../../components/selectOption/SelectOption';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUser } from '../../../redux/apiActions/GetUser/getUserAction';

const TechnicalSupport: React.FC = () => {
  const { userDetail, userUpdate, isFormSubmitting } = useAppSelector(
    (state) => state.userSlice
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser({ page_number: 1, page_size: 10 }));
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const form = useRef<HTMLFormElement>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(userDetail?.email_id || '');
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (userDetail) {
      setFirstName(userDetail?.name?.split(' ')[0]);
      setLastName(userDetail?.name?.split(' ')[1]);
      setEmail(userDetail?.email_id);
      setPhoneNumber('1' + userDetail?.mobile_number);
    }
  }, [userDetail]);
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    if (file) {
      const allowedExtensions = ['.png', '.jpg', '.jpeg'];
      const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf('.'));

      if (!allowedExtensions.includes(fileExtension)) {
        setSelectedFileName('');
        setFileSizeError('Only PNG, JPG files are allowed');
        setSelectedFile(null);
        return;
      }

      if (file.size <= maxSize) {
        setSelectedFileName(file.name);
        setFileSizeError('');
        setSelectedFile(file);
        console.log(file, 'selected file in tech support');
      } else {
        setSelectedFileName('');
        setFileSizeError('File size exceeds the limit of 10 MB');
        setSelectedFile(null);
      }
    } else {
      setSelectedFileName('');
      setFileSizeError('');
      setSelectedFile(null);
    }
  };

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [prevCont, setPrevCont] = useState('us');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(selectedFile, 'isuuee');
    // Validation logic
    const newErrors = {
      firstName: firstName ? '' : 'First name is required',
      lastName: lastName ? '' : 'Last name is required',
      email: emailRegex.test(email) ? '' : 'Email address is required',
      phoneNumber: phoneNumber.slice(prevCont.length).trim()
        ? ''
        : 'Phone number is required',
      message: message ? '' : 'Message is required',
    };
    setErrors(newErrors);
    if (form.current && Object.values(newErrors).every((err) => !err)) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          html_content: `
  <title>New Support Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #dddddd;
      background-color: #f9f9f9;
    }
    .message {
      padding: 12px;
      border-left: 4px solid #d0d0d0;
      font-style: italic;
      margin-bottom: 20px;
    }
    .footer {
      margin-top: 30px;
      text-align: center;
      font-size: 14px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Hello,</p>

    <p>You have received a new technical support request from OWE Hub website:</p>

    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Last Name:</strong> ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone Number:</strong> ${phoneNumber}</p>
<p><strong>Issue:</strong> ${selectedIssue}</p>

    <p><strong>Message:</strong></p>
    <div class="message">
      ${message}
    </div>

    <p>Best regards,<br>${firstName}</p>

    <div class="footer">
      This email was sent from OWE Hub Technical Support.
    </div>
  </div>
</body>
</html>
          `,
          message: '',
          subject: 'Technical Support Message',
          to_mail: email,
          issue: selectedIssue,
          attachments: selectedFile?.name,
          phone_number: phoneNumber,
        })
      );
      if (selectedFile) {
        formData.append('attachment', selectedFile);
      }
      postCaller('SendMail_to_IT_from_User', formData)
        .then((response: any) => {
          if (response.status === 202) {
            console.log('SUCCESS!', response);
            toast.success('Your form has been submitted!');
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhoneNumber(prevCont);
            setMessage('');
            setSelectedFile(null);
            setSelectedFileName('');
            setSelectedIssue('');
            setIsSubmitting(false);
          } else {
            console.error('FAILED...', response);
            toast.error('Failed to submit the form. Please try again.');
            setIsSubmitting(false);
          }
        })
        .catch((error: any) => {
          console.error('FAILED...', error);
          toast.error('An error occurred. Please try again.');
          setIsSubmitting(false);
        });
    }
  };

  const handleStateChange = (selectedOption: any) => {
    setSelectedIssue(selectedOption.value);
  };

  const options = [
    { value: 'OWE', label: 'OWE' },
    { value: 'OWE 2', label: 'OWE 2' },
    { value: 'OWE 3', label: 'OWE 3' },
  ];

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/\s/g, '');

    if (name === 'email') {
      if (trimmedValue.length > 0) {
        setEmail(trimmedValue);

        if (!emailRegex.test(trimmedValue)) {
          setErrors({
            ...errors,
            email: 'Please enter a valid email address.',
          });
        } else {
          setErrors({ ...errors, email: '' });
        }
      } else {
        setEmail('');
        setErrors({ ...errors, email: 'Please enter an email address.' });
      }
    }
  };

  return (
    <>
      <form ref={form} onSubmit={handleSubmit}>
        <div className="support-cont-section">
          <div className="support-container">
            <div className="support-section">
              <h3>Support</h3>
            </div>
            <div className="supportImage">
              <img
                style={{ maxWidth: '100%' }}
                src={ICONS.supportImage}
                aria-label="support-icon"
              ></img>
            </div>
          </div>

          <div className="vertical-support"></div>

          <div className="touch-container">
            <div className="touch-info">
              <p>Get In Touch with us for more Information</p>
            </div>

            <div
              className="create-input-container-support"
              style={{ marginTop: '0px' }}
            >
              <div className="create-input-field-support hide">
                <Input
                  type={'text'}
                  label="First Name"
                  value={firstName}
                  name="firstName"
                  placeholder={'Enter First Name'}
                  maxLength={100}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      setFirstName(inputValue);
                      setErrors({ ...errors, firstName: '' });
                    } else {
                      setErrors({
                        ...errors,
                        firstName: 'Only letters are allowed',
                      });
                    }
                  }}
                  disabled={true}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="create-input-field-support hide">
                <Input
                  type={'text'}
                  label="Last Name"
                  value={lastName}
                  name="lastName"
                  maxLength={100}
                  placeholder={'Enter Last Name'}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^[a-zA-Z\s]*$/.test(inputValue)) {
                      setLastName(inputValue);
                      setErrors({ ...errors, lastName: '' });
                    } else {
                      setErrors({
                        ...errors,
                        lastName: 'Only letters are allowed',
                      });
                    }
                  }}
                  disabled={true}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>
            <div className="create-input-container-support">
              <div className="create-input-field-support hide">
                <Input
                  type={'text'}
                  label="Email"
                  value={email}
                  name="email"
                  placeholder={'email@mymail.com'}
                  onChange={handleInputChange}
                  onKeyPress={(e) => {
                    if (e.key === ' ') {
                      e.preventDefault();
                    }
                  }}
                  disabled={true}
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>

              <div className="create-input-field-support hide">
                <label className="inputLabel">Phone Number</label>
                <PhoneInput
                  countryCodeEditable={false}
                  disableCountryGuess={true}
                  enableSearch
                  country={'us'}
                  value={phoneNumber}
                  onChange={(value, prevCont) => {
                    setPhoneNumber(value || '');
                    //@ts-ignore
                    setPrevCont(prevCont.dialCode as string);
                    setErrors({ ...errors, phoneNumber: '' });
                  }}
                  placeholder="Enter phone number"
                  disabled={true}
                />
                <input type="hidden" name="phoneNumber" value={phoneNumber} />
                {errors.phoneNumber && (
                  <span className="error">{errors.phoneNumber}</span>
                )}
              </div>
            </div>

            <div
              className="create-input-container-support"
              style={{ marginBottom: '1rem', marginTop: '0px' }}
            >
              <div className="create-input-field-support">
                <label
                  className="inputLabel-select select-type-label"
                  style={{ marginTop: '1px' }}
                >
                  Issue
                </label>
                <SelectOption
                  marginTop="17px"
                  onChange={handleStateChange}
                  options={options}
                  value={options?.find(
                    (option) => option.value === selectedIssue
                  )}
                />
                <input
                  type="hidden"
                  name="selectedIssue"
                  value={selectedIssue}
                />
              </div>

              <div className="create-input-field-support">
                <label className="inputLabel">
                  <p>Attach File</p>
                </label>
                <div className="file-input-container">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="file-input"
                    onChange={handleFileInputChange}
                  />
                  <div className="custom-button-container">
                    <span className="file-input-placeholder">
                      {selectedFileName || '.jpg .jpeg .png'}
                    </span>
                    <button
                      className="custom-button"
                      onClick={handleButtonClick}
                    >
                      Browse
                    </button>
                  </div>
                </div>
                {fileSizeError && (
                  <span className="error">{fileSizeError}</span>
                )}
              </div>
            </div>

            <div className="create-input-field-note-support">
              <label htmlFor="" className="inputLabel-support">
                Message
              </label>
              <br />
              <textarea
                name="message"
                id=""
                rows={4}
                value={message}
                placeholder="Type here..."
                style={{ marginTop: '0.3rem' }}
                maxLength={300}
                onChange={(e) => {
                  const trimmedValue = e.target.value.trimStart();
                  setMessage(trimmedValue);
                  setErrors({ ...errors, message: '' });
                }}
              ></textarea>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span
                  style={{ color: message.length === 300 ? 'red' : '#80848B' }}
                >
                  {message.length}/300 characters
                </span>
                {errors.message && (
                  <span className="error">{errors.message}</span>
                )}
              </div>
            </div>

            <div className="reset-Update-support">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Wait...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TechnicalSupport;
