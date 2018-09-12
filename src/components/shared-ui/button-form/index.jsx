import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import styles from './styles.css';

const stylesBar = theme => ({
  snackbar: {
    margin: theme.spacing.unit,
  },
});

class ButtonForm extends Component {
  state = { isOpen: false };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { disabled, label, text, classes } = this.props;
    const { isOpen } = this.state;
    return (
      <div className={styles.Button}>
        <Button
          variant="raised"
          color="default"
          type="submit"
          disabled={disabled}
          className={styles.Form_Button}
          onClick={this.toggleSnackbar}
        >
          {label}
        </Button>
        <Portal>
          <Snackbar
            className={classes.snackbar}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            open={isOpen}
            onClose={this.toggleSnackbar}
            autoHideDuration={3000}
            resumeHideDuration={3000}
            message={<div>{text}</div>}
          />
        </Portal>
      </div>
    );
  }
}

ButtonForm.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(stylesBar)(ButtonForm);
