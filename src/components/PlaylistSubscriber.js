import React from 'react';
// import { Link } from 'react-router-dom';

// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
// import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Container from '@material-ui/core/Container';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import FaceIcon from '@material-ui/icons/Face';
import Pagination from "material-ui-flat-pagination";

const styles = theme => ({
  root: {

  },
  flex: {
    display: 'flex',

  },
  avatar: {
    width: 96,
    height: 96
  },
  container: {
    padding: theme.spacing(2)
  },
  itemText: {
    padding: theme.spacing(2)
  },
  pagination: {
    margin: theme.spacing(3)
  }
});


const PlaylistSubscriber = ({playlist, classes, offset, onPaginationClick}) => {
  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        {
          playlist.subscribers.payload.subscribers.map( (subscriber, i) => {
            return <Grid item lg={3} md={6} key={i}>
              <ListItem alignItems="center">
                <ListItemAvatar>
                  <Avatar alt={subscriber.nickname} src={subscriber.avatarUrl} className={classes.avatar} />
                </ListItemAvatar>
                <ListItemText className={classes.itemText} primary={
                  <React.Fragment>
                    {subscriber.nickname}
                    {subscriber.gender > 0 &&
                     <FaceIcon color={subscriber.gender === 1 ? 'primary' : 'secondary'} />
                    }
                  </React.Fragment>
                } secondary={subscriber.signature} primaryTypographyProps={{'className': classes.flex}}/>

              </ListItem>
            </Grid>
          })
        }        
      </Grid>      
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <Pagination 
            className={classes.pagination}                    
            limit={30}
            offset={offset || 0}
            total={playlist.playlist.payload.playlist.subscribedCount}
            onClick={(e, offset) => onPaginationClick(offset)}
          />
        </Grid>
      </Grid>  
    </Container>
  )
}


export default withStyles(styles)(PlaylistSubscriber);