import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Search } from '../types/types';
import { AppThunk } from './store';

interface SearchState {
    searches: Search[];
    error: string | null;
}

export interface SearchPayload {
    search: Search;
}

interface SearchError {
    error: string | null;
}

const INITIAL_STATE: SearchState = {
    searches: [],
    error: null,
};

const searchSlice = createSlice({
    name: 'note',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, action: PayloadAction<SearchPayload>) => {
            const { search } = action.payload;
            state.searches.push(search);
        },
        addSuccess: state => {
            state.error = null;
        },
        addFailure: (state, action: PayloadAction<SearchError>) => {
            const { error } = action.payload;
            state.error = error;
        },
        remove: (state, action: PayloadAction<SearchPayload>) => {
            const { search } = action.payload;
            state.searches = _.filter(state.searches, eachSearch => {
                return search.name !== eachSearch.name;
            });
        },
        removeSuccess: state => {
            state.error = null;
        },
        removeFailure: (state, action: PayloadAction<SearchError>) => {
            const { error } = action.payload;
            state.error = error;
        },
    },
});

export const { add, addSuccess, addFailure, remove, removeSuccess, removeFailure } = searchSlice.actions;
export default searchSlice.reducer;

export const addSearch = (search: Search): AppThunk => async dispatch => {
    try {
        console.log('testing');
        dispatch(add({ search }));
        addSuccess();
    } catch (error) {
        dispatch(addFailure(error.toString()));
    }
};

export const removeSearch = (search: Search): AppThunk => async dispatch => {
    try {
        dispatch(remove({ search }));
        removeSuccess();
    } catch (error) {
        dispatch(removeFailure(error.toString()));
    }
};
