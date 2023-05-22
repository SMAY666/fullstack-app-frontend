import {privateRequest} from './request';

export function getCustomers(token: string, name: string): Promise<any> {
    return privateRequest('GET', '/api/customers/', undefined, token);
}
export function getCustomerById(token: string, id: number): Promise<any> {
    return privateRequest('GET', '/api/customers/customer', {id}, token);
}

export function updateCustomer(token: string, id: number, data: {
    id?: string,
    fullName?: string,
    phoneNumber?: string,
    email?: string,
    type?: string,
    description?: string,
    assignedEmployeeId?: string
}): Promise<any> {
    return privateRequest('PATCH', `/api/customers/${id}/update`, undefined, token, data);
}

export function deleteCustomer(token: string, id: string): Promise<any> {
    return privateRequest('DELETE', '/api/customers/delete', {id}, token);
}
