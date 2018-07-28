import React, {Component} from 'react';
import styles from './books-editor.css';

export default class BookEditor extends Component {
  state = {
    title: '',
    link: '',
    author: '',
    descr: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
    this.setState({
      title: '',
      link: '',
      author: '',
      descr: ''
    });
  };

  render() {
    const { title, link, author, descr } = this.state;

    return (
      <form className={styles.add_form} onSubmit={this.handleSubmit}>
        <label>
          Title
          <input 
            type="text"
            placeholder="Enter book title"
            value={title}
            name="title"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Image link
          <input 
            type="text"
            placeholder="Enter image link"
            value={link}
            name="link"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Author
          <input 
            type="text"
            placeholder="Enter author"
            value={author}
            name="author"
            onChange={this.handleChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            type="text"
            placeholder="Enter book description"
            value={descr}
            name="descr"
            onChange={this.handleChange}
            rows="10"
            required
          />
        </label>
        <button className={styles.add_button}>add book</button>
      </form>
    );
  }
};
