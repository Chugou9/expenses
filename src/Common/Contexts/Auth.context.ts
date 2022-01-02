import {createContext} from 'react';

function noop() {}

interface IAuthContext {
  userId: string | null,
  login: (id: string | null) => void,
  logout: () => void,
  isAuthentificated: boolean
}

/**
 * Контекст для прокидывания данных авторизации.
 */
export const AuthContext = createContext<IAuthContext>({
  userId: null,
  login: noop,
  logout: noop,
  isAuthentificated: false
});