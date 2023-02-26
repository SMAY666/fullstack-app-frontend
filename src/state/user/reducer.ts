import {createSlice} from '@reduxjs/toolkit';

import {UserState} from './types';


const initialState: UserState = {
    token: '',
    expirationTime: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken(state, action) {
            state.token = action.payload.token;
        },
        updateExpirationTime(state, action) {
            state.expirationTime = action.payload.expirationTime;
        },
    },
});


export const {updateToken, updateExpirationTime} = userSlice.actions;
export default userSlice.reducer;
