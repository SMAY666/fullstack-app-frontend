import React from 'react';

import {OrganizationEmployee} from '../../types';
import Employee from './Employee';


type Props = {
    employees: OrganizationEmployee[];
}

export default function EmployeesList({employees}: Props) {
    return (
        <div className='mt-[50px] ml-[50px] flex'>
            {employees.map((employee, index) => <Employee key={index} employee={employee}/>)}
        </div>
    );
}
