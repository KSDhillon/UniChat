import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import chatReducer from './chat_reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    form: formReducer,
    chat: chatReducer
});

export default rootReducer;
