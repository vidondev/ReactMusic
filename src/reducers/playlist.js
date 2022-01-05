import {
  GET_REQUEST,
  GET_REQUEST_FAILURE,
  FETCH_PLAYLIST,
  FETCH_PLAYLIST_DETAIL,
  FETCH_PLAYLIST_COMMENT,
  FETCH_PLAYLIST_CATEGORY,
  FETCH_PLAYLIST_HOT,
  FETCH_PLAYLIST_SUBSCRIBER,
  FETCH_SONG_DETAIL,
  FETCH_SEARCH,
  FETCH_SEARCH_HOT,
  FETCH_SEARCH_SUGGEST,
  FETCH_TOPLIST,
  FETCH_TOPLIST_DETAIL,
  FETCH_TOP_ARTIST,
  // FETCH_TOP_ARTIST_MORE,
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

const payload = {
  loading: true,
  payload: {}
}

const initialState = {
  playlists: payload,
  playlist: payload,
  comments: payload,
  categories: payload,
  tags: payload,
  subscribers: payload,
  songs: payload,
  search: payload,
  search_hots: payload,
  search_suggest: payload,
  toplist: payload,
  toplist_detail: payload,
  top_artists: payload,
  artist: payload,
  artist_album: payload,
  artist_mv: payload,
  artist_desc: payload,
  artist_simi: payload,
  album: payload,
  album_comment: payload,
  song_url: payload,
  lyric: payload
};

const playlist = (state = initialState, action) => {  
  switch (action.type) {
    case GET_REQUEST:
      const { 
        playlists, tags, categories, 
        playlist, comments,subscribers, 
        songs, search, search_hots, 
        search_suggest, toplist, 
        toplist_detail, top_artists, 
        artist, artist_album, artist_mv, artist_desc, artist_simi,
        album, album_comment,
        song_url, lyric
      } = action
      if(playlists) {
        return { ...state, playlists };
      } else if(tags) {
        return { ...state, tags };
      } else if(categories) {
        return { ...state, categories };
      } else if(playlist) {
        return { ...state, playlist };
      } else if(comments) {
        return { ...state, comments };
      } else if(subscribers) {
        return { ...state, subscribers };
      } else if(songs) {
        return { ...state, songs };
      } else if(search) {
        return { ...state, search };
      } else if(search_hots) {
        return { ...state, search_hots };
      } else if(search_suggest) {
        return { ...state, search_suggest };
      } else if(toplist) {
        return { ...state, toplist };
      } else if(toplist_detail) {
        return { ...state, toplist_detail };
      } else if(top_artists) {
        return { ...state, top_artists };
      } else if(artist) {
        return { ...state, artist };
      } else if(artist_album) {
        return { ...state, artist_album };
      } else if(artist_mv) {
        return { ...state, artist_mv };
      } else if(artist_desc) {
        return { ...state, artist_desc };
      } else if(artist_simi) {
        return { ...state, artist_simi };
      } else if(album) {
        return { ...state, album };
      } else if(album_comment) {
        return { ...state, album_comment };
      }  else if(song_url) {
        return { ...state, song_url };
      }  else if(lyric) {
        return { ...state, lyric };
      } else {
        return { ...state };
      }

    case GET_REQUEST_FAILURE:
      return { ...state };
    case FETCH_PLAYLIST:
      return { ...state,
        playlists: {
          loading: false,
          payload: action.playlists.payload
        }
      }
    case FETCH_PLAYLIST_HOT:
      return { ...state,
        tags: {
          loading: false,
          payload: action.tags.payload
        }
      }
    case FETCH_PLAYLIST_CATEGORY:
      return { ...state,
        categories: {
          loading: false,
          payload: action.categories.payload
        }
      }
    case FETCH_PLAYLIST_DETAIL:
      return { ...state,
        playlist: {
          loading: false,
          payload: action.playlist.payload
        }
      }
    case FETCH_PLAYLIST_COMMENT:
      return { ...state,
        comments: {
          loading: false,
          payload: action.comments.payload
        }
      }
    case FETCH_PLAYLIST_SUBSCRIBER:
      return { ...state,
        subscribers: {
          loading: false,
          payload: action.subscribers.payload
        }
      }
    case FETCH_SONG_DETAIL:
      action.songs.payload.songs.forEach( (track, i) => {        
        action.songs.payload.privileges.forEach( privilege => {          
          if(privilege.id === track.id) {            
            track.st = privilege.st;
          }          
      })})
      return { ...state,
        songs: {
          loading: false,
          payload: action.songs.payload
        }
      }
    case FETCH_SEARCH:
      return { ...state,
        search: {
          loading: false,
          payload: action.search.payload
        }
      }
    case FETCH_SEARCH_HOT:
      return { ...state,
        search_hots: {
          loading: false,
          payload: action.search_hots.payload
        }
      }
    case FETCH_SEARCH_SUGGEST:
      return { ...state,
        search_suggest: {
          loading: false,
          payload: action.search_suggest.payload
        }
      }
    case FETCH_TOPLIST:
      return { ...state,
        toplist: {
          loading: false,
          payload: action.toplist.payload
        }
      }
    case FETCH_TOPLIST_DETAIL:
      return { ...state,
        toplist_detail: {
          loading: false,
          payload: action.toplist_detail.payload
        }
      }
    case FETCH_TOP_ARTIST:
      return { ...state,
        top_artists: {
          loading: false,
          payload: action.top_artists.payload
        }
      }
    case FETCH_ARTIST:
      return { ...state,
        artist: {
          loading: false,
          payload: action.artist.payload
        }
      }
    case FETCH_ARTIST_ALBUM:
      return { ...state,
        artist_album: {
          loading: false,
          payload: action.artist_album.payload
        }
      }
    case FETCH_ARTIST_MV:
      return { ...state,
        artist_mv: {
          loading: false,
          payload: action.artist_mv.payload
        }
      }
    case FETCH_ARTIST_DESC:
      return { ...state,
        artist_desc: {
          loading: false,
          payload: action.artist_desc.payload
        }
      }
    case FETCH_ARTIST_SIMI:
      return { ...state,
        artist_simi: {
          loading: false,
          payload: action.artist_simi.payload
        }
      }
    case FETCH_ALBUM:
      return { ...state,
        album: {
          loading: false,
          payload: action.album.payload
        }
      }
    case FETCH_ALBUM_COMMENT:
      return { ...state,
        album_comment: {
          loading: false,
          payload: action.album_comment.payload
        }
      }
    case FETCH_SONG_URL:
      return { ...state,
        song_url: {
          loading: false,
          payload: action.song_url.payload
        }
      }
    case FETCH_LYRIC:
      return { ...state, 
        lyric: {
          loading: false,
          payload: action.lyric.payload
        }
      }
    //TODO
    // case FETCH_TOP_ARTIST_MORE:
    //   return { ...state,
    //     top_artists: {
    //       loading: false,
    //       payload: action.top_artists.payload
    //     }
    //   }
    default:
      return state;
  }
};

export default playlist;
