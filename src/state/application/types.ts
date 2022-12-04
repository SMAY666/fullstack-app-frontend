export type ApplicationState = {
    modal: ModalType;
};

export enum ModalType {
    NONE,
    CREATE_EVENT,
    UPDATE_EVENT
}
