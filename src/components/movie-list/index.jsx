import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMovies } from '../../redux/actions';
import MovieCard from '../movie-card';
import styles from './styles.css';

class MovieList extends Component {
  getMoreMovies = pageNum => {
    const { category, getMovies: fetchMore } = this.props;
    fetchMore({ category: category.value, pageNum: pageNum + 1 });
  };

  render() {
    const { movies } = this.props;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getMoreMovies}
        hasMore
        loader={
          <div className={styles.loader} key={0}>
            <Loader type="ThreeDots" color="#00BFFF" height={120} width={120} />
          </div>
        }
      >
        <ul className={styles.movie_list}>
          {movies.map(movie => (
            <li className={styles.list_item} key={movie.id}>
              <MovieCard {...movie} />
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  getMovies: PropTypes.func.isRequired,
  category: PropTypes.objectOf(Object),
};
MovieList.defaultProps = {
  category: null,
};

// const mapDispatchToProps = { getMovies };

export default connect(
  null,
  { getMovies },
)(MovieList);
