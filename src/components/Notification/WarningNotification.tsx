import React from 'react';
import {AiOutlineWarning} from 'react-icons/ai';

import {NotificationData} from '../../state/application/types';
import BaseNotification from './BaseNotification';

type Props = {
    data: NotificationData;
};


export default function WarningNotification({data}: Props) {
    return (
        <BaseNotification name={<><AiOutlineWarning className="text-green-700"/>Внимание</>} data={data}>

        </BaseNotification>
    )
}
