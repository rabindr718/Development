import axios, { CancelTokenSource } from 'axios';
import { toast } from 'react-toastify';

const cancelTokenSources: CancelTokenSource[] = [];

axios.interceptors.request.use(
  (config) => {
    const cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;
    cancelTokenSources.push(cancelTokenSource);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (axios.isCancel(error)) {
      toast.dismiss();
    }
    return Promise.reject(error);
  }
);

export const cancelAllRequests = () => {
  cancelTokenSources.forEach((source) => {
    source.cancel('');
    toast.dismiss();
  });
  cancelTokenSources.length = 0;
};
