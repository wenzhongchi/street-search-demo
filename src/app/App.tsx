import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { AppNavigator } from '../navigator/AppNavigator';

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <AppNavigator loggedIn={true} />
            </PersistGate>
        </Provider>
    );
};

export default App;
