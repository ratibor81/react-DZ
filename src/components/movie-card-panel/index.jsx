import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../movie-card/styles.css';
import Icon from './icon';
import ICONS from '../icons/constants';
import { addToWatchlist } from '../../redux/actions';

const CardPanel = ({ id, toggleModal }) => (
  <div className={styles.add_panel}>
    <button
      type="button"
      className={styles.add_button}
      onClick={() => addToWatchlist(id)}
    >
      <Icon icon={ICONS.ADDUSER} />
    </button>
    <button
      type="button"
      className={styles.info_button}
      onClick={() => toggleModal(id)}
    >
      <Icon icon={ICONS.INFO} />
    </button>
  </div>
);

CardPanel.propTypes = {
  id: PropTypes.number.isRequired,
  // addCard: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  watchlist: state.watchlist,
});

const mapDispatchToProps = {
  addToWatchlist,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardPanel);
