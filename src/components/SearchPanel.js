import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Chip from '@material-ui/core/Chip';

import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AlbumIcon from '@material-ui/icons/Album';
import MusicVideoIcon from '@material-ui/icons/MusicVideo';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import Progress from './Progress';

const styles = theme => ({
  root: {
    position: 'fixed',
    right: 0,
    top: 64,
    bottom: 64,
    boxShadow: theme.shadows[10],
    backgroundColor: theme.palette.background.paper,
    zIndex: theme.zIndex.drawer - 1,
    width: 360,   
    
    overflow: 'auto'
  },
  hot_section: {
    margin: theme.spacing(2),
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  iconRoot: {
    // minWidth: 0
  },
  greyText: {
    color: theme.palette.grey[500]
  }
});

const sections = {
  songs: {
    text: '单曲',
    icon: <AudiotrackIcon />
  },
  artists: {
    text: '歌手',
    icon: <PermIdentityIcon />
  },
  albums: {
    text: '专辑',
    icon: <AlbumIcon />
  },
  mvs: {
    text: '视频',
    icon: <MusicVideoIcon />
  },
  playlists: {
    text: '歌单',
    icon: <QueueMusicIcon />
  }
}

const SearchPanel = ({ classes, playlist, ui }) => {
  return (
  	<div className={classes.root}>                 
      {ui.search_panel.type==="hot" && <div className={classes.hot_section}>
        <Typography variant="body2" gutterBottom>热门搜索</Typography>
        {playlist.search_hots.loading && <Progress />}
        {
          playlist.search_hots.payload.result && playlist.search_hots.payload.result.hots.map((hot,i)=>{
            return <Chip key={i} variant="outlined" label={hot.first} className={classes.chip} />
          })
        }
        </div>
      }
      {ui.search_panel.type==="suggest" && <React.Fragment>
        {playlist.search_suggest.loading && <Progress />}
        <List subheader={<li />}>      
          {playlist.search_suggest.payload.result && playlist.search_suggest.payload.result.order.map( (order, index) => (      
            <React.Fragment>
            <ListItem key={`section-${index}`}>
              <ListItemIcon classes={{
                "root": classes.iconRoot
              }}>
                {sections[order].icon}
              </ListItemIcon>
              <ListItemText primary={<Typography variant="subtitle1" className={classes.greyText}>{sections[order].text}</Typography>} />          
            </ListItem>
            {playlist.search_suggest.payload.result[order].map( (item, itemIndex) => (
              <ListItem button key={`item-${itemIndex}`}>
                <ListItemText inset primary={<Typography variant="subtitle2" noWrap>{item.name}</Typography>} />
              </ListItem>
            ))}  
            </React.Fragment>    
          ))}
        </List>      
      </React.Fragment>}
    </div>
  )
}

export default withStyles(styles)(SearchPanel);