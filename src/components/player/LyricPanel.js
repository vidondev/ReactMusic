import React from 'react';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';



const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer - 1,    
    position: 'fixed',
    bottom: 70,
    right: theme.spacing(1),
    padding: theme.spacing(2),    
  },

  tab: {
    minWidth: 80,    
  },  
  container: {
    marginTop: theme.spacing(1),
    width: 600,        
    maxHeight: 500,
    minHeight: 500,
    overflow:'auto'
  }

});

const LyricPanel = ( { classes, player, playlist, player_toggle_lyric } ) => {   
  return (  
    <Slide direction="up" in={player.open_lyric} mountOnEnter unmountOnExit>
      <Paper className={clsx(classes.root)}>  
        <Grid container>      
          <Grid item xs={12} container justify="space-between">
            <Grid item>            
              <Tabs value={0}>
                <Tab label="歌词" value={0} className={classes.tab}/>
              </Tabs>
            </Grid>
            <Grid item>
              <IconButton onClick={ () => player_toggle_lyric(false) }>
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.container}>
            {
              playlist.lyric.payload.lrc && playlist.lyric.payload.lrc.lyric.split("\n").map( (txt, j) => <Typography variant="body2" gutterBottom color={txt.indexOf(player.lyric_index) > -1 ? 'secondary' : 'textSecondary' } key={`txt-${j}`}>
              {txt.replace(/\[(.*?)\]/g,"")}</Typography>)
            }        
          </Grid>
        </Grid>
      </Paper>   
    </Slide>                                     
  );
}
export default withStyles(styles)(LyricPanel);