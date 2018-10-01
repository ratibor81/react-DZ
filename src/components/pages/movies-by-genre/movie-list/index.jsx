import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMoviesByGenre, getMoreMoviesByGenre } from '@redux/actions';
import SnackBarSuccess from '@shared/snackBar/success';
import MovieCard from '@pages/movies/movie-card';
import { getMovieGenreId, getMoviesByGenreId } from '@redux/selectors';
import styles from './styles.css';

class MoviesByGenre extends Component {
  state = { isOpen: false };

  componentDidMount() {
    const { genreId, fetchMovies } = this.props;
    fetchMovies({ genreId });
  }

  getMoreMovies = pageNum => {
    const { genreId, fetchMoreMovies } = this.props;
    fetchMoreMovies({ genreId, pageNum: pageNum + 1 });
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { isOpen } = this.state;
    const { movies } = this.props;
    const isActive = movies.length > 19;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMoreMovies}
        hasMore={isActive}
        loader={
          <div className={styles.Loader} key={0}>
            <Loader type="ThreeDots" color="#00BFFF" height={120} width={120} />
          </div>
        }
      >
        {movies.length > 0 && (
          <ul className={styles.Movie_list}>
            {movies.map(movie => (
              <li className={styles.List_item} key={movie.id}>
                <MovieCard {...movie} onClose={this.toggleSnackbar} />
              </li>
            ))}
          </ul>
        )}

        <SnackBarSuccess
          text="Movie is added to your watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
      </InfiniteScroll>
    );
  }
}

MoviesByGenre.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  fetchMovies: PropTypes.func.isRequired,
  fetchMoreMovies: PropTypes.func.isRequired,
  genreId: PropTypes.string.isRequired,
};
const mapState = state => ({
  genreId: getMovieGenreId(state),
  movies: getMoviesByGenreId(state),
});
const mapDispatch = {
  fetchMovies: getMoviesByGenre,
  fetchMoreMovies: getMoreMoviesByGenre,
};

export default connect(
  mapState,
  mapDispatch,
)(MoviesByGenre);
