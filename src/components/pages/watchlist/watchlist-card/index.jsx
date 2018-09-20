import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromWatchlist } from '@redux/actions';
import * as routes from '@constants/routes';
import DelButton from '@shared/flat-buttons/del-btn';
import InfoButton from '@shared/flat-buttons/info-btn';
import styles from './styles.css';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  vote_average: voteAverage,
  title,
  removeCard,
  location,
  show,
}) => (
  <div className={styles.Card}>
    <img className={styles.Poster} src={`${IMG_BASE}${posterPath}`} alt="" />
    <div className={styles.Info}>
      <h5 className={styles.Title}>{title}</h5>
      <h4 className={styles.Date}>Released: {releaseDate.slice(0, -6)}</h4>
      <div className={styles.Rate}>Rating: {voteAverage}</div>
    </div>
    <div className={styles.Panel}>
      <DelButton
        onClick={() => {
          removeCard(id);
          show();
        }}
      />
      <NavLink
        to={{
          pathname: `${routes.MOVIES}/${id}`,
          search: `${location.search}`,
          state: { from: location },
        }}
      >
        <InfoButton />
      </NavLink>
    </div>
  </div>
);

WatchListCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  removeCard: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  location: PropTypes.objectOf(Object).isRequired,
};

const mapDispatch = {
  removeCard: removeFromWatchlist,
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatch,
  ),
)(WatchListCard);
