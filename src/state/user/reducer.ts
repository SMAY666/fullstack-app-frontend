import {createSlice} from '@reduxjs/toolkit';

import {UserState} from './types';


const initialState: UserState = {
    token: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateToken(state, action) {
            state.token = action.payload.token;
        }
    }
});


export const {updateToken} = userSlice.actions;
export default userSlice.reducer;
