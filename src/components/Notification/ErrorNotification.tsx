import React from 'react';
import {AiFillCloseCircle} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';


type Props = {
    data: NotificationData;
    index: number;
};


export default function ErrorNotification({data, index}: Props) {
    return (
        <BaseNotification borderColor="border-error" textColor="text-error" name={<AiFillCloseCircle className="mr-[5px]"/>} data={data} index={index}>

        </BaseNotification>
    );
}
