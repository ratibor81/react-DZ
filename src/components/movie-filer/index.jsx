import React from 'react';
import PropTypes from 'prop-types';
// import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAction } from '../../redux/actions';
import { getCurrentFilter } from '../../redux/selectors';
// import withRenderLog from '../../hoc/withRenderLog';
import styles from './styles.css';
import GENRES from '../../constants/genres';

const MovieFilter = ({ currentFilter, changeFilter }) => (
  <div className={styles.filter_panel}>
    <h5>Filter movies by genre</h5>
    <select
      className={styles.MovieFilter}
      value={currentFilter}
      onChange={e => changeFilter(e.target.value)}
    >
      {GENRES.map(genre => (
        <option key={genre.id} value={genre.id}>
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

const mapStateToProps = state => ({
  currentFilter: getCurrentFilter(state),
});

const mapDispatchToProps = { changeFilter: changeFilterAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieFilter);
