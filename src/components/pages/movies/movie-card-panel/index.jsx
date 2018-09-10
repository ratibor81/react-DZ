import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { addToWatchlist } from '@redux/actions';
import { getAllMovies, getWatchlist } from '@redux/selectors';
import * as routes from '@constants/routes';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../../../icons';
import { getItemById } from '@helpers';
import { auth } from '../../../../firebase';

class CardPanel extends Component {
  addCardToList = id => {
    const { watchlist, movies, addCard, onClose } = this.props;
    if (getItemById(watchlist, id)) return;
    addCard(getItemById(movies, id));
    onClose();
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { id } = this.props;
    const { location } = this.props;

    return (
      <div className={styles.Add_panel}>
        {auth.currentUser() && (
          <Tooltip title="Add movie to Watchlist" TransitionComponent={Zoom}>
            <button
              type="button"
              className={styles.Add_button}
              onClick={() => this.addCardToList(id)}
            >
              <Icon icon={ICONS.ADDUSER} />
            </button>
          </Tooltip>
        )}
        <NavLink
          to={{
            pathname: `${routes.MOVIES}/${id}`,
            search: `${location.search}`,
            state: { from: location },
          }}
        >
          <Tooltip title="Full movie information" TransitionComponent={Zoom}>
            <button type="button" className={styles.Info_button}>
              <Icon icon={ICONS.INFO} />
            </button>
          </Tooltip>
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
  // match: PropTypes.objectOf(Object).isRequired,
  location: PropTypes.objectOf(Object).isRequired,
  onClose: PropTypes.func.isRequired,
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
