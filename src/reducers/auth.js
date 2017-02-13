import {SEND_AUTH_REQUEST, RECEIVE_AUTH_SUCCESS, RECEIVE_AUTH_FAIL, CLEAR_AUTH_ERROR_MSG, SEND_REG_REQUEST, RECEIVE_REG_SUCCESS, RECEIVE_REG_FAIL, CLEAR_LOGIN_REG_MESSAGES, SEND_LOGOUT_REQUEST} from '../constants/ActionTypes';
import {TOKEN_NAME_LOCAL_STORAGE, AUTHENTICATED_NAME_LOCAL_STORAGE} from '../constants/App';

const initialState = {
  isAuthenticated: localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE) ? true : false,
  isAuthenticatedDialog: false,
  isRegistered: false,
  token: localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE),
  loginName: localStorage.getItem(AUTHENTICATED_NAME_LOCAL_STORAGE) ? localStorage.getItem(AUTHENTICATED_NAME_LOCAL_STORAGE) : ' ',
  fetchingAuth: false,
  fetchingReg: false,
  error_msg: '',
  msg_reg: '',
}

export default function auth(state = initialState, action){

  switch(action.type){
    case SEND_AUTH_REQUEST: {
      return{
        ...state,
        fetchingAuth: true
      }
    }

    case RECEIVE_AUTH_SUCCESS: {
      localStorage.setItem(TOKEN_NAME_LOCAL_STORAGE, action.token);
      localStorage.setItem(AUTHENTICATED_NAME_LOCAL_STORAGE, action.loginName);
      return{
        ...state,
        token: action.token,
        fetchingAuth: false,
        isAuthenticated: true,
        loginName: action.loginName,
        isAuthenticatedDialog: true,
        error_msg: ''
      }
    }

    case RECEIVE_AUTH_FAIL: {
      localStorage.setItem(TOKEN_NAME_LOCAL_STORAGE, '');
      return {
        ...state,
        token: '',
        fetchingAuth: false,
        isAuthenticated: false,
        error_msg: action.msg
      }
    }

    case SEND_REG_REQUEST: {
      return{
        ...state,
        fetchingReg: true,
        isRegistered: false
      }
    }

    case RECEIVE_REG_SUCCESS: {
      return{
        ...state,
        fetchingReg: false,
        msg_reg: '',
        isRegistered: true
      }
    }

    case RECEIVE_REG_FAIL: {
      return {
        ...state,
        fetchingReg: false,
        msg_reg: action.msg,
        isRegistered: false
      }
    }

    case CLEAR_LOGIN_REG_MESSAGES: {
      return{
        ...state,
        msg_reg: '',
        error_msg: '',
        isRegistered: false,
        isAuthenticatedDialog: false
      }
    }

    case SEND_LOGOUT_REQUEST: {
      localStorage.setItem(TOKEN_NAME_LOCAL_STORAGE, '');
      localStorage.setItem(AUTHENTICATED_NAME_LOCAL_STORAGE, '');
      return{
        ...state,
        isAuthenticated: false,
        token: '',
        loginName: ' '
      }
    }

    default: {
      return state;
    }
  }

}
