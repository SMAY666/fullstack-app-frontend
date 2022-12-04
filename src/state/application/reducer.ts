import {createSlice} from '@reduxjs/toolkit';

import {ApplicationState, ModalType} from './types';


const initialState: ApplicationState = {
    modal: ModalType.NONE
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateModal(state, action) {
            state.modal = action.payload.modal;
        }
    }
});


export const {updateModal} = applicationSlice.actions;
export default applicationSlice.reducer;
