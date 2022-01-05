import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import { fetch_artist, fetch_artist_album, fetch_artist_mv, fetch_artist_desc, fetch_song_url  } from '../actions';
import { player_get_playlist, player_set_track  } from '../actions/player';
import Progress from '../components/Progress';
import ArtistInfo from '../components/ArtistInfo';
import ArtistDesc from '../components/ArtistDesc';
import ArtistAlbum from '../components/ArtistAlbum';
import ArtistMV from '../components/ArtistMV';
import PlaylistTrack from '../components/PlaylistTrack';

 
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
  fetch_artist: (params) => dispatch(fetch_artist(params)),
  fetch_artist_album: (params) => dispatch(fetch_artist_album(params)),
  fetch_artist_mv: (params) => dispatch(fetch_artist_mv(params)),
  fetch_artist_desc: (params) => dispatch(fetch_artist_desc(params)),    
  fetch_song_url: (params) => dispatch(fetch_song_url(params)),    
  player_get_playlist: (playlist) => dispatch(player_get_playlist(playlist)),  
  player_set_track: (track, paused) => dispatch(player_set_track(track, paused)),  
})

class Artist extends React.Component {

  state = {
    value: 0,
    album_offset: 0,
    mv_offset: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
    const { match, fetch_artist_album, fetch_artist_mv, fetch_artist_desc } = this.props;     
    if(value === 1) {          
      fetch_artist_album( {id: match.params.id, limit: 60, offset: 0} )
      this.setState({ album_offset: 0 });
    } else if(value === 2) {      
      fetch_artist_mv( {id: match.params.id, limit: 60, offset: 0} )
      this.setState({ mv_offset: 0 });
    } else if(value === 3) {      
      fetch_artist_desc({id: match.params.id})
    }
  }

  componentDidUpdate (prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.props.fetch_artist({id:this.props.match.params.id})  
    }
  }

  onAlbumPaginationClick = (value) => {
    const { match, fetch_artist_album } = this.props;     
    fetch_artist_album({ id: match.params.id, limit: 60, offset: value } )
    this.setState({ album_offset: value })
  }

  onMVPaginationClick = (value) => {
    const { match, fetch_artist_mv } = this.props;     
    fetch_artist_mv({ id: match.params.id, limit: 60, offset: value } )
    this.setState({ mv_offset: value })
  }  

  componentDidMount() {
    const { fetch_artist, match } = this.props;
    fetch_artist({id:match.params.id})      
  }

  render() {
    const { classes, player, playlist, player_get_playlist, player_set_track, fetch_song_url} = this.props;    
    const playlistProp = {
      player_set_track: player_set_track,
      player: player, 
      player_get_playlist: player_get_playlist,
      tracks: playlist.songs.payload.songs ? playlist.songs.payload.songs : [],
      fetch_song_url: fetch_song_url
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>     
          <Grid item xs={12}>     
          { playlist.artist.loading && <Grid item xs={12}><Progress /></Grid> }
          { !playlist.artist.loading && <ArtistInfo artist={playlist.artist.payload} /> }
          </Grid>
          <Grid item xs={12}>     
            <Tabs
              className={classes.tabs}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Tab label="热门歌曲" value={0} />
              <Tab label="专辑" value={1} />
              <Tab label="MV" value={2} />
              <Tab label="歌手详情" value={3} />
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            { this.state.value === 0 && (playlist.songs.loading ? <Progress /> : <PlaylistTrack {...playlistProp } />) }
            { this.state.value === 1 && (playlist.artist_album.loading ? <Progress /> : <ArtistAlbum albums={playlist.artist_album.payload} onPaginationClick={this.onAlbumPaginationClick} offset={this.state.album_offset} />) }
            { this.state.value === 2 && (playlist.artist_mv.loading ? <Progress /> : <ArtistMV artist={playlist.artist.payload} mvs={playlist.artist_mv.payload} onPaginationClick={this.onMVPaginationClick} offset={this.state.mv_offset} />) }
            { this.state.value === 3 && (playlist.artist_desc.loading ? <Progress /> : <ArtistDesc artist={playlist.artist.payload} artist_desc={playlist.artist_desc.payload} />) }
          </Grid>        
        </Grid>
      </div>
    );
  }
}
const StyledArtist = withStyles(styles)(Artist);
export default connect(mapStateToProps, mapDispatchToProps)(StyledArtist)