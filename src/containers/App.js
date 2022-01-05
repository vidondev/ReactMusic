import React from 'react';
import { connect } from 'react-redux';
//Route
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
//UI
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';


//Containers & Components
import Playlist from './Playlist';
import PlaylistDetail from './PlaylistDetail';
import Search from './Search';
import Toplist from './Toplist';
import TopArtist from './TopArtist';
import Artist from './Artist';
import Album from './Album';
import Player from './Player';
import Nav from '../components/Nav';
import TopBar from '../components/TopBar';
import SearchPanel from '../components/SearchPanel';



//Actions
import { toggle_drawer, toggle_search_panel, fetch_search_hot, fetch_search_suggest } from '../actions';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: theme.drawer.width,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerPaper: {
    width: theme.drawer.width,
  },
  drawerOpen: {    
    width: theme.drawer.width,
  },
  drawerClose: {    
    overflowX: "hidden",    
    width: theme.spacing(11) + 5
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,  
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  toggle_drawer: (toggle) => dispatch(toggle_drawer(toggle)),
  toggle_search_panel: (toggle, type) => dispatch(toggle_search_panel(toggle, type)),
  fetch_search_hot: () => dispatch(fetch_search_hot()),
  fetch_search_suggest: (params) => dispatch(fetch_search_suggest(params)),
})

/**
 * @class App
 * @extends {Component}
 */
class App extends React.Component {

  render() {
    const { history, classes, ui, toggle_drawer, toggle_search_panel, fetch_search_hot, fetch_search_suggest, playlist } = this.props;      
    return (
      <ConnectedRouter history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <TopBar ui={ui} history={history} toggle_drawer={toggle_drawer} toggle_search_panel={toggle_search_panel} fetch_search_hot={fetch_search_hot} fetch_search_suggest={fetch_search_suggest} />        
        <Drawer
          variant="permanent"
          className={clsx({
            [classes.drawerOpen]: ui.drawer.isOpen,
            [classes.drawerClose]: !ui.drawer.isOpen
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: ui.drawer.isOpen,
              [classes.drawerClose]: !ui.drawer.isOpen
            })
          }}
          open={ui.drawer.isOpen}
        >
          <div className={classes.toolbar} />
          <Nav toggle_drawer={toggle_drawer} ui={ui} />
          <div className={classes.toolbar} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/index.html" component={Playlist} />
            <Route exact path="/" component={Playlist} />
            <Route path="/toplist" component={Toplist} />
            <Route path="/playlist/:id" component={PlaylistDetail} />
            <Route path="/search" component={Search} />
            <Route path="/artists/:id" component={Artist} />
            <Route path="/artists" component={TopArtist} />
            <Route path="/album/:id" component={Album} />
          </Switch>
          <div className={classes.toolbar} />
        </main>        
        <Player />
        { ui.search_panel.isOpen && <ClickAwayListener onClickAway={ () => toggle_search_panel(false) }><div><SearchPanel ui={ui} playlist={playlist} toggle_search_panel={toggle_search_panel} /></div></ClickAwayListener> }
      </div>
      </ConnectedRouter>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));