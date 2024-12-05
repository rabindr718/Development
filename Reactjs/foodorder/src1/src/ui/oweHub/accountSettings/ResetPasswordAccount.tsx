import React, { useEffect, useState } from 'react';
import { ActionButton } from '../../components/button/ActionButton';
import Input from '../../components/text_input/Input';
import './AccountSettings.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { logout } from '../../../redux/apiSlice/authSlice/authSlice';
import { HTTP_STATUS } from '../../../core/models/api_models/RequestModel';
import { unwrapResult } from '@reduxjs/toolkit';
import { changePasswordAction } from '../../../redux/apiActions/auth/authActions';

interface ChangePasswordProps {
  handleOpenNClose: () => void;
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

const ResetPasswordAccount: React.FC<ChangePasswordProps> = ({
  handleOpenNClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  let debounceTimer: NodeJS.Timeout | null = null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const debounceDelay = 1000;

    const showToast = (message: string, type: 'info' | 'success' | 'error') => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        toast[type](message, { autoClose: 2000 });
      }, debounceDelay);
    };

    if (currentPassword.length === 0) {
      showToast('Please enter current password.', 'info');
    } else if (newPassword.length === 0) {
      showToast('Please enter new password.', 'info');
    } else if (confirmPassword.length === 0) {
      showToast('Please enter confirm password.', 'info');
    } else if (confirmPassword !== newPassword) {
      showToast('Confirm password does not match with New password.', 'info');
    } else {
      const newPasswordError = validatePassword(newPassword);
      if (newPasswordError) {
        showToast(newPasswordError, 'error');
      } else if (newPassword === currentPassword) {
        showToast(
          'New password cannot be the same as the current password.',
          'error'
        );
      } else {
        const actionResult = await dispatch(
          changePasswordAction({
            new_password: newPassword,
            current_password: currentPassword,
          })
        );
        const result = unwrapResult(actionResult);
        if (result.status === HTTP_STATUS.OK) {
          showToast(result.message, 'success');
          dispatch(logout());
          navigate('/login');
        } else {
          showToast(result.message, 'error');
        }
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleClose = () => {
    handleOpenNClose();
    handleLogout();
  };
  const width = useWindowWidth();
  const isMobile = width < 768;

  return (
    <>
      <div className="" style={{ flex: '1', padding: '1rem' }}>
        <div className="">
          <p>Settings</p>
        </div>

        <div className="Personal-container per-info-pad">
          <div className="create-input-container">
            <form className="reset-profile-form" onSubmit={handleSubmit}>
              <div className="reset-pass-fields">
                <div className="create-input-field-profile-password">
                  <label className="inputLabel">Current Password</label>
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    name={'currentPassword'}
                    value={currentPassword}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!/\s/.test(inputValue)) {
                        setCurrentPassword(inputValue);
                      }
                    }}
                    onClickEyeIcon={() => {
                      if (isMobile) {
                        setShowCurrentPassword(!showCurrentPassword);
                      }
                    }}
                    placeholder="Enter"
                    isTypePassword={true}
                    // onClickEyeIcon={() => {
                    //   setShowCurrentPassword(!showCurrentPassword);
                    // }}
                    onMouseDown={() => {
                      setShowCurrentPassword(true);
                    }}
                    onMouseUp={() => {
                      setShowCurrentPassword(false);
                    }}
                    onMouseLeave={() => {
                      setShowCurrentPassword(false);
                    }}
                    maxLength={50}
                    isMobile={isMobile}
                  />
                </div>
                <div className="create-input-field-profile-password relative">
                  <label className="inputLabel">New Password</label>
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    name={'newPassword'}
                    value={newPassword}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!/\s/.test(inputValue)) {
                        setNewPassword(inputValue);
                        setError({
                          newPassword: validatePassword(inputValue),
                        });
                      }
                    }}
                    onClickEyeIcon={() => {
                      if (isMobile) {
                        setShowNewPassword(!showNewPassword);
                      }
                    }}
                    placeholder="Enter"
                    isTypePassword={true}
                    // onClickEyeIcon={() => {
                    //   setShowNewPassword(!showNewPassword);
                    // }}
                    onMouseDown={() => {
                      setShowNewPassword(true);
                    }}
                    onMouseUp={() => {
                      setShowNewPassword(false);
                    }}
                    onMouseLeave={() => {
                      setShowNewPassword(false);
                    }}
                    maxLength={50}
                    isMobile={isMobile}
                  />
                  {error.newPassword && (
                    <span className="error absolute">{error.newPassword}</span>
                  )}
                </div>
                <div className="create-input-field-profile-password">
                  <label className="inputLabel">Confirm Password</label>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name={'confirmPassword'}
                    value={confirmPassword}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (!/\s/.test(inputValue)) {
                        setConfirmPassword(inputValue);
                        setError({
                          confirmPassword:
                            newPassword !== inputValue
                              ? 'Confirm password does not match with New password'
                              : '',
                        });
                      }
                    }}
                    placeholder="Enter"
                    isTypePassword={true}
                    onClickEyeIcon={() => {
                      if (isMobile) {
                        setShowConfirmPassword(!showConfirmPassword);
                      }
                    }}
                    onMouseDown={() => {
                      setShowConfirmPassword(true);
                    }}
                    onMouseUp={() => {
                      setShowConfirmPassword(false);
                    }}
                    onMouseLeave={() => {
                      setShowConfirmPassword(false);
                    }}
                    maxLength={50}
                    isMobile={isMobile}
                  />
                  {error.confirmPassword && (
                    <span className="error">{error.confirmPassword}</span>
                  )}
                </div>
              </div>
              <div className="reset-Update">
                <ActionButton
                  title={'Update'}
                  type="submit"
                  onClick={() => {}}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordAccount;
