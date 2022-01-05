import { 
  PLAYER_SET_AUDIO,     
  PLAYER_GET_TRACKS,  
  PLAYER_SET_CURRENT_TIME,
  PLAYER_SET_PLAY,
  PLAYER_SET_TRACK,
  PLAYER_SET_PLAYMODE,
  PLAYER_OPEN_PLAYLIST,
  PLAYER_OPEN_LYRIC,
} from '../constants/ActionTypes'

const initialState = {
  audio: null,
  playlist: [],  
  available_playlist: [],
  track: null,  
  playmode: 0,
  playmodes: [0,1,2],//0: repeat, 1: repeat_one, 2: shuffle
  paused: true,
  current_time: 0,
  lyric_index: -1,
  duration: 0,
  volume: 0,  
  open_playlist: false,
  open_lyric: false
}


const player = (state = initialState, action) => {    
  switch (action.type) {
    case PLAYER_SET_AUDIO:
      const { audio } = action
      return { ...state, audio }    
    case PLAYER_GET_TRACKS:
      const { playlist } = action;      
      const available_playlist = playlist.filter( track => track.st === 0 );
      return {...state, 
        playlist: playlist, 
        available_playlist: available_playlist 
      }      
    case PLAYER_SET_TRACK:      
      return { ...state, 
        track: action.track || null,         
        current_time: 0, 
        duration: action.track ? action.track.dt/1000 : 0, 
        paused: action.paused !== undefined ? action.paused : true 
      }
    case PLAYER_SET_PLAY:
      return { ...state, paused: action.paused !== undefined ? action.paused : true }
    case PLAYER_SET_CURRENT_TIME:
      return { ...state, current_time: action.current_time, lyric_index: action.lyric_index }
    case PLAYER_SET_PLAYMODE:
      return { ...state, playmode: action.playmode}
    case PLAYER_OPEN_PLAYLIST:
      return { ...state, open_playlist: action.open_playlist}
    case PLAYER_OPEN_LYRIC:
      return { ...state, open_lyric: action.open_lyric}
    default:
      return state
  }
}

export default player
