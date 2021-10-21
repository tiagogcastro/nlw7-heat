import { useContext } from 'react';

import { AuthContext, AuthContextData } from '../contexts/auth';

export function useAuth(): AuthContextData {
  const auth = useContext(AuthContext);

  return auth;
}