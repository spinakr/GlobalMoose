import 'whatwg-fetch'; // Native fetch polyfill
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchStats } from '../modules/stats';
import WineStatsComponent from './wineStatsComponent';

class WineStatsContainer extends Component {
  componentDidMount() {
    this.props.fetchStats();
  }
  render() {
    return (
      <div>
        <WineStatsComponent stats={this.props.stats} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStats: bindActionCreators(fetchStats, dispatch),
  };
};

const mapStateToProps = state => ({
  stats: state.stats,
});

WineStatsContainer.propTypes = {
  stats: PropTypes.object.isRequired,
  fetchStats: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WineStatsContainer);

