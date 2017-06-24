import 'whatwg-fetch'; // Native fetch polyfill
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WineListComponent from './wineListComponent';
import AddToShoppingListContainer from './forms/addToShoppingListContainer';

const ShoppingListContainer = ({ shoppingList }) => {
  return (
    <div>
      <AddToShoppingListContainer />
      <WineListComponent wines={shoppingList} />
    </div>
  );
};

const mapStateToProps = state => ({
  shoppingList: state.wines.shoppingList,
});

ShoppingListContainer.propTypes = {
  shoppingList: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(ShoppingListContainer);

