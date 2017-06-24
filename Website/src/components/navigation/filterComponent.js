import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import PropTypes from 'prop-types';

const FilterComponent = ({ toggleFilter, activeFilters }) => {
  return (
    <div>
      <nav className="navbar fixed-bottom navbar-light" >
        <div className="btn-group" style={{ float: 'none', display: 'inline-block', textAlign: 'center' }}>
          <label className={activeFilters.includes('Rød') ? 'btn btn-danger' : 'btn btn-outline-danger'}>
            <input type="button" onClick={() => toggleFilter('Rød')} style={{ visibility: 'hidden' }} />
          </label>
          <label className={activeFilters.includes('Hvit') ? 'btn btn-secondary' : 'btn btn-outline-secondary'}>
            <input type="button" onClick={() => toggleFilter('Hvit')} style={{ visibility: 'hidden' }} />
          </label>
          <label className={activeFilters.includes('Muserende') ? 'btn btn-warning' : 'btn btn-outline-warning'}>
            <input type="button" onClick={() => toggleFilter('Muserende')} style={{ visibility: 'hidden' }} />
          </label>
        </div>
      </nav>
    </div>
  );
};

FilterComponent.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  activeFilters: PropTypes.array.isRequired,
};

export default FilterComponent;
