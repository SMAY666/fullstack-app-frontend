import React from 'react';

import {useCurrentModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import {ChangeEventModal, CreateEventModal} from './modals';
import CreateEmployeeModal from './modals/employees/CreateEmployeeModal';


export default function Modal() {
    const currentModal = useCurrentModal();

    switch (currentModal) {
        case ModalType.NONE:
            return null;
        case ModalType.CREATE_EVENT:
            return <CreateEventModal/>;
        case ModalType.UPDATE_EVENT:
            return <ChangeEventModal/>;
        case ModalType.CREATE_EMPLOYEE:
            return <CreateEmployeeModal/>;
        default:
            return null;
    }
}
