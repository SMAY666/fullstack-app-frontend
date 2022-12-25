import {privateRequest} from './request';


export function fetchEvents(token: string): Promise<any> {
    return privateRequest('GET', '/api/events/', `${token}`);
}

export function createEvents(token: string, title: string, description: string, dateBegin: number, dateEnd: number): Promise<any> {
    return privateRequest('POST', '/api/events/create', `${token}`, {
        title,
        description,
        dateBegin,
        dateEnd
    });
}

export function searchEvents(token: string, value: string): Promise<any> {
    return privateRequest('GET', `/api/events/search?value=${value}`, `${token}`);
}

export function deleteEvent(token: string, id: string): Promise<any> {
    return privateRequest('DELETE', `/api/events/delete?id=${id}`, `${token}`);
}
