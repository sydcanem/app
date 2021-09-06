import create from 'zustand';
import { agent } from '../agent';
import { login } from '../services';
import { LoginResponse } from '../types';
import history from '../history';

interface Store {
  initialized: boolean;
  isLoading: boolean;
  isAuthenticated: boolean;
  authToken: string | undefined;
  redirect: string;
  login: (username: string, password: string) => void;
  initStore: ({ redirectOnDeny }: { redirectOnDeny: string }) => void;
  setAuthToken: (token: string) => void;
}

const refreshToken = async (): Promise<LoginResponse> => {
  const response = await agent.post<LoginResponse>('/auth/refresh');
  return response.data;
};

export const authStore = create<Store>((set, get) => ({
  initialized: false,
  isLoading: false,
  isAuthenticated: false,
  authToken: undefined,
  redirect: '/',
  setAuthToken: (authToken) => set({ authToken }),
  login: async (username, password) => {
    set({ isLoading: true });
    const response = await login(username, password);
    if (response.token) {
      set({ isLoading: false, authToken: response.token, isAuthenticated: true });
    } else {
      set({ isLoading: false });
    }
  },
  initStore: async ({ redirectOnDeny }) => {
    set({ isLoading: true });
    const authToken = get().authToken;
    if (!authToken) {
      try {
        const data = await refreshToken();
        if (data?.token) {
          set({ authToken: data?.token, isAuthenticated: true });
        }
      } catch (error) {
        set({ isAuthenticated: false });
      }
    } else if (authToken) {
      set({ isAuthenticated: true });
    } else {
      set({ isAuthenticated: false });
    }

    set({ isLoading: false, initialized: true });
    if (!get().isAuthenticated) {
      history.push(redirectOnDeny || get().redirect);
    }
  },
}));

export const setToken = (token: string) => authStore.setState({ authToken: token });
