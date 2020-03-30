import { combineReducers } from '@reduxjs/toolkit';

import bookmarkReducer from './bookmark';
import searchReducer from './search';

const rootReducer = combineReducers({
    bookmark: bookmarkReducer,
    search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
