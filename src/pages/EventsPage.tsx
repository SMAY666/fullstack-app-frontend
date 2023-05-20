import React, {useEffect, useState} from 'react';

import {getEmployeeById} from '../api/employees';
import {getEvents} from '../api/events';
import EventsTable from '../components/EventsTable';
import InputString from '../components/InputString';
import Loader from '../components/Loader';
import {
    useAddNotification,
    useChangeMustUpdateComponent,
    useLoader,
    useMustUpdateComponent,
    useSetModal,
    useUpdateLoader,
} from '../state/application/hooks';
import {ModalType, NotificationType} from '../state/application/types';
import {useToken, useUserId} from '../state/user/hooks';
import {OrganizationEmployee, OrganizationEvent} from '../types';
import {getErrorMessage} from '../utils/error';


export default function EventsPage() {
    const [events, setEvents] = useState<OrganizationEvent[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const [searchInput, setSearchInput] = useState('');
    const [dateFromInput, setDateFromInput] = useState('');
    const [dateToInput, setDateToInput] = useState('');
    const [status, setStatus] = useState('');


    const token = useToken();
    const setModal = useSetModal();
    const userId = useUserId();

    const [user, setUser] = useState<OrganizationEmployee>();
    const addNotification = useAddNotification();

    const mustUpdateComponent = useMustUpdateComponent();
    const changeMustUpdateComponent = useChangeMustUpdateComponent();

    const loader = useLoader();
    const updateLoader = useUpdateLoader();

    const [emptyEvents, setEmptyEvents] = useState(false);

    const inputStyles = 'border-b-2 outline-0 text-[14px] focus:border-blue-400 duration-300';
    const buttonStyle = 'py-[5px] px-[10px] border-2 rounded-md hover:text-blue-400 hover:border-blue-400 duration-300';
    const buttonAccess = [1, 2, 4];

    const search = () => {
        getEvents(token, searchInput, dateFromInput, dateToInput, status)
            .then(({data: events}) => {
                if (events.length === 0) {
                    setEmptyEvents(true);
                }
                setEvents(events as OrganizationEvent[]);
                updateLoader(false);
            })
            .catch((error) => {
                setErrorMessage(getErrorMessage(error));
            });
    };

    useEffect(() => {
        setEmptyEvents(false);
        setErrorMessage('');
        updateLoader(true);
        if (mustUpdateComponent) {
            changeMustUpdateComponent(false);
            updateLoader(false);
        }
        getEmployeeById(token, userId.toString())
            .then(({data: user}) => {
                setUser(user as OrganizationEmployee);
            })
            .catch((error) => {
                addNotification(
                    NotificationType.ERROR,
                    'Возникла ошибка',
                    getErrorMessage(error),
                );
            });
        search();
    }, [searchInput, dateFromInput, dateToInput, status, mustUpdateComponent]);

    useEffect(() => {
        search();
    }, []);

    return (
        <main className="flex-1 flex flex-col">
            <header className="bg-white drop-shadow-lg">
                <div className="flex flex-row px-[50px] py-[8px] justify-center drop-shadow-lg">
                    <button
                        className={user && buttonAccess.indexOf(user.role.id) !== -1 ? buttonStyle : 'hidden'}
                        onClick={() => setModal(ModalType.CREATE_EVENT)}>Создать событие
                    </button>
                    <InputString
                        className={'px-[10px] ml-[20px] w-[500px] '.concat(inputStyles)}
                        type="text"
                        placeholder="Поиск..."
                        state={searchInput}
                        setState={setSearchInput}
                    />
                </div>
                <div className='flex justify-center my-[10px]'>
                    <p>Дата от:</p>
                    <InputString
                        className={'px-[2px] mx-[10px] w-[100px] '.concat(inputStyles)}
                        type="Date"
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
                    <select className={'px-[2px] mx-[10px] '.concat(inputStyles)} onChange={(event) => {
                        setStatus(event.target.value);
                    }}>
                        <option value="">Любой</option>
                        <option value="Open">Open</option>
                        <option value="Close">Close</option>
                        <option value="In process">In process</option>
                    </select>
                </div>
            </header>
            <div className="mx-auto mt-[50px] mb-[50px]">
                {emptyEvents ? <span className='text-red-700'>Событий нет</span> : <EventsTable events={events}/>}
                {errorMessage.length > 0 && <span className='text-red-700'>{errorMessage}</span>}
            </div>
            {loader && <Loader/>}
        </main>
    );
}
