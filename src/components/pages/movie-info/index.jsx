import React, { Component } from 'react';
import PropTypes from 'prop-types';
import searchById from '@services/search-by-id';
import getVideos from '@services/get-videos';
import getImages from '@services/get-images';
import getActors from '@services/get-actors';
// import Loader from '@shared/loader';
import styles from './styles.css';
import Trailer from './trailer';
import ImageSlider from './carousel-slider';

const IMG_BASE = `https://image.tmdb.org/t/p/w500`;

export default class MovieInfo extends Component {
  static propTypes = {
    match: PropTypes.objectOf(Object).isRequired,
  };

  state = {
    movie: null,
    images: null,
    videos: null,
    actors: null,
    loading: true,
    error: null,
  };

  componentDidMount() {
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
    getImages({
      id,
      onSuccess: this.fetchImages,
      onError: this.handleFetchFailure,
    });
    getActors({
      id,
      onSuccess: this.fetchActors,
      onError: this.handleFetchFailure,
    });
  };

  fetchVideos = videos => {
    this.setState({ videos });
  };

  fetchImages = images => {
    this.setState({ images });
  };

  fetchActors = actors => {
    this.setState({ actors });
  };

  handleFetchSuccess = movie => {
    this.setState({ movie, loading: false });
  };

  handleFetchFailure = error => {
    this.setState({ loading: false, error });
  };

  render() {
    const { loading, movie, error, videos, images, actors } = this.state;
    // console.log(actors);
    return (
      <div>
        {error && <div>{error}</div>}
        {/* {loading && <Loader />} */}

        {!loading && (
          <div className={styles.content}>
            <img
              className={styles.poster}
              src={`${IMG_BASE}${movie.poster_path}`}
              alt="poster"
            />
            <div className={styles.content_right}>
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
              <h4 className={styles.headers}>Movie screenshots</h4>
              {images && (
                <div className={styles.sliderContainer}>
                  <ImageSlider images={images} />
                </div>
              )}
            </div>
            {actors && (
              <div className={styles.sliderContainer}>
                <ImageSlider images={images} />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
