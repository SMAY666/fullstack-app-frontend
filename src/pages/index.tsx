import React, {useEffect} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import {useIsAuthorized} from '../state/user/hooks';
import Modal from '../components/Modal';
import Notification from '../components/Notification';
import {useAddNotification} from '../state/application/hooks';
import {NotificationType} from '../state/application/types';

const MainPage = React.lazy(() => import ('./MainPage'));
const EventsPage = React.lazy(() => import ('./EventsPage'));
const AuthorizationPage = React.lazy(() => import ('./AuthorizationPage'));


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
    const addNotification = useAddNotification();
    useEffect(() => {
        addNotification(NotificationType.INFORMATION, "Информация","Контекст");
        addNotification(NotificationType.SUCCESS, "Успех","Контекст");
        addNotification(NotificationType.WARNING, "Внимание","Контекст");
        addNotification(NotificationType.ERROR, "Ошибка","Контекст");
    }, []);

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='/' element={<EventsPage/>}/>
                <Route path="*" element={<Navigate to='/'/>}/>
            </Route>
        </Routes>
    );
}
