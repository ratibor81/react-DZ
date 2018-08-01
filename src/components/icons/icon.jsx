import React from 'react';
import PropTypes from 'prop-types';
import styles from '../search-bar/styles.css';

const Icon = (props) => (
  <svg className={styles.icon} viewBox="0 0 56.966 56.966">
    <path d={props.icon} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
