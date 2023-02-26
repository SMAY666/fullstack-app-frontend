import React, {useEffect, useState} from 'react';
import {searchEvents} from '../api/events';
import {useToken} from '../state/user/hooks';
import InputString from '../components/InputString';
import {useChangeMustUpdateEvents, useMustUpdateEvents, useSetModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import EventsTable from '../components/EventsTable';
import {AiOutlineFilter} from 'react-icons/ai';


export default function EventsPage() {
    const [events, setEvents] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [searchInput, setSearchInput] = useState('');


    const token = useToken();
    const setModal = useSetModal();

    const mustUpdateEvents = useMustUpdateEvents();
    const changeMustUpdateEvents = useChangeMustUpdateEvents();

    useEffect(() => {
        if (mustUpdateEvents) {
            changeMustUpdateEvents(false);
        }

        searchEvents(token, searchInput)
            .then(({data: events}) => {
                setEvents(events);
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }, [searchInput, mustUpdateEvents]);


    return (
        <main className="flex flex-col">
            <header className="px-[50px] py-[8px] top-0 fixed bg-white drop-shadow-lg rounded-2xl">
                <div className="flex mx-auto">
                    <button
                        className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300"
                        onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие
                    </button>
                    <InputString
                        className="px-[10px] ml-[20px] w-[500px] border-b-2 outline-0 focus:border-blue-400 duration-300"
                        type="text" placeholder="Поиск..." state={searchInput} setState={setSearchInput}
                    />
                    <button className="ml-[20px]"><AiOutlineFilter
                        className="text-[20px] hover:text-blue-400 duration-300"/></button>
                </div>
            </header>
            <div className="mx-auto mt-[50px] mb-[50px]">
                {events.length === 0 ? <span className="text-red-700">Событий нет</span> :
                    errorMessage.length > 0 ? <span className="text-red-700">{errorMessage}</span> :
                        <EventsTable events={events}/>}
            </div>
        </main>
    );
}
