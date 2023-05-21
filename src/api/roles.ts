import {privateRequest} from './request';

export function getAllRoles(token: string): Promise<any> {
    return privateRequest('GET', '/api/roles/', undefined, `${token}`);
}
