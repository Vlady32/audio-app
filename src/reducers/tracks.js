import {
  RECEIVE_SONGS_SUCCESS,
  GET_SONGS_REQUEST,
  RECEIVE_SONGS_FAIL,
  SEND_LIKE_REQUEST,
  RECEIVE_LIKE_SUCCESS,
  RECEIVE_LIKE_FAIL,
  SEARCH_SONG,
  OPEN_DIALOG_TRACK,
  CLOSE_DIALOG_TRACK,
  GET_COMMENTS_REQUEST,
  RECEIVE_COMMENTS_SUCCESS,
  RECEIVE_COMMENTS_FAIL,
  SEND_COMMENT,
  OPEN_UPLOAD_CHANGE_DIALOG_TRACK,
  CLOSE_UPLOAD_CHANGE_DIALOG_TRACK,
  UPLOAD_TRACK,
  RECEIVE_UPLOAD_TRACK_SUCCESS,
  RECEIVE_UPLOAD_TRACK_FAIL,
  CLEAR_MESSAGE_UPLOAD,
  DELETE_TRACK,
  RECEIVE_DELETE_TRACK_SUCCESS,
  RECEIVE_DELETE_TRACK_FAIL
} from '../constants/ActionTypes';

const initialState = {
  arraySongs: [],
  arrayCategories: [],
  arrayComments: [],
  errorCommentMsg: '',
  fetchingTracks: false,
  fetchingComments: false,
  errorMsg: '',
  idDialogTrack: -1,
  isOpenedDialogTrack: false,
  isOpenedUploadChangeDialogTrack: false,
  eventUploadChangeDialog: '',
  idTrackForChange: 0,
  uploadingTrack: false,
  uploadedTrackMessage: '',
  deletedTrackMessage: ''
}

export default function tracks(state = initialState, action) {

  switch (action.type) {
    case GET_SONGS_REQUEST:
      {
        return {
          ...state,
          fetchingTracks: true
        }
      }

    case RECEIVE_SONGS_SUCCESS:
      {
        return {
          ...state,
          fetchingTracks: false,
          arraySongs: action.songs,
          arrayCategories: action.categories
        }
      }

    case RECEIVE_SONGS_FAIL:
      {
        return {
          ...state,
          fetchingTracks: false,
          errorMsg: action.errorMsg
        }
      }

    case RECEIVE_SONGS_SUCCESS:
      {
        return {
          ...state,
          arraySongs: action.songs
        }
      }

    case RECEIVE_SONGS_FAIL:
      {
        return {
          ...state,
          errorMsg: action.errorMsg
        }
      }

    case OPEN_DIALOG_TRACK:
      {
        return {
          ...state,
          isOpenedDialogTrack: true,
          idDialogTrack: action.idDialogTrack
        }
      }

    case CLOSE_DIALOG_TRACK:
      {
        return {
          ...state,
          isOpenedDialogTrack: false,
          idDialogTrack: -1
        }
      }

    case OPEN_UPLOAD_CHANGE_DIALOG_TRACK:
      {
        return {
          ...state,
          isOpenedUploadChangeDialogTrack: true,
          eventUploadChangeDialog: action.event,
          idTrackForChange: action.idTrack
        }
      }

    case CLOSE_UPLOAD_CHANGE_DIALOG_TRACK:
      {
        return {
          ...state,
          isOpenedUploadChangeDialogTrack: false,
          eventUploadChangeDialog: ''
        }
      }

    case GET_COMMENTS_REQUEST:
      {
        return {
          ...state,
          fetchingComments: true
        }
      }

    case RECEIVE_COMMENTS_SUCCESS:
      {
        return {
          ...state,
          arrayComments: action.comments,
          fetchingComments: false
        }
      }

    case RECEIVE_COMMENTS_FAIL:
      {
        return {
          ...state,
          fetchingComments: false,
          errorCommentMsg: action.errorCommentMsg
        }
      }

    case SEND_COMMENT:
      {
        return {
          ...state,
          fetchingComments: true
        }
      }

    case UPLOAD_TRACK:
      {
        return {
          ...state,
          uploadingTrack: true
        }
      }

    case RECEIVE_UPLOAD_TRACK_SUCCESS:
      {
        return {
          ...state,
          uploadingTrack: false,
          uploadedTrackMessage: action.msg
        }
      }

    case RECEIVE_UPLOAD_TRACK_FAIL:
      {
        return {
          ...state,
          uploadingTrack: false,
          uploadedTrackMessage: action.msg
        }
      }

    case CLEAR_MESSAGE_UPLOAD:
      {
        return {
          ...state,
          uploadedTrackMessage: '',
          deletedTrackMessage: ''
        }
      }

    case RECEIVE_DELETE_TRACK_SUCCESS:
      {
        return {
          ...state,
          deletedTrackMessage: action.msg,
          isOpenedUploadChangeDialogTrack: false
        }
      }

    case RECEIVE_DELETE_TRACK_FAIL:
      {
        return {
          ...state,
          deletedTrackMessage: action.msg,
          isOpenedUploadChangeDialogTrack: false
        }
      }

    default:
      {
        return state;
      }
  }

}
