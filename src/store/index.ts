import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { AuthState } from './types';

export type RootState = {
  auth: AuthState; 
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // only auth will be persisted
};

// Explicitly type the return of persistReducer
const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

export default persistedReducer;