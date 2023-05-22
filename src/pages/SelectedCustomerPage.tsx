import React, {useEffect, useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {Link, useParams} from 'react-router-dom';

import {deleteCustomer, getCustomerById, updateCustomer} from '../api/customers';
import {getEmployees} from '../api/employees';
import Employee from '../components/EmployeesList/Employee';
import InputString from '../components/InputString';
import {useAddNotification, useChangeMustUpdateComponent, useMustUpdateComponent} from '../state/application/hooks';
import {NotificationType} from '../state/application/types';
import {useToken} from '../state/user/hooks';
import {OrganizationCustomer, OrganizationEmployee} from '../types';
import {getErrorMessage} from '../utils/error';


export default function SelectedCustomerPage() {

    const token = useToken();
    const {id} = useParams();

    const addNotification = useAddNotification();

    const [customer, setCustomer] = useState<OrganizationCustomer>();

    const [isRedacting, setIsRedacting] = useState(false);

    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [assignedEmployeeId, setAssignedEmployeeId] = useState('');
    const [employees, setEmployees] = useState<OrganizationEmployee[]>();
    const [assignedEmployee, setAssignedEmployee] = useState<OrganizationEmployee>();

    const mustUpdateComponent = useMustUpdateComponent();
    const changeMustUpdateComponent = useChangeMustUpdateComponent();


    const controlsBtnStyle = 'text-[20px] duration-300 text-blue-300';

    const openCloseRedacting = () => {
        setIsRedacting(!isRedacting);
    };


    useEffect(() => {
        if (id) {
            getCustomerById(token, +id)
                .then(({data: customer}) => {
                    changeMustUpdateComponent(false);
                    setCustomer(customer as OrganizationCustomer);
                    console.log(customer);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setFullName(customer.fullName);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setPhoneNumber(customer.phoneNumber);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setEmail(customer.email);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setType(customer.type);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setDescription(customer.description);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setAssignedEmployee(customer.assignedEmployee);
                })
                .catch((error) => {
                    addNotification(
                        NotificationType.ERROR,
                        'Что-то пошло не так',
                        getErrorMessage(error),
                    );
                });
        }
    }, [mustUpdateComponent]);

    useEffect(() => {
        getEmployees(token)
            .then(({data: employees}) => {
                setEmployees(employees as OrganizationEmployee[]);
            })
            .catch((error) => {
                addNotification(
                    NotificationType.ERROR,
                    'Что-то пошло не так',
                    getErrorMessage(error),
                );
            });
    }, [isRedacting]);

    const deleteCustomerBtn = () => {
        changeMustUpdateComponent(true);
        if (id && customer) {
            // eslint-disable-next-line no-restricted-globals
            const acceptDelete = confirm(`Вы действительно хотите удалить клиента ${customer.fullName}?`);
            if (acceptDelete) {
                deleteCustomer(token, id)
                    .then(() => {
                        addNotification(
                            NotificationType.SUCCESS,
                            'Клиент удален',
                            '',
                        );
                    })
                    .catch((error) => {
                        addNotification(
                            NotificationType.ERROR,
                            'Что-то пошло не так',
                            getErrorMessage(error),
                        );
                    });
            }
        }
    };

    const saveChange = () => {
        changeMustUpdateComponent(true);
        if (id) {
            updateCustomer(token, +id, {
                id,
                fullName,
                phoneNumber,
                email,
                type,
                description,
                assignedEmployeeId,
            })
                .then(() => {
                    changeMustUpdateComponent(true);
                    addNotification(
                        NotificationType.SUCCESS,
                        'Клиент обновлен успешно',
                        '',
                    );
                })
                .catch((error) => {
                    addNotification(
                        NotificationType.ERROR,
                        'Что-то пошло не так',
                        getErrorMessage(error),
                    );
                });
        }
    };

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';

    return (
        <main className='container grid'>
            <div className='justify-between mt-[50px]'>
                <div className='flex flex-col float-left ml-[20px] w-[650px]'>
                    <div className='flex'>
                        <p className='font-bold text-[30px]'>ФИО (Наиминование): {isRedacting
                            ? <InputString className={'px-[10px] w-[200px] '.concat(inputStyles)} type='text' state={fullName} setState={setFullName}/> : customer?.fullName}</p>
                        <button className="mx-[10px]" onClick={() => openCloseRedacting()}><AiOutlineEdit
                            className={isRedacting ? controlsBtnStyle.concat(' text-green-500') : controlsBtnStyle.concat(' hover:text-green-500')}/>
                        </button>
                        <button onClick={() => deleteCustomerBtn()}><AiOutlineDelete className={controlsBtnStyle.concat(' hover:text-red-400')}/></button>
                    </div>
                    <div className='mt-[10px]'>
                        <p>E-mail: {isRedacting ? <InputString className={'px-[10px] w-[200px] '.concat(inputStyles)} type='text' state={email} setState={setEmail}/> : customer?.email}</p>
                        <p>Номер телефона: {isRedacting ? <InputString className={'px-[10px] w-[200px] '.concat(inputStyles)} type='text' state={phoneNumber} setState={setPhoneNumber}/> : customer?.phoneNumber}</p>
                        <p>Тип: {isRedacting ? <select onChange={(event) => setType(event.target.value)} name="" id="">
                            <option value={customer?.type}>Текущий-{customer?.type}</option>
                            <option value="Физ. лицо">Физ. лицо</option>
                            <option value="Юр. лицо">Юр. лицо</option>
                        </select> : customer?.type ? customer.type : 'Не задан'}</p>
                        <p>Документов в организации: {customer?.documentsCount}</p>
                    </div>
                    <div>
                        <p className='text-[20px] mt-[40px]'>Подробная информация</p>
                        <div className='mt-[20px]'>
                            {isRedacting ? <InputString className={'px-[10px] w-[200px] '.concat(inputStyles)} type='text' state={description} setState={setDescription}/> : customer?.description
                                ? <p>{customer?.description}</p> : <p className='text-red-700'>Подробной информации нет</p>}
                        </div>
                    </div>
                </div>
                <div className='float-right mr-[20px] '>
                    <img className='w-[300px] h-[300px] mb-[20px]' src="https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg" alt="Фото профиля"/>
                    <p>Сопроваждающий сотрудник</p>
                    {!isRedacting && assignedEmployee &&
                        <Link to={`/employees/${assignedEmployee.id}`}>
                            <Employee employee={assignedEmployee}></Employee>
                        </Link>}
                    {isRedacting &&
                        <select onChange={(event) => setAssignedEmployeeId(event.target.value)} name="" id="">
                            <option value="">Выбрать</option>
                            {employees?.map((employee, index) => <option key={index} value={employee.id}>{employee.firstName.concat(' ', employee.middleName)}</option>)}
                        </select>}
                </div>
            </div>
            <div>
                {isRedacting && <button
                    className='ml-[20px] mt-[20px] mx-auto py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300'
                    onClick={() => saveChange()}>Сохранить изменения</button>}
            </div>
        </main>
    );
}
