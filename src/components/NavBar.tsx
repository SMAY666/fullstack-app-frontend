import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {useDeauthorize} from '../state/user/hooks';

type LinkData = {
    name: string;
    to: string;
}

export default function NavBar() {
    const links: LinkData[] = [
        {name: 'Ближайшие события', to: '/'},
        {name: 'Документы', to: '/documents'},
        {name: 'Сотрудники', to: '/employees'},
        {name: 'Клиенты', to: '/lids'},
    ];

    const deauthorize = useDeauthorize();
    const navigate = useNavigate();
    const location = useLocation();

    const onButtonClick = () => {
        deauthorize();
        navigate('/login');
    };

    return (
        <div className="relative top-0 left-0 bg-slate-100 w-[250px] h-[100vh] border-r-1">
            <header className="pt-[20px] mx-[50px] container font-bold text-blue-400">ООО &ldquo;Автопилот&rdquo;</header>
            <div className="container mt-[50px]">
                {links.map((link, index) => (
                    <Link key={index} to={link.to}>
                        <div className={location.pathname === link.to ? 'h-[50px] px-[10px] text-white bg-blue-300 font-bold' : '' + 'h-[50px] px-[10px] hover:bg-blue-300 hover:cursor-pointer hover:text-white hover:font-bold duration-300'}>
                            <p className="pt-[10px]">{link.name}</p>
                        </div>
                    </Link>
                ))}

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
    );
}
