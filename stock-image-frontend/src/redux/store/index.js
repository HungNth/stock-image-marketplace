import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import userReducer from '../slices/userSlice.js';

// combining lal the reducers
const rootReducer = combineReducers({
    user: userReducer
});

// config the persist
const persistConfig = {
    key: 'root',
    storage
};

// create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// creating the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// create the persistor
const persistor = persistStore(store);

export {
    store,
    persistor
};