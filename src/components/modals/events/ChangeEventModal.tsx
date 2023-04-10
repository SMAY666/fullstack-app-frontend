import React, {useEffect, useState} from 'react';
import {AiOutlineWarning} from 'react-icons/ai';

import {updateEvent} from '../../../api/events';
import {
    useAddNotification,
    useChangeMustUpdateEvents,
    useCurrentModalProps,
    useSetModal,
} from '../../../state/application/hooks';
import {ModalType, NotificationType} from '../../../state/application/types';
import {useToken} from '../../../state/user/hooks';
import {getErrorMessage} from '../../../utils/error';
import InputString from '../../InputString';
import BaseModal from '../BaseModal';


export default function ChangeEventModal() {
    const token = useToken();
    const changeMustUpdateEvents = useChangeMustUpdateEvents();

    const modalProps = useCurrentModalProps();
    const setModal = useSetModal();
    const addNotification = useAddNotification();

    const [titleInput, setTitleInput] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [dateBeginInput, setDateBeginInput] = useState('');
    const [dateEndInput, setDateEndInput] = useState('');
    const [status, setStatus] = useState(modalProps.status);

    const [errorMessage, setErrorMessage] = useState('');

    const applyChanges = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        updateEvent(token, modalProps.id, titleInput, descriptionInput, dateBeginInput, dateEndInput, status)
            .then(() => {
                setErrorMessage('');
                setModal(ModalType.NONE);
                changeMustUpdateEvents(true);
                addNotification(
                    NotificationType.SUCCESS,
                    'Событие изменено',
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `${titleInput}<br>${descriptionInput}<br>Дата окончания: ${dateEndInput}<br>Статус: ${status}`);
            })
            .catch((error) => {
                setErrorMessage(getErrorMessage(error));
                addNotification(NotificationType.ERROR, 'Ошибка изменения', errorMessage);
            });
    };
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setTitleInput(modalProps.title);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setDescriptionInput(modalProps.description);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setDateBeginInput(new Date(modalProps.dateBegin.toString()).toLocaleDateString()
            .split('.')
            .reverse()
            .join('-'));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setDateEndInput(new Date(modalProps.dateEnd.toString()).toLocaleDateString()
            .split('.')
            .reverse()
            .join('-'));
    }, []);

    return (
        <BaseModal name="Изменить событие">
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
                    duration-300" type="date" placeholder="Дата начала события" state={dateBeginInput} setState={setDateBeginInput}/>
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
                    duration-300" type="date" placeholder="Дата окончания события" state={dateEndInput} setState={setDateEndInput}/>
                </p>
                <p className="mb-[10px]">
                    Статус:
                    <select name="" id="" onChange={(event) => setStatus(event.target.value)}>
                        <option value={modalProps.status}>Текущий - {modalProps.status}</option>
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                        <option value="In process">In process</option>

                    </select>
                    <AiOutlineWarning className='text-red-700'/> Обратите внимаиние на правильность поля &ldquo;Статус&rdquo;
                </p>
            </div>
            <div className="mt-[30px]">
                <button onClick={() => applyChanges()} className="float-right mr-[20px] border-2 border-blue-400 rounded-md px-[10px] py-[2px] text-blue-400 hover:bg-blue-300 hover:text-white duration-300">Изменить</button>
            </div>
        </BaseModal>
    );
}
