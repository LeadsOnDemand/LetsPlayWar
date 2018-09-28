import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dealerReducer from './dealerReducer'
import locationReducer from './locationReducer'
import playerReducer from './playerReducer'
import warReducer from './warReducer'

export default combineReducers({
  war: warReducer,
  dealers: dealerReducer,
  locations: locationReducer,
  players: playerReducer,
  
  form: formReducer
});
