import React from "react";
import {FormGroup, Label, Col, Input, FormFeedback} from 'reactstrap';
import "./style.css"

const Option = ({value, disabled, child}) => <option value={value} disabled={disabled}>{child}</option>;

const Options = props => {
  const {options} = props;
  if (Object.keys(options).length === 0)
    return;
  
  const length = options.value.length;
  let optionsObj = [];
  
  for (let i = 0; i < length; i++) {
    optionsObj.push(
      <Option key={`${options.value[i]}_${i}`}
              value={options.value[i]}
              disabled={!!options.disabled[i]}
              child={options.child[i]}/>
    );
  }
  
  return optionsObj;
};

const FormGroupUI = ({
                       formGroupAtr,
                       labelAtr,
                       labelText,
                       colAtr,
                       inputAttr,
                       formFeedback,
                       options
                     }) => (
  <FormGroup {...formGroupAtr}>
    <Label {...labelAtr}>{labelText}</Label>
    <Col {...colAtr}>
      {
        inputAttr.type !== 'select'
          ?
          <Input {...inputAttr}/>
          :
          <Input {...inputAttr}>
            <Options options={options}/>
          </Input>
      }
      <FormFeedback>{formFeedback}</FormFeedback>
    </Col>
  </FormGroup>
);

export default FormGroupUI;
