import React from 'react';
import PropTypes from 'prop-types';
import WineContainer from './wineContainer';

const WineListComponent = ({ wines }) => {
  return (
    <div className="pb-5">
      {wines.map((wine, index) => {
        return wine.isHidden === false ? <WineContainer wine={wine} key={index} /> : '';
      })}
    </div>
  );
};

WineListComponent.propTypes = {
  wines: PropTypes.array.isRequired,
};

export default WineListComponent;
