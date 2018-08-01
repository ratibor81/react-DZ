import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import styles from './styles.css';
import { searchById } from '../../services/search-by-id';
import Loader from '../shared-ui/loader';

const IMG_BASE = `https://image.tmdb.org/t/p/w300`;

export default class ModalInfo extends Component {
  state = {
    movie: '',
    loading: true,
    error: null,
  };

  handleFetchSuccess = movie => {
    this.setState({ movie: movie, loading: false });
  };

  handleFetchFailure = error => {
    this.setState({ loading: false, error: error.message });
  };

  componentDidMount() {
    const { id } = this.props;
    this.searchMovie({ id });
  }

  searchMovie = ({ id }) => {
    searchById({
      id,
      onSuccess: this.handleFetchSuccess,
      onError: this.handleFetchFailure,
    });
  };

  render() {
    const { open, toggleModal } = this.props;
    const { loading, movie } = this.state;
    return (
      <Modal open={open} onClose={toggleModal} center classNames={styles}>
        {loading && <Loader />}

        {!loading && (
          <div className={styles.content}>
            <img
              className={styles.poster}
              src={`${IMG_BASE}${movie.poster_path}`}
              alt=""
            />
            <div>
              <h2 className={styles.head_title}>{movie.original_title}</h2>
              <h4>Tagline: {`"${movie.tagline}"`}</h4>
              <p>{movie.overview}</p>
              <h4>Genres</h4>
              <ul className={styles.list}>
                {movie.genres.map(movie => (
                  <li className={styles.genre} key={movie.id}>
                    {movie.name}
                  </li>
                ))}
              </ul>
              <h4>Companies</h4>
              <ul className={styles.list}>
                {movie.production_companies.map(movie => (
                  <li className={styles.companie} key={movie.id}>
                    {movie.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>
    );
  }
}
