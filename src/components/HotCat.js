import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

/**
 * @class HotCat
 * @extends {Component}
 */
const HotCat = ( {classes, playlist, toggle_modal, location } ) => {
  let tags = playlist.tags.payload.tags;
  return (        
    playlist.tags.loading ? '加载中...' :
      tags && tags.map( (tag,i) => <Button size="small" component={Link} to={`/?cat=${tag.name}`} color={location.cat === tag.name ? 'primary' : 'default'} key={tag.id}>{tag.name}</Button>)
  );
}

HotCat.propTypes = {
  playlist: PropTypes.object.isRequired
}

const StyledHotCat = withStyles(styles)(HotCat);
export default (StyledHotCat)