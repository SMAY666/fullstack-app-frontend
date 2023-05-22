import React, {useState} from 'react';

import {getCustomers} from '../api/customers';
import CustomersList from '../components/CustomersList';
import InputString from '../components/InputString';
import {ModalType} from '../state/application/types';
import {useToken, useUserId} from '../state/user/hooks';
import {OrganizationCustomer} from '../types';
import {getErrorMessage} from '../utils/error';

export default function CustomersPage() {
    const token = useToken();
    const userId = useUserId();

    const [customers, setCustomers] = useState<OrganizationCustomer[]>();
    const [searchInput, setSearchInput] = useState('');

    const buttonStyle = 'py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300';
    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';

    useState(() => {
        getCustomers(token, '')
            .then(({data: customers}) => {
                setCustomers(customers as OrganizationCustomer[]);
            })
            .catch((error) => {
                getErrorMessage(error);
            });
    });
    return(
        <main className='flex-1 flex flex-col'>
            <header className="h-[50px] bg-white drop-shadow-lg">
                <div className="flex flex-row px-[50px] py-[8px] justify-center drop-shadow-lg">
                    <button className={buttonStyle}>
                        Создать клиента
                    </button>
                    <InputString
                        className={'px-[10px] ml-[20px] w-[500px] '.concat(inputStyles)}
                        type="text"
                        placeholder="Поиск..."
                        state={searchInput}
                        setState={setSearchInput}
                    />
                </div>
            </header>
            <div className='mt-[20px]'>
                <div>
                    {customers && <CustomersList customers={customers}></CustomersList>}
                </div>
            </div>
        </main>
    );

}
