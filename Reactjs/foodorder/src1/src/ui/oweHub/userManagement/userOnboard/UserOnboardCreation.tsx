import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ReactComponent as CROSS_BUTTON } from '../../../../resources/assets/cross_button.svg';
import Input from '../../../components/text_input/Input';
import { ActionButton } from '../../../components/button/ActionButton';
import { updateUserForm } from '../../../../redux/apiSlice/userManagementSlice/createUserSlice';
import CheckBox from '../../../components/chekbox/CheckBox';
import { ICONS } from '../../../../resources/icons/Icons';
import SelectTable from '../userTableList/SeletTable';
import UserBasedInput from './UserBasedInput';
import SelectOption from '../../../components/selectOption/SelectOption';
import { CreateUserModel } from '../../../../core/models/api_models/UserManagementModel';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import Loading from '../../../components/loader/Loading';
import { ALL_USER_ROLE_LIST as USERLIST } from '../../../../resources/static_data/Constant';
import './Userboard.css';
import { TYPE_OF_USER } from '../../../../resources/static_data/Constant';
import { FormInput } from '../../../../core/models/data_models/typesModel';
import { getDataTableName } from '../../../../redux/apiActions/dataTableAction';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import useAuth from '../../../../hooks/useAuth';

interface createUserProps {
  editMode: boolean;
  handleClose: () => void;
  userOnboard: CreateUserModel | null;
  onSubmitCreateUser: (e: any) => void;
  onChangeRole: (role: string, value: string) => void;
  dealerList: any[];
  regionList: any[];
  selectedOption: { label?: string; value?: string };
  tablePermissions: {};
  setTablePermissions: Dispatch<SetStateAction<{}>>;
  setLogoUrl: any;
}

const UserOnboardingCreation: React.FC<createUserProps> = ({
  handleClose,
  onSubmitCreateUser,
  onChangeRole,
  dealerList,
  regionList,
  selectedOption,
  tablePermissions,
  setTablePermissions,
  setLogoUrl,
}) => {
  const dispatch = useAppDispatch();
  const { authData } = useAuth();

  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [dbAccess, setDbAcess] = useState(false);
  const { loading, formData } = useAppSelector(
    (state) => state.createOnboardUser
  );
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectTable, setSelectTable] = useState<boolean>(false);
  const tables = useAppSelector((state) => state.dataTableSlice.option);
  const [emailError, setEmailError] = useState('');

  /** handle change for role */
  const handleChange = (newValue: any, fieldName: string) => {
    dispatch(updateUserForm({ field: 'assigned_dealer_name', value: '' }));
    dispatch(updateUserForm({ field: 'add_region', value: '' }));
    dispatch(updateUserForm({ field: 'team_name', value: '' }));
    dispatch(updateUserForm({ field: 'report_to', value: '' }));
    dispatch(updateUserForm({ field: 'dealer', value: '' }));
    dispatch(updateUserForm({ field: 'assigned_Manager', value: '' }));
    const { value } = newValue;
    onChangeRole('Role', value);
    setTablePermissions({});
    dispatch(updateUserForm({ field: fieldName, value }));
  };

  const ALL_USER_ROLE_LIST = useMemo(() => {
    let role = USERLIST;
    const userRole = authData?.role;
    if (userRole === TYPE_OF_USER.DEALER_OWNER) {
      role = role.filter(
        (role) =>
          role.value !== TYPE_OF_USER.ADMIN &&
          role.value !== TYPE_OF_USER.FINANCE_ADMIN &&
          role.value !== TYPE_OF_USER.DB_USER &&
          role.value !== TYPE_OF_USER.PARTNER
      );
    }
    return role;
  }, [authData]);

  /**handle change for report */
  const handleChangeForRegion = async (newValue: any, fieldName: string) => {
    const { value } = newValue;

    await dispatch(updateUserForm({ field: fieldName, value }));

    if (fieldName !== 'report_to' && fieldName !== 'team_name') {
      onChangeRole('Dealer', value);
    }
    if (fieldName === 'dealer') {
      await dispatch(updateUserForm({ field: 'assigned_Manager', value: '' }));
    }
  };

  const handleChangeAssignManager = async (
    newValue: any,
    fieldName: string
  ) => {
    const { value } = newValue;
    await dispatch(updateUserForm({ field: fieldName, value }));
    onChangeRole('Manager', value);
  };
  const validateEmail = (email: string) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleInputChange = (
    e: FormInput | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'first_name' || name === 'last_name') {
      const sanitizedValue = value.replace(/[^a-zA-Z\s'-]/g, '');

      dispatch(updateUserForm({ field: name, value: sanitizedValue }));
    } else if (name === 'email_id') {
      const isValidEmail = validateEmail(value.trim());
      if (!isValidEmail) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
      const trimmedValue = value.replace(/\s/g, '');
      dispatch(updateUserForm({ field: name, value: trimmedValue }));
    } else if (name === 'description') {
      const trimmedValue = value.replace(/^\s+/, '');
      dispatch(updateUserForm({ field: name, value: trimmedValue }));
    } else {
      dispatch(updateUserForm({ field: name, value }));
    }
  };

  useEffect(() => {
    if (selectedOption.value === TYPE_OF_USER.ADMIN) {
      setDbAcess(true);
      const set = new Set(
        Array.from({ length: tables?.length }).map((_, i: number) => i)
      );
      setSelected(set);
      const obj: { [key: string]: string } = {};
      tables.forEach((table: { table_name: string }) => {
        obj[table.table_name] = 'Full';
      });
      setTablePermissions(obj);
    } else {
      setTablePermissions({});
      setDbAcess(false);
    }
  }, [selectedOption, tables]);

  useEffect(() => {
    dispatch(getDataTableName({ get_all_table: true }));
  }, []);

  /** render ui */

  return (
    <div className="transparent-model">
      {loading && (
        <div>
          <Loading /> {loading}
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitCreateUser(tablePermissions);
        }}
        className="modal"
      >
        <div className="createUserCrossButton" onClick={handleClose}>
          <CROSS_BUTTON />
        </div>
        <h3 className="createProfileText">Onboarding</h3>
        <div className="modal-body">
          <div className="scroll-user">
            <div className="createProfileInputView">
              <div className="createProfileTextView">
                <div className="create-input-container">
                  {formData.role_name !== TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="First Name"
                        value={formData.first_name}
                        placeholder={'Enter First Name'}
                        onChange={(e) => handleInputChange(e)}
                        name={'first_name'}
                        maxLength={100}
                      />
                    </div>
                  ) : null}

                  {formData.role_name === TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="Dealer Code"
                        value={formData.dealer_code}
                        placeholder={'Enter Dealer Code'}
                        onChange={(e) => handleInputChange(e)}
                        name={'dealer_code'}
                        maxLength={100}
                      />
                    </div>
                  ) : null}

                  {formData.role_name === TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="Dealer Name"
                        value={formData.dealer}
                        placeholder={'Enter Dealer Name'}
                        onChange={(e) => handleInputChange(e)}
                        name={'dealer'}
                        maxLength={100}
                      />
                    </div>
                  ) : null}

                  {formData.role_name !== TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="Last Name"
                        value={formData.last_name}
                        placeholder={'Enter Last Name'}
                        onChange={(e) => handleInputChange(e)}
                        name={'last_name'}
                        maxLength={100}
                      />
                    </div>
                  ) : null}

                  <div
                    className="create-input-field relative"
                    style={{ zIndex: 10 }}
                  >
                    <label className="inputLabel-select selected-fields-onboard">
                      Role
                    </label>
                    <SelectOption
                      options={ALL_USER_ROLE_LIST}
                      menuPosition="fixed"
                      onChange={(newValue) => {
                        handleChange(newValue, 'role_name');
                        if (newValue?.value !== TYPE_OF_USER.ADMIN) {
                          setTablePermissions({});
                          setSelected(new Set());
                          setDbAcess(false);
                        }
                        if (newValue?.value === TYPE_OF_USER.ADMIN) {
                          setDbAcess(true);
                          const set = new Set(
                            Array.from({ length: tables.length }).map(
                              (_, i: number) => i
                            )
                          );
                          setSelected(set);
                          const obj: { [key: string]: string } = {};
                          tables.forEach((table: { table_name: string }) => {
                            obj[table.table_name] = 'Full';
                          });
                          setTablePermissions(obj);
                        }
                      }}
                      value={ALL_USER_ROLE_LIST?.find(
                        (option) => option?.value === formData.role_name
                      )}
                    />
                  </div>
                </div>

                <div className="create-input-container">
                  {formData.role_name !== TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="Email ID"
                        value={formData.email_id}
                        placeholder={'email@mymail.com'}
                        onChange={(e) => handleInputChange(e)}
                        name={'email_id'}
                        disabled={formData.isEdit}
                      />
                      {emailError && (
                        <div className="error-message">{emailError}</div>
                      )}
                    </div>
                  ) : null}
                  {formData.role_name !== TYPE_OF_USER.PARTNER ? (
                    <div
                      className="create-input-field"
                      style={{ marginTop: -3 }}
                    >
                      <label className="inputLabel">Phone Number</label>
                      <PhoneInput
                        countryCodeEditable={false}
                        country={'us'}
                        disableCountryGuess={true}
                        enableSearch
                        value={formData.mobile_number}
                        onChange={(value: any) => {
                          console.log('date', value);
                          dispatch(
                            updateUserForm({ field: 'mobile_number', value })
                          );
                        }}
                        placeholder="Enter phone number"
                      />
                      {phoneNumberError && (
                        <p className="error-message">{phoneNumberError}</p>
                      )}
                    </div>
                  ) : null}
                  {formData.role_name === TYPE_OF_USER.PARTNER ? (
                    <div className="create-input-field">
                      <Input
                        type={'text'}
                        label="Preferred Name"
                        value={formData.preferred_name}
                        placeholder={'Enter'}
                        onChange={(e) => handleInputChange(e)}
                        name={'preferred_name'}
                      />
                    </div>
                  ) : null}

                  <UserBasedInput
                    formData={formData}
                    onChange={(e: any) => handleInputChange(e)}
                    regionList={regionList}
                    handleChangeForRegion={(value: any, name: string) => {
                      handleChangeForRegion(value, name);
                    }}
                    handleChangeAssignManager={(value: any, name: string) => {
                      handleChangeAssignManager(value, name);
                    }}
                    setLogoUrl={setLogoUrl}
                  />
                </div>

                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <CheckBox
                      checked={dbAccess}
                      disabled={
                        selectedOption.value !== TYPE_OF_USER.ADMIN &&
                        selectedOption.value !== TYPE_OF_USER.DB_USER
                      }
                      onChange={() => {
                        setDbAcess((prev) => !prev);
                        if (dbAccess) {
                          setTablePermissions({});
                        }
                      }}
                    />
                    <div className="access-data">
                      <p>Database Access</p>
                    </div>
                  </div>
                  <div className="" style={{ marginTop: '0.2rem' }}>
                    <div className="dashboard-payroll">
                      {Object.keys(tablePermissions).map((key) => (
                        <div className="Payroll-section" key={key}>
                          <label
                            className="inputLabel"
                            style={{ color: '#344054' }}
                          >
                            {key}
                          </label>
                          <div
                            className="dash-select-user"
                            onClick={() => setSelectTable(true)}
                          >
                            Edit
                          </div>
                        </div>
                      ))}

                      {(TYPE_OF_USER.DB_USER === selectedOption.value ||
                        TYPE_OF_USER.ADMIN === selectedOption.value) &&
                        dbAccess && (
                          <div
                            className="Line-container"
                            style={{ marginTop: '0.3rem' }}
                          >
                            <div
                              className="line-graph"
                              onClick={() => setSelectTable(true)}
                            >
                              <div className="edit-line">
                                <img
                                  src={ICONS.editIconUser}
                                  style={{ background: 'white' }}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      {selectTable && (
                        <SelectTable
                          selected={selected}
                          setSelected={setSelected}
                          setSelectTable={setSelectTable}
                          setTablePermissions={setTablePermissions}
                          tablePermissions={tablePermissions}
                        />
                      )}
                    </div>
                  </div>
                </div>
                {(formData.role_name === TYPE_OF_USER.SALE_MANAGER ||
                  formData.role_name === TYPE_OF_USER.SALES_REPRESENTATIVE ||
                  formData.role_name === TYPE_OF_USER.REGIONAL_MANGER ||
                  formData.role_name === TYPE_OF_USER.DEALER_OWNER) && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    <CheckBox
                      checked={formData.podioChecked}
                      onChange={() => {
                        dispatch(
                          updateUserForm({
                            field: 'podioChecked',
                            value: !formData.podioChecked,
                          })
                        );
                      }}
                    />
                    <div className="access-data">
                      <p>Add user to podio</p>
                    </div>
                  </div>
                )}
                <div className="create-input-field-note">
                  <label htmlFor="" className="inputLabel">
                    Description
                  </label>{' '}
                  <br />
                  <textarea
                    name="description"
                    id=""
                    rows={3}
                    maxLength={500}
                    value={formData.description}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Type"
                  ></textarea>
                  <p
                    className={`character-count ${
                      formData.description.trim().length >= 500
                        ? 'exceeded'
                        : ''
                    }`}
                  >
                    {formData.description.trim().length}/500 characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="um-createUserActionButton">
          <ActionButton
            title={'Cancel'}
            onClick={handleClose}
            type={'button'}
          />
          <ActionButton title={'Create'} onClick={() => {}} type={'submit'} />
        </div>
      </form>
    </div>
  );
};

export default UserOnboardingCreation;
