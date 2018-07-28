import React from 'react';
import Book from './book';
import styles from './book-list.css';

const BookList = ({ books, onDelete }) => (
  <ul className={styles.list}>
    { books.map(book => 
      (<li key = {book.id}> 
      <Book {...book} onDelete={onDelete}/>
      </li>
      ))}
  </ul>
);

export default BookList;
