import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { persistStore, persistReducer, createMigrate } from 'redux-persist';

import rootReducer, { RootState } from './rootReducer';

const migrations = {
    0: (state: any) => {
        return {
            ...state,
        };
    },
};

export const persistConfig = {
    key: 'yieldstreet',
    whitelist: ['search', 'bookmark'],
    storage: AsyncStorage,
    debug: true,
    migrate: createMigrate(migrations, { debug: true }),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default;
        store.replaceReducer(newRootReducer);
    });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
