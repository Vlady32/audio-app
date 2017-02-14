import axios from 'axios';
import {SEND_AUTH_REQUEST, RECEIVE_AUTH_SUCCESS, RECEIVE_AUTH_FAIL,SERVER_CONNECTION_ERROR, SEND_REG_REQUEST, RECEIVE_REG_SUCCESS, RECEIVE_REG_FAIL, CLEAR_LOGIN_REG_MESSAGES, SEND_LOGOUT_REQUEST, RECEIVE_LOGOUT_SUCCESS, RECEIVE_LOGOUT_FAIL} from '../constants/ActionTypes';

export const sendAuthRequest = (email, password) => (dispatch) => {

  dispatch({type: SEND_AUTH_REQUEST});

  axios.post('http://localhost:8080/api/authenticate', {
    email: email,
    password: password
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_AUTH_SUCCESS, token: response.data.token, loginName: response.data.email, isAdmin: response.data.status})
    }else{
      dispatch({type: RECEIVE_AUTH_FAIL, msg: response.data.msg});
    }
  })
  .catch((error) => {
    console.log(SERVER_CONNECTION_ERROR);
  });

};

export const sendRegRequest = (email, password) => (dispatch) => {

  dispatch({type: SEND_REG_REQUEST});

  axios.post('http://localhost:8080/api/register', {
    email: email,
    password: password
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_REG_SUCCESS})
    }else{
      dispatch({type: RECEIVE_REG_FAIL, msg: response.data.msg});
    }
  })
  .catch((error) => {
    console.log(SERVER_CONNECTION_ERROR);
  });

};

export const clearMessages = () => (dispatch) => {
  dispatch({type: CLEAR_LOGIN_REG_MESSAGES});
}

export const logOut = () => (dispatch) => {
  dispatch({type: SEND_LOGOUT_REQUEST});

}
