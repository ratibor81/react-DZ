import React, { Component } from 'react';
//import styles from './search-bar.css';

export default class SearchBar extends Component {
  state = {
    title: '',
  };
  handleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({
      title: '',
    });
  };

  render() {
    const { title } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search movie by title
          <input
            type="text"
            placeholder="Enter movie title"
            value={title}
            onChange={this.handleChange}
            required
          />
          <button>SEARCH</button>
        </label>
      </form>
    );
  }
}
