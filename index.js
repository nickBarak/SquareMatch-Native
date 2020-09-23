/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import ContextProvider from './store/Context';
import React from 'react';

AppRegistry.registerComponent(appName, () => () => (
  <ContextProvider>
    <App />
  </ContextProvider>
));
