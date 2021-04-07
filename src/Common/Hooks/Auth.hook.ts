import {useState, useEffect, useCallback} from 'react';

const storageName = 'userData';

export const useAuth = (): [string | null, string | null, (jwt: string | null, id: string | null) => void, () => void] => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  
  const login = useCallback((jwt, id) => {
    setToken(jwt);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      token,
      userId
    }));
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem(storageName) as string);

    if (userData && userData.token) {
      login(userData.token, userData.userId);
    }
  }, [login]);


  const logout = useCallback(() => {
    setUserId(null);
    setToken(null);

    localStorage.removeItem(storageName);
  }, []);

  return [token, userId, login, logout];
}