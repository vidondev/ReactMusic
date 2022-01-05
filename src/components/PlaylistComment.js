import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Moment from 'react-moment';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import Pagination from "material-ui-flat-pagination";


const styles = theme => ({
  root: {
  },
  datetime: {
    color: '#6a6a6a'
  },
  reply: {
    backgroundColor: '#f4f5f5',
    padding: theme.spacing(1)/2
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
});

const PlaylistComment = ({ comments, total, classes, offset, onPaginationClick }) => {    
    return (
      <React.Fragment>
      <List>{
        comments.map( ( comment, i ) => {
            return (
              <React.Fragment key={i}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={comment.user.nickname} src={comment.user.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <React.Fragment>
                        <Typography
                          component={Link}
                          className={clsx(classes.inline, classes.link)}
                          to="/"
                        >{comment.user.nickname}: </Typography>
                        <Typography
                          component="span"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {comment.content}
                        </Typography>
                      </React.Fragment>
                    }
                    secondary={
                      <React.Fragment>
                        <Moment fromNow locale="zh-cn">{comment.time}</Moment>
                        {
                          comment.beReplied.length > 0 &&
                          <List className={classes.reply}>
                           { comment.beReplied.map( (reply, reply_index) => {
                            const text = reply.content ? `${reply.user.nickname}: ${reply.content}` : '该评论已删除';
                            return <React.Fragment key={`reply-${reply_index}`}>
                                <ListItemText  primary={
                                  <React.Fragment>
                                    <Typography
                                      component={Link}
                                      className={clsx(classes.inline, classes.link)}
                                      to="/"
                                      variant="subtitle2"
                                    > {reply.user.nickname}: </Typography>
                                    <Typography
                                      component="span"
                                      color="textPrimary"
                                      variant="body2"
                                    >
                                      {text}
                                    </Typography>
                                  </React.Fragment>
                                }/>
                              </React.Fragment>
                            })
                          }
                          </List>
                        }
                      </React.Fragment>
                    }
                    secondaryTypographyProps={{component: 'div'}}
                  />
                </ListItem>
                <Divider variant="inset" component="li"/>
              </React.Fragment>
              )
          })
      }</List>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <Pagination 
            className={classes.pagination}                    
            limit={30}
            offset={offset || 0}
            total={total}
            onClick={(e, offset) => onPaginationClick(offset)}
          />
        </Grid>        
      </Grid>
      </React.Fragment>
    )
}

export default withStyles(styles)(PlaylistComment);