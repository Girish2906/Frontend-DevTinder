import {configureStore} from '@reduxjs/toolkit'; 
// import { useReducer } from 'react';
import userReducer from "./userSlice" ; 
import feedReducer from './feedSlice' ; 
import connectionReducer from './connectionSlice' ; 
import requestReducer from './requestSlice' ; 
import { addConnections , removeConnections } from './connectionSlice';
const appStore = configureStore({
    reducer: {
        user: userReducer , 
        feed: feedReducer , 
        connections: connectionReducer , 
        requests: requestReducer
    }
}) ; 

export default appStore ; 