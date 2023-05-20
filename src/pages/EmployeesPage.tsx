import React, {useEffect, useState} from 'react';

import {getEmployeeById, getEmployees} from '../api/employees';
import EmployeesList from '../components/EmployeesList';
import InputString from '../components/InputString';
import Loader from '../components/Loader';
import {
    useAddNotification,
    useChangeMustUpdateComponent,
    useLoader,
    useMustUpdateComponent,
    useSetModal,
    useUpdateLoader,
} from '../state/application/hooks';
import {ModalType, NotificationType} from '../state/application/types';
import {useToken, useUserId} from '../state/user/hooks';
import {OrganizationEmployee} from '../types';
import {getErrorMessage} from '../utils/error';


export default function EmployeesPage() {

    const token = useToken();

    const userId = useUserId();

    const [searchInput, setSearchInput] = useState('');
    const [employees, setEmployees] = useState<OrganizationEmployee[]>([]);
    const [user, setUser] = useState<OrganizationEmployee>();


    const setModal = useSetModal();
    const updateLoader = useUpdateLoader();

    const loader = useLoader();
    const addNotification = useAddNotification();

    const changeMustUpdateComponent = useChangeMustUpdateComponent();
    const mustUpdateComponent = useMustUpdateComponent();

    const search = () => {
        getEmployees(token, searchInput)
            .then(({data: employees}) => {
                setEmployees(employees as OrganizationEmployee[]);
                updateLoader(false);
            })
            .catch((error) => {
                getErrorMessage(error);
            });
    };

    const buttonStyle = 'py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300';
    const buttonAccess = [1, 2, 4];

    useEffect(() => {
        updateLoader(true);
        changeMustUpdateComponent(false);
        getEmployeeById(token, userId.toString())
            .then(({data: user}) => {
                setUser(user as OrganizationEmployee);
            })
            .catch((error) => {
                addNotification(
                    NotificationType.ERROR,
                    'Возникла ошибка',
                    getErrorMessage(error),
                );
            });
        search();
    }, []);

    useEffect(() => {
        updateLoader(true);
        changeMustUpdateComponent(false);
        search();
    }, [mustUpdateComponent, searchInput]);

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';
    return (
        <main className="flex-1 flex flex-col">
            <header className="h-[50px] bg-white drop-shadow-lg">
                <div className="flex flex-row px-[50px] py-[8px] justify-center drop-shadow-lg">
                    <button
                        className={user && buttonAccess.indexOf(user.role.id) !== -1 ? buttonStyle : 'hidden'}
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

            <div className='mt-[20px]'>
                <EmployeesList employees={employees}/>
                {loader && <Loader/>}
            </div>
        </main>
    );
}
