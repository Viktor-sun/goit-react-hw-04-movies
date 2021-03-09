import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import './Navigation.scss';

const Navigation = () => (
  <nav>
    <ul className="NavList">
      <li className="NavItem">
        <NavLink
          exact
          to={routes.home}
          className="Navlink"
          activeClassName="Navlink-active"
        >
          Home
        </NavLink>
      </li>
      <li className="NavItem">
        <NavLink
          to={routes.movies}
          className="Navlink"
          activeClassName="Navlink-active"
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navigation;
