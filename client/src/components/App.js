import React, {Component, Fragment} from 'react';
import * as actions from "../store/actions/userActions";
import {Route, withRouter, Switch} from "react-router-dom";
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from "../containers/RegisterContainer/RegisterContainer";
import {Container} from "reactstrap";
import NavBarHeader from "../components/NavBarHeader/NavBarHeader";
import {connect} from "react-redux";
import Spinner from "../components/Spinner";
import Biorhythms from "../pages/Biorhythms";
import Main from "../pages/Main";

class App extends Component {
 
  componentWillMount() {
    this.props.fetchUser();
  }
  
  render() {
    return (
      <Fragment>
        {this.props.isLoading ?
          <Spinner/>
          :
          <Container>
            <NavBarHeader/>
            <div className="App">
              <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/biorhythms" exact component={Biorhythms}/>
                <Route path="/login" exact component={LoginContainer}/>
                <Route path="/register" exact component={RegisterContainer}/>
              </Switch>
            </div>
          </Container>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.user.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: () => dispatch(actions.fetchUser())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
