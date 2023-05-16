import {privateRequest} from './request';

export function createEmployee(token: string, fullName: string, dateOfBorn: string, post: string, salary: number, roleId: number, email: string, passwordHash: string): Promise<any> {
    const fullNameSplit = fullName.split(' ');
    const firstName = fullNameSplit[2];
    const middleName = fullNameSplit[1];
    const lastName = fullNameSplit[0];

    return privateRequest('POST', '/api/employees/register', token, {
        firstName,
        middleName,
        lastName,
        dateOfBorn,
        post,
        salary,
        roleId,
        email,
        passwordHash,
    });
}

export function getEmployees(token: string): Promise<any> {
    return privateRequest('GET', '/api/employees/', token);
}
