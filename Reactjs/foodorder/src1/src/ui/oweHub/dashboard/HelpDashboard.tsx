import React, { useRef, useState } from 'react';
import './dasboard.css';
import { ICONS } from '../../../resources/icons/Icons';
import Input from '../../components/text_input/Input';
import { ActionButton } from '../../components/button/ActionButton';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { toast } from 'react-toastify';

interface ButtonProps {
  handleClose: () => void;
  data: any;
}
const HelpDashboard: React.FC<ButtonProps> = ({ data, handleClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);



  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSizeError, setFileSizeError] = useState('');
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSize = 10 * 1024 * 1024; // 10 MB in bytes

    if (file) {
      const allowedExtensions = ['.png', '.jpg', '.jpeg', '.pdf', '.doc', '.docx', '.docm', '.xls', '.xlsx'];
      const fileExtension = file.name
        .toLowerCase()
        .substring(file.name.lastIndexOf('.'));

      if (!allowedExtensions.includes(fileExtension)) {
        setSelectedFileName('');
        setFileSizeError('Only PNG, JPG, pdf, doc files are allowed');
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



  const [state, setState] = useState({
    project_id: data?.unique_id || 'N/A',
    dealer_name: data?.dealer_code || '',
    sale_rep: data?.rep1 || '',
    customer_name: data?.home_owner || '',
    amount_prepaid: 0,
    pipeline_remaining: 0,
    current_date: 'N/A',
    project_status: data?.current_status || '',
    state: data?.st || '',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };


  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click event
  };

  const validateFields = () => {
    const newErrors: any = {};
    newErrors.dealer_name = state.dealer_name ? '' : 'Dealer name is required';
    newErrors.sale_rep = state.sale_rep ? '' : 'Sale rep is required';
    newErrors.customer_name = state.customer_name ? '' : 'Customer name is required';
    newErrors.message = state.message ? '' : 'Message is required';
    return newErrors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.values(newErrors).every((err) => !err)) {
      setIsSubmitting(true);

      // Prepare form data
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          html_content: `
          <html>
          <body>
            <p>You have received a new support request:</p>
            <p><strong>Dealer Name:</strong> ${state.dealer_name}</p>
            <p><strong>Sale Rep:</strong> ${state.sale_rep}</p>
            <p><strong>Customer Name:</strong> ${state.customer_name}</p>
            <p><strong>Project ID:</strong> ${state.project_id}</p>
            <p><strong>Message:</strong> ${state.message}</p>
          </body>
          </html>`,
          subject: 'Technical Support Request',
          to_mail: 'support@example.com', // Example email, replace with actual recipient
          phone_number: data?.phoneNumber || '',
        })
      );

      if (selectedFile) {
        formData.append('attachment', selectedFile);
      }

      try {
        const response = await postCaller('SendMail_to_IT_from_User', formData);
        if (response.status === 202) {
          toast.success('Your form has been submitted!');
          setIsSubmitting(false);
          handleClose();
          setSelectedFile(null);
        } else {
          toast.error('Failed to submit the form. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="transparent-model-down">
        <div className="help-modal">
          <div className="help-section-container">
            <div className="help-section">
              <h3>Help</h3>
            </div>
            <div className="help-icon" onClick={handleClose}>
              <img src={ICONS.closeIcon} alt="" />
            </div>
          </div>
          <div className="modal-body">
            <div className="help-input-container">
              <div
                className="create-input-container help-projId"
                style={{ width: '1740px' }}
              >
                <div className="create-input-field help-proj-input" style={{}}>
                  <Input
                    type={'text'}
                    label="Project ID"
                    value={state.project_id}
                    name="project_id"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Dealer Name"
                    value={state.dealer_name}
                    name="dealer_name"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Sale Rep."
                    value={state.sale_rep}
                    name="sale_rep"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Customer Name"
                    value={state.customer_name}
                    name="customer_name"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Amount Prepaid"
                    value={state.amount_prepaid}
                    name="amount_prepaid"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Pipeline Remaining"
                    value={state.pipeline_remaining}
                    name="pipeline_remaining"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Current Date"
                    value={state.current_date}
                    name="current_date"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Project Status"
                    value={state.project_status}
                    name="project_status"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="State"
                    value={state.state}
                    name="state"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help attach-help-mob">
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
                        {selectedFileName || '.jpg .jpeg .pdf .doc .pdf .xls'}
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

              <div className="create-input-field-note" style={{}}>
                <label htmlFor="" className="inputLabel">
                  Message
                </label>
                <br />
                <textarea
                  name="message"
                  rows={4}
                  onChange={handleChange}
                  value={state.message}
                  placeholder="Type here..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="createUserActionButton" style={{ marginTop: '1rem', paddingTop: "1rem" }}>
            <ActionButton title={'Cancel'} type="reset" onClick={handleClose} />
            <button className='help-submit' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpDashboard;

