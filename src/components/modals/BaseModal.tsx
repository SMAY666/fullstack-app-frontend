import React from 'react';
import {useSetModal} from '../../state/application/hooks';
import {ModalType} from '../../state/application/types';


type Props = {
    name: string;
    children: React.ReactNode;
}

export default function BaseModal({name, children}: Props) {
    const setModal = useSetModal()
    return (
        <div className="fixed flex top-0 left-0 w-full h-full">
            {/*<div className="flex top-0 left-0 w-full h-full bg-black opacity-30"></div>*/}
            <div className="mx-auto my-auto border-2 bg-amber-200">
                <p>{name}</p>
                <button className="border" onClick={() => setModal(ModalType.NONE)}>X</button>
                {children}
            </div>
        </div>
    );
}
