import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loader-spinner';
import { getMoreMovies, setFromDatabase } from '@redux/actions';
import SnackBarSuccess from '@shared/snackBar/success';
import MovieCard from '../movie-card';
import styles from './styles.css';
import { db, auth } from '@firebase-modules';

class MovieList extends Component {
  state = { isOpen: false };

  componentDidMount() {
    this.getFromDatabase();
  }

  getFromDatabase = () => {
    const { setState } = this.props;

    setTimeout(() => {
      if (!auth.currentUser()) return;
      const userId = auth.currentUser().uid;
      db.getUserData(userId).then(snapshot => {
        if (!snapshot.val()) return;
        setState(snapshot.val().watchlist);
      });
    }, 2000);
  };

  getMoreMovies = pageNum => {
    const { fetchMoreMovies } = this.props;
    fetchMoreMovies({ pageNum: pageNum + 1 });
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
        <SnackBarSuccess
          text="Movie is added to your watchlist"
          open={isOpen}
          close={this.toggleSnackbar}
        />
      </InfiniteScroll>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(Array).isRequired,
  fetchMoreMovies: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  // watchlist: PropTypes.arrayOf(Array).isRequired,
};

// const mapState = state => ({
//   watchlist: getWatchlist(state),
// });

const mapDispatch = {
  fetchMoreMovies: getMoreMovies,
  setState: setFromDatabase,
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatch,
  ),
)(MovieList);
