import React, {useState} from 'react';

import {createEvents} from '../../../api/events';
import {useAddNotification, useChangeMustUpdateEvents, useSetModal} from '../../../state/application/hooks';
import {ModalType, NotificationType} from '../../../state/application/types';
import {useToken} from '../../../state/user/hooks';
import {getErrorMessage} from '../../../utils/error';
import InputString from '../../InputString';
import BaseModal from '../BaseModal';


export default function CreateEventModal() {

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateBeginInput, setDateOfBeginInput] = useState('');
    const [dateEndInput, setDateOfEndInput] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const token = useToken();

    const setModal = useSetModal();

    const addNotification = useAddNotification();
    const changeMustUpdateEvents = useChangeMustUpdateEvents();

    const onButtonClick = () => {
        createEvents(token, titleInput, descriptionInput, (new Date(dateBeginInput)).getTime(), (new Date(dateEndInput)).getTime())
            .then(() => {
                setErrorMessage('');
                setModal(ModalType.NONE);
                addNotification(
                    NotificationType.SUCCESS,
                    'Событие создано',
                    `${titleInput}<br>${descriptionInput}<br>Дата окончания: ${dateEndInput}`,
                );
                changeMustUpdateEvents(true);
            })
            .catch((error) => setErrorMessage(getErrorMessage(error)));
    };

    return (
        <BaseModal name="Создать событие">
            <div className="mt-[40px]">
                <p className="mb-[10px]">
                    Заголовок:
                    <InputString className="
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
                    duration-300" type="text" placeholder="Название события" state={titleInput} setState={setTitleInput}/>
                </p>
                <p className="mb-[10px]">
                    Описание:
                    <InputString className="
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
                    duration-300" type="text" placeholder="Описание события" state={descriptionInput} setState={setDescriptionInput}/>
                </p>
                <p className="mb-[10px]">
                    Дата начала:
                    <InputString className="
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
                    duration-300" type="date" placeholder="Дата начала события" state={dateBeginInput} setState={setDateOfBeginInput}/>
                </p>
                <p className="mb-[10px]">
                    Дата окончания:
                    <InputString className="
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
                    duration-300" type="date" placeholder="Дата окончания события" state={dateEndInput} setState={setDateOfEndInput}/>
                </p>
            </div>
            <p>{errorMessage.length > 0 ? <span className="text-red-700">{errorMessage}</span> : null}</p>
            <div className="mt-[30px]">
                <button className="float-right mr-[20px] border-2 border-blue-400 rounded-md px-[10px] py-[2px] text-blue-400 hover:bg-blue-300 hover:text-white duration-300" onClick={onButtonClick}>Создать</button>
            </div>
        </BaseModal>
    );
}
