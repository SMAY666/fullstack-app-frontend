import React, {useEffect, useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {useNavigate, useParams} from 'react-router-dom';

import {deleteEmployee, getEmployeeById} from '../api/employees';
import {useAddNotification} from '../state/application/hooks';
import {NotificationType} from '../state/application/types';
import {useToken} from '../state/user/hooks';
import {OrganizationEmployee} from '../types';
import {getErrorMessage} from '../utils/error';


export default function SelectedEmployeePage() {

    const token = useToken();
    const {id} = useParams();
    const [employee, setEmployee] = useState<OrganizationEmployee>();
    const [employeeFullName, setEmployeeFullName] = useState('');

    const navigate = useNavigate();
    const addNotification = useAddNotification();

    useEffect(() => {
        if (id !== undefined) {
            getEmployeeById(token, id)
                .then(({data: employee}) => {
                    setEmployee(employee as OrganizationEmployee);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    setEmployeeFullName(employee.firstName.concat(' ', employee.middleName, ' ', employee.lastName));
                })
                .catch((error) => {
                    getErrorMessage(error);
                });
        }
    }, []);

    const deleteEmployeeBtn = (id: number) => {
        if (employee?.id) {
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
    };
    return (
        <main className='container grid'>
            <div className='justify-between mt-[50px]'>
                <div className='flex flex-col float-left ml-[20px]'>
                    <div className='flex'>
                        <p className='font-bold text-[30px]'>{employeeFullName}</p>
                        <button className="mx-[10px]"><AiOutlineEdit className="text-blue-400 text-[20px] hover:text-green-500 duration-300"/></button>
                        <button className="" onClick={() => id ? deleteEmployeeBtn(+id) : deleteEmployeeBtn}><AiOutlineDelete className="text-blue-400 text-[20px] hover:text-red-600 duration-300"/></button>
                    </div>
                    <div className='mt-[10px]'>
                        <p>Дата рождения: {employee?.dateOfBorn}</p>
                        <p>Должность: {employee?.post}</p>
                        <p>Заработная плата: {employee?.salary} руб.</p>
                        <p>Электронная почта: {employee?.email}</p>
                    </div>
                    <div>
                        <p className='text-[20px] mt-[40px]'>Подробная информация</p>
                        <p className='mt-[20px]'>{employee?.description ? employee?.description : <p className='text-red-700'>Подробной информации нет</p>}</p>
                    </div>
                </div>
                <div className='float-right mr-[20px]'>
                    <img className='w-[300px] h-[300px]' src="https://ob-kassa.ru/content/front/buhoskol_tmp1/images/reviews-icon.jpg" alt="Фото профиля"/>
                    <button
                        className="mt-[20px] mx-auto py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300">Создать персональную задачу
                    </button>
                </div>
            </div>
        </main>
    );
}
