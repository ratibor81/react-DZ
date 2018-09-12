import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import amber from '@material-ui/core/colors/amber';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    opacity: 0.9,
    marginRight: 20,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const SnackBarInfo = ({ text, open, close, classes }) => (
  <Portal>
    <Snackbar
      className={classes.snackbar}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      onClose={close}
      autoHideDuration={1000}
    >
      <SnackbarContent
        className={classes.warning}
        message={
          <div className={classes.message}>
            <InfoIcon className={classes.icon} />
            {text}
          </div>
        }
      />
    </Snackbar>
  </Portal>
);

SnackBarInfo.propTypes = {
  text: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(SnackBarInfo);
