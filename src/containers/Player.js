import React from 'react';
import { connect } from 'react-redux';

import greyColor from '@material-ui/core/colors/grey';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';


import Moment from 'react-moment';

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import TrackInfo from '../components/player/TrackInfo';
import Control from '../components/player/Control';
import Playlist from '../components/player/Playlist';
import LyricPanel from '../components/player/LyricPanel';

import { set_audio, player_set_current_time, player_set_track, player_get_playmode, player_toggle_playlist, player_toggle_lyric, player_set_play } from '../actions/player';
import { fetch_song_url } from '../actions';

const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    top: 'auto',
    bottom: 0,
    backgroundColor: greyColor[200],
    flexGrow: 1
  },
  progressRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -12
  },
  toolbar: {
    position: 'relative'
  },
  textBtn: {
    width: 48,
    height: 48
  }
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  set_audio: (audio) => dispatch(set_audio(audio)),
  player_set_current_time: (current_time) => dispatch(player_set_current_time(current_time)),
  player_get_playmode: () => dispatch(player_get_playmode()),
  player_set_track: (track, paused) => dispatch(player_set_track(track, paused)),
  player_set_play: (paused) => dispatch(player_set_play(paused)),
  player_toggle_playlist: (toggle) => dispatch(player_toggle_playlist(toggle)),
  player_toggle_lyric: (toggle) => dispatch(player_toggle_lyric(toggle)),
  fetch_song_url: (params) => dispatch(fetch_song_url(params)),
})

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  const popperRef = React.useRef(null);
  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.update();
    }
  });

  return (
    <Tooltip
      PopperProps={{
        popperRef,
      }}
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={<Moment format="mm:ss">{value*1000}</Moment>}
    >
      {children}
    </Tooltip>
  );
}

class Player extends React.Component {


  state = {
    duration: 0,
    currentTime: 0,
  }



  componentDidMount() {
    this.audioPlayer.addEventListener("timeupdate", this.onTimeUpdate);
    this.audioPlayer.addEventListener("ended", this.onEnded);
    this.props.set_audio(this.audioPlayer);
  }

  onTimeUpdate = (evt) => {
    this.props.player_set_current_time(evt.target.currentTime);
  }

  onEnded = (evt) => {
    const { player, fetch_song_url } = this.props;
    let track;
    if(player.playmode === 0) {
      track  = player.available_playlist[player.available_playlist.indexOf(player.track)+1];
    } else if(player.playmode === 1) {
      track  = player.track;
    } else if(player.playmode === 2) {
      track = player.available_playlist[Math.floor(Math.random()*player.available_playlist.length)]
    }
    fetch_song_url({id: track.id});

  }

  handleSliderChange = (event, newValue) => {
    this.audioPlayer.pause();
    this.props.player_set_current_time(newValue);
  }

  onChangeCommitted = (event, newValue) => {
    this.props.player_set_current_time(newValue);
    this.audioPlayer.currentTime = newValue;
    this.audioPlayer.play()

  }

  handleVolumeChange = (event, newValue) => {
    this.audioPlayer.volume = newValue;
  }

  handlerPlaylist = (event) => {
    this.props.player_toggle_playlist(!this.props.player.open_playlist);
    if(this.props.player.open_lyric) {
      this.props.player_toggle_lyric(false);
    }

  }

  handlerLyric = (event) => {
    this.props.player_toggle_lyric(!this.props.player.open_lyric);
    if(this.props.player.open_playlist) {
      this.props.player_toggle_playlist(false);
    }
  }

  render() {
    const { classes, player,playlist, player_set_track, player_get_playmode, player_toggle_playlist, player_toggle_lyric, fetch_song_url, player_set_play } = this.props;

    return (<React.Fragment>
        <AppBar position="fixed" className={classes.root} component="footer">
          <Toolbar disableGutters={true} className={classes.toolbar}>
            <audio ref={ref => this.audioPlayer = ref} />
            <div className={classes.progressRoot}>
              <Slider min={0} max={player.duration} value={player.current_time || 0} step={0.000000001}  valueLabelDisplay="on" ValueLabelComponent={ValueLabelComponent} onChange={this.handleSliderChange} onChangeCommitted={this.onChangeCommitted}/>
            </div>
            <Grid container>
              <Grid item xs={3} container justify="flex-start" alignItems="center" zeroMinWidth>
              { player.track && <TrackInfo player={player} /> }
              </Grid>
              <Grid item xs={6} container justify="center" alignItems="center">
                <Grid item>
                  <Control player={player} player_set_play={player_set_play} fetch_song_url={fetch_song_url}/>
                </Grid>
              </Grid>
              <Grid item xs={3} container justify="flex-end" alignItems="center">
                <Grid item container alignItems="center" spacing={3}>
                  <Grid item>
                    <IconButton><VolumeUpIcon /></IconButton>
                  </Grid>
                  <Grid item xs>
                    <Slider step={0.01} min={0} max={1} defaultValue={1} onChange={this.handleVolumeChange} onChangeCommitted={this.onVolumeChangeCommitted}/>
                  </Grid>
                  <Grid item>
                    <div style={{margin: 8}}>
                    <IconButton onClick={ () => player_get_playmode() }>
                      {player.playmode === 0 && <RepeatIcon /> }
                      {player.playmode === 1 && <RepeatOneIcon /> }
                      {player.playmode === 2 && <ShuffleIcon /> }
                    </IconButton>
                    <IconButton onClick={this.handlerPlaylist}>
                      <QueueMusicIcon { ...(player.open_playlist && {color: 'secondary'}) }/>
                    </IconButton>
                    <IconButton onClick={this.handlerLyric} className={classes.textBtn}>
                      <Typography { ...(player.open_lyric && {color: 'secondary'}) } variant="button">词</Typography>
                    </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Playlist player={player} player_set_track={player_set_track} player_set_play={player_set_play} player_toggle_playlist={player_toggle_playlist} fetch_song_url={fetch_song_url}/>
        <LyricPanel player={player} playlist={playlist} player_toggle_lyric={player_toggle_lyric} />
      </React.Fragment>)
  }
}

const StyledPlayer = withStyles(styles)(Player);
export default connect(mapStateToProps, mapDispatchToProps)(StyledPlayer)
