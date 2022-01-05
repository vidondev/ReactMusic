import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Pagination from "material-ui-flat-pagination";
import Moment from 'react-moment';

const styles = theme => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  card: {    
  },
  media: {    
    height:'100%',      
    ...theme.shape
  },
  linkText: {
    marginTop: theme.spacing(1),    
    ...theme.linkText
  }
});

const ArtistAlbum = ( { classes, albums, offset, onPaginationClick } ) => {
  let render = albums && albums.hotAlbums.map(album => {
    return (<Grid item xs={12} sm={6} md={3} lg={2} xl={2} key={`album-${album.id}`}>
      <Card className={clsx(classes.card, classes.root)} >
          <CardActionArea component={Link} to={`/album/${album.id}`}>
              <CardMedia
                className={classes.media}
                image={album.picUrl+"?param=400y400"}
                title={album.name}
                component="img"
              />
            </CardActionArea>
            <CardActionArea className={classes.linkText} component={Link} to={`/album/${album.id}`}>
              <Typography variant="subtitle2">{album.name}</Typography>              
              <Typography variant="caption" color="textSecondary"><Moment format="YYYY-MM-DD">{album.publishTime}</Moment></Typography>              
            </CardActionArea>
        </Card>
      </Grid>)
    })
  return (
    <Grid container spacing={3}>
      {render}
       <Grid container justify="center" spacing={3}>
        <Grid item>
          <Pagination 
            className={classes.pagination}                    
            limit={60}
            offset={offset || 0}
            total={albums.artist.albumSize}
            onClick={(e, offset) => onPaginationClick(offset)}
          />
        </Grid>        
      </Grid>      
    </Grid>
    
  );
}
export default withStyles(styles)(ArtistAlbum);