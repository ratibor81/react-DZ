import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
    // width: '1000px',
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
    message={<span className={classes.snackbar}>{text}</span>}
  />
);

SnackBar.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(SnackBar);
