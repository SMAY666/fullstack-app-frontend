export type OrganizationEvent = {
    id: string;
    title: string;
    description: string;
    dateOfTheBegining: string;
    dateOfTheEnd: string;
    status: 'Open' | 'Close' | 'In Process';
}
