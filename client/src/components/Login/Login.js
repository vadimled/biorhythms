import React from 'react';
import './style.scss';
import {Col, Form, FormFeedback, FormGroup, FormText, Input, Row} from "reactstrap";

const Login = ({
                 formHandler, isValid, onChange,
                 errors, emailServerError, passwordServerError,
                 emailValue, passwordValue
               }) => {
  
  return (
    <Form onSubmit={formHandler}>
      <a href="/auth/google" name="google" className="linkLogin loginBtn--google">
        Login with Google
      </a>
      
      <FormGroup row>
        <Col>
          <Input type="email" name="email" id="emailId"
                 placeholder="Enter email"
                 invalid={!isValid("email", errors)}
                 valid={isValid("email", errors)}
                 onChange={onChange}
                 value={emailValue}
                 required/>
          
          <FormFeedback>Please enter a valid email address</FormFeedback>
          <FormText>{emailServerError.length > 0 && emailServerError[0]}</FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="password" name="password" id="passwordId"
                 placeholder="Enter password"
                 invalid={!isValid("password", errors)}
                 valid={isValid("password", errors)}
                 onChange={onChange}
                 value={passwordValue}
                 autoComplete="section-blue billing current-password"
                 required/>
          <FormFeedback>Password (min 4 characters)</FormFeedback>
          <FormText>{passwordServerError.length > 0 && passwordServerError[0]}</FormText>
        </Col>
      </FormGroup>
      <Row>
        <Col>
          <button name="custom" className="loginBtn loginBtn--custom">
            Login
          </button>
          <a name="facebook" href="/auth/facebook" className="linkLogin loginBtn--facebook">
            Login with Facebook
          </a>
        </Col>
      </Row>
    </Form>
  
  );
};

//Login.propTypes = {};


export default Login;
