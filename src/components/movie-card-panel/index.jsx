import React from 'react';
import PropTypes from 'prop-types';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../icons/constants';

const CardPanel = ({ id, addCard, toggleModal }) => (
  <div className={styles.add_panel}>
    <button
      type="button"
      className={styles.add_button}
      onClick={() => addCard(id)}
    >
      <Icon icon={ICONS.ADDUSER} />
    </button>
    <button
      type="button"
      className={styles.info_button}
      onClick={() => toggleModal(id)}
    >
      <Icon icon={ICONS.INFO} />
    </button>
  </div>
);

CardPanel.propTypes = {
  id: PropTypes.number.isRequired,
  addCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default CardPanel;
