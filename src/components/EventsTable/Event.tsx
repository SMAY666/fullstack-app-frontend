import React, {useEffect, useState} from 'react';
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';

import {getEmployeeById} from '../../api/employees';
import {deleteEvent} from '../../api/events';
import {useAddNotification, useChangeMustUpdateComponent, useSetModal} from '../../state/application/hooks';
import {ModalType, NotificationType} from '../../state/application/types';
import {useToken, useUserId} from '../../state/user/hooks';
import {OrganizationEmployee, OrganizationEvent} from '../../types';
import {getErrorMessage} from '../../utils/error';

type Props = {
    event: OrganizationEvent;
}

export default function Event({event}: Props) {
    const token = useToken();
    const userId = useUserId();

    const addNotification = useAddNotification();

    const changeMustUpdateComponent = useChangeMustUpdateComponent();
    const setModal = useSetModal();

    const [user, setUser] = useState<OrganizationEmployee>();

    const eventActionsAccess = [1, 2];

    const onButtonClick = (id: string) => {
        deleteEvent(token, id)
            .then(() => {
                addNotification(
                    NotificationType.SUCCESS,
                    'Событие успешно удалено',
                    event.title,
                );
                changeMustUpdateComponent(true);
            })
            .catch((error) => {
                addNotification(
                    NotificationType.ERROR,
                    'Не удалось удалить событие',
                    getErrorMessage(error),
                );
            });
    };

    useEffect(() => {
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
    }, []);
    return (
        <tr className={new Date(event.dateEnd).getTime() - Date.now() < 864000000 ? 'border-t-2 text-center bg-red-200 hover:border-2 hover:border-red-600 hover:bg-gray-100 hover:text-black duration-300' : 'border-t-2 text-center hover:border-2 hover:border-blue-300 hover:bg-gray-100 duration-300'}>
            <td className="border-r-[1px] py-[10px]">{event.title}</td>
            <td className={event.description.length >= 30 ? 'w-[200px] border-r-[1px] py-[10px] px-[10px] text-justify text-xs' : 'w-[200px] border-r-[1px] py-[10px]'}>{event.description}</td>
            <td className="border-r-[1px] py-[10px]">{new Date(event.dateBegin).toLocaleDateString()}</td>
            <td className="border-r-[1px] py-[10px]">{new Date(event.dateEnd).toLocaleDateString()}</td>
            <td className={event.status === 'Open' ? 'border-r-[1px] font-bold text-green-700' : event.status === 'Close' ? 'border-r-[1px] font-bold text-red-700' : 'border-r-[1px] font-bold'}>{event.status}</td>
            <td className={'flex py-[20px] px-[20px]'}>
                <button className="mx-auto" onClick={() => setModal(ModalType.UPDATE_EVENT, event)}><AiOutlineEdit className="text-blue-400 text-[20px] hover:text-green-500 duration-300"/></button>
                <button className="mx-auto" onClick={() => onButtonClick(event.id)}><AiOutlineDelete className="text-blue-400 text-[20px] hover:text-red-600 duration-300"/></button>
            </td>
        </tr>
    );
}
