import React, {Component} from 'react'
import './style.scss';
import regconfig from './regconfig';
import {connect} from "react-redux";
import {regFormAction, setRegisterButtonState, cleanRegError, setRegError} from "../../store/actions/headerActions";
import {addDBEntry, setDbError} from "../../store/actions/dbActions";
import validations from '../../utils/validations';
import FormGroupContainer from '../../containers/FormGroupContainer';
import {Col, Form, Row} from 'reactstrap';
import Card from '../../components/Card';
import Button from '../../components/Button';
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {withRouter} from "react-router-dom";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.regConfig = JSON.parse(JSON.stringify(regconfig));
    this.fieldsOrder = ['name', 'email', 'password', 'gender', 'birthday', 'birthTime', 'weight'];
    this.columnLayout = {
      sm: {size: 12},
      md: {size: 12}
    }
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
  
  prepearRegForm = () => {
    return this.fieldsOrder.map(id => {
        const obj = this.regConfig[id];
        return (
          <FormGroupContainer
            key={id}
            onFocusHandler={this.onBlur}
            obj={obj}
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
          <div className="card-wrapper"><Card>
            <Form onSubmit={this.formHandler}>
              <button className="loginBtn loginBtn--google">
                Register with Google
              </button>
              {this.prepearRegForm()}
              <Row>
                <Col>
                  <button className="loginBtn loginBtn--custom">Register</button>
                  <button className="loginBtn loginBtn--facebook">
                    Register with Facebook
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

RegisterContainer.propTypes = {
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));
