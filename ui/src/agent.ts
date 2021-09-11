import axios, { AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from './config';
import { authStore } from './stores/auth';

// MimicClient.init({
//   axios,
//   key: 'initial',
// });

export const agent = axios.create({ baseURL: API_ENDPOINT, withCredentials: true });

agent.interceptors.request.use((config: AxiosRequestConfig) => {
  const authToken = authStore.getState().authToken;
  config.headers['authorization'] = config.headers['authorization'] ?? `Bearer ${authToken}`;
  return config;
});
