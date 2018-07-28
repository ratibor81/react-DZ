import React from 'react';
import PropTypes from 'prop-types';
import styles from './book.css';

const Book = ({ img, title, author, descr, id, onDelete }) => (
  <div className={styles.book}>
    <img className={styles.img} src={img} alt="book"/>
    <div className={styles.book_info}>
      <h2 className={styles.book_title}>{title}</h2>
      <h4 className={styles.book_author}>Author: {author}</h4>
      <p className={styles.book_desr}>{descr}</p>
    </div>
    <button className={styles.button_del} onClick={() => onDelete(id)}></button>
  </div>
);

Book.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  descr: PropTypes.string,
  id: PropTypes.string
};

export default Book;