import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { FETCH_CLASSROOMS,
         SEND_REPLY,
         ENROLL_CLASSROOM,
         FETCH_CURRENT_CLASSROOM,
         FETCH_CLASSMATES,
         SET_CURRENT_CLASSROOM,
         CHAT_ERROR } from './types';

export function getClassrooms() {
    return function(dispatch) {
        let headers = {
            headers: { Authorization: cookie.load('token') }
        };
        axios.get(`${API_URL}/chat/`, headers)
        .then(response => {
            dispatch({
                type: FETCH_CLASSROOMS,
                payload: response.data.classrooms,
            });
        })
        .catch(error => {dispatch({
            type: CHAT_ERROR,
            payload: error,
        });
            console.log(error); //TODO change this
        });
    }
}

export function setCurrentClassroom(classroom) {
    return dispatch => helperCurrentClass(dispatch, classroom);
}

function helperCurrentClass(dispatch, cl) {
    dispatch({
        type: SET_CURRENT_CLASSROOM,
        payload: cl,
    });
}
