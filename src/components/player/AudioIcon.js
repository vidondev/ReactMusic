import React from 'react';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';


const styles = theme => ({
  root: {    
  },
  icon: {
   width: 20,
   height: 20,
   display: 'flex',
   overflow: 'hidden'
  },
  element: {
    width: 2,
    height: '100%',
    backgroundColor: pink[500],
    marginLeft: 2,
    animation: '$play .9s infinite alternate linear',    
    "&:first-child": {
      marginLeft: 0
    }
  },
  'paused': {
    animationPlayState: 'paused'  
  },
  '@keyframes play': {
    '0%': {        
      transform: 'translateY(0)'
    },
    '100%': {        
      transform: 'translateY(75%)'
    }      
  }
});

const AudioIcon = ( { classes, player } ) => {    
  return (
    <div className={classes.icon}>
      <span className={clsx(classes.element, {[classes.paused]: player.paused})} style={{animationDelay: '-1.2s'}}/>
      <span className={clsx(classes.element, {[classes.paused]: player.paused})} />
      <span className={clsx(classes.element, {[classes.paused]: player.paused})} style={{animationDelay: '-1.5s'}}/>
      <span className={clsx(classes.element, {[classes.paused]: player.paused})} style={{animationDelay: '-0.9s'}}/>
      <span className={clsx(classes.element, {[classes.paused]: player.paused})} style={{animationDelay: '-0.6s'}}/>
    </div>
  );
}
export default withStyles(styles)(AudioIcon);