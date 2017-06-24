import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { addNewWine } from '../../modules/addWineForm';
import AddToShoppingListComponent from './addToShoppingListComponent';

class AddToShoppingListContainer extends Component {
  render() {
    if (!this.props.isPostingWine && this.props.errorMessage === '' && this.props.newWineAddedName === '') {
      return (
        <AddToShoppingListComponent addNewWine={this.props.addNewWine} />
      );
    } else if (this.props.isPostingWine) {
      return (
        <span>Adding new wine... </span>
      );
    } else if (this.props.newWineAddedName !== '') {
      return (
        <div className="alert alert-info  mt-5" role="alert">
          <strong>{this.props.newWineAddedName}</strong> was added to your shopping list!
        </div>
      );
    }
    return (
      <div className="alert alert-danger mt-5" role="alert">
        <strong>Hang on!</strong> Adding new wine failed. ({this.props.errorMessage})
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewWine: bindActionCreators(addNewWine('shoppinglist'), dispatch),
  };
};

const mapStateToProps = state => ({
  isPostingWine: state.addWineForm.postingWine,
  errorMessage: state.addWineForm.errorMessage,
  newWineAddedName: state.addWineForm.newWineAddedName,
});

AddToShoppingListContainer.propTypes = {
  addNewWine: PropTypes.func.isRequired,
  isPostingWine: PropTypes.bool.isRequired,
  newWineAddedName: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToShoppingListContainer);
