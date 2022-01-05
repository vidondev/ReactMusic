import React from 'react';
import PropTypes from 'prop-types';


import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';

import CatListModalItem from './CatListModalItem';

const styles = theme => ({
  root: {

  }
});

/**
 * @class CatListModal
 */
const CatListModal = ({ playlist, isOpen, toggle_modal } ) =>  {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      aria-labelledby="cat-list"
      onClose={ () => toggle_modal(false)}
    >
      <DialogTitle id="cat-list">全部</DialogTitle>
      <DialogContent dividers>
        <Container fixed>
        {
          playlist.categories.payload.categories && Object.keys(playlist.categories.payload.categories).map( (cat_id) => {  return <CatListModalItem category={playlist.categories.payload.categories[cat_id]} cat_id={cat_id} sub={playlist.categories.payload.sub} key={cat_id} toggle_modal={toggle_modal}/>
            })
        }
        </Container>
      </DialogContent>
    </Dialog>
  );
}

CatListModal.propTypes = {
  playlist: PropTypes.object.isRequired,
}

const StyledCatListModal = withStyles(styles)(CatListModal);
export default (StyledCatListModal)