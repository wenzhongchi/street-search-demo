import { combineReducers } from '@reduxjs/toolkit';

import cartReducer from './cart';
import noteReducer from './note';

const rootReducer = combineReducers({
    cart: cartReducer,
    note: noteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
