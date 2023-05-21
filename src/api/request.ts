import axios, {AxiosRequestConfig} from 'axios';

import {SERVER_URL} from '../constants/server';


function request(config: AxiosRequestConfig): Promise<any> {
    return axios.request(config);
}

export function privateRequest(method: 'GET' | 'POST' | 'DELETE' | 'PATCH', url: string, params: any, token: string, data?: any): Promise<any> {
    return request({
        method,
        baseURL: SERVER_URL,
        url,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        data,
        params,
    });
}

export function publicRequest(method: 'GET' | 'POST' | 'DELETE' | 'PATCH', url: string, params: any, data?: any): Promise<any> {
    return request({
        method,
        baseURL: SERVER_URL,
        url,
        params,
        data,
    });
}
