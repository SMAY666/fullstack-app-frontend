import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
    index: number;
};


export default function InformationNotification({data, index}: Props) {
    return (
        <BaseNotification borderColor="border-info" textColor="text-info" name={<><AiOutlineInfoCircle/>Информация</>} data={data} index={index}>

        </BaseNotification>
    )
}
