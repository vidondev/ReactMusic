import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';


import { fetch_album, fetch_album_comment, fetch_song_url  } from '../actions';
import { player_set_track, player_get_playlist  } from '../actions/player';
import Progress from '../components/Progress';
import AlbumInfo from '../components/AlbumInfo';
import PlaylistTrack from '../components/PlaylistTrack';
import PlaylistComment from '../components/PlaylistComment';

 
const styles = theme => ({
  root: {
    
  },
  tabs: {
    borderBottom: '1px solid #e8e8e8'
  }
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  fetch_album: (params) => dispatch(fetch_album(params)),
  fetch_album_comment: (params) => dispatch(fetch_album_comment(params)),
  fetch_song_url: (params) => dispatch(fetch_song_url(params)),
  player_set_track: (tracks, paused) => dispatch(player_set_track(tracks, paused)),
  player_get_playlist: (playlist) => dispatch(player_get_playlist(playlist)),
})

class Album extends React.Component {

  state = {
    value: 0,    
    comment_offset: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });    
    const { fetch_album_comment, match} = this.props;
    if(value === 1) {
      fetch_album_comment({id:match.params.id})
    }
  }

  onCommentPaginationClick = (value) => {
    const { match, fetch_album_comment } = this.props;     
    fetch_album_comment({ id: match.params.id, limit: 30, offset: value } )
    this.setState({ comment_offset: value })
  }  



  componentDidMount() {
    const { fetch_album, match } = this.props;
    fetch_album({id:match.params.id})      
  }

  render() {
    const { classes, player, playlist, player_get_playlist, fetch_song_url } = this.props;    
    const playlist_props = {
      player: player, 
      player_get_playlist: player_get_playlist,
      tracks: playlist.songs.payload.songs ? playlist.songs.payload.songs : [],
      fetch_song_url: fetch_song_url
    }
    const comment_props = {
      comments: playlist.album_comment.payload.comments,
      total: playlist.album_comment.payload.total, 
      offset: this.state.comment_offset, 
      onPaginationClick: this.onCommentPaginationClick
    }


    return (
      <div className={classes.root}>
        <Grid container spacing={1}>     
          <Grid item xs={12}>     
          { playlist.album.loading ? <Progress /> : <AlbumInfo album={playlist.album.payload.album} /> }
          </Grid>
          <Grid item xs={12}>     
            <Tabs
              className={classes.tabs}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="歌曲列表" value={0} />
              <Tab label={`评论(${playlist.album.payload.album ? playlist.album.payload.album.info.commentCount : 0})`} value={1} />
              <Tab label="专辑详情" value={2} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            { this.state.value === 0 && (playlist.songs.loading ? <Progress /> : <PlaylistTrack {...playlist_props } />) }
            { this.state.value === 1 && (playlist.album_comment.loading ? <Progress /> : <PlaylistComment {...comment_props } />) }
            { this.state.value === 2 && (
              <div>
              <Typography variant="h6" gutterBottom>专辑介绍</Typography>    
              {
                playlist.album.payload.album.description && playlist.album.payload.album.description.split("\n").map( (description, i) => {
                  return <Typography key={`desc-${i}`} variant="body2" color="textSecondary" gutterBottom>{description}</Typography>                                                          
                })
              }</div>
            ) }
          </Grid>        
        </Grid>
      </div>
    );
  }
}
const StyledAlbum = withStyles(styles)(Album);
export default connect(mapStateToProps, mapDispatchToProps)(StyledAlbum)