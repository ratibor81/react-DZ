import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import styles from './styles.css';
import searchById from '../../services/search-by-id';
import getVideos from '../../services/get-videos';
import Loader from '../shared-ui/loader';
import Trailer from './trailer';

const IMG_BASE = `https://image.tmdb.org/t/p/w300`;

export default class ModalInfo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    toggleModal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

  state = {
    movie: null,
    videos: '',
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { id } = this.props;
    this.searchMovie({ id });
  }

  handleFetchSuccess = movie => {
    this.setState({ movie, loading: false });
  };

  handleFetchFailure = error => {
    this.setState({ loading: false, error });
  };

  fetchVideos = videos => {
    this.setState({ videos });
  };

  searchMovie = ({ id }) => {
    searchById({
      id,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchFailure,
    });
    getVideos({
      id,
      onSuccess: this.fetchVideos,
      onError: this.handleFetchFailure,
    });
  };

  render() {
    const { open, toggleModal } = this.props;
    const { loading, movie, error, videos } = this.state;

    return (
      <Modal
        open={open}
        onClose={toggleModal}
        center
        classNames={styles}
        closeIconSvgPath={false}
        closeIconSize={15}
      >
        {error && <div>{error}</div>}
        {loading && <Loader />}

        {!loading && (
          <div className={styles.content}>
            <img
              className={styles.poster}
              src={`${IMG_BASE}${movie.poster_path}`}
              alt="poster"
            />
            <div>
              <h2 className={styles.head_title}>{movie.original_title}</h2>
              <h4 className={styles.tagline}>{`"${movie.tagline}"`}</h4>
              <p className={styles.overview}>{movie.overview}</p>
              <h4 className={styles.headers}>Genres</h4>
              <ul className={styles.list}>
                {movie.genres.map((genre, idx) => (
                  <li className={styles.genre} key={idx.toString()}>
                    {genre.name}
                  </li>
                ))}
              </ul>
              <h4 className={styles.headers}>Companies</h4>
              <ul className={styles.list}>
                {movie.production_companies.map((companie, idx) => (
                  <li className={styles.companie} key={idx.toString()}>
                    {companie.name}
                  </li>
                ))}
              </ul>
              <h4 className={styles.headers}>Trailer</h4>
              <div className={styles.trailer}>
                <Trailer url={videos.key} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}
