import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';

const styles = theme => ({
  root: {
  },
  cover: {
    width: 193,
    ...theme.shape
  },
  textWrapper: {
    marginBottom: theme.spacing(1)
  },
  textGutterRight: {
    marginRight: theme.spacing(1)
  },
  button: {
    marginRight: theme.spacing(1.5),    
  },
  alias: {
    marginBottom: theme.spacing(1),
    "& p": {
      marginRight: theme.spacing(1)
    }
  },
  buttonGroup: {
    marginBottom: theme.spacing(1)
  },
  linkText: {
    ...theme.linkText
  }
});

const AlbumInfo = ( { classes, album } ) => {    
    return (
      <Grid container spacing={2}>      
        <Grid item>
          <CardMedia
            className={classes.cover}
            image={album.picUrl}
            title={album.name}
            component="img"            
          />
        </Grid>
        <Grid item xs={9}>     
          <Typography variant="h6" gutterBottom>{album.name}</Typography>
          <div className={classes.alias}>
            歌手:{album.artists.map( (artist, i) => <Typography className={clsx(classes.linkText, classes.textGutterRight)} key={`artist-${i}`} variant="body2" display="inline" component={Link} to={`/artists/${artist.id}`}>{artist.name}</Typography>)}  
          </div>
          <div className={classes.textWrapper}>
            <Typography variant="body2" display="block" className={classes.textGutterRight}>时间: <Moment format="YYYY-MM-DD">{album.publishTime}</Moment></Typography>            
            <Typography variant="body2" display="block" className={classes.textGutterRight}>发行公司: {album.company}</Typography>            
          </div>
        </Grid>
      </Grid>
    );
}
export default withStyles(styles)(AlbumInfo);