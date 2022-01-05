import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';


const styles = theme => ({
  root: {    
  }
});

const Control = ( { classes, player, player_set_play, fetch_song_url } ) => {    
  let track = {};
  return (
    <div className={classes.root}>
      <IconButton onClick={ () => {
          if(player.available_playlist.length > 0 && player.track) {
            let track_index = player.available_playlist.indexOf(player.track)-1;
            if((track_index) < 0) track_index = player.available_playlist.length-1;
            track = player.available_playlist[track_index];
            fetch_song_url({id: track.id});  
          }                  
        
      }}>
        <SkipPreviousIcon fontSize="small"/>
      </IconButton>      
      <IconButton color="secondary" onClick={ () => {  
        if(player.available_playlist.length > 0) {
          player_set_play(!player.paused)
        }             
      }}>
        { !player.paused ? <PauseCircleOutlineIcon fontSize="large"/> : <PlayCircleOutlineIcon fontSize="large"/> }
      </IconButton>
      <IconButton onClick={ () => {    
        if(player.available_playlist.length > 0) {
          if(player.playmode === 2) {
            track = player.available_playlist[Math.floor(Math.random()*player.available_playlist.length)]
          } else {
            if(player.track) {
              let track_index = player.available_playlist.indexOf(player.track)+1;
              if((track_index) > player.available_playlist.length-1) track_index = 0;
              track = player.available_playlist[track_index];
            }               
          } 
          fetch_song_url({id: track.id});            
        }
      }}>
        <SkipNextIcon fontSize="small" />
      </IconButton>
    </div>
  );
}
export default withStyles(styles)(Control);