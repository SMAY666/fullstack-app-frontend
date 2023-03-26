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
    const [dateFromInput, setDateFromInput] = useState('');
    const [dateToInput, setDateToInput] = useState('');


    const token = useToken();
    const setModal = useSetModal();

    const mustUpdateEvents = useMustUpdateEvents();
    const changeMustUpdateEvents = useChangeMustUpdateEvents();

    const [loader, setLoader] = useState(false);
    const [emptyEvents, setEmptyEvents] = useState(false);

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';

    useEffect(() => {
        setEmptyEvents(false);
        setErrorMessage('');
        setLoader(true);
        if (mustUpdateEvents) {
            changeMustUpdateEvents(false);
            setLoader(false);
        }

        searchEvents(token, searchInput)
            .then(({data: events}) => {
                if (events.length === 0) {
                    setEmptyEvents(true);
                }
                setEvents(events as OrganizationEvent[]);
                setLoader(false);
            })
            .catch((error) => {
                setErrorMessage(getErrorMessage(error));
            });
    }, [searchInput, mustUpdateEvents]);


    return (
        <main className="flex-1 flex flex-col">
            <header className="container flex-row top-0 fixed justify-center bg-white drop-shadow-lg rounded-2xl">
                <div className="flex flex-row px-[50px] py-[8px] justify-center">
                    <button
                        className="py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300"
                        onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие
                    </button>
                    <InputString
                        className={'px-[10px] ml-[20px] w-[500px] '.concat(inputStyles)}
                        type="text"
                        placeholder="Поиск..."
                        state={searchInput}
                        setState={setSearchInput}
                    />
                    <button className="ml-[20px]"><AiOutlineFilter
                        className="text-[20px] hover:text-blue-400 duration-300"/>
                    </button>
                </div>
                <div className='flex justify-center my-[10px]'>
                    <p>Дата от:</p>
                    <InputString
                        className={'px-[2px] mx-[10px] w-[100px] '.concat(inputStyles)}
                        type="Date"
                        placeholder="Дата"
                        state={dateFromInput}
                        setState={setDateFromInput}
                    />
                    <p>до:</p>
                    <InputString
                        className={'px-[2px] mx-[10px] w-[100px] '.concat(inputStyles)}
                        type="Date"
                        placeholder="Дата"
                        state={dateToInput}
                        setState={setDateToInput}
                    />
                    <p>Статус:</p>
                    <select className={'px-[2px] mx-[10px] '.concat(inputStyles)}>
                        <option value="">Open</option>
                        <option value="">Close</option>
                        <option value="">In process</option>
                    </select>
                </div>
            </header>
            <div className="mx-auto mt-[150px] mb-[50px]">
                {emptyEvents ? <span className='text-red-700'>Событий нет</span> : <EventsTable events={events}/>}
                {errorMessage.length > 0 && <span className='text-red-700'>{errorMessage}</span>}
            </div>
            {
                loader && <div className='flex justify-center items-center'>
                    <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid text-blue-400 border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div>
                </div>
            }
        </main>
    );
}
