import {privateRequest} from './request';

export function createEvents(
    token: string,
    title: string,
    description: string,
    dateBegin: number,
    dateEnd: number,
): Promise<any> {
    return privateRequest('POST', '/api/events/create', `${token}`, {
        title,
        description,
        dateBegin,
        dateEnd,
    });
}

export function getEvents(token: string, value: string, dateFrom: string, dateTo: string, status: string): Promise<any> {
    return privateRequest('GET', `/api/events/?value=${value}&dateFrom=${dateFrom}&dateTo=${dateTo}&status=${status}`, `${token}`);
}

export function deleteEvent(token: string, id: string): Promise<any> {
    return privateRequest('DELETE', `/api/events/delete?id=${id}`, `${token}`);
}
