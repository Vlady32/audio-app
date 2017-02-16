import axios from 'axios';
import {SEND_AUTH_REQUEST, RECEIVE_AUTH_SUCCESS, RECEIVE_AUTH_FAIL,SERVER_CONNECTION_ERROR, SEND_REG_REQUEST, RECEIVE_REG_SUCCESS, RECEIVE_REG_FAIL, CLEAR_LOGIN_REG_MESSAGES, SEND_LOGOUT_REQUEST, RECEIVE_LOGOUT_SUCCESS, RECEIVE_LOGOUT_FAIL, GET_USERS_REQUEST, RECEIVE_USERS_SUCCESS, RECEIVE_USERS_FAIL, ADD_USER_REQUEST, RECEIVE_ADD_USER_SUCCESS, RECEIVE_ADD_USER_FAIL, CLEAR_ADD_MESSAGES, EDIT_USER_REQUEST, RECEIVE_EDIT_USER_SUCCESS, RECEIVE_EDIT_USER_FAIL, DELETE_USER_REQUEST, RECEIVE_DELETE_USER_SUCCESS, RECEIVE_DELETE_USER_FAIL} from '../constants/ActionTypes';
import {PATH_REST_USERS, TOKEN_NAME_LOCAL_STORAGE} from '../constants/App';

export const sendAuthRequest = (email, password) => (dispatch) => {

  dispatch({type: SEND_AUTH_REQUEST});

  axios.post('http://localhost:8080/api/authenticate', {
    email: email,
    password: password
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_AUTH_SUCCESS, token: response.data.token, loginName: response.data.email, status: response.data.status})
    }else{
      dispatch({type: RECEIVE_AUTH_FAIL, msg: response.data.msg});
    }
  })
  .catch((error) => {
    console.log(SERVER_CONNECTION_ERROR);
  });

};

export const getUsers = () => (dispatch) => {

  dispatch({type: GET_USERS_REQUEST});

  axios.get(PATH_REST_USERS,{
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_USERS_SUCCESS, users: response.data.msg});
    }else
      dispatch({type: RECEIVE_USERS_FAIL, msg: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });

};

export const addUser = (login, password, isAdmin) => (dispatch) => {

  dispatch({type: ADD_USER_REQUEST});

  axios.post('http://localhost:8080/api/register',{
    email: login,
    password: password,
    status: isAdmin ? 'admin' : 'user'
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_ADD_USER_SUCCESS, msg: response.data.msg});
    }else
      dispatch({type: RECEIVE_ADD_USER_FAIL, msg: response.data.msg});
  })
  .catch((error) => {
    console.log(error);
  });

}

export const editUser = (idUser, login, password, isAdmin) => (dispatch) => {

  dispatch({type: EDIT_USER_REQUEST});

  axios({
    method: 'put',
    url: 'http://localhost:8080/api/users/' + idUser,
    data: {
      email: login,
      password: password,
      status: isAdmin ? 'admin' : 'user'
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_EDIT_USER_SUCCESS, msg: response.data.msg});
    }else
      dispatch({type: RECEIVE_EDIT_USER_FAIL, msg: response.data.msg});
  })
  .catch((error) => {
    console.log(error);
  });

}

export const deleteUser = (idUser) => (dispatch) => {

  dispatch({type: DELETE_USER_REQUEST});

  axios({
    method: 'delete',
    url: 'http://localhost:8080/api/users/' + idUser,
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_DELETE_USER_SUCCESS, msg: response.data.msg});
    }else
      dispatch({type: RECEIVE_DELETE_USER_FAIL, msg: response.data.msg});
  })
  .catch((error) => {
    console.log(error);
  });

}

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

export const clearMessageAdd = () => (dispatch) => {
  dispatch({type: CLEAR_ADD_MESSAGES});
}

export const clearMessages = () => (dispatch) => {
  dispatch({type: CLEAR_LOGIN_REG_MESSAGES});
}

export const logOut = () => (dispatch) => {
  dispatch({type: SEND_LOGOUT_REQUEST});

}
