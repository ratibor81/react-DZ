import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAction } from '@redux/actions';
import { getCurrentFilter } from '@redux/selectors';
// import withRenderLog from '../../hoc/withRenderLog';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import styles from './styles.css';
import GENRES from '../selectors/movie-filter-options';

class MovieFilter extends Component {
  // state = { genre: null };

  changeGenre = e => {
    const { changeFilter } = this.props;
    // this.setState({ genre: currentGenre });
    changeFilter(e.target.value);
  };

  render() {
    // const { genre } = this.state;
    const { currentFilter, changeFilter } = this.props;
    return (
      <div className={styles.Filter_panel}>
        <h5>Filter movies by genre</h5>
        <FormControl className={styles.MovieFilter}>
          <NativeSelect
            value={currentFilter}
            onChange={e => changeFilter(e.target.value)}
            name="age"
          >
            {GENRES.map(genre => (
              <option key={genre.id} value={String(genre.id)}>
                {genre.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

MovieFilter.propTypes = {
  currentFilter: PropTypes.number.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

const mapState = state => ({
  currentFilter: getCurrentFilter(state),
});

const mapDispatch = { changeFilter: changeFilterAction };

export default connect(
  mapState,
  mapDispatch,
)(MovieFilter);
