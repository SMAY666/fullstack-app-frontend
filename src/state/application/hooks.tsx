import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateModal} from './reducer';
import {ModalType} from './types';


export function useCurrentModal(): ModalType {
    return useAppSelector((state) => state.application.modal);
}

export function useSetModal() {
    const dispatch = useAppDispatch();
    return useCallback((modal: ModalType) => {
        dispatch(updateModal({modal}));
    }, [dispatch]);
}
