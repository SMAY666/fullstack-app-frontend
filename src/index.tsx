import './tailwind.output.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages';
import {Provider as ReduxProvider} from 'react-redux';
import store from './state';
import {BrowserRouter} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
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
    </React.StrictMode>
);

