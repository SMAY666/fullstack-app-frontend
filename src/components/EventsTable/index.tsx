import React from 'react';
import {OrganizationEvent} from '../../types';
import Event from './Event';


type Props = {
    events: OrganizationEvent[];
}

export default function EventsTable({events}: Props) {
    return (
        <table>
            <tbody>
            <tr>
                <th>Название</th>
                <th>Описание</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
                <th>Статус</th>
            </tr>
            {events.map((event, index) => <Event key={index} event={event}/>)}
            </tbody>
        </table>

    )
}
