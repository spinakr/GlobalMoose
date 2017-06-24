import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WineComponent from './wineComponent';


const WineContainer = ({ wine }) => {
  return <WineComponent wine={wine} />;
};

WineContainer.propTypes = {
  wine: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});


export default connect(mapStateToProps)(WineContainer);
