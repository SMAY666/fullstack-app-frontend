export type OrganizationEvent = {
    id: string;
    title: string;
    description: string;
    dateBegin: string;
    dateEnd: string;
    status: 'Open' | 'Close' | 'In Process';
}
