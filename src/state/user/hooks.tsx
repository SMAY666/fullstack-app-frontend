import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateToken} from './reducer';


export function useIsAuthorized(): boolean {
    return useAppSelector((state) => !!state.user.token);
}

export function useAuthorize() {
    const dispatch = useAppDispatch();
    return useCallback((token: string) => {
        dispatch(updateToken({token}));
    }, [dispatch]);
}

export function useToken(): string {
    return useAppSelector((state) => state.user.token);
}

export function useDeauthorize() {
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(updateToken({token: ''}));
    }, [dispatch]);
}
