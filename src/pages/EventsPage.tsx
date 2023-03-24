import React, {useEffect, useState} from 'react';
import {AiOutlineFilter} from 'react-icons/ai';

import {searchEvents} from '../api/events';
import EventsTable from '../components/EventsTable';
import InputString from '../components/InputString';
import {useChangeMustUpdateEvents, useMustUpdateEvents, useSetModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import {useToken} from '../state/user/hooks';
import {OrganizationEvent} from '../types';
import {getErrorMessage} from '../utils/error';


export default function EventsPage() {
    const [events, setEvents] = useState<OrganizationEvent[]>([]);

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
                setEvents(events as OrganizationEvent[]);
                setErrorMessage('');
            })
            .catch((error) => {
                setErrorMessage(getErrorMessage(error));
            });
    }, [searchInput, mustUpdateEvents]);


    return (
        <main className="flex-1 flex flex-col">
            <header className="container top-0 fixed flex justify-center">
                <div className="flex flex-row px-[50px] py-[8px] bg-white drop-shadow-lg rounded-2xl">
                    <button
                        className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300"
                        onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие
                    </button>
                    <InputString
                        className="px-[10px] ml-[20px] w-[500px] border-b-2 outline-0 focus:border-blue-400 duration-300"
                        type="text"
                        placeholder="Поиск..."
                        state={searchInput}
                        setState={setSearchInput}
                    />
                    <button className="ml-[20px]"><AiOutlineFilter
                        className="text-[20px] hover:text-blue-400 duration-300"/>
                    </button>
                </div>
            </header>
            <div className="mx-auto mt-[50px] mb-[50px]">
                {events.length === 0 ? <span className="text-red-700">Событий нет</span>
                    : errorMessage.length > 0 ? <span className="text-red-700">{errorMessage}</span>
                        : <EventsTable events={events}/>}
            </div>
        </main>
    );
}
