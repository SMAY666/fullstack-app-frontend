import {createSlice} from '@reduxjs/toolkit';

import {UserState} from './types';


const initialState: UserState = {
    token: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authorize(state, action) {
            state.token = action.payload.token;
        },
        deauthorize(state) {
            state.token = '';
        }
    }
});


export const {authorize, deauthorize} = userSlice.actions;
export default userSlice.reducer;
