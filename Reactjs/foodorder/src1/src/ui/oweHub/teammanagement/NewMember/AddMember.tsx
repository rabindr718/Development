import React, { useEffect, useState } from 'react';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import { ActionButton } from '../../../components/button/ActionButton';
import { updateUserForm } from '../../../../redux/apiSlice/userManagementSlice/createUserSlice';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Loading from '../../../components/loader/Loading';
import './AddNew.css';
import { FormInput } from '../../../../core/models/data_models/typesModel';
import 'react-phone-input-2/lib/style.css';
import SelectOption from '../../../components/selectOption/SelectOption';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { getTeamMemberDropdown } from '../../../../redux/apiActions/teamManagement/teamManagement';
import { toast } from 'react-toastify';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';

interface createUserProps {
  handleClose: () => void;
  onSubmitCreateUser: (e: any) => void;
  team: any;
  setIsRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Option {
  value: string;
  label: string;
  disbaled?: boolean;
}

interface SelectOptionProps {
  options: Option[];
  value: Option | undefined; // The value should be an Option or undefined
  onChange: (selectedOption: Option | undefined) => void; // The onChange should receive Option or undefined
}

const AddMember: React.FC<createUserProps> = ({
  handleClose,
  onSubmitCreateUser,
  team,
  setIsRefresh,
}) => {
  const dispatch = useAppDispatch();
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const { loading, formData } = useAppSelector(
    (state) => state.createOnboardUser
  );

  const { team_dropdown } = useAppSelector((state) => state.teamManagmentSlice);

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

  const [selectedOptions, setSelectedOptions] = useState<any>([]);
  const [selectedDropdown, setSelectDropdown] = useState<Option | undefined>(
    undefined
  );
  const [selectedRole, setSelectedRole] = useState<Option | undefined>(
    undefined
  );
  const [loadingSubmit, setLoadingSubmit] = useState(false); // Add loadingSubmit state

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSelectChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setSelectedOptions({ ...selectedOptions });
      setSelectedRole(selectedOption);
    }
  };
  interface User {
    user_roles: string;
    rep_id: number;
    rep_code: string;
    name: string;
    phone: string;
    email: string;
  }
  // const handleSelectChange = (selectedOption: Option | undefined) => {
  //   setSelectedRole(selectedOption);
  // };

  // const handleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedRole(event.target.value);
  // };

  const handleRemoveOption = (optionToRemove: Option) => {
    //@ts-ignore
    setSelectedOptions(
      selectedOptions?.filter(
        (option: any) => option.value !== optionToRemove.value
      )
    );
  };

  const [roles, setRoles] = useState([
    { value: 'manager', label: 'Manager', disabled: false },
    { value: 'member', label: 'Member', disabled: false },
  ]);

  /** render ui */
  //team-dropdown
  useEffect(() => {
    const data = {
      dealer_name: team?.dealer_name,
      team_id: team?.team_id,
    };
    dispatch(getTeamMemberDropdown(data));
  }, []);

  const userOptions: Option[] = team_dropdown?.map((user: User) => ({
    label: user.name,
    value: user.rep_code,
  }));

  const handleSelectDropdown = (selectedDropdown: Option | null) => {
    if (selectedDropdown) {
      setSelectDropdown({ ...selectedDropdown });
      const isSalesRep = team_dropdown.find(
        (item: any) => item.rep_code === selectedDropdown.value
      );
      setSelectedRole(undefined);
      if (isSalesRep.user_roles === TYPE_OF_USER.SALES_REPRESENTATIVE) {
        setRoles((prev) =>
          prev.filter(
            (item: { value: string; label: string; disabled: boolean }) =>
              item.value !== 'manager'
          )
        );
      } else {
        setRoles([
          { value: 'manager', label: 'Manager', disabled: false },
          { value: 'member', label: 'Member', disabled: false },
        ]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: { [key: string]: string } = {};

    if (!selectedDropdown) {
      validationErrors.user = 'User is required';
    }

    if (!selectedRole) {
      validationErrors.role = 'Role is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoadingSubmit(true); // Start loading
    try {
      const data = {
        team_id: team?.team_id,
        rep_ids:
          selectedRole?.value === 'member' ? [selectedDropdown?.value] : [],
        manager_ids:
          selectedRole?.value === 'manager' ? [selectedDropdown?.value] : [],
      };
      const response = await postCaller('add_team_member', data);

      console.log(response, 'response');

      if (response.status > 201) {
        throw new Error('Network response was not ok');
      }
      if (response.status === 200) {
        toast.success('Added in Team Successfully');
        handleClose();
        setIsRefresh((prev) => !prev);
        setLoadingSubmit(false); // Stop loading
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      setLoadingSubmit(false); // Stop loading
    }
  };

 
  return (
    <div className="transparent-model">
      {loading && (
        <div>
          <Loading /> {loading}
        </div>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="tm-modal"
      >
        <div className="createUserCrossButton" onClick={handleClose}>
          <CROSS_BUTTON />
        </div>
        <h3 className="createProfileText">Add member</h3>
        <div className="modal-body">
          <div className="scroll-user">
            <div className="createProfileInputView">
              <div
                className="createProfileTextView"
                style={{ minHeight: '200px' }}
              >
                <div className="create-input-container">
                  <div className="tm-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      Select User
                    </label>
                    <SelectOption
                      options={userOptions}
                      menuPosition="fixed"
                      menuListStyles={{ height: '150px' }}
                      value={selectedDropdown}
                      onChange={handleSelectDropdown}
                    />
                    {errors.user && (
                      <span
                        style={{
                          display: 'block',
                        }}
                        className="error"
                      >
                        {errors.user}
                      </span>
                    )}
                  </div>
                  <div className="tm-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      Select Role
                    </label>
                    <SelectOption
                      options={roles}
                      menuPosition="fixed"
                      value={selectedRole}
                      onChange={handleSelectChange}
                    />
                    {errors.role && (
                      <span
                        style={{
                          display: 'block',
                        }}
                        className="error"
                      >
                        {errors.role}
                      </span>
                    )}
                  </div>
                </div>
                <div className="create-input-container"></div>

                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-createUserActionButton">
          <ActionButton
            title={'Add to team'}
            onClick={() => {}}
            type={'submit'}
            style={{
              background: '#377CF6',
              width: '150px',
              textTransform: 'none',
              height: '40px',
            }}
            disabled={loadingSubmit} // Disable button when loading
          />
        </div>
      </form>
    </div>
  );
};

export default AddMember;
