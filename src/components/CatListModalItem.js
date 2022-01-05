import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const CatListModalItem = ({ category, sub, cat_id, toggle_modal}) => {
  let render = sub.map( (cat, index) => {
    return cat.category === parseInt(cat_id) && <Grid item key={"cat-"+cat.name} xs={2} zeroMinWidth>
      <Button size="small" component={Link} to={`/?cat=${encodeURIComponent(cat.name)}`} onClick={ () => toggle_modal(false) }>
      {cat.name}
      </Button>
    </Grid>
  } )
  return (
    <Grid container>
      <Grid item>
        <Button size="small" disabled>{category}</Button>
      </Grid>
      <Grid item xs={9}>
        <Grid container spacing={2}>
        { render }
        </Grid>
      </Grid>
    </Grid>
  )
}

CatListModalItem.propTypes = {
  category: PropTypes.string.isRequired,
  sub: PropTypes.array.isRequired
}

export default CatListModalItem
