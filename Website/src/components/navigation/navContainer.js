import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import NavComponent from './navComponent';
import { toggleFilter } from '../../modules/wines';

class NavContainer extends Component {
  render() {
    return <NavComponent toggleFilter={this.props.toggleFilter} location={this.props.location} activeFilters={this.props.activeFilters} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFilter: bindActionCreators(toggleFilter, dispatch),
  };
};

const mapStateToProps = state => ({
  activeFilters: state.wines.activeFilters,
});

NavContainer.propTypes = {
  location: PropTypes.object.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  activeFilters: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavContainer);
