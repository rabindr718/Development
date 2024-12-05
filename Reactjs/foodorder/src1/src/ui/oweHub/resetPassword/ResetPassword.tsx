import React, { useState } from 'react';
import './ResetPassword.css';
import { ReactComponent as LOGO_SMALL } from '../../../resources/assets/commisson_small_logo.svg';
import { ICONS } from '../../../resources/icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/text_input/Input';
import { resetPassword } from '../../../core/models/api_models/AuthModel';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { generateOTP } from '../../../redux/apiActions/auth/authActions';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { toast } from 'react-toastify';
import { updateEmail } from '../../../redux/apiSlice/authSlice/resetPasswordSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import Loading from '../../components/loader/Loading';
import { FaArrowLeft } from 'react-icons/fa';
import { ROUTES } from '../../../routes/routes';
import {
  FormEvent,
  FormInput,
} from '../../../core/models/data_models/typesModel';
import './ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<resetPassword>({
    email_id: '',
  });
  const { loading } = useAppSelector((state) => state.resetPassword);

  const handleInputChange = (e: FormInput) => {
    const { name, value } = e.target;
    let trimmedValue = value;
    if (name === 'email_id') {
      trimmedValue = value.replace(/\s/g, '');
    }
    setCredentials((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };
  /** on submit  */
  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (credentials.email_id.length === 0) {
      toast.warning('Please enter email Id.');
    } else {
      const actionResult = await dispatch(
        generateOTP({ email_id: credentials.email_id })
      );
      const result = unwrapResult(actionResult);
      if (result.status === HTTP_STATUS.OK) {
        dispatch(updateEmail(credentials.email_id));
        toast.success(result.message);
        navigate('/otp');
      } else {
        toast.error(result.message);
      }
    }
  };
  return (
    <div className="mainContainer">
      <div className={'overlay'} />
      <div className={'container'}>
        <div className={'loginBox'}>
          <object
            type="image/svg+xml"
            className="login-logo"
            data={ICONS.TransparentLogo}
            aria-label="login-icon"
            width={300}
          ></object>
          <p className="loginTopText">
            Our World Revolves Around Powering Yours
          </p>
          <div className={'hrLine'} />
          {/* <span className={'loginNormalTextDescription'}>
            {'YOUR TRUSTED SOLAR EXPERTS'}
          </span> */}
        </div>

        <div className={'loginBox2'}>
          <form onSubmit={(e) => handleEmailSubmit(e)}>
            <div className="loginTextView">
              {/* <object
                type="image/svg+xml"
                className="loginImageLogo"
                data={ICONS.LOGO}
                aria-label="login-icon"
                height={60}
              ></object> */}
              <div className="loginLogowithText">
                <LOGO_SMALL />
                <span className={'loginHeader'}>OWE HUB</span>
              </div>
              {/* <div className="loginUnderLine">
                <UNDER_LINE />
              </div> */}
              {/* <span className="loginLogText">Enter Your Email Address</span> */}

              <div className="mt3 reset-input-wrap">
                <Input
                  type={'text'}
                  value={credentials.email_id}
                  name="email_id"
                  placeholder={'Enter Email'}
                  onChange={handleInputChange}
                />
              </div>
              <br />
              <div className="flex mb4">
                <button
                  className="login-button"
                  title="Request OTP"
                  type="submit"
                  onClick={() => {}}
                >
                  Request OTP
                </button>
              </div>
              <Link
                to={ROUTES.LOGIN}
                className="loginGoBackLink"
                style={{ marginTop: '6rem' }}
              >
                <FaArrowLeft />
                <span>Go back to login screen</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="solar-sun reset-solar-sun">
          <img src={ICONS.SolarSun} alt="sun-image" />
        </div>
        {loading && (
          <div>
            <Loading /> {loading}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
