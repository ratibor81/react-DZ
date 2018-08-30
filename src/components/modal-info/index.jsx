import React, { Component } from 'react';
// import Modal from 'react-responsive-modal';
import PropTypes from 'prop-types';
import styles from './styles.css';
import searchById from '../../services/search-by-id';
import getVideos from '../../services/get-videos';
import Loader from '../shared-ui/loader';
import Trailer from './trailer';

const IMG_BASE = `https://image.tmdb.org/t/p/w300`;

export default class ModalInfo extends Component {
  static propTypes = {
    // id: PropTypes.number.isRequired,
    match: PropTypes.objectOf(Object).isRequired,
    // open: PropTypes.bool.isRequired,
  };

  state = {
    movie: null,
    videos: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
    // const { id } = this.props;
    // console.log(this.props);
    const id = this.getIdFromProps();
    this.getMovieInfo({ id });
  }

  getIdFromProps = () => {
    const { match } = this.props;
    return match.params.movieId;
  };

  getMovieInfo = ({ id }) => {
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

  fetchVideos = videos => {
    this.setState({ videos });
  };

  handleFetchSuccess = movie => {
    this.setState({ movie, loading: false });
  };

  handleFetchFailure = error => {
    this.setState({ loading: false, error });
  };

  render() {
    // const { open, toggleModal } = this.props;
    const { loading, movie, error, videos } = this.state;

    return (
      // <Modal
      //   open={open}
      //   onClose={toggleModal}
      //   center
      //   classNames={styles}
      //   closeIconSvgPath={false}
      //   closeIconSize={15}
      // >
      <div>
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
                {movie.genres.map(genre => (
                  <li className={styles.genre} key={genre.id}>
                    {genre.name}
                  </li>
                ))}
              </ul>
              <h4 className={styles.headers}>Companies</h4>
              <ul className={styles.list}>
                {movie.production_companies.map(companie => (
                  <li className={styles.companie} key={companie.id}>
                    {companie.name}
                  </li>
                ))}
              </ul>
              <h4 className={styles.headers}>Trailer</h4>
              {videos && (
                <div className={styles.trailer}>
                  <Trailer url={videos.key} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      // </Modal>
    );
  }
}
