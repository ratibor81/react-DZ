import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import * as routes from '@constants/routes';
import styles from './styles.css';
import CardPanel from '../movie-card-panel';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const MovieCard = ({
  id,
  poster_path: posterPath,
  release_date: releaseDate,
  vote_average: voteAverage,
  onClose,
  title,
  history,
}) => (
  <div
    className={styles.Card}
    onClick={() => history.push(`${routes.MOVIES}/${id}`)}
    onKeyDown={() => {}}
    role="link"
    tabIndex="0"
    href="/movies"
  >
    <img src={`${IMG_BASE}${posterPath}`} alt="" />
    <p className={styles.Title}>{title}</p>
    <h5 className={styles.Date}>Release date: {releaseDate.slice(0, -6)}</h5>
    <div className={styles.Rate}>{voteAverage}</div>
    <CardPanel id={id} onClose={onClose} />
  </div>
);

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  poster_path: PropTypes.string,
  title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  vote_average: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  history: PropTypes.objectOf(Object).isRequired,
};

MovieCard.defaultProps = {
  poster_path: null,
};

export default withRouter(MovieCard);
