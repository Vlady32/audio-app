import axios from 'axios';
import superagent from 'superagent';
import {RECEIVE_SONGS_SUCCESS, RECEIVE_SONGS_FAIL, GET_SONGS_REQUEST, SEND_LIKE_REQUEST, RECEIVE_LIKE_SUCCESS, RECEIVE_LIKE_FAIL, OPEN_DIALOG_TRACK, CLOSE_DIALOG_TRACK, GET_COMMENTS_REQUEST, RECEIVE_COMMENTS_SUCCESS, RECEIVE_COMMENTS_FAIL, SEND_COMMENT, OPEN_UPLOAD_CHANGE_DIALOG_TRACK, CLOSE_UPLOAD_CHANGE_DIALOG_TRACK, UPLOAD_TRACK, RECEIVE_UPLOAD_TRACK_SUCCESS, RECEIVE_UPLOAD_TRACK_FAIL, CLEAR_MESSAGE_UPLOAD, DELETE_TRACK, RECEIVE_DELETE_TRACK_SUCCESS, RECEIVE_DELETE_TRACK_FAIL} from '../constants/ActionTypes';
import {TOKEN_NAME_LOCAL_STORAGE, PATH_REST_SONGS, PATH_REST_COMMENTS} from '../constants/App';

export const getTracks = (category = '') => (dispatch) => {

  dispatch({type: GET_SONGS_REQUEST});

  axios.get(PATH_REST_SONGS,{
    params: {
      category: category
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_SONGS_SUCCESS, songs: response.data.msg, categories: response.data.categories});
    }
    else
      dispatch({type: RECEIVE_SONGS_FAIL, errorMsg: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });

};

export const likeTrack = (idTrack, idUser) => (dispatch) => {

  dispatch({type: SEND_LIKE_REQUEST});

  axios({
    method: 'put',
    url: PATH_REST_SONGS + idTrack,
    data: {
      userId: idUser,
      like: true
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success)
      dispatch({type: RECEIVE_LIKE_SUCCESS, songs: response.data.msg});
    else
      dispatch({type: RECEIVE_LIKE_FAIL, errorMsg: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });

};

export const searchSong = (value) => (dispatch) => {
  dispatch({type: GET_SONGS_REQUEST});

  axios.get(PATH_REST_SONGS,{
    params: {
      search: value
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success)
      dispatch({type: RECEIVE_SONGS_SUCCESS, songs: response.data.msg, categories: response.data.categories});
    else
      dispatch({type: RECEIVE_SONGS_FAIL, errorMsg: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });
};

export const openDialogTrack = (idDialogTrack) => (dispatch) => {
  dispatch({type: OPEN_DIALOG_TRACK, idDialogTrack: idDialogTrack});
};

export const closeDialogTrack = () => (dispatch) => {
  dispatch({type: CLOSE_DIALOG_TRACK});
};

export const openUploadChangeDialogTrack = (event, idTrack=0) => (dispatch) => {
  dispatch({type: OPEN_UPLOAD_CHANGE_DIALOG_TRACK, event: event, idTrack: idTrack});
};

export const closeUploadChangeDialogTrack = () => (dispatch) => {
  dispatch({type: CLOSE_UPLOAD_CHANGE_DIALOG_TRACK});
};

export const getComments = (idTrack) => (dispatch) => {

  dispatch({type: GET_COMMENTS_REQUEST});

  axios.get(PATH_REST_COMMENTS,{
    params: {
      idTrack: idTrack
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_COMMENTS_SUCCESS, comments: response.data.msg});
    }else
      dispatch({type: RECEIVE_COMMENTS_FAIL, errorCommentMsg: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });

};

export const sendComment = (idTrack, comment, login) => (dispatch) => {

  dispatch({type: SEND_COMMENT});

  axios({
    method: 'post',
    url: PATH_REST_COMMENTS,
    data: {
      idTrack: idTrack,
      text: comment,
      login: login
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_COMMENTS_SUCCESS, comments: response.data.msg});
    }else{
      dispatch({type: RECEIVE_COMMENTS_FAIL, errorCommentMsg: response.data.error});
    }
  })
  .catch((error) => {
    console.log(error);
  });

};

export const uploadTrack = (trackName, idCategory, imgFile, trackFile) => (dispatch) => {

  dispatch({type: UPLOAD_TRACK});

  let files = new FormData();
  files.append('trackFile', trackFile);
  files.append('imgFile', imgFile);
  files.append('trackName', trackName);
  files.append('idCategory', idCategory);

  superagent.
    post(PATH_REST_SONGS)
    .send(files)
    .set('x-access-token', localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE))
    .end((err, resp) => {
      if(err){
        console.log(err);
      }
      if(resp.body.success){
        dispatch({type: RECEIVE_UPLOAD_TRACK_SUCCESS, msg: resp.body.msg});
      }else{
        dispatch({type: RECEIVE_UPLOAD_TRACK_FAIL, msg: resp.body.error});
      }
    })
}

export const changeTrack = (idTrack, trackName, idCategory, imgFile, trackFile) => (dispatch) => {

  dispatch({type: UPLOAD_TRACK});

  let files = new FormData();
  files.append('trackFile', trackFile);
  files.append('imgFile', imgFile);
  files.append('idTrack', idTrack);
  files.append('trackName', trackName);
  files.append('idCategory', idCategory);

  superagent.
    put("http://localhost:8080/api/changeTrack")
    .send(files)
    .set('x-access-token', localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE))
    .end((err, resp) => {
      if(err){
        console.log(err);
      }
      if(resp.body.success){
        dispatch({type: RECEIVE_UPLOAD_TRACK_SUCCESS, msg: resp.body.msg});
      }else{
        dispatch({type: RECEIVE_UPLOAD_TRACK_FAIL, msg: resp.body.error});
      }
    })
}

export const deleteTrack = (idTrack) => (dispatch) => {

  dispatch({type: DELETE_TRACK});

  axios.delete(PATH_REST_SONGS + idTrack,{
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    if(response.data.success){
      dispatch({type: RECEIVE_DELETE_TRACK_SUCCESS, msg: response.data.msg});
    }else
      dispatch({type: RECEIVE_DELETE_TRACK_FAIL, MSG: response.data.error});
  })
  .catch((error) => {
    console.log(error);
  });

};

export const clearMessageUpload = () => (dispatch) => {
  dispatch({type: CLEAR_MESSAGE_UPLOAD});
}
