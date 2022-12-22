export type ApplicationState = {
    modal: ModalType;
    notifications: NotificationData[];
};

export enum ModalType {
    NONE,
    CREATE_EVENT,
    UPDATE_EVENT
}

export enum NotificationType {
    INFORMATION,
    SUCCESS,
    WARNING,
    ERROR
}

export type NotificationData = {
    type: NotificationType;
    title: string;
    context: string;
};
