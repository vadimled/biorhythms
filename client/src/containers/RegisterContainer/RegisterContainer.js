import React, {Component} from 'react'
import './style.scss';
import {connect} from "react-redux";
import {cleanRegError, regFormAction, sendRegistryData, setRegError} from "../../store/actions/registerActions";
import {setHeaderButtonsMode} from "../../store/actions/headerActions";
import validations from '../../utils/validations';
import CustomCard from '../../components/CustomCard';
import * as PropTypes from "prop-types";
import Spinner from "../../components/Spinner";
import {withRouter} from "react-router-dom";
import Register from "../../components/Register";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
     this.props.regButtonMode({button: "registerBtn", mode: false});
  }
  
   componentWillUnmount() {
    this.props.regButtonMode({button: "registerBtn", mode: true});
  }
  
  formHandler = (e) => {
    e.preventDefault();
    const {register} = this.props;
  
    register(this.props.model);
  };
  
  onChange = event => {
    const
      data = event.target,
      {regForm, setError, clean} = this.props;
  
    validations(data.name, data.value) ?  console.log(`setError(data.name)=${data.name}`)|| setError(data.name) : clean(data.name);
    regForm(data);
  };
  
  isValid = (value, validation) => {
    return !Object.keys(validation).some(key => key === value);
  };
  
  render() {
    const {errors, emailError, model} = this.props;
    return (
      <div className="page-wrapper">
        {this.props.isLoading ?
          <Spinner/>
          :
          <div className="card-wrapper">
            <CustomCard title="Please register">
              <Register
                formHandler={this.formHandler}
                isValid={this.isValid}
                onChange={this.onChange}
                errors={errors}
                serverError={emailError}
                model={model}/>
            </CustomCard>
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
  regButtonMode: (data) => dispatch(setHeaderButtonsMode(data)),
  register: (model) => dispatch(sendRegistryData(model))
});

const mapStateToProps = state => {
  return {
    model: state.auth.register.model,
    errors: state.auth.register.regErrors,
    emailError: state.auth.register.regServerErrors.emailError,
    isLoading: state.user.loading
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterContainer));
