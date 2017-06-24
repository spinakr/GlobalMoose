import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import NavContainer from '../navigation/navContainer';
import WinesInStockContainer from '../winesInStockContainer';
import WineArchiveContainer from '../wineArchiveContainer';
import WineStatsContainer from '../wineStatsContainer';
import ShoppingListContainer from '../shoppingListContainer';
import AddNewFormContainer from '../forms/addNewFormContainer';
import FacebookLoginContainer from '../facebookLoginContainer';
import { fetchWines } from '../../modules/wines';

class AppLayoutContainer extends Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchWines();
      if (window.location.hash === '#/_=_') {
        window.location.hash = '';
      }
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return (
        <div className="container">
          <HashRouter>
            <div>
              <Route path="/" component={NavContainer} />
              <Route exact path="/" component={WinesInStockContainer} />
              <Route path="/archive" component={WineArchiveContainer} />
              <Route path="/shoppinglist" component={ShoppingListContainer} />
              <Route path="/addnew" component={AddNewFormContainer} />
              <Route path="/stats" component={WineStatsContainer} />
            </div>
          </HashRouter>
        </div>
      );
    }

    return <FacebookLoginContainer />;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.facebook.authenticated,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWines: bindActionCreators(fetchWines, dispatch),
  };
};

AppLayoutContainer.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  fetchWines: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLayoutContainer);

