import axios, {AxiosRequestConfig} from 'axios';
import {SERVER_URL} from '../consts/server';


function request(config: AxiosRequestConfig<any>): Promise<any> {
    return axios.request(config);
}

export function privateRequest(method: 'GET' | 'POST' | 'DELETE', url: string, token: string, data?: any): Promise<any> {
    return request({
        method,
        baseURL: SERVER_URL,
        url,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        data
    });
}

export function publicRequest(method: 'GET' | 'POST' | 'DELETE', url: string, data?: any): Promise<any> {
    return request({
        method,
        baseURL: SERVER_URL,
        url,
        data
    });
}
