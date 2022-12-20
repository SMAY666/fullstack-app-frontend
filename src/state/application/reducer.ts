import {createSlice} from '@reduxjs/toolkit';

import {ApplicationState, ModalType, NotificationType} from './types';


const initialState: ApplicationState = {
    modal: ModalType.NONE,
    notification: NotificationType.NONE
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateModal(state, action) {
            state.modal = action.payload.modal;
        },
        updateNotification(state, action) {
            state.notification = action.payload.notification;
        }
    }
});


export const {updateModal, updateNotification} = applicationSlice.actions;
export default applicationSlice.reducer;
