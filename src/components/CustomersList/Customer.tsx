import React from 'react';

import {OrganizationCustomer} from '../../types';

type Props = {
    customer: OrganizationCustomer
}

export default function Customer({customer}: Props) {

    const cardStyle = 'w-[250px] h-[250px] ' +
        'mx-[40px] mb-[20px] ' +
        'text-center pt-[10px] ' +
        'shadow-2xl font-[10px] ' +
        'hover:border-b-2 hover:border-blue-400 hover:duration-300';

    return (
        <div className={cardStyle}>
            <div className='flex justify-center'>
                <img className='w-[100px] h-[100px]' src="https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg" alt="Аватар"/>
            </div>
            <div className='grid mt-[10px]'>
                <p>ФИО (Наиминование): {customer.fullName}</p>
                <p> Тип: {customer.type}</p>
            </div>
        </div>
    );
}
