import {createSlice} from '@reduxjs/toolkit';

import {ApplicationState, ModalType} from './types';


const initialState: ApplicationState = {
    modal: ModalType.NONE,
    notifications: []
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateModal(state, action) {
            state.modal = action.payload.modal;
        },
        updateNotification(state, action) {
            state.notifications = action.payload.notifications;
        }
    }
});


export const {updateModal, updateNotification} = applicationSlice.actions;
export default applicationSlice.reducer;
