import React from 'react';
import PropTypes from 'prop-types';

const WineStatsComponent = ({ stats }) => {
  return (
    <div className="card">
      <div className="row">
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Number of wines in stock</h6>
            <p className="card-text">{stats.countInStock}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Number of wines in archive</h6>
            <p className="card-text">{stats.countInArchive}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Total Price in stock</h6>
            <p className="card-text">{stats.totalPrice}</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Number of red wines</h6>
            <p className="card-text">{stats.redCount}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Number of white wines</h6>
            <p className="card-text">{stats.whiteCount}</p>
          </div>
        </div>
        <div className="col-4">
          <div className="card-block">
            <h6 className="card-subtitle">Number of sparkling wines</h6>
            <p className="card-text">{stats.sparklingCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

WineStatsComponent.propTypes = {
  stats: PropTypes.object.isRequired,
};

export default WineStatsComponent;
