export type OrganizationEvent = {
    id: number;
    title: string;
    description: string;
    dateOfTheBegining: string;
    dateOfTheEnd: string;
    status: 'Open' | 'Close' | 'In Process';
}
