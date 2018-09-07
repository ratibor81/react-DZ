import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  button: {
    margin: '0 4px',
    padding: '8px 32px',
    fontSize: 16,
    fontWeight: 500,
    textTransform: 'uppercase',
    cursor: 'pointer',
    borderRadius: 2,
  },
};

const Button = ({ label, onClick = () => null }) => (
  <button style={styles.button} type="button" onClick={onClick}>
    {label}
  </button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
