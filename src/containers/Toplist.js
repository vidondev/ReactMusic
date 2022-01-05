import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


import { fetch_toplist_detail } from '../actions';
import Progress from '../components/Progress';

 
const styles = theme => ({
  root: {
    
  },
  cardRoot: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  topCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'center'
  },
  topMedia: {
    width: 200
  },
  media: {
    borderRadius: 8,
    marginBottom: theme.spacing(1)
  },
  link: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
    textDecoration:'none'
  }
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  fetch_toplist_detail: () => dispatch(fetch_toplist_detail()),
})

class Toplist extends React.Component {

  componentDidMount() {
    this.props.fetch_toplist_detail()
  }

  render() {
    const { classes, playlist } = this.props;
    console.log(playlist)
    let top4 = playlist.toplist_detail.payload.list && playlist.toplist_detail.payload.list.slice(0, 4);
    let top4_render = '';
    if(top4) {      
      top4_render = top4.map( (playlist) => {
        return (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3} key={playlist.id}>
            <Card className={classes.topCard} >
              <CardActionArea className={classes.topMedia} component={Link} to={`/playlist/${playlist.id}`}>
                  <CardMedia
                    image={playlist.coverImgUrl || playlist.coverUrl}
                    title={playlist.name}
                    component="img"
                  />    
              </CardActionArea>
                <List>
                {playlist.tracks && playlist.tracks.map( (track, i) => {
                  return <ListItem key={`track-${i}`} dense>
                    <ListItemText
                      primary={
                        <React.Fragment>                          
                          <Typography variant="body2" component="span">{track.first}</Typography>
                          <Typography variant="body2" component="span" color="textSecondary">{` - ${track.second}`}</Typography>
                        </React.Fragment>
                      }
                    />                  
                  </ListItem>
                })}
                </List>
            </Card>
          </Grid>)   
      });      
    }
    let render = playlist.toplist_detail.payload.list && playlist.toplist_detail.payload.list.slice(4).map(playlist => {
      return (<Grid item xs={12} sm={6} md={3} lg={2} xl={1} key={playlist.id}>
        <Card className={classes.cardRoot} >
          <CardActionArea component={Link} to={`/playlist/${playlist.id}`}>
            <CardMedia   
              className={classes.media}
              image={playlist.coverImgUrl}
              title={playlist.name}
              component="img"
            />    
          </CardActionArea>
          <Typography className={classes.link} variant="subtitle2" component={Link} to={`/playlist/${playlist.id}`}>
            {playlist.name}
          </Typography>
        </Card>
      </Grid>)
    })
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
          {playlist.toplist_detail.loading && <Grid item xs={12}><Progress /></Grid>}
          {top4_render}          
          {render}
        </Grid>
        </div>
    );
  }
}
const StyledToplist = withStyles(styles)(Toplist);
export default connect(mapStateToProps, mapDispatchToProps)(StyledToplist)