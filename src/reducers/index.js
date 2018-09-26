import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import warReducer from './warReducer'

export default combineReducers({
  war: warReducer,
  form: formReducer
});
