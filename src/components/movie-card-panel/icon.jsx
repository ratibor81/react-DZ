import React from 'react';
import PropTypes from 'prop-types';
import styles from '../movie-card/styles.css';

const Icon = props => {
  const { icon } = props;
  return (
    <svg className={styles.icon} viewBox="0 0 512 512">
      <path d={icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
