import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
// import { DragDropContext } from 'react-beautiful-dnd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';
import { getWatchlist } from '../../redux/selectors';
import { setFromLocalStorage } from '../../redux/actions';
// import withRenderLog from '../../hoc/withRenderLog';

class WatchList extends Component {
  componentDidMount() {
    this.getFromStorage();
  }

  getFromStorage = () => {
    const { setState } = this.props;
    const list = JSON.parse(localStorage.getItem('watchlist'));
    if (!list) return;
    setState(list);
  };

  render() {
    const { watchlist } = this.props;
    return (
      <div className={styles.List}>
        <h2 className={styles.Header}>Watchlist</h2>
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
            >
              <li className={styles.Card} key={movie.id}>
                <WatchListCard {...movie} />
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
  }
}

WatchList.propTypes = {
  watchlist: PropTypes.arrayOf(Array).isRequired,
  setState: PropTypes.func.isRequired,
};

const mapState = state => ({
  watchlist: getWatchlist(state),
});

const mapDispatch = { setState: setFromLocalStorage };

export default connect(
  mapState,
  mapDispatch,
)(WatchList);
