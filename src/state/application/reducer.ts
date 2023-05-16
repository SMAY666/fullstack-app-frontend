import {createSlice} from '@reduxjs/toolkit';

import {ApplicationState, ModalType} from './types';


const initialState: ApplicationState = {
    modal: ModalType.NONE,
    notifications: [],
    nextId: 0,
    mastUpdateComponent: false,
    props: {},
    loader: false,
};

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        updateModal(state, action) {
            state.modal = action.payload.modal;
        },
        updateModalProps(state, action) {
            state.props = action.payload.props;
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
        changeMustUpdateComponent(state, action) {
            state.mastUpdateComponent = action.payload.mastUpdateComponent;
        },
        updateLoader(state, action) {
            state.loader = action.payload.loader;
        },
    },
});


export const {updateModal, addNotification, deleteNotification, changeMustUpdateComponent, updateModalProps, updateLoader} = applicationSlice.actions;
export default applicationSlice.reducer;
