import React from 'react';
import styles from './styles.css';

const IMG_BASE = `https://image.tmdb.org/t/p/w200`;

const WatchListCard = ({
  id,
  poster_path,
  release_date,
  vote_average,
  title,
  removeCard
}) => (
  <div className={styles.card}>
    <img className={styles.poster} src={`${IMG_BASE}${poster_path}`} alt="" />
    <div className={styles.info}>
      <h5 className={styles.title}>{title}</h5>
      <h4 className={styles.date}>Released: {release_date.slice(0, -6)}</h4>
      <div className={styles.rate}>Rating: {vote_average}</div>
    </div>
    <div className={styles.panel}>
      <button className={styles.del_button} onClick={() => removeCard(id)}/>
      <button className={styles.info_button} />
    </div>
  </div>
);

export default WatchListCard;
