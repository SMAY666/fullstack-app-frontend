import React, {useState} from 'react';
import {OrganizationEvent} from '../../types';
import {AiOutlineDelete} from 'react-icons/ai';
import {useToken} from '../../state/user/hooks';
import {deleteEvent} from '../../api/events';
import {Simulate} from 'react-dom/test-utils';
import error = Simulate.error;

type Props = {
    event: OrganizationEvent;
}

export default function Event({event}: Props) {
    const token = useToken();

    const [errorMessage, setErrorMessage] = useState('');

    const onButtonClick = (id: string) => {
        deleteEvent(token, id)
            .then(() => {
                setErrorMessage('');
                window.location.reload();
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
    }
    return (
        <tr className="border-t-2 text-center hover:border-2 hover:border-blue-300 hover:bg-gray-100 duration-300">
            <td className="border-r-[1px] py-[10px]">{event.title}</td>
            <td className={event.description.length >= 30 ? "w-[200px] border-r-[1px] py-[10px] px-[10px] text-justify text-xs" : "w-[200px] border-r-[1px] py-[10px]"}>{event.description}</td>
            <td className="border-r-[1px] py-[10px]">{event.dateOfTheBegining}</td>
            <td className="border-r-[1px] py-[10px]">{event.dateOfTheEnd}</td>
            <td className={event.status == 'Open' ? "border-r-[1px] font-bold text-green-700" : event.status == 'Close' ? "border-r-[1px] font-bold text-red-700" : "border-r-[1px] font-bold"}>{event.status}</td>
            <td className="flex py-[20px] px-[20px]">
                <button className="mx-auto" onClick={() => onButtonClick(event.id)}><AiOutlineDelete className="text-blue-400 text-[20px] hover:text-red-600 duration-300"/></button>
            </td>
            {errorMessage.length > 0 ? <td className="text-red-700"><p>{errorMessage}</p></td> : null}
        </tr>
   )
}
