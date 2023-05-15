import React, {useState} from 'react';

import InputString from '../../InputString';
import BaseModal from '../BaseModal';


export default function CreateEmployeeModal() {

    const [fullName, setFullName] = useState('');
    const [post, setPost] = useState('');
    const [dateOfBorn, setDateOfBorn] = useState('');
    const [role, setRole] = useState('');
    const [salary, setSalary] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');



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
                        placeholder='Роль в системе'
                        state={role}
                        setState={setRole}
                    />
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
                    duration-300" >Создать</button>
                </div>
            </div>
        </BaseModal>
    );
}
