import React, {useEffect, useState} from 'react';
import {fetchEvents} from '../api/events';
import {useToken} from '../state/user/hooks';
import InputString from '../components/InputString';
import {useSetModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';


export default function EventsPage() {
    let eventsArr = [];

    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const token = useToken();
    const setModal = useSetModal();

    useEffect(() => {
        fetchEvents(token)
            .then((events) => {
                eventsArr = events;
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }, []);

    return (
        <div>
            <header>
                <div className="">
                    <button className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300" onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие</button>
                    <InputString className="px-[10px] ml-[100px] w-[500px] border-b-2 outline-0 focus:border-blue-400 duration-300" type="text" placeholder="Поиск..." state={searchInput} setState={setSearchInput}></InputString>
                </div>
            </header>
        </div>
    );
}
