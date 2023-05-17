import React from 'react';
import {Link} from 'react-router-dom';

import {OrganizationEmployee} from '../../types';
import Employee from './Employee';


type Props = {
    employees: OrganizationEmployee[];
}

export default function EmployeesList({employees}: Props) {
    return (
        <div className='grid grid-cols-4 mx-auto'>
            {employees.map((employee, index) => <Link key={index} to={`/employees/${employee.id}`}>
                <Employee key={index} employee={employee}/>
            </Link>,
            )}
        </div>
    );
}
