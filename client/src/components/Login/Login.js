import React from 'react';
import './style.scss';
import {Col, Form, FormFeedback, FormGroup, FormText, Input, Row} from "reactstrap";
import LinkButton from "../NavBarHeader/NavBarHeader";
import {Link} from "react-router-dom";

const Login = ({
                 formHandler, isValid, onChange,
                 errors, emailServerError, passwordServerError,
                 emailValue, passwordValue, forgotPassword
               }) => {
  
  return (
    <Form onSubmit={formHandler}>
      {/*<input type="hidden" value="prayer" />*/}
      <FormGroup className="mb-2" row>
        <Col>
          <Input type="email" name="email" id="emailId"
                 placeholder="Enter email"
                 invalid={!isValid("email", errors)}
                 valid={isValid("email", errors)}
                 onChange={onChange}
                 value={emailValue}
                 autoComplete="new-password"
                 required/>
          
          <FormFeedback>Please enter a valid email address</FormFeedback>
          <FormText>{emailServerError.length > 0 && emailServerError[0]}</FormText>
        </Col>
      </FormGroup>
      <Row>
        <Col>
          <Link className="mb-2 float-right" to="/login" onClick={forgotPassword}>Forgot password?</Link>
        </Col>
      </Row>
      <FormGroup className="mb-1" row>
        <Col>
          <Input type="password" name="password" id="passwordId"
                 placeholder="Enter password"
                 invalid={!isValid("password", errors)}
                 valid={isValid("password", errors)}
                 onChange={onChange}
                 value={passwordValue}
                 autoComplete="new-password"
            // autoComplete="section-blue billing current-password"
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
          <a href="/auth/google" name="google" className="linkLogin loginBtn--google add-margin">
            Login with Google
          </a>
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
