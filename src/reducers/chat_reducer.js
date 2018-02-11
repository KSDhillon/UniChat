import { FETCH_CLASSROOMS,
         SEND_REPLY,
         ENROLL_CLASSROOM,
         FETCH_CURRENT_CLASSROOM,
         FETCH_CLASSMATES,
         SET_CURRENT_CLASSROOM,
         CHAT_ERROR } from '../actions/types';

const INITIAL_STATE = { classroomList: [], currentClassroom: '', message: '', messageList: [], classmates: [], error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CLASSROOMS:
      return { ...state, classroomList: action.payload };
    case FETCH_CURRENT_CLASSROOM:
      return { ...state, messageList: action.payload.messageList };
    case FETCH_CLASSMATES:
      return { ...state, classmates: action.payload.classmates };
    case SET_CURRENT_CLASSROOM:
      return { ...state, currentClassroom: action.payload };
    case SEND_REPLY:
      return { ...state, message: action.payload.message };
    case CHAT_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
