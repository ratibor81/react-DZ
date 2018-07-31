import React from 'react';
import styles from './styles.css';

const SearchPanel = ({ children }) => (
  <div className={styles.search_panel}> {children} </div>
);

export default SearchPanel;