import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateModal, updateNotification} from './reducer';
import {ModalType, NotificationData} from './types';


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
    const notifications = useNotifications();
    return useCallback((notification: NotificationData) => {
        const newNotifications = Array.from(notifications);
        newNotifications.push(notification);
        dispatch(updateNotification({notifications: newNotifications}));
    }, [dispatch]);
}

export function useRemoveNotification() {
    const dispatch = useAppDispatch();
    const notifications = useNotifications();
    return useCallback((notification: NotificationData) => {
        dispatch(updateNotification({notifications: notifications.filter((item) => item !== notification)}));
    }, [dispatch]);
}
