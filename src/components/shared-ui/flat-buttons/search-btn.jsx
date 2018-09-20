import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  button: {
    width: 36,
    height: 36,
  },
});

const SearchButton = ({ classes }) => (
  <Tooltip title="Find the movie by name" TransitionComponent={Zoom}>
    <Button
      variant="fab"
      color="default"
      type="submit"
      className={classes.button}
    >
      <SearchIcon />
    </Button>
  </Tooltip>
);

SearchButton.propTypes = {
  classes: PropTypes.objectOf(Object).isRequired,
};

export default withStyles(styles)(SearchButton);
