import React from 'react';
import './style.scss';
import {Col, Form, FormFeedback, FormGroup, FormText, Input, Row} from "reactstrap";

const Register = ({
                    formHandler, isValid, onChange,
                    errors, serverError,
                    model: {
                      userName,
                      email,
                      password,
                      gender,
                      birthday,
                      birthTime,
                      weight
                    }
                  }) => {

  return (
    <Form onSubmit={formHandler}>
      <FormGroup row>
        <Col>
          <Input type="text" name="userName" id="userNameId"
                 placeholder="Enter username"
                 invalid={!isValid("userName", errors)}
                 valid={isValid("userName", errors)}
                 onChange={onChange}
                 value={userName}
                 autoComplete="userName"
                 required/>
          
          <FormFeedback>Username(2-40 characters)</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="email" name="email" id="emailId"
                 placeholder="Enter email"
                 invalid={!isValid("email", errors)}
                 valid={isValid("email", errors)}
                 onChange={onChange}
                 value={email}
                 required/>
          
          <FormFeedback>Please enter a valid email address</FormFeedback>
          <FormText>{serverError && serverError.length > 0 && serverError[0]}</FormText>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="password" name="password" id="passwordId"
                 placeholder="Enter password"
                 invalid={!isValid("password", errors)}
                 valid={isValid("password", errors)}
                 onChange={onChange}
                 value={password}
                 autoComplete="section-blue billing current-password"
                 required/>
          <FormFeedback>Password (min 4 characters)</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="select" name="gender" id="genderId"
                 onChange={onChange}
                 value={gender}
                 required>
            <option value="" disabled>Enter your gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Input>
          <FormFeedback>Gender is required</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="date" name="birthday" id="birthdayId"
                 placeholder="Enter birthday"
                 invalid={!isValid("birthday", errors)}
                 valid={isValid("birthday", errors)}
                 onChange={onChange}
                 value={birthday}
                 required/>
          <FormFeedback>Please insert your birthday (dd-mm=yyyy)</FormFeedback>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="time" name="birthTime" id="birthTimeId"
                 placeholder="Enter time of birth..."
                 onChange={onChange}
                 value={birthTime}/>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col>
          <Input type="number" name="weight" id="weightId"
                 placeholder="Enter birth weight(kg)..."
                 invalid={!isValid("weight", errors)}
                 valid={isValid("weight", errors)}
                 onChange={onChange}
                 value={weight}/>
          <FormFeedback>Please insert your weight of birth ( max. 8kg )</FormFeedback>
        </Col>
      </FormGroup>
      <Row>
        <Col>
          <button name="custom" className="loginBtn loginBtn--custom">
            Register
          </button>
        </Col>
      </Row>
    </Form>
  
  );
};

//Login.propTypes = {};


export default Register;
