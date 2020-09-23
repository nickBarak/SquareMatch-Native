import React, {createContext, useState, useContext} from 'react';
import {SquaresRemainingContext} from './SquaresRemainingContext';

export const ColorStatesContext = createContext(
  new Array(16).fill(0).map((_, i) => i % 6),
);

export function ColorStatesContextProvider({children}) {
  const [colorStates, setColorStates] = useState(
    new Array(16).fill(0).map((_, i) => i % 6),
  );
  const [, setSquaresRemaining] = useContext(SquaresRemainingContext);

  function updateColorStates(index, state) {
    let colorStatesCopy = [...colorStates];
    colorStatesCopy.splice(index, 1, state);

    let unmatchedSquaresCount = colorStatesCopy.reduce((acc, cur) => {
      let stateCount = colorStatesCopy.filter(
        (colorState) => cur === colorState,
      ).length;
      return 16 - stateCount < acc ? 16 - stateCount : acc;
    }, 16);

    setColorStates(colorStatesCopy);
    setSquaresRemaining(unmatchedSquaresCount);
  }

  const resetColorStates = () => {
    let freshColorStates = new Array(16).fill(0).map((_, i) => i % 6);
    setColorStates(freshColorStates);
    setSquaresRemaining(16);
  };

  return (
    <ColorStatesContext.Provider
      value={{colorStates, resetColorStates, updateColorStates}}>
      {children}
    </ColorStatesContext.Provider>
  );
}
