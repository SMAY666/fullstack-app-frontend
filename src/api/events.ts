import {privateRequest} from './request';


export function fetchEvents(token: string): Promise<any> {
    return privateRequest('GET', '/api/events/', `${token}`);
}
