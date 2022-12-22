import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
};


export default function SuccessNotification({data}: Props) {
    return (
        <BaseNotification name={<><AiOutlineInfoCircle className="text-green-700"/>Успех</>} data={data}>

        </BaseNotification>
    )
}
