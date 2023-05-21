import {privateRequest} from './request';

export function createEvents(token: string, data: {
                                 title: string,
                                 description: string,
                                 dateBegin: number,
                                 dateEnd: number,
                                 issuedFor?: number,
                             },
): Promise<any> {
    return privateRequest('POST', '/api/events/create', undefined, `${token}`, data);
}

export function getEvents(
    token: string,
    value?: string,
    dateFrom?: string,
    dateTo?: string,
    status?: string,
    issuedFor?: number,
): Promise<any> {
    const url = '/api/events';
    return privateRequest('GET', url, {
        value,
        dateFrom,
        dateTo,
        status,
        issuedFor,
    }, token);
}

export function updateEvent(
    token: string,
    id: number,
    title: string,
    description: string,
    dateBegin: string,
    dateEnd: string,
    status: string,
): Promise<any> {
    return privateRequest('PATCH', `/api/events/${id}/update`, undefined, token, {
        id,
        title,
        description,
        dateBegin,
        dateEnd,
        status,
    });
}

export function deleteEvent(token: string, id: string): Promise<any> {
    return privateRequest('DELETE', '/api/events/delete', {id}, `${token}`);
}
