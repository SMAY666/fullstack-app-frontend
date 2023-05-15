import React from 'react';

import {OrganizationEmployee} from '../../types';


type Props = {
    employee: OrganizationEmployee;
}

export default function Employee({employee}: Props) {
    return (
        <div className='w-[250px] h-[250px] text-center pt-[10px] shadow-2xl font-[10px] hover:border-2 hover:border-blue-400 hover:duration-300'>
            <div className='flex justify-center'>
                <img className='w-[100px] h-[100px]' src="https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg" alt="Аватар"/>
            </div>
            <div className='grid mt-[10px]'>
                <p>ФИО: {employee.lastName.concat(' ', employee.firstName, ' ', employee.middleName)}</p>
                <p>Должность: {employee.post}</p>
                <p>ЗП: {employee.salary}</p>
                <p>Роль в системе:</p>
            </div>
        </div>
    );
}
