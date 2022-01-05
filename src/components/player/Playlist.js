import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import Moment from 'react-moment';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import AudioIcon from './AudioIcon';



const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer - 1,    
    position: 'fixed',
    bottom: 70,
    right: theme.spacing(1),
    padding: theme.spacing(2) 
  },
  tab: {
    minWidth: 80
  },
  table: {
    width: 600,        
    maxHeight: 500,
    minHeight: 500,
    overflow:'auto'
  },
  linkText: {
    ...theme.linkText
  },
  disableTextColor: {
    color: theme.palette.grey[500]
  }
});

const Playlist = ( { classes, player, fetch_song_url, player_toggle_playlist, player_set_play } ) => {   
  return (  
    <Slide direction="up" in={player.open_playlist} mountOnEnter unmountOnExit>
      <Paper className={clsx(classes.root)}>
        <Grid container spacing={2}>
          <Grid item xs={12} container justify="space-between">
            <Grid item>            
              <Tabs value={0}>
                <Tab label="正在播放" value={0} className={classes.tab}/>
              </Tabs>
            </Grid>
            <Grid item>
              <IconButton onClick={ () => player_toggle_playlist(false) }>
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>          
          <Grid item xs={12} className={classes.table}>
            <Table >                            
              <TableBody>
              {
                player.playlist.map( (track, i) => {
                  return (
                    <TableRow key={track.id}>
                      <TableCell size="small">
                        <Typography className={clsx(classes.tableCellHeader,{
                          [classes.disableTextColor]: track.st === 0 ? false : true
                        })} variant="subtitle2" display="inline">{ i+1 < 10 ?  ('0'+(i+1)) : (i+1) }</Typography>
                      </TableCell>
                      <TableCell size="small">
                      <IconButton onClick={ () => {
                          if(player.track && player.track.id === track.id) {
                            player_set_play(!player.paused)
                          } else {
                            fetch_song_url({id: track.id});   
                          }
                          
                        } 
                      } disabled={track.st === 0 ? false : true}>
                        {(player.track === track) && <AudioIcon player={player} />}
                        {(player.track !== track) && ((player.track === track && !player.paused) ? <PauseCircleOutlineIcon fontSize="small" /> : <PlayCircleOutlineIcon fontSize="small" />)}
                      </IconButton>
                      </TableCell>
                      <TableCell size="small">
                        <Typography variant="subtitle2" className={clsx(classes.tableCellHeader,{
                          [classes.disableTextColor]: track.st === 0 ? false : true
                        })}>{track.name}</Typography>
                      </TableCell>
                      <TableCell size="small">
                        <Typography variant="subtitle2" color="textSecondary">{
                          track.ar.map( (ar, k) => <Link key={`ar-${k}`} className={classes.linkText} to={`/artists/${ar.id}`}>{ar.name}</Link>).reduce((prev, curr) => [prev, ' / ', curr])
                        }</Typography>
                      </TableCell>              
                      <TableCell size="small">
                        <Typography variant="subtitle2" color="textSecondary">
                          <Moment format="mm:ss">{track.dt}</Moment>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                })
              }
              </TableBody>
            </Table>        
          </Grid>
        </Grid>
      </Paper>   
    </Slide>                                     
  );
}
export default withStyles(styles)(Playlist);