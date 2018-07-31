import React from 'react';
import styles from '../movie-card/styles.css';

const CardPanel = ({id, addCard }) => (
  <div className={styles.add_panel}>
    <button className={styles.add_button} onClick={() => addCard(id)} />
    <button className={styles.info_button} />
  </div>
);

export default CardPanel;
