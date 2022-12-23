import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateModal, addNotification, deleteNotification} from './reducer';
import {ModalType, NotificationData, NotificationType} from './types';


export function useCurrentModal(): ModalType {
    return useAppSelector((state) => state.application.modal);
}

export function useNotifications(): NotificationData[] {
    return useAppSelector((state) => state.application.notifications);
}

export function useSetModal() {
    const dispatch = useAppDispatch();
    return useCallback((modal: ModalType) => {
        dispatch(updateModal({modal}));
    }, [dispatch]);
}

export function useAddNotification() {
    const dispatch = useAppDispatch();
    return useCallback((type: NotificationType, title: string, context: string) => {
        dispatch(addNotification({type, title, context}));
    }, [dispatch]);
}

export function useDeleteNotification() {
    const dispatch = useAppDispatch();
    return useCallback((id: number) => {
        dispatch(deleteNotification({id}));
    }, [dispatch]);
}
