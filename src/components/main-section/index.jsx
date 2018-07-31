import React from 'react';
import styles from './styles.css';

const MainSection = ({ children }) => (
  <div className={styles.main}> {children} </div>
);

export default MainSection;