import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Product, Cart, Note } from '../types/types';
import { AppThunk } from './store';

interface NoteState {
    notes: Note[];
    error: string | null;
}

export interface NotePayload {
    note: Note;
}

interface NoteErrorState {
    error: string | null;
}

const INITIAL_STATE: NoteState = {
    notes: [],
    error: null,
};

const noteSlice = createSlice({
    name: 'note',
    initialState: INITIAL_STATE,
    reducers: {
        add: (state, action: PayloadAction<NotePayload>) => {
            const { note } = action.payload;

            console.log(note);
            if (note) {
                state.notes.push(note);
            }
        },
        cartSuccess: state => {
            state.error = null;
        },
        cartFailure: (state, action: PayloadAction<NoteErrorState>) => {
            const { error } = action.payload;
            state.error = error;
        },
        edit: (state, action: PayloadAction<NotePayload>) => {
            const { note } = action.payload;
            const newNote = _.find(state.notes, { id: note.id });

            if (newNote) {
                newNote.title = note.title;
                newNote.content = note.content;
                state.notes = _.filter(state.notes, { id: note.id });
                state.notes.push(newNote);
            }
        },
        remove: (state, action: PayloadAction<NotePayload>) => {},
    },
});

export const { add, cartSuccess, cartFailure, remove, edit } = noteSlice.actions;
export default noteSlice.reducer;

export const addNote = (note: Note): AppThunk => async dispatch => {
    try {
        console.log('testing');
        dispatch(add({ note }));
        cartSuccess();
    } catch (err) {
        dispatch(cartFailure(err.toString()));
    }
};

export const editNote = (note: Note): AppThunk => async dispatch => {
    try {
        dispatch(edit({ note }));
        cartSuccess();
    } catch (err) {
        dispatch(cartFailure(err.toString()));
    }
};
