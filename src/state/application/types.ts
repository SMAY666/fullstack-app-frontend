export type ApplicationState = {
    modal: ModalType;
    notifications: NotificationData[];
    nextId: number;
    mastUpdateComponent: boolean;
    props: any;
    loader: boolean;
};

export enum ModalType {
    NONE,
    CREATE_EVENT,
    UPDATE_EVENT,
    CREATE_EMPLOYEE,
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
