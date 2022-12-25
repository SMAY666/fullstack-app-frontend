import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {NotificationData} from '../../state/application/types';
import {useDeleteNotification} from '../../state/application/hooks';


type Props = {
    borderColor: string;
    textColor: string;
    name: React.ReactNode;
    data: NotificationData;
    index: number;
    children: React.ReactNode;
};


export default function BaseNotification({borderColor, textColor, name, data, index, children}: Props) {
    const removeNotification = useDeleteNotification();
    setInterval(() => removeNotification(data.id), 10000 + 250 * index);
    return (
        <div className={`pb-[20px] pt-[10px] px-[10px] drop-shadow-2xl mx-auto mb-[10px] border-2 rounded-md ${borderColor} bg-slate-50 w-[300px]`}>
            <div className="flex">
                <div className={`flex ${textColor} font-bold`}>
                    {name} {data.title}
                </div>
                <button
                    className="ml-auto mr-[5px] mt-[5px] border-1 w-[10px] h-[10px] text-blue-400 hover:text-red-700 duration-300"
                    onClick={() => removeNotification(data.id)}
                >
                    <AiOutlineCloseCircle/>
                </button>
            </div>
            {/*TODO: Уязвимость XSS*/}
            <div dangerouslySetInnerHTML={{__html: data.context}}></div>
            {children}
        </div>
    );
}
