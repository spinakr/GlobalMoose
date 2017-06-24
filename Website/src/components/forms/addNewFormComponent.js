import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddNewFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { vinmonopoletId: '', storage: false, count: 1, name: '', producer: '', country: '', area: '', vintage: '', fruit: '', price: '' };

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
      <form>
        <div className="form-group pt-5">
          <h5>Add New Wine </h5>

          <div className="row">
            <div className="col-8">
              <input
                type="text"
                name="vinmonopoletId"
                className="form-control form-control-lg"
                placeholder="Vinmonopolet id"
                onChange={this.handleFormChanged}
                value={this.state.vinmonopoletId}
              /> <br />
            </div>
            <div className="col-4">
              <input
                type="number"
                name="count"
                className="form-control form-control-lg"
                onChange={this.handleFormChanged}
                value={this.state.count}
              /> <br />
            </div>
          </div>

          <div className="collapse" id="detailsSection">
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="name"
              className="form-control form-control-lg"
              placeholder="Name"
              onChange={this.handleFormChanged}
              value={this.state.name}
            /> <br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="producer"
              className="form-control form-control-lg"
              placeholder="Producer"
              onChange={this.handleFormChanged}
              value={this.state.producer}
            /> <br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="country"
              className="form-control form-control-lg"
              placeholder="Country"
              onChange={this.handleFormChanged}
              value={this.state.country}
            /> <br />
            <select
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              className="form-control form-control-lg"
              name="type"
              onChange={this.handleFormChanged}
              value={this.state.type}
            >
              <option>Rødvin</option>
              <option>Hvitvin</option>
              <option>Musserende vin</option>
              <option>Surøl</option>
            </select><br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="area"
              className="form-control form-control-lg"
              placeholder="Area"
              onChange={this.handleFormChanged}
              value={this.state.area}
            /> <br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="vintage"
              className="form-control form-control-lg"
              placeholder="Vintage"
              onChange={this.handleFormChanged}
              value={this.state.vintage}
            /> <br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="fruit"
              className="form-control form-control-lg"
              placeholder="Fruit"
              onChange={this.handleFormChanged}
              value={this.state.fruit}
            /> <br />
            <input
              disabled={this.state.vinmonopoletId !== '' && this.state.vinmonopoletId !== ''}
              type="text"
              name="price"
              placeholder="Price"
              className="form-control form-control-lg"
              onChange={this.handleFormChanged}
              value={this.state.price}
            /> <br />
          </div>

          <div className="row">
            <div className="col-8">
              <label className="custom-control custom-checkbox">
                <input
                  name="storage"
                  type="checkbox"
                  className="custom-control-input"
                  value={this.state.storage}
                  onChange={this.handleFormChanged}
                />
                <span className="custom-control-indicator" />
                <span className="custom-control-description">To be stored?</span>
              </label>
            </div>
            <div className="col-4">
              <a data-toggle="collapse" href="#detailsSection" aria-expanded="false" aria-controls="detailsSection">
                Enter details
              </a>
            </div>
          </div>

        </div>

        <button type="submit" className="btn btn-primary" onClick={() => addNewWine(this.state)}>Save</button>
      </form>
    );
  }
}

AddNewFormComponent.propTypes = {
  addNewWine: PropTypes.func.isRequired,
};

export default AddNewFormComponent;
