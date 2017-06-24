import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddToShoppingListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { vinmonopoletId: '' };

    this.handleFormChanged = this.handleFormChanged.bind(this);
  }
  handleFormChanged(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { addNewWine } = this.props;
    return (
      <form className="form-inline">
        <input
          type="text"
          name="vinmonopoletId"
          className="form-control form-control-lg m-2"
          placeholder="Vinmonopolet id"
          onChange={this.handleFormChanged}
          value={this.state.vinmonopoletId}
        />
        <button type="submit" className="btn btn-primary" onClick={() => addNewWine(this.state)}>Save</button>
      </form>
    );
  }
}

AddToShoppingListComponent.propTypes = {
  addNewWine: PropTypes.func.isRequired,
};

export default AddToShoppingListComponent;
