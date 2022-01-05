import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/zh-cn';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

import AudioIcon from './player/AudioIcon';

const styles = theme => ({
  root: {
  },
  tableCellHeader: {
    marginRight: theme.spacing(1)
  },
  tableRowBgColor: {
    backgroundColor: theme.palette.grey[100]
  },
  disableTextColor: {
    color: theme.palette.grey[500]
  },
  linkText: {
    ...theme.linkText
  },
  tableRow: {
    '&:hover': {
      backgroundColor: theme.palette.grey[300]
    }
  }
});

const PlaylistTrack = ({ classes, search_text, no_tracks, tracks, player_get_playlist, player, fetch_song_url, player_set_play }) => {    
  return <Table>
    <TableHead>
      <TableRow>
        <TableCell colSpan={2}>
          <Typography variant="subtitle2" color="textSecondary">{tracks.length}首</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" color="textSecondary">音乐标题</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" color="textSecondary">歌手</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" color="textSecondary">专辑</Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2" color="textSecondary">时长</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      { no_tracks ? <TableRow><TableCell colSpan={6} align="center">没有找到与"<Typography color="primary" display="inline">{search_text}</Typography>"相关的音乐</TableCell></TableRow> :
        tracks.map( (track, i) => {
          return (
            <TableRow key={track.id} className={clsx(classes.tableRow, {
                [classes.tableRowBgColor]: i%2 === 0
              })
            }>
              <TableCell size="small">
                <Typography className={clsx(classes.tableCellHeader, {
                  [classes.disableTextColor]: track.st === 0 ? false : true
                })} variant="subtitle2" display="inline">{ i+1 < 10 ?  ('0'+(i+1)) : (i+1) }</Typography>
              </TableCell>
              <TableCell size="small">
                <IconButton onClick={ () => {  
                  if(player.track && player.track.id === track.id) {
                    player_set_play(!player.paused)
                  } else {
                    player_get_playlist(tracks); 
                    fetch_song_url({id: track.id});   
                  }
                  

                }} disabled={track.st === 0 ? false : true}>                
                  {(player.track === track) && <AudioIcon player={player} />}
                  {(player.track !== track) && ((player.track === track && !player.paused) ? <PauseCircleOutlineIcon fontSize="small" /> : <PlayCircleOutlineIcon fontSize="small" />)}                            
                </IconButton>                
              </TableCell>
              <TableCell size="small">
                <Typography variant="subtitle2" className={clsx({
                  [classes.disableTextColor]: track.st === 0 ? false : true
                })}>{track.name}</Typography>
              </TableCell>
              <TableCell size="small">
                <Typography variant="subtitle2" color="textSecondary">{
                  track.ar.map( (ar, k) => <Link key={`ar-${k}`} className={classes.linkText} to={`/artists/${ar.id}`}>{ar.name}</Link>).reduce((prev, curr) => [prev, ' / ', curr])
                }</Typography>
              </TableCell>
              <TableCell size="small">
                <Typography variant="subtitle2" color="textSecondary">{track.al.name}</Typography>
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
}

PlaylistTrack.propTypes = {
  tracks: PropTypes.array.isRequired,
  player_get_playlist: PropTypes.func.isRequired, 
  player: PropTypes.object.isRequired
};


export default withStyles(styles)(PlaylistTrack);