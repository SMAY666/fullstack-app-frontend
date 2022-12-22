import React from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
};


export default function ErrorNotification({data}: Props) {
    return (
        <BaseNotification name={<><AiFillCloseCircle className="text-green-700"/>Ошибка</>} data={data}>

        </BaseNotification>
    )
}
