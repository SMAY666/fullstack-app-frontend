import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from '../../components/NavBar';


export default function MasterLayout() {
    return (
        <div className="flex w-full h-full">
            <header className="fixed h-full">
                <NavBar></NavBar>
            </header>
            <div className="mx-auto pt-[20px]">
                <Outlet/>
            </div>
        </div>
    )
}
