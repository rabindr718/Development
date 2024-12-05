import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import Input from '../../../components/text_input/Input';
import { ActionButton } from '../../../components/button/ActionButton';
import { updateUserForm } from '../../../../redux/apiSlice/userManagementSlice/createUserSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Loading from '../../../components/loader/Loading';
import './AddNew.css';
import { FormInput } from '../../../../core/models/data_models/typesModel';
import 'react-phone-input-2/lib/style.css';
import SelectOption from '../../../components/selectOption/SelectOption';
import {
  getTeams,
  manageTeam,
} from '../../../../redux/apiActions/teamManagement/teamManagement';
import { resetSuccess } from '../../../../redux/apiSlice/teamManagementSlice.tsx/teamManagmentSlice';

interface createUserProps {
  handleClose1: () => void;
  onSubmitCreateUser: (e: any) => void;
  team: any;
  member: any;
  setRefetch: Dispatch<SetStateAction<number>>;
}

interface Option {
  value: string;
  label: string;
}

const MoveMember: React.FC<createUserProps> = ({
  handleClose1,
  onSubmitCreateUser,
  team,
  member,
  setRefetch,
}) => {
  const dispatch = useAppDispatch();
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const { loading, formData } = useAppSelector(
    (state) => state.createOnboardUser
  );

  const handleInputChange = (
    e: FormInput | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'first_name' || name === 'last_name') {
      const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
      dispatch(updateUserForm({ field: name, value: sanitizedValue }));
    } else {
      dispatch(updateUserForm({ field: name, value }));
    }
  };

  useEffect(() => {
    // const pageNumber = {
    //   page_number: currentPage,
    //   page_size: itemsPerPage,
    //   archived: viewArchived ? true : undefined,
    //   filters,
    // };
    dispatch(getTeams());
  }, []);
  const { isMove, isFormSubmitting, teams } = useAppSelector(
    (state) => state.teamManagmentSlice
  );

  const comissionValueData: Option[] = teams?.map((rep: any) => ({
    value: rep?.team_id,
    label: rep?.team_name,
  }));
  const [selectedOption2, setSelectedOption2] = useState<string>(
    comissionValueData[0]?.label
  );
  const handleSelectChange2 = (
    selectedOption2: { value: string; label: string } | null
  ) => {
    setSelectedOption2(selectedOption2 ? selectedOption2.value : '');
  };

  /** render ui */

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      team_id: selectedOption2,
      rep_ids: [member?.rep_id],
      delete_check: false,
    };
    dispatch(manageTeam(data));
  };

  useEffect(() => {
    if (isMove) {
      handleClose1();
      setRefetch((prev) => prev + 1);
    }
    return () => {
      isMove && dispatch(resetSuccess());
    };
  }, [isMove]);
  console.log(member, 'member');

  return (
    <div className="transparent-model">
      {loading && (
        <div>
          <Loading /> {loading}
        </div>
      )}
      <form onSubmit={handleSubmit} className="tm-modal">
        <div className="createUserCrossButton" onClick={handleClose1}>
          <CROSS_BUTTON />
        </div>
        <h3 className="createProfileText">Move to another team</h3>
        <div className="modal-body">
          <div className="scroll-user">
            <div className="createProfileInputView">
              <div className="createProfileTextView">
                <div className="create-input-container">
                  <div className="tm-create-input-field">
                    <Input
                      type={'text'}
                      label="Current Team"
                      value={team?.team_name}
                      placeholder={'United Wholesales'}
                      onChange={(e) => handleInputChange(e)}
                      disabled
                      name={'first_name'}
                      maxLength={100}
                    />
                  </div>
                  <div className="tm-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      New Team
                    </label>
                    <SelectOption
                      options={comissionValueData}
                      value={comissionValueData.find(
                        (option) => option.value === selectedOption2
                      )}
                      onChange={handleSelectChange2}
                    />
                  </div>
                </div>
                {/* <div className="create-input-container">
                  <div className="tm-create-input-field">
                    <Input
                      type={'text'}
                      label="Current Role"
                      value={formData.email_id}
                      placeholder={'Sales Rep'}
                      onChange={(e) => handleInputChange(e)}
                      name={'email_id'}
                      disabled={formData.isEdit}
                    />
                  </div>

                  <div className="tm-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      New Role
                    </label>
                    <SelectOption
                      options={comissionValueData}
                      value={comissionValueData.find(
                        (option) => option.value === selectedOption2
                      )}
                      onChange={handleSelectChange2}
                    />
                  </div>
                </div>
                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  ></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="tm-createUserActionButton">
          <ActionButton title={'Move'} onClick={() => {}} type={'submit'} />
        </div>
      </form>
    </div>
  );
};

export default MoveMember;
