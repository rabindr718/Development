import { useState, useEffect } from 'react';

// Define the structure of the login response
export interface AdminTheme {
  BGColor: string;
  dealerLogo: string;
}

export interface AuthData {
  role: string;
  userName: string;
  email: string | null;
  type: string;
  token: string;
  password: string;
  dealer: string;
  expirationTimeInMin: string;
  expirationTime: string;
  isRememberMe: string;
  isPasswordChangeRequired: string;
  adminTheme?: AdminTheme;
}

// Type for the custom hook's return value
type UseAuthReturnType = {
  authData: AuthData | null;
  saveAuthData: (data: AuthData) => void;
  clearAuthData: () => void;
  appendAuthData: (key: keyof AuthData, value: any) => Promise<void>;
  getUpdatedAuthData: () => AuthData | null;
  filterAuthData: () => void;
};

const useAuth = (): UseAuthReturnType => {
  const [authData, setAuthData] = useState<AuthData | null>(null);

  useEffect(() => {
    const savedAuthData = localStorage.getItem('authData');
    if (savedAuthData) {
      setAuthData(JSON.parse(savedAuthData));
    }
  }, []);

  /** save auth data **/
  const saveAuthData = (data: AuthData) => {
    setAuthData(data);
    localStorage.setItem('authData', JSON.stringify(data));
  };

  /**Append new key **/
  const appendAuthData = async (key: keyof AuthData, value: any) => {
    if (authData) {
      const updatedAuthData = { ...authData, [key]: value };
      setAuthData(updatedAuthData);
      localStorage.setItem('authData', JSON.stringify(updatedAuthData));
    }
  };
  /** Get updated key data */
  const getUpdatedAuthData = (): AuthData | null => {
    const savedAuthData = localStorage.getItem('authData');
    if (savedAuthData) {
      const parsedAuthData = JSON.parse(savedAuthData);
      setAuthData(parsedAuthData);
      return parsedAuthData;
    }
    return null;
  };

  /** Filter auth data to keep only email and password */
  const filterAuthData = () => {
    if (authData) {
      const { email, password, isRememberMe } = authData;
      const filteredAuthData = { email, password, isRememberMe };
      setAuthData(filteredAuthData as AuthData);
      localStorage.setItem('authData', JSON.stringify(filteredAuthData));
    }
  };

  /**Clear all data */
  const clearAuthData = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return {
    authData,
    saveAuthData,
    clearAuthData,
    appendAuthData,
    getUpdatedAuthData,
    filterAuthData,
  };
};

export default useAuth;
