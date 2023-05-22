export type OrganizationEvent = {
    id: string;
    title: string;
    description: string;
    dateBegin: number;
    dateEnd: number;
    status: 'Open' | 'Close' | 'In Process';
    issuedFor: {
        id: number;
    }
}

export type OrganizationEmployee = {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBorn: number;
    post: string;
    salary: number;
    description: string;
    email: string;
    passwordHash: string;
    role: SystemRole;
}

export type OrganizationCustomer = {
    id: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    type: string;
    description: string;
    assignedEmployee: OrganizationEmployee;
    documentsCount: number
}

export type SystemRole = {
    id: number,
    name: string
}
