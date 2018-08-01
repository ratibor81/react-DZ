import React from 'react';
import styles from './styles.css';
import PropTypes from 'prop-types';
import Icon from './icon';
import { ICONS } from '../icons/constants';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path,
  release_date,
  vote_average,
  title,
  removeCard,
  toggleModal,
}) => (
  <div className={styles.card}>
    <img className={styles.poster} src={`${IMG_BASE}${poster_path}`} alt="" />
    <div className={styles.info}>
      <h5 className={styles.title}>{title}</h5>
      <h4 className={styles.date}>Released: {release_date.slice(0, -6)}</h4>
      <div className={styles.rate}>Rating: {vote_average}</div>
    </div>
    <div className={styles.panel}>
      <button className={styles.del_button} onClick={() => removeCard(id)}>
        <Icon icon={ICONS.DELETE} />
      </button>
      <button className={styles.info_button} onClick={() => toggleModal(id)}>
        <Icon icon={ICONS.INFO} />
      </button>
    </div>
  </div>
);

WatchListCard.propTypes = {
  id: PropTypes.number,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  overview: PropTypes.string,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  removeCard: PropTypes.func,
  toggleModal: PropTypes.func,
};

export default WatchListCard;
