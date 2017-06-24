import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import FilterComponent from './filterComponent';

const NavComponent = ({ location, toggleFilter, activeFilters }) => {
  return (
    <div>
      <nav className="navbar stixy-top navbar-toggleable-md navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <NavLink to="/" className="navbar-brand mb-0 nav-link">Wine Cooler</NavLink>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li role="presentation" className={location.pathname === '/addnew' ? 'nav-item active' : 'nav-item'}>
              <NavLink to="/addnew" className="nav-link">Add New</NavLink>
            </li>
            <li role="presentation" className={location.pathname === '/shoppinglist' ? 'nav-item active' : 'nav-item'}>
              <NavLink to="/shoppinglist" className="nav-link">Shopping List</NavLink>
            </li>
            <li role="presentation" className={location.pathname === '/archive' ? 'nav-item active' : 'nav-item'}>
              <NavLink to="/archive" className="nav-link">Archive</NavLink>
            </li>
            <li role="presentation" className={location.pathname === '/stats' ? 'nav-item active' : 'nav-item'}>
              <NavLink to="/stats" className="nav-link">Stats</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      {location.pathname !== '/addnew' ?
        <nav className="navbar fixed-bottom navbar-light" >
          <FilterComponent toggleFilter={toggleFilter} activeFilters={activeFilters} />
        </nav> : ''}
    </div>
  );
};

NavComponent.propTypes = {
  location: PropTypes.object.isRequired,
  toggleFilter: PropTypes.func.isRequired,
  activeFilters: PropTypes.array.isRequired,
};

export default NavComponent;
