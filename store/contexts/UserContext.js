import React, {createContext, useState} from 'react';

export const UserContext = createContext('anonymous');

export function UserContextProvider({children}) {
  const [user, setUser] = useState('anonymous');

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
}
