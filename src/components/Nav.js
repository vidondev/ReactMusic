import React from 'react';
import { Link } from 'react-router-dom'

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AlbumIcon from '@material-ui/icons/Album';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  iconSize: {
    fontSize: 36
  },
  justifyContent: {
    justifyContent: 'center'
  },
  itemIcon: {
    paddingLeft: theme.spacing(1)+4
  },
  itemText: {
    marginLeft: theme.spacing(3)    
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemTextSmall: {
    fontSize: 12
  }
});

//Icons
const data = [
  {
    text: '推薦',
    icon: AlbumIcon,
    path: '/',
  },
  {
    text: '歌單',
    icon: MusicNoteIcon,
    path: '/',
  },
  {
    text: '排行榜',
    icon: QueueMusicIcon,
    path: '/toplist',
  },
  {
    text: '歌手',
    icon: PersonOutlineIcon,
    path: '/artists',
  },
  {
    text: '主播電台',
    icon: GraphicEqIcon,
    path: '/',
  },
  {
    text: '最新音樂',
    icon: FiberNewIcon,
    path: '/search',
  }
]

/**
 * @class Nav
 * @extends {Component}
 */
const Nav = ({ classes, ui, toggle_drawer } ) => {
  return (
    <div className={classes.root}>
      <List component="nav">       
        {
          data.map( (v, i) => {
            return (
              <ListItem to={v.path} component={Link} button key={i} className={clsx({[classes.listItem]: !ui.drawer.isOpen})}>
                <ListItemIcon className={clsx({[classes.itemIcon]: ui.drawer.isOpen, [classes.justifyContent]: !ui.drawer.isOpen})}>
                  <v.icon className={classes.iconSize}/>                  
                </ListItemIcon>
                <ListItemText primary={<Typography variant={ui.drawer.isOpen ? "body1" : "body2"}>{v.text}</Typography>} className={clsx({[classes.itemText]: ui.drawer.isOpen})}/>
              </ListItem>
            )
          })
        }
      </List>
    </div>
  );
}
const StyledNav = withStyles(styles)(Nav);
export default (StyledNav)