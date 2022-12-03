import {publicRequest} from './request';

export function login(email: string, passwordHash: string): Promise<any> {
    return publicRequest('POST', 'api/auth/login', {
        email: email,
        passwordHash: passwordHash
    });
}