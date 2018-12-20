import React, {Fragment} from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import LinkButton from "../LinkButton/LinkButton";
import './style.scss';
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import * as actions from "../../store/actions/headerActions";
import {userRegisteredSuccess} from "../../store/actions/registerActions";

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
  
  componentDidMount() {
    const {registered, history, onRegistered} = this.props;
    if (registered) {
      onRegistered(false);
      history.push('/login');
    }
  }
  
  headerMode() {
    if (!this.props.auth) {
      return (<Nav className="ml-auto" navbar>
        <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
        <LinkButton className="Button Button--link" to="/login">Login</LinkButton>
        <LinkButton className="Button Button--link" to="/register">Register</LinkButton>
      </Nav>);
    } else {
      return (<Nav className="ml-auto" navbar>
        <LinkButton className="Button Button--link" to="/" active>Home</LinkButton>
        <a className="Button Button--link" href="/api/logout">Logout</a>
      </Nav>);
    }
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
    auth: state.dataBase.auth,
    registered: state.register.registered
  }
};

const mapDispatchToProps = dispatch => {
  return {
    mode: (data) => dispatch(actions.setHeaderButtonsMode(data)),
    onRegistered: (mode) => dispatch(userRegisteredSuccess(mode))
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBarHeader));
