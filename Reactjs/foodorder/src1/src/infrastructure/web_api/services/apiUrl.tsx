// api.ts

import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import {
  HTTP_METHOD,
  HTTP_STATUS,
} from '../../../core/models/api_models/RequestModel';
import { Credentials } from '../../../core/models/api_models/AuthModel';
import { EndPoints } from '../api_client/EndPoints';

const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;
const LEADS_BASE_URL = `${process.env.REACT_APP_LEADS_URL}`;
const CONFIG_URL = `https://staging.owe-hub.com/api/owe-calc-service/v1`;
// authService.ts

export interface LoginResponse {
  email_id: string;
  role_name: string;
  user_name: string;
  access_token: string;
  status: number;
  message: string;
}

export const login = async (
  credentials: Credentials
): Promise<{ data: LoginResponse }> => {
  try {
    const response = await axios.post<{ data: LoginResponse }>(
      `${BASE_URL}${EndPoints.login}`,
      credentials
    );
    if (response.status === HTTP_STATUS.OK) {
      console.log('Login Successfully');
    }
    return response.data;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};
export const postCaller = async (
  endpoint: string,
  postData: any,
  hasChangedBaseUrl: boolean = false
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
      // 'Content-Type': 'application/json',
    },
  };

  try {
    const response: AxiosResponse = await axios.post(
      `${hasChangedBaseUrl ? LEADS_BASE_URL : BASE_URL}/${endpoint}`,
      postData,
      config
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.log('axios error', error);

    if (isAxiosError(error)) {
      if (error.response) return error.response.data;

      // handle network error
      if (error.message === 'Network Error')
        return new Error('No internet connection');
    }

    throw new Error('Failed to fetch data');
  }
};


export const configPostCaller = async (
  endpoint: string,
  postData: any,
  hasChangedBaseUrl: boolean = false
): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
      // 'Content-Type': 'application/json',
    },
  };

  try {
    const response: AxiosResponse = await axios.post(
      `${CONFIG_URL}/${endpoint}`,
      postData,
      config
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.log('axios error', error);

    if (isAxiosError(error)) {
      if (error.response) return error.response.data;

      // handle network error
      if (error.message === 'Network Error')
        return new Error('No internet connection');
    }

    throw new Error('Failed to fetch data');
  }
};

export const getCaller = async (endpoint: string): Promise<any> => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  };
  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/${endpoint}`,
      config
    );
    return response.data; // Return the data from the response
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

export const putCaller = async (endpoint: string, data: any) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: HTTP_METHOD.PUT,
    headers: {
      Authorization: ` ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
