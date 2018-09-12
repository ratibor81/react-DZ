import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { changeFilterAction } from '@redux/actions';
// import { getCurrentFilter } from '@redux/selectors';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles.css';
import GENRES from '../selectors/movie-filter-options';

const styles2 = () => ({
  root: {
    display: 'flex',
    background: 'hsl(0, 0%, 98%)',
    border: '1px solid hsl(0, 0%, 80%)',
    borderRadius: 3,
    height: 38,
  },
  selectMenu: {
    fontSize: 13,
    paddingLeft: 5,
    paddingBottom: 0,
    height: 38,
    lineHeight: 1.5,
  },
  select: {
    fontSize: 13,
    lineHeight: 1,
    paddingTop: 5,
    paddingBottom: 5,
    height: 15,
  },
});

class MovieFilter extends Component {
  state = { value: '' };

  changeGenre = e => {
    const { changeFilter } = this.props;
    this.setState({ value: e.target.value });
    changeFilter(e.target.value);
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <div className={styles.Filter_panel}>
        <h5>Filter movies by genre</h5>
        <FormControl className={classes.root}>
          <Select
            value={value}
            name={value}
            onChange={this.changeGenre}
            displayEmpty
            className={classes.selectMenu}
          >
            {GENRES.map(genre => (
              <MenuItem
                key={genre.id}
                value={String(genre.id)}
                className={classes.select}
              >
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MovieFilter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(Object).isRequired,
};

const mapDispatch = { changeFilter: changeFilterAction };

export default compose(
  connect(
    null,
    mapDispatch,
  ),
  withStyles(styles2),
)(MovieFilter);
