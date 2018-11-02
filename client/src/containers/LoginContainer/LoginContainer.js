import React, {Component} from 'react'
import loginconfig from './loginconfig';
import {connect} from "react-redux";
import {cleanRegError, regFormAction, setRegError, setRegisterButtonState} from "../../store/actions/headerActions";
import {addDBEntry, setDbError} from "../../store/actions/dbActions";
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
    this.columnLayout = {}
  }
  
  componentDidMount() {
    this.props.regButtonState(false);
  }
  
  componentWillUnmount() {
    this.props.regButtonState(true);
  }
  
  
  formHandler = (e) => {
    e.preventDefault();
    this.props.addNewEntry(this.props.model);
    this.props.history.push('/');
  };
  
  onBlur = event => {
    const res = event.target;
    if (res.required && validations(res.name, res.value)) {
      this.props.setError(res.name);
      return;
    }
    this.props.clean(res.name);
    this.props.regForm(res);
    return null;
  };
  
  prepearLogForm = () => {
    return this.fieldsOrder.map(id => {
        const obj = this.loginConfig[id];
        return (
          <FormGroupContainer
            key={id}
            onFocusHandler={this.onBlur}
            obj={this.loginConfig[id]}
            colAtr={this.columnLayout}
            validation={this.isValid}
          />
        )
      }
    )
  }
  
  render() {
    return (
      <div className="page-wrapper">
        {this.props.isLoading ?
          <Spinner/>
          :
          <div className="card-wrapper">
            <Card title="Welcome back!">
              <Form onSubmit={this.formHandler}>
                <button className="loginBtn loginBtn--google">
                  Login with Google
                </button>
                {this.prepearLogForm()}
                <Row>
                  <Col>
                    <button className="loginBtn loginBtn--custom">Login</button>
                    <button className="loginBtn loginBtn--facebook">
                      Login with Facebook
                    </button>
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
  regForm: (data) => dispatch(regFormAction(data)),
  clean: (data) => dispatch(cleanRegError(data)),
  setError: (data) => dispatch(setRegError(data)),
  regButtonState: (data) => dispatch(setRegisterButtonState(data)),
  addNewEntry: (model) => dispatch(addDBEntry(model)),
  setDbError: key => dispatch(setDbError(key))
})

const mapStateToProps = state => {
  return {
    model: state.header.model,
    errors: state.header.regErrors,
    isLoading: state.header.loading
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));
