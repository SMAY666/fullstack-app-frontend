import {privateRequest} from './request';


export function fetchEvents(token: string): Promise<any> {
    return privateRequest('GET', '/api/events/', `${token}`);
}
export function createEvents(token: string, title: string, description: string, dateOfBegin: string, dateOfEnd: string): Promise<any> {
    return privateRequest('POST', '/api/events/create', `${token}`, {
        title: title,
        description: description,
        dateOfTheBegining: dateOfBegin,
        dateOfTheEnd: dateOfEnd
    })
}
