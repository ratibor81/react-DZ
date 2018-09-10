import React from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAction } from '@redux/actions';
import { getCurrentFilter } from '@redux/selectors';
// import withRenderLog from '../../hoc/withRenderLog';
import styles from './styles.css';
import GENRES from '../selectors/movie-filter-options';

const MovieFilter = ({ currentFilter, changeFilter }) => (
  <div className={styles.Filter_panel}>
    <h5>Filter movies by genre</h5>
    <select
      className={styles.MovieFilter}
      value={currentFilter}
      onChange={e => changeFilter(e.target.value)}
    >
      {GENRES.map(genre => (
        <option key={genre.id} value={String(genre.id)}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
);

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
