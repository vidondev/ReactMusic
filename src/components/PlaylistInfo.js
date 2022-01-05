import React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Chip from '@material-ui/core/Chip';
import LinesEllipsis from 'react-lines-ellipsis'
import Moment from 'react-moment';


const styles = theme => ({
  root: {
  },
  cover: {
    width: 193,
    height: 193,
    ...theme.shape
  },
  link: {
    margin: theme.spacing(1)/2
  },
  desc: {
     display: 'inline'
  },
  datetime: {
    color: '#6a6a6a'
  },
  cardHeader: {
    padding: 0,
    marginBottom: theme.spacing(1)
  },
  flexContent: {
    display: 'flex',
    alignItems: 'center',    
  }
});

class PlaylistInfo extends React.Component {

  state = {
    descOpen: false
  }

  render() {
    const { classes, playlist } = this.props;
    return (
      <Grid container spacing={2}>
        <Grid item>
          <CardMedia
            className={classes.cover}
            image={playlist.playlist.coverImgUrl}
            title={playlist.playlist.name}
          />
        </Grid>
        <Grid item xs={9}>
          <Typography className={classes.flexContent} component="h6" variant="h5" gutterBottom>
            <Chip color="secondary" variant="outlined" label={`歌单`} className={classes.link}/> {playlist.playlist.name}
          </Typography>
          <CardHeader
            className={classes.cardHeader}
            avatar={
              playlist.playlist.creator && <Avatar alt={playlist.playlist.creator.nickname} src={playlist.playlist.creator.avatarUrl} />
            }
            title={
              <React.Fragment>
              {playlist.playlist.creator.nickname}&nbsp;&nbsp;<Moment format="YYYY-MM-DD" className={classes.datetime}>{playlist.playlist.createTime}</Moment>创建
              </React.Fragment>
            }
          />
          {playlist.playlist.tags.length > 0 && 
            <Typography gutterBottom className={classes.flexContent}>
              标&nbsp;&nbsp;&nbsp;签: {playlist.playlist.tags.map( (tag, i) => {
                return (<Chip key={i} clickable component={Link} color="secondary" variant="outlined" className={classes.link} to={`/?cat=${encodeURIComponent(tag)}`} label={tag} />)
              })}
            </Typography>
          }
          <Typography gutterBottom>
            歌曲数: {playlist.playlist.trackCount}&nbsp;&nbsp;播放数: {playlist.playlist.playCount}次
          </Typography>

          <Typography className={classes.desc} component="div" onClick={ () => {
            this.setState({
              descOpen: !this.state.descOpen
            })
          }}>
            简&nbsp;&nbsp;&nbsp;介:&nbsp;
            {
              !this.state.descOpen ? <LinesEllipsis text={playlist.playlist.description.trim()} maxLine='1' ellipsis='...' /> :
              playlist.playlist.description.trim()
            }
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
export default withStyles(styles)(PlaylistInfo);