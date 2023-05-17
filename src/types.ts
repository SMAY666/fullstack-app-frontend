export type OrganizationEvent = {
    id: string;
    title: string;
    description: string;
    dateBegin: number;
    dateEnd: number;
    status: 'Open' | 'Close' | 'In Process';
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
    role: {
        id: number;
        name: string;
    };
}

export type SystemRole = {
    id: number,
    name: string
}
