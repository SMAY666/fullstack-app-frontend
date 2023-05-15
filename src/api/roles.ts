import {privateRequest} from './request';

export function getRole(id: number, token: string): Promise<any> {
    return privateRequest('GET', `/api/roles/?id=${id}`, `${token}`);
}
