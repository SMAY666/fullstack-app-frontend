import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {NotificationData} from '../../state/application/types';
import {useDeleteNotification} from '../../state/application/hooks';


type Props = {
    name: React.ReactNode;
    data: NotificationData;
    children: React.ReactNode;
};


export default function BaseNotification({name, data, children}: Props) {
    const removeNotification = useDeleteNotification();
    setInterval(() => removeNotification(data.id), 5000);
    return (
        <div
            className="pb-[20px] pt-[10px] px-[10px] drop-shadow-2xl mx-auto border-2 rounded-md border-blue-400 bg-slate-50 w-[300px]">
            <div className="flex">
                <button
                    className="float-right mr-[20px] mt-[5px] border-1 w-[10px] h-[10px] text-blue-400 hover:text-red-700 duration-300"
                    onClick={() => removeNotification(data.id)}
                >
                    <AiOutlineCloseCircle/>
                </button>
                <div className="flex text-blue-400 font-bold">
                    {name}: {data.title}
                </div>

            </div>
            {data.context}
            {children}
        </div>
    );
}
