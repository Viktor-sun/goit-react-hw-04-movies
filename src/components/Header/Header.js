import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({ children }) => <header className="Header">{children}</header>;

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
