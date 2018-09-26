import React, { Component } from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieByTitle } from '@redux/actions';
import SearchButton from '@shared/flat-buttons/search-btn';
import Input from '@material-ui/core/Input';
import * as routes from '@constants/routes';
import styles from './styles.css';

class SearchBar extends Component {
  static propTypes = {
    getMovieByTitle: PropTypes.func.isRequired,
    history: PropTypes.objectOf(Object).isRequired,
  };

  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    const { title } = this.state;
    const { history } = this.props;
    const { getMovieByTitle: fetchMovies } = this.props;
    e.preventDefault();

    history.push(routes.HOME);
    fetchMovies({ title });
  };

  render() {
    const { title } = this.state;

    return (
      <form
        className={styles.Search_form}
        onSubmit={this.handleSubmit}
        // autoComplete="on"
      >
        <div className={styles.Panel}>
          <Input
            type="text"
            placeholder="Enter movie title..."
            value={title}
            onChange={this.handleChange}
            required
            className={styles.Input}
            name="true"
            autoComplete="on"
          />
          <SearchButton />
        </div>
      </form>
    );
  }
}

export default compose(
  connect(
    null,
    { getMovieByTitle },
  ),
  withRouter,
)(SearchBar);
