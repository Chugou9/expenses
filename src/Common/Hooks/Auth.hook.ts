import {useState, useCallback} from 'react';

const storageName = 'userData';

function getUserIdFromStorage() {
  const userData = JSON.parse(localStorage.getItem(storageName) as string);

  if (userData?.userId) {
    return userData.userId;
  }

  return null;
}

export const useAuth = (): [string | null, (id: string | null) => void, () => void] => {
  const [userId, setUserId] = useState<string | null>(getUserIdFromStorage);
  
  const login = useCallback((id: string | null) => {
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({
      userId: id
    }));
  }, []);

  const logout = useCallback(() => {
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  return [userId, login, logout];
}