import React, { Component } from 'react';
import Books from '../books.json';
import BooksList from './book-list';
import SearchBar from './search-bar';
import BookEditor from './book-editor';
import v4 from 'uuid/v4';
import styles from './app.css';

export default class App extends Component {
  state = {
    books: Books,
    filter: '',
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  addBook = ({ title, link, author, descr }) => {
    const book = {
      id: v4(),
      title,
      img: link,
      author,
      descr,
    };

    this.setState(prevState => ({
      books: [book, ...prevState.books],
    }));
  };

  deleteBook = id => {
    this.setState(prevState => ({
      books: prevState.books.filter(book => book.id !== id),
    }));
  };

  render() {
    const { books, filter } = this.state;

    const filteredBooks = books.filter(book =>
      book.title.toLowerCase().includes(filter.toLowerCase()),
    );

    return (
      <div className={styles.books_app}>
        <div className={styles.add_filter_panel}>
          <SearchBar value={filter} onChange={this.changeFilter} />
          <BookEditor onSubmit={this.addBook} />
        </div>
        <BooksList books={filteredBooks} onDelete={this.deleteBook} />
      </div>
    );
  }
}
