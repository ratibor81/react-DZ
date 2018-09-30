import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './styles.css';

const ErrorMessage = ({ onClick }) => (
  <div className={styles.ErrorMessage}>
    <h2>Internet connection error :(</h2>
    <Button variant="raised" color="primary" type="button" onClick={onClick}>
      Try again
    </Button>
  </div>
);

ErrorMessage.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ErrorMessage;
