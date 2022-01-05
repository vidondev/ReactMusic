import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { PLAYLIST_CONFIG } from '../constants/APIConfig';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';

import {
  fetch_playlist,
  fetch_playlist_hot,  
  fetch_playlist_category,
  toggle_modal } from '../actions';

import PlaylistComponent from '../components/PlaylistComponent';
import Progress from '../components/Progress';
import HotCat from '../components/HotCat';
import CatListModal from '../components/CatListModal';
import Pagination from "material-ui-flat-pagination";

const styles = theme => ({
  root: {
  },
  icon: {
    fontSize: 16
  }
});

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    ui: state.ui
  }
}

const mapDispatchToProps = dispatch => ({  
  toggle_modal: (toggle) => dispatch(toggle_modal(toggle)),
  fetch_playlist: (params) => dispatch(fetch_playlist(params)),
  fetch_playlist_hot: () => dispatch(fetch_playlist_hot()),
  fetch_playlist_category: () => dispatch(fetch_playlist_category()),
})

class Playlist extends React.Component {

  componentDidMount() {
    this.props.fetch_playlist()
    this.props.fetch_playlist_hot()
    this.props.fetch_playlist_category()
  }

  componentDidUpdate (prevProps) {
    if(prevProps.location.search !== this.props.location.search) {
      this.props.fetch_playlist()
    }
  }

  handlePaginationClick (offset) {
    const { history } = this.props;
    var parsed = queryString.parse(history.location.search);    
    parsed.offset = offset;
    parsed.limit = parsed.limit || PLAYLIST_CONFIG.limit    
    history.push( `/?${queryString.stringify(parsed)}`)
  }

  render() {
    const { ui, toggle_modal, playlist, classes, location } = this.props;    
    const parsed = queryString.parse(location.search);
    let playlists = playlist.playlists.payload.playlists;
    let render = playlists && playlists.map(playlist => {
      return (<Grid item xs={12} sm={6} md={3} lg={2} xl={1} key={playlist.id}><PlaylistComponent playlist={playlist} key={playlist.id} /></Grid>)
    })
    return (
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Button size="small" variant="outlined" color="primary" onClick={ () => toggle_modal(true) }>
                    全部歌单<ChevronRight className={classes.icon} />
                  </Button>
                </Grid>
                <Grid item><HotCat playlist={playlist} location={parsed} /></Grid>
              </Grid>                
            </Grid>
            {render}
            { !playlist.playlists.loading && <Grid container justify="center" alignItems="center">
              <Grid item>
                <Pagination 
                  centerRipple={true}             
                  limit={PLAYLIST_CONFIG.limit}
                  offset={parsed.offset || 0}
                  total={playlist.playlists.payload.total}
                  onClick={(e, offset) => this.handlePaginationClick(offset)}
                />
              </Grid>
            </Grid>
            }
            {playlist.playlists.loading && <Grid item xs={12}><Progress /></Grid>}
          </Grid>
          <CatListModal isOpen={ui.modal.isOpen} toggle_modal={toggle_modal} playlist={playlist}/>
        </div>
    );
  }
}
const StyledPlaylist = withStyles(styles)(Playlist);
export default connect(mapStateToProps, mapDispatchToProps)(StyledPlaylist)