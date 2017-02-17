import {
  OPEN_PLAYER,
  CLOSE_PLAYER,
  PLAY_SONG,
  PAUSE_SONG,
  NEXT_SONG,
  PREVIOUS_SONG,
  TURN_ON_FIRST_SONG,
  TURN_ON_LAST_SONG,
  INC_COUNT
} from '../constants/ActionTypes';

const initialState = {
  isShownPlayer: false,
  trackIndex: 0,
  trackIndexCategory: 0,
  isPlayingNow: false,
  countListenings: 0
}

export default function tracks(state = initialState, action) {

  switch (action.type) {

    case OPEN_PLAYER:
      {
        return {
          ...state,
          isShownPlayer: true,
          trackIndex: action.trackIndex,
          trackIndexCategory: action.trackCategory,
          isPlayingNow: true
        }
      }

    case CLOSE_PLAYER:
      {
        return {
          ...state,
          isShownPlayer: false,
          trackIndex: 0,
          trackIndexCategory: 0,
          isPlayingNow: false
        }
      }

    case PLAY_SONG:
      {
        return {
          ...state,
          isPlayingNow: true
        }
      }

    case PAUSE_SONG:
      {
        return {
          ...state,
          isPlayingNow: false
        }
      }

    case NEXT_SONG:
      {
        return {
          ...state,
          trackIndex: ++state.trackIndex,
          isPlayingNow: true
        }
      }

    case PREVIOUS_SONG:
      {
        return {
          ...state,
          trackIndex: --state.trackIndex,
          isPlayingNow: true
        }
      }

    case TURN_ON_FIRST_SONG:
      {
        return {
          ...state,
          trackIndex: 0,
          isPlayingNow: true
        }
      }

    case TURN_ON_LAST_SONG:
      {
        return {
          ...state,
          trackIndex: action.indexLastTrack,
          isPlayingNow: true
        }
      }

    case INC_COUNT:
      {
        return {
          ...state,
          countListenings: ++state.countListenings
        }
      }

    default:
      {
        return state;
      }
  }

}
