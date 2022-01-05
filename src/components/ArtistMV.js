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
  link: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
    textDecoration:'none'
  }
});

const ArtistMV = ( { classes, artist, mvs, onPaginationClick, offset } ) => {
  let render = mvs && mvs.mvs.map(mv => {
    return (<Grid item xs={12} sm={6} md={3} lg={2} xl={2} key={`mv-${mv.id}`}>
      <Card className={clsx(classes.card, classes.root)} >
          <CardActionArea component={Link} to="/">
            <CardMedia
              className={classes.media}
              image={mv.imgurl16v9}
              title={mv.name}
              component="img"
            />
          </CardActionArea>
          <Typography display="block" component={Link} to="/" variant="subtitle2" className={classes.link}>{mv.name}</Typography>                                        
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
            total={artist.artist.mvSize}
            onClick={(e, offset) => onPaginationClick(offset)}
          />
        </Grid>        
      </Grid>      
    </Grid>
    
  );
}
export default withStyles(styles)(ArtistMV);