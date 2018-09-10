import React from 'react';
import PropTypes from 'prop-types';

const Trailer = ({ url }) => (
  <iframe
    title="trailer"
    width="200"
    height="150"
    src={`https://www.youtube.com/embed/${url}`}
    frameBorder="0"
    allow="autoplay; encrypted-media"
    allowFullScreen
  />
);

Trailer.propTypes = {
  url: PropTypes.string,
};

Trailer.defaultProps = {
  url: '',
};

export default Trailer;
