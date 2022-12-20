import React from 'react'
import {NotificationType} from '../../state/application/types';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {useSetNotification} from '../../state/application/hooks';


type Props = {
    name: string;
    children: React.ReactNode;
}


export function BaseModal({name, children}: Props) {
    const setNotification = useSetNotification()

    return(
        <div className="fixed flex top-0 right-0 w-full h-full">
            <div className="pb-[20px] pt-[10px] px-[10px] drop-shadow-2xl mx-auto my-auto border-2 rounded-md border-blue-400 bg-slate-50 w-[100px]">
                <div>
                    <p>
                        <button
                            className="float-right mr-[20px] mt-[5px] border-1 w-[10px] h-[10px] text-blue-400 hover:text-red-700 duration-300"
                            onClick={() => setNotification(NotificationType.NONE)}>
                            <AiOutlineCloseCircle/>
                        </button>
                        <p className="w-[20] text-blue-400 font-bold">
                            {name}
                        </p>
                    </p>
                </div>
                {children}
            </div>
        </div>
    )
}
