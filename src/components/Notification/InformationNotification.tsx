import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
};


export default function InformationNotification({data}: Props) {
    return (
        <BaseNotification name={<><AiOutlineInfoCircle className="text-green-700"/>Информация</>} data={data}>

        </BaseNotification>
    )
}
