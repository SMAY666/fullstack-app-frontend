import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {login} from '../api';
import InputString from '../components/InputString';
import {useAuthorize, useExpirationTime, useIsAuthorized} from '../state/user/hooks';
import {getErrorMessage} from '../utils/error';


export default function AuthorizationPage() {
    const [loginInput, setLoginInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const authorize = useAuthorize();
    const navigate = useNavigate();

    const onButtonClick = () => {
        login(loginInput, passwordInput)
            .then(({data: {token, expirationTime}}) => {
                authorize(token as string, expirationTime as number);
                navigate('/');
            })
            .catch((error) => {
                setErrorMessage(getErrorMessage(error));
            });
    };

    return (
        <section>
            <div className="container text-center my-52">
                <header className="text-2xl">Добро пожаловать</header>

                <InputString className="mt-8 outline-0 border-b-2 border-blue-300" type='text' placeholder='Логин' state={loginInput} setState={setLoginInput}/><br/>
                <InputString className="mt-8 outline-0 border-b-2 border-blue-300" type='password' placeholder='Пароль' state={passwordInput} setState={setPasswordInput}/><br/>
                <button className="mt-8 font-bold hover:text-blue-300 hover:duration-300" onClick={onButtonClick}>Войти</button><br/>
                {errorMessage === '' ? null : <span className="text-red-700">{errorMessage}</span>}
            </div>
        </section>
    );
}
