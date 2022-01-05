import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';



const styles = theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1,
    top: 0,
    flexGrow: 1,
    '-webkit-user-select': 'none!important',
    '-webkit-app-region': 'drag!important'
  },
  menu: {
    // width: 216
  },
  menuButton: {
    marginLeft: theme.spacing(1)-10,
    marginRight: theme.spacing(3)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  actions: {
    marginLeft: theme.spacing(1)
  },
  search: {
    color: '#fff'
  },  
  textField: {
    padding: 0
  },
  input: {
    color: '#fff'
  },
  inputInput: {
    paddingTop: 10,
    paddingBottom: 10
  },
  navigate: {
    flexGrow: 1,
    marginLeft: 50
  }

});

const TopBar = ({ classes, ui, toggle_drawer, toggle_search_panel, fetch_search_hot, fetch_search_suggest,history } ) => {  
  const { remote } = window; 
  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar>
          <div className={classes.menu}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
            // onClick={ () => toggle_drawer(!ui.drawer.isOpen) }            
            onClick={ () => remote.getCurrentWindow().minimize() }            
          >
            <MenuIcon />
          </IconButton>
          </div>
          <div className={classes.navigate}>
            <IconButton color="inherit" onClick={ () => history.goBack() }>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={ () => history.goForward() }>
              <NavigateNextIcon />
            </IconButton>
            </div>
          <TextField
            variant="outlined"
            className={classes.textField}
            type="search"
            placeholder="搜索"           
            InputProps={{
              className: classes.input,
              classes: {
                input: classes.inputInput
              },
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onFocus={(evt) => {
              var target = evt.target
              setTimeout( ()=> {
                let type = 'hot';
                if(target.value.trim() === '') {
                  fetch_search_hot();
                } else {
                  type = 'suggest';
                  fetch_search_suggest({ keywords: target.value.trim()})  
                }
                toggle_search_panel(true, type)                   
              }, 500)
            }}            
            onChange={(evt) => { 
              let type = 'hot';
              if(evt.target.value.trim() === '') {
                fetch_search_hot();
              } else {
                type = 'suggest';
                fetch_search_suggest({ keywords: evt.target.value.trim()})  
              }
              toggle_search_panel(true, type)              
            }}
          />          
      </Toolbar>
    </AppBar>
  );
}
const StyledTopBar = withStyles(styles)(TopBar);
export default (StyledTopBar)