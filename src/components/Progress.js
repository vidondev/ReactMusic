import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(3)
  }
});

const Progress = ({classes}) => {
  return <div className={classes.root}><CircularProgress disableShrink/></div>
}

export default withStyles(styles)(Progress);