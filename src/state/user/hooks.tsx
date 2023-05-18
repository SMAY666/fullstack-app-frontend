import jwtDecode from 'jwt-decode';
import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateExpirationTime, updateToken, updateUserId} from './reducer';
import {Token} from './types';


export function useIsAuthorized(): boolean {
    return useAppSelector((state) => state.user.expirationTime > Date.now());
}

export function useAuthorize() {
    const dispatch = useAppDispatch();
    return useCallback((token: string, expirationTime: number) => {
        console.log(token);
        dispatch(updateToken({token}));

        dispatch(updateUserId({userId: jwtDecode<Token>(token).userId}));
        dispatch(updateExpirationTime({expirationTime}));
    }, [dispatch]);
}

export function useToken(): string {
    return useAppSelector((state) => state.user.token);
}
export function useExpirationTime(): number {
    return useAppSelector((state) => state.user.expirationTime);
}
export function useUserId(): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return useAppSelector((state) => state.user.userId);
}

export function useDeauthorize() {
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(updateToken({token: ''}));
        dispatch(updateExpirationTime({expirationTime: 0}));
    }, [dispatch]);
}
