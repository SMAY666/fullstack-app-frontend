import {useCallback} from 'react';

import {useAppDispatch, useAppSelector} from '../hooks';
import {updateIsAuthorized, updateToken} from './reducer';


export function useIsAuthorized(): boolean {
    return useAppSelector((state) => state.user.isAuthorized);
}

export function useUpdateIsAuthorized() {
    const dispatch = useAppDispatch();
    return useCallback((isAuthorized: boolean) => {
        dispatch(updateIsAuthorized({isAuthorized}));
    }, [dispatch]);
}
export function useToken(): string {
    return useAppSelector((state) => state.user.token);
}

export function useUpdateToken() {
    const dispatch = useAppDispatch();
    return useCallback((token: string) => {
        dispatch(updateToken({token}));
    }, [dispatch]);
}
