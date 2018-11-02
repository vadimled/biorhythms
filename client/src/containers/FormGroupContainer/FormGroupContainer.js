import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import FormGroupUI from '../../components/FormGroupUI'
import validations from '../../utils/validations';
import {regFormAction, setRegisterButtonState, cleanRegError, setRegError} from "../../store/actions/headerActions";

class FormGroupContainer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      inputVal: ""
    }
  }
  
  componentWillMount() {
    const {obj: {inputAttr}} = this.props;
    this.setState({inputVal: this.props.model[inputAttr.name] || ""})
    
  }
  
  isValid = (value, validation) => {
    return !Object.keys(validation).some(key => key === value);
  };
  
  isDbErrors = (value) => {
    return Object.keys(this.props.dbE).some(key => key === value);
  };
  
  onChange = event => {
    const {obj: {inputAttr}} = this.props;
    const key = inputAttr.name;
    
    if (inputAttr && inputAttr.required && validations(key, event.target.value)) {
      this.props.setError(key);
    }
    else {
      this.props.clean(key);
    }
    this.setState({inputVal: event.target.value || ""})
  };
  
  inputAttr = () => {
    const {errors, onFocusHandler, obj: {inputAttr}} = this.props;
    const valid = inputAttr ? this.isValid(inputAttr.name, errors) : false;
    const val = this.state.inputVal;
    return {
      ...inputAttr,
      ...inputAttr.required && {invalid: !valid, valid: valid},
      onBlur: onFocusHandler,
      value: val,
      onChange: this.onChange,
      readOnly: false
    }
  };
  
  render() {
    const {colAtr, labelAtr, obj: {labelText, id, formFeedback, options}} = this.props;
    return (
      <div>
        <FormGroupUI
          key={id}
          formGroupAtr={{row: true}}
          labelAtr={labelAtr}
          labelText={labelText}
          colAtr={colAtr}
          inputAttr={this.inputAttr()}
          formFeedback={formFeedback}
          dbError={this.isDbErrors(id)}
          options={options || {}}
        />
      </div>
    );
  }
}

FormGroupContainer.propTypes = {
  obj: PropTypes.object,
  validation: PropTypes.object,
  onFocusHandler: PropTypes.func,
  inputAttr: PropTypes.object
};

const mapStateToProps = state => {
  return {
    model: state.header.model,
    errors: state.header.regErrors,
    dbE: state.dataBase.dbError
  }
};

const mapDispatchToProps = dispatch => ({
  clean: (data) => dispatch(cleanRegError(data)),
  setError: (data) => dispatch(setRegError(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormGroupContainer);
