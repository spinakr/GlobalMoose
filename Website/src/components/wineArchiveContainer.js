import 'whatwg-fetch'; // Native fetch polyfill
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WineListComponent from './wineListComponent';

const WineArchiveContainer = ({ wineArchive }) => {
  return (
    <div>
      <WineListComponent wines={wineArchive} />
    </div>
  );
};

const mapStateToProps = state => ({
  wineArchive: state.wines.archive,
});

WineArchiveContainer.propTypes = {
  wineArchive: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(WineArchiveContainer);

