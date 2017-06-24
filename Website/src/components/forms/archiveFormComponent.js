import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ArchiveFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { occation: '', note: '' };

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
    const archiveWine = this.props.archiveWine;
    const wineKey = this.props.wineInfo.rowKey;
    const wineInfo = this.props.wineInfo;
    return (
      <div className="card-block">
        <button type="button" className="btn btn-outline-danger btn-sm" data-toggle="modal" data-target={`#${wineKey}`}>
          Empty!
        </button>

        <div className="modal" id={wineKey} tabIndex="-1" role="dialog" aria-labelledby={wineKey} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={wineKey}>{wineInfo.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group row">
                  <label htmlFor="occation" className="col-2 col-form-label">Occation</label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      name="occation"
                      type="text"
                      value={this.state.occation}
                      id="occation"
                      onChange={this.handleFormChanged}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="note" className="col-2 col-form-label">Note</label>
                  <div className="col-10">
                    <input
                      className="form-control"
                      name="note"
                      type="text"
                      value={this.state.note}
                      id="note"
                      onChange={this.handleFormChanged}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary btn-sm" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal" onClick={() => archiveWine(this.state)}>Archive!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArchiveFormComponent.propTypes = {
  archiveWine: PropTypes.func.isRequired,
  wineInfo: PropTypes.object.isRequired,
};

export default ArchiveFormComponent;
