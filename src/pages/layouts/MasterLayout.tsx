import React from 'react';
import {Outlet} from 'react-router-dom';

import NavBar from '../../components/NavBar';


export default function MasterLayout() {
    return (
        <div className="flex-1 flex flex-row">
            <header className="flex">
                <NavBar/>
            </header>
            <div className="flex-1 flex flex-col">
                <Outlet/>
            </div>
        </div>
    );
}
