import {
  GET_USERS_REQUEST,
  RECEIVE_USERS_SUCCESS,
  RECEIVE_USERS_FAIL,
  ADD_USER_REQUEST,
  RECEIVE_ADD_USER_SUCCESS,
  RECEIVE_ADD_USER_FAIL,
  CLEAR_ADD_MESSAGES,
  EDIT_USER_REQUEST,
  RECEIVE_EDIT_USER_SUCCESS,
  RECEIVE_EDIT_USER_FAIL,
  DELETE_USER_REQUEST,
  RECEIVE_DELETE_USER_SUCCESS,
  RECEIVE_DELETE_USER_FAIL
} from '../constants/ActionTypes';

const initialState = {
  fetchingUsers: false,
  arrayUsers: [],
  msg: ''
}

export default function auth(state = initialState, action) {

  switch (action.type) {

    case GET_USERS_REQUEST:
      {
        return {
          ...state,
          fetchingUsers: true
        }
      }

    case RECEIVE_USERS_SUCCESS:
      {
        return {
          ...state,
          arrayUsers: action.users,
          fetchingUsers: false
        }
      }

    case RECEIVE_USERS_FAIL:
      {
        return {
          ...state,
          fetchingUsers: false,
          msg: action.msg
        }
      }

    case RECEIVE_ADD_USER_SUCCESS:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case RECEIVE_ADD_USER_FAIL:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case RECEIVE_EDIT_USER_SUCCESS:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case RECEIVE_EDIT_USER_FAIL:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case RECEIVE_DELETE_USER_SUCCESS:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case RECEIVE_DELETE_USER_FAIL:
      {
        return {
          ...state,
          msg: action.msg
        }
      }

    case CLEAR_ADD_MESSAGES:
      {
        return {
          ...state,
          msg: ''
        }
      }

    default:
      {
        return state;
      }
  }

}
