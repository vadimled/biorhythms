import React, {Fragment} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import LinkButton from "../LinkButton/LinkButton";
import './style.scss';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

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
  
  headerMode(){
    if (!this.props.auth) {
      return( <Nav className="ml-auto" navbar>
        <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
        <LinkButton className="Button Button--link" to="/login">Login</LinkButton>
        <LinkButton className="Button Button--link" to="/register">Register</LinkButton>
      </Nav>);
    }
    return (<Nav className="ml-auto" navbar>
      <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
      <a className="Button Button--link" href="/api/logout">Logout</a>
    </Nav>);
  };
  
  render() {
    return (
      <Fragment>
        <Navbar className="header" dark expand="md">
          <NavbarBrand href="/">Biorhythms</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            {this.headerMode()}
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    registerButtonState: state.header.registerBtn,
    auth: state.dataBase.auth
  }
};
export default connect(mapStateToProps)(NavBarHeader);
