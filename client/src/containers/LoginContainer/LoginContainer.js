import React, {Component} from 'react'
import loginconfig from './loginconfig';
import {connect} from "react-redux";
import validations from '../../utils/validations';
import FormGroupContainer from '../../containers/FormGroupContainer';
import {Col, Form, Row} from 'reactstrap';
import Card from '../../components/Card';
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {withRouter} from "react-router-dom";
import './style.scss';
import {setHeaderButtonsMode} from "../../store/actions/headerActions";
import {sendLoginData, cleanLoginError, setLoginError} from "../../store/actions/loginActions";
import {clearRegModel} from "../../store/actions/registerActions";
import {setEmailLogin, setPasswordLogin} from "../../store/actions/loginActions";
// import * as headerActions from "../../store/actions/registerActions";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginConfig = JSON.parse(JSON.stringify(loginconfig));
    this.fieldsOrder = ['email', 'password'];
    this.columnLayout = {};
    this.googleInput = React.createRef();
    this.props.loginButtonMode({button: "loginBtn", mode: false});
    this.state = {
      password: "",
      email: ""
    }
  
  }
  
   formHandler = (e) => {
    e.preventDefault();
    
    this.props.login(this.state);
    this.props.clearRegModel();
    
    //this.props.history.push('/');
  
    /*//
   
   
   switch (this.googleInput.current.name) {
     case "google": //(() => '/auth/google')();
       this.props.loginGoogle();
       break;
     case "custom":
       break;
     case "facebook":
       break;
   }*/
  };
  
  
  onBlur = event => {
    const res = event.target;
    const {setError, clean, password, email } = this.props;
    
    if (res.required && validations(res.name, res.value)) {
      setError(res.name);
      return;
    }
    clean(res.name);
  
    if (res.name === "password")
      this.setState({password:res.value});
      //this.props.password(res.value);
    else if(res.name === "email")
      this.setState({email:res.value});
     // this.props.email(res.value);
  
    return null;
  };

  
  prepearLogForm = () => {
    return this.fieldsOrder.map(id => {
         return (
          <FormGroupContainer
            key={id}
            onFocusHandler={this.onBlur}
            ref={this.googleInput}
            obj={this.loginConfig[id]}
            colAtr={this.columnLayout}
            validation={this.isValid}
          />
        )
      }
    )
  };
  
  render() {
    return (
      <div className="page-wrapper">
        {this.props.isLoading ?
          <Spinner/>
          :
          <div className="card-wrapper">
            <Card title="Welcome back!">
              <Form onSubmit={this.formHandler}>
                <a name="google" className="linkLogin loginBtn--google" href={'/auth/google'}>
                  Login with Google
                </a>
                {this.prepearLogForm()}
                <Row>
                  <Col>
                    <button name="custom" className="loginBtn loginBtn--custom">
                      Login
                    </button>
                    <a name="facebook" href="#" className="linkLogin loginBtn--facebook">
                      Login with Facebook
                    </a>
                  </Col>
                </Row>
              </Form>
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
  login: (data) => dispatch(sendLoginData(data)),
  clean: (data) => dispatch(cleanLoginError(data)),
  setError: (data) => dispatch(setLoginError(data)),
  loginButtonMode: (data) => dispatch(setHeaderButtonsMode(data)),
  email: (data) => setEmailLogin(data),
  password: (data) => setPasswordLogin(data),
  clearRegModel: () => dispatch(clearRegModel())
});

const mapStateToProps = state => {
  return {
    model: state.auth.login.model,
    errors: state.auth.login.loginErrors,
    isLoading: state.auth.login.loading
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
