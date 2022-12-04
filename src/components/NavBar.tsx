import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDeauthorize} from '../state/user/hooks';


export default function NavBar() {
    const deauthorize = useDeauthorize();
    const navigate = useNavigate();

    const onButtonClick = () => {
        deauthorize();
        navigate('/login');
    }

    return (
        <div className="relative m-0 bg-slate-100 w-[250px] h-[100vh] border-r-1">
            <header className="pt-[20px] mx-[50px] container font-bold text-blue-400">ООО "Автопилот"</header>
            <div className="container mt-[50px]">
                <Link to={'/events'}>
                    <div
                        className="h-[50px] px-[10px] hover:bg-blue-300 hover:cursor-pointer hover:text-white hover:font-bold duration-300">
                        <p className="pt-[10px]">Ближайшие события</p>
                    </div>
                </Link>
                <Link to={'/documents'}>
                    <div
                        className="h-[50px] px-[10px] hover:bg-blue-300 hover:cursor-pointer hover:text-white hover:font-bold duration-300">
                        <p className="pt-[10px]">Документы</p>
                    </div>
                </Link>
                <Link to={'/employees'}>
                    <div
                        className="h-[50px] px-[10px] hover:bg-blue-300 hover:cursor-pointer hover:text-white hover:font-bold duration-300">
                        <p className="pt-[10px]">Сотрудники</p>
                    </div>
                </Link>
                <Link to={'/lids'}>
                    <div
                        className="h-[50px] px-[10px] hover:bg-blue-300 hover:cursor-pointer hover:text-white hover:font-bold duration-300">
                        <p className="pt-[10px]">Клиенты</p><br/>
                    </div>
                </Link>
            </div>
            <div className="absolute bottom-[50px]">
                <div className="p-[10px] w-[250px] hover:font-bold hover:text-blue-400 hover:bg-slate-300 duration-300">
                    <Link to={'/profile'} className="text-[14px]">
                        <img
                            src="https://avatars.mds.yandex.net/i?id=b6f75588a8210c09136fcd3b7aff4e7b-4034409-images-thumbs&n=13"
                            alt=""
                            className="w-[50px] h-[50px] rounded-full"
                        />
                        <p className="pl-[10px] ml-[50px] -mt-[25px]">Сазонов Матвей</p>
                    </Link>
                </div>
                <button className="pl-[10px] mt-[20px] hover:text-red-600 hover:font-bold duration-300" onClick={onButtonClick}>Выйти</button>
            </div>
        </div>
    )
}
