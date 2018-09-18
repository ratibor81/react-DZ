import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    width: 36,
    height: 36,
  },
});

const AddButton = ({ classes, onClick }) => (
  <Tooltip title="Add movie to watchlist" TransitionComponent={Zoom}>
    <Button
      variant="fab"
      color="primary"
      className={classes.button}
      onClick={onClick}
    >
      <AddIcon />
    </Button>
  </Tooltip>
);
AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(AddButton);
