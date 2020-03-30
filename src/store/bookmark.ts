import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Bookmark } from '../types/types';
import { AppThunk } from './store';

interface BookmarkState {
    bookmarks: Bookmark[];
    error: string | null;
}

export interface BookmarkPayload {
    bookmark: Bookmark;
}

interface BookmarkError {
    error: string | null;
}

const INITIAL_STATE: BookmarkState = {
    bookmarks: [],
    error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, action: PayloadAction<BookmarkPayload>) => {
            const { bookmark } = action.payload;
            state.bookmarks.push(bookmark);
        },
        addSuccess: state => {
            state.error = null;
        },
        addFailure: (state, action: PayloadAction<BookmarkError>) => {
            const { error } = action.payload;
            state.error = error;
        },
        remove: (state, action: PayloadAction<BookmarkPayload>) => {
            const { bookmark } = action.payload;
            state.bookmarks = state.bookmarks.filter(eachBookmark => eachBookmark.treeId !== bookmark.treeId);
        },
        removeSuccess: state => {
            state.error = null;
        },
        removeFailure: (state, action: PayloadAction<BookmarkError>) => {
            const { error } = action.payload;
            state.error = error;
        },
    },
});

export const { add, addSuccess, addFailure, remove, removeSuccess, removeFailure } = cartSlice.actions;
export default cartSlice.reducer;

export const addBookmark = (bookmark: Bookmark): AppThunk => async dispatch => {
    try {
        dispatch(add({ bookmark }));
        addSuccess();
    } catch (error) {
        dispatch(addFailure(error.toString()));
    }
};

export const removeBookmark = (bookmark: Bookmark): AppThunk => async dispatch => {
    try {
        dispatch(remove({ bookmark }));
        removeSuccess();
    } catch (error) {
        dispatch(removeFailure(error.toString()));
    }
};
