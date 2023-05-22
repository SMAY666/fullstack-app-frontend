import React from 'react';
import {Link} from 'react-router-dom';

import {OrganizationCustomer} from '../../types';
import Customer from './Customer';


type Props = {
    customers: OrganizationCustomer[];
}

export default function CustomersList({customers}: Props) {
    return (
        <div className='grid grid-cols-4 mx-auto'>
            {customers.map((customer, index) => <Link key={index} to={customer && `/lids/${customer.id}`}>
                <Customer key={index} customer={customer}/>
            </Link>,
            )}
        </div>
    );
}
