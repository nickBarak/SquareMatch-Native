import React, {createContext, useState} from 'react';

export const SquaresRemainingContext = createContext(16);

export function SquaresRemainingContextProvider({children}) {
  const [squaresRemaining, setSquaresRemaining] = useState(16);

  return (
    <SquaresRemainingContext.Provider
      value={[squaresRemaining, setSquaresRemaining]}>
      {children}
    </SquaresRemainingContext.Provider>
  );
}
