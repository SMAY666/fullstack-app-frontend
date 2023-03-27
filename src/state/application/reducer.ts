import {createSlice} from '@reduxjs/toolkit';

import {ApplicationState, ModalType} from './types';


const initialState: ApplicationState = {
    modal: ModalType.NONE,
    notifications: [],
    nextId: 0,
    mastUpdateEvents: false,
    loader: false,
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateModal(state, action) {
            state.modal = action.payload.modal;
        },
        addNotification(state, action) {
            state.notifications.push({
                id: state.nextId,
                type: action.payload.type,
                title: action.payload.title,
                context: action.payload.context,
            });
            state.nextId++;
        },
        deleteNotification(state, action) {
            state.notifications = state.notifications.filter((item) => item.id !== action.payload.id);
        },
        changeMustUpdateEvents(state, action) {
            state.mastUpdateEvents = action.payload.mastUpdateEvents;
        },
        updateLoader(state, action) {
            console.log(action.payload.loader);
            state.loader = action.payload.loader;
        },
    },
});


export const {updateModal, addNotification, deleteNotification, changeMustUpdateEvents, updateLoader} = applicationSlice.actions;
export default applicationSlice.reducer;
