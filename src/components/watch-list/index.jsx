import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';

const WatchList = ({ watchlist, removeCard, toggleModal }) => (
  <div className={styles.list}>
    <h2 className={styles.header}>Watchlist</h2>
    <ul className={styles.movie_list}>
      {watchlist.map(movie => (
        <li className={styles.card} key={movie.id}>
          <WatchListCard
            {...movie}
            removeCard={removeCard}
            toggleModal={toggleModal}
          />
        </li>
      ))}
    </ul>
  </div>
);

WatchList.propTypes = {
  watchlist: PropTypes.instanceOf(Array).isRequired,
  removeCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default WatchList;
