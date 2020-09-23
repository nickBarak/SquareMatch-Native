import React, {createContext, useState} from 'react';

export const InitializedContext = createContext(false);

export function InitializedContextProvider({children}) {
  const [initialized, setInitialized] = useState(false);

  return (
    <InitializedContext.Provider value={[initialized, setInitialized]}>
      {children}
    </InitializedContext.Provider>
  );
}
