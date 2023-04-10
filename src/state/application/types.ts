export type ApplicationState = {
    modal: ModalType;
    notifications: NotificationData[];
    nextId: number;
    mastUpdateEvents: boolean;
    props: any;
    loader: boolean;
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
    id: number;
    type: NotificationType;
    title: string;
    context: string;
};
