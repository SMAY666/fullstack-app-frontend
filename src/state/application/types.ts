export type ApplicationState = {
    modal: ModalType;
    notification: NotificationType
};

export enum ModalType {
    NONE,
    CREATE_EVENT,
    UPDATE_EVENT
}

export enum NotificationType {
    NONE,
    SUCCESS,
    WARNING,
    DEBUG
}
