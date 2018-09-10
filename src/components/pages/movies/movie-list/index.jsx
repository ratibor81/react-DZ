import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMoreMovies } from '@redux/actions';
import SnackBar from '@shared/snackBar';
import MovieCard from '../movie-card';
import styles from './styles.css';
// import withRenderLog from '../../hoc/withRenderLog';

class MovieList extends Component {
  state = { isOpen: false };

  getMoreMovies = pageNum => {
    const { category, fetchMoreMovies } = this.props;
    if (!category) return;
    fetchMoreMovies({ category, pageNum: pageNum + 1 });
  };

  toggleSnackbar = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { movies } = this.props;
    const { isOpen } = this.state;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMoreMovies}
        hasMore
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
        <SnackBar
          text="Movie added to Watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
      </InfiniteScroll>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  category: PropTypes.string,
  fetchMoreMovies: PropTypes.func.isRequired,
};
MovieList.defaultProps = {
  category: null,
};

const mapDispatchToProps = { fetchMoreMovies: getMoreMovies };

export default connect(
  null,
  mapDispatchToProps,
)(MovieList);
