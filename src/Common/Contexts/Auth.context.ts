import {createContext} from 'react';

function noop() {}

interface IAuthContext {
  token: string | null,
  userId: string | null,
  login: (jwt: string | null, id: string | null) => void,
  logout: () => void,
  isAuthentificated: boolean
}

/**
 * Контекст для прокидывания данных авторизации.
 */
export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthentificated: false
});