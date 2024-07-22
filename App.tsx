import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/components/router/Navigation/stackNavigation';
import {Provider} from 'react-redux';

import store, { persistor } from "./src/components/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};
export default App;
