import React from 'react'
import {useNotifications} from '../../state/application/hooks';
import {NotificationType} from '../../state/application/types';
import InformationNotification from './InformationNotification';
import SuccessNotification from './SuccessNotification';
import WarningNotification from './WarningNotification';
import ErrorNotification from './ErrorNotification';


export default function Notification() {
    const notifications = useNotifications();
    if (!notifications || (notifications.length === 0)) {
        return null;
    }

    return (
        <div className="fixed flex top-0 right-0 w-full h-full">
            {
                notifications.map((notificationData, index) => {
                    switch (notificationData.type) {
                        case NotificationType.INFORMATION:
                            return <InformationNotification key={index} data={notificationData}/>
                        case NotificationType.SUCCESS:
                            return <SuccessNotification key={index} data={notificationData}/>
                        case NotificationType.WARNING:
                            return <WarningNotification key={index} data={notificationData}/>
                        case NotificationType.ERROR:
                            return <ErrorNotification key={index} data={notificationData}/>
                        default:
                            return null;
                    }
                })
            }
        </div>
    )
}
