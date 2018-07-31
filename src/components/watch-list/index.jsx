import React, { Component } from 'react';
import styles from './styles.css';

export default class WatchList extends Component {
  state = {
    movies: [],
  };

  render() {
    return (
      <div className={styles.list}>
        <h2 className={styles.header}>Watchlist</h2>
      </div>
    );
  }
}
