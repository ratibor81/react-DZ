import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import styles from './styles.css';
import Icon from './icon';
import ICONS from '../icons';
import { removeFromWatchlist } from '../../redux/actions';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  vote_average: voteAverage,
  title,
  removeCard,
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
      <Tooltip
        title="Full movie information"
        TransitionComponent={Zoom}
        placement="top"
      >
        <button
          type="button"
          className={styles.Info_button}
          // onClick={() => toggleModal(id)}
        >
          <Icon icon={ICONS.INFO} />
        </button>
      </Tooltip>
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
};

const mapDispatch = {
  removeCard: removeFromWatchlist,
};

export default connect(
  null,
  mapDispatch,
)(WatchListCard);
