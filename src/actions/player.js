import {
  PLAYER_SET_AUDIO,
  PLAYER_GET_TRACKS,
  PLAYER_SET_TRACK,
  PLAYER_SET_PLAY,
  PLAYER_SET_CURRENT_TIME,
  PLAYER_SET_PLAYMODE,
  PLAYER_OPEN_PLAYLIST,
  PLAYER_OPEN_LYRIC,
} from '../constants/ActionTypes';

import moment from 'moment';

export const set_audio = (audio) => dispatch => {
  dispatch({
    type: PLAYER_SET_AUDIO,
    audio
  })
}

export const player_get_playlist = (playlist) => dispatch => {
  dispatch({
    type: PLAYER_GET_TRACKS,
    playlist: playlist
  })
}

export const player_set_play = (paused) => (dispatch, getState) => {

  const state = getState();
  const audio = state.player.audio;
  if(paused) {
    audio.pause()
  } else {
    audio.play()
  }
  dispatch({
    type: PLAYER_SET_PLAY,
    paused: paused
  })
}

export const player_set_track = (track, paused) => (dispatch, getState) => {
  const state = getState();
  const audio = state.player.audio;
  if (state.playlist.song_url.payload) {
    var song = state.playlist.song_url.payload.data.find( song => song.id === track.id );
    if(song.url) {
      console.log("===>", song.url);
      audio.src = song.url.replace("m10.","m10c.");
      audio.play();
    }
  }

  dispatch({
    type: PLAYER_SET_TRACK,
    track: track,
    paused: audio.paused
  })
}

export const player_set_current_time = (current_time) => (dispatch, getState) => {
  const state = getState();
  const lyric = state.playlist.lyric;
  let lyric_index = -1;
  let matches = []
  if(lyric.payload.lrc) {
    matches = lyric.payload.lrc.lyric.match(/(?<=\[)(.\d):(.+?\d)(?=\])/g);
    lyric_index = matches.filter( (txt, j) => {
      let a = moment(txt,'mm:ss.SSS')
      let b = moment(current_time*1000).format('mm:ss.SSS');
      let c = moment(b,'mm:ss.SSS');
      return c.diff(a) >= 0
    });
  }

  dispatch({
      type: PLAYER_SET_CURRENT_TIME,
      current_time: current_time,
      lyric_index: matches[matches.indexOf(lyric_index[lyric_index.length-1])]
  })
}

export const player_get_playmode = () => (dispatch, getState) => {
  const player = getState().player;
  const playmodes = player.playmodes;
  const current_playmode = player.playmode;
  dispatch({
    type: PLAYER_SET_PLAYMODE,
    playmode: playmodes[(current_playmode+1)%playmodes.length]
  })
}

export const player_toggle_playlist = (toggle) => (dispatch) => {
  dispatch({
    type: PLAYER_OPEN_PLAYLIST,
    open_playlist: toggle
  })
}

export const player_toggle_lyric = (toggle) => (dispatch) => {
  dispatch({
    type: PLAYER_OPEN_LYRIC,
    open_lyric: toggle
  })
}
