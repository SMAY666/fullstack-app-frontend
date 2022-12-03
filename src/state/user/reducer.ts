import {createSlice} from '@reduxjs/toolkit';

import {UserState} from './types';


const initialState: UserState = {
    isAuthorized: false,
    token: ''
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateIsAuthorized(state, action) {
            state.isAuthorized = action.payload.isAuthorized;
        },
        updateToken(state, action) {
            state.token = action.payload.token;
        }
    }
});


export const {updateIsAuthorized, updateToken} = userSlice.actions;
export default userSlice.reducer;
