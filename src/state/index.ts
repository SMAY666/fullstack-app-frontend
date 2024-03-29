import {configureStore} from '@reduxjs/toolkit';
import {load, save} from 'redux-localstorage-simple';

import application from './application/reducer';
import user from './user/reducer';


const PERSISTED_KEYS: string[] = ['user'];

const store = configureStore({
    reducer: {
        application,
        user,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true})
        .concat(save({states: PERSISTED_KEYS, debounce: 1000})),
    preloadedState: load({states: PERSISTED_KEYS, disableWarnings: true}),
});


export default store;
