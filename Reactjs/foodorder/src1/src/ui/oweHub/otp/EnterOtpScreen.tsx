import React, { useState } from 'react';
import './EnterOtpScreen.css';
import { ICONS } from '../../../resources/icons/Icons';
import { ReactComponent as LOGO_SMALL } from '../../../resources/assets/commisson_small_logo.svg';
import Input from '../../components/text_input/Input';
import { otpModel } from '../../../core/models/api_models/AuthModel';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { generateOTP } from '../../../redux/apiActions/auth/authActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { toast } from 'react-toastify';
import Loading from '../../components/loader/Loading';
import { ROUTES } from '../../../routes/routes';
import { FaArrowLeft } from 'react-icons/fa';
import ResendOtpButton from './ResendOtpButton';
import { FormEvent } from '../../../core/models/data_models/typesModel';

const PasswordInput = (props: {
  placeholder: string;
  name: string;
  value: string;
  onChange: Parameters<typeof Input>[0]['onChange'];
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  return (
    <Input
      type={shouldShow ? 'text' : 'password'}
      value={props.value}
      name={props.name}
      placeholder={props.placeholder}
      onChange={props.onChange}
      isTypePassword={true}
      onMouseDown={() => {
        setShouldShow(true);
      }}
      onMouseUp={() => {
        setShouldShow(false);
      }}
      onMouseLeave={() => {
        setShouldShow(false);
      }}
      maxLength={50}
    />
  );
};

const EnterOtpScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, loading } = useAppSelector((state) => state.resetPassword);
  const [error, setError] = useState<{ [key: string]: string }>({});

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const hasNoSpaces = /^\S*$/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character (!@#$%^&*).';
    }
    if (!hasNoSpaces) {
      return 'Password must not contain any whitespace characters.';
    }

    return '';
  };

  const [otpCred, setOtpCred] = useState<otpModel>({
    email_id: '',
    otp: '',
    new_password: '',
    confirm_password: '',
  });

  const resendOTP = async () => {
    const actionResult = await dispatch(generateOTP({ email_id: email }));
    const result = unwrapResult(actionResult);
    if (result.status === HTTP_STATUS.OK) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(otpCred);

    if (otpCred.otp.length === 0) {
      toast.warning('Please enter OTP');
    } else if (otpCred.new_password.length === 0) {
      toast.warning('Please enter new password');
    } else if (otpCred.confirm_password.length === 0) {
      toast.warning('Please enter confirm password');
    } else if (otpCred.new_password !== otpCred.confirm_password) {
      toast.warning('New password and confirm password does not matched');
    } else {
      const data = {
        email_id: email, //TODO: Need to fetch from redux and navigation
        otp: otpCred.otp,
        new_password: otpCred.new_password,
      };

      const actionResult = await dispatch(generateOTP(data));
      const result = unwrapResult(actionResult);
      if (result.status === HTTP_STATUS.OK) {
        toast.success(result.message);
        navigate('/login');
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
          {/* <span id="loginNormalText">
            {'Our World Revolves'}
            <br />
            Around
            <span id="loginColorText">{' Powering '}</span>
            Yours
          </span>
          <div className={'hrLine'}></div> */}
          {/* <span className={'loginNormalTextDescription'}>
            {'YOUR TRUSTED SOLAR EXPERTS'}
          </span> */}
        </div>

        <div className={'loginBox2'}>
          <form onSubmit={(e) => handleOtpSubmit(e)}>
            <div className="loginTextView">
              {/* <object
                type="image/svg+xml"
                className="loginImageLogo"
                data={ICONS.LOGO}
                aria-label="login-icon"
                height={60}
              ></object> */}
              {/* <br /> */}
              <div className="loginLogowithText mb1">
                <LOGO_SMALL />
                <span className={'loginHeader'}>OWE HUB</span>
              </div>
              {/* <div className="loginUnderLine">
                <UNDER_LINE />
              </div> */}
              {/* <span className="loginLogText">Reset Password</span> */}
              <br />
              <div className="otp-input-wrap">
                <Input
                  type={'text'}
                  name="otp"
                  value={otpCred.otp}
                  placeholder={'Enter OTP'}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const validValue = value.replace(/[^a-zA-Z0-9]/g, '');
                    setOtpCred((prevState) => ({
                      ...prevState,
                      [name]: validValue,
                    }));
                  }}
                  maxLength={8}
                />
              </div>

              {/* if email not provided, dont show ResendOtpButton (incase of visit by url) */}
              {email && (
                <ResendOtpButton isLoading={!!loading} onClick={resendOTP} />
              )}
              <br />
              <br />
              <div className="otp-input-wrap">
                <PasswordInput
                  value={otpCred.new_password}
                  name="new_password"
                  placeholder={'New Password'}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    let trimmedValue = value;
                    if (name === 'new_password') {
                      trimmedValue = value.replace(/\s/g, '');
                    }
                    setOtpCred((prevState) => ({
                      ...prevState,
                      [name]: trimmedValue,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      [name]: validatePassword(trimmedValue),
                    }));
                  }}
                />
                {error.new_password && (
                  <span className="error">{error.new_password}</span>
                )}
              </div>

              <br />
              <br />
              <div className="otp-input-wrap">
                <PasswordInput
                  value={otpCred.confirm_password}
                  name="confirm_password"
                  placeholder={'Confirm Password'}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    let trimmedValue = value;
                    if (name === 'confirm_password') {
                      trimmedValue = value.replace(/\s/g, '');
                    }
                    setOtpCred((prevState) => ({
                      ...prevState,
                      [name]: trimmedValue,
                    }));
                    setError((prevState) => ({
                      ...prevState,
                      [name]:
                        trimmedValue !== otpCred.new_password
                          ? 'Confirm password does not match with New password'
                          : '',
                    }));
                  }}
                />
                {error.confirm_password && (
                  <span className="error">{error.confirm_password}</span>
                )}
              </div>

              {/* <ActionButton  title="Submit" type="submit" onClick={() => {}} /> */}
              <br />
              <button
                className="login-button"
                title="Submit"
                type="submit"
                onClick={() => {}}
              >
                Submit
              </button>
              <Link
                to={ROUTES.RESETPASSWORD}
                className="loginGoBackLink"
                style={{ marginTop: '6rem' }}
              >
                <FaArrowLeft />
                <span>Re-enter email</span>
              </Link>
            </div>
          </form>
        </div>
        <div className="solar-sun">
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

export default EnterOtpScreen;
