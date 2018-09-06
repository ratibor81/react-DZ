import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../icons';
import { addToWatchlist } from '../../redux/actions';
import { getAllMovies, getWatchlist } from '../../redux/selectors';
import { getItemById } from '../../helpers';
import { db, auth } from '../../firebase';

class CardPanel extends Component {
  addCardToList = id => {
    const { watchlist, movies, addCard } = this.props;
    if (getItemById(watchlist, id)) return;
    addCard(getItemById(movies, id));

    const userId = auth.currentUser().uid;
    const list = JSON.parse(localStorage.getItem('watchlist'));
    const username = {
      watchlist: list,
    };
    db.updateUser(username, userId);
  };

  render() {
    const { id } = this.props;
    const { match, location } = this.props;

    return (
      <div className={styles.Add_panel}>
        <button
          type="button"
          className={styles.Add_button}
          onClick={() => this.addCardToList(id)}
        >
          <Icon icon={ICONS.ADDUSER} />
        </button>
        <NavLink
          // exact
          to={{
            pathname: `${match.url}${id}`,
            search: `${location.search}`,
            state: { from: location },
          }}
        >
          <button type="button" className={styles.Info_button}>
            <Icon icon={ICONS.INFO} />
          </button>
        </NavLink>
      </div>
    );
  }
}

CardPanel.propTypes = {
  id: PropTypes.number.isRequired,
  watchlist: PropTypes.arrayOf(Array).isRequired,
  movies: PropTypes.arrayOf(Array).isRequired,
  addCard: PropTypes.func.isRequired,
  match: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

const mapState = state => ({
  watchlist: getWatchlist(state),
  movies: getAllMovies(state),
});

const mapDispatch = {
  addCard: addToWatchlist,
};

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch,
  ),
)(CardPanel);
