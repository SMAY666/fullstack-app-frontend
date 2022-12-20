import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateModal, updateNotification} from './reducer';
import {ModalType, NotificationType} from './types';


export function useCurrentModal(): ModalType {
    return useAppSelector((state) => state.application.modal);
}

export function useSetModal() {
    const dispatch = useAppDispatch();
    return useCallback((modal: ModalType) => {
        dispatch(updateModal({modal}));
    }, [dispatch]);
}

export function useSetNotification() {
    const dispatch = useAppDispatch();
    return useCallback((notification: NotificationType) => {
        dispatch(updateNotification({notification}));
    }, [dispatch]);

}
