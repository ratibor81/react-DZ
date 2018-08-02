import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';
import Icon from '../icons/icon';
import ICONS from '../icons/constants';

export default class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    title: '',
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    const { onSubmit } = this.props;
    e.preventDefault();

    onSubmit(this.state);
    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form className={styles.search_form} onSubmit={this.handleSubmit}>
        <h5>Search movie by title</h5>
        <div className={styles.panel}>
          <input
            type="text"
            placeholder="Enter movie title..."
            value={title}
            onChange={this.handleChange}
            required
          />
          <button type="button" className={styles.search_button}>
            <Icon icon={ICONS.SEARCH} />
          </button>
        </div>
      </form>
    );
  }
}
