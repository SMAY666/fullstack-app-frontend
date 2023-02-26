import './style.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import ErrorBoundary from './components/ErrorBoundary';
import App from './pages';
import store from './state';

const root = ReactDOM.createRoot(
    document.getElementById('root')!,
);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ReduxProvider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ReduxProvider>
        </ErrorBoundary>
    </React.StrictMode>,
);

