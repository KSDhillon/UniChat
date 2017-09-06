import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_USER,
         UNAUTH_USER,
         AUTH_ERROR,
         FORGOT_PASSWORD_REQUEST,
         RESET_PASSWORD_REQUEST,
         RESET_ERROR } from './types';

export function loginUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/login`, { email, password })
        .then(response => {
            cookie.save('token', response.data.token, { path: '/' });
            cookie.save('user', response.data.user, { path: '/' });
            dispatch({ type: AUTH_USER });
            window.location.href = CLIENT_ROOT_URL + '/dashboard';
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, AUTH_ERROR)
        });
    }
}

export function registerUser({ email, firstname, lastname, password }) {
    return function(dispatch) {
        axios.post(`${API_URL}/auth/register`, { email, firstname, lastname, password })
        .then(response => {
            cookie.save('token', response.data.token, { path: '/' });
            cookie.save('user', response.data.user, { path: '/' });
            dispatch({ type: AUTH_USER });
            window.location.href = CLIENT_ROOT_URL + '/dashboard';
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, AUTH_ERROR)
        });
    }
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        cookie.remove('token', { path: '/' });
        cookie.remove('user', { path: '/' });
        window.location.href = CLIENT_ROOT_URL + '/login';
    }
}

export function getForgotPasswordToken({ email }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/forgot-password`, { email })
        .then((response) => {
            dispatch({
                type: FORGOT_PASSWORD_REQUEST,
                payload: response.data.message,
            });
            console.log(response.data.message);
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, AUTH_ERROR);
        });
    };
}

export function resetPassword(token, { password }) {
    return function (dispatch) {
        axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
        .then((response) => {
            dispatch({
                type: RESET_PASSWORD_REQUEST,
                payload: response.data.message,
            });
            // Redirect to login page on successful password reset
            browserHistory.push('/login');
        })
        .catch((error) => {
            errorHandler(dispatch, error.response, AUTH_ERROR);
        });
    };
}

export function resetError() {
    return function(dispatch) {
        dispatch({
            type: RESET_ERROR,
        });
    }
}
