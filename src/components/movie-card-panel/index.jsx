import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../icons';
import { addToWatchlist } from '../../redux/actions';
import { getAllMovies, getWatchlist } from '../../redux/selectors';
import getItemById from '../../helpers';

class CardPanel extends Component {
  addCardToList = id => {
    const { watchlist, movies, addCard } = this.props;
    if (getItemById(watchlist, id)) return;
    addCard(getItemById(movies, id));
  };

  render() {
    const { id } = this.props;
    return (
      <div className={styles.Add_panel}>
        <button
          type="button"
          className={styles.Add_button}
          onClick={() => this.addCardToList(id)}
        >
          <Icon icon={ICONS.ADDUSER} />
        </button>
        <button
          type="button"
          className={styles.Info_button}
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
};

const mapState = state => ({
  watchlist: getWatchlist(state),
  movies: getAllMovies(state),
});

const mapDispatch = {
  addCard: addToWatchlist,
};

export default connect(
  mapState,
  mapDispatch,
)(CardPanel);
