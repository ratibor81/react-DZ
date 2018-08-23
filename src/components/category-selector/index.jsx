import React from 'react';
import Select from 'react-select';
import selectorOptions from '../../selectors/selector-options';
import styles from './styles.css';

const CategorySelector = props => (
  <div className={styles.Block}>
    <h5>Search by category</h5>
    <Select className={styles.Select} options={selectorOptions} {...props} />
  </div>
);

export default CategorySelector;
