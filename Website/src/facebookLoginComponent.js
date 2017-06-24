import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
 
class FacebookLoginComponent extends Component {
  responseFacebook(response) {
    console.log(response)
  }
 
  render() {
    return (
      <FacebookLogin
        appId="1865156913809609"
        autoLoad={true}
        fields="name,email"
        callback={this.responseFacebook}
      />
    )
  }
}
 
export default FacebookLoginComponent;