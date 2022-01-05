import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
  }
});

const ArtistDesc = ( { classes, artist, artist_desc } ) => {
    return (
      <div className={classes.root}>
        <Typography variant="h6" gutterBottom>{artist.artist.name}简介</Typography>
        <Typography variant="body2" gutterBottom color="textSecondary">{artist.artist.briefDesc}</Typography>
        {
          artist_desc.introduction && artist_desc.introduction.map( (intro, i) => {
            return <div className={classes.intro} key={`intro-${i}`}>              
              <Typography variant="h6" gutterBottom>{intro.ti}</Typography>
              {
                intro.txt.split("\n").map( (txt, j) => <Typography variant="body2" gutterBottom color="textSecondary" key={`txt-${j}`}>{txt}</Typography>)
              }
              
            </div>
          })
        }
      </div>
    );
}
export default withStyles(styles)(ArtistDesc);