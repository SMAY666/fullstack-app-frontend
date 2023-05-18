import React, {useEffect, useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {useNavigate, useParams} from 'react-router-dom';

import {deleteEmployee, getEmployeeById, updateEmployee} from '../api/employees';
import {getAllRoles} from '../api/roles';
import InputString from '../components/InputString';
import {useAddNotification, useChangeMustUpdateComponent, useMustUpdateComponent} from '../state/application/hooks';
import {NotificationType} from '../state/application/types';
import {useToken} from '../state/user/hooks';
import {OrganizationEmployee, SystemRole} from '../types';
import {getErrorMessage} from '../utils/error';


export default function SelectedEmployeePage() {

    const token = useToken();
    const {id} = useParams();
    const [employee, setEmployee] = useState<OrganizationEmployee>();
    const [employeeFullName, setEmployeeFullName] = useState('');
    const [isRedacting, setIsRedacting] = useState(false);

    const [post, setPost] = useState('');
    const [salary, setSalary] = useState('');
    const [systemRoles, setSystemRoles] = useState<SystemRole[]>([]);
    const [roleId, setRoleId] = useState('');
    const [description, setDescription] = useState('');

    const [passportSeries, setPassportSeries] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    const [residenceAddress, setResidenceAddress] = useState('');
    const navigate = useNavigate();
    const addNotification = useAddNotification();

    const changeMustUpdateComponent = useChangeMustUpdateComponent();
    const mustUpdateComponent = useMustUpdateComponent();

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';

    const openCloseRedactor = () => {
        setIsRedacting(!isRedacting);
        getAllRoles(token)
            .then(({data: sysRoles}) => {
                setSystemRoles(sysRoles as SystemRole[]);
            })
            .catch((error) => {
                addNotification(
                    NotificationType.ERROR,
                    'Ошибка',
                    getErrorMessage(error),
                );
            });

    };

    useEffect(() => {
        setDescription(`Паспорт серия ${passportSeries} номер ${passportNumber}<br>Адрес прописки: ${residenceAddress}`);
    }, [passportSeries, passportNumber, residenceAddress]);

    useEffect(() => {
        changeMustUpdateComponent(false);
        if (id !== undefined) {
            getEmployeeById(token, id)
                .then(({data: employee}) => {
                    setEmployee(employee as OrganizationEmployee);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setPost(employee?.post);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setSalary(employee?.salary);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    // setRoleId(employee?.role.id);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setEmployeeFullName(employee.firstName.concat(' ', employee.middleName, ' ', employee.lastName));
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setDescription(employee?.description);
                })
                .catch((error) => {
                    getErrorMessage(error);
                });
        } else {
            navigate('/employees');
        }
    }, [mustUpdateComponent]);

    const saveChange = () => {
        if (employee?.id) {
            updateEmployee(token, +employee.id, post, +roleId, +salary, description)
                .then(() => {
                    setIsRedacting(false);
                    changeMustUpdateComponent(true);
                    addNotification(
                        NotificationType.SUCCESS,
                        'Данные о сотруднике обновлены',
                        '',
                    );
                })
                .catch((error) => {
                    addNotification(
                        NotificationType.ERROR,
                        'Ошибка обновления',
                        getErrorMessage(error),
                    );
                });
        }
    };

    const deleteEmployeeBtn = () => {
        if (employee?.id) {
            // eslint-disable-next-line no-restricted-globals
            const acceptDelete = confirm(`Вы действительно хотите удалить сотрудника ${employeeFullName}?`);
            if (acceptDelete) {
                deleteEmployee(token, +employee.id)
                    .then(() => {
                        navigate('/employees');
                        addNotification(
                            NotificationType.SUCCESS,
                            'Сотрудник удален',
                            `Сотрудник ${employeeFullName} удален`,
                        );
                    })
                    .catch((error) => {
                        addNotification(
                            NotificationType.ERROR,
                            'Не удалось удалить сотрудника',
                            getErrorMessage(error),
                        );
                    });
            }
        }
    };
    return (
        <main className='container grid'>
            <div className='justify-between mt-[50px]'>
                <div className='flex flex-col float-left ml-[20px]'>
                    <div className='flex'>
                        <p className='font-bold text-[30px]'>{employeeFullName}</p>
                        <button className="mx-[10px]" onClick={() => openCloseRedactor()}><AiOutlineEdit className={isRedacting ? 'text-green-500 text-[20px]' : 'text-blue-400 text-[20px] hover:text-green-500 duration-300'}/></button>
                        <button className="" onClick={() => deleteEmployeeBtn}><AiOutlineDelete className="text-blue-400 text-[20px] hover:text-red-600 duration-300"/></button>
                    </div>
                    <div className='mt-[10px]'>
                        <p>Дата рождения: {employee?.dateOfBorn}</p>
                        <p>Должность: {isRedacting ? <InputString className={'px-[10px] w-[200px] '.concat(inputStyles)} type='text' state={post} setState={setPost}/> : employee?.post}</p>
                        <p>Заработная плата: {isRedacting ? <InputString className={'px-[10px] w-[100px] '.concat(inputStyles)} type='text' state={salary} setState={setSalary}/> : employee?.salary} руб.</p>
                        <p>Электронная почта: {employee?.email}</p>
                        {isRedacting && <p>Роль в сисетеме: <select
                            onChange={(event) => setRoleId(event.target.value)}>{systemRoles.map((sysRole, index) => <option key={index} value={sysRole.id}>{
                                sysRole.name}
                            </option>)}
                            <option value={employee?.role.id}>Текущая - {employee?.role.name}</option>
                        </select></p>}
                    </div>
                    <div>
                        <p className='text-[20px] mt-[40px]'>Подробная информация</p>
                        <div className='mt-[20px]'>{!isRedacting ? employee?.description ? employee.description : <p className='text-red-700'>Подробной информации нет</p> : <div>
                            <p>Паспорт серия
                                {<InputString className={'px-[10px] w-[70px] '.concat(inputStyles)} type='text' state={passportSeries} setState={setPassportSeries}/>}
                                номер
                                {<InputString className={'px-[10px] w-[70px] '.concat(inputStyles)} type='text' state={passportNumber} setState={setPassportNumber}/>}
                                <p>Адрес прописки: {<InputString className={'px-[10px] w-[300px] '.concat(inputStyles)} type='text' state={residenceAddress} setState={setResidenceAddress}/>}</p>
                            </p>
                        </div>}</div>
                    </div>
                </div>
                <div className='float-right mr-[20px]'>
                    <img className='w-[300px] h-[300px]' src="https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg" alt="Фото профиля"/>
                    <button
                        className="mt-[20px] mx-auto py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300">Создать персональную задачу
                    </button>
                </div>
            </div>
            <div>
                {isRedacting && <button className='ml-[20px] mt-[20px] mx-auto py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300'
                    onClick={() => saveChange()}>Сохранить изменения</button>}
            </div>
        </main>
    );
}
