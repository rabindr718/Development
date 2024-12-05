import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import Input from '../../../components/text_input/Input';
import { ActionButton } from '../../../components/button/ActionButton';
import Loading from '../../../components/loader/Loading';
import './AddNew.css';
import SelectOption from '../../../components/selectOption/SelectOption';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { createTeam } from '../../../../redux/apiActions/teamManagement/teamManagement';
import { ICONS } from '../../../../resources/icons/Icons';
import { resetSuccess } from '../../../../redux/apiSlice/teamManagementSlice.tsx/teamManagmentSlice';
import { postCaller } from '../../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../../infrastructure/web_api/api_client/EndPoints';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
import useAuth from '../../../../hooks/useAuth';

interface CreateUserProps {
  handleClose2: () => void;
  setRefetch: Dispatch<SetStateAction<number>>;
}

interface Option {
  value: string;
  label: string;
}

interface FormInput
  extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

const NewTeam: React.FC<CreateUserProps> = ({ handleClose2, setRefetch }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.createOnboardUser);
  const { sales_manager_list, sale_rep_list, isSuccess } = useAppSelector(
    (state) => state.teamManagmentSlice
  );
  const [formData, setFormData] = useState({
    description: '',
    first_name: '',
  });
  const { authData } = useAuth();

  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedOption2, setSelectedOption2] = useState<string>('');
  const [selectedOption3, setSelectedOption3] = useState<string>('');
  const [selectedOptions2, setSelectedOptions2] = useState<Option[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  const [membersOption, setMembersOption] = useState<Option[]>([]);
  const [newFormData, setNewFormData] = useState<string[]>([]);
  const [managers, setManagers] = useState<any[]>([]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Added for validation errors // Added for validation error message

  const getnewformData = async () => {
    const tableData = {
      tableNames: ['dealer_name'],
    };
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    setNewFormData(res.data?.dealer_name as string[]);
  };
  useEffect(() => {
    getnewformData();
  }, []);
  console.log(newFormData, 'form data');

  useEffect(() => {
    if (authData?.role) {
      const roleAdmin = authData.role;
      if (roleAdmin !== null) {
        setUserRole(roleAdmin);
      } else {
        console.log('role value is null');
      }
    } else {
      console.log('role key does not exist in localStorage');
    }
  }, [authData]);

  const handleInputChange = (e: FormInput) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const err = { ...errors };
    delete err['first_name'];
    setErrors(err);
  };
  const [managerOptions, setManagerOptions] = useState<Option[]>([]);

  const getUsersByDealer = async (dealer?: string) => {
    try {
      const data = await postCaller('get_team_member_dropdown', {
        dealer_name: dealer,
      });
      if (data.status > 201) {
        return new Error(data);
      }
      return await data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectChange2 = (selectedOption: Option | null) => {
    if (selectedOption) {
      setSelectedOptions2((prevOptions) => {
        const optionExists = prevOptions.some(
          (option) => option.value === selectedOption.value
        );
        if (!optionExists) {
          return [...prevOptions, selectedOption];
        }
        return prevOptions;
      });
      const err = { ...errors };
      delete err['managers'];
      setErrors(err);
      setManagerOptions((prev) =>
        prev.filter((opt) => opt.value !== selectedOption.value)
      );
      setMembersOption((prev) =>
        prev.filter((opt) => opt.value !== selectedOption.value)
      );
    }
  };

  const handleRemoveOption2 = (optionToRemove: Option) => {
    setSelectedOptions2((prevOptions) =>
      prevOptions.filter((option) => option !== optionToRemove)
    );

    setManagerOptions((prev) => [...prev, { ...optionToRemove }]);

    setMembersOption((prev) => [...prev, { ...optionToRemove }]);
  };

  const handleSelectChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      const optionExists = selectedOptions.some(
        (option) => option.value === selectedOption.value
      );

      if (!optionExists) {
        setSelectedOptions([...selectedOptions, selectedOption]);
      }
      setManagerOptions((prev) =>
        prev.filter((opt) => opt.value !== selectedOption.value)
      );
      setMembersOption((prev) =>
        prev.filter((opt) => opt.value !== selectedOption.value)
      );
    }
  };

  const handleRemoveOption = (optionToRemove: Option) => {
    setSelectedOptions(
      selectedOptions.filter((option) => option !== optionToRemove)
    );
    setMembersOption((prev) => [...prev, { ...optionToRemove }]);
    if (managers.every((item) => item.rep_code !== optionToRemove.value)) {
      setManagerOptions((prev) => [...prev, { ...optionToRemove }]);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple form submissions

    setIsSubmitting(true); // Set submitting state to true

    const roleAdmin = authData?.role;
    const email = authData?.email;
    let userCode;
    if (
      roleAdmin === TYPE_OF_USER.SALE_MANAGER ||
      roleAdmin === TYPE_OF_USER.REGIONAL_MANGER 
    ) {
      userCode = managers.find((item) => item.email === email);
    }
    console.log(
      userCode,
      'user',
      selectedOptions2,
      'memeber',
      selectedOptions,
      'managers'
    );
    const validationErrors: { [key: string]: string } = {};

    if (formData.first_name.trim() === '') {
      validationErrors.first_name = 'Team Name is required';
    }

    if (selectedOptions2.length === 0) {
      validationErrors.managers = 'Please select at least one manager';
    }
  if (roleAdmin === TYPE_OF_USER.ADMIN ||  roleAdmin === TYPE_OF_USER.FINANCE_ADMIN) {
    if (selectedOption3.length === 0) {
      validationErrors.dealer = 'Please select at least one dealer';
    }
  }
    console.log(validationErrors, "hfhjg")
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false); // Set submitting state back to false
      return;
    }

   

    const data = {
      team_name: formData.first_name,
      sale_rep_ids: selectedOptions.map((option) => option.value),
      manager_ids:
        roleAdmin === TYPE_OF_USER.SALE_MANAGER ||
        roleAdmin === TYPE_OF_USER.REGIONAL_MANGER
          ? [
              userCode?.rep_code,
              ...selectedOptions2.map((option) => option.value),
            ]
          : selectedOptions2.map((option) => option.value),
      description: formData.description,
      dealer_name: selectedOption3 || undefined,
    };

    try {
      await dispatch(createTeam(data));
      handleClose();
    } catch (error) {
      console.error('Error creating team:', error);
    }

    setIsSubmitting(false); // Set submitting state back to false
  };

  useEffect(() => {

    // Guard clause to return early if roleAdmin is undefined
   
    const roleAdmin = authData?.role;
    console.log(roleAdmin, "userole")
    console.log(userRole !== TYPE_OF_USER.ADMIN  
     , "condition" )
       // Ensure roleAdmin is defined before proceeding
  if (!authData || typeof roleAdmin === 'undefined') {
    return; // Exit if authData or roleAdmin are not available
  }
    if (
      roleAdmin !== TYPE_OF_USER.ADMIN 
      
    ) {
    
      (async () => {
        console.log('test run 1')
        const data: { [key: string]: any } = await getUsersByDealer('');
        if (data?.data?.sale_rep_list) {
          const managers =
            data?.data?.sale_rep_list
              ?.filter(
                (item: any) =>
                  item.user_roles !== TYPE_OF_USER.SALES_REPRESENTATIVE
              )
              .map((item: any) => ({
                label: `${item.name}`,
                value: item.rep_code,
              })) || [];
          setManagers(data?.data?.sale_rep_list || []);
          const members =
            data?.data?.sale_rep_list.map((item: any) => ({
              label: `${item.name}`,
              value: item.rep_code,
            })) || [];
          setManagerOptions(managers);
          setMembersOption(members);
        }
      })();
    }
  }, [authData]);

  useEffect(() => {
    if (isSuccess) {
      handleClose2();
      setRefetch((prev) => prev + 1);
    }
    return () => {
      isSuccess && dispatch(resetSuccess());
    };
  }, [isSuccess]);

  const handleClose = () => {};
  const handleSelectChange3 = async (selectedOption3: Option | null) => {
    const selectedValue = selectedOption3 ? selectedOption3.value : '';
    setSelectedOption3(selectedValue);

    // validation for dealer
    if (!selectedValue) {
      setErrors((prevErrors) => ({
        ...prevErrors,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dealer: '',
      }));
    }

    if (selectedOption3?.value) {
      const data: { [key: string]: any } = await getUsersByDealer(
        selectedOption3.value
      );

      if (data?.data?.sale_rep_list) {
        const managers =
          data?.data?.sale_rep_list
            ?.filter(
              (item: any) =>
                item.user_roles !== TYPE_OF_USER.SALES_REPRESENTATIVE
            )
            .map((item: any) => ({ label: item.name, value: item.rep_code })) ||
          [];

        const members =
          data?.data?.sale_rep_list.map((item: any) => ({
            label: item.name,
            value: item.rep_code,
          })) || [];

        setManagerOptions(managers);
        setMembersOption(members);
      }
    }
  };

  const selectedDealer = newFormData.find(
    (option) => option === selectedOption3
  );



  console.log(managers, "managers", authData, "authData")
  return (
    <div className="transparent-model">
      {loading && <Loading />}
      <form onSubmit={handleSubmit} className="new-tm-modal">
        <div className="createUserCrossButton" onClick={handleClose2}>
          <CROSS_BUTTON />
        </div>
        <h3 className="createProfileText">Create new team</h3>
        <div className="modal-body">
          <div className="scroll-user">
            <div className="createProfileInputView">
              <div className="createProfileTextView">
                <div className="create-input-container">
                  <div className="tm-new-create-input-field">
                    <Input
                      type="text"
                      label="Team Name"
                      value={formData.first_name}
                      placeholder="Enter Team name"
                      onChange={handleInputChange}
                      name="first_name"
                      maxLength={100}
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

                  {(userRole === 'Admin' ||
                    userRole === TYPE_OF_USER.FINANCE_ADMIN) && (
                    <div className="tm-new-create-input-field">
                      <label
                        className="inputLabel-select"
                        style={{ fontWeight: 400 }}
                      >
                        Dealer Name
                      </label>
                      <SelectOption
                        menuPosition="fixed"
                        options={newFormData.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                        value={
                          selectedDealer
                            ? {
                                label: selectedDealer,
                                value: selectedDealer,
                              }
                            : undefined
                        }
                        onChange={handleSelectChange3}
                      />
                      {errors.dealer && (
                        <span
                          style={{
                            display: 'block',
                          }}
                          className="error"
                        >
                          {errors.dealer}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="tm-new-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      Select Managers
                    </label>
                    <SelectOption
                      options={managerOptions}
                      menuPosition="fixed"
                      value={managerOptions.find(
                        (option) => option.value === selectedOption2
                      )}
                      onChange={handleSelectChange2}
                    />
                    {errors.managers && (
                      <span
                        style={{
                          display: 'block',
                        }}
                        className="error"
                      >
                        {errors.managers}
                      </span>
                    )}
                  </div>
                  <div className="tm-new-create-input-field">
                    <label
                      className="inputLabel-select"
                      style={{ fontWeight: 400 }}
                    >
                      Select Members
                    </label>
                    <SelectOption
                      menuPosition="fixed"
                      options={membersOption}
                      value={membersOption.find(
                        (option) => option.value === ''
                      )}
                      onChange={handleSelectChange}
                    />
                  </div>
                </div>

                {!!selectedOptions2.length && (
                  <div className="tm-select-data">
                    <p>Managers</p>
                    <div className="nt-select-cust">
                      {selectedOptions2.map((option) => (
                        <div key={option.value} className="tm-selected-option">
                          <span>{option.label}</span>
                          <button
                            type="button"
                            className="remove-button"
                            onClick={() => handleRemoveOption2(option)}
                          >
                            <img
                              src={ICONS.crossIconUser}
                              alt=""
                              className="remove-icon"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!!selectedOptions.length && (
                  <div className="tm-select-data" style={{ marginTop: '20px' }}>
                    <p>Sales Rep</p>
                    <div className="nt-select-cust">
                      {selectedOptions.map((option) => (
                        <div key={option.value} className="tm-selected-option">
                          <span>{option.label}</span>
                          <div>
                            <button
                              type="button"
                              className="remove-button"
                              onClick={() => handleRemoveOption(option)}
                            >
                              <img
                                src={ICONS.crossIconUser}
                                alt=""
                                className="remove-icon"
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  className="create-input-container"
                  style={{ marginTop: '20px' }}
                >
                  <div className="create-input-field-note">
                    <label htmlFor="" className="inputLabel">
                      Description
                    </label>
                    <br />
                    <textarea
                      name="description"
                      rows={3}
                      maxLength={500}
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                    ></textarea>
                    <p
                      className={`character-count ${formData.description.trim().length >= 500 ? 'exceeded' : ''}`}
                    >
                      {formData.description.trim().length}/500 characters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tm-createUserActionButton">
          <ActionButton title="Cancel" onClick={handleClose2} type="button" />
          <ActionButton
            title="Create"
            type="submit"
            onClick={handleClose}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default NewTeam;
