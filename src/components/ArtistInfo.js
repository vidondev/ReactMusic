import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
});

const ArtistInfo = ( { classes, artist} ) => {
    return (
      <Grid container spacing={2}>
      { artist.artist && 
        <React.Fragment>
        <Grid item>
          <CardMedia
            className={classes.cover}
            image={artist.artist.img1v1Url}
            title={artist.artist.name}
            component="img"            
          />
        </Grid>
        <Grid item xs={9}>     
          <Typography variant="h6" gutterBottom>{artist.artist.name}</Typography>
          <div className={classes.alias}>
            {artist.artist.alias.map( (alia, i) => <Typography key={`alia-{i}`} variant="body2" display="inline">{alia}</Typography>)}  
          </div>
          <div className={classes.buttonGroup}>
            <Button size="small" variant="outlined" className={classes.button}>收藏</Button>
            <Button size="small" variant="outlined" className={classes.button}>个人主页</Button>
          </div>
          <div className={classes.textWrapper}>
            <Typography variant="subtitle1" display="inline" className={classes.textGutterRight}>单曲数:{artist.artist.musicSize}</Typography>
            <Typography variant="subtitle1" display="inline" className={classes.textGutterRight}>专辑数:{artist.artist.albumSize}</Typography>
            <Typography variant="subtitle1" display="inline" className={classes.textGutterRight}>MV数:{artist.artist.mvSize}</Typography>
          </div>
        </Grid>
        </React.Fragment>
      }
      </Grid>
    );
}
export default withStyles(styles)(ArtistInfo);