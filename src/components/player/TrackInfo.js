import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const styles = theme => ({
  root: {
    borderRadius: 0,
    display: 'flex',    
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: theme.shadows[0],
    backgroundColor: 'transparent',
    margin: theme.spacing(1)
  },
  media: {    
    width: 64-theme.spacing(2),
    height: 64-theme.spacing(2),
  },
  cardMedia: {
    flex: '0 0 64',
  },
  content: {
    marginLeft: theme.spacing(1),
  }
});

const TrackInfo = ( { classes, player } ) => {    
    return (
      <Card className={classes.root}>
        <div className={classes.cardMedia}>
        <CardMedia
          className={classes.media}
          image={`${player.track.al.picUrl}?param=64y64`}
          title={ player.track.name }
        />
        </div>
        <div className={classes.content}>
          <Typography variant="subtitle2" display="inline" noWrap>{ player.track.name } - </Typography>
          <Typography variant="subtitle2" display="inline" color="textSecondary" noWrap>{
            player.track.ar.map( ar => ar.name).join(" / ")
          }</Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <Moment format="mm:ss">{player.current_time*1000}</Moment> / <Moment format="mm:ss">{player.duration*1000}</Moment>
          </Typography>
        </div>
      </Card>
    );
}
export default withStyles(styles)(TrackInfo);