import React, {Component} from 'react'
import loginconfig from './loginconfig';
import {connect} from "react-redux";
import {loginWithGoogle} from "../../store/actions/dbActions";
import {clearModel} from "../../store/actions/registerActions";
import validations from '../../utils/validations';
import FormGroupContainer from '../../containers/FormGroupContainer';
import {Col, Form, Row} from 'reactstrap';
import Card from '../../components/Card';
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {withRouter} from "react-router-dom";
import './style.scss';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.loginConfig = JSON.parse(JSON.stringify(loginconfig));
    this.fieldsOrder = ['email', 'password'];
    this.columnLayout = {};
    this.googleInput = React.createRef();
  }
  
  formHandler = (e) => {
    e.preventDefault();
    //this.props.loginGoogle();
    
    /*console.log(this.googleInput.current.name);
    switch (this.googleInput.current.name) {
      case "google": //(() => '/auth/google')();
        this.props.loginGoogle();
        break;
      case "custom":
        break;
      case "facebook":
        break;
    }*/
    //this.props.sendRegistryData(this.props.model);
    //this.props.history.push('/');
  };
  
  
  onBlur = event => {
    const res = event.target;
    if (res.required && validations(res.name, res.value)) {
      this.props.setError(res.name);
      return;
    }
    // this.props.clean(res.name);
    // this.props.regForm(res);
    // this.props.clearModel();
    return null;
  };
  
  prepearLogForm = () => {
    return this.fieldsOrder.map(id => {
        const obj = this.loginConfig[id];
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
                <a name="google" className="loginBtn loginBtn--google" href={'http://localhost:5000/auth/google'}>
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
  loginGoogle: () => dispatch(loginWithGoogle()),
  clearModel: () => dispatch(clearModel())
});

const mapStateToProps = state => {
  return {
    model: state.header.model,
    errors: state.header.regErrors,
    isLoading: state.header.loading
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
