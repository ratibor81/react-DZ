import React from 'react';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import { ICONS } from '../icons/constants';

const CardPanel = ({ id, addCard, toggleModal }) => (
  <div className={styles.add_panel}>
    <button className={styles.add_button} onClick={() => addCard(id)}>
      <Icon icon={ICONS.ADDUSER} />
    </button>
    <button className={styles.info_button} onClick={() => toggleModal(id)}>
      <Icon icon={ICONS.INFO} />
    </button>
  </div>
);

export default CardPanel;
