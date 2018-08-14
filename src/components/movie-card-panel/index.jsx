import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../icons/constants';
import { addToWatchlist } from '../../redux/actions';

class CardPanel extends Component {
  addCardToList = id => {
    const { watchlist, movies, addCard } = this.props;
    const duplicateMovie = watchlist.find(movie => movie.id === id);
    if (duplicateMovie) return;
    const selectedMovie = movies.find(movie => movie.id === id);

    addCard(selectedMovie);
  };

  render() {
    const { id } = this.props;
    return (
      <div className={styles.add_panel}>
        <button
          type="button"
          className={styles.add_button}
          onClick={() => this.addCardToList(id)}
        >
          <Icon icon={ICONS.ADDUSER} />
        </button>
        <button
          type="button"
          className={styles.info_button}
          // onClick={() => toggleModal(id)}
        >
          <Icon icon={ICONS.INFO} />
        </button>
      </div>
    );
  }
}

CardPanel.propTypes = {
  id: PropTypes.number.isRequired,
  watchlist: PropTypes.arrayOf(Array).isRequired,
  movies: PropTypes.arrayOf(Array).isRequired,
  addCard: PropTypes.func.isRequired,
  // toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  watchlist: state.movies.watchlist,
  movies: state.movies.items,
});

const mapDispatchToProps = {
  addCard: addToWatchlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPanel);
