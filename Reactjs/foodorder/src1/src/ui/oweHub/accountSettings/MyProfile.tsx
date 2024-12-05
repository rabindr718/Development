import React, { useState, useEffect } from 'react';
import Input from '../../components/text_input/Input';
import { ICONS } from '../../../resources/icons/Icons';
import { ActionButton } from '../../components/button/ActionButton';
import SelectOption from '../../components/selectOption/SelectOption';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  getUser,
  updateUser,
} from '../../../redux/apiActions/GetUser/getUserAction';
import { stateOption } from '../../../core/models/data_models/SelectDataModel';
import { postCaller } from '../../../infrastructure/web_api/services/apiUrl';
import { EndPoints } from '../../../infrastructure/web_api/api_client/EndPoints';
import { toast } from 'react-toastify';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import useAuth from '../../../hooks/useAuth';

const MyProfile = () => {
  const dispatch = useAppDispatch();
  const { userDetail, isFormSubmitting } = useAppSelector(
    (state) => state.userSlice
  );

  const [name, setName] = useState<String>(userDetail?.name);
  const userRole = userDetail?.role_name;
  const userName = userDetail?.name;
  const [isEditMode, setIsEditMode] = useState(true);
  const [isEditModee, setIsEditModee] = useState(true);
  const [preferredName, setPreferredName] = useState<any>('');
  const [dealerCode, setDealerCode] = useState('');
  const [newFormData, setNewFormData] = useState<any>([]);
  const { authData } = useAuth();

  const role = authData?.role;
  const tableData = {
    tableNames: [
      'partners',
      'states',
      'installers',
      'owe_cost',
      'loan_type',
      'tier',
    ],
  };

  useEffect(() => {
    dispatch(getUser({ page_number: 1, page_size: 10 }));
  }, []);

  useEffect(() => {
    if (userDetail) {
      setStreet(userDetail?.street_address || '');
      setState(userDetail?.state || '');
      setCity(userDetail?.city || '');
      setCountry(userDetail?.country || '');
      setPreferredName(userDetail?.preferred_name || '');
      setDealerCode(userDetail?.dealer_code || '');
    }
  }, [userDetail]);

  useEffect(() => {
    if (userName) {
      const firstLetter = userName.charAt(0).toUpperCase();
      setName(firstLetter);
    }
  }, [userName]);

  const getNewFormData = async () => {
    const res = await postCaller(EndPoints.get_newFormData, tableData);
    setNewFormData(res.data);
  };
  useEffect(() => {
    getNewFormData();
  }, []);

  const updateSubmit = () => {
    const data = {
      user_code: userDetail.user_code,
      name: userDetail.name,
      street_address: street,
      // zipcode: zipCode,
      country: country,
      city: city,
      state: state,
      preferred_name: preferredName,
      dealer_code: dealerCode,
    };
    Promise.resolve(dispatch(updateUser(data))).then(() => {
      toast.success('Successfully Updated');
      setIsEditMode(!isEditMode);
      if (role === TYPE_OF_USER.DEALER_OWNER) {
        setIsEditModee(!isEditModee);
      }
    });
  };

  const handleReset = () => {
    setCity(userDetail.city);
    setStreet(userDetail.street_address);
    setCountry(userDetail.country);
    setState(userDetail.state);
    if (role === TYPE_OF_USER.DEALER_OWNER) {
      setPreferredName(userDetail.preferred_name);
    }
  };

  const handleStreetChange = (e: any) => {
    const value = e.target.value;
    const streetRegex = /^[a-zA-Z0-9\s,.'-]{0,100}$/;
    if (streetRegex.test(value)) {
      setStreet(value);
      setErrors({ ...errors, street: '' });
    } else {
      setErrors({ ...errors, street: 'Enter valid street' });
    }
  };

  const handleCityChange = (e: any) => {
    const value = e.target.value;
    const cityRegex = /^[a-zA-Z\u0080-\u024F\s'-]{0,100}$/;

    if (cityRegex.test(value)) {
      setCity(value);
      setErrors({ ...errors, city: '' });
    } else {
      setErrors({ ...errors, city: 'Enter valid city' });
    }
  };

  const handleCountryChange = (e: any) => {
    const value = e.target.value;
    const countryRegex = /^[a-zA-Z\u0080-\u024F\s'-]{0,100}$/;

    if (countryRegex.test(value)) {
      setCountry(value);
      setErrors({ ...errors, country: '' });
    } else {
      setErrors({ ...errors, country: 'Enter valid country' });
    }
  };

  const [city, setCity] = useState(userDetail?.city || '');
  const [street, setStreet] = useState(userDetail?.street_address || '');
  const [country, setCountry] = useState(userDetail?.country || '');
  const [state, setState] = useState(userDetail?.state || '');

  const [errors, setErrors] = useState({
    street: '',
    country: '',
    city: '',
    state: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditMode) {
      // const newErrors = {
      //   city: city ? '' : 'City is required',
      //   street: street ? '' : 'Street is required',
      //   country: country ? '' : 'Country is required',
      //   state: state ? '' : 'State is required',
      // };
      // setErrors(newErrors);
      // @ts-ignore
      // if (Object.keys(newErrors).every((it) => !newErrors[it])) {
      //   updateSubmit();
      // }
      updateSubmit();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="myProf-section">
          <div className="">
            <p>My Profile</p>
          </div>
          <div className="admin-section">
            <div className="profile-img">{name}</div>

            <div className="caleb-container">
              <div className="caleb-section">
                <h3>{userName}</h3>
                <p>{userRole}</p>
              </div>
            </div>
          </div>

          <div className="Personal-container">
            <div className="personal-section">
              <div className="">
                <p>Personal Information</p>
              </div>
              {/* <div className="edit-section">
                <img src={ICONS.editIcon} alt="" />
                <p>Edit</p>
              </div> */}
            </div>

            <div
              className="create-input-container"
              style={{ padding: '0.5rem', marginLeft: '1rem' }}
            >
              <div className="create-input-field-profile">
                <Input
                  type={'text'}
                  label="Name"
                  value={userDetail?.name}
                  name="fee_rate"
                  placeholder={'Enter'}
                  onChange={(e) => {}}
                  disabled
                />
              </div>
              <div className="create-input-field-profile">
                <Input
                  type={'text'}
                  label="Email"
                  value={userDetail?.email_id}
                  name="fee_rate"
                  placeholder={'Enter'}
                  onChange={(e) => {}}
                  disabled
                />
              </div>
              <div className="create-input-field-profile">
                <Input
                  type={'text'}
                  label="Phone Number"
                  value={userDetail?.mobile_number}
                  name="fee_rate"
                  placeholder={'Enter'}
                  onChange={(e) => {}}
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="Personal-container-detail">
            <div className="personal-section">
              <div className="">
                <p>Address Detail</p>
              </div>
              <div
                className={`edit-section ${!isEditMode ? 'active-edit-section' : ''}`}
                onClick={() => {
                  setIsEditMode(!isEditMode);
                  setErrors({
                    street: '',
                    country: '',
                    city: '',
                    state: '',
                  });
                }}
              >
                <img src={ICONS.editIcon} alt="" />
                <p>Edit</p>
              </div>
            </div>
            <div
              className="create-input-container"
              style={{ padding: '0.5rem', marginLeft: '1rem' }}
            >
              <div className="create-input-field-address">
                <Input
                  type={'text'}
                  label="Street"
                  value={street}
                  name=""
                  placeholder={'Enter'}
                  onChange={handleStreetChange}
                  disabled={isEditMode}
                />
                {errors.street && (
                  <span className="error">{errors.street}</span>
                )}
              </div>
              <div className="create-input-field-address">
                <label className="inputLabel-select prof-fields-onboard">
                  State
                </label>
                <SelectOption
                  options={stateOption(newFormData)}
                  onChange={(newValue) => {
                    setState(newValue?.value);
                    setErrors((prev) => ({ ...prev, state: '' }));
                  }}
                  value={stateOption(newFormData)?.find(
                    (option) => option.value === state
                  )}
                  singleValueStyles={{ fontWeight: 400 }}
                  disabled={isEditMode}
                />
                {errors.state && <span className="error">{errors.state}</span>}
              </div>
              <div className="create-input-field-address">
                <Input
                  type={'text'}
                  label="City"
                  value={city}
                  name=""
                  placeholder={'Enter'}
                  onChange={handleCityChange}
                  disabled={isEditMode}
                />
                {errors.city && <span className="error">{errors.city}</span>}
              </div>
              <div className="create-input-field-address">
                <Input
                  type={'text'}
                  label="Country"
                  value={country}
                  name=""
                  placeholder={'Enter'}
                  onChange={handleCountryChange}
                  disabled={isEditMode}
                />
                {errors.country && (
                  <span className="error">{errors.country}</span>
                )}
              </div>
            </div>
          </div>

          {role === TYPE_OF_USER.DEALER_OWNER ? (
            <div className="Personal-container-detail">
              <div className="personal-section">
                <div className="">
                  <p>Other Details</p>
                </div>
                <div
                  className={`edit-section ${!isEditMode ? 'active-edit-section' : ''}`}
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                  }}
                >
                  <img src={ICONS.editIcon} alt="" />
                  <p>Edit</p>
                </div>
              </div>
              <div
                className="create-input-container"
                style={{ padding: '0.5rem', marginLeft: '1rem' }}
              >
                <div className="create-input-field-address">
                  <Input
                    type={'text'}
                    label="Dealer Code"
                    value={dealerCode}
                    name=""
                    placeholder={'Enter'}
                    onChange={(e) => setDealerCode(e.target.value)}
                    disabled={isEditMode}
                  />
                </div>
                <div className="create-input-field-address">
                  <Input
                    type={'text'}
                    label="Preferred Name"
                    value={preferredName}
                    name=""
                    placeholder={'Enter'}
                    onChange={(e) => setPreferredName(e.target.value)}
                    disabled={isEditMode}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="">
            <div className="profile-reset">
              <ActionButton
                title={'Reset'}
                type="reset"
                onClick={() => {
                  !isEditMode && handleReset();
                }}
              />
              <ActionButton
                title={'Update'}
                type="submit"
                disabled={isFormSubmitting}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default MyProfile;
