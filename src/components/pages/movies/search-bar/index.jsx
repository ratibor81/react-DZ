import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMovieByTitle } from '@redux/actions';
import ICONS from '@shared/icons';
import styles from './styles.css';
import Icon from './icon';

class SearchBar extends Component {
  static propTypes = {
    getMovieByTitle: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    const { title } = this.state;
    const { getMovieByTitle: fetchMovies } = this.props;
    e.preventDefault();

    fetchMovies({ title });
    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form className={styles.Search_form} onSubmit={this.handleSubmit}>
        <h5>Search movie by title</h5>
        <div className={styles.Panel}>
          <input
            type="text"
            placeholder="Enter movie title..."
            value={title}
            onChange={this.handleChange}
            required
          />
          <button type="submit" className={styles.Search_button}>
            <Icon icon={ICONS.SEARCH} />
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { getMovieByTitle },
)(SearchBar);
