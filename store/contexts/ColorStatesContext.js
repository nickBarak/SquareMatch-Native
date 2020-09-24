import React, {createContext, useState, useContext} from 'react';
import {SquaresRemainingContext} from './SquaresRemainingContext';

export const ColorStatesContext = createContext(new Array(16).fill(6));

const defaultColorStates = new Array(16).fill(0).map((_, i) => i % 6);

export function ColorStatesContextProvider({children}) {
  const [colorStates, setColorStates] = useState(new Array(16).fill(6));
  const [, setSquaresRemaining] = useContext(SquaresRemainingContext);

  function initializeColorStates(leftPointer, rightPointer, iteration = 0) {
    if (iteration) {
      updateColorStates(leftPointer, defaultColorStates[leftPointer], true);
      updateColorStates(rightPointer, defaultColorStates[rightPointer], true);
      leftPointer = leftPointer === 0 ? 15 : leftPointer - 1;
      rightPointer = rightPointer === 15 ? 0 : rightPointer + 1;
    }

    iteration < 8 &&
      setTimeout(
        () => initializeColorStates(leftPointer, rightPointer, ++iteration),
        0,
      );
  }

  function updateColorStates(index, state, initializing) {
    let colorStatesCopy = initializing ? colorStates : [...colorStates];
    colorStatesCopy.splice(index, 1, state);
    setColorStates([...colorStatesCopy]);

    if (!initializing) {
      let unmatchedSquaresCount = colorStatesCopy.reduce((acc, cur) => {
        let stateCount = colorStatesCopy.filter(
          (colorState) => cur === colorState,
        ).length;
        return 16 - stateCount < acc ? 16 - stateCount : acc;
      }, 16);

      setSquaresRemaining(unmatchedSquaresCount);
    }
  }

  const resetColorStates = () => {
    let freshColorStates = new Array(16).fill(6);
    setColorStates(freshColorStates);
    setSquaresRemaining(16);
  };

  return (
    <ColorStatesContext.Provider
      value={{
        colorStates,
        resetColorStates,
        updateColorStates,
        initializeColorStates,
      }}>
      {children}
    </ColorStatesContext.Provider>
  );
}
