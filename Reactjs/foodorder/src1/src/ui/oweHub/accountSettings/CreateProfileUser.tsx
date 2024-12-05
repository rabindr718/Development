import React from 'react';
import { CommissionModel } from '../../../core/models/configuration/create/CommissionModel';
import SelectOption from '../../components/selectOption/SelectOption';
import Input from '../../components/text_input/Input';
import { ICONS } from '../../../resources/icons/Icons';
import './AccountSettings.css';

interface ButtonProps {
  editMode: boolean;
  handleClose: () => void;
  commission: CommissionModel | null;
}
const CreateProfileUser: React.FC<ButtonProps> = ({
  editMode,
  handleClose,
  commission,
}) => {
  return (
    <div className="user-profile-container">
      <div className="user-profile-cross" onClick={handleClose}>
        <img src={ICONS.crossIconUser} alt="" />
      </div>

      <div className="create-user">
        <h3>Create User Profile</h3>
        <p>Enter the below detail to create User New Profile</p>
      </div>

      <div className="user-create-profile-section">
        <div className="cam-icon">
          <div className="edit-img">
            <div className="">
              <label htmlFor="uploadImage">
                <div className="image-circle">
                  <img src={ICONS.userIconImg} alt="" />
                </div>
              </label>
            </div>
            <input type="file" id="uploadImage" hidden accept="image/*" />
            <label
              style={{
                cursor: 'pointer',
                color: 'white',
              }}
              htmlFor="uploadImage"
            >
              <div className="image-button">
                <button type="button">Upload Photo</button>
              </div>
            </label>
          </div>
        </div>

        <div className="vertical-create"></div>
        <div className="">
          <div className="create-account-section">
            <div className="create-input-field" style={{ width: '250px' }}>
              <Input
                type={'text'}
                label="First Name*"
                value={''}
                name="pay_src"
                placeholder={'Enter'}
                onChange={(e) => {}}
              />
            </div>

            <div className="create-input-field" style={{ width: '250px' }}>
              <Input
                type={'text'}
                label="Last Name"
                value={''}
                name="pay_src"
                placeholder={'Enter'}
                onChange={(e) => {}}
              />
            </div>
          </div>
          <div className="create-account-section">
            <div className="create-input-field" style={{ width: '250px' }}>
              <Input
                type={'text'}
                label="Email ID*"
                value={''}
                name="pay_src"
                placeholder={'Enter'}
                onChange={(e) => {}}
              />
            </div>

            <div className="create-input-field" style={{ width: '250px' }}>
              <Input
                type={'text'}
                label="Phone Number*"
                value={''}
                name="pay_src"
                placeholder={'Enter'}
                onChange={(e) => {}}
              />
            </div>
          </div>
          <div className="create-account-section">
            <div className="create-input-field" style={{ width: '250px' }}>
              <label className="inputLabel">Select Role</label>
              <SelectOption
                options={[]}
                value={undefined}
                onChange={(newValue) => {}}
              />
            </div>

            <div className="create-input-field" style={{ width: '250px' }}>
              <label className="inputLabel">Assign Dealer</label>
              <SelectOption
                options={[]}
                value={undefined}
                onChange={(newValue) => {}}
              />
            </div>
          </div>
        </div>
        {/* <div className="reset-Update-support">
            <ActionButton title={"Submit"} type="submit" onClick={() => {}} />
          </div> */}
      </div>
    </div>
  );
};

export default CreateProfileUser;
