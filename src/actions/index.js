import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { logoutUser } from './auth';

export const API_URL = 'http://localhost:3000/api';
export const CLIENT_ROOT_URL = 'http://localhost:8080';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data) {
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
            type: type,
            payload: 'Incorrect login information.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}
