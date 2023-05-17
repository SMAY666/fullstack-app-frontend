import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import Modal from '../components/Modal';
import Notification from '../components/Notification';
import {useIsAuthorized} from '../state/user/hooks';
import EmployeesPage from './EmployeesPage';
import MasterLayout from './layouts/MasterLayout';
import SelectedEmployeePage from './SelectedEmployeePage';

const MainPage = React.lazy(() => import('./MainPage'));
const EventsPage = React.lazy(() => import('./EventsPage'));
const AuthorizationPage = React.lazy(() => import('./AuthorizationPage'));


export default function App() {
    return (
        <React.Suspense fallback={<div></div>}>
            {useIsAuthorized() ? <Routing/> : <AuthorizationPage/>}
            <Modal/>
            <Notification/>
        </React.Suspense>
    );
}

function Routing() {
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='/' element={<EventsPage/>}/>
                <Route path='/employees' element={<EmployeesPage/>}/>
                <Route path='/employees/:id' element={<SelectedEmployeePage/>}/>
            </Route>
        </Routes>
    );
}
