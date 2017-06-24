import React from 'react';
import PropTypes from 'prop-types';

const WineInfoComponent = ({ label, data }) => {
  return (
    <div className="card-block">
      <h6 className="card-subtitle">{label}</h6>
      <p className="card-text">{data}</p>
    </div>
  );
};

WineInfoComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default WineInfoComponent;
