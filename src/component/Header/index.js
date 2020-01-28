import React from 'react';
import { Navbar } from 'react-bootstrap';
import './index.css';

const Header = () => {
  return (
    <Navbar>
	    <Navbar.Brand href="#home"><span>Division 293.com</span><div className="red-line"></div></Navbar.Brand>
		</Navbar>
  );
}

export default Header;
