import React, {Fragment} from 'react';
import {
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';
import LinkButton from "../LinkButton/LinkButton";
import './style.scss';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import * as actions from "../../store/actions/headerActions";
import {userRegisteredSuccess} from "../../store/actions/registerActions";

class NavBarHeader extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      loginButton: false
    };
  }
  
  navBarToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  
  dropdownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  
  authToggle = () => {
    this.setState({
      loginButton: !this.state.loginButton
    });
  };
  
  componentDidMount() {
    const {registered, history, onRegistered} = this.props;
    if (registered) {
      onRegistered(false);
      history.push('/login');
    }
  }
  
  headerMode() {
    if (!this.props.auth) {
      return (
        <Nav className="ml-auto" navbar>
          {this.state.loginButton ?
            <LinkButton className="Button Button--success" to="/login" onClick={this.authToggle}>Login</LinkButton>
            :
            <LinkButton className="Button Button--success" to="/register" onClick={this.authToggle}>Get
              started</LinkButton>
          }
        </Nav>
      )
    } else {
      return (<Nav className="ml-auto" navbar>
        <a className="Button Button--success" href="/api/logout">Logout</a>
      </Nav>);
    }
  };
  
  render() {
    return (
      <Fragment>
        <Navbar className="header" dark expand="md">
          <NavbarBrand href="/">Biorhythms</NavbarBrand>
          <NavbarToggler onClick={this.navBarToggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
              <Dropdown nav className="dropdown-products" isOpen={this.state.dropdownOpen} toggle={this.dropdownToggle}>
                <DropdownToggle nav caret>
                  <span>Products</span>
                </DropdownToggle>
                <DropdownMenu>
                  <LinkButton className="Button Button--dropdown" to="/143"
                              onClick={this.dropdownToggle}
                              active>143</LinkButton>
                  <DropdownItem divider/>
                  <LinkButton className="Button Button--dropdown" to="/biorhythms"
                              onClick={this.dropdownToggle}
                              active>Biorhythms</LinkButton>
                </DropdownMenu>
              </Dropdown>
            </Nav>
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
    auth: state.auth.login.loggedIn,
    registered: state.auth.register.registered
  }
};

const mapDispatchToProps = dispatch => {
  return {
    mode: (data) => dispatch(actions.setHeaderButtonsMode(data)),
    onRegistered: (mode) => dispatch(userRegisteredSuccess(mode))
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarHeader));
