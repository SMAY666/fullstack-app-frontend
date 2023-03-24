export type OrganizationEvent = {
    id: string;
    title: string;
    description: string;
    dateBegin: number;
    dateEnd: number
    status: 'Open' | 'Close' | 'In Process';
}
