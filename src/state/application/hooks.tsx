import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {
    addNotification,
    changeMustUpdateComponent,
    deleteNotification,
    updateLoader,
    updateModal,
    updateModalProps,
} from './reducer';
import {ModalType, NotificationData, NotificationType} from './types';


export function useCurrentModal(): ModalType {
    return useAppSelector((state) => state.application.modal);
}
export function useCurrentModalProps(): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useAppSelector((state) => state.application.props);
}

export function useNotifications(): NotificationData[] {
    return useAppSelector((state) => state.application.notifications);
}

export function useMustUpdateComponent(): boolean {
    return useAppSelector((state) => state.application.mastUpdateComponent);
}

export function useLoader(): boolean {
    return useAppSelector((state) => state.application.loader);
}

export function useSetModal() {
    const dispatch = useAppDispatch();
    return useCallback((modal: ModalType, props?: any) => {
        props && dispatch(updateModalProps({props}));
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

export function useChangeMustUpdateComponent() {
    const dispatch = useAppDispatch();
    return useCallback((mastUpdateComponent: boolean) => {
        dispatch(changeMustUpdateComponent({mastUpdateComponent}));
    }, [dispatch]);
}

export function useUpdateLoader() {
    const dispatch = useAppDispatch();
    return useCallback((loader: boolean) => {
        dispatch(updateLoader({loader}));
    }, [dispatch]);
}
