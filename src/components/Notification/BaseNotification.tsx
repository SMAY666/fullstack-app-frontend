import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {NotificationData} from '../../state/application/types';
import {useRemoveNotification} from '../../state/application/hooks';


type Props = {
    name: React.ReactNode;
    data: NotificationData;
    children: React.ReactNode;
};


export default function BaseNotification({name, data, children}: Props) {
    const removeNotification = useRemoveNotification();
    return (
        <div
            className="pb-[20px] pt-[10px] px-[10px] drop-shadow-2xl mx-auto border-2 rounded-md border-blue-400 bg-slate-50 w-[100px]">
            <div className="flex">
                <button
                    className="float-right mr-[20px] mt-[5px] border-1 w-[10px] h-[10px] text-blue-400 hover:text-red-700 duration-300"
                    onClick={() => removeNotification(data)}
                >
                    <AiOutlineCloseCircle/>
                </button>
                <p className="w-[20] text-blue-400 font-bold">
                    {name}
                </p>

            </div>
            {data.context}
            {children}
        </div>
    );
}
