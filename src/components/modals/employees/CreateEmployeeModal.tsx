import React, {useEffect, useState} from 'react';

import {createEmployee} from '../../../api/employees';
import {getAllRoles} from '../../../api/roles';
import {useAddNotification, useChangeMustUpdateComponent, useSetModal} from '../../../state/application/hooks';
import {ModalType, NotificationType} from '../../../state/application/types';
import {useToken} from '../../../state/user/hooks';
import {SystemRole} from '../../../types';
import {getErrorMessage} from '../../../utils/error';
import InputString from '../../InputString';
import BaseModal from '../BaseModal';


export default function CreateEmployeeModal() {

    const token = useToken();
    const setModal = useSetModal();
    const addNotification = useAddNotification();
    const changeMustUpdateComponent = useChangeMustUpdateComponent();

    const [systemRoles, setSystemRoles] = useState<SystemRole[]>([]);
    const [fullName, setFullName] = useState('');
    const [post, setPost] = useState('');
    const [dateOfBorn, setDateOfBorn] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
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
    }, []);

    const onButtonClick = () => {
        if (password !== confirmPassword) {
            addNotification(
                NotificationType.ERROR,
                'Пароли не совпадают',
                '',
            );
        } else {
            createEmployee(token, fullName, dateOfBorn.toString(), post, +salary, +role, email, password)
                .then(() => {
                    setModal(ModalType.NONE);
                    addNotification(
                        NotificationType.SUCCESS,
                        'Сотрудник создан',
                        `${fullName}<br>${post}<br>ЗП: ${salary}`,
                    );
                    changeMustUpdateComponent(true);
                })
                .catch((error) => {
                    addNotification(
                        NotificationType.ERROR,
                        'Ошибка создания сотрудника',
                        getErrorMessage(error),
                    );
                });
        }
    };

    return (
        <BaseModal name='Создание сотрудника'>
            <div className='mt-[40px]'>
                <p className='mb-[10px]'>
                    ФИО:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        type="text"
                        placeholder='ФИО'
                        state={fullName}
                        setState={setFullName}
                    />
                </p>
                <p className='mb-[10px]'>
                    Должность:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        type="text"
                        placeholder='Должность'
                        state={post}
                        setState={setPost}
                    />
                </p>
                <p className='mb-[10px]'>
                    Дата рождения:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        type="date"
                        placeholder='Должность'
                        state={dateOfBorn}
                        setState={setDateOfBorn}
                    />
                </p>
                <p className='mb-[10px]'>
                    Роль в системе:
                    <select onChange={(event) => setRole(event.target.value)}>
                        {systemRoles.map((sysRole, index) => <option key={index} value={sysRole.id}>{sysRole.name}</option>)}
                    </select>
                </p>
                <p className='mb-[10px]'>
                    Заработная плата:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        type="text"
                        placeholder='Заработная плата'
                        state={salary}
                        setState={setSalary}
                    />
                </p>
                <p className='mb-[10px]'>
                    Email:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        placeholder='Email'
                        type="text"
                        state={email}
                        setState={setEmail}
                    />
                </p>
                <p className='mb-[10px]'>
                    Пароль:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        placeholder='Пароль'
                        type="text"
                        state={password}
                        setState={setPassword}
                    />
                </p>
                <p className='mb-[10px]'>
                    Повторите пароль:
                    <InputString
                        className="
                        flex
                    mx-auto
                    w-[200px]
                    border-b-2
                    bg-slate-50
                    border-black
                    opacity-30
                    outline-0
                    focus:border-blue-400
                    focus:opacity-100
                    duration-300"
                        placeholder='Повторите пароль'
                        type="text"
                        state={confirmPassword}
                        setState={setConfirmPassword}
                    />
                </p>
                <div className="mt-[30px]">
                    <button className="float-right
                    mr-[20px]
                    border-2
                    border-blue-400
                    rounded-md
                    px-[10px]
                    py-[2px]
                    text-blue-400
                    hover:bg-blue-300
                    hover:text-white
                    duration-300" onClick={onButtonClick}>Создать
                    </button>
                </div>
            </div>
        </BaseModal>
    );
}
