import React from 'react';
import {OrganizationEvent} from '../../types';
import EventsTable from './index';


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
        </tr>

    )
}
