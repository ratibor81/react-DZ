import React from 'react';
import styles from './search-bar.css';

const SearchBar = ({ value, onChange }) => (
  <div className={styles.search_bar}>
    <h4>Filter books by title</h4>
    <input type="text" value={value} onChange={onChange} />
  </div>
);

export default SearchBar;