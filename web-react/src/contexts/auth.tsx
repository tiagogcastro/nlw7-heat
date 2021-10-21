import { useEffect, useState, createContext, ReactNode } from 'react';

import { api } from '../services/api';

export type User = {
  id: string;
  avatar_url: string;
  name: string;
  login: string;
}

export type AuthContextData = {
  signInUrl: string;
  user: User | null;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: User;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=7e15521879bd11487954`;
  const tokenName = '@dowhile:token';

  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode
    });

    const { token, user } = response.data;

    localStorage.setItem(tokenName, token);

    setUser(user);
  }

  function signOut() {
    setUser(null);

    localStorage.removeItem(tokenName);
  }

  useEffect(() => {
    const token = localStorage.getItem(tokenName);

    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      api.get<User>('/profile').then(response => {
        setUser(response?.data);
      });
    }
  }, []);

  useEffect(() => {
    const url = window.location.href;

    const hasGithubCode = url.includes('?code=');

    if(hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return (
    <AuthContext.Provider value={{signInUrl, user, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}