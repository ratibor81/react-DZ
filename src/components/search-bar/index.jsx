import React, { Component } from 'react';
import styles from './styles.css';

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
          <button className={styles.search_button} />
        </div>
      </form>
    );
  }
}
