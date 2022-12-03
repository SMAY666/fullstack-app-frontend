import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from '../../components/NavBar';


export default function MasterLayout() {
    return (
        <>
            <header>
                <NavBar></NavBar>
            </header>
            <div className="mx-[270px] -mt-[100vh] pt-[20px]">
                <Outlet/>
            </div>
        </>
    )
}