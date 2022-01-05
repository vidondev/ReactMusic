import {
  TOGGLE_DRAWER,
  TOGGLE_MODAL,
  TOGGLE_SEARCH_PANEL,
  GET_REQUEST,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_DETAIL,
  FETCH_PLAYLIST_CATEGORY,
  FETCH_PLAYLIST_HOT,
  FETCH_PLAYLIST_COMMENT,
  FETCH_PLAYLIST_SUBSCRIBER,
  FETCH_SONG_DETAIL,
  FETCH_SEARCH,
  FETCH_SEARCH_HOT, 
  FETCH_SEARCH_SUGGEST, 
  FETCH_TOPLIST, 
  FETCH_TOPLIST_DETAIL, 
  FETCH_TOP_ARTIST, 
  FETCH_ARTIST, 
  FETCH_ARTIST_ALBUM, 
  FETCH_ARTIST_MV, 
  FETCH_ARTIST_DESC, 
  FETCH_ARTIST_SIMI, 
  FETCH_ALBUM, 
  FETCH_ALBUM_COMMENT, 
  FETCH_SONG_URL,
  FETCH_LYRIC,
} from '../constants/ActionTypes';

import {
  api_playlist,
  api_playlist_detail,
  api_playlist_catlist,
  api_playlist_hot,
  api_playlist_comment,
  api_playlist_subscriber,
  api_song_detail,
  api_search,
  api_search_hot,
  api_search_suggest,
  api_toplist,
  api_toplist_detail,
  api_top_artists,
  api_artists,
  api_artist_album,
  api_artist_mv,
  api_artist_desc,
  api_artist_simi,
  api_album,
  api_album_comment,
  api_song_url,
  api_lyric,
} from '../api';
import { PLAYLIST_CONFIG } from '../constants/APIConfig';

import { player_set_track } from './player';

export const toggle_drawer = (toggle) => dispatch => {
  dispatch({
    type: TOGGLE_DRAWER, 
    drawer: {
      isOpen: toggle
    }
  })
}

export const toggle_modal = (toggle) => dispatch => {
  dispatch({
    type: TOGGLE_MODAL,    
    modal: {
      isOpen: toggle
    }
  })
}

export const toggle_search_panel = (toggle, type = 'hot') => dispatch => {
  dispatch({
    type: TOGGLE_SEARCH_PANEL,
    search_panel: {
      isOpen: toggle,
      type: type
    }
  })
}



const get_request = (payload) => {
  return { type: GET_REQUEST, ...payload}
}


export const fetch_playlist = (limit = PLAYLIST_CONFIG.limit, order = PLAYLIST_CONFIG.order, offset = 0, cat = '') => dispatch => {
  dispatch(get_request({
    playlists: {
      loading: true,
      payload: {}
    }
  }));
  api_playlist( limit, order, offset, cat).then(res => {
    dispatch({
      type: FETCH_PLAYLIST,
      playlists: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_playlist_detail = (playlist_id) => (dispatch) => {
  dispatch(get_request({
    playlist: {
      loading: true,
      payload: {}
    }
  }));
  api_playlist_detail(playlist_id)
    .then(res => {
      dispatch({
        type: FETCH_PLAYLIST_DETAIL,
        playlist: {
          payload: res.data
        }
      });
      return res.data;
    })
    .then(json => {
      var song_ids = json.playlist.trackIds.map( (track) => { return track.id; })
      dispatch(fetch_song_detail({ids: song_ids.join(",")}));
      // dispatch(fetch_song_url({id: song_ids.join(",")}));
    })    
    .catch(err=> {

    })
}

export const fetch_playlist_category = () => dispatch => {
  dispatch(get_request({
    categories: {
      loading: true,
      payload: {}
    }
  }));

  api_playlist_catlist().then(res => {
    dispatch({
      type: FETCH_PLAYLIST_CATEGORY,
      categories: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_playlist_hot = () => dispatch => {
  dispatch(get_request({
    tags: {
      loading: true,
      payload: {}
    }
  }));
  api_playlist_hot().then(res => {
    dispatch({
      type: FETCH_PLAYLIST_HOT,
      tags: {
        payload: res.data
      }
    });
  }).catch(err=> {
  })
}

export const fetch_playlist_comment = (playlist_id) => dispatch => {
  dispatch(get_request({
    comments: {
      loading: true,
      payload: {}
    }
  }));

  api_playlist_comment(playlist_id).then(res => {
    dispatch({
      type: FETCH_PLAYLIST_COMMENT,
      comments: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_playlist_subscriber = (playlist_id) => dispatch => {
  dispatch(get_request({
    subscribers: {
      loading: true,
      payload: {}
    }
  }));

  api_playlist_subscriber(playlist_id).then(res => {
    dispatch({
      type: FETCH_PLAYLIST_SUBSCRIBER,
      subscribers: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_song_detail = (params) => (dispatch) => {
  dispatch(get_request({
    songs: {
      loading: true,
      payload: {}
    }
  }));

  dispatch(get_request({
    song_url: {
      loading: true,
      payload: {}
    }
  }));

  api_song_detail(params).then(res => {
    dispatch({
      type: FETCH_SONG_DETAIL,
      songs: {
        payload: res.data
      }
    });
    return res.data;
  })
  .then(json => {
    // var song_ids = json.songs.map( (track) => { return track.id; })
    // dispatch(fetch_song_url({id: song_ids.join(",")}));
  })  
  .catch(err=> {

  })
}

export const fetch_search = () => (dispatch) => {
  dispatch(get_request({
    search: {
      loading: true,
      payload: {}
    }
  }));

  api_search().then(res => {
    dispatch({
      type: FETCH_SEARCH,
      search: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_search_hot = () => (dispatch) => {
  dispatch(get_request({
    search_hots: {
      loading: true,
      payload: {}
    }
  }));

  api_search_hot().then(res => {
    dispatch({
      type: FETCH_SEARCH_HOT,
      search_hots: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_search_suggest = (params) => (dispatch) => {
  dispatch(get_request({
    search_suggest: {
      loading: true,
      payload: {}
    }
  }));

  api_search_suggest(params).then(res => {
    dispatch({
      type: FETCH_SEARCH_SUGGEST,
      search_suggest: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_toplist = () => (dispatch) => {
  dispatch(get_request({
    toplist: {
      loading: true,
      payload: {}
    }
  }));

  api_toplist().then(res => {
    dispatch({
      type: FETCH_TOPLIST,
      toplist: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_toplist_detail = () => (dispatch) => {
  dispatch(get_request({
    toplist_detail: {
      loading: true,
      payload: {}
    }
  }));

  api_toplist_detail().then(res => {
    dispatch({
      type: FETCH_TOPLIST_DETAIL,
      toplist_detail: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_artist = (params) => (dispatch) => {
  dispatch(get_request({
    artist: {
      loading: true,
      payload: {}
    }
  }));

  dispatch(get_request({
    song_url: {
      loading: true,
      payload: {}
    }
  }));

  api_artists(params).then(res => {
    dispatch({
      type: FETCH_ARTIST,
      artist: {
        payload: res.data
      }
    });
    return res.data;
  })
  .then(json => {    
      var song_ids = json.hotSongs.map( (song) => { return song.id; })      
      dispatch(fetch_song_detail({ids: song_ids.join(",")}));
    })    
  .catch(err=> {

  })
}

export const fetch_artist_desc = (params) => (dispatch) => {
  dispatch(get_request({
    artist_desc: {
      loading: true,
      payload: {}
    }
  }));

  api_artist_desc(params).then(res => {
    dispatch({
      type: FETCH_ARTIST_DESC,
      artist_desc: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_artist_mv = (params) => (dispatch) => {
  dispatch(get_request({
    artist_mv: {
      loading: true,
      payload: {}
    }
  }));

  api_artist_mv(params).then(res => {
    dispatch({
      type: FETCH_ARTIST_MV,
      artist_mv: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_artist_album = (params) => (dispatch) => {
  dispatch(get_request({
    artist_album: {
      loading: true,
      payload: {}
    }
  }));

  api_artist_album(params).then(res => {
    dispatch({
      type: FETCH_ARTIST_ALBUM,
      artist_album: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_artist_simi = (params) => (dispatch) => {
  dispatch(get_request({
    artist_simi: {
      loading: true,
      payload: {}
    }
  }));

  api_artist_simi(params).then(res => {
    dispatch({
      type: FETCH_ARTIST_SIMI,
      artist_simi: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_top_artists = (params, type=FETCH_TOP_ARTIST) => (dispatch) => {
  dispatch(get_request({
    top_artists: {
      loading: true,
      payload: {}
    }
  }));

  api_top_artists(params).then(res => {
    dispatch({
      type: type,
      top_artists: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_album = (params) => (dispatch) => {
  dispatch(get_request({
    album: {
      loading: true,
      payload: {}
    }
  }));


  dispatch(get_request({
    song_url: {
      loading: true,
      payload: {}
    }
  }));  

  api_album(params).then(res => {
    dispatch({
      type: FETCH_ALBUM,
      album: {
        payload: res.data
      }
    })
    return res.data
  })
  .then(json => {
    var song_ids = json.songs.map( (track) => { return track.id; })
    dispatch(fetch_song_detail({ids: song_ids.join(",")}));
  })    
  .catch(err=> {

  })
}

export const fetch_album_comment = (params) => (dispatch) => {
  dispatch(get_request({
    album_comment: {
      loading: true,
      payload: {}
    }
  }));

  api_album_comment(params).then(res => {
    dispatch({
      type: FETCH_ALBUM_COMMENT,
      album_comment: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}

export const fetch_song_url = (params) => (dispatch, getState) => {
  dispatch(get_request({
    song_url: {
      loading: true,
      payload: {}
    }
  }));

  const state = getState();

  api_song_url(params).then(res => {
    var track = state.player.playlist.find( t => {      
        return t.id === params.id      
    })
    console.log(track)
    
    dispatch({
      type: FETCH_SONG_URL,
      song_url: {
        payload: res.data
      }
    });
    dispatch(fetch_lyric({id: track.id}))  
    dispatch(player_set_track(track, false));      
  }).catch(err=> {

  })
}

export const fetch_lyric = (params) => (dispatch) => {
  dispatch(get_request({
    lyric: {
      loading: true,
      payload: {}
    }
  }));

  api_lyric(params).then(res => {
    dispatch({
      type: FETCH_LYRIC,
      lyric: {
        payload: res.data
      }
    })
  }).catch(err=> {

  })
}