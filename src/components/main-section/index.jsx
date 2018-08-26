import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const MainSection = ({ children }) => (
  <div className={styles.Main}> {children} </div>
);

MainSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainSection;
