import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';

const WatchList = ({ watchlist }) => (
  <div className={styles.list}>
    <h2 className={styles.header}>Watchlist</h2>
    <TransitionGroup component="ul">
      {watchlist.map(movie => (
        <CSSTransition
          key={movie.id}
          timeout={300}
          classNames={{
            enter: styles.slideEnter,
            enterActive: styles.slideEnterActive,
            exit: styles.slideExit,
            exitActive: styles.slideExitActive,
          }}
          unmountOnExit
        >
          <li className={styles.card} key={movie.id}>
            <WatchListCard {...movie} />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  </div>
);

WatchList.propTypes = {
  watchlist: PropTypes.arrayOf(Array).isRequired,
};

const mapStateToProps = state => ({
  watchlist: state.movies.watchlist,
});

export default connect(
  mapStateToProps,
  null,
)(WatchList);
