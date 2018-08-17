import React from 'react';
import Select from 'react-select';
import styles from './styles.css';

const CategorySelector = props => (
  <div className={styles.block}>
    <h5>Search by category</h5>
    <Select className={styles.select} defaultMenuIsOpen="popular" {...props} />
  </div>
);

export default CategorySelector;
