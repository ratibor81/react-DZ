import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
    // minWidth: 100,
  },
});

const SnackBar = ({ text, open, close, classes }) => (
  <Snackbar
    className={classes.snackbar}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    open={open}
    onClose={close}
    autoHideDuration={3000}
    resumeHideDuration={3000}
    message={<div className={classes.snackbar}>{text}</div>}
  />
);

SnackBar.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(SnackBar);
