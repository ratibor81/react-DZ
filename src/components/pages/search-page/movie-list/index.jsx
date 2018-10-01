import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMoreMoviesByTitle } from '@redux/actions';
import { getMovieTitle } from '@redux/selectors';
import SnackBarSuccess from '@shared/snackBar/success';
import MovieCard from '@pages/movies/movie-card';
import styles from './styles.css';

class SearchMovieList extends Component {
  state = { isOpen: false };

  getMoreMovies = pageNum => {
    const { title } = this.props;
    const { fetchMoreMovies } = this.props;
    fetchMoreMovies({ title, pageNum: pageNum + 1 });
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { movies } = this.props;
    const { isOpen } = this.state;
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
        <ul className={styles.Movie_list}>
          {movies.map(movie => (
            <li className={styles.List_item} key={movie.id}>
              <MovieCard {...movie} onClose={this.toggleSnackbar} />
            </li>
          ))}
        </ul>
        <SnackBarSuccess
          text="Movie is added to your watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
      </InfiniteScroll>
    );
  }
}

SearchMovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  fetchMoreMovies: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
const mapState = state => ({
  title: getMovieTitle(state),
});
const mapDispatch = { fetchMoreMovies: getMoreMoviesByTitle };

export default connect(
  mapState,
  mapDispatch,
)(SearchMovieList);
