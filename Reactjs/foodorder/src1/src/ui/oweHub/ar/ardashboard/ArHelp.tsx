import React, { useRef, useState } from 'react';
import '../../dashboard/dasboard.css';
import { ICONS } from '../../../../resources/icons/Icons';
import Input from '../../../components/text_input/Input';
import { ActionButton } from '../../../components/button/ActionButton';
interface ButtonProps {
  handleClose: () => void;
  data: {
    id?: string;
    name?: string;
    home_owner?: string;
    state?: string;
    sys_size?: number;
    contract_calc?: number;
    current_due?: number;
    balance?: number;
  };
}
const ArHelp: React.FC<ButtonProps> = ({ data, handleClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileInputChange = (e: any) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  const [state, setState] = useState({
    uid: data.id || '',
    partner: data?.name || 'N/A',
    home_owner: data?.home_owner || '',
    state: data?.state || '',
    sys_size: data?.sys_size || '',
    contract_calc: data?.contract_calc || '',
    current_due: data?.current_due || 'N/A',
    balance: data?.balance || '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file input click event
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
                className="create-input-container"
                style={{ width: '1740px' }}
              >
                <div className="create-input-field" style={{}}>
                  <Input
                    type={'text'}
                    label="UID"
                    value={state.uid}
                    name="uid"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Partner"
                    value={state.partner}
                    name="partner"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Home Owner"
                    value={state.home_owner}
                    name="home_owner"
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
              </div>

              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Sys Size"
                    value={state.sys_size}
                    name="sys_size"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Contract calc"
                    value={state.contract_calc}
                    name="contract_calc"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Current Due"
                    value={state.current_due}
                    name="current_due"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="create-input-container">
                <div className="create-input-field-help">
                  <Input
                    type={'text'}
                    label="Balance"
                    value={state.balance}
                    name="balance"
                    placeholder={'Enter'}
                    onChange={handleChange}
                  />
                </div>

                <div className="create-input-field-help">
                  <label className="inputLabel">
                    <p>Attach File</p>
                  </label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      className="file-input"
                    />
                    <div className="custom-button-container">
                      <span className="file-input-placeholder">
                        Select File
                      </span>
                      <button
                        className="custom-button"
                        onClick={handleButtonClick}
                      >
                        {/* <img src={ICONS.browserIcon} alt="" /> */}
                        Browse
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="create-input-field-note" style={{}}>
                <label htmlFor="" className="inputLabel">
                  Message
                </label>
                <br />
                <textarea
                  name={''}
                  id=""
                  rows={4}
                  onChange={handleChange}
                  value={''}
                  placeholder="Type here..."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="createUserActionButton" style={{ marginTop: '1rem' }}>
            <ActionButton title={'Cancel'} type="reset" onClick={handleClose} />
            <ActionButton title={'Submit'} type="submit" onClick={() => {}} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ArHelp;
