import React from 'react';
import {OrganizationEvent} from '../../types';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsPencil} from 'react-icons/bs';

type Props = {
    event: OrganizationEvent;
}

export default function Event({event}: Props) {

    return (
        <tr>
            <td>{event.title}</td>
            <td>{event.description}</td>
            <td>{event.dateOfTheBegining}</td>
            <td>{event.dateOfTheEnd}</td>
            <td>{event.status}</td>
            <td className="flex">
                <button onClick={() => {console.log('!')}}><AiOutlineDelete/></button>
                <button onClick={() => {console.log('!')}}><BsPencil/></button>
            </td>
        </tr>

    )
}
