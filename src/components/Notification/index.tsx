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
        <div className="fixed flex-col top-0 right-0">
            {
                notifications.map((notificationData, index) => {
                    switch (notificationData.type) {
                        case NotificationType.INFORMATION:
                            return <InformationNotification key={notificationData.id} data={notificationData} index={index}/>
                        case NotificationType.SUCCESS:
                            return <SuccessNotification key={notificationData.id} data={notificationData} index={index}/>
                        case NotificationType.WARNING:
                            return <WarningNotification key={notificationData.id} data={notificationData} index={index}/>
                        case NotificationType.ERROR:
                            return <ErrorNotification key={notificationData.id} data={notificationData} index={index}/>
                        default:
                            return null;
                    }
                }).reverse()
            }
        </div>
    )
}
