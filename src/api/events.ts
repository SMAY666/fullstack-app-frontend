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

export function updateEvent(token: string, id: number, title: string, description: string, dateBegin: string, dateEnd: string, status: string): Promise<any> {
    return privateRequest('PATCH', `/api/events/${id}/update`, `${token}`, {
        id,
        title,
        description,
        dateBegin,
        dateEnd,
        status,
    });
}

export function deleteEvent(token: string, id: string): Promise<any> {
    return privateRequest('DELETE', `/api/events/delete?id=${id}`, `${token}`);
}
