import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {authorize, deauthorize} from './reducer';


export function useIsAuthorized(): boolean {
    return useAppSelector((state) => !!state.user.token);
}

export function useAuthorize() {
    const dispatch = useAppDispatch();
    return useCallback((token: string) => {
        dispatch(authorize({token}));
    }, [dispatch]);
}

export function useToken(): string {
    return useAppSelector((state) => state.user.token);
}

export function useDeauthorize() {
    const dispatch = useAppDispatch();
    return useCallback(() => {
        dispatch(deauthorize());
    }, [dispatch]);
}
