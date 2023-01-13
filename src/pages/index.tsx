import React from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import {useExpirationTime, useIsAuthorized} from '../state/user/hooks';
import Modal from '../components/Modal';
import Notification from '../components/Notification';


const MainPage = React.lazy(() => import ('./MainPage'));
const EventsPage = React.lazy(() => import ('./EventsPage'));
const AuthorizationPage = React.lazy(() => import ('./AuthorizationPage'));


//TODO: Добавить проверку время жизни токена
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
                <Route path="*" element={<Navigate to='/'/>}/>
            </Route>
        </Routes>
    );
}
