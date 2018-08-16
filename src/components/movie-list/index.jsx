import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMovies, getMoreMovies } from '../../redux/actions';
import MovieCard from '../movie-card';
import styles from './styles.css';
// import withRenderLog from '../../hoc/withRenderLog';

class MovieList extends Component {
  getMoreMovies = pageNum => {
    const { category, fetchMoreMovies } = this.props;
    fetchMoreMovies({ category: category.value, pageNum: pageNum + 1 });
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
  fetchMoreMovies: PropTypes.func.isRequired,
};
MovieList.defaultProps = {
  category: null,
};

const mapDispatchToProps = { getMovies, fetchMoreMovies: getMoreMovies };

export default connect(
  null,
  mapDispatchToProps,
)(MovieList);
