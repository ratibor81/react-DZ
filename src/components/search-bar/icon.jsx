import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Icon = props => {
  const { icon } = props;
  return (
    <svg className={styles.icon} viewBox="0 0 56.966 56.966">
      <path d={icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
