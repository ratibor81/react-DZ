import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { removeFromWatchlist } from '@redux/actions';
import * as routes from '@constants/routes';
import ICONS from '@shared/icons';
import styles from './styles.css';
import Icon from './icon';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  vote_average: voteAverage,
  title,
  removeCard,
  location,
}) => (
  <div className={styles.Card}>
    <img className={styles.Poster} src={`${IMG_BASE}${posterPath}`} alt="" />
    <div className={styles.Info}>
      <h5 className={styles.Title}>{title}</h5>
      <h4 className={styles.Date}>Released: {releaseDate.slice(0, -6)}</h4>
      <div className={styles.Rate}>Rating: {voteAverage}</div>
    </div>
    <div className={styles.Panel}>
      <Tooltip
        title="Remove from Watchlist"
        TransitionComponent={Zoom}
        placement="top"
      >
        <button
          type="button"
          className={styles.Del_button}
          onClick={() => removeCard(id)}
        >
          <Icon icon={ICONS.DELETE} />
        </button>
      </Tooltip>
      <NavLink
        to={{
          pathname: `${routes.MOVIES}/${id}`,
          search: `${location.search}`,
          state: { from: location },
        }}
      >
        <Tooltip
          title="Full movie information"
          TransitionComponent={Zoom}
          placement="top"
        >
          <button type="button" className={styles.Info_button}>
            <Icon icon={ICONS.INFO} />
          </button>
        </Tooltip>
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
