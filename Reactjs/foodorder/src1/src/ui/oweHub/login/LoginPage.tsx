/**
 * Created by Ankit Chuahan on 13/01/24
 * File Name: LoginPage
 * Product Name: WebStorm
 * Project Name: owe_web_app
 * Path: src/ui/pages
 */

import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import { ICONS } from '../../../resources/icons/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as LOGO_SMALL } from '../../../resources/assets/commisson_small_logo.svg';
import Input from '../../components/text_input/Input';
import { Credentials } from '../../../core/models/api_models/AuthModel';
import { ROUTES } from '../../../routes/routes';
import { toast } from 'react-toastify';
import { loginAction } from '../../../redux/apiActions/auth/authActions';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { unwrapResult } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store';
import Loading from '../../components/loader/Loading';
import { TYPE_OF_USER } from '../../../resources/static_data/Constant';
import { FormEvent } from '../../../core/models/data_models/typesModel';
import Lottie from 'lottie-react';
import PowerAnimation from '../../../resources/assets/power_anime.json';
import useAuth, { AuthData } from '../../../hooks/useAuth';
import useWindowWidth from '../../../hooks/useWindowWidth';

export const LoginPage = () => {
  const { authData, saveAuthData } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    email_id: '',
    password: '',
    isRememberMe: false,
  });
  const width = useWindowWidth();
  const isMobile = width < 768;
  const isStaging = process.env.REACT_APP_ENV;

  const handleBattery = () => {
    navigate(ROUTES.SR_IMAGE_UPLOAD);
  };

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const handleInputChange = (name: string, value: any) => {
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** handle local storage */
  useEffect(() => {
    if (authData?.isRememberMe === 'true') {
      handleInputChange('email_id', authData?.email);
      handleInputChange('password', authData?.password);
      handleInputChange('isRememberMe', authData?.isRememberMe === 'true');
    }
  }, [authData]);

  /** email validation */
  const isValidEmail = (email: string) => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (credentials.email_id.length === 0) {
        toast.warn('Please enter email id');
      } else if (!isValidEmail(credentials.email_id)) {
        toast.warning('Please enter a valid email id');
      } else if (credentials.password.length === 0) {
        toast.warning('Please enter the password');
      } else {
        const actionResult = await dispatch(loginAction(credentials));
        const result = unwrapResult(actionResult);
        if (result.status === HTTP_STATUS.OK) {
          toast.success(result.message);

          const {
            email_id,
            user_name,
            role_name,
            dealer_name,
            access_token,
            time_to_expire_minutes,
            is_password_change_required,
          } = result.data;

          const loginResponse: AuthData = {
            role: role_name,
            userName: user_name,
            email: email_id,
            type: access_token,
            token: access_token,
            password: credentials.password,
            dealer: dealer_name,
            expirationTimeInMin: time_to_expire_minutes,
            expirationTime: (
              Date.now() +
              parseInt(time_to_expire_minutes) * 60 * 1000
            ).toString(),
            isRememberMe: credentials.isRememberMe.toString(),
            isPasswordChangeRequired: is_password_change_required,
          };
          saveAuthData(loginResponse);

          //TODO: Need to remove in future
          localStorage.setItem('email', email_id);
          localStorage.setItem('userName', user_name);
          localStorage.setItem('role', role_name);
          localStorage.setItem('token', access_token);
          localStorage.setItem(
            'isPasswordChangeRequired',
            is_password_change_required
          );

          if (role_name === TYPE_OF_USER.DB_USER) {
            navigate(ROUTES.PEINDING_QUEUE);
          } else {
            navigate(ROUTES.PEINDING_QUEUE);
          }
        } else {
          toast.error(result.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mainContainer">
      <div className={'overlay'} />
      <div className={'container'}>
        <div className={'loginBox'}>
          <img
            src={ICONS.TransparentLogo}
            alt="login-transparent"
            width={300}
          />
          <p className="loginTopText">
            Our World Revolves Around Powering Yours
          </p>
          <div className={'hrLine'} />
        </div>
        <div className={'loginBox2'}>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="login_main">
              <div style={{padding: "3rem", textAlign: "center"}}>
                <div className="loginLogowithText">
                  <LOGO_SMALL />
                  <span className={'loginHeader'}>OWE HUB</span>
                </div>

                <div className="login-input">
                  <Input
                    type={'text'}
                    name={'email_id'}
                    value={credentials.email_id}
                    placeholder={'Email'}
                    autoComplete="email_id"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === 'email_id' && !/\s/.test(value)) {
                        handleInputChange(name, value);
                      }
                    }}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    name={'password'}
                    placeholder={'Password'}
                    autoComplete="password"
                    onChange={(e) => {
                      const { name, value } = e.target;
                      if (name === 'password' && !/\s/.test(value)) {
                        handleInputChange(name, value);
                      }
                    }}
                    isTypePassword={true}
                    onClickEyeIcon={() => {
                      if (isMobile) {
                        setShowPassword(!showPassword);
                      }
                    }}
                    onMouseDown={() => {
                      setShowPassword(true);
                    }}
                    onMouseUp={() => {
                      setShowPassword(false);
                    }}
                    onMouseLeave={() => {
                      setShowPassword(false);
                    }}
                    maxLength={50}
                    isMobile={isMobile}
                  />
                </div>

                <div className="loginSwitchView">
                  <div className="loginSwitchInnerView">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={credentials.isRememberMe}
                        onChange={(event) => {
                          handleInputChange(
                            'isRememberMe',
                            !credentials.isRememberMe
                          );

                          console.log(event.target.value);
                        }}
                      />

                      <span className="slider round"></span>
                    </label>
                    <div className="loginRBM">Remember Me</div>
                  </div>
                  <Link to={ROUTES.RESETPASSWORD} className="reset-password">
                    Recover Password
                  </Link>
                </div>
                <br />
                <button
                  className="login-button"
                  title="Log In"
                  type="submit"
                  onClick={() => { }}
                >
                  Log In
                </button>
              </div>
              <div className='login-footer'>
                {isStaging === 'staging' && (
                  <div className="battery-calc-container">
                    <Link to={isStaging === 'staging' ? ROUTES.SR_IMAGE_UPLOAD : '#'}>
                      <div className="login_footer_calc">
                        <img src={ICONS.LogCalc1} alt="battery-calc" />
                        <p>Battery Calc</p>
                      </div>
                    </Link>
                    {/* <Link to={ROUTES.CALCULATOR}>
                      <div className="login_footer_calc">
                        <img src={ICONS.LogCalc2} alt="battery-calc" />
                        <p>CAGR Calculator</p>
                      </div>
                    </Link> */}
                    <Link to={ROUTES.SALE_RP_CUSTOMER_FORM}>
                      <div className="login_footer_calc">
                        <img src={ICONS.LogCalc3} alt="battery-calc" />
                        <p className="coming-soon">Schedule Form</p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
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
