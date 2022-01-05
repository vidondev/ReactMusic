import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

import { fetch_playlist_detail, fetch_playlist_comment, fetch_playlist_subscriber, fetch_song_url } from '../actions';
import { player_get_playlist, player_set_play } from '../actions/player';

import Progress from '../components/Progress';
import PlaylistInfo from '../components/PlaylistInfo';
import PlaylistTrack from '../components/PlaylistTrack';
import PlaylistComment from '../components/PlaylistComment';
import PlaylistSubscriber from '../components/PlaylistSubscriber';

const styles = theme => ({
  root: {
  },
  tabRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  searchInput: {
    '& input': {
      padding: 8
    }
  }
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  fetch_playlist_detail: (playlist_id) => dispatch(fetch_playlist_detail(playlist_id)),
  fetch_playlist_comment: (playlist_id) => dispatch(fetch_playlist_comment(playlist_id)),
  fetch_playlist_subscriber: (playlist_id) => dispatch(fetch_playlist_subscriber(playlist_id)),  
  fetch_song_url: (params) => dispatch(fetch_song_url(params)),  
  player_get_playlist: (playlist) => dispatch(player_get_playlist(playlist)),
  player_set_play: (paused) => dispatch(player_set_play(paused)),
})

class PlaylistDetail extends React.Component {

  state = {
    value: 0,
    tracks: [],
    search_text: "",
    no_tracks: false,
    comment_offset: 0,
    subscriber_offset: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
    const { match, fetch_playlist_comment, fetch_playlist_subscriber } = this.props;
    if(value === 1) {
      this.setState({
        comment_offset: 0
      })
      fetch_playlist_comment( {id: match.params.id, limit: 30, offset: 0} )
    } else if(value === 2) {
      this.setState({
        subscriber_offset: 0
      })
      fetch_playlist_subscriber( {id: match.params.id, limit: 30, offset: 0} )
    } else if(value === 0) {
      // var song_ids = playlist.playlist.payload.playlist.trackIds.map( (track) => { return track.id; })
      // fetch_song_detail({ids: song_ids.join(",")})
    }
  }

  onInputChange = (evt) => {
    var search = evt.target.value.trim().toLowerCase()
    let tracks = this.props.playlist.songs.payload.songs.filter((item)=>{
      return item.name.toLowerCase().indexOf(search) !== -1 || item.ar[0].name.toLowerCase().indexOf(search) !== -1 || item.al.name.toLowerCase().indexOf(search) !== -1
    });
    var no_tracks = tracks.length > 0 ? false : true;

    this.setState({
      tracks: tracks,
      no_tracks: no_tracks,
      search_text: evt.target.value.trim()
    });
  }

  onCommentPaginationClick = (value) => {
    const { match, fetch_playlist_comment } = this.props;
    fetch_playlist_comment({ id: match.params.id, limit: 30, offset: value } )
    this.setState({ comment_offset: value })
  }

  onSubscriberPaginationClick = (value) => {
    const { match, fetch_playlist_subscriber } = this.props;
    fetch_playlist_subscriber({ id: match.params.id, limit: 30, offset: value } )
    this.setState({ subscriber_offset: value })
  }


  componentDidMount() {
    const { fetch_playlist_detail, match } = this.props;
    fetch_playlist_detail({id:match.params.id})
  }

  render() {
    const { classes, playlist, player_get_playlist, player, fetch_song_url, player_set_play } = this.props;
    let playlistInfo = playlist.playlist;
    var tracks = [];
    if(this.state.tracks.length > 0) {
      tracks = this.state.tracks;
    } else {
      tracks = playlist.songs.payload.songs ? playlist.songs.payload.songs : [];
    }
    const { value } = this.state;
    const player_props = {
      player, player_get_playlist, fetch_song_url, player_set_play
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
        {
          playlistInfo.loading ? <Progress /> : playlistInfo.payload.playlist.creator && <PlaylistInfo playlist={playlistInfo.payload}/>
        }
        </Grid>
        { playlist.playlist.payload.playlist &&
          <Grid item xs={12}>
            <Grid container justify="space-between" alignItems="center" className={classes.tabRoot}>
              <Grid item>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                >
                  <Tab label="歌曲列表" value={0} />
                  <Tab label={`评论(${playlist.playlist.payload.playlist.commentCount ? playlist.playlist.payload.playlist.commentCount: 0})`} value={1}/>
                  <Tab label="收藏者" value={2}/>
                </Tabs>
              </Grid>
              { this.state.value === 0 &&
              <Grid item>
                <TextField
                  variant="outlined"
                  placeholder="搜索歌单音乐"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                  }}
                  onChange={this.onInputChange}
                  className={classes.searchInput}
                  type="search"
                />
              </Grid>
              }
            </Grid>
            { value === 0 && (playlist.songs.loading ? <Progress /> : <PlaylistTrack {...player_props} search_text={this.state.search_text} no_tracks={this.state.no_tracks} tracks={tracks}/>) }
            { value === 1 && (playlist.comments.loading ? <Progress /> : <PlaylistComment comments={playlist.comments.payload.comments} total={playlist.comments.payload.total} offset={this.state.comment_offset} onPaginationClick={this.onCommentPaginationClick} />) }
            { value === 2 && (playlist.subscribers.loading ? <Progress /> : <PlaylistSubscriber playlist={playlist} offset={this.state.subscriber_offset} onPaginationClick={this.onSubscriberPaginationClick} />) }
          </Grid>
        }
        </Grid>

      </div>
    );
  }
}
const StyledPlaylistDetail = withStyles(styles)(PlaylistDetail);
export default connect(mapStateToProps, mapDispatchToProps)(StyledPlaylistDetail)
