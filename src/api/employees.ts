import {privateRequest} from './request';

export function getEmployees(token: string): Promise<any> {
    return privateRequest('GET', '/api/employees/', token);
}
