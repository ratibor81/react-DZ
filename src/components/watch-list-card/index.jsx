import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles.css';
import Icon from './icon';
import ICONS from '../icons';
import { removeFromWatchlist } from '../../redux/actions';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  vote_average: voteAverage,
  title,
  removeCard,
}) => (
  <div className={styles.card}>
    <img className={styles.poster} src={`${IMG_BASE}${posterPath}`} alt="" />
    <div className={styles.info}>
      <h5 className={styles.title}>{title}</h5>
      <h4 className={styles.date}>Released: {releaseDate.slice(0, -6)}</h4>
      <div className={styles.rate}>Rating: {voteAverage}</div>
    </div>
    <div className={styles.panel}>
      <button
        type="button"
        className={styles.del_button}
        onClick={() => removeCard(id)}
      >
        <Icon icon={ICONS.DELETE} />
      </button>
      <button
        type="button"
        className={styles.info_button}
        // onClick={() => toggleModal(id)}
      >
        <Icon icon={ICONS.INFO} />
      </button>
    </div>
  </div>
);

WatchListCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  removeCard: PropTypes.func.isRequired,
};

const mapDispatch = {
  removeCard: removeFromWatchlist,
};

export default connect(
  null,
  mapDispatch,
)(WatchListCard);
