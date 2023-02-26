import React from 'react';

import {OrganizationEvent} from '../../types';
import Event from './Event';


type Props = {
    events: OrganizationEvent[];
}

export default function EventsTable({events}: Props) {
    const titles = [
        'Название',
        'Описание',
        'Дата начала',
        'Дата окончания',
        'Статус',
        'Действие',
    ];

    return (
        <table>
            <tbody>
                <tr>
                    {titles.map((title, index) => <th className="px-[10px]" key={index}>{title}</th>)}
                </tr>
                {events.map((event, index) => <Event key={index} event={event}/>)}
            </tbody>
        </table>

    );
}
