import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import {useIsAuthorized} from '../state/user/hooks';

const MainPage = React.lazy(() => import ('./MainPage'));
const EventsPage = React.lazy(() => import ('./EventsPage'));
const AuthorizationPage = React.lazy(() => import ('./AuthorizationPage'));


export default function App() {
    return (
        <React.Suspense fallback={<div></div>}>
            {useIsAuthorized() ? <Routing/> : <AuthorizationPage/>}
        </React.Suspense>
    );
}

function Routing() {
    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/events' element={<EventsPage/>}/>
                <Route path="*" element={<Navigate to='/events'/>}/>
            </Route>
        </Routes>
    );
}