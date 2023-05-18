import {privateRequest} from './request';

export function createEmployee(token: string, fullName: string, dateOfBorn: string, post: string, salary: number, roleId: number, email: string, passwordHash: string): Promise<any> {
    const fullNameSplit = fullName.split(' ');
    const firstName = fullNameSplit[0];
    const middleName = fullNameSplit[1];
    const lastName = fullNameSplit[2];

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

export function getEmployees(token: string, name: string): Promise<any> {
    return privateRequest('GET', `/api/employees/?name=${name}`, token);
}

export function getEmployeeById(token: string, id: string): Promise<any> {
    return privateRequest('GET', `/api/employees/employee?id=${id}`, token);
}

export function deleteEmployee(token: string, id: number): Promise<any> {
    return privateRequest('DELETE', `/api/employees/delete?id=${id}`, token);
}
export function updateEmployee(token: string, id: number, post: string, roleId: number, salary: number, description: string): Promise<any> {
    console.log(id, post, roleId, salary, description);
    return privateRequest('PATCH', `/api/employees/${id}`, token, {
        id,
        post,
        roleId,
        salary,
        description,
    });
}
