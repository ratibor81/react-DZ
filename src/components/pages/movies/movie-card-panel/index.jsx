import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '@redux/actions';
import { getAllMovies, getWatchlist } from '@redux/selectors';
import SnackBarError from '@shared/snackBar/error';
import AddButton from '@shared/flat-buttons/add-btn';
import DelButton from '@shared/flat-buttons/del-btn';
import styles from '../movie-card/styles.css';
import getItemById from '@helpers';
import { auth } from '@firebase-modules';

class CardPanel extends Component {
  state = { isOpen: false };

  addCardToList = (id, event) => {
    event.stopPropagation();
    const { watchlist, movies, addCard, onClose } = this.props;
    if (getItemById(watchlist, id)) {
      return this.toggleSnackbar();
    }
    addCard(getItemById(movies, id));
    return onClose();
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { id, removeCard } = this.props;
    const { isOpen } = this.state;

    return (
      <div className={styles.Add_panel}>
        {auth.currentUser() && (
          <div>
            <AddButton onClick={event => this.addCardToList(id, event)} />
            <DelButton
              onClick={event => {
                event.stopPropagation();
                removeCard(id);
              }}
            />
          </div>
        )}
        <SnackBarError
          text="Movie is already exist on your watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
      </div>
    );
  }
}

CardPanel.propTypes = {
  id: PropTypes.number.isRequired,
  watchlist: PropTypes.arrayOf(Array).isRequired,
  movies: PropTypes.arrayOf(Array).isRequired,
  addCard: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
};

const mapState = state => ({
  watchlist: getWatchlist(state),
  movies: getAllMovies(state),
});

const mapDispatch = {
  addCard: addToWatchlist,
  removeCard: removeFromWatchlist,
};

export default connect(
  mapState,
  mapDispatch,
)(CardPanel);
