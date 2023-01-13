import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateExpirationTime, updateToken} from './reducer';


export function useIsAuthorized(): boolean {
    return useAppSelector((state) => state.user.expirationTime > Date.now());
}

export function useAuthorize() {
    const dispatch = useAppDispatch();
    return useCallback((token: string, expirationTime: number) => {
        dispatch(updateToken({token}));
        dispatch(updateExpirationTime({expirationTime}));
    }, [dispatch]);
}

export function useToken(): string {
    return useAppSelector((state) => state.user.token);
}
export function useExpirationTime(): number {
    return useAppSelector((state) => state.user.expirationTime);
}


export function useDeauthorize() {
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(updateToken({token: ''}));
        dispatch(updateExpirationTime({expirationTime: 0}));
    }, [dispatch]);
}
