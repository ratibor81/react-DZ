import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';

const WatchList = ({ watchlist, removeCard, toggleModal }) => (
  <div className={styles.list}>
    <h2 className={styles.header}>Watchlist</h2>
    <TransitionGroup component="ul">
      {watchlist.map(movie => (
        <CSSTransition
          key={movie.id}
          timeout={200}
          classNames={{
            enter: styles.slideEnter,
            enterActive: styles.slideEnterActive,
            exit: styles.slideExit,
            exitActive: styles.slideExitActive,
          }}
          mountOnEnter
        >
          <li className={styles.card} key={movie.id}>
            <WatchListCard
              {...movie}
              removeCard={removeCard}
              toggleModal={toggleModal}
            />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

WatchList.propTypes = {
  watchlist: PropTypes.arrayOf(Array).isRequired,
  removeCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default WatchList;
