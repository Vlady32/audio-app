import {OPEN_PLAYER, CLOSE_PLAYER, PLAY_SONG, PAUSE_SONG, NEXT_SONG, PREVIOUS_SONG, TURN_ON_FIRST_SONG, TURN_ON_LAST_SONG, INC_COUNT} from '../constants/ActionTypes';
import {PATH_REST_SONGS, TOKEN_NAME_LOCAL_STORAGE} from '../constants/App';
import axios from 'axios';

export const openPlayer = (trackIndex, trackCategory) => (dispatch) => {

  dispatch({type: OPEN_PLAYER, trackIndex: trackIndex, trackCategory: trackCategory})
};

export const closePlayer = () => (dispatch) => {
  dispatch({type: CLOSE_PLAYER})
};

export const playSong = () => (dispatch) => {
  dispatch({type: PLAY_SONG});
};

export const pauseSong = () => (dispatch) => {
  dispatch({type: PAUSE_SONG});
};

export const nextSong = () => (dispatch) => {
  dispatch({type: NEXT_SONG});
};

export const previousSong = () => (dispatch) => {
  dispatch({type: PREVIOUS_SONG});
};

export const turnOnFirstSong = () => (dispatch) => {
  dispatch({type: TURN_ON_FIRST_SONG});
};

export const turnOnLastSong = (indexLastTrack) => (dispatch) => {
  dispatch({type: TURN_ON_LAST_SONG, indexLastTrack: indexLastTrack});
};

export const incCountListenings = (idTrack) => (dispatch) => {

  dispatch({type: INC_COUNT});

  axios({
    method: 'put',
    url: PATH_REST_SONGS + idTrack,
    data: {
      count: true
    },
    headers: {'x-access-token': localStorage.getItem(TOKEN_NAME_LOCAL_STORAGE)}
  })
  .then((response) => {
    /*error|success*/
  })
  .catch((error) => {
    console.log(error);
  });
};
