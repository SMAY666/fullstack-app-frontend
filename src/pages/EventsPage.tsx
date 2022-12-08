import React, {useEffect, useState} from 'react';
import {fetchEvents} from '../api/events';
import {useToken} from '../state/user/hooks';
import InputString from '../components/InputString';
import {useSetModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import EventsTable from '../components/EventsTable';


export default function EventsPage() {
    const [events, setEvents] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');

    const token = useToken();
    const setModal = useSetModal();

    useEffect(() => {
        fetchEvents(token)
            .then(({data: events}) => {
                setEvents(events);
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }, []);

    return (
        <main className="flex flex-col">
            <header className="px-[50px] py-[8px] top-0 fixed bg-white drop-shadow-lg rounded-2xl">
                <div className="">
                    <button className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300" onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие</button>
                    <InputString className="px-[10px] ml-[20px] w-[500px] border-b-2 outline-0 focus:border-blue-400 duration-300" type="text" placeholder="Поиск..." state={searchInput} setState={setSearchInput}/>
                </div>
            </header>
            <div className="mx-auto mt-[50px]">
                {events.length === 0 ? <span className="text-red-700">Событий нет</span> : <EventsTable events={events}/>}
            </div>
        </main>
    );
}
