import React, { Component } from 'react';
import styles from './styles.css';
import WatchListCard from '../watch-list-card';

export default class WatchList extends Component {
  render() {
    const { watchlist, removeCard } = this.props;
    return (
      <div className={styles.list}>
        <h2 className={styles.header}>Watchlist</h2>
        <ul className={styles.movie_list}>
          {watchlist.map(movie => (
            <li className={styles.card} key={movie.id}>
              <WatchListCard {...movie} removeCard={removeCard} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
