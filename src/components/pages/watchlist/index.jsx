import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import { DragDropContext } from 'react-beautiful-dnd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { getWatchlist } from '@redux/selectors';
import { setFromDatabase } from '@redux/actions';
import SnackBarInfo from '@shared/snackBar/warning';
import withAuthorization from '@hoc/withAuthorization';
import WatchListCard from './watchlist-card';
import styles from './styles.css';
import { db, auth } from '../../../firebase';

class WatchList extends Component {
  state = { isOpen: false };

  componentDidMount() {
    this.getFromDatabase();
  }

  getFromDatabase = () => {
    const { setState } = this.props;
    const userId = auth.currentUser().uid;
    db.getUserData(userId).then(snapshot => {
      if (!snapshot.val()) return;
      setState(snapshot.val().watchlist);
    });
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { watchlist } = this.props;
    const { isOpen } = this.state;

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
                  <WatchListCard {...movie} show={this.toggleSnackbar} />
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <SnackBarInfo
          text="Movie was removed from watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
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

const mapDispatch = { setState: setFromDatabase };

const authCondition = authUser => !!authUser;

export default compose(
  connect(
    mapState,
    mapDispatch,
  ),
  withAuthorization(authCondition),
)(WatchList);
