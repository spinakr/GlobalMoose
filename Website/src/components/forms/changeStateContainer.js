import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArchiveFormComponent from './archiveFormComponent';
import { archiveWine, moveToInStock } from '../../modules/wines';


const ChangeStateContainer = ({ wine, dispatch }) => {
  const archiveWineFunction = (form) => {
    dispatch(archiveWine(wine.ids[0])(form));
  };
  const moveToInStockFunction = () => {
    dispatch(moveToInStock(wine.ids[0]));
  };
  if (wine.info.status === 'instock') {
    return <ArchiveFormComponent wineInfo={wine.info} archiveWine={archiveWineFunction} />;
  }
  if (wine.info.status === 'shoppinglist') {
    return (
      <div className="card-block">
        <button type="button" className="btn btn-outline-danger btn-sm" data-dismiss="modal" onClick={moveToInStockFunction}>Got it!</button>
      </div>
    );
  }
  return null;
};

ChangeStateContainer.propTypes = {
  wine: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(ChangeStateContainer);
