import React from 'react';
import {useCurrentModal} from '../state/application/hooks';
import {ModalType} from '../state/application/types';
import CreateEventModal from './modals/CreateEventModal';
import ChangeEventModal from './modals/ChangeEventModal';


export default function Modal() {
    const currentModal = useCurrentModal();

    switch (currentModal) {
        case ModalType.NONE:
            return null;
        case ModalType.CREATE_EVENT:
            return <CreateEventModal/>;
        case ModalType.UPDATE_EVENT:
            return <ChangeEventModal/>;
        default:
            return null;
    }
}
