import React, {Component} from 'react'
import {connect} from "react-redux";
import validations from '../../utils/validations';
import Card from '../../components/Card';
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


class LoginContainer extends Component {
  constructor(props) {
    super(props);
    // this.fieldsOrder = ['email', 'password'];
    this.columnLayout = {};
    this.props.loginButtonMode({button: "loginBtn", mode: false});
  }
  
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.auth) {
      this.props.history.push('/');
    }
    return true;
  }
  
  formHandler = (e) => {
    e.preventDefault();
    const {login, clearRegModel, clearLoginModel} = this.props;

    login(this.props.model);
    clearRegModel();
    clearLoginModel();
  };
  
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
            <Card title="Welcome back!">
              <Login
                formHandler={this.formHandler}
                isValid={this.isValid}
                onChange={this.onChange}
                errors={errors}
                emailServerError={emailError}
                passwordServerError={passwordError}
                emailValue={email}
                passwordValue={password}/>
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
    isLoading: state.auth.login.loading,
    emailError: state.auth.login.loginServerErrors.emailError,
    passwordError: state.auth.login.loginServerErrors.passwordError,
    auth: state.dataBase.auth
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
