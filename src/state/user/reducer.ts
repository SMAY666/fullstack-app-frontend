import {createSlice} from '@reduxjs/toolkit';

import {UserState} from './types';


const initialState: UserState = {
    token: '',
    userId: 0,
    expirationTime: 0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken(state, action) {
            state.token = action.payload.token;
        },
        updateUserId(state, action) {
            state.userId = action.payload.userId;
        },
        updateExpirationTime(state, action) {
            state.expirationTime = action.payload.expirationTime;
        },
    },
});


export const {updateToken, updateUserId, updateExpirationTime} = userSlice.actions;
export default userSlice.reducer;
