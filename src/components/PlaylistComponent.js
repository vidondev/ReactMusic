import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    backgroundColor: 'transparent',
    boxShadow: 'none'
  },
  card: {    
  },
  media: {    
    height:'100%',      
    marginBottom: theme.spacing(1),
    ...theme.shape
  },
  linkText: {
    ...theme.linkText,    
  }
});

const PlaylistComponent = ({ classes, playlist }) => {
  return (
    <Card className={clsx(classes.card, classes.root)} >
      <CardActionArea component={Link} to={`/playlist/${playlist.id}`}>
          <CardMedia
            className={classes.media}
            image={playlist.coverImgUrl}
            title={playlist.name}
            component="img"
          />
      </CardActionArea>
      <CardActionArea className={classes.linkText} component={Link} to={`/playlist/${playlist.id}`}>
        <Typography  variant="subtitle2" display="block">
          {playlist.name}
        </Typography>
        <Typography variant="caption" display="block">
          by {playlist.creator.nickname}
        </Typography>
      </CardActionArea>
    </Card>
  );
}
export default withStyles(styles)(PlaylistComponent);