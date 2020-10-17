import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import {Link} from "react-router-dom";
import routes from '../routes';
import "../App.css";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="table">
      <Navbar light expand="sm">
        <Link className="navbar-brand nav" to={routes.home}>Form</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <Link  className="navbar-brand" to={routes.editdelete}>Modify Data</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <hr color="black"></hr>
      
    </div>
  );
}

export default Header;