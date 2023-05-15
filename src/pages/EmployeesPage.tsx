import React, {useEffect, useState} from 'react';

import {getEmployees} from '../api/employees';
import EmployeesList from '../components/EmployeesList';
import InputString from '../components/InputString';
import {useSetModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import {useToken} from '../state/user/hooks';
import {OrganizationEmployee} from '../types';
import {getErrorMessage} from '../utils/error';


export default function EmployeesPage() {

    const token = useToken();

    const [searchInput, setSearchInput] = useState('');
    const [employees, setEmployees] = useState<OrganizationEmployee[]>([]);

    const setModal = useSetModal();


    useEffect(() => {
        getEmployees(token)
            .then(({data: employees}) => {
                setEmployees(employees as OrganizationEmployee[]);
                console.log(employees);
            })
            .catch((error) => {
                getErrorMessage(error);
            });
    }, []);

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';
    return (
        <main className="flex-1 flex flex-col">
            <header className="bg-white drop-shadow-lg">
                <div className="flex flex-row px-[50px] py-[8px] justify-center drop-shadow-lg">
                    <button
                        className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300"
                        onClick={() => setModal(ModalType.CREATE_EMPLOYEE)}>Создать сотрудника
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

            <div>
                <EmployeesList employees={employees}/>
            </div>
        </main>
    );
}
