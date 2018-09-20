import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
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

const DelButton = ({ classes, onClick }) => (
  <Tooltip title="Remove from watchlist" TransitionComponent={Zoom}>
    <Button
      variant="fab"
      color="secondary"
      className={classes.button}
      onClick={onClick}
    >
      <DeleteIcon />
    </Button>
  </Tooltip>
);
DelButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(DelButton);
