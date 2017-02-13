import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import tracks from './tracks';
import auth from './auth';
import player from './player';

export default combineReducers({
  routing: routerReducer,
  auth,
  tracks,
  player
})
