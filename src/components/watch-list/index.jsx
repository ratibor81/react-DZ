import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { DragDropContext } from 'react-beautiful-dnd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';
import { getWatchlist } from '../../redux/selectors';
import { setFromLocalStorage } from '../../redux/actions';
import withAuthorization from '../../hoc/withAuthorization';
import { db, auth } from '../../firebase';
// import withRenderLog from '../../hoc/withRenderLog';

class WatchList extends Component {
  componentDidMount() {
    this.getFromStorage();
  }

  getFromStorage = () => {
    const { setState } = this.props;
    // const list = JSON.parse(localStorage.getItem('watchlist'));
    // if (!list) return;
    const userId = auth.currentUser().uid;
    db.getUserWatchlist(userId).then(snapshot =>
      setState(snapshot.val().watchlist),
    );

    // setState(list);
  };

  render() {
    const { watchlist } = this.props;
    return (
      <div className={styles.WatchListPage}>
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

const authCondition = authUser => !!authUser;

export default compose(
  connect(
    mapState,
    mapDispatch,
  ),
  withAuthorization(authCondition),
)(WatchList);
