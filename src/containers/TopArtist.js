import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';


import { fetch_top_artists } from '../actions';
import Progress from '../components/Progress';

import { } from '../constants/ActionTypes';

 
const styles = theme => ({
  root: {
    
  },
  cardRoot: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  media: {
    borderRadius: 8,
  },
  link: {
    marginTop: theme.spacing(1),
    ...theme.linkText
  }
});

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  fetch_top_artists: (parmas) => dispatch(fetch_top_artists(parmas)),
})

class Toplist extends React.Component {

  componentDidMount() {
    this.props.fetch_top_artists()
  }

  render() {
    const { classes, playlist } = this.props;
    console.log(playlist)
    
    let render = playlist.top_artists.payload.artists && playlist.top_artists.payload.artists.map(artist => {
      return (<Grid item xs={12} sm={6} md={3} lg={2} xl={1} key={artist.id}>
        <Card className={classes.cardRoot}>
          <CardActionArea component={Link} to={`/artists/${artist.id}`}>
            <CardMedia   
              className={classes.media}
              image={artist.img1v1Url}
              title={artist.name}
              component="img"
            />    
          </CardActionArea>
          <Typography display="block" variant="subtitle2" component={Link} to={`/artists/${artist.id}`} className={classes.link}>
            {artist.name}
          </Typography>          
        </Card>
      </Grid>)
    })
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {playlist.top_artists.loading && <Grid item xs={12}><Progress /></Grid>}                        
          {render}
        </Grid>
      </div>
    );
  }
}
const StyledToplist = withStyles(styles)(Toplist);
export default connect(mapStateToProps, mapDispatchToProps)(StyledToplist)