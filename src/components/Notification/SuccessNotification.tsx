import React from 'react';
import {AiOutlineInfoCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
    index: number;
};


export default function SuccessNotification({data, index}: Props) {
    return (
        <BaseNotification borderColor="border-success" textColor="text-success" name={<><AiOutlineInfoCircle className="mr-[5px]"/></>} data={data} index={index}>

        </BaseNotification>
    );
}
