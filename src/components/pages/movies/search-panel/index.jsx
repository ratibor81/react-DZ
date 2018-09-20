import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import styles from './styles.css';

const SearchPanel = ({ children }) => (
  <AppBar position="static" color="default" className={styles.AppBar}>
    <div className={styles.Search_panel}> {children} </div>
  </AppBar>
);

SearchPanel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchPanel;
