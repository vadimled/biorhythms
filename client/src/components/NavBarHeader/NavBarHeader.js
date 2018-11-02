import React, {Fragment} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import LinkButton from "../LinkButton/LinkButton";
import './style.scss';
import {connect} from 'react-redux';

class NavBarHeader extends React.Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Fragment>
        <Navbar className="header" dark expand="md">
          <NavbarBrand href="/" >Biorhythms</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
              <LinkButton className="Button Button--link" to="/login">Sign in</LinkButton>
              <LinkButton className="Button Button--link" disabled={!this.props.registerButtonState} to="/register">Register</LinkButton>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerButtonState: state.header.registerBtn
  }
};
export default connect(mapStateToProps)(NavBarHeader);
