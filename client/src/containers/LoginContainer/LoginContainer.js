import React, {Component} from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import validations from '../../utils/validations';
import CustomCard from '../../components/CustomCard';
import {Card, CardBody, CardText} from "reactstrap";
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {withRouter} from "react-router-dom";
import './style.scss';
import {setHeaderButtonsMode} from "../../store/actions/headerActions";
import {
  cleanLoginError,
  sendLoginData,
  setLoginError,
  loginFormAction,
  clearLoginModel
} from "../../store/actions/loginActions";
import {clearRegModel} from "../../store/actions/registerActions";
import Login from "../../components/Login";
import LinkButton from "../../components/NavBarHeader/NavBarHeader";


class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.columnLayout = {};
    this.props.loginButtonMode({button: "loginBtn", mode: false});
    this.state = {
      auth: false
    }
  }
  
  static getDerivedStateFromProps({auth, history}, nextState) {
    if (auth) {
      history.push('/');
    }
    return null;
  }
  
  formHandler = (e) => {
    e.preventDefault();
    const {login, clearRegModel, clearLoginModel} = this.props;
    
    login(this.props.model);
    clearRegModel();
    clearLoginModel();
  };
  
  forgotPasswordHahdler = () => {
  }
  
  onChange = event => {
    const
      data = event.target,
      {loginForm, setError, clean} = this.props;
    
    loginForm(data);
    validations(data.name, data.value) ? setError(data.name) : clean(data.name);
  };
  
  isValid = (value, validation) => {
    return !Object.keys(validation).some(key => key === value);
  };
  
  render() {
    const {errors, emailError, passwordError, model: {email, password}} = this.props;
    return (
      <div className="page-wrapper">
        {this.props.isLoading ?
          <Spinner/>
          :
          <div className="card-wrapper">
            <CustomCard title="Login in to 143!">
              <Login
                formHandler={this.formHandler}
                isValid={this.isValid}
                onChange={this.onChange}
                errors={errors}
                emailServerError={emailError}
                passwordServerError={passwordError}
                emailValue={email}
                passwordValue={password}
                forgotPassword={this.forgotPasswordHahdler}/>
            </CustomCard>
            <Card className="mt-4">
              <CardBody>
                <CardText className="card-text-layout"><span>New to 143?</span> {<Link to="/register">Create an account</Link>} </CardText>
              </CardBody>
            </Card>
          </div>
        }
      </div>
    )
  }
}

LoginContainer.propTypes = {
  errors: PropTypes.object,
  model: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  loginForm: (data) => dispatch(loginFormAction(data)),
  login: (data) => dispatch(sendLoginData(data)),
  clean: (data) => dispatch(cleanLoginError(data)),
  setError: (data) => dispatch(setLoginError(data)),
  loginButtonMode: (data) => dispatch(setHeaderButtonsMode(data)),
  clearRegModel: () => dispatch(clearRegModel()),
  clearLoginModel: () => dispatch(clearLoginModel())
});

const mapStateToProps = state => {
  return {
    model: state.auth.login.model,
    errors: state.auth.login.loginErrors,
    isLoading: state.user.loading,
    emailError: state.auth.login.loginServerErrors.emailError,
    passwordError: state.auth.login.loginServerErrors.passwordError,
    auth: state.auth.login.loggedIn
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
