import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const SearchPanel = ({ children }) => (
  <div className={styles.Search_panel}> {children} </div>
);

SearchPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchPanel;
