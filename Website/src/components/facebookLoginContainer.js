import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';
import { authenticatedSuccessfully } from '../modules/facebook';

class FacebookLoginContainer extends Component {
  render() {
    return (
      <FacebookLogin
        appId="1865156913809609"
        autoLoad="true"
        fields="name,email"
        callback={claims => this.props.authenticatedSuccessfully(claims.email, claims.name)}
      />
    );
  }
}

FacebookLoginContainer.propTypes = {
  authenticatedSuccessfully: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticatedSuccessfully: bindActionCreators(authenticatedSuccessfully, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(FacebookLoginContainer);

