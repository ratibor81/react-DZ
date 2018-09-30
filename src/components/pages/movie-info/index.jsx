import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import searchById from '@services/search-by-id';
import getVideos from '@services/get-videos';
import getImages from '@services/get-images';
import getActors from '@services/get-actors';
import Loader from 'react-loader-spinner';
import { setMovieGenre } from '@redux/actions';
import * as routes from '@constants/routes';
import Button from '@material-ui/core/Button';
import styles from './styles.css';
import Trailer from './trailer';
import ImageSlider from './carousel-slider/img-slider';
import ActorsSlider from './carousel-slider/actors-slider';

const IMG_BASE = `https://image.tmdb.org/t/p/w500`;

class MovieInfo extends Component {
  static propTypes = {
    match: PropTypes.objectOf(Object).isRequired,
    setGenre: PropTypes.func.isRequired,
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
    this.fetchData();
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

  fetchData = () => {
    this.setState({ loading: true, error: null });
    const id = this.getIdFromProps();
    this.getMovieInfo({ id });
  };

  fetchImages = images => {
    this.setState({ images });
  };

  fetchActors = actors => {
    this.setState({ actors });
  };

  fetchVideos = videos => {
    this.setState({ videos });
  };

  handleFetchSuccess = movie => {
    this.setState({ movie, loading: false });
  };

  handleFetchFailure = err => {
    this.setState({ error: err, loading: false });
  };

  render() {
    const { loading, movie, error, videos, images, actors } = this.state;
    const { setGenre } = this.props;

    return (
      <div className={styles.center}>
        {error && (
          <div className={styles.ErrorMessage}>
            <h2>Internet connection error :(</h2>
            <Button
              variant="raised"
              color="primary"
              type="button"
              onClick={this.fetchData}
            >
              Try again
            </Button>
          </div>
        )}

        {loading && (
          <Loader type="ThreeDots" color="#00BFFF" height={120} width={120} />
        )}

        {!loading &&
          !error && (
            <div className={styles.content}>
              <div className={styles.poster}>
                <img
                  className={styles.poster_img}
                  src={`${IMG_BASE}${movie.poster_path}`}
                  alt="poster"
                />
                <img
                  className={styles.poster_img_min}
                  src={`${IMG_BASE}${movie.backdrop_path}`}
                  alt="poster"
                />
              </div>
              <div className={styles.content_right}>
                <h2 className={styles.head_title}>{movie.original_title}</h2>
                <h4 className={styles.tagline}>{`"${movie.tagline}"`}</h4>
                <p className={styles.overview}>{movie.overview}</p>
                <h4 className={styles.headers}>Genres</h4>
                <ul className={styles.list}>
                  {movie.genres.map(genre => (
                    <li className={styles.genre} key={genre.id}>
                      <Link
                        to={{
                          pathname: routes.MOVIES,
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => setGenre(genre.id)}
                          className={styles.genre_btn}
                        >
                          {genre.name}
                        </button>
                      </Link>
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
                <div className={styles.trailer_block}>
                  <h4 className={styles.headers}>Trailer</h4>
                  {videos && <Trailer url={videos.key} />}
                </div>
              </div>
              <div className={styles.trailer_block_min}>
                <h4 className={styles.headers}>Trailer</h4>
                {videos && <Trailer url={videos.key} />}
              </div>
              <div className={styles.bottom_content}>
                {images && (
                  <div>
                    <h4 className={styles.headers}>Movie screenshots</h4>
                    <div className={styles.slider_container}>
                      <ImageSlider images={images} />
                    </div>
                  </div>
                )}
                {actors && (
                  <div>
                    <h4 className={styles.headers}>Actors</h4>
                    <div className={styles.slider_container}>
                      <ActorsSlider actors={actors} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapDispatch = {
  setGenre: setMovieGenre,
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatch,
  ),
)(MovieInfo);
