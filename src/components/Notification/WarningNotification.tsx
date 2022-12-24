import React from 'react';
import {AiOutlineWarning} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';

type Props = {
    data: NotificationData;
    index: number;
};


export default function WarningNotification({data, index}: Props) {
    return (
        <BaseNotification borderColor="border-warning" textColor="text-warning" name={<><AiOutlineWarning className="mr-[5px]"/>Внимание</>} data={data} index={index}>

        </BaseNotification>
    )
}
