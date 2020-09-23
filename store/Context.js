import React from 'react';
import {ColorStatesContextProvider} from './contexts/ColorStatesContext';
import {InitializedContextProvider} from './contexts/InitializedContext';
import {SquaresRemainingContextProvider} from './contexts/SquaresRemainingContext';
import {UserContextProvider} from './contexts/UserContext';
import {TimeContextProvider} from './contexts/TimeContext';

export default function ContextProvider({children}) {
  return (
    <UserContextProvider>
      <InitializedContextProvider>
        <TimeContextProvider>
          <SquaresRemainingContextProvider>
            <ColorStatesContextProvider>{children}</ColorStatesContextProvider>
          </SquaresRemainingContextProvider>
        </TimeContextProvider>
      </InitializedContextProvider>
    </UserContextProvider>
  );
}
